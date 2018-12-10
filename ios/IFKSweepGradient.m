#import "IFKSweepGradient.h"
#import <React/RCTAssert.h>

@implementation IFKSweepGradient
  
+ (void)initialize
{
  [self initializeWithGradientClass:[IFKSweepGradient class]
                        displayName:@"Sweep Gradient (max 5 colors)"];
}
  
+ (CIKernel *)filterKernel:(int)colorsAmount {
  static NSArray<CIKernel *> *kernels;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    kernels = [self loadKernels:[IFKSweepGradient class]];
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
  
- (CIImage *)outputImage
{
  if (self.inputExtent == nil) {
    return nil;
  }
  
  int inputAmount = [self.inputAmount intValue];
  
  RCTAssert(inputAmount > 0 && inputAmount <= 5,
            @"ImageFilterKit: IFKSweepGradient takes only up to 5 colors, submitted %i colors.",
            inputAmount);
  
  CIKernel *kernel = [IFKSweepGradient filterKernel:inputAmount];
  
  NSArray *args = inputAmount == 1
    ? @[self.inputExtent,
        self.inputColor0,
        self.inputStop0,
        self.inputCenter]
    : inputAmount == 2
    ? @[self.inputExtent,
        self.inputColor0,
        self.inputStop0,
        self.inputColor1,
        self.inputStop1,
        self.inputCenter]
    : inputAmount == 3
    ? @[self.inputExtent,
        self.inputColor0,
        self.inputStop0,
        self.inputColor1,
        self.inputStop1,
        self.inputColor2,
        self.inputStop2,
        self.inputCenter]
    : inputAmount == 4
    ? @[self.inputExtent,
        self.inputColor0,
        self.inputStop0,
        self.inputColor1,
        self.inputStop1,
        self.inputColor2,
        self.inputStop2,
        self.inputColor3,
        self.inputStop3,
        self.inputCenter]
    : @[self.inputExtent,
        self.inputColor0,
        self.inputStop0,
        self.inputColor1,
        self.inputStop1,
        self.inputColor2,
        self.inputStop2,
        self.inputColor3,
        self.inputStop3,
        self.inputColor4,
        self.inputStop4,
        self.inputCenter];
  
  return [kernel applyWithExtent:[self.inputExtent CGRectValue]
                     roiCallback:^CGRect(int index, CGRect destRect) {
                       return destRect;
                     } arguments:args];
}
@end
