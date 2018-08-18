#import "RNFilterPostProcessor.h"
#import "Image/RCTImageView.h"
#import "Image/RCTImageUtils.h"
#import "RNImageCache.h"
#import <React/RCTLog.h>

@interface UIImage (React)

@property (nonatomic, copy) CAKeyframeAnimation *reactKeyframeAnimation;

@end

@interface RNFilterPostProcessor ()

@property (nonatomic, strong) CIFilter *filter;
@property (nonatomic, strong) NSString *cacheKey;
@property (nonatomic, strong) NSDictionary *inputs;
@property (nonatomic, strong) CIContext *context;
@property (nonatomic, assign) BOOL resizeOutput;

@end

@implementation RNFilterPostProcessor

- (nonnull instancetype)initWithName:(nonnull NSString *)name
                              inputs:(nonnull NSDictionary *)inputs
                             context:(nonnull CIContext *)context
                        resizeOutput:(BOOL)resizeOutput
{
  if ((self = [super init])) {
    _inputs = inputs;
    _filter = [CIFilter filterWithName:name withInputParameters:inputs];
    _context = context;
    _resizeOutput = resizeOutput;
  }
  
  return self;
}

+ (nonnull instancetype)createWithName:(nonnull NSString *)name
                                inputs:(nonnull NSDictionary *)inputs
                               context:(nonnull CIContext *)context
                          resizeOutput:(BOOL)resizeOutput
{
  return [[RNFilterPostProcessor alloc] initWithName:name
                                              inputs:inputs
                                             context:context
                                        resizeOutput:resizeOutput];
}

- (nonnull RNFilteredImage *)process:(nonnull NSDictionary<NSString *, RNFilteredImage *> *)images
{
  NSString* accumulatedCacheKey = @"";
  for (NSString *inputName in images) {
    RNFilteredImage *image = images[inputName];
    accumulatedCacheKey = [NSString stringWithFormat:@"%@[%@:%@:%li]",
                           accumulatedCacheKey,
                           image.accumulatedCacheKey,
                           [self getPostProcessorCacheKey],
                           (long)image.resizeMode];
  }
  
  UIImage *cachedImage = [RNImageCache imageForKey:accumulatedCacheKey];
  
  RNFilteredImage *mainImage = images[@"inputImage"];
  RCTResizeMode resizeMode = mainImage ? mainImage.resizeMode : RCTResizeModeContain;
  
  if (cachedImage != nil) {
    return [RNFilteredImage createWithImage:cachedImage
                                 resizeMode:resizeMode
                        accumulatedCacheKey:accumulatedCacheKey];
  } else {
    CGRect extent = CGRectZero;
    for (NSString *inputName in images) {
      RNFilteredImage *image = images[inputName];
      CIImage *tmp = [[CIImage alloc] initWithImage:image.image];
      extent = CGRectUnion(extent, tmp.extent);
      [_filter setValue:tmp forKey:inputName];
    }
    
    if (CGRectEqualToRect(_filter.outputImage.extent, CGRectInfinite)) {
      RCTLog(@"filter: %@ produces infinite extent!", _filter.name);
    }
    
    CGSize destSize = mainImage ? mainImage.image.size : CGSizeZero;
    CGFloat scale = mainImage ? mainImage.image.scale : 1.0f;
    
//    CIImage *outputImage = CGRectEqualToRect(_filter.outputImage.extent, CGRectInfinite)
//      ? [_filter.outputImage imageByCroppingToRect:CGRectMake(0, 0, destSize.width, destSize.height)]
//      : _filter.outputImage;
    
    CGRect outputRect = _resizeOutput ? _filter.outputImage.extent : extent; //outputImage.extent
    
    RCTLog(@"filter: output rect %@", [NSValue valueWithCGRect:outputRect]);
    
    CGImageRef cgim = [_context createCGImage:_filter.outputImage fromRect:outputRect];
    
    UIImage *filteredImage = [RNFilterPostProcessor resizeImageIfNeeded:[UIImage imageWithCGImage:cgim]
                                                                srcSize:outputRect.size
                                                               destSize:destSize
                                                                  scale:scale
                                                             resizeMode:resizeMode];
    CGImageRelease(cgim);
    
    [RNImageCache setImage:filteredImage forKey:accumulatedCacheKey];
    
    return [RNFilteredImage createWithImage:filteredImage
                                 resizeMode:resizeMode
                        accumulatedCacheKey:accumulatedCacheKey];
  }
}

- (nonnull NSString *)getPostProcessorCacheKey
{
  if (_cacheKey == nil) {
    _cacheKey = [NSString stringWithFormat:@"%i:%@:%@", _resizeOutput, _filter.name, _inputs];
  }
  
  return _cacheKey;
}

+ (UIImage *)resizeImageIfNeeded:(UIImage *)image
                         srcSize:(CGSize)srcSize
                        destSize:(CGSize)destSize
                           scale:(CGFloat)scale
                      resizeMode:(RCTResizeMode)resizeMode
{
  RCTLog(@"filter: sizes %@ -> %@", [NSValue valueWithCGSize:srcSize], [NSValue valueWithCGSize:destSize]);
  if (CGSizeEqualToSize(destSize, CGSizeZero) ||
      CGSizeEqualToSize(srcSize, CGSizeZero) ||
      CGSizeEqualToSize(srcSize, destSize)) {
    return image;
  }
  
  CAKeyframeAnimation *animation = image.reactKeyframeAnimation;
  CGRect targetSize = RCTTargetRect(srcSize, destSize, scale, resizeMode);
  CGAffineTransform transform = RCTTransformFromTargetRect(srcSize, targetSize);
  image = RCTTransformImage(image, destSize, scale, transform);
  image.reactKeyframeAnimation = animation;
  
  return image;
}

@end
