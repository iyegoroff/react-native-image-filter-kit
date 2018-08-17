#import "MustBeOverriden.h"
#import "Image/RCTImageView.h"
#import "Image/RCTImageUtils.h"
#import "RNImageFilter.h"
#import "RNFilterPostProcessor.h"
#import "RNFilteredImage.h"
#import "React/RCTImageSource.h"
#import "NSArray+FilterMapReduce.h"

#define UPDATE_FILTER_NUMBER_INPUT(Prop)                                             \
- (void)updateInput##Prop:(NSMutableDictionary *)dict                                \
             changedProps:(NSArray<NSString *> *)changedProps {                      \
  NSString* prop = @"input" @#Prop;                                                  \
  if ([_paramNames containsObject:prop] && [changedProps containsObject:prop]) {     \
    [dict setObject:[NSNumber numberWithFloat:_input##Prop] forKey:@"input" @#Prop]; \
  }                                                                                  \
}

#define UPDATE_FILTER_RELATIVE_NUMBER_INPUT(Prop)                                    \
- (void)updateInput##Prop:(NSMutableDictionary *)dict bounds:(CGSize)bounds {        \
  if ([_paramNames containsObject:@"input" @#Prop] && _input##Prop != nil) {         \
    CGFloat num = [RNImageFilter convertRelativeNumber:_input##Prop bounds:bounds];  \
    [dict setObject:[NSNumber numberWithFloat:num] forKey:@"input" @#Prop];          \
  }                                                                                  \
}

#define UPDATE_FILTER_VECTOR_4_INPUT(Prop)                                         \
- (void)updateInput##Prop:(NSMutableDictionary *)dict {                            \
  if ([_paramNames containsObject:@"input" @#Prop] && _input##Prop != nil) {       \
    CGFloat v[4] = {                                                               \
      [_input##Prop[0] floatValue],                                                \
      [_input##Prop[1] floatValue],                                                \
      [_input##Prop[2] floatValue],                                                \
      [_input##Prop[3] floatValue]                                                 \
    };                                                                             \
    [dict setObject:[CIVector vectorWithValues:v count:4] forKey:@"input" @#Prop]; \
  }                                                                                \
}

#define UPDATE_FILTER_RELATIVE_POINT_INPUT(Prop)                                      \
- (void)updateInput##Prop:(NSMutableDictionary *)dict bounds:(CGSize)bounds {         \
  if ([_paramNames containsObject:@"input" @#Prop] && _input##Prop != nil) {          \
    CGFloat x = [RNImageFilter convertRelativeNumber:_input##Prop[0] bounds:bounds];  \
    CGFloat y = [RNImageFilter convertRelativeNumber:_input##Prop[1] bounds:bounds];  \
    CGPoint p = CGPointMake(x, y);                                                    \
    [dict setObject:[CIVector vectorWithCGPoint:p] forKey:@"input" @#Prop];           \
  }                                                                                   \
}

@interface RNImageFilter ()

@property (nonatomic, strong) NSMutableDictionary *inputs;
@property (nonatomic, strong) NSArray<UIImage *> *originalImages;
@property (nonatomic, strong) NSArray<RCTImageView *> *targets;

@end

@implementation RNImageFilter

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _inputs = [NSMutableDictionary dictionary];
    _originalImages = [NSArray array];
    _targets = [NSArray array];
    _imageNames = [NSArray array];
  }
  
  return self;
}


- (void)dealloc
{
  [self unlinkTargets];
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

UPDATE_FILTER_NUMBER_INPUT(Angle);
UPDATE_FILTER_NUMBER_INPUT(NoiseLevel);
UPDATE_FILTER_NUMBER_INPUT(Sharpness);
UPDATE_FILTER_NUMBER_INPUT(Saturation);
UPDATE_FILTER_NUMBER_INPUT(Brightness);
UPDATE_FILTER_NUMBER_INPUT(Contrast);
UPDATE_FILTER_NUMBER_INPUT(Levels);
UPDATE_FILTER_NUMBER_INPUT(Refraction);
UPDATE_FILTER_NUMBER_INPUT(Rotation);
UPDATE_FILTER_NUMBER_INPUT(Intensity);
UPDATE_FILTER_NUMBER_INPUT(Power);
UPDATE_FILTER_RELATIVE_NUMBER_INPUT(Amount);
UPDATE_FILTER_RELATIVE_NUMBER_INPUT(Radius);
UPDATE_FILTER_RELATIVE_NUMBER_INPUT(Width);
UPDATE_FILTER_RELATIVE_NUMBER_INPUT(Scale);
UPDATE_FILTER_RELATIVE_POINT_INPUT(Center);
UPDATE_FILTER_RELATIVE_POINT_INPUT(Point0);
UPDATE_FILTER_RELATIVE_POINT_INPUT(Point1);
UPDATE_FILTER_VECTOR_4_INPUT(MinComponents);
UPDATE_FILTER_VECTOR_4_INPUT(MaxComponents);
UPDATE_FILTER_VECTOR_4_INPUT(RVector);
UPDATE_FILTER_VECTOR_4_INPUT(GVector);
UPDATE_FILTER_VECTOR_4_INPUT(BVector);
UPDATE_FILTER_VECTOR_4_INPUT(AVector);
UPDATE_FILTER_VECTOR_4_INPUT(BiasVector);

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
    
    [self renderFilteredImage];
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

- (nullable RNFilteredImage *)filteredImage
{
  if (_name != nil) {
    NSDictionary* inputs = [_imageNames reduce:^id(id acc, NSString *val, int idx) {
      UIImage *image = [_originalImages at:idx];
      RCTImageView *target = [_targets at:idx];
      
      RNFilteredImage *filteredImage = image && (NSNull *)image != [NSNull null] && target
        ? [RNFilteredImage createWithImage:image
                                resizeMode:target.resizeMode
                       accumulatedCacheKey:[RNImageFilter imageCacheKey:target]]
        : [[self.subviews at:idx] isKindOfClass:[RNImageFilter class]]
        ? [(RNImageFilter *)[self.subviews at:idx] filteredImage]
        : nil;
      
      if (filteredImage) {
        [acc setObject:filteredImage forKey:val];
      }
      
      return acc;
    } init:[NSMutableDictionary dictionary]];
    
    RNFilteredImage* main = [inputs objectForKey:[_imageNames at:0]];
    
    if (main) {
      [self updateDependentInputs:main.image];
      
      return [[self postProcessor] process:inputs];
    }
  }
  
  return nil;
}

- (void)updateDependentInputs:(UIImage *)image
{
  CGSize size = [[CIImage alloc] initWithImage:image].extent.size;
  
  [self updateInputCenter:_inputs bounds:size];
  [self updateInputPoint0:_inputs bounds:size];
  [self updateInputPoint1:_inputs bounds:size];
  [self updateInputRadius:_inputs bounds:size];
  [self updateInputWidth:_inputs bounds:size];
  [self updateInputAmount:_inputs bounds:size];
  [self updateInputScale:_inputs bounds:size];
}

- (RNFilterPostProcessor *)postProcessor
{
  return [RNFilterPostProcessor createWithName:_name
                                        inputs:_inputs
                                       context:[self context]
                                  resizeOutput:_resizeOutput];
}

- (void)renderFilteredImage
{
  RNFilteredImage *image = [[self topFilter] filteredImage];
  
  if (image) {
    [self updateImage:image.image];
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
    
    [self renderFilteredImage];
  }
}

- (void)didSetProps:(NSArray<NSString *> *)changedProps
{  
  [self updateInputAngle:_inputs changedProps:changedProps];
  [self updateInputLevels:_inputs changedProps:changedProps];
  [self updateInputContrast:_inputs changedProps:changedProps];
  [self updateInputSharpness:_inputs changedProps:changedProps];
  [self updateInputBrightness:_inputs changedProps:changedProps];
  [self updateInputNoiseLevel:_inputs changedProps:changedProps];
  [self updateInputSaturation:_inputs changedProps:changedProps];
  [self updateInputRotation:_inputs changedProps:changedProps];
  [self updateInputRefraction:_inputs changedProps:changedProps];
  [self updateInputIntensity:_inputs changedProps:changedProps];
  [self updateInputPower:_inputs changedProps:changedProps];
  [self updateInputMinComponents:_inputs];
  [self updateInputMaxComponents:_inputs];
  [self updateInputRVector:_inputs];
  [self updateInputGVector:_inputs];
  [self updateInputBVector:_inputs];
  [self updateInputAVector:_inputs];
  [self updateInputBiasVector:_inputs];
  
  for (NSString *paramName in _paramNames) {
    if ([changedProps containsObject:paramName] || [changedProps containsObject:@"resizeOutput"]) {
      [self renderFilteredImage];
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

+ (CGFloat)convertRelativeNumber:(NSString *)relative bounds:(CGSize)bounds
{
  double num;
  NSScanner *scanner = [NSScanner scannerWithString:relative];
  
  [scanner scanDouble:&num];
  NSString *unit = [relative substringFromIndex:[scanner scanLocation]];
  
  if ([unit isEqualToString:@""]) {
    return num;
  }
  
  if ([unit isEqualToString:@"h"]) {
    return num * bounds.height * 0.01f;
  }
  
  if ([unit isEqualToString:@"w"]) {
    return num * bounds.width * 0.01f;
  }
  
  if ([unit isEqualToString:@"max"]) {
    return num * MAX(bounds.width, bounds.height) * 0.01f;
  }
  
  if ([unit isEqualToString:@"min"]) {
    return num * MIN(bounds.width, bounds.height) * 0.01f;
  }
  
  if (RCT_DEBUG) {
    RCTAssert(false, @"Invalid relative number - %@", relative);
  }
  
  return num;
}

@end
