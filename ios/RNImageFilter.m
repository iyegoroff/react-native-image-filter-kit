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

@property (nonatomic, strong) UIImage *inputImage;
@property (nonatomic, weak) RNImageFilter *inputFilter;
@property (nonatomic, weak) RNImageFilter *outputFilter;
@property (nonatomic, weak) RCTImageView *target;
@property (nonatomic, strong) CIFilter* filter;

@end

@implementation RNImageFilter

- (void)dealloc
{
  [self unlinkTarget];
  [_inputFilter setOutputFilter:_outputFilter];
  [_outputFilter setInputFilter:_inputFilter];
  [_outputFilter setInputImage:_inputImage];
}

+ (CIContext *)createContextWithOptions:(nullable NSDictionary<NSString *, id> *)options
{
  // CFAbsoluteTime start = CFAbsoluteTimeGetCurrent();
  // use metal context if supported ?
  EAGLContext *eaglContext = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES3];
  eaglContext = eaglContext ?: [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2];
  
  CIContext *context = [CIContext contextWithEAGLContext:eaglContext options:options];
  // NSLog(@"filter: context %f", CFAbsoluteTimeGetCurrent() - start);
  
  return context;
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

- (void)layoutSubviews
{
  [super layoutSubviews];
  
  [self linkFilterPipeline];
}

- (void)linkFilterPipeline
{
  [self linkTarget];
  [self linkFilters:self];
}

- (void)linkTarget
{
  for (UIView *child in self.subviews) {
    if ([child isKindOfClass:[RCTImageView class]] && !_target) {
      _target = (RCTImageView *)child;
      [child addObserver:self
              forKeyPath:@"image"
                 options:NSKeyValueObservingOptionNew
                 context:NULL];
      break;
    }
  }
}

- (void)linkFilters:(UIView *)view
{
  for (UIView *child in view.subviews) {
    if ([child isKindOfClass:[RNImageFilter class]]) {
      RNImageFilter *filter = (RNImageFilter *)child;
      
      if (!_inputFilter) {
        _inputFilter = filter;
        [_inputFilter setOutputFilter:self];
        
        break;
      }
    } else if (![child isKindOfClass:[RCTImageView class]]) {
      [self linkFilters:child];
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
    [self runFilterPipeline:self];
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
      [self runFilterPipeline: _outputFilter];
      break;
    }
  }
}

- (void)runFilterPipeline:(RNImageFilter *)invalidationStartNode
{
  if (_filter) {
    [invalidationStartNode invalidateInputImages];
    RNImageFilter *filteringStartNode = [self setupFilteringStartNode];
    
    if (filteringStartNode) {
      UIImage *filteredImage = [filteringStartNode buildFilteredImage: [self resizeMode]];
      [self renderFilteredImage:filteredImage];
    }
  }
}

- (void)invalidateInputImages
{
  _inputImage = nil;
  [_outputFilter invalidateInputImages];
}

- (RNImageFilter *)setupFilteringStartNode
{
  if (_target && _inputImage) {
    return self;
    
  } else if (_target) {
    _inputImage = [_target.image copy];
    return self;
    
  } else if (_inputImage) {
    return self;
    
  } else if (_inputFilter) {
    return [_inputFilter setupFilteringStartNode];
    
  } else {
    return nil;
  }
}

- (UIImage *)buildFilteredImage:(RCTResizeMode)resizeMode
{
  UIImage *image = [self filteredImage:_inputImage filter:_filter resizeMode:resizeMode];
  
  if (_outputFilter) {
    _outputFilter.inputImage = [image copy];
    return [_outputFilter buildFilteredImage:resizeMode];

  } else {
    return image;
  }
}

- (RCTResizeMode)resizeMode
{
  if (_target) {
    return _target.resizeMode;
  }
  
  if (_inputFilter) {
    return [_inputFilter resizeMode];
  }
  
  return RCTResizeModeCover;
}

- (void)renderFilteredImage:(UIImage *)image
{
  if (_target) {
    [_target removeObserver:self forKeyPath:@"image"];
    [_target setImage:image];
    [_target addObserver:self
              forKeyPath:@"image"
                 options:NSKeyValueObservingOptionNew
                 context:NULL];
    
  } else if (_inputFilter) {
    [_inputFilter renderFilteredImage:image];
  }
}

- (UIImage *)filteredImage:(UIImage *)image
                    filter:(CIFilter *)filter
                resizeMode:(RCTResizeMode)resizeMode
{
  CIImage *tmp = [[CIImage alloc] initWithImage:image];
  [filter setValue:tmp forKey:@"inputImage"];
  
  CGSize imageSize = tmp.extent.size;
  
  [self updateInputCenter:filter bounds:imageSize];
  [self updateInputPoint0:filter bounds:imageSize];
  [self updateInputPoint1:filter bounds:imageSize];
  [self updateInputRadius:filter bounds:imageSize];
  [self updateInputWidth:filter bounds:imageSize];
  [self updateInputAmount:filter bounds:imageSize];
  
  CGRect outputRect = _resizeOutput ? filter.outputImage.extent : tmp.extent;
  
  CGImageRef cgim = [[self context] createCGImage:filter.outputImage fromRect:outputRect];
  
  UIImage *filteredImage = [RNImageFilter resizeImageIfNeeded:[UIImage imageWithCGImage:cgim]
                                                      srcSize:outputRect.size
                                                     destSize:image.size
                                                        scale:image.scale
                                                   resizeMode:resizeMode];
  
  CGImageRelease(cgim);
  
  return filteredImage;
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
