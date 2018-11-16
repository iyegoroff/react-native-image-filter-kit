#import <UIKit/UIKit.h>
#import <React/RCTResizeMode.h>

@interface IFKPostProcessor : NSObject

- (nonnull instancetype)initWithName:(nonnull NSString *)name
                               width:(CGFloat)width
                              height:(CGFloat)height
                       mainImageName:(NSString *)mainImageName
                              inputs:(nonnull NSDictionary *)inputs;

- (nonnull UIImage *)process:(nonnull UIImage *)image resizeMode:(RCTResizeMode)resizeMode;
- (nonnull NSString *)postProcessorCacheKey;

@end
