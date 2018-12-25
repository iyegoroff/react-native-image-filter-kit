#import "IFKTextImage.h"
#import <UIKit/UIKit.h>
#import <React/RCTUtils.h>
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
  
  // based on this: https://stackoverflow.com/a/28907826/4134913
  
  UIFont *font = [UIFont fontWithName:self.inputFontName size:[self.inputFontSize floatValue]];
  CGRect frame = CGRectMake(0, 0, self.inputExtent.Z, self.inputExtent.W);
  
  UIGraphicsBeginImageContextWithOptions(frame.size, false, 1.0f);
  CGContextRef ctx = UIGraphicsGetCurrentContext();
  CGContextSetTextDrawingMode(ctx, kCGTextInvisible);
  
  [self.inputText drawInRect:frame
              withAttributes:@{NSFontAttributeName: font,
                               NSForegroundColorAttributeName: [UIColor colorWithCIColor:_inputColor]}];
  
  CGPoint p = CGContextGetTextPosition(ctx);
  
  CGContextSetTextDrawingMode(ctx, kCGTextFill);
  
  [self.inputText drawInRect:CGRectMake(self.inputExtent.Z / 2.0f - p.x / 2.0f,
                                        0,//self.inputExtent.W / 2.0f - ([self.inputFontSize floatValue] / 2.0f + p.y / 2.0f) / RCTScreenScale(),
                                        frame.size.width,
                                        frame.size.height)
              withAttributes:@{NSFontAttributeName: font,
                               NSForegroundColorAttributeName: [UIColor colorWithCIColor:_inputColor]}];
  
  UIImage *textImage = UIGraphicsGetImageFromCurrentImageContext();
  
  UIGraphicsEndImageContext();
  
  return [[CIImage alloc] initWithImage:textImage];
}

@end
