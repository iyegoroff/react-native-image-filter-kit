#import "IFKXorCompositing.h"
#import "IFKFilterConstructor.h"

@implementation IFKXorCompositing

+ (void)initialize
{
  [CIFilter registerFilterName:NSStringFromClass([IFKXorCompositing class])
                   constructor:[IFKFilterConstructor constructor]
               classAttributes:@{kCIAttributeFilterDisplayName:@"Xor Compositing",
                                 kCIAttributeFilterCategories:@[kCICategoryHighDynamicRange,
                                                                kCICategoryNonSquarePixels,
                                                                kCICategoryInterlaced,
                                                                kCICategoryStillImage,
                                                                kCICategoryVideo,
                                                                kCICategoryCompositeOperation]}];
}

+ (CIKernel *)filterKernel {
  static CIKernel *kernel;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    NSBundle *podBundle = [NSBundle bundleForClass:self];
    NSBundle *bundle = [NSBundle bundleWithURL:[podBundle URLForResource:@"bundle"
                                                           withExtension:@"bundle"]];
    NSString *resource = [bundle pathForResource:NSStringFromClass([IFKXorCompositing class])
                                          ofType:@"cikernel"];
    NSString *code = [NSString stringWithContentsOfFile:resource
                                               encoding:NSUTF8StringEncoding
                                                  error:nil];
    kernel = [CIKernel kernelsWithString:code][0];
  });
  return kernel;
}

- (CIImage *)outputImage
{
  if (self.inputImage == nil || self.inputBackgroundImage == nil) {
    return nil;
  }

  CGRect extent = CGRectUnion(self.inputImage.extent, self.inputBackgroundImage.extent);

  return [[IFKXorCompositing filterKernel] applyWithExtent:extent
                                               roiCallback:^CGRect(int index, CGRect destRect) {
                                                 return destRect;
                                               } arguments:@[self.inputImage,
                                                             self.inputBackgroundImage]];
}

@end
