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

//@property (nonatomic, strong) NSMapTable<UIView *, CIImage *> *originalImages;
//@property (nonatomic, strong) NSHashTable<UIView *> *observedImages;
//@property (nonatomic, strong) NSHashTable<RNImageFilter *> *observedFilters;
@property (nonatomic, weak) RNImageFilter *parentFilter;
@property (nonatomic, weak) CIImage *originalImage;
@property (nonatomic, weak) UIView *imageSource;
@property (nonatomic, strong) CIFilter* filter;

- (void)drawImages:(CIFilter* )filter;

@end

@implementation RNImageFilter

//- (instancetype)initWithFrame:(CGRect)frame
//{
//  if ((self = [super initWithFrame:frame])) {
//    _originalImages = [NSMapTable weakToStrongObjectsMapTable];
//    _observedImages = [NSHashTable weakObjectsHashTable];
//    _observedFilters = [NSHashTable weakObjectsHashTable];
//    _parentFilter = nil;
//  }
//  
//  return self;
//}

- (void)dealloc
{
  for (UIView *child in self.subviews) {
    if ([child isKindOfClass:[RCTImageView class]] && [_observedImages containsObject:child]) {
      [child removeObserver:self forKeyPath:@"image"];
    }
  }
  
  for (RNImageFilter *child in _observedFilters) {
    [child setParentFilter:nil];
  }
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
  
  [self addObservedFilters:self];
  
  for (UIView *child in self.subviews) {
    if ([child isKindOfClass:[RCTImageView class]] && ![_observedImages containsObject:child]) {
      [_observedImages addObject:child];
      [child addObserver:self
              forKeyPath:@"image"
                 options:NSKeyValueObservingOptionNew
                 context:NULL];
    }
  }
}

- (void)addObservedFilters:(UIView *)view
{
  for (UIView *child in view.subviews) {
    if ([child isKindOfClass:[RNImageFilter class]]) {
      RNImageFilter *filter = (RNImageFilter *)child;
      
      if (![_observedFilters containsObject:filter]) {
        [_observedFilters addObject:filter];
        [(RNImageFilter *)child setParentFilter:self];
      }
    } else if (![child isKindOfClass:[RCTImageView class]]) {
      [self addObservedFilters:child];
    }
  }
}

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary *)change
                       context:(void *)context {
  if ([keyPath isEqualToString:@"image"]) {
    [_originalImages removeObjectForKey:object];
    [self drawImages: [_filter copy]];
  }
}

- (void)didSetProps:(NSArray<NSString *> *)changedProps
{
//  NSLog(@"filter: %@", changedProps);
  if ([changedProps containsObject:@"name"]) {
//    NSLog(@"filter: %@", _name);
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
      [self drawImages:[_filter copy]];
      break;
    }
  }
}

- (void)drawImages:(CIFilter *)filter
{
//    CFAbsoluteTime start = CFAbsoluteTimeGetCurrent();
  if (filter) {
    for (UIView *child in self.subviews) {
      if ([child isKindOfClass:[RCTImageView class]]) {
        RCTImageView *imageChild = (RCTImageView *)child;
        CIImage *originalImage = [self originalImage:imageChild image:imageChild.image];
        UIImage *filteredImage = [self filteredImage:originalImage
                                              filter:filter
                                                size:imageChild.image.size
                                               scale:imageChild.image.scale
                                          resizeMode:imageChild.resizeMode];

        [imageChild removeObserver:self forKeyPath:@"image"];
        [imageChild setImage:filteredImage];
        [imageChild addObserver:self
                     forKeyPath:@"image"
                        options:NSKeyValueObservingOptionNew
                         context:NULL];
      }
    }
  }
//    NSLog(@"filter: draw %f", CFAbsoluteTimeGetCurrent() - start);
}

- (UIImage *)parentFilteredImage:(UIImage *)image resizeMode:(RCTResizeMode)resizeMode
{
  if (_parentFilter == nil) {
    return image;
  } else {
    CIImage *originalImage = [_parentFilter originalImage:self image:image];
    UIImage *filteredImage = [_parentFilter filteredImage:originalImage
                                                   filter:[[_parentFilter filter] copy]
                                                     size:image.size
                                                    scale:image.scale
                                               resizeMode:resizeMode];
    
    return [_parentFilter parentFilteredImage:filteredImage resizeMode:resizeMode];
  }
}

- (CIImage *)originalImage:(UIView *)view image:(UIImage *)image
{
  CIImage *originalImage = [_originalImages objectForKey:view];
  originalImage = originalImage ?: [[CIImage alloc] initWithImage:image];
  
  [_originalImages setObject:originalImage forKey:view];
  
  return originalImage;
}

- (UIImage *)filteredImage:(CIImage *)image
                    filter:(CIFilter *)filter
                      size:(CGSize)size
                     scale:(CGFloat)scale
                resizeMode:(RCTResizeMode)resizeMode
{
  [filter setValue:image forKey:@"inputImage"];
  
  CGSize imageSize = image.extent.size;
  
  [self updateInputCenter:filter bounds:imageSize];
  [self updateInputPoint0:filter bounds:imageSize];
  [self updateInputPoint1:filter bounds:imageSize];
  [self updateInputRadius:filter bounds:imageSize];
  [self updateInputWidth:filter bounds:imageSize];
  [self updateInputAmount:filter bounds:imageSize];
  
  CGRect outputRect = _resizeOutput ? filter.outputImage.extent : image.extent;
  
  CGImageRef cgim = [[self context] createCGImage:filter.outputImage fromRect:outputRect];
  
  UIImage *filteredImage = [RNImageFilter resizeImageIfNeeded:[UIImage imageWithCGImage:cgim]
                                                      srcSize:outputRect.size
                                                     destSize:size
                                                        scale:scale
                                                   resizeMode:resizeMode];
  
  CGImageRelease(cgim);
  
  return [self parentFilteredImage:filteredImage resizeMode:resizeMode];
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
