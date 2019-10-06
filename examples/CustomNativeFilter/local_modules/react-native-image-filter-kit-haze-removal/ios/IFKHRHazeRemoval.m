#import "IFKHRHazeRemoval.h"
#import <IFKFilterConstructor.h>

@implementation IFKHRHazeRemoval

+ (void)initialize
{
  [CIFilter registerFilterName:NSStringFromClass([IFKHRHazeRemoval class])
                   constructor:[IFKFilterConstructor constructor]
               classAttributes:@{kCIAttributeFilterDisplayName:@"Haze Removal",
                                 kCIAttributeFilterCategories:@[kCICategoryColorAdjustment,
                                                                kCICategoryVideo,
                                                                kCICategoryStillImage,
                                                                kCICategoryInterlaced,
                                                                kCICategoryNonSquarePixels]}];
}

+ (CIKernel *)filterKernel {
  static CIKernel *kernel;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    NSBundle *podBundle = [NSBundle bundleForClass:self];
    NSBundle *bundle = [NSBundle bundleWithURL:[podBundle URLForResource:@"bundle"
                                                          withExtension:@"bundle"]];
    NSString *resource = [bundle pathForResource:NSStringFromClass([IFKHRHazeRemoval class])
                                          ofType:@"cikernel"];
    NSString *code = [NSString stringWithContentsOfFile:resource
                                               encoding:NSUTF8StringEncoding
                                                  error:nil];
    kernel = [CIKernel kernelsWithString:code][0];
  });
  return kernel;
}

- (CIColor *)inputColor
{
  return _inputColor ?: [CIColor colorWithRed:1.0 green:1.0 blue:1.0 alpha:1.0];
}

- (NSNumber *)inputDistance
{
  return _inputDistance ?: @(0.2);
}

- (NSNumber *)inputSlope
{
  return _inputSlope ?: @(0.0);
}

- (CIImage *)outputImage
{
  if (self.inputImage == nil) {
    return nil;
  }

  return [[IFKHRHazeRemoval filterKernel] applyWithExtent:_inputImage.extent
                                            roiCallback:^CGRect(int index, CGRect destRect) {
                                              return destRect;
                                            } arguments:@[[self inputImage],
                                                          [self inputColor],
                                                          [self inputDistance],
                                                          [self inputSlope]]];
}

@end
