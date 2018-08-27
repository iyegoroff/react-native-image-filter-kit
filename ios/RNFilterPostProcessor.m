#import "RNFilterPostProcessor.h"
#import "Image/RCTImageView.h"
#import "Image/RCTImageUtils.h"
#import "NSArray+FilterMapReduce.h"
#import "RNImageCache.h"
#import "RNOutputExtentHandler.h"
#import <React/RCTLog.h>

@interface UIImage (React)

@property (nonatomic, copy) CAKeyframeAnimation *reactKeyframeAnimation;

@end


@implementation RNFilterPostProcessor

+ (RNFilteredImage *)process:(nonnull NSString *)name
                      inputs:(nonnull NSDictionary<NSString *, RNTuple<id, NSString *> *> *)inputs
                     context:(nonnull CIContext *)context
                  filterings:(nonnull NSDictionary<NSString *, Filtering> *)filterings
                resizeOutput:(BOOL)resizeOutput
{
  CIFilter *filter = [CIFilter filterWithName:name];
  NSString *accumulatedCacheKey = @"";
  NSMutableDictionary *images = [NSMutableDictionary dictionaryWithCapacity:filterings.count];
  
  for (NSString *imageName in filterings) {
    [images setObject:filterings[imageName]() forKey:imageName];
  }
  
  for (NSString *inputName in images) {
    RNFilteredImage *image = images[inputName];
    NSString *cacheKey = [NSString stringWithFormat:@"%i:%@:%@",
                          resizeOutput,
                          name,
                          [RNFilterPostProcessor inputValues:inputs]];
    accumulatedCacheKey = [NSString stringWithFormat:@"%@[%@:%@:%li]",
                           accumulatedCacheKey,
                           image.accumulatedCacheKey,
                           cacheKey,
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
      [filter setValue:tmp forKey:inputName];
    }
    
    CGSize bounds = extent.size;
    
    CGSize maxInputSize = [context inputImageMaximumSize];
    RCTAssert(maxInputSize.width >= bounds.width && maxInputSize.height >= bounds.height,
              @"%@: Input images are too big - %@", name, [NSValue valueWithCGSize:bounds]);
    
    for (NSString *inputName in inputs) {
      RNTuple* input = inputs[inputName];
      id convertedInput;
      
      if ([@"scalar" isEqualToString:input.second]) {
        convertedInput = input.first;
        
      } else if ([@"distance" isEqualToString:input.second]) {
        convertedInput = [RNFilterPostProcessor convertDistance:input.first bounds:bounds];
        
      } else if ([@"point" isEqualToString:input.second]) {
        convertedInput = [RNFilterPostProcessor convertPoint:input.first bounds:bounds];
        
      } else if ([@"vector" isEqualToString:input.second]) {
        convertedInput = [RNFilterPostProcessor convertVector:input.first];
      }
      
      [filter setValue:convertedInput forKey:inputName];
    }
    
    CGSize destSize = mainImage ? mainImage.image.size : CGSizeZero;
    CGFloat scale = mainImage ? mainImage.image.scale : 1.0f;
    
    //    CIImage *outputImage = CGRectEqualToRect(_filter.outputImage.extent, CGRectInfinite)
    //      ? [_filter.outputImage imageByCroppingToRect:CGRectMake(0, 0, destSize.width, destSize.height)]
    //      : _filter.outputImage;
    
    CGRect outputRect = resizeOutput
      ? [RNOutputExtentHandler resizedRect:filter inputExtent:extent destSize:destSize]
      : extent;
    
//    RCTLog(@"filter: output rect %@", [NSValue valueWithCGRect:outputRect]);
    
    CGImageRef cgim = [context createCGImage:filter.outputImage fromRect:outputRect];
    
    CGSize maxOutputSize = [context outputImageMaximumSize];
    CGSize outputSize = outputRect.size;
    RCTAssert(maxOutputSize.width >= outputSize.width && maxOutputSize.height >= outputSize.height,
              @"%@: Output image is too big - %@", name, [NSValue valueWithCGSize:outputSize]);

    UIImage *filteredImage = [RNFilterPostProcessor resizeImageIfNeeded:[UIImage imageWithCGImage:cgim]
                                                                srcSize:outputRect.size
                                                               destSize:destSize
                                                                  scale:scale
                                                             resizeMode:resizeMode];
    CGImageRelease(cgim);
    
    if (filteredImage != nil) {
      [RNImageCache setImage:filteredImage forKey:accumulatedCacheKey];
    }
    
//    RCTLog(@"filter: key = %@", accumulatedCacheKey);
    
    return [RNFilteredImage createWithImage:filteredImage
                                 resizeMode:resizeMode
                        accumulatedCacheKey:accumulatedCacheKey];
  }
}

+ (NSArray *)inputValues:(nonnull NSDictionary<NSString *, RNTuple<id, NSString *> *> *)inputs
{
  NSArray *sortedKeys = [[inputs allKeys] sortedArrayUsingComparator:^NSComparisonResult(id obj1, id obj2) {
    return [obj1 compare:obj2 options:NSCaseInsensitiveSearch];
  }];
  
  return [sortedKeys map:^id(id val, int idx) {
    return inputs[val].first;
  }];
}

+ (UIImage *)resizeImageIfNeeded:(UIImage *)image
                         srcSize:(CGSize)srcSize
                        destSize:(CGSize)destSize
                           scale:(CGFloat)scale
                      resizeMode:(RCTResizeMode)resizeMode
{
//  RCTLog(@"filter: sizes %@ -> %@", [NSValue valueWithCGSize:srcSize], [NSValue valueWithCGSize:destSize]);
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

+ (nonnull NSNumber *)convertDistance:(NSString *)relativeDistance bounds:(CGSize)bounds
{
  return [NSNumber numberWithFloat:[RNFilterPostProcessor convertRelative:relativeDistance
                                                                   bounds:bounds]];
}

+ (nonnull CIVector *)convertVector:(NSArray<NSNumber *> *)vector
{
  CGFloat v[vector.count];
  
  for (int i = 0; i < vector.count; i++) {
    v[i] = [vector[i] floatValue];
  }
  
  return [CIVector vectorWithValues:v count:vector.count];
}

+ (nonnull CIVector *)convertPoint:(NSArray<NSString *> *)relativePoint bounds:(CGSize)bounds
{
  return [CIVector vectorWithCGPoint:CGPointMake(
    [RNFilterPostProcessor convertRelative:relativePoint[0] bounds:bounds],
    [RNFilterPostProcessor convertRelative:relativePoint[1] bounds:bounds])];
}

+ (CGFloat)convertRelative:(NSString *)relative bounds:(CGSize)bounds
{
  double num;
  NSScanner *scanner = [NSScanner scannerWithString:relative];
  
  [scanner scanDouble:&num];
  NSString *unit = [relative substringFromIndex:[scanner scanLocation]];
  
  if ([unit isEqualToString:@""]) {
    return num;
  }
  
  if ([unit isEqualToString:@"h"]) {
    return num * bounds.height * 0.01f;
  }
  
  if ([unit isEqualToString:@"w"]) {
    return num * bounds.width * 0.01f;
  }
  
  if ([unit isEqualToString:@"max"]) {
    return num * MAX(bounds.width, bounds.height) * 0.01f;
  }
  
  if ([unit isEqualToString:@"min"]) {
    return num * MIN(bounds.width, bounds.height) * 0.01f;
  }
  
  if (RCT_DEBUG) {
    RCTAssert(false, @"Invalid relative number - %@", relative);
  }
  
  return num;
}

@end
