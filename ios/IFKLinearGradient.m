#import "IFKLinearGradient.h"
#import "IFKFilterConstructor.h"
#import <React/RCTAssert.h>

@implementation IFKLinearGradient
  
+ (void)initialize
{
   [CIFilter registerFilterName:NSStringFromClass([IFKLinearGradient class])
                    constructor:[IFKFilterConstructor constructor]
                classAttributes:@{kCIAttributeFilterDisplayName:@"Linear Gradient (max 5 colors)",
                                   kCIAttributeFilterCategories:@[kCICategoryGradient,
                                                                  kCICategoryVideo,
                                                                  kCICategoryStillImage]}];
}
  
+ (CIKernel *)filterKernel:(int)colorsAmount {
  static NSArray<CIKernel *> *kernels;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    NSBundle *bundle = [NSBundle bundleForClass:self];
    NSString *resource = [bundle pathForResource:NSStringFromClass([IFKLinearGradient class])
                                          ofType:@"cikernel"];
    NSString *code = [NSString stringWithContentsOfFile:resource
                                               encoding:NSUTF8StringEncoding
                                                  error:nil];
    kernels = [CIKernel kernelsWithString:code];
  });
  
  return kernels[colorsAmount - 1];
}
  
- (NSNumber *)inputAmount
{
  return _inputAmount ?: @(2);
}

- (CIColor *)inputColor0
{
  return _inputColor0 ?: [CIColor whiteColor];
}

- (CIColor *)inputColor1
{
  return _inputColor1 ?: [CIColor whiteColor];
}

- (CIColor *)inputColor2
{
  return _inputColor2 ?: [CIColor whiteColor];
}

- (CIColor *)inputColor3
{
  return _inputColor3 ?: [CIColor whiteColor];
}

- (CIColor *)inputColor4
{
  return _inputColor4 ?: [CIColor whiteColor];
}

- (NSNumber *)inputStop0
{
  return _inputStop0 ?: @(0.0);
}

- (NSNumber *)inputStop1
{
  return _inputStop1 ?: @(1.0);
}

- (NSNumber *)inputStop2
{
  return _inputStop2 ?: @(1.0);
}

- (NSNumber *)inputStop3
{
  return _inputStop3 ?: @(1.0);
}

- (NSNumber *)inputStop4
{
  return _inputStop4 ?: @(1.0);
}

- (CIVector *)inputStart
{
  return _inputStart ?: [CIVector vectorWithCGPoint:CGPointMake(0.0, 0.0)];
}

- (CIVector *)inputEnd
{
  return _inputEnd ?: [CIVector vectorWithCGPoint:CGPointMake(1.0, 0.0)];
}

- (CIImage *)outputImage
{
  if (self.inputExtent == nil) {
    return nil;
  }
  
  int inputAmount = [self.inputAmount intValue];
  
  RCTAssert(inputAmount > 0 && inputAmount <= 5,
            @"ImageFilterKit: IFKLinearGradient takes only up to 5 colors, submitted %i colors.",
            inputAmount);
  
  CIKernel *kernel = [IFKLinearGradient filterKernel:inputAmount];
  
  NSArray *args = inputAmount == 1
    ? @[self.inputExtent,
        self.inputColor0,
        self.inputStop0,
        self.inputStart,
        self.inputEnd]
    : inputAmount == 2
    ? @[self.inputExtent,
        self.inputColor0,
        self.inputStop0,
        self.inputColor1,
        self.inputStop1,
        self.inputStart,
        self.inputEnd]
    : inputAmount == 3
    ? @[self.inputExtent,
        self.inputColor0,
        self.inputStop0,
        self.inputColor1,
        self.inputStop1,
        self.inputColor2,
        self.inputStop2,
        self.inputStart,
        self.inputEnd]
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
        self.inputStart,
        self.inputEnd]
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
        self.inputStart,
        self.inputEnd];
  
  NSLog(@"IFK: args %@", args);
  
  return [kernel applyWithExtent:[self.inputExtent CGRectValue]
                     roiCallback:^CGRect(int index, CGRect destRect) {
                       return destRect;
                     } arguments:args];
}

@end
