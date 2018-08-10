#import "MustBeOverriden.h"
#import "Image/RCTImageView.h"
#import "Image/RCTImageUtils.h"
#import "RNImageFilter.h"

#define UPDATE_FILTER_NUMBER_PROPERTY(Prop)                                                     \
- (void)updateInput##Prop:(CIFilter *)filter changedProps:(NSArray<NSString *> *)changedProps { \
  NSString* prop = @"input" @#Prop;                                                             \
  if ([_paramNames containsObject:prop] && [changedProps containsObject:prop]) {                \
    [filter setValue:[NSNumber numberWithFloat:_input##Prop] forKey:@"input" @#Prop];           \
  }                                                                                             \
}

#define UPDATE_FILTER_RELATIVE_NUMBER_PROPERTY(Prop)                                  \
- (void)updateInput##Prop:(CIFilter *)filter bounds:(CGSize)bounds {                  \
  if ([_paramNames containsObject:@"input" @#Prop] && _input##Prop != nil) {          \
    CGFloat num = [RNImageFilter convertRelativeNumber:_input##Prop bounds:bounds];   \
    [filter setValue:[NSNumber numberWithFloat:num] forKey:@"input" @#Prop];          \
  }                                                                                   \
}

#define UPDATE_FILTER_VECTOR_4_PROPERTY(Prop)                                       \
- (void)updateInput##Prop:(CIFilter *)filter {                                      \
  if ([_paramNames containsObject:@"input" @#Prop] && _input##Prop != nil) {        \
    CGFloat v[4] = {                                                                \
      [_input##Prop[0] floatValue],                                                 \
      [_input##Prop[1] floatValue],                                                 \
      [_input##Prop[2] floatValue],                                                 \
      [_input##Prop[3] floatValue]                                                  \
    };                                                                              \
    [filter setValue:[CIVector vectorWithValues:v count:4] forKey:@"input" @#Prop]; \
  }                                                                                 \
}

#define UPDATE_FILTER_RELATIVE_POINT_PROPERTY(Prop)                                  \
- (void)updateInput##Prop:(CIFilter *)filter bounds:(CGSize)bounds {                 \
  if ([_paramNames containsObject:@"input" @#Prop] && _input##Prop != nil) {         \
    CGFloat x = [RNImageFilter convertRelativeNumber:_input##Prop[0] bounds:bounds]; \
    CGFloat y = [RNImageFilter convertRelativeNumber:_input##Prop[1] bounds:bounds]; \
    CGPoint p = CGPointMake(x, y);                                                   \
    [filter setValue:[CIVector vectorWithCGPoint:p] forKey:@"input" @#Prop];         \
  }                                                                                  \
}

@interface UIImage (React)

@property (nonatomic, copy) CAKeyframeAnimation *reactKeyframeAnimation;

@end


@interface RNImageFilter ()

@property (nonatomic, strong) CIFilter* filter;
@property (nonatomic, strong) UIImage *inputImage;
@property (nonatomic, weak) RCTImageView *target;

@end

@implementation RNImageFilter

- (void)dealloc
{
  [self unlinkTarget];
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  
  [self linkTarget];
}

- (CIContext *)context
{
  MUST_BE_OVERRIDEN()
}

UPDATE_FILTER_NUMBER_PROPERTY(Angle);
UPDATE_FILTER_NUMBER_PROPERTY(NoiseLevel);
UPDATE_FILTER_NUMBER_PROPERTY(Sharpness);
UPDATE_FILTER_NUMBER_PROPERTY(Saturation);
UPDATE_FILTER_NUMBER_PROPERTY(Brightness);
UPDATE_FILTER_NUMBER_PROPERTY(Contrast);
UPDATE_FILTER_NUMBER_PROPERTY(Levels);
UPDATE_FILTER_NUMBER_PROPERTY(Scale);
UPDATE_FILTER_NUMBER_PROPERTY(Refraction);
UPDATE_FILTER_NUMBER_PROPERTY(Rotation);
UPDATE_FILTER_NUMBER_PROPERTY(Intensity);
UPDATE_FILTER_RELATIVE_NUMBER_PROPERTY(Amount);
UPDATE_FILTER_RELATIVE_NUMBER_PROPERTY(Radius);
UPDATE_FILTER_RELATIVE_NUMBER_PROPERTY(Width);
UPDATE_FILTER_RELATIVE_POINT_PROPERTY(Center);
UPDATE_FILTER_RELATIVE_POINT_PROPERTY(Point0);
UPDATE_FILTER_RELATIVE_POINT_PROPERTY(Point1);
UPDATE_FILTER_VECTOR_4_PROPERTY(MinComponents);
UPDATE_FILTER_VECTOR_4_PROPERTY(MaxComponents);
UPDATE_FILTER_VECTOR_4_PROPERTY(RVector);
UPDATE_FILTER_VECTOR_4_PROPERTY(GVector);
UPDATE_FILTER_VECTOR_4_PROPERTY(BVector);
UPDATE_FILTER_VECTOR_4_PROPERTY(AVector);
UPDATE_FILTER_VECTOR_4_PROPERTY(BiasVector);

- (void)linkTarget
{
  UIView* parent = self;
  
  while (!_target && parent.subviews.count > 0 && ![parent.subviews[0] isKindOfClass:[RNImageFilter class]]) {
    UIView* child = parent.subviews[0];
    if ([child isKindOfClass:[RCTImageView class]]) {
      _target = (RCTImageView *)child;
      [child addObserver:self
              forKeyPath:@"image"
                 options:NSKeyValueObservingOptionNew
                 context:NULL];
    } else {
      parent = child;
    }
  }
}

- (void)unlinkTarget
{
  if (_target) {
    [_target removeObserver:self forKeyPath:@"image"];
    _target = nil;
  }
}

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary *)change
                       context:(void *)context {
  if ([keyPath isEqualToString:@"image"]) {
    _inputImage = [_target.image copy];
    [self renderFilteredImage];
  }
}

- (void)didSetProps:(NSArray<NSString *> *)changedProps
{
  if ([changedProps containsObject:@"name"]) {
    _filter = [CIFilter filterWithName:_name];
  }
  
  [self updateInputAngle:_filter changedProps:changedProps];
  [self updateInputLevels:_filter changedProps:changedProps];
  [self updateInputContrast:_filter changedProps:changedProps];
  [self updateInputSharpness:_filter changedProps:changedProps];
  [self updateInputBrightness:_filter changedProps:changedProps];
  [self updateInputNoiseLevel:_filter changedProps:changedProps];
  [self updateInputSaturation:_filter changedProps:changedProps];
  [self updateInputScale:_filter changedProps:changedProps];
  [self updateInputRotation:_filter changedProps:changedProps];
  [self updateInputRefraction:_filter changedProps:changedProps];
  [self updateInputIntensity:_filter changedProps:changedProps];
  [self updateInputMinComponents:_filter];
  [self updateInputMaxComponents:_filter];
  [self updateInputRVector:_filter];
  [self updateInputGVector:_filter];
  [self updateInputBVector:_filter];
  [self updateInputAVector:_filter];
  [self updateInputBiasVector:_filter];
  
  for (NSString *paramName in _paramNames) {
    if ([changedProps containsObject:paramName] || [changedProps containsObject:@"resizeOutput"]) {
      [self renderFilteredImage];
      break;
    }
  }
}

- (void)renderFilteredImage
{
  if (_target) {
    UIImage *image = [self filteredImage:_inputImage resizeMode:_target.resizeMode];
    
    [_target removeObserver:self forKeyPath:@"image"];
    [_target setImage:image];
    [_target addObserver:self
              forKeyPath:@"image"
                 options:NSKeyValueObservingOptionNew
                 context:NULL];
  }
}

- (UIImage *)filteredImage:(UIImage *)image
                resizeMode:(RCTResizeMode)resizeMode
{
  if (image != nil) {
    CIImage *tmp = [[CIImage alloc] initWithImage:image];
    [_filter setValue:tmp forKey:@"inputImage"];
    
    CGSize imageSize = tmp.extent.size;
  
    [self updateInputCenter:_filter bounds:imageSize];
    [self updateInputPoint0:_filter bounds:imageSize];
    [self updateInputPoint1:_filter bounds:imageSize];
    [self updateInputRadius:_filter bounds:imageSize];
    [self updateInputWidth:_filter bounds:imageSize];
    [self updateInputAmount:_filter bounds:imageSize];
  
    CGRect outputRect = _resizeOutput ? _filter.outputImage.extent : tmp.extent;
    
    CGImageRef cgim = [[self context] createCGImage:_filter.outputImage fromRect:outputRect];
    
    UIImage *filteredImage = [RNImageFilter resizeImageIfNeeded:[UIImage imageWithCGImage:cgim]
                                                        srcSize:outputRect.size
                                                       destSize:image.size
                                                          scale:image.scale
                                                     resizeMode:resizeMode];
    
    CGImageRelease(cgim);
    
    return filteredImage;
  }
  
  return nil;
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

+ (UIImage *)resizeImageIfNeeded:(UIImage *)image
                         srcSize:(CGSize)srcSize
                        destSize:(CGSize)destSize
                           scale:(CGFloat)scale
                      resizeMode:(RCTResizeMode)resizeMode
{
  if (CGSizeEqualToSize(destSize, CGSizeZero) ||
      CGSizeEqualToSize(srcSize, CGSizeZero) ||
      CGSizeEqualToSize(srcSize, destSize)) {
    return image;
  }

  CAKeyframeAnimation *animation = image.reactKeyframeAnimation;
  CGRect targetSize = RCTTargetRect(srcSize, destSize, scale, resizeMode);
  CGAffineTransform transform = RCTTransformFromTargetRect(srcSize, targetSize);
  image = RCTTransformImage(image, destSize, scale, transform);
  image.reactKeyframeAnimation = animation;

  return image;
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
