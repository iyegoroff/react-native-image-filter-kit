#import "IFKGradient.h"
#import "IFKFilterConstructor.h"

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
  
- (NSNumber *)inputAmount
{
  return _inputAmount ?: @(5);
}

- (CIColor *)inputColor0
{
  return _inputColor0 ?: [CIColor yellowColor];
}

- (CIColor *)inputColor1
{
  return _inputColor1 ?: [CIColor blueColor];
}

- (CIColor *)inputColor2
{
  return _inputColor2 ?: [CIColor greenColor];
}

- (CIColor *)inputColor3
{
  return _inputColor3 ?: [CIColor redColor];
}

- (CIColor *)inputColor4
{
  return _inputColor4 ?: [CIColor cyanColor];
}

- (NSNumber *)inputStop0
{
  return _inputStop0 ?: @(0.0);
}

- (NSNumber *)inputStop1
{
  return _inputStop1 ?: @(0.25);
}

- (NSNumber *)inputStop2
{
  return _inputStop2 ?: @(0.5);
}

- (NSNumber *)inputStop3
{
  return _inputStop3 ?: @(0.75);
}

- (NSNumber *)inputStop4
{
  return _inputStop4 ?: @(1.0);
}

@end
