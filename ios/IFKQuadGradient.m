#import "IFKQuadGradient.h"

@implementation IFKQuadGradient

+ (void)initialize
{
  [self initializeWithGradientClass:[IFKQuadGradient class]
                        displayName:@"Quad Gradient"];
}

+ (CIKernel *)filterKernel {
  static NSArray<CIKernel *> *kernels;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    kernels = [self loadKernels:[IFKQuadGradient class]];
  });

  return kernels[0];
}

- (CIColor *)inputBottomLeftColor
{
  return _inputBottomLeftColor ?: [CIColor colorWithRed:1.0f green:1.0f blue:1.0f];
}

- (CIColor *)inputBottomRightColor
{
  return _inputBottomRightColor ?: [CIColor colorWithRed:1.0f green:1.0f blue:1.0f];
}

- (CIColor *)inputTopLeftColor
{
  return _inputTopLeftColor ?: [CIColor colorWithRed:1.0f green:1.0f blue:1.0f];
}

- (CIColor *)inputTopRightColor
{
  return _inputTopRightColor ?: [CIColor colorWithRed:1.0f green:1.0f blue:1.0f];
}

- (CIImage *)outputImage
{
  if (self.inputExtent == nil) {
    return nil;
  }

  CIKernel *kernel = [IFKQuadGradient filterKernel];
  NSArray *args = @[self.inputBottomLeftColor,
                    self.inputBottomRightColor,
                    self.inputTopLeftColor,
                    self.inputTopRightColor,
                    @(self.inputExtent.Z),
                    @(self.inputExtent.W)];

  return [kernel applyWithExtent:[self.inputExtent CGRectValue]
                     roiCallback:^CGRect(int index, CGRect destRect) {
                       return destRect;
                     } arguments:args];
}

@end
