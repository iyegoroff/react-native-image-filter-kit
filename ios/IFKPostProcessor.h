#import <UIKit/UIKit.h>
#import <React/RCTResizeMode.h>

@interface IFKPostProcessor : NSObject

- (nonnull instancetype)initWithName:(nonnull NSString *)name
                               width:(CGFloat)width
                              height:(CGFloat)height
                              inputs:(nonnull NSDictionary *)inputs;

- (nonnull UIImage *)process:(nonnull UIImage *)image
                  resizeMode:(RCTResizeMode)resizeMode
                   viewFrame:(CGRect)viewFrame;

@end
