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
RCT_EXPORT_VIEW_PROPERTY(paramTypes, NSArray);
RCT_EXPORT_VIEW_PROPERTY(imageNames, NSArray);
RCT_EXPORT_VIEW_PROPERTY(resizeOutput, BOOL);

RCT_EXPORT_VIEW_PROPERTY(inputAngle, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputNoiseLevel, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputSharpness, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputSaturation, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputBrightness, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputContrast, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputLevels, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputRefraction, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputRotation, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputIntensity, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputPower, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputAmount, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputRadius, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputWidth, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputScale, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputEV, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputNRNoiseLevel, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputNRSharpness, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputEdgeIntensity, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputThreshold, NSString);
RCT_EXPORT_VIEW_PROPERTY(inputColor, UIColor);
RCT_EXPORT_VIEW_PROPERTY(inputCenter, NSArray<NSString *>);
RCT_EXPORT_VIEW_PROPERTY(inputPoint0, NSArray<NSString *>);
RCT_EXPORT_VIEW_PROPERTY(inputPoint1, NSArray<NSString *>);
RCT_EXPORT_VIEW_PROPERTY(inputPoint2, NSArray<NSString *>);
RCT_EXPORT_VIEW_PROPERTY(inputPoint3, NSArray<NSString *>);
RCT_EXPORT_VIEW_PROPERTY(inputPoint4, NSArray<NSString *>);
RCT_EXPORT_VIEW_PROPERTY(inputNeutral, NSArray<NSString *>);
RCT_EXPORT_VIEW_PROPERTY(inputTargetNeutral, NSArray<NSString *>);
RCT_EXPORT_VIEW_PROPERTY(inputMinComponents, NSArray<NSNumber *>);
RCT_EXPORT_VIEW_PROPERTY(inputMaxComponents, NSArray<NSNumber *>);
RCT_EXPORT_VIEW_PROPERTY(inputRVector, NSArray<NSNumber *>);
RCT_EXPORT_VIEW_PROPERTY(inputGVector, NSArray<NSNumber *>);
RCT_EXPORT_VIEW_PROPERTY(inputBVector, NSArray<NSNumber *>);
RCT_EXPORT_VIEW_PROPERTY(inputAVector, NSArray<NSNumber *>);
RCT_EXPORT_VIEW_PROPERTY(inputBiasVector, NSArray<NSNumber *>);
RCT_EXPORT_VIEW_PROPERTY(inputRedCoefficients, NSArray<NSNumber *>);
RCT_EXPORT_VIEW_PROPERTY(inputGreenCoefficients, NSArray<NSNumber *>);
RCT_EXPORT_VIEW_PROPERTY(inputBlueCoefficients, NSArray<NSNumber *>);
RCT_EXPORT_VIEW_PROPERTY(inputAlphaCoefficients, NSArray<NSNumber *>);

@end
