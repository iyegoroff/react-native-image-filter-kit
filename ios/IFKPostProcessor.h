#import <UIKit/UIKit.h>
#import <React/RCTResizeMode.h>

@interface IFKPostProcessor : NSObject

- (nonnull instancetype)initWithName:(nonnull NSString *)name inputs:(nonnull NSDictionary *)inputs;

- (nonnull UIImage *)process:(nonnull UIImage *)image
                  resizeMode:(RCTResizeMode)resizeMode
                  canvasSize:(CGSize)canvasSize;

@end
