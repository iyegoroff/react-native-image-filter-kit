#import "IFKPathShape.h"
#import "IFKFilterConstructor.h"
#import "UIColor+CIColorComponents.h"

@implementation IFKPathShape

+ (void)initialize
{
  [CIFilter registerFilterName:NSStringFromClass([IFKPathShape class])
                   constructor:[IFKFilterConstructor constructor]
               classAttributes:@{kCIAttributeFilterDisplayName:@"Path shape",
                                 kCIAttributeFilterCategories:@[kCICategoryGenerator,
                                                                kCICategoryVideo,
                                                                kCICategoryStillImage]}];
}

- (UIBezierPath *)inputPath
{
  return _inputPath ?: [UIBezierPath bezierPath];
}

- (CIImage *)outputImage
{
  if (self.inputExtent == nil) {
    return nil;
  }

  CGRect frame = CGRectMake(0, 0, self.inputExtent.Z, self.inputExtent.W);

  UIBezierPath *path = [self inputPath];

  [path applyTransform:CGAffineTransformConcat(CGAffineTransformMakeScale(1.0, -1.0),
                                               CGAffineTransformMakeTranslation(frame.size.width / 2.0,
                                                                                frame.size.height / 2.0))];

  UIGraphicsBeginImageContextWithOptions(frame.size, false, 1.0f);

  [[UIColor colorWithCIColorComponents:[self inputColor]] setFill];

  [path fill];

  UIImage *pathImage = UIGraphicsGetImageFromCurrentImageContext();

  UIGraphicsEndImageContext();

  return [[CIImage alloc] initWithImage:pathImage];
}

@end
