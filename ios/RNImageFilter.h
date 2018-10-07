#import <React/UIView+React.h>
#import <React/RCTView.h>

@interface RNImageFilter : RCTView

@property (nonatomic, strong) NSString* name;
@property (nonatomic, strong) NSArray<NSString *> *paramNames;
@property (nonatomic, strong) NSArray<NSString *> *paramTypes;
@property (nonatomic, strong) NSArray<NSString *> *imageNames;
@property (nonatomic, assign) BOOL resizeOutput;

@property (nonatomic, strong) NSString *inputAngle;
@property (nonatomic, strong) NSString *inputNoiseLevel;
@property (nonatomic, strong) NSString *inputSharpness;
@property (nonatomic, strong) NSString *inputSaturation;
@property (nonatomic, strong) NSString *inputBrightness;
@property (nonatomic, strong) NSString *inputContrast;
@property (nonatomic, strong) NSString *inputRefraction;
@property (nonatomic, strong) NSString *inputRotation;
@property (nonatomic, strong) NSString *inputLevels;
@property (nonatomic, strong) NSString *inputIntensity;
@property (nonatomic, strong) NSString *inputPower;
@property (nonatomic, strong) NSString *inputAmount;
@property (nonatomic, strong) NSString *inputRadius;
@property (nonatomic, strong) NSString *inputRadius0;
@property (nonatomic, strong) NSString *inputRadius1;
@property (nonatomic, strong) NSString *inputWidth;
@property (nonatomic, strong) NSString *inputScale;
@property (nonatomic, strong) NSString *inputEV;
@property (nonatomic, strong) NSString *inputNRNoiseLevel;
@property (nonatomic, strong) NSString *inputNRSharpness;
@property (nonatomic, strong) NSString *inputEdgeIntensity;
@property (nonatomic, strong) NSString *inputThreshold;
@property (nonatomic, strong) UIColor *inputColor;
@property (nonatomic, strong) UIColor *inputColor0;
@property (nonatomic, strong) UIColor *inputColor1;
@property (nonatomic, strong) NSArray<NSString *> *inputCenter;
@property (nonatomic, strong) NSArray<NSString *> *inputPoint0;
@property (nonatomic, strong) NSArray<NSString *> *inputPoint1;
@property (nonatomic, strong) NSArray<NSString *> *inputPoint2;
@property (nonatomic, strong) NSArray<NSString *> *inputPoint3;
@property (nonatomic, strong) NSArray<NSString *> *inputPoint4;
@property (nonatomic, strong) NSArray<NSString *> *inputNeutral;
@property (nonatomic, strong) NSArray<NSString *> *inputTargetNeutral;
@property (nonatomic, strong) NSArray<NSNumber *> *inputMinComponents;
@property (nonatomic, strong) NSArray<NSNumber *> *inputMaxComponents;
@property (nonatomic, strong) NSArray<NSNumber *> *inputRVector;
@property (nonatomic, strong) NSArray<NSNumber *> *inputGVector;
@property (nonatomic, strong) NSArray<NSNumber *> *inputBVector;
@property (nonatomic, strong) NSArray<NSNumber *> *inputAVector;
@property (nonatomic, strong) NSArray<NSNumber *> *inputBiasVector;
@property (nonatomic, strong) NSArray<NSNumber *> *inputRedCoefficients;
@property (nonatomic, strong) NSArray<NSNumber *> *inputGreenCoefficients;
@property (nonatomic, strong) NSArray<NSNumber *> *inputBlueCoefficients;
@property (nonatomic, strong) NSArray<NSNumber *> *inputAlphaCoefficients;

+ (CIContext *)createContextWithOptions:(nullable NSDictionary<NSString *, id> *)options;
- (CIContext *)context;

@end
