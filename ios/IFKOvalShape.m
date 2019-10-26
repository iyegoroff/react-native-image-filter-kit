#import "IFKOvalShape.h"
#import "IFKFilterConstructor.h"
#import "UIColor+CIColorComponents.h"

@implementation IFKOvalShape

+ (void)initialize
{
  [CIFilter registerFilterName:NSStringFromClass([IFKOvalShape class])
                   constructor:[IFKFilterConstructor constructor]
               classAttributes:@{kCIAttributeFilterDisplayName:@"Oval shape",
                                 kCIAttributeFilterCategories:@[kCICategoryGenerator,
                                                                kCICategoryVideo,
                                                                kCICategoryStillImage]}];
}

- (NSNumber *)inputRadiusX
{
  return _inputRadiusX ?: @(200);
}

- (NSNumber *)inputRadiusY
{
  return _inputRadiusY ?: @(100);
}

- (CIImage *)outputImage
{
  if (self.inputExtent == nil) {
    return nil;
  }

  CGRect frame = CGRectMake(0, 0, self.inputExtent.Z, self.inputExtent.W);

  CGFloat radiusX = [[self inputRadiusX] floatValue];
  CGFloat radiusY = [[self inputRadiusY] floatValue];
  CGFloat centerX = frame.size.width / 2.0f;
  CGFloat centerY = frame.size.height / 2.0f;

  UIBezierPath *oval = [UIBezierPath bezierPathWithOvalInRect:
                        CGRectMake(centerX - radiusX,
                                   centerY - radiusY,
                                   radiusX * 2.0f,
                                   radiusY * 2.0f)];

  UIGraphicsBeginImageContextWithOptions(frame.size, false, 1.0f);

  [[UIColor colorWithCIColorComponents:[self inputColor]] setFill];

  [oval fill];

  UIImage *ovalImage = UIGraphicsGetImageFromCurrentImageContext();

  UIGraphicsEndImageContext();

  return [[CIImage alloc] initWithImage:ovalImage];
}

@end
