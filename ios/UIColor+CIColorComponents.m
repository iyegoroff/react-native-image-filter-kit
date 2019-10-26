#import "UIColor+CIColorComponents.h"

@implementation UIColor (CIColorComponents)

+ (UIColor *)colorWithCIColorComponents: (CIColor *)color
{
  return [UIColor colorWithRed:[color red]
                         green:[color green]
                          blue:[color blue]
                         alpha:[color alpha]];
}

@end
