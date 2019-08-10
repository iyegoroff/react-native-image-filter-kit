#import <CoreImage/CoreImage.h>

@interface IFKHRHazeRemoval : CIFilter

@property (nonatomic, strong) CIImage *inputImage;
@property (nonatomic, copy) CIColor *inputColor;
@property (nonatomic, copy) NSNumber *inputDistance;
@property (nonatomic, copy) NSNumber *inputSlope;

@end
