#import "IFKEllipticalGradient.h"

@implementation IFKEllipticalGradient

+ (void)initialize
{
  [self initializeWithGradientClass:[IFKEllipticalGradient class]
                        displayName:@"Elliptical Gradient (max 10 colors)"];
}

+ (CIKernel *)filterKernel:(int)colorsAmount {
  static NSArray<CIKernel *> *kernels;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    kernels = [self loadKernels:[IFKEllipticalGradient class]];
  });

  return kernels[colorsAmount - 1];
}

- (CIVector *)inputCenter
{
  if (_inputCenter) {
    return _inputCenter;
  }

  return [CIVector vectorWithCGPoint:self.inputExtent
          ? CGPointMake(self.inputExtent.X + self.inputExtent.Z * 0.5,
                        self.inputExtent.Y + self.inputExtent.W * 0.5)
                                    : CGPointZero];
}

- (NSNumber *)inputRadiusX
{
  if (_inputRadiusX != nil) {
    return _inputRadiusX;
  }

  return @(self.inputExtent ? self.inputExtent.Z * 0.5 : 0);
}

- (NSNumber *)inputRadiusY
{
  if (_inputRadiusY != nil) {
    return _inputRadiusY;
  }

  return @(self.inputExtent ? self.inputExtent.W * 0.5 : 0);
}

- (CIImage *)outputImage
{
  if (self.inputExtent == nil) {
    return nil;
  }

  int inputAmount = [self inputAmount];

  [IFKGradient assertMaxColors:[IFKEllipticalGradient class] inputAmount:inputAmount];

  CIKernel *kernel = [IFKEllipticalGradient filterKernel:inputAmount];
  NSMutableArray *args = [NSMutableArray array];

  for (int i = 0; i < inputAmount; i++) {
    [args addObject:self.inputColors[i]];
    [args addObject:@([self.inputStops valueAtIndex:i])];
  }

  [args addObject:self.inputCenter];
  [args addObject:self.inputRadiusX];
  [args addObject:self.inputRadiusY];
  [args addObject:self.inputMixStep];

  return [kernel applyWithExtent:[self.inputExtent CGRectValue]
                     roiCallback:^CGRect(int index, CGRect destRect) {
                       return destRect;
                     } arguments:args];
}

@end
