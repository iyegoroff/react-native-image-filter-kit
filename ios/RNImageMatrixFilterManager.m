#import <React/RCTBridge.h>
#import "RNImageColorFilterManager.h"
#import "RNImageColorFilter.h"

@implementation RNImageColorFilterManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (UIView *)view
{
  return [[RNImageColorFilter alloc] init];
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#define RN_REMAP_IMAGE_FILTER_FILTER_PROPERTY(name, keyPath, type) \
RCT_CUSTOM_VIEW_PROPERTY(name, type, RNImageColorFilter)           \
{                                                                  \
view.keyPath = json ? [RCTConvert type:json] : defaultView.name; \
[view drawImages];                                               \
}

#define RN_IMAGE_FILTER_FILTER_PROPERTY(name, type) \
RN_REMAP_IMAGE_FILTER_FILTER_PROPERTY(name, name, type)

RCT_EXPORT_VIEW_PROPERTY(name, NSString);
RCT_EXPORT_VIEW_PROPERTY(paramNames, NSArray);

RN_IMAGE_FILTER_FILTER_PROPERTY(matrix, NSArray);
RN_IMAGE_FILTER_FILTER_PROPERTY(radius, CGFloat);
RN_IMAGE_FILTER_FILTER_PROPERTY(mask, UIImage);
RN_IMAGE_FILTER_FILTER_PROPERTY(angle, CGFloat);
RN_IMAGE_FILTER_FILTER_PROPERTY(noiseLevel, CGFloat);
RN_IMAGE_FILTER_FILTER_PROPERTY(sharpness, CGFloat);
RN_IMAGE_FILTER_FILTER_PROPERTY(amount, CGFloat);

RN_REMAP_IMAGE_FILTER_FILTER_PROPERTY(center, filterCenter, CGPoint);

@end

