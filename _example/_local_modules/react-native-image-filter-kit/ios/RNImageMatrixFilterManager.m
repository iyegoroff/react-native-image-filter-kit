#import <React/RCTBridge.h>
#import "RNImageMatrixFilterManager.h"
#import "RNImageMatrixFilter.h"

@implementation RNImageMatrixFilterManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (UIView *)view
{
  return [[RNImageMatrixFilter alloc] init];
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_VIEW_PROPERTY(matrix, NSArray);

@end
