#import <React/RCTBridge.h>
#import "RNImageFilterManager.h"

@implementation RNImageFilterManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_VIEW_PROPERTY(name, NSString);
RCT_EXPORT_VIEW_PROPERTY(paramNames, NSArray);
RCT_EXPORT_VIEW_PROPERTY(resizeOutput, BOOL);

RCT_EXPORT_VIEW_PROPERTY(inputAngle, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(inputNoiseLevel, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(inputSharpness, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(inputSaturation, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(inputBrightness, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(inputContrast, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(inputLevels, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(inputScale, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(inputRefraction, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(inputRotation, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(inputIntensity, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(inputAmount, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputRadius, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputWidth, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputCenter, NSArray<NSString *>);
RCT_EXPORT_VIEW_PROPERTY(inputPoint0, NSArray<NSString *>);
RCT_EXPORT_VIEW_PROPERTY(inputPoint1, NSArray<NSString *>);
RCT_EXPORT_VIEW_PROPERTY(inputMinComponents, NSArray<NSNumber *>);
RCT_EXPORT_VIEW_PROPERTY(inputMaxComponents, NSArray<NSNumber *>);

@end
