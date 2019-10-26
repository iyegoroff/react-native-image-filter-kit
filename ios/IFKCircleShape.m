#import "IFKCircleShape.h"
#import "IFKFilterConstructor.h"
#import "UIColor+CIColorComponents.h"

@implementation IFKCircleShape

+ (void)initialize
{
  [CIFilter registerFilterName:NSStringFromClass([IFKCircleShape class])
                   constructor:[IFKFilterConstructor constructor]
               classAttributes:@{kCIAttributeFilterDisplayName:@"Circle",
                                 kCIAttributeFilterCategories:@[kCICategoryGenerator,
                                                                kCICategoryVideo,
                                                                kCICategoryStillImage]}];
}

- (NSNumber *)inputRadius
{
  return _inputRadius ?: @(100);
}

- (CIImage *)outputImage
{
  if (self.inputExtent == nil) {
    return nil;
  }

  CGRect frame = CGRectMake(0, 0, self.inputExtent.Z, self.inputExtent.W);

  UIBezierPath *circle = [UIBezierPath bezierPathWithArcCenter:CGPointMake(frame.size.width / 2.0f,
                                                                           frame.size.height / 2.0f)
                                                        radius:[[self inputRadius] floatValue]
                                                    startAngle:0
                                                      endAngle:M_PI * 2.0
                                                     clockwise:YES];

  UIGraphicsBeginImageContextWithOptions(frame.size, false, 1.0f);

  [[UIColor colorWithCIColorComponents:[self inputColor]] setFill];

  [circle fill];

  UIImage *circleImage = UIGraphicsGetImageFromCurrentImageContext();

  UIGraphicsEndImageContext();

  return [[CIImage alloc] initWithImage:circleImage];
}

@end
