#import "IFKScale.h"
#import <React/RCTAssert.h>

@implementation IFKScale

- (NSString *)description
{
  if ([self isKindOfClass:[IFKScaleWithMode class]]) {
    return [NSString stringWithFormat:@"Scale.WithMode(%i)", ((IFKScaleWithMode *)self).mode];
  }
  
  if ([self isKindOfClass:[IFKScaleWithSize class]]) {
    return [NSString stringWithFormat:
            @"Scale.WithSize(%f, %f)",
            ((IFKScaleWithSize *)self).scale.x,
            ((IFKScaleWithSize *)self).scale.y];
  }
  
  RCTAssert(false, @"ImageFilterKit: unknown IFKScale subclass");
  
  return @"";
}

@end

@implementation IFKScaleWithMode

- (nonnull instancetype)initWithMode:(IFKScaleMode)mode
{
  if ((self = [super init])) {
    _mode = mode;
  }
  
  return self;
}

@end

@implementation IFKScaleWithSize

- (nonnull instancetype)initWithX:(CGFloat)x andY:(CGFloat)y
{
  if ((self = [super init])) {
    _scale = CGPointMake(x, y);
  }
  
  return self;
}

@end
