#import <React/RCTBridge.h>
#import "IFKImageFilterManager.h"
#import "IFKImageFilter.h"

@implementation IFKImageFilterManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

- (UIView *)view
{
  return [[IFKImageFilter alloc] init];
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_VIEW_PROPERTY(config, NSString);

@end
