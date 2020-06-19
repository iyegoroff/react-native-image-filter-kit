#import "IFKImageFilter.h"
#import "RCTImageView.h"
#import <React/RCTImageSource.h>
#import "RCTImageView+CacheKey.h"
#import "NSArray+FilterMapReduce.h"
#import "IFKPostProcessor.h"
#import "IFKCompositionPostProcessor.h"
#import "IFKFilterableImage.h"
#import "IFKConfigHelper.h"
#import "IFKImageCache.h"
#import "IFKImage.h"
#import "Bolts.h"

typedef BFTask<IFKFilterableImage *> DeferredImage;
typedef BFTask<NSArray<IFKFilterableImage *> *> DeferredImages;
typedef BFTask<NSString *> DeferredExtractedImagePath;

@interface RCTImageView (Private)

- (void)setImage:(UIImage *)image;
- (UIImage *)image;

@end

@interface IFKImageFilter ()

@property (nonatomic, copy) RCTBubblingEventBlock onIFKFilteringStart;
@property (nonatomic, copy) RCTBubblingEventBlock onIFKFilteringFinish;
@property (nonatomic, copy) RCTBubblingEventBlock onIFKFilteringError;
@property (nonatomic, copy) RCTBubblingEventBlock onIFKExtractImage;

@property (nonatomic, strong) NSDictionary* jsonConfig;
@property (nonatomic, strong) NSArray<IFKImage *> *originalImages;
@property (nonatomic, strong) NSArray<RCTImageView *> *targets;
@property (nonatomic, strong) BFCancellationTokenSource *filtering;
@property (nonatomic, strong) NSDictionary *tmpImageConfig;

@end

@implementation IFKImageFilter

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _originalImages = @[[NSNull null]];
    _targets = @[];
    _filtering = [BFCancellationTokenSource cancellationTokenSource];
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
  [self runFilterPipelineAndInvalidate:NO onlyCheckCache:NO];
}

- (void)setExtractImageEnabled:(BOOL)extractImageEnabled
{
  BOOL shouldExtractImage = !_extractImageEnabled && extractImageEnabled;
  _extractImageEnabled = extractImageEnabled;

  if (shouldExtractImage && [_targets count] > 0) {
    [self extractImage:_targets[0].image];
  }
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
    return (self->_targets.count > idx && self->_originalImages.count > idx && val == self->_targets[idx])
      ? self->_originalImages[idx]
      : (val.image != nil ? [[IFKImage alloc] initWithImage:[val.image copy] cacheKey:[val cacheKey]] : [NSNull null]);
  }];
  
  _targets = foundTargets;
  
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
    [self linkTargets:foundTargets];
  }
}

- (CGSize)canvasSize
{
  CGSize canvasSize = [self frame].size;
  canvasSize.width *= RCTScreenScale();
  canvasSize.height *= RCTScreenScale();

  return canvasSize;
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
    
    return [[BFTask taskForCompletionOfAllTasksWithResults:[[result filter:^BOOL(IFKFilterableImage *val, int idx) {
      return idx != mainIdx;
      
    }] map:^id(IFKFilterableImage *val, int idx) {
      return [self filterImage:val];
      
    }]] continueWithSuccessBlock:^id _Nullable(BFTask<NSArray<RCTImageView *> *> * _Nonnull task) {
      IFKFilterableImage *mainImage = result[mainIdx];
      NSArray<RCTImageView *> *restImages = [task result];

      NSMutableArray<IFKPostProcessor *> *postProcessors =
        [NSMutableArray arrayWithArray:[mainImage postProcessors]];
      
      NSDictionary *completeConfig = [restImageNames reduce:^id(NSMutableDictionary *acc, NSString *key, int idx) {
        [acc setObject:@{@"image": [[CIImage alloc] initWithImage:[restImages[idx] image]]}
                forKey:key];

        return acc;
      } init:[NSMutableDictionary dictionaryWithDictionary:config]];
      
      [postProcessors addObject:[[IFKCompositionPostProcessor alloc] initWithName:name
                                                                           inputs:completeConfig
                                                                       canvasSize:[self canvasSize]]];
      
      return [[IFKFilterableImage alloc] initWithTarget:[mainImage target]
                                          originalImage:[mainImage originalImage]
                                                 config:config
                                         postProcessors:postProcessors];
    } cancellationToken:[self->_filtering token]];
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

    return [BFTask taskWithResult:[[IFKFilterableImage alloc] initWithTarget:_targets[idx]
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
                          wrappedImages:[BFTask taskForCompletionOfAllTasksWithResults:tasks]];
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

- (BOOL)imagesAreLoading
{
  return [_targets some:^BOOL(RCTImageView *val, int idx) {
    return [val valueForKey:@"_pendingImageSource"] != nil;
  }];
}

- (void)startFiltering
{
  if (_onIFKFilteringStart) {
    _onIFKFilteringStart(nil);
  }
}

- (void)finishFiltering
{
  if (_onIFKFilteringFinish) {
    _onIFKFilteringFinish(nil);
  }
}

- (void)filteringError:(NSString *)message
{
  if (_onIFKFilteringError) {
    _onIFKFilteringError(@{ @"message": message });
  }
}

- (void)runFilterPipelineAndInvalidate:(BOOL)shouldInvalidate onlyCheckCache:(BOOL)onlyCheckCache
{
  if (_targets.count > [IFKConfigHelper maxImageIndex:_jsonConfig]) {
    NSString *cacheKey = [self fastCacheKey:[NSString stringWithFormat:@"%@", _jsonConfig]];
    UIImage *cachedImage = [[IFKImageCache instance] imageForKey:cacheKey];
    
    if (cachedImage != nil) {
      if (_targets[0].image != cachedImage) {
        [self startFiltering];
        
        [self resetFilterPipeline];
        
        [self updateTarget:_targets[0] image:cachedImage];
        
        [self finishFiltering];
      }

    } else if (!onlyCheckCache) {
      [self resetFilterPipeline];
      
      if (shouldInvalidate) {
        [self updateTarget:_targets[0] image:nil];
      }
      
      if (_jsonConfig != nil && [_originalImages every:^BOOL(IFKImage *val, int idx) {
        return ![val isEqual:[NSNull null]];
      }] && ![self imagesAreLoading]) {
        [self startFiltering];
        
        [[[self parseConfig:_jsonConfig] continueWithSuccessBlock:^id _Nullable(DeferredImage * _Nonnull task) {
          return [self filterImage:[task result]];
          
        } cancellationToken:[_filtering token]] continueWithExecutor:[BFExecutor mainThreadExecutor] successBlock:^id _Nullable(BFTask * _Nonnull t) {
          [self finishFiltering];
          
          return nil;
        } cancellationToken:[_filtering token]];
      }
    }
  }
}

- (void)resetFilterPipeline
{
  [_filtering cancel];
  _filtering = [BFCancellationTokenSource cancellationTokenSource];
}

- (BFTask<RCTImageView *> *)filterImage:(IFKFilterableImage *)filterableImage
{
  RCTImageView *target = [filterableImage target];
  UIImage *originalImage = [filterableImage originalImage];
  NSString *fastCacheKey = [self fastCacheKey:[filterableImage config]];
  UIImage *cachedImage = [[IFKImageCache instance] imageForKey:fastCacheKey];
  
  if (cachedImage != nil) {
    [self updateTarget:target image:cachedImage];
    
    return [BFTask taskWithResult:target];
    
  } else {
    NSString *safeCacheKey = [self safeCacheKey:[filterableImage config]];
    BFExecutor *executor = [BFExecutor executorWithDispatchQueue:dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0)];
    CGSize canvasSize = [self canvasSize];
    
    return [[BFTask taskFromExecutor:executor withBlock:^id _Nonnull{
      return [[filterableImage postProcessors] reduce:^id(UIImage *acc, IFKPostProcessor *val, int idx) {
        return [val process:acc canvasSize:canvasSize];
      } init:originalImage];
      
    }] continueWithExecutor:[BFExecutor mainThreadExecutor] successBlock:^id _Nullable(BFTask<UIImage *> * _Nonnull task) {
      UIImage *image = [task result];
      
      if (![self imagesAreLoading]) {
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

  if (target == _targets[0]) {
    [self extractImage:image];
  }

  [target setImage:image];
  
  if (isObserved) {
    [self addOnChangeObserver:target keyPath:@"image"];
  }
}

- (void)extractImage:(nullable UIImage *)image
{
  if (
    image != nil &&
    _extractImageEnabled &&
    _onIFKExtractImage != nil &&
    ![_jsonConfig isEqual:_tmpImageConfig]
  ) {
    _tmpImageConfig = [_jsonConfig copy];
    __weak IFKImageFilter *weakSelf = self;

    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
      IFKImageFilter *innerSelf = weakSelf;

      if (
        innerSelf != nil &&
        innerSelf->_onIFKExtractImage != nil &&
        [innerSelf->_jsonConfig isEqual:innerSelf->_tmpImageConfig]
      ) {
        NSData *data = UIImagePNGRepresentation(image);

        NSError *error = nil;
        NSString *path = RCTTempFilePath(@"rnifk.png", &error);

        if (path && !error && data != nil) {
          if ([data writeToFile:path options:(NSDataWritingOptions)0 error:&error]) {
#if RCT_DEBUG
            NSLog(@"ImageFilterKit: created tmp file %@", path);
#endif
            innerSelf->_onIFKExtractImage(@{ @"uri": path });

            return;
          }
        }

        [innerSelf filteringError:!error ? @"unknown error" : error.description];
      }
    });
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
                                  : [self->_originalImages at:idx]];
      
      return acc;
    } init:_originalImages];
    
    [self runFilterPipelineAndInvalidate:YES onlyCheckCache:NO];
    
  } else if ([keyPath isEqualToString:@"imageSources"]) {
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
