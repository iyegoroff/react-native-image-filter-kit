#import "RNImageFilterWithColorManagementManager.h"
#import "RNImageFilterWithColorManagement.h"

@implementation RNImageFilterWithColorManagementManager

RCT_EXPORT_MODULE();

- (UIView *)view
{
  return [[RNImageFilterWithColorManagement alloc] init];
}

@end
