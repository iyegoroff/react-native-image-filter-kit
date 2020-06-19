#import <UIKit/UIKit.h>

@interface IFKPostProcessor : NSObject

- (nonnull instancetype)initWithName:(nonnull NSString *)name inputs:(nonnull NSDictionary *)inputs;

- (nonnull UIImage *)process:(nonnull UIImage *)image canvasSize:(CGSize)canvasSize;

@end
