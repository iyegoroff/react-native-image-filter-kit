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

//#define RN_REMAP_IMAGE_FILTER_FILTER_PROPERTY(name, keyPath, type) \
//RCT_CUSTOM_VIEW_PROPERTY(name, type, RNImageMatrixFilter)          \
//{                                                                  \
//  view.keyPath = json ? [RCTConvert type:json] : defaultView.name; \
//  [view drawImages];                                               \
//}
//
//#define RN_IMAGE_FILTER_FILTER_PROPERTY(name, type) \
//RN_REMAP_IMAGE_FILTER_FILTER_PROPERTY(name, name, type)
//
//RN_IMAGE_FILTER_FILTER_PROPERTY(matrix, NSArray);

@end
