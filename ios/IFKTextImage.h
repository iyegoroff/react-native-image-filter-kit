#import <CoreImage/CoreImage.h>

@interface IFKTextImage : CIFilter

@property (nonatomic, copy) CIVector *inputExtent;
@property (nonatomic, copy) NSString *inputText;
@property (nonatomic, copy) NSString *inputFontName;
@property (nonatomic, copy) NSNumber *inputFontSize;
@property (nonatomic, copy) CIColor *inputColor;

@end
