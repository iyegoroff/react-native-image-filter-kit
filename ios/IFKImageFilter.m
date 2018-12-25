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
#import "IFKBolts.h"

typedef IFKTask<IFKFilterableImage *> DeferredImage;
typedef IFKTask<NSArray<IFKFilterableImage *> *> DeferredImages;

@interface IFKImageFilter ()

@property (nonatomic, copy) RCTBubblingEventBlock onIFKFilteringStart;
@property (nonatomic, copy) RCTBubblingEventBlock onIFKFilteringFinish;
@property (nonatomic, copy) RCTBubblingEventBlock onIFKFilteringError;

@property (nonatomic, strong) NSDictionary* jsonConfig;
@property (nonatomic, strong) NSArray<IFKImage *> *originalImages;
@property (nonatomic, strong) NSArray<RCTImageView *> *targets;
@property (nonatomic, strong) IFKCancellationTokenSource *filtering;

@end

@implementation IFKImageFilter

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _originalImages = @[[NSNull null]];
    _targets = @[];
    _filtering = [IFKCancellationTokenSource cancellationTokenSource];
  }
  
  return self;
}

- (void)dealloc
{
  [self unlinkTargets];
  [_filtering cancel];
}

- (void)setConfig:(NSString *)config
{
  _config = config;
  NSData* data = [config dataUsingEncoding:NSUTF8StringEncoding];
  _jsonConfig = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
  NSLog(@"filter: set config");
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
    : (val.image != nil ? [[IFKImage alloc] initWithImage:[val.image copy] cacheKey:[val cacheKey]] : [NSNull null]);
  }];
  
  _targets = foundTargets;
  
  for (RCTImageView *target in _targets) {
    [self addOnChangeObserver:target keyPath:@"image"];
    [self addOnChangeObserver:target keyPath:@"imageSources"];
  }
  
  NSLog(@"filter: link targets");
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
    [self linkTargets:foundTargets];
  }
}

- (nonnull DeferredImage *)createImageComposition:(nonnull NSDictionary *)config
                                wrappedImageNames:(nonnull NSArray<NSString *> *)wrappedImageNames
                                    wrappedImages:(nonnull DeferredImages *)wrappedImages
{
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

      NSMutableArray<IFKPostProcessor *> *postProcessors =
        [NSMutableArray arrayWithArray:[mainImage postProcessors]];
      
      NSDictionary *completeConfig = [restImageNames reduce:^id(NSMutableDictionary *acc, NSString *key, int idx) {
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
      
      return [[IFKFilterableImage alloc] initWithTarget:[mainImage target]
                                          originalImage:[mainImage originalImage]
                                                 config:config
                                         postProcessors:postProcessors];
    } cancellationToken:[_filtering token]];
  } cancellationToken:[_filtering token]];
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
  } cancellationToken:[_filtering token]];
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
  if (_targets.count > [IFKConfigHelper maxImageIndex:_jsonConfig]) {
    NSString *cacheKey = [self fastCacheKey:[NSString stringWithFormat:@"%@", _jsonConfig]];
    UIImage *cachedImage = [[IFKImageCache instance] imageForKey:cacheKey];
    
    if (cachedImage != nil) {
      if (_targets[0].image != cachedImage) {
        if (_onIFKFilteringStart) {
          _onIFKFilteringStart(nil);
        }
        
        [self resetFilterPipeline];
        
        [self updateTarget:_targets[0] image:cachedImage];
        
        if (_onIFKFilteringFinish) {
          _onIFKFilteringFinish(nil);
        }
      }

    } else if (!onlyCheckCache) {
      [self resetFilterPipeline];
      
      if (shouldInvalidate) {
        [self updateTarget:_targets[0] image:nil];
      }
      
      if (_jsonConfig != nil && [_originalImages every:^BOOL(IFKImage *val, int idx) {
        return ![val isEqual:[NSNull null]];
      }]) {
        if (_onIFKFilteringStart) {
          _onIFKFilteringStart(nil);
        }
        
        [[[self parseConfig:_jsonConfig] continueWithSuccessBlock:^id _Nullable(DeferredImage * _Nonnull task) {
          return [self filterImage:[task result]];
          
        } cancellationToken:[_filtering token]] continueWithExecutor:[IFKExecutor mainThreadExecutor] successBlock:^id _Nullable(IFKTask * _Nonnull t) {
          if (_onIFKFilteringFinish) {
            _onIFKFilteringFinish(nil);
          }
          
          return nil;
        } cancellationToken:[_filtering token]];
      }
    }
  }
}

- (void)resetFilterPipeline
{
  [_filtering cancel];
  _filtering = [IFKCancellationTokenSource cancellationTokenSource];
  NSLog(@"filter: cancel");
}

- (IFKTask<RCTImageView *> *)filterImage:(IFKFilterableImage *)filterableImage
{
  RCTImageView *target = [filterableImage target];
  UIImage *originalImage = [filterableImage originalImage];
  CGRect viewFrame = [target frame];
  NSString *fastCacheKey = [self fastCacheKey:[filterableImage config]];
  UIImage *cachedImage = [[IFKImageCache instance] imageForKey:fastCacheKey];
  
  if (cachedImage != nil) {
    [self updateTarget:target image:cachedImage];
    
    return [IFKTask taskWithResult:target];
    
  } else {
    NSString *safeCacheKey = [self safeCacheKey:[filterableImage config]];
    IFKExecutor *executor = [IFKExecutor executorWithDispatchQueue:dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0)];
    
    return [[IFKTask taskFromExecutor:executor withBlock:^id _Nonnull{
      return [[filterableImage postProcessors] reduce:^id(UIImage *acc, IFKPostProcessor *val, int idx) {
        return [val process:acc resizeMode:[target resizeMode] viewFrame:viewFrame];
      } init:originalImage];
      
    }] continueWithExecutor:[IFKExecutor mainThreadExecutor] successBlock:^id _Nullable(IFKTask<UIImage *> * _Nonnull task) {
      UIImage *image = [task result];
      
      if ([target valueForKey:@"_pendingImageSource"] == nil) {
        if (![filterableImage isCacheDisabled] && image != nil) {
          [[IFKImageCache instance] setImage:image forKey:safeCacheKey];
        }
        
        [self updateTarget:target image:image];
      }
      
      return target;
    } cancellationToken:[_filtering token]];
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
                     withObject:(object == val)
                                  ? [[IFKImage alloc] initWithImage:[object.image copy] cacheKey:[val cacheKey]]
                                  : [_originalImages at:idx]];
      
      return acc;
    } init:_originalImages];
    
    NSLog(@"filter: update cache");
    [self runFilterPipelineAndInvalidate:YES onlyCheckCache:NO];
    
  } else if ([keyPath isEqualToString:@"imageSources"]) {
    NSLog(@"filter: only check cache");
    [self runFilterPipelineAndInvalidate:YES onlyCheckCache:YES];
  }
}

- (void)addOnChangeObserver:(NSObject *)target keyPath:(NSString *)keyPath
{
  [target addObserver:self
           forKeyPath:keyPath
              options:NSKeyValueObservingOptionNew
              context:nil];
}

- (void)removeOnChangeObserver:(NSObject *)target keyPath:(NSString *)keyPath
{
  [target removeObserver:self forKeyPath:keyPath];
}

- (nonnull NSString *)safeCacheKey:(nonnull NSString *)config
{
  return [IFKImageFilter cacheKey:config cacheables:_originalImages];
}

- (nonnull NSString *)fastCacheKey:(nonnull NSString *)config
{
  return [IFKImageFilter cacheKey:config cacheables:_targets];
}

+ (nonnull NSString *)cacheKey:(nonnull NSString *)config
                    cacheables:(NSArray<id <IFKCacheable>> *)cacheables
{
  NSString *targetsKey = [cacheables reduce:^id(NSString *acc, id <IFKCacheable> val, int idx) {
    return [NSString stringWithFormat:@"%@(%@);",
            acc,
            [val isEqual:[NSNull null]] ? @"" : [val cacheKey]];
  } init:@""];
  
  return [NSString stringWithFormat:@"[%@+%@]", config, targetsKey];
}

@end
