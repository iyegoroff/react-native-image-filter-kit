#import "IFKImageFilter.h"
#import "Image/RCTImageView.h"
#import "React/RCTImageSource.h"
#import "NSArray+FilterMapReduce.h"
#import "IFKPostProcessor.h"
#import "IFKFilterableImage.h"
#import "IFKConfigHelper.h"
#import <React/RCTLog.h>
#import "Bolts.h"

typedef IFKTask<IFKFilterableImage *> DeferredImage;
typedef IFKTask<NSArray<IFKFilterableImage *> *> DeferredImages;

@interface IFKImageFilter ()

@property (nonatomic, strong) NSDictionary* jsonConfig;
@property (nonatomic, strong) NSArray<UIImage *> *originalImages;
@property (nonatomic, strong) NSArray<RCTImageView *> *targets;

@end

@implementation IFKImageFilter

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _originalImages = @[[NSNull null]];
    _targets = @[];
  }
  
  return self;
}

- (void)dealloc
{
  [self unlinkTargets];
//  [_filteringQueue cancelAllOperations];
}

- (void)setConfig:(NSString *)config
{
  _config = config;
  NSData* data = [config dataUsingEncoding:NSUTF8StringEncoding];
  _jsonConfig = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
  
  NSLog(@"ImagFilterKit: %@", _jsonConfig);
  
  [self runFilterPipeline:NO];
}

- (void)unlinkTargets
{
  for (RCTImageView *target in _targets) {
    [target removeObserver:self forKeyPath:@"image"];
  }
}

- (void)linkTargets
{
  [self unlinkTargets];
  
  _targets = [self.subviews reduce:^id(id acc, __kindof UIView *val, int idx) {
    RCTView *child = (RCTView *)val;
    
    while (![child isKindOfClass:[RCTImageView class]] && [child isKindOfClass:[RCTView class]]) {
      child = [child.subviews at:0];
    }
    
    if ([child isKindOfClass:[RCTImageView class]]) {
      [acc addObject:child];
    }
    
    return acc;
  } init:[NSMutableArray array]];
  
  _originalImages = [_targets map:^id(RCTImageView *val, int idx) {
    return val.image != nil ? [val.image copy] : [NSNull null];
  }];
  
  for (RCTImageView *target in _targets) {
    [target addObserver:self
             forKeyPath:@"image"
                options:NSKeyValueObservingOptionNew
                context:NULL];
  }
  
  [self runFilterPipeline:YES];
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  
  if (_targets.count == 0) {
    [self linkTargets];
  }
}

- (nonnull DeferredImage *)createImageComposition:(nonnull NSDictionary *)config
                                wrappedImageNames:(nonnull NSArray<NSString *> *)wrappedImageNames
                                    wrappedImages:(nonnull DeferredImages *)wrappedImages
{
  NSString *name = [config objectForKey:@"name"];

  return [wrappedImages continueWithSuccessBlock:^id _Nullable(DeferredImages * _Nonnull tasks) {
    NSArray<IFKFilterableImage *> *result = [tasks result];
    NSUInteger mainIdx = [wrappedImageNames indexOfObject:@"inputImage"];
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
      
      CGFloat width = [target frame].size.width;
      CGFloat height = [target frame].size.height;
      NSMutableArray<IFKPostProcessor *> *postProcessors =
        [NSMutableArray arrayWithArray:[mainImage postProcessors]];
      
      NSDictionary *completeConfig = [restImageNames reduce:^id(NSMutableDictionary *acc, NSString *key, int idx) {
        [acc setObject:@{@"image": [[CIImage alloc] initWithImage:[restImages[idx] image]]}
                forKey:key];

        return acc;
      } init:[NSMutableDictionary dictionaryWithDictionary:config]];
      
      [postProcessors addObject:[[IFKPostProcessor alloc] initWithName:name
                                                                 width:width
                                                                height:height
                                                         mainImageName:@"inputImage"
                                                                inputs:completeConfig]];
      
      return [[IFKFilterableImage alloc] initWithTarget:target
                                          originalImage:[mainImage originalImage]
                                         postProcessors:postProcessors
                                          cacheDisabled:[IFKConfigHelper isCacheDisabled:config]];
    }];
  }];
}

- (nonnull DeferredImage *)createSingularImage:(nonnull NSDictionary *)config
                                  wrappedImage:(nonnull DeferredImage *)wrappedImage
{
  NSString *name = [config objectForKey:@"name"];
  
  return [wrappedImage continueWithSuccessBlock:^id _Nullable(DeferredImage * _Nonnull task) {
    IFKFilterableImage *mainImage = [task result];
    RCTImageView *target = [mainImage target];
    
    CGFloat width = [target frame].size.width;
    CGFloat height = [target frame].size.height;
    NSMutableArray<IFKPostProcessor *> *postProcessors =
      [NSMutableArray arrayWithArray:[mainImage postProcessors]];
    
    [postProcessors addObject:[[IFKPostProcessor alloc] initWithName:name
                                                               width:width
                                                              height:height
                                                       mainImageName:@"inputImage"
                                                              inputs:config]];
    
    return [[IFKFilterableImage alloc] initWithTarget:target
                                        originalImage:[mainImage originalImage]
                                       postProcessors:postProcessors
                                        cacheDisabled:[IFKConfigHelper isCacheDisabled:config]];
  }];
}

- (nonnull DeferredImage *)parseConfig:(nonnull NSObject *)config
{
  if ([config isKindOfClass:[NSNumber class]]) {
    NSUInteger idx = [(NSNumber *)config intValue];
    return [IFKTask taskWithResult:[[IFKFilterableImage alloc] initWithTarget:_targets[idx]
                                                                originalImage:_originalImages[idx]
                                                              postProcessors:@[]
                                                               cacheDisabled:NO]];
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
    NSString *reason = [NSString stringWithFormat:@"ImageFilterKit: ImageFilter error: Can't find '\"%@\"' post processor.",
                        [jsonConfig objectForKey:@"name"]];

    @throw [NSException exceptionWithName:NSGenericException
                                   reason:reason
                                 userInfo:nil];
  }
}

- (void)runFilterPipeline:(BOOL)shouldInvalidate
{
  if (_targets.count > 0) {
    if (shouldInvalidate) {
      [self updateTarget:_targets[0] image:nil];
    }
    
    if (_jsonConfig != nil && [_originalImages every:^BOOL(UIImage *val, int idx) {
      return ![val isEqual:[NSNull null]];
    }]) {
      [[self parseConfig:_jsonConfig] continueWithSuccessBlock:^id _Nullable(DeferredImage * _Nonnull task) {
        [self filterImage:[task result]];
        
        return nil;
      }];
    }
  }
}

- (IFKTask<RCTImageView *> *)filterImage:(IFKFilterableImage *)filterableImage
{
  RCTImageView *target = [filterableImage target];
  UIImage *originalImage = [filterableImage originalImage];
  IFKTaskCompletionSource<RCTImageView *> *deferred = [IFKTaskCompletionSource taskCompletionSource];
  __weak IFKImageFilter *weakSelf = self;
  
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    IFKImageFilter *innerSelf = weakSelf;
    
    if (innerSelf != nil) {
      // TODO: cancellation
      UIImage *image = [[filterableImage postProcessors] reduce:^id(UIImage *acc, IFKPostProcessor *val, int idx) {
        return [val process:acc resizeMode:[target resizeMode]];
      } init:originalImage];
      
      dispatch_async(dispatch_get_main_queue(), ^{
        // TODO: cancellation
        [innerSelf updateTarget:target image:image];
        [deferred setResult:target];
      });
    }
  });
  
  return [deferred task];
}

- (void)updateTarget:(nullable RCTImageView *)target image:(nullable UIImage *)image
{
  BOOL isObserved = [_targets containsObject:target];

  if (isObserved) {
    [target removeObserver:self forKeyPath:@"image"];
  }

  [target setImage:image];

  if (isObserved) {
    [target addObserver:self
             forKeyPath:@"image"
                options:NSKeyValueObservingOptionNew
                context:NULL];
  }
}

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(RCTImageView *)object
                        change:(NSDictionary *)change
                       context:(void *)context {
  if ([keyPath isEqualToString:@"image"]) {
    _originalImages = [_targets reduce:^id(NSMutableArray* acc, RCTImageView *val, int idx) {
      [acc replaceObjectAtIndex:idx
                     withObject:(object == val) ? [object.image copy] : [_originalImages at:idx]];
      
      return acc;
    } init:_originalImages];

    [self runFilterPipeline:YES];
  }
}

@end
