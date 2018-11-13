#import "Image/RCTImageView.h"
#import "Image/RCTImageUtils.h"
#import "IFKImageFilter.h"
#import "IFKFilterPostProcessor.h"
#import "IFKFilteredImage.h"
#import "React/RCTImageSource.h"
#import "NSArray+FilterMapReduce.h"
#import "IFKTuple.h"
#import <React/RCTLog.h>

static CIContext *context;
static CIContext *contextWithColorManagement;
static NSArray<NSString *> *filtersWithColorManagement;

@interface IFKImageFilter ()

@property (nonatomic, strong) NSDictionary* jsonConfig;

@property (nonatomic, strong) NSArray<UIImage *> *originalImages;
@property (nonatomic, strong) NSArray<RCTImageView *> *targets;
@property (nonatomic, strong) NSOperationQueue *filteringQueue;

@end

@implementation IFKImageFilter

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _originalImages = [NSArray array];
    _targets = [NSArray array];
    _filteringQueue = [[NSOperationQueue alloc] init];
    
    static dispatch_once_t onceToken;
    
    dispatch_once(&onceToken, ^{
      filtersWithColorManagement = @[@"CIColorMatrix", @"CIColorInvert", @"CIColorPolynomial"];
    
      // CFAbsoluteTime start = CFAbsoluteTimeGetCurrent();
      EAGLContext *eaglContext = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES3];
      eaglContext = eaglContext ?: [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2];
    
      context = [CIContext contextWithEAGLContext:eaglContext
                                          options:@{kCIImageColorSpace: [NSNull null],
                                                    kCIImageProperties: [NSNull null],
                                                    kCIContextWorkingColorSpace: [NSNull null]}];
    
      contextWithColorManagement = [CIContext contextWithEAGLContext:eaglContext options:nil];
      // NSLog(@"filter: context %f", CFAbsoluteTimeGetCurrent() - start);
    });
  }
  
  return self;
}

- (void)dealloc
{
  [self unlinkTargets];
  [_filteringQueue cancelAllOperations];
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

- (nonnull NSOperation *)parseConfig:(nonnull id)config
                              images:(nonnull NSArray<UIImage *> *)images
{
  if ([config isKindOfClass:[NSNumber class]]) {
    
  }
}

- (void)runFilterPipeline:(BOOL)shouldInvalidate
{
  if (_targets.count > 0) {
    if (shouldInvalidate) {
      [self updateTarget:_targets[0] image:nil];
    }
    
    if (_jsonConfig != nil && _originalImages.count > 0) {
      
    }
  }
}

//- (nullable Filtering)filtering
//{
//  if (_name != nil) {
//    NSDictionary* filterings = [_imageNames reduce:^id(id acc, NSString *val, int idx) {
//      UIImage *image = [_originalImages objectForKey:val];
//      RCTImageView *target = [_targets objectForKey:val];
//
//      Filtering filtering = image && (NSNull *)image != [NSNull null] && target
//        ? (^RNFilteredImage *(void) {
//            return [RNFilteredImage createWithImage:image
//                                         resizeMode:target.resizeMode
//                                accumulatedCacheKey:[RNImageFilter imageCacheKey:target]];
//          })
//        : [[self.subviews at:idx] isKindOfClass:[RNImageFilter class]]
//        ? [(RNImageFilter *)[self.subviews at:idx] filtering]
//        : nil;
//
//      if (filtering) {
//        [acc setObject:filtering forKey:val];
//      }
//
//      return acc;
//    } init:[NSMutableDictionary dictionary]];
//
//    Filtering main = [filterings objectForKey:[_imageNames at:0]];
//
//    if (main) {
//      NSDictionary *inputs = [_paramNames
//                              reduce:^id(id acc, NSString *val, int idx) {
//                                RNTuple *tuple = [RNTuple createWith:[self valueForKey:val]
//                                                                 and:_paramTypes[idx]];
//                                [acc setObject:tuple forKey:val];
//                                return acc;
//                              } init:[NSMutableDictionary dictionary]];
//
//      return ^RNFilteredImage *(void) {
//        return [RNFilterPostProcessor process:self.name
//                                       inputs:inputs
//                                      context:[RNImageFilter context:self.name]
//                                   filterings:filterings
//                                 resizeOutput:self.resizeOutput
//                                    mainFrame:self.mainFrame];
//      };
//    }
//  }
//
//  return nil;
//}
//
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


+ (CIContext *)context:(NSString*)name
{
  return [filtersWithColorManagement some:^BOOL(id val, int idx) {
    return [val isEqualToString:name];
  }] ? context : contextWithColorManagement;
}

+ (nonnull NSString *)imageCacheKey:(RCTImageView *)image
{
  NSString *key = @"";
  for (RCTImageSource *source in image.imageSources) {
    key = [NSString stringWithFormat:@"%@,%@:%f:%@",
           key,
           [NSValue valueWithCGSize:source.size],
           source.scale,
           source.request.URL.absoluteString];
  }

  return [NSString stringWithFormat:@"{%@}", key];
}

@end
