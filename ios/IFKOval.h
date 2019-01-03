#import <CoreImage/CoreImage.h>

@interface IFKOval : CIFilter

@property (nonatomic, copy) CIVector *inputExtent;
@property (nonatomic, copy) NSNumber *inputRadiusX;
@property (nonatomic, copy) NSNumber *inputRadiusY;
@property (nonatomic, copy) NSNumber *inputRotation;
@property (nonatomic, copy) CIColor *inputColor;

@end
