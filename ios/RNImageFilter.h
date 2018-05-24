#import <React/UIView+React.h>
#import <React/RCTView.h>

@interface RNImageFilter : RCTView

@property (nonatomic, strong) NSString* name;
@property (nonatomic, strong) NSArray<NSString *> *paramNames;
@property (nonatomic, assign) BOOL resizeOutput;

@property (nonatomic, assign) CGFloat inputRadius;
@property (nonatomic, assign) CGFloat inputAngle;
@property (nonatomic, assign) CGFloat inputNoiseLevel;
@property (nonatomic, assign) CGFloat inputSharpness;
@property (nonatomic, assign) CGFloat inputAmount;
@property (nonatomic, assign) CGFloat inputSaturation;
@property (nonatomic, assign) CGFloat inputBrightness;
@property (nonatomic, assign) CGFloat inputContrast;
@property (nonatomic, assign) CGFloat inputScale;
@property (nonatomic, assign) CGFloat inputRefraction;
@property (nonatomic, assign) CGFloat inputRotation;
@property (nonatomic, assign) CGFloat inputLevels;
@property (nonatomic, assign) CGFloat inputWidth;
@property (nonatomic, assign) CGFloat inputIntensity;
@property (nonatomic, assign) CGPoint inputCenter;
@property (nonatomic, assign) CGPoint inputPoint0;
@property (nonatomic, assign) CGPoint inputPoint1;
@property (nonatomic, strong) NSArray<NSNumber *> *inputMinComponents;
@property (nonatomic, strong) NSArray<NSNumber *> *inputMaxComponents;

@end
