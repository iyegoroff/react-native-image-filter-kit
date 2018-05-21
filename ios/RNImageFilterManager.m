#import <React/RCTBridge.h>
#import "RNImageFilterManager.h"
#import "RNImageFilter.h"

@implementation RNImageFilterManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (UIView *)view
{
  return [[RNImageFilter alloc] init];
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

//#define RN_REMAP_IMAGE_FILTER_FILTER_PROPERTY(name, keyPath, type) \
//RCT_CUSTOM_VIEW_PROPERTY(name, type, RNImageFilter)                \
//{                                                                  \
//  view.keyPath = json ? [RCTConvert type:json] : defaultView.name; \
//  [view drawImages];                                               \
//}
//
//#define RN_IMAGE_FILTER_FILTER_PROPERTY(name, type) \
//RN_REMAP_IMAGE_FILTER_FILTER_PROPERTY(name, name, type)

RCT_EXPORT_VIEW_PROPERTY(name, NSString);
RCT_EXPORT_VIEW_PROPERTY(paramNames, NSArray);
RCT_EXPORT_VIEW_PROPERTY(radius, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(angle, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(noiseLevel, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(sharpness, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(amount, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(saturation, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(brightness, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(contrast, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(minComponents, NSArray);
RCT_EXPORT_VIEW_PROPERTY(maxComponents, NSArray);
RCT_EXPORT_VIEW_PROPERTY(levels, CGFloat);
RCT_REMAP_VIEW_PROPERTY(center, filterCenter, CGPoint);

@end
