#import <UIKit/UIKit.h>

@interface IFKLinearGradient : CIFilter

@property (nonatomic, copy) CIVector *inputExtent;
@property (nonatomic, copy) NSNumber *inputAmount;

@property (nonatomic, copy) CIColor *inputColor0;
@property (nonatomic, copy) CIColor *inputColor1;
@property (nonatomic, copy) CIColor *inputColor2;
@property (nonatomic, copy) CIColor *inputColor3;
@property (nonatomic, copy) CIColor *inputColor4;

@property (nonatomic, copy) NSNumber *inputStop0;
@property (nonatomic, copy) NSNumber *inputStop1;
@property (nonatomic, copy) NSNumber *inputStop2;
@property (nonatomic, copy) NSNumber *inputStop3;
@property (nonatomic, copy) NSNumber *inputStop4;

@property (nonatomic, copy) CIVector *inputStart;
@property (nonatomic, copy) CIVector *inputEnd;

@end
