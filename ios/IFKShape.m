#import "IFKShape.h"

@implementation IFKShape

- (CIColor *)inputColor
{
  return _inputColor ?: [CIColor colorWithRed:0.0f green:0.0f blue:0.0f];
}

@end
