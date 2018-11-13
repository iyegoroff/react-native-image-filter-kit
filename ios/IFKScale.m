#import "IFKScale.h"
#import <React/RCTAssert.h>

@implementation IFKScale

- (NSString *)description
{
  if ([self isKindOfClass:[IFKScaleWithMode class]]) {
    return [NSString stringWithFormat:@"Scale.WithMode(%i)", ((IFKScaleWithMode *)self).mode];
  }
  
  if ([self isKindOfClass:[IFKScaleWithMatch class]]) {
    return [NSString stringWithFormat: @"Scale.WithMatch(%@)", ((IFKScaleWithMatch *)self).match];
  }
  
  if (RCT_DEBUG) {
    RCTAssert(false, @"ImageFilterKit: unknown IFKScale subclass");
  }
  
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

@implementation IFKScaleWithMatch

- (nonnull instancetype)initWithMatch:(NSString *)match
{
  if ((self = [super init])) {
    _match = match;
  }
  
  return self;
}

@end
