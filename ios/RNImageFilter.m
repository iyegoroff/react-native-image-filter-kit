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

@property (nonatomic, strong) NSDictionary<NSString *, UIImage *> *originalImages;
@property (nonatomic, strong) NSDictionary<NSString *, RCTImageView *> *targets;
@property (nonatomic, strong) NSHashTable<RCTImageView *> *targetSubscriptions;
@property (nonatomic, strong) NSOperationQueue *filteringQueue;

@end

@implementation RNImageFilter

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _originalImages = [NSDictionary dictionary];
    _targets = [NSDictionary dictionary];
    _targetSubscriptions = [NSHashTable weakObjectsHashTable];
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
  
//  RCTLog(@"filter: layout %@", [self filterStack]);
}

- (CIContext *)context
{
  MUST_BE_OVERRIDEN()
}

- (NSDictionary *)filterStack
{
  RNImageFilter *top = [self topFilter];
  return [NSDictionary dictionaryWithObject:[RNImageFilter enumerateFilters:top] forKey:top.name];
}

+ (NSDictionary *)enumerateFilters:(RNImageFilter*)filter
{
  return [filter.subviews reduce:^id(id acc, __kindof UIView *val, int idx) {
    if ([val isKindOfClass:[RNImageFilter class]]) {
      RNImageFilter *filt = (RNImageFilter *)val;
      [acc setObject:[RNImageFilter enumerateFilters:filt] forKey:filt.name];
    } else if ([val isKindOfClass:[RCTImageView class]]) {
      [acc setObject:@"image" forKey:[NSNumber numberWithInteger:idx]];
    }
    
    return acc;
  } init:[NSMutableDictionary dictionary]];
}

- (void)linkTargets
{
  [self unlinkTargets];
  
  _targets = [_imageNames reduce:^id(id acc, NSString *val, int idx) {
    UIView *target = [self.subviews count] > idx ? self.subviews[idx] : nil;
    
    if ([target isKindOfClass:[RCTImageView class]]) {
      [acc setObject:target forKey:val];
    }
    
    return acc;
  } init:[NSMutableDictionary dictionary]];
  
  
  _originalImages = [[_targets allKeys] reduce:^id(id acc, NSString *val, int idx) {
    UIImage *image = [_originalImages objectForKey:val]
      ?: [[_targets objectForKey:val].image copy]
      ?: [NSNull null];
    
    if (image) {
      [acc setObject:image forKey:val];
    }
    
    return acc;
  } init:[NSMutableDictionary dictionary]];
  
  for (RCTImageView *target in [_targets allValues]) {
    if (![_targetSubscriptions containsObject:target]) {
      [target addObserver:self
               forKeyPath:@"image"
                  options:NSKeyValueObservingOptionNew
                  context:NULL];
      [_targetSubscriptions addObject:target];
    }
    
    [[self topFilter] renderFilteredImage:YES];
  }
}

- (void)unlinkTargets
{
  for (RCTImageView *target in [_targets allValues]) {
    if ([_targetSubscriptions containsObject:target]) {
      [target removeObserver:self forKeyPath:@"image"];
      [_targetSubscriptions removeObject:target];
    }
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
      UIImage *image = [_originalImages objectForKey:val];
      RCTImageView *target = [_targets objectForKey:val];
      
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
  Filtering filtering = [self filtering];
  
  if (filtering) {
    __weak RNImageFilter *weakSelf = self;
    
    if (shouldInvalidate) {
      [self updateImage:nil];
    }
    
    [_filteringQueue cancelAllOperations];
    [_filteringQueue addOperationWithBlock:^{
      RNFilteredImage *image = filtering();
      
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
  if (self.subviews.count != 0) {
    UIView *child = self.subviews[0];
    
    if ([child isKindOfClass:[RCTImageView class]]) {
      [self updateTarget:(RCTImageView *)child image:image];
    } else if ([child isKindOfClass:[RNImageFilter class]]) {
      [(RNImageFilter *)child updateImage:image];
    }
  }
}

- (void)updateTarget:(nullable RCTImageView *)target image:(nullable UIImage *)image
{
  BOOL isObserved = [_targetSubscriptions containsObject:target];
  
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
    _originalImages = [[_originalImages allKeys] reduce:^id(id acc, NSString *val, int idx) {
      UIImage *image = object == [_targets objectForKey:val]
        ? [object.image copy]
        : [_originalImages objectForKey:val];
      
      [acc setObject:image forKey:val];
      
      return acc;
    } init:[NSMutableDictionary dictionary]];
    
    [[self topFilter] renderFilteredImage:YES];
  }
}

- (void)didSetProps:(NSArray<NSString *> *)changedProps
{
  for (NSString *paramName in _paramNames) {
    if ([changedProps containsObject:paramName] || [changedProps containsObject:@"resizeOutput"]) {
//      RCTLog(@"filter: set props %@", [self filterStack]);
      [[self topFilter] renderFilteredImage:NO];
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
