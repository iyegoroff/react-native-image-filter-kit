#import <CoreImage/CoreImage.h>

@interface IFKGradient : CIFilter
  
+ (void)initializeWithGradientClass:(Class)gradientClass displayName:(NSString *)displayName;
+ (NSArray<CIKernel *> *)loadKernels:(Class)gradientClass;
+ (void)assertMaxColors:(Class)gradientClass inputAmount:(int)inputAmount;
- (int)inputAmount;
  
@property (nonatomic, copy) CIVector *inputExtent;
@property (nonatomic, copy) NSArray<CIColor *> *inputColors;
@property (nonatomic, copy) CIVector *inputStops;
@property (nonatomic, copy) NSNumber *inputMixStep;

@end
