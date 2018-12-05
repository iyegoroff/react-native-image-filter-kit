#import "IFKImageFilter.h"
#import "Image/RCTImageView.h"
#import "React/RCTImageSource.h"
#import "RCTImageView+CacheKey.h"
#import "NSArray+FilterMapReduce.h"
#import "IFKPostProcessor.h"
#import "IFKCompositionPostProcessor.h"
#import "IFKFilterableImage.h"
#import "IFKConfigHelper.h"
#import "IFKImageCache.h"
#import "IFKImage.h"
#import "Bolts.h"

typedef IFKTask<IFKFilterableImage *> DeferredImage;
typedef IFKTask<NSArray<IFKFilterableImage *> *> DeferredImages;

@interface IFKImageFilter ()

@property (nonatomic, strong) NSDictionary* jsonConfig;
@property (nonatomic, strong) NSArray<IFKImage *> *originalImages;
@property (nonatomic, strong) NSArray<RCTImageView *> *targets;
@property (nonatomic, strong) IFKCancellationTokenSource *cancelFiltering;

@end

@implementation IFKImageFilter

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _originalImages = @[[NSNull null]];
    _targets = @[];
    _cancelFiltering = [IFKCancellationTokenSource cancellationTokenSource];
  }
  
  return self;
}

- (void)dealloc
{
  [self unlinkTargets];
  [_cancelFiltering cancel];
}

- (void)setConfig:(NSString *)config
{
  _config = config;
  NSData* data = [config dataUsingEncoding:NSUTF8StringEncoding];
  _jsonConfig = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
  [self runFilterPipelineAndInvalidate:NO onlyCheckCache:NO];
}

- (void)unlinkTargets
{
  for (RCTImageView *target in _targets) {
    [self removeOnChangeObserver:target keyPath:@"image"];
    [self removeOnChangeObserver:target keyPath:@"imageSources"];
  }
}

- (void)linkTargets:(NSArray<RCTImageView *> *)foundTargets
{
  [self unlinkTargets];
  
  _originalImages = [foundTargets map:^id(RCTImageView *val, int idx) {
    return (_targets.count > idx && _originalImages.count > idx && val == _targets[idx])
      ? _originalImages[idx]
    : (val.image != nil ? [[IFKImage alloc] initWithImage:[val.image copy] hash:[val cacheKey]] : [NSNull null]);
  }];
  
  _targets = foundTargets;
  
//  NSLog(@"filter: upd link %@ %@", _targets, _originalImages);
  
  for (RCTImageView *target in _targets) {
    [self addOnChangeObserver:target keyPath:@"image"];
    [self addOnChangeObserver:target keyPath:@"imageSources"];
  }
  
  [self runFilterPipelineAndInvalidate:YES onlyCheckCache:NO];
}

- (NSArray<RCTImageView *> *)findTargets
{
  return [self.subviews reduce:^id(id acc, __kindof UIView *val, int idx) {
    RCTView *child = (RCTView *)val;
    
    while (![child isKindOfClass:[RCTImageView class]] && [child isKindOfClass:[RCTView class]]) {
      child = [child.subviews at:0];
    }
    
    if ([child isKindOfClass:[RCTImageView class]]) {
      [acc addObject:child];
    }
    
    return acc;
  } init:[NSMutableArray array]];
}


- (void)layoutSubviews
{
  [super layoutSubviews];
  
  NSArray *foundTargets = [self findTargets];
  
  if (_targets.count != foundTargets.count || [[_targets reduce:^id(NSNumber *acc, RCTImageView *val, int idx) {
    return @([acc boolValue] || val != foundTargets[idx]);
  } init:@NO] boolValue]) {
//    NSLog(@"filter: link");
    
    [self linkTargets:foundTargets];
  }
}

- (nonnull DeferredImage *)createImageComposition:(nonnull NSDictionary *)config
                                wrappedImageNames:(nonnull NSArray<NSString *> *)wrappedImageNames
                                    wrappedImages:(nonnull DeferredImages *)wrappedImages
{
//  NSLog(@"filter: com parse %@", config);
  NSString *name = [IFKConfigHelper name:config];

  return [wrappedImages continueWithSuccessBlock:^id _Nullable(DeferredImages * _Nonnull tasks) {
    NSArray<IFKFilterableImage *> *result = [tasks result];
    NSUInteger mainIdx = [wrappedImageNames indexOfObject:[IFKConfigHelper mainImage:config]];
    NSArray *restImageNames = [wrappedImageNames filter:^BOOL(NSString *val, int idx) {
      return idx != mainIdx;
    }];
    
    return [[IFKTask taskForCompletionOfAllTasksWithResults:[[result filter:^BOOL(IFKFilterableImage *val, int idx) {
      return idx != mainIdx;
      
    }] map:^id(IFKFilterableImage *val, int idx) {
      return [self filterImage:val];
      
    }]] continueWithSuccessBlock:^id _Nullable(IFKTask<NSArray<RCTImageView *> *> * _Nonnull task) {
      IFKFilterableImage *mainImage = result[mainIdx];
      NSArray<RCTImageView *> *restImages = [task result];
      
      RCTImageView *target = [mainImage target];
      
      NSLog(@"IFK: target size %@ %@", [NSValue valueWithCGSize:[target frame].size], [NSValue valueWithCGSize:[self frame].size]);

      NSMutableArray<IFKPostProcessor *> *postProcessors =
        [NSMutableArray arrayWithArray:[mainImage postProcessors]];
      
//      NSLog(@"filter: names %@ %@", restImageNames, restImages);
      NSDictionary *completeConfig = [restImageNames reduce:^id(NSMutableDictionary *acc, NSString *key, int idx) {
//        NSLog(@"filter: img %i %@ %@", idx, restImages[idx], [restImages[idx] image]);
        [acc setObject:@{@"image": [[CIImage alloc] initWithImage:[restImages[idx] image]]}
                forKey:key];

        return acc;
      } init:[NSMutableDictionary dictionaryWithDictionary:config]];
      
      CGSize canvasSize = [self frame].size;
      canvasSize.width *= RCTScreenScale();
      canvasSize.height *= RCTScreenScale();
      
      [postProcessors addObject:[[IFKCompositionPostProcessor alloc] initWithName:name
                                                                           inputs:completeConfig
                                                                       canvasSize:canvasSize]];
      
      return [[IFKFilterableImage alloc] initWithTarget:target
                                          originalImage:[mainImage originalImage]
                                                 config:config
                                         postProcessors:postProcessors];
    } cancellationToken:[_cancelFiltering token]];
  } cancellationToken:[_cancelFiltering token]];
}

- (nonnull DeferredImage *)createSingularImage:(nonnull NSDictionary *)config
                                  wrappedImage:(nonnull DeferredImage *)wrappedImage
{
  NSString *name = [IFKConfigHelper name:config];
  
  return [wrappedImage continueWithSuccessBlock:^id _Nullable(DeferredImage * _Nonnull task) {
    IFKFilterableImage *mainImage = [task result];
    RCTImageView *target = [mainImage target];

    NSMutableArray<IFKPostProcessor *> *postProcessors =
      [NSMutableArray arrayWithArray:[mainImage postProcessors]];
    
    [postProcessors addObject:[[IFKPostProcessor alloc] initWithName:name inputs:config]];
    
    return [[IFKFilterableImage alloc] initWithTarget:target
                                        originalImage:[mainImage originalImage]
                                               config:config
                                       postProcessors:postProcessors];
  } cancellationToken:[_cancelFiltering token]];
}

- (nonnull DeferredImage *)parseConfig:(nonnull NSObject *)config
{
  if ([config isKindOfClass:[NSNumber class]]) {
    NSUInteger idx = [(NSNumber *)config intValue];
    NSDictionary *defaultConfig = @{@"disableCache":@{@"bool": @(YES)}};

    return [IFKTask taskWithResult:[[IFKFilterableImage alloc] initWithTarget:_targets[idx]
                                                                originalImage:_originalImages[idx].image
                                                                       config:defaultConfig
                                                               postProcessors:@[]]];
  }
  
  NSDictionary *jsonConfig = (NSDictionary *)config;
  NSDictionary *wrappedImageConfigs = [IFKConfigHelper wrappedConfigs:jsonConfig];
  
  if ([IFKConfigHelper isComposition:jsonConfig]) {
    NSArray *names = [wrappedImageConfigs allKeys];
    NSArray *tasks = [names map:^id(id val, int idx) {
      return [self parseConfig:[wrappedImageConfigs objectForKey:val]];
    }];

    return [self createImageComposition:jsonConfig
                      wrappedImageNames:names
                          wrappedImages:[IFKTask taskForCompletionOfAllTasksWithResults:tasks]];
  } else if ([IFKConfigHelper isSingular:jsonConfig]) {
    NSObject *wrappedImageConfig = [[wrappedImageConfigs allValues] firstObject];
    
    return [self createSingularImage:jsonConfig
                           wrappedImage:[self parseConfig:wrappedImageConfig]];
  } else {
    RCTAssert(false,
              @"ImageFilterKit: ImageFilter error: Can't find %@ post processor.",
              [IFKConfigHelper name:jsonConfig]);
    
    return nil;
  }
}

- (void)runFilterPipelineAndInvalidate:(BOOL)shouldInvalidate onlyCheckCache:(BOOL)onlyCheckCache
{
//  NSLog(@"filter: max index %lu _targets.count %lu", (unsigned long)[IFKConfigHelper maxImageIndex:_jsonConfig], (unsigned long)_targets.count);
//  NSLog(@"filter: max targets %@", _targets);
  if (_targets.count > [IFKConfigHelper maxImageIndex:_jsonConfig]) {
    NSString *cacheKey = [self cacheKey:[NSString stringWithFormat:@"%@", _jsonConfig]];
    UIImage *cachedImage = [[IFKImageCache instance] imageForKey:cacheKey];
    
//    NSLog(@"IFK: RENDER %@", RCTMD5Hash(cacheKey));
    
    if (cachedImage != nil) {
      [self resetFilterPipeline];
      
      NSLog(@"filter: INSTANT UPDATE - %@", cacheKey);
      [self updateTarget:_targets[0] image:cachedImage];

    } else if (!onlyCheckCache) {
      [self resetFilterPipeline];
      
      if (shouldInvalidate) {
        [self updateTarget:_targets[0] image:nil];
      }
      
      if (_jsonConfig != nil && [_originalImages every:^BOOL(IFKImage *val, int idx) {
        return ![val isEqual:[NSNull null]];
      }]) {
        [[self parseConfig:_jsonConfig] continueWithSuccessBlock:^id _Nullable(DeferredImage * _Nonnull task) {
          [self filterImage:[task result]];
          
          return nil;
        } cancellationToken:[_cancelFiltering token]];
      }
    }
  }
}

- (void)resetFilterPipeline
{
  [_cancelFiltering cancel];
  _cancelFiltering = [IFKCancellationTokenSource cancellationTokenSource];
  NSLog(@"filter: cancel");
}

- (IFKTask<RCTImageView *> *)filterImage:(IFKFilterableImage *)filterableImage
{
  RCTImageView *target = [filterableImage target];
  UIImage *originalImage = [filterableImage originalImage];
  CGRect viewFrame = [target frame];
  NSString *cacheKey = [self cacheKey:[filterableImage config]];
  UIImage *cachedImage = [[IFKImageCache instance] imageForKey:cacheKey];
  
  if (cachedImage != nil) {
    NSLog(@"filter: TAKING FROM CACHE");
    [self updateTarget:target image:cachedImage];
    
    return [IFKTask taskWithResult:target];
    
  } else {
    IFKExecutor *executor = [IFKExecutor executorWithDispatchQueue:dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0)];

    return [[IFKTask taskFromExecutor:executor withBlock:^id _Nonnull{
      return [[filterableImage postProcessors] reduce:^id(UIImage *acc, IFKPostProcessor *val, int idx) {
        return [val process:acc resizeMode:[target resizeMode] viewFrame:viewFrame];
      } init:originalImage];
      
    }] continueWithExecutor:[IFKExecutor mainThreadExecutor] successBlock:^id _Nullable(IFKTask<UIImage *> * _Nonnull task) {
      UIImage *image = [task result];
      
      if ([target valueForKey:@"_pendingImageSource"] == nil) {
        if (![filterableImage isCacheDisabled] && image != nil) {
          NSLog(@"filter: PUT TO CACHE - %@ %@", cacheKey, [filterableImage config]);
          [[IFKImageCache instance] setImage:image forKey:cacheKey];
        }
        
        [self updateTarget:target image:image];
      }
      
      return target;
    } cancellationToken:[_cancelFiltering token]];
  }
}

- (void)updateTarget:(nullable RCTImageView *)target image:(nullable UIImage *)image
{
  BOOL isObserved = [_targets containsObject:target];

  if (isObserved) {
    [self removeOnChangeObserver:target keyPath:@"image"];
  }

  [target setImage:image];

  if (isObserved) {
    [self addOnChangeObserver:target keyPath:@"image"];
  }
}

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(RCTImageView *)object
                        change:(NSDictionary *)change
                       context:(void *)context {
  if ([keyPath isEqualToString:@"image"]) {
    _originalImages = [_targets reduce:^id(NSMutableArray* acc, RCTImageView *val, int idx) {
      [acc replaceObjectAtIndex:idx
                     withObject:(object == val) ? [[IFKImage alloc] initWithImage:[object.image copy] hash:[val cacheKey]] : [_originalImages at:idx]];
      
      return acc;
    } init:_originalImages];
    
    NSLog(@"filter: upd obs %@ %@", _targets, _originalImages);
    
//    NSLog(@"filter: update cache");
//    NSLog(@"IFK: key %@ %@ %@", RCTMD5Hash([NSString stringWithFormat:@"%@", _jsonConfig]), object.image, _originalImages);
    [self runFilterPipelineAndInvalidate:YES onlyCheckCache:NO];
    
  } else if ([keyPath isEqualToString:@"imageSources"]) {
//    NSLog(@"filter: only check cache");
    [self runFilterPipelineAndInvalidate:YES onlyCheckCache:YES];
  }
}

- (void)addOnChangeObserver:(NSObject *)target keyPath:(NSString *)keyPath
{
  [target addObserver:self
           forKeyPath:keyPath
              options:NSKeyValueObservingOptionNew
              context:NULL];
}

- (void)removeOnChangeObserver:(NSObject *)target keyPath:(NSString *)keyPath
{
  [target removeObserver:self forKeyPath:keyPath];
}

- (nonnull NSString *)cacheKey:(nonnull NSString *)config
{
  NSString *targetsKey = [_originalImages reduce:^id(NSString *acc, IFKImage *val, int idx) {
    return [NSString stringWithFormat:@"%@(%@);",
            acc,
            [val isEqual:[NSNull null]] ? @"" : [val hashKey]];
  } init:@""];
  
  return [NSString stringWithFormat:@"[%@+%@]", config, targetsKey];
}

@end
