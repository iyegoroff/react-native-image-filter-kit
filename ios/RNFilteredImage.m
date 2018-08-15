#import "RNFilteredImage.h"

@implementation RNFilteredImage

- (nonnull instancetype)initWithImage:(nonnull UIImage *)image
                           resizeMode:(RCTResizeMode)resizeMode
                  accumulatedCacheKey:(nonnull NSString *)accumulatedCacheKey
{
  if ((self = [super init])) {
    _image = image;
    _resizeMode = resizeMode;
    _accumulatedCacheKey = accumulatedCacheKey;
  }
  
  return self;
}


+ (nonnull instancetype)createWithImage:(nonnull UIImage *)image
                             resizeMode:(RCTResizeMode)resizeMode
                    accumulatedCacheKey:(nonnull NSString *)accumulatedCacheKey
{
  return [[RNFilteredImage alloc] initWithImage:image
                                     resizeMode:resizeMode
                            accumulatedCacheKey:accumulatedCacheKey];
}

@end
