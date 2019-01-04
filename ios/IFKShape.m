#import "IFKShape.h"

@implementation IFKShape

- (CIColor *)inputColor
{
  return _inputColor ?: [CIColor blackColor];
}

@end
