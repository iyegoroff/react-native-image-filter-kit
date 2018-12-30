#import "IFKTextImage.h"
#import <UIKit/UIKit.h>
#import <CoreText/CoreText.h>
#import <React/RCTUtils.h>
#import "Image/RCTImageUtils.h"
#import "IFKFilterConstructor.h"

@implementation IFKTextImage

+ (void)initialize
{
  [CIFilter registerFilterName:NSStringFromClass([IFKTextImage class])
                   constructor:[IFKFilterConstructor constructor]
               classAttributes:@{kCIAttributeFilterDisplayName:@"Text image",
                                 kCIAttributeFilterCategories:@[kCICategoryGenerator,
                                                                kCICategoryVideo,
                                                                kCICategoryStillImage]}];
}

- (NSNumber *)inputFontSize
{
  return _inputFontSize ?: @(16.0);
}

- (NSString *)inputFontName
{
  return _inputFontName ?: @"Helvetica";
}

- (CIImage *)outputImage
{
  if (self.inputExtent == nil || self.inputText == nil) {
    return nil;
  }
  
  UIFont *font = [UIFont fontWithName:self.inputFontName
                                 size:[self.inputFontSize floatValue] * RCTScreenScale()];
  CGRect frame = CGRectMake(0, 0, self.inputExtent.Z, self.inputExtent.W);
  NSDictionary *attrs = @{NSFontAttributeName: font,
                          NSForegroundColorAttributeName: [UIColor colorWithCIColor:_inputColor]};
  
  UIGraphicsBeginImageContextWithOptions(frame.size, false, 1.0f);
  
  CGSize size = [self.inputText sizeWithAttributes:attrs];
  
  CGRect bounds = [self.inputText boundingRectWithSize:size
                                               options:NSStringDrawingUsesLineFragmentOrigin
                                            attributes:attrs
                                               context:nil];
  CGRect altBounds = [self.inputText boundingRectWithSize:size
                                                  options:NSStringDrawingUsesDeviceMetrics
                                               attributes:attrs
                                                  context:nil];
  
  [self.inputText drawInRect:CGRectMake(frame.size.width / 2.0f - altBounds.size.width / 2.0f - altBounds.origin.x,
                                        frame.size.height / 2.0f - bounds.size.height / 2.0f - bounds.origin.y,
                                        size.width,
                                        size.height)
              withAttributes:attrs];
  
  UIImage *textImage = UIGraphicsGetImageFromCurrentImageContext();
  
  UIGraphicsEndImageContext();
  
  return [[CIImage alloc] initWithImage:textImage];
}

@end
