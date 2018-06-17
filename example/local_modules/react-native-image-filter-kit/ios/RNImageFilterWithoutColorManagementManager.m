#import "RNImageFilterWithoutColorManagementManager.h"
#import "RNImageFilterWithoutColorManagement.h"

@implementation RNImageFilterWithoutColorManagementManager

RCT_EXPORT_MODULE();

- (UIView *)view
{
  return [[RNImageFilterWithoutColorManagement alloc] init];
}

@end
