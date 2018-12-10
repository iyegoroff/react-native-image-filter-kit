#import <CoreImage/CoreImage.h>

@interface IFKXorCompositing : CIFilter

@property (nonatomic, strong) CIImage *inputImage;
@property (nonatomic, strong) CIImage *inputBackgroundImage;

@end
