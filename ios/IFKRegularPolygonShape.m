#import "IFKRegularPolygonShape.h"
#import "IFKFilterConstructor.h"
#import "UIColor+CIColorComponents.h"

@implementation IFKRegularPolygonShape

+ (void)initialize
{
  [CIFilter registerFilterName:NSStringFromClass([IFKRegularPolygonShape class])
                   constructor:[IFKFilterConstructor constructor]
               classAttributes:@{kCIAttributeFilterDisplayName:@"Regular polygon shape",
                                 kCIAttributeFilterCategories:@[kCICategoryGenerator,
                                                                kCICategoryVideo,
                                                                kCICategoryStillImage]}];
}

- (NSNumber *)inputCircumradius
{
  return _inputCircumradius ?: @(150);
}

- (CIVector *)inputBorderRadiuses
{
  CGFloat radiuses[3] = {0, 0, 0};
  return _inputBorderRadiuses ?: [CIVector vectorWithValues:radiuses count:3];
}

- (CIImage *)outputImage
{
  if (self.inputExtent == nil) {
    return nil;
  }

  CGRect frame = CGRectMake(0, 0, self.inputExtent.Z, self.inputExtent.W);

  CGFloat circumradius = [[self inputCircumradius] floatValue];

  NSMutableArray<NSValue *> *points = [NSMutableArray array];
  [points addObject:@(CGPointMake(circumradius, 0))];

  size_t n = [self inputBorderRadiuses].count;
  for (int i = 1; i < n; i++) {
    [points addObject:@(CGPointMake(circumradius * cos(2.0 * M_PI * i / n),
                                    circumradius * sin(2.0 * M_PI * i / n)))];
  }

  UIBezierPath *path = [UIBezierPath bezierPath];
  [path moveToPoint:CGPointZero];

  for (int i = 0; i < n; i++) {
    CGPoint prev = [[points objectAtIndex:i == 0 ? (n - 1) : (i - 1)] CGPointValue];
    CGPoint cur = [[points objectAtIndex:i] CGPointValue];
    CGPoint next = [[points objectAtIndex:i == (n - 1) ? 0 : (i + 1)] CGPointValue];
    double dist = sqrt(pow(prev.x - cur.x, 2) + pow(prev.y - cur.y, 2));
    CGFloat radius = [[self inputBorderRadiuses] valueAtIndex:i];
    double fract = radius / dist;

    if (radius > 0) {
      CGPoint target = CGPointMake(cur.x - (cur.x - prev.x) * fract,
                                   cur.y - (cur.y - prev.y) * fract);

      if (i == 0) {
        [path moveToPoint:target];

      } else {
        [path addLineToPoint:target];
      }

      [path addQuadCurveToPoint:CGPointMake(cur.x + (next.x - cur.x) * fract,
                                            cur.y + (next.y - cur.y) * fract)
                   controlPoint:cur];

    } else if (i == 0) {
      [path moveToPoint:cur];

    } else {
      [path addLineToPoint:cur];
    }
  }

  [path closePath];

  [path applyTransform:CGAffineTransformMakeTranslation(frame.size.width / 2.0,
                                                        frame.size.height / 2.0)];

  UIGraphicsBeginImageContextWithOptions(frame.size, false, 1.0f);

  [[UIColor colorWithCIColorComponents:[self inputColor]] setFill];

  [path fill];

  UIImage *pathImage = UIGraphicsGetImageFromCurrentImageContext();

  UIGraphicsEndImageContext();

  return [[CIImage alloc] initWithImage:pathImage];
}


@end
