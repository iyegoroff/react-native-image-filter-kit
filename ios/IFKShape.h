#import <CoreImage/CoreImage.h>

@interface IFKShape : CIFilter

@property (nonatomic, copy) CIVector *inputExtent;
@property (nonatomic, copy) CIColor *inputColor;

@end
