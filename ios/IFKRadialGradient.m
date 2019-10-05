#import "IFKRadialGradient.h"

@implementation IFKRadialGradient

+ (void)initialize
{
  [self initializeWithGradientClass:[IFKRadialGradient class]
                        displayName:@"Radial Gradient (max 10 colors)"];
}

+ (CIKernel *)filterKernel:(int)colorsAmount {
  static NSArray<CIKernel *> *kernels;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    kernels = [self loadKernels:[IFKRadialGradient class]];
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

- (NSNumber *)inputRadius
{
  if (_inputRadius != nil) {
    return _inputRadius;
  }

  return @(self.inputExtent ? MIN(self.inputExtent.Z, self.inputExtent.W) * 0.5 : 0);
}

- (CIImage *)outputImage
{
  if (self.inputExtent == nil) {
    return nil;
  }

  int inputAmount = [self inputAmount];

  [IFKGradient assertMaxColors:[IFKRadialGradient class] inputAmount:inputAmount];

  CIKernel *kernel = [IFKRadialGradient filterKernel:inputAmount];
  NSMutableArray *args = [NSMutableArray array];

  for (int i = 0; i < inputAmount; i++) {
    [args addObject:self.inputColors[i]];
    [args addObject:@([self.inputStops valueAtIndex:i])];
  }

  [args addObject:self.inputCenter];
  [args addObject:self.inputRadius];
  [args addObject:self.inputMixStep];

  return [kernel applyWithExtent:[self.inputExtent CGRectValue]
                     roiCallback:^CGRect(int index, CGRect destRect) {
                       return destRect;
                     } arguments:args];
}

@end
