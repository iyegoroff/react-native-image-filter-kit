#import "IFKPostProcessor.h"
#import "IFKInputConverter.h"
#import "Image/RCTImageUtils.h"
#import "NSArray+FilterMapReduce.h"

@interface UIImage (React)

@property (nonatomic, copy) CAKeyframeAnimation *reactKeyframeAnimation;

@end

@interface IFKPostProcessor ()

@property (nonatomic, strong) CIFilter *filter;
@property (nonatomic, strong) NSDictionary *inputs;

@end

@implementation IFKPostProcessor

- (nonnull instancetype)initWithName:(nonnull NSString *)name inputs:(nonnull NSDictionary *)inputs
{
  if ((self = [super init])) {
    _filter = [CIFilter filterWithName:name];
    _inputs = inputs;
  }
  
  return self;
}

- (void)initFilter:(CGSize)size
{
  static NSArray<NSString *> *skippedInputs;
  
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    skippedInputs = @[
      @"disableCache",
      @"name",
      @"inputImage",
      @"generatedImage",
      @"resizeCanvasTo",
      @"dstResizeMode",
      @"dstAnchor",
      @"dstPosition",
      @"srcResizeMode",
      @"srcAnchor",
      @"srcPosition",
      @"swapImages"
    ];
  });

  NSArray *names = [[_inputs allKeys] filter:^BOOL(NSString *val, int idx) {
    return ![skippedInputs containsObject:val];
  }];
  
  for (NSString *inputName in names) {
    [_filter setValue:[IFKInputConverter convertAny:[_inputs objectForKey:inputName] bounds:size]
               forKey:inputName];
  }
}

- (nonnull UIImage *)process:(nonnull UIImage *)image
                  resizeMode:(RCTResizeMode)resizeMode
                   viewFrame:(CGRect)viewFrame
{
  if ([[_filter inputKeys] containsObject:@"inputImage"]) {
    return [self processFilter:image resizeMode:resizeMode];
    
  } else {
    return [self processGenerator:image resizeMode:resizeMode viewFrame:viewFrame];
  }
}

- (nonnull UIImage *)processFilter:(nonnull UIImage *)image resizeMode:(RCTResizeMode)resizeMode
{
//  BOOL isSlow = arc4random() % 2 == 0;
//  NSLog(@"filter: %@", isSlow ? @"slow" : @"fast");
//  if (isSlow) {
//    [NSThread sleepForTimeInterval:5];
//  }
  CIImage *tmp = [[CIImage alloc] initWithImage:image];
  [self initFilter:tmp.extent.size];
  
  [_filter setValue:tmp forKey:@"inputImage"];
  
  return [self filteredImageWithScale:image.scale
                           resizeMode:resizeMode
                            viewFrame:tmp.extent
                             destSize:image.size];
}

- (nonnull UIImage *)processGenerator:(nonnull UIImage *)image
                           resizeMode:(RCTResizeMode)resizeMode
                            viewFrame:(CGRect)viewFrame
{
  CGRect frame = CGRectMake(viewFrame.origin.x,
                            viewFrame.origin.y,
                            viewFrame.size.width,
                            viewFrame.size.height);
  
  [self initFilter:frame.size];
  
  if ([[_filter inputKeys] containsObject:@"inputExtent"]) {
    [_filter setValue:[CIVector vectorWithCGRect:frame] forKey:@"inputExtent"];
  }
  
  return [self filteredImageWithScale:image.scale
                           resizeMode:resizeMode
                            viewFrame:frame
                             destSize:frame.size];
}

- (nonnull UIImage *)filteredImageWithScale:(CGFloat)scale
                                 resizeMode:(RCTResizeMode)resizeMode
                                  viewFrame:(CGRect)viewFrame
                                   destSize:(CGSize)destSize
{
  CGImageRef cgim = [[self context] createCGImage:_filter.outputImage fromRect:viewFrame];
  
  UIImage *filteredImage = [IFKPostProcessor resizeImageIfNeeded:[UIImage imageWithCGImage:cgim]
                                                         srcSize:viewFrame.size
                                                        destSize:destSize
                                                           scale:scale
                                                      resizeMode:resizeMode];
  
  CGImageRelease(cgim);
  
  return filteredImage;
}


- (nonnull CIContext *)context
{
  static dispatch_once_t initToken;
  static dispatch_once_t contextWithColorManagementToken;
  static dispatch_once_t contextToken;
  
  static EAGLContext *eaglContext;
  static NSArray<NSString *> *filtersWithColorManagement;
  static CIContext *context;
  static CIContext *contextWithColorManagement;
  
  dispatch_once(&initToken, ^{
    filtersWithColorManagement = @[
      @"CIColorMatrix",
      @"CIColorInvert",
      @"CIAdditionCompositing",
      @"CIColorBlendMode",
      @"CIColorBurnBlendMode",
      @"CIColorDodgeBlendMode",
      @"CIDarkenBlendMode",
      @"CIDifferenceBlendMode",
      @"CIDivideBlendMode",
      @"CIExclusionBlendMode",
      @"CIHardLightBlendMode",
      @"CIHueBlendMode",
      @"CILightenBlendMode",
      @"CILinearBurnBlendMode",
      @"CILinearDodgeBlendMode",
      @"CILuminosityBlendMode",
      @"CIMaximumCompositing",
      @"CIMinimumCompositing",
      @"CIMultiplyBlendMode",
      @"CIMultiplyCompositing",
      @"CIOverlayBlendMode",
      @"CIPinLightBlendMode",
      @"CISaturationBlendMode",
      @"CIScreenBlendMode",
      @"CISoftLightBlendMode",
      @"CISourceAtopCompositing",
      @"CISourceInCompositing",
      @"CISourceOutCompositing",
      @"CISourceOverCompositing",
      @"CISubtractBlendMode",
      @"IFKRadialGradient",
      @"IFKLinearGradient",
      @"IFKSweepGradient",
      @"CIConvolution3X3",
      @"CIConvolution5X5",
      @"CIConvolution7X7"
    ];
    
    eaglContext = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES3]
      ?: [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2];
  });
  
  if ([filtersWithColorManagement some:^BOOL(NSString *val, int idx) {
    return [val isEqualToString:_filter.name];
  }]) {
    dispatch_once(&contextToken, ^{
      context = [CIContext contextWithEAGLContext:eaglContext
                                          options:@{kCIImageColorSpace: [NSNull null],
                                                    kCIImageProperties: [NSNull null],
                                                    kCIContextWorkingColorSpace: [NSNull null]}];
    });
    
    return context;
    
  } else {
    dispatch_once(&contextWithColorManagementToken, ^{
      contextWithColorManagement = [CIContext contextWithEAGLContext:eaglContext options:nil];
    });
    
    return contextWithColorManagement;
  }
}


+ (nonnull UIImage *)resizeImageIfNeeded:(nonnull UIImage *)image
                                 srcSize:(CGSize)srcSize
                                destSize:(CGSize)destSize
                                   scale:(CGFloat)scale
                              resizeMode:(RCTResizeMode)resizeMode
{
  if (CGSizeEqualToSize(destSize, CGSizeZero) ||
      CGSizeEqualToSize(srcSize, CGSizeZero) ||
      CGSizeEqualToSize(srcSize, destSize)) {
    return image;
  }
  
  CAKeyframeAnimation *animation = image.reactKeyframeAnimation;
  CGRect targetRect = RCTTargetRect(srcSize, destSize, scale, resizeMode);
  CGAffineTransform transform = RCTTransformFromTargetRect(srcSize, targetRect);
  image = RCTTransformImage(image, destSize, scale, transform);
  image.reactKeyframeAnimation = animation;
  
  return image;
}

@end
