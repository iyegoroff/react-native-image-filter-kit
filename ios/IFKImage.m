#import "IFKImage.h"

@implementation IFKImage

- (nonnull instancetype)initWithImage:(UIImage *)image hash:(NSString *)hashKey
{
  if ((self = [super init])) {
    _image = image;
    _hashKey = hashKey;
  }
  
  return self;
}

@end
