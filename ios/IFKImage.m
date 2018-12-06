#import "IFKImage.h"

@implementation IFKImage

- (nonnull instancetype)initWithImage:(UIImage *)image cacheKey:(NSString *)cacheKey
{
  if ((self = [super init])) {
    _image = image;
    _cacheKey = cacheKey;
  }
  
  return self;
}

@end
