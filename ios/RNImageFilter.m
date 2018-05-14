#import <Foundation/Foundation.h>
#import "RNImageColorFilter.h"

@implementation RNImageColorFilter

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    // use metal context if supported
    EAGLContext *context = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2];
    // make _context static
    _context = [CIContext contextWithEAGLContext: context];
    
    _originalImages = [NSMapTable weakToStrongObjectsMapTable];
  }
  
  return self;
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  
  for (UIView *child in self.subviews) {
    if ([child isKindOfClass:[UIImageView class]]) {
      [child addObserver:self forKeyPath:@"image" options:NSKeyValueObservingOptionNew context:NULL];
    }
  }
  
  [self setBackgroundColor:[UIColor redColor]];
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context {
  if ([keyPath isEqualToString:@"image"]) {
    [self drawImages];
  }
}

- (void)drawImages {
  for (UIImageView *child in self.subviews) {
    if ([child isKindOfClass:[UIImageView class]]) {
      
      CIImage* originalImage = [_originalImages objectForKey:child];
      CIImage* image = originalImage ? originalImage : [[CIImage alloc] initWithImage:child.image];
      
      [_originalImages setObject:image forKey:child];
      
      // make each filter static by name and copy it each time
      CIFilter *filter = [CIFilter filterWithName:_name];
      [filter setValue:image forKey:@"inputImage"];

      if ([_paramNames containsObject:@"matrix"]) {
        NSLog(@"filter: matrix %@", _matrix);
        // [filter setValue:[NSNumber numberWithFloat:_radius] forKey:@"inputRadius"];
      }
      
      if ([_paramNames containsObject:@"radius"]) {
        [filter setValue:[NSNumber numberWithFloat:_radius] forKey:@"inputRadius"];
      }
      
      if ([_paramNames containsObject:@"angle"]) {
        [filter setValue:[NSNumber numberWithFloat:_angle] forKey:@"inputAngle"];
      }
      
      if ([_paramNames containsObject:@"noiseLevel"]) {
        [filter setValue:[NSNumber numberWithFloat:_noiseLevel] forKey:@"inputNoiseLevel"];
      }
      
      if ([_paramNames containsObject:@"sharpness"]) {
        [filter setValue:[NSNumber numberWithFloat:_sharpness] forKey:@"inputSharpness"];
      }
      
      if ([_paramNames containsObject:@"amount"]) {
        [filter setValue:[NSNumber numberWithFloat:_amount] forKey:@"inputAmount"];
      }
      
      if ([_paramNames containsObject:@"center"]) {
        [filter setValue:[CIVector vectorWithCGPoint:_filterCenter] forKey:@"inputCenter"];
      }
      
      if ([_paramNames containsObject:@"mask"]) {
        // maybe cgim should be deallocated?
        [filter setValue:[[CIImage alloc] initWithImage:_mask]  forKey:@"inputMask"];
      }
      
      NSLog(@"filter: s %@", [NSDate date]);
      // maybe cgim should be deallocated?
      CGImageRef cgim = [_context createCGImage:filter.outputImage
                                       fromRect:filter.outputImage.extent];
      
      UIImage *newImage = [UIImage imageWithCGImage:cgim];
      
      [child removeObserver:self forKeyPath:@"image"];
      [child setImage:newImage];
      [child addObserver:self forKeyPath:@"image" options:NSKeyValueObservingOptionNew context:NULL];
      NSLog(@"filter: e %@", [NSDate date]);
    }
  }
}

@end
