#import "Image/RCTImageView.h"
#import "Image/RCTImageUtils.h"
#import "IFKImageFilter.h"
#import "IFKFilterPostProcessor.h"
#import "IFKFilteredImage.h"
#import "React/RCTImageSource.h"
#import "NSArray+FilterMapReduce.h"
#import "IFKTuple.h"
#import "IFKPostProcessor.h"
#import "IFKFilterableImage.h"
#import <React/RCTLog.h>
#import "Bolts.h"

typedef IFKTask<IFKFilterableImage *> DeferredImage;

@interface IFKImageFilter ()

@property (nonatomic, strong) NSDictionary* jsonConfig;

@property (nonatomic, strong) NSArray<UIImage *> *originalImages;
@property (nonatomic, strong) NSArray<RCTImageView *> *targets;

@end

@implementation IFKImageFilter

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _originalImages = [NSArray array];
    _targets = [NSArray array];
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
  
  if ([_targets every:^BOOL(RCTImageView *val, int idx) {
    return val.image != nil;
  }]) {
    _originalImages = [_targets map:^id(RCTImageView *val, int idx) {
      return [val.image copy];
    }];
  }
  
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

  [self linkTargets];
}

- (nonnull DeferredImage *)createSingularImage:(nonnull NSDictionary *)config
                                     prevImage:(nonnull DeferredImage *)prevImage
{
  NSString *name = [config objectForKey:@"name"];
  
  return [prevImage continueWithSuccessBlock:^id _Nullable(DeferredImage * _Nonnull task) {
    IFKFilterableImage *result = [task result];
    
    CGFloat width = [[result image] frame].size.width;
    CGFloat height = [[result image] frame].size.height;
    NSMutableArray<IFKPostProcessor *> *postProcessors =
      [NSMutableArray arrayWithArray:[result postProcessors]];
    
    [postProcessors addObject:[[IFKPostProcessor alloc] initWithName:name
                                                               width:width
                                                              height:height
                                                              inputs:config]];
    
    BOOL cacheDisabled = [IFKPostProcessor cacheDisabled:config];
    
    return [[IFKFilterableImage alloc] initWithImage:[result image]
                                      postProcessors:postProcessors
                                       cacheDisabled:cacheDisabled];
  }];
}

- (nonnull DeferredImage *)parseConfig:(nonnull NSObject *)config
                                images:(nonnull NSArray<UIImage *> *)images
{
  if ([config isKindOfClass:[NSNumber class]]) {
    RCTImageView *image = _targets[[(NSNumber *)config intValue]];
    return [IFKTask taskWithResult:[[IFKFilterableImage alloc] initWithImage:image
                                                              postProcessors:@[]
                                                               cacheDisabled:NO]];
  }
  
  // TODO: add composite image
  NSDictionary *jsonConfig = (NSDictionary *)config;
  NSObject *prevImageConfig = [[jsonConfig objectForKey:@"image"] objectForKey:@"image"];
  
  return [self createSingularImage:jsonConfig
                         prevImage:[self parseConfig:prevImageConfig images:images]];
}

- (void)runFilterPipeline:(BOOL)shouldInvalidate
{
  if (_targets.count > 0) {
    if (shouldInvalidate) {
      [self updateTarget:_targets[0] image:nil];
    }
    
    if (_jsonConfig != nil && _originalImages.count > 0) {
      [[self parseConfig:_jsonConfig images:_originalImages] continueWithSuccessBlock:^id _Nullable(DeferredImage * _Nonnull task) {
        IFKFilterableImage *result = [task result];
        
        [self filterImage:result originalImage:_originalImages[0]];
        
        return nil;
      }];
    }
  }
}

- (IFKTask<RCTImageView *> *)filterImage:(IFKFilterableImage *)filterableImage
                           originalImage:(UIImage *)originalImage
{
  RCTImageView *target = [filterableImage image];
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
      });
    }
  });
  
  return [deferred task];
}

//- (void)renderFilteredImage:(BOOL)shouldInvalidate
//{
//  Filtering filtering = [self filtering];
//
//  if (filtering) {
//    __weak RNImageFilter *weakSelf = self;
//
//    if (shouldInvalidate) {
//      [self updateImage:nil];
//    }
//
//    [_filteringQueue cancelAllOperations];
//    [_filteringQueue addOperationWithBlock:^{
//      RNFilteredImage *image = filtering();
//
//      [[NSOperationQueue mainQueue] addOperationWithBlock:^{
//        RNImageFilter *strongSelf = weakSelf;
//
//        if (image != nil && strongSelf != nil) {
//          [strongSelf updateImage:image.image];
//        }
//      }];
//    }];
//  }
//}

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
    _originalImages = [_originalImages reduce:^id(NSMutableArray* acc, UIImage *val, int idx) {
      BOOL isUpdated = object == [_targets at:idx];
      UIImage *image = isUpdated ? [object.image copy] : [_originalImages at:idx];
      
      [acc replaceObjectAtIndex:idx withObject:image];
      
      return acc;
    } init:[NSMutableArray array]];

    [self runFilterPipeline:YES];
  }
}

@end
