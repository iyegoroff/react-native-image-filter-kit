#import <CoreImage/CoreImage.h>

@interface IFKCircle : CIFilter

@property (nonatomic, copy) CIVector *inputExtent;
@property (nonatomic, copy) NSNumber *inputRadius;
@property (nonatomic, copy) CIColor *inputColor;

@end
