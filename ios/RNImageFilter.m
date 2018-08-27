#import "MustBeOverriden.h"
#import "Image/RCTImageView.h"
#import "Image/RCTImageUtils.h"
#import "RNImageFilter.h"
#import "RNFilterPostProcessor.h"
#import "RNFilteredImage.h"
#import "React/RCTImageSource.h"
#import "NSArray+FilterMapReduce.h"
#import "RNTuple.h"
#import <React/RCTLog.h>

@interface RNImageFilter ()

@property (nonatomic, strong) NSArray<UIImage *> *originalImages;
@property (nonatomic, strong) NSArray<RCTImageView *> *targets;
@property (nonatomic, strong) NSOperationQueue *filteringQueue;

@end

@implementation RNImageFilter

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _originalImages = [NSArray array];
    _targets = [NSArray array];
    _imageNames = [NSArray array];
    _paramNames = [NSArray array];
    _paramTypes = [NSArray array];
    _filteringQueue = [[NSOperationQueue alloc] init];
  }
  
  return self;
}


- (void)dealloc
{
  [self unlinkTargets];
  [_filteringQueue cancelAllOperations];
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  
  [self linkTargets];
}

- (CIContext *)context
{
  MUST_BE_OVERRIDEN()
}

- (void)linkTargets
{
  [self unlinkTargets];
  
  _targets = [self.subviews filter:^BOOL(__kindof UIView *val, int idx) {
    return [val isKindOfClass:[RCTImageView class]];
  }];
  
  if (_originalImages.count == 0) {
    _originalImages = [_targets map:^id(RCTImageView *val, int idx) {
      return [val.image copy] ?: [NSNull null];
    }];
  }
  
  for (RCTImageView *target in _targets) {
    [target addObserver:self
             forKeyPath:@"image"
                options:NSKeyValueObservingOptionNew
                context:NULL];
    
    [self renderFilteredImage:YES];
  }
}

- (void)unlinkTargets
{
  for (id target in _targets) {
    [target removeObserver:self forKeyPath:@"image"];
  }
}

- (nonnull RNImageFilter *)topFilter
{
  UIView* parent = self.superview;
  
  if ([parent isKindOfClass:[RNImageFilter class]]) {
    return [(RNImageFilter *)parent topFilter];
  } else {
    return self;
  }
}

- (nullable Filtering)filtering
{
  if (_name != nil) {
    NSDictionary* filterings = [_imageNames reduce:^id(id acc, NSString *val, int idx) {
      UIImage *image = [_originalImages at:idx];
      RCTImageView *target = [_targets at:idx];
      
      Filtering filtering = image && (NSNull *)image != [NSNull null] && target
        ? (^RNFilteredImage *(void) {
             return [RNFilteredImage createWithImage:image
                                          resizeMode:target.resizeMode
                                 accumulatedCacheKey:[RNImageFilter imageCacheKey:target]];
           })
        : [[self.subviews at:idx] isKindOfClass:[RNImageFilter class]]
        ? [(RNImageFilter *)[self.subviews at:idx] filtering]
        : nil;
      
      if (filtering) {
        [acc setObject:filtering forKey:val];
      }
      
      return acc;
    } init:[NSMutableDictionary dictionary]];
    
    Filtering main = [filterings objectForKey:[_imageNames at:0]];
    
    if (main) {
      NSDictionary *inputs = [_paramNames
                              reduce:^id(id acc, NSString *val, int idx) {
                                RNTuple *tuple = [RNTuple createWith:[self valueForKey:val]
                                                                 and:_paramTypes[idx]];
                                [acc setObject:tuple forKey:val];
                                return acc;
                              } init:[NSMutableDictionary dictionary]];
      
      return ^RNFilteredImage *(void) {
        return [RNFilterPostProcessor process:self.name
                                       inputs:inputs
                                      context:[self context]
                                   filterings:filterings
                                 resizeOutput:self.resizeOutput];
      };
    }
  }
  
  return nil;
}

- (void)renderFilteredImage:(BOOL)shouldInvalidate
{
  Filtering filtering = [[self topFilter] filtering];
  
  if (filtering) {
    __weak RNImageFilter *weakSelf = self;
    
    if (shouldInvalidate) {
      [self updateImage:nil];
    }
    
    [_filteringQueue cancelAllOperations];
    [_filteringQueue addOperationWithBlock:^{
      RNFilteredImage* image = filtering();

      [[NSOperationQueue mainQueue] addOperationWithBlock:^{
        RNImageFilter *strongSelf = weakSelf;

        if (image != nil && strongSelf != nil) {
          [strongSelf updateImage:image.image];
        }
      }];
    }];
  }
}

- (void)updateImage:(nullable UIImage *)image
{
  for (int i = 0; i < self.subviews.count; i++) {
    UIView *child = self.subviews[i];
    
    if ([child isKindOfClass:[RCTImageView class]]) {
      [self updateTarget:(RCTImageView *)child image:(i == 0 ? image : nil)];
    } else if ([child isKindOfClass:[RNImageFilter class]]) {
      [(RNImageFilter *)child updateImage:(i == 0 ? image : nil)];
    }
  }
}

- (void)updateTarget:(nullable RCTImageView *)target image:(nullable UIImage *)image
{
  [target removeObserver:self forKeyPath:@"image"];
  [target setImage:image];
  [target addObserver:self
           forKeyPath:@"image"
              options:NSKeyValueObservingOptionNew
              context:NULL];
}

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(RCTImageView *)object
                        change:(NSDictionary *)change
                       context:(void *)context {
  if ([keyPath isEqualToString:@"image"]) {
    _originalImages = [_originalImages map:^id(UIImage *val, int idx) {
      return object == [_targets at:idx] ? [object.image copy] : val;
    }];
    
    [self renderFilteredImage:YES];
  }
}

- (void)didSetProps:(NSArray<NSString *> *)changedProps
{
  for (NSString *paramName in _paramNames) {
    if ([changedProps containsObject:paramName] || [changedProps containsObject:@"resizeOutput"]) {
      [self renderFilteredImage:NO];
      break;
    }
  }
}

+ (CIContext *)createContextWithOptions:(nullable NSDictionary<NSString *, id> *)options
{
  // CFAbsoluteTime start = CFAbsoluteTimeGetCurrent();
  EAGLContext *eaglContext = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES3];
  eaglContext = eaglContext ?: [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2];
  
  CIContext *context = [CIContext contextWithEAGLContext:eaglContext options:options];
  // NSLog(@"filter: context %f", CFAbsoluteTimeGetCurrent() - start);
  
  return context;
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
