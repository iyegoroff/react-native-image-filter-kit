#import "IFKLinearGradient.h"

@implementation IFKLinearGradient

+ (void)initialize
{
  [self initializeWithGradientClass:[IFKLinearGradient class]
                        displayName:@"Linear Gradient (max 10 colors)"];
}

+ (CIKernel *)filterKernel:(int)colorsAmount
{
  static NSArray<CIKernel *> *kernels;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    kernels = [self loadKernels:[IFKLinearGradient class]];
  });

  return kernels[colorsAmount - 1];
}

- (CIVector *)inputStart
{
  if (_inputStart) {
    return _inputStart;
  }

  return [CIVector vectorWithCGPoint:self.inputExtent
          ? CGPointMake(self.inputExtent.X, self.inputExtent.Y)
          : CGPointZero];
}

- (CIVector *)inputEnd
{
  if (_inputEnd) {
    return _inputEnd;
  }

  return [CIVector vectorWithCGPoint:self.inputExtent
          ? CGPointMake(self.inputExtent.X + self.inputExtent.Z, self.inputExtent.Y)
          : CGPointZero];
}

- (CIImage *)outputImage
{
  if (self.inputExtent == nil) {
    return nil;
  }

  int inputAmount = [self inputAmount];

  [IFKGradient assertMaxColors:[IFKLinearGradient class] inputAmount:inputAmount];

  CIKernel *kernel = [IFKLinearGradient filterKernel:inputAmount];
  NSMutableArray *args = [NSMutableArray array];

  for (int i = 0; i < inputAmount; i++) {
    [args addObject:self.inputColors[i]];
    [args addObject:@([self.inputStops valueAtIndex:i])];
  }

  [args addObject:self.inputStart];
  [args addObject:self.inputEnd];
  [args addObject:self.inputMixStep];

  return [kernel applyWithExtent:[self.inputExtent CGRectValue]
                     roiCallback:^CGRect(int index, CGRect destRect) {
                       return destRect;
                     } arguments:args];
}

@end
