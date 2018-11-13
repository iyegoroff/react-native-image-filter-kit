#import "IFKResize.h"
#import <React/RCTAssert.h>

@implementation IFKResize

- (NSString *)description
{
  if ([self isKindOfClass:[IFKResizeWithMode class]]) {
    return [NSString stringWithFormat:@"Resize.WithMode(%i)", ((IFKResizeWithMode *)self).mode];
  }
  
  if ([self isKindOfClass:[IFKResizeWithSize class]]) {
    return [NSString stringWithFormat:
            @"Resize.WithSize(%@)",
            [NSValue valueWithCGSize:((IFKResizeWithSize *)self).size]];
  }
  
  RCTAssert(false, @"ImageFilterKit: unknown IFKResize subclass");
  
  return @"";
}

@end

@implementation IFKResizeWithMode

- (nonnull instancetype)initWithMode:(IFKResizeMode)mode
{
  if ((self = [super init])) {
    _mode = mode;
  }
  
  return self;
}

@end

@implementation IFKResizeWithSize

- (nonnull instancetype)initWithSize:(CGSize)size
{
  if ((self = [super init])) {
    _size = size;
  }
  
  return self;
}

@end
