#import <React/UIView+React.h>
#import <React/RCTView.h>

@interface RNImageColorFilter : RCTView

@property (nonatomic, strong) CIContext *context;
@property (nonatomic, strong) NSMapTable<UIView *, CIImage *> *originalImages;

@property (nonatomic, strong) NSArray<NSNumber *> *matrix;
@property (nonatomic, assign) CGFloat radius;
@property (nonatomic, strong) UIImage* mask;
@property (nonatomic, assign) CGFloat angle;
@property (nonatomic, assign) CGFloat noiseLevel;
@property (nonatomic, assign) CGFloat sharpness;
@property (nonatomic, assign) CGPoint filterCenter;
@property (nonatomic, assign) CGFloat amount;
@property (nonatomic, strong) NSString* name;
@property (nonatomic, strong) NSArray<NSString *> *paramNames;

- (void)drawImages;

@end
