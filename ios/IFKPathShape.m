#import "IFKPathShape.h"
#import "IFKFilterConstructor.h"

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

- (NSNumber *)inputRotation
{
  return _inputRotation ?: @(0);
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

  CGFloat centerX = frame.size.width / 2.0f;
  CGFloat centerY = frame.size.height / 2.0f;
  
  UIBezierPath *path = [self inputPath];
  
  UIGraphicsBeginImageContextWithOptions(frame.size, false, 1.0f);
  
  CGContextRef ctx = UIGraphicsGetCurrentContext();
  
  CGContextTranslateCTM(ctx, centerX, centerY);
  CGContextScaleCTM(ctx, 1.0f, -1.0f);
  CGContextRotateCTM(ctx, [[self inputRotation] floatValue]);
  
  [[UIColor colorWithCIColor:[self inputColor]] setFill];
  
  [path fill];
  
  UIImage *pathImage = UIGraphicsGetImageFromCurrentImageContext();
  
  UIGraphicsEndImageContext();
  
  return [[CIImage alloc] initWithImage:pathImage];
}

@end
