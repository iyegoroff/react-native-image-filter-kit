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
  NSBundle *podBundle = [NSBundle bundleForClass:self];
  NSBundle *bundle = [NSBundle bundleWithURL:[podBundle URLForResource:@"bundle"
                                                         withExtension:@"bundle"]];
  NSString *resource = [bundle pathForResource:NSStringFromClass(gradientClass)
                                        ofType:@"cikernel"];
  NSString *code = [NSString stringWithContentsOfFile:resource
                                             encoding:NSUTF8StringEncoding
                                                error:nil];
  return [CIColorKernel kernelsWithString:code];
}

- (NSArray<CIColor *> *)inputColors
{
  return _inputColors ?: @[[CIColor colorWithRed:1.0f green:1.0f blue:0.0f],
                           [CIColor colorWithRed:0.0f green:0.0f blue:1.0f],
                           [CIColor colorWithRed:0.0f green:1.0f blue:0.0f],
                           [CIColor colorWithRed:1.0f green:0.0f blue:0.0f],
                           [CIColor colorWithRed:0.0f green:1.0f blue:1.0f]];
}

- (CIVector *)inputStops
{
  return _inputStops ?: [CIVector vectorWithValues:defaultStops count:5];
}

- (NSNumber *)inputMixStep
{
  return _inputMixStep ?: @(0);
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
