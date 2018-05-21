#import <Foundation/Foundation.h>
#import "RNImageFilter.h"

static CIContext* context;

@interface RNImageFilter ()

@property (nonatomic, strong) NSMapTable<UIView *, CIImage *> *originalImages;
@property (nonatomic, strong) CIFilter* filter;

- (void)drawImages:(CIFilter* )filter;

@end

@implementation RNImageFilter

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
      //      CFAbsoluteTime start = CFAbsoluteTimeGetCurrent();
      // use metal context if supported ?
      EAGLContext *eaglContext = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES3];
      eaglContext = eaglContext ?: [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2];
      
      context = [CIContext contextWithEAGLContext:eaglContext];
      //      NSLog(@"filter: context %f", CFAbsoluteTimeGetCurrent() - start);
    });
    
    _originalImages = [NSMapTable weakToStrongObjectsMapTable];
  }
  
  return self;
}

- (void)dealloc
{
  for (UIView *child in self.subviews) {
    if ([child isKindOfClass:[UIImageView class]]) {
      [child removeObserver:self forKeyPath:@"image"];
    }
  }
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  
  for (UIView *child in self.subviews) {
    if ([child isKindOfClass:[UIImageView class]]) {
      [child addObserver:self
              forKeyPath:@"image"
                 options:NSKeyValueObservingOptionNew
                 context:NULL];
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
  if ([changedProps containsObject:@"name"]) {
    _filter = [CIFilter filterWithName:_name];
  }
  
  if ([_paramNames containsObject:@"radius"]) {
    [_filter setValue:[NSNumber numberWithFloat:_radius] forKey:@"inputRadius"];
  }
  
  if ([_paramNames containsObject:@"angle"]) {
    [_filter setValue:[NSNumber numberWithFloat:_angle] forKey:@"inputAngle"];
  }
  
  if ([_paramNames containsObject:@"noiseLevel"]) {
    [_filter setValue:[NSNumber numberWithFloat:_noiseLevel] forKey:@"inputNoiseLevel"];
  }
  
  if ([_paramNames containsObject:@"sharpness"]) {
    [_filter setValue:[NSNumber numberWithFloat:_sharpness] forKey:@"inputSharpness"];
  }
  
  if ([_paramNames containsObject:@"center"]) {
    CGPoint center = CGPointMake(_filterCenter.x * self.bounds.size.width,
                                 _filterCenter.y * self.bounds.size.height);
    NSLog(@"filter: %@", [NSValue valueWithCGPoint:center]);
    [_filter setValue:[CIVector vectorWithCGPoint:center] forKey:@"inputCenter"];
  }
  
  if ([_paramNames containsObject:@"amount"]) {
    [_filter setValue:[NSNumber numberWithFloat:_amount] forKey:@"inputAmount"];
  }
  
  if ([_paramNames containsObject:@"saturation"]) {
    [_filter setValue:[NSNumber numberWithFloat:_saturation] forKey:@"inputSaturation"];
  }

  if ([_paramNames containsObject:@"brightness"]) {
    [_filter setValue:[NSNumber numberWithFloat:_brightness] forKey:@"inputBrightness"];
  }

  if ([_paramNames containsObject:@"contrast"]) {
    [_filter setValue:[NSNumber numberWithFloat:_contrast] forKey:@"inputContrast"];
  }
  
  if ([_paramNames containsObject:@"minComponents"]) {
    CGFloat v[4] = {
      [_minComponents[0] floatValue],
      [_minComponents[1] floatValue],
      [_minComponents[2] floatValue],
      [_minComponents[3] floatValue]
    };

    [_filter setValue:[CIVector vectorWithValues:v count:4] forKey:@"inputMinComponents"];
  }
  
  if ([_paramNames containsObject:@"maxComponents"]) {
    CGFloat v[4] = {
      [_maxComponents[0] floatValue],
      [_maxComponents[1] floatValue],
      [_maxComponents[2] floatValue],
      [_maxComponents[3] floatValue]
    };
    
    [_filter setValue:[CIVector vectorWithValues:v count:4] forKey:@"inputMaxComponents"];
  }
  
  if ([_paramNames containsObject:@"levels"]) {
    [_filter setValue:[NSNumber numberWithFloat:_levels] forKey:@"inputLevels"];
  }
  
  for (NSString* paramName in _paramNames) {
    if ([changedProps containsObject:paramName]) {
      [self drawImages:[_filter copy]];
      break;
    }
  }
}

- (void)drawImages:(CIFilter *)filter {
  //  CFAbsoluteTime start = CFAbsoluteTimeGetCurrent();
  if (filter) {
    for (UIImageView *child in self.subviews) {
      if ([child isKindOfClass:[UIImageView class]]) {
        
        CIImage* originalImage = [_originalImages objectForKey:child];
        CIImage* image = originalImage
          ? originalImage
          : [[CIImage alloc] initWithImage:child.image];
        
        [_originalImages setObject:image forKey:child];
        
        [filter setValue:image forKey:@"inputImage"];
        
        CGImageRef cgim = [context createCGImage:filter.outputImage
                                        fromRect:image.extent];
        
        UIImage *newImage = [UIImage imageWithCGImage:cgim];
        
        [child removeObserver:self forKeyPath:@"image"];
        [child setImage:newImage];
        [child addObserver:self
                forKeyPath:@"image"
                   options:NSKeyValueObservingOptionNew
                   context:NULL];
        
        CGImageRelease(cgim);
      }
    }
  }
  //  NSLog(@"filter: draw %f", CFAbsoluteTimeGetCurrent() - start);
}

@end
