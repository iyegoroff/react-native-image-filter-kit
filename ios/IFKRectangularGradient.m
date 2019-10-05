#import "IFKRectangularGradient.h"

@implementation IFKRectangularGradient

+ (void)initialize
{
  [self initializeWithGradientClass:[IFKRectangularGradient class]
                        displayName:@"Rectangular Gradient (max 10 colors)"];
}

+ (CIKernel *)filterKernel:(int)colorsAmount {
  static NSArray<CIKernel *> *kernels;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    kernels = [self loadKernels:[IFKRectangularGradient class]];
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

- (NSNumber *)inputHalfWidth
{
  if (_inputHalfWidth != nil) {
    return _inputHalfWidth;
  }

  return @(self.inputExtent ? self.inputExtent.Z * 0.5 : 0);
}

- (NSNumber *)inputHalfHeight
{
  if (_inputHalfHeight != nil) {
    return _inputHalfHeight;
  }

  return @(self.inputExtent ? self.inputExtent.W * 0.5 : 0);
}

- (CIImage *)outputImage
{
  if (self.inputExtent == nil) {
    return nil;
  }

  int inputAmount = [self inputAmount];

  [IFKGradient assertMaxColors:[IFKRectangularGradient class] inputAmount:inputAmount];

  CIKernel *kernel = [IFKRectangularGradient filterKernel:inputAmount];
  NSMutableArray *args = [NSMutableArray array];

  for (int i = 0; i < inputAmount; i++) {
    [args addObject:self.inputColors[i]];
    [args addObject:@([self.inputStops valueAtIndex:i])];
  }

  [args addObject:self.inputCenter];
  [args addObject:self.inputHalfWidth];
  [args addObject:self.inputHalfHeight];
  [args addObject:self.inputMixStep];

  return [kernel applyWithExtent:[self.inputExtent CGRectValue]
                     roiCallback:^CGRect(int index, CGRect destRect) {
                       return destRect;
                     } arguments:args];
}

@end
