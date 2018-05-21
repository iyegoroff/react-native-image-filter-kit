#import <React/UIView+React.h>
#import <React/RCTView.h>

@interface RNImageFilter : RCTView

@property (nonatomic, strong) NSString* name;
@property (nonatomic, strong) NSArray<NSString *> *paramNames;

@property (nonatomic, assign) CGFloat radius;
@property (nonatomic, strong) UIImage* mask;
@property (nonatomic, assign) CGFloat angle;
@property (nonatomic, assign) CGFloat noiseLevel;
@property (nonatomic, assign) CGFloat sharpness;
@property (nonatomic, assign) CGPoint filterCenter;
@property (nonatomic, assign) CGFloat amount;
@property (nonatomic, assign) CGFloat saturation;
@property (nonatomic, assign) CGFloat brightness;
@property (nonatomic, assign) CGFloat contrast;
@property (nonatomic, strong) NSArray<NSNumber *> *minComponents;
@property (nonatomic, strong) NSArray<NSNumber *> *maxComponents;
@property (nonatomic, assign) CGFloat levels;

@end
