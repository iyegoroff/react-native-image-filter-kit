#import "IFKGradient.h"
#import "IFKFilterConstructor.h"
#import <React/RCTAssert.h>

static CGFloat defaultStops[5] = {0.0f, 0.25f, 0.5f, 0.75f, 1.0f};

@implementation IFKGradient
  
+ (void)initializeWithGradientClass:(Class)gradientClass displayName:(NSString *)displayName
{
  [CIFilter registerFilterName:NSStringFromClass(gradientClass)
                   constructor:[IFKFilterConstructor constructor]
               classAttributes:@{kCIAttributeFilterDisplayName:displayName,
                                 kCIAttributeFilterCategories:@[kCICategoryGradient,
                                                                kCICategoryVideo,
                                                                kCICategoryStillImage]}];
}
  
+ (NSArray<CIKernel *> *)loadKernels:(Class)gradientClass
{
  NSBundle *bundle = [NSBundle bundleForClass:self];
  NSString *resource = [bundle pathForResource:NSStringFromClass(gradientClass)
                                        ofType:@"cikernel"];
  NSString *code = [NSString stringWithContentsOfFile:resource
                                             encoding:NSUTF8StringEncoding
                                                error:nil];
  return [CIKernel kernelsWithString:code];
}

- (NSArray<CIColor *> *)inputColors
{
  return _inputColors ?: @[[CIColor yellowColor],
                           [CIColor blueColor],
                           [CIColor greenColor],
                           [CIColor redColor],
                           [CIColor cyanColor]];
}

- (CIVector *)inputStops
{
  return _inputStops ?: [CIVector vectorWithValues:defaultStops count:5];
}

- (int)inputAmount
{
  return MIN((int)[self.inputColors count], (int)[self.inputStops count]);
}

+ (void)assertMaxColors:(Class)gradientClass inputAmount:(int)inputAmount
{
  RCTAssert(inputAmount > 0 && inputAmount <= 10,
            @"ImageFilterKit: %@ takes only up to 10 colors, submitted %i colors.",
            NSStringFromClass(gradientClass),
            inputAmount);
}

@end
