#import <React/UIView+React.h>
#import <React/RCTView.h>

@interface RNImageFilter : RCTView

@property (nonatomic, strong) NSString* name;
@property (nonatomic, strong) NSArray<NSString *> *paramNames;
@property (nonatomic, assign) BOOL resizeOutput;

@property (nonatomic, assign) CGFloat inputAngle;
@property (nonatomic, assign) CGFloat inputNoiseLevel;
@property (nonatomic, assign) CGFloat inputSharpness;
@property (nonatomic, assign) CGFloat inputSaturation;
@property (nonatomic, assign) CGFloat inputBrightness;
@property (nonatomic, assign) CGFloat inputContrast;
@property (nonatomic, assign) CGFloat inputScale;
@property (nonatomic, assign) CGFloat inputRefraction;
@property (nonatomic, assign) CGFloat inputRotation;
@property (nonatomic, assign) CGFloat inputLevels;
@property (nonatomic, assign) CGFloat inputIntensity;
@property (nonatomic, strong) NSString *inputAmount;
@property (nonatomic, strong) NSString *inputRadius;
@property (nonatomic, strong) NSString *inputWidth;
@property (nonatomic, strong) NSArray<NSString *> *inputCenter;
@property (nonatomic, strong) NSArray<NSString *> *inputPoint0;
@property (nonatomic, strong) NSArray<NSString *> *inputPoint1;
@property (nonatomic, strong) NSArray<NSNumber *> *inputMinComponents;
@property (nonatomic, strong) NSArray<NSNumber *> *inputMaxComponents;
@property (nonatomic, strong) NSArray<NSNumber *> *inputRVector;
@property (nonatomic, strong) NSArray<NSNumber *> *inputGVector;
@property (nonatomic, strong) NSArray<NSNumber *> *inputBVector;
@property (nonatomic, strong) NSArray<NSNumber *> *inputAVector;
@property (nonatomic, strong) NSArray<NSNumber *> *inputBiasVector;

+ (CIContext *)createContextWithOptions:(nullable NSDictionary<NSString *, id> *)options;
- (CIContext *)context;

@end
