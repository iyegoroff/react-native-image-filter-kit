#import <UIKit/UIKit.h>
#import <React/RCTResizeMode.h>

@interface IFKFilteredImage : NSObject

@property (nonatomic, strong) UIImage *image;
@property (nonatomic, assign) RCTResizeMode resizeMode;
@property (nonatomic, strong) NSString *accumulatedCacheKey;

- (nonnull instancetype)initWithImage:(nonnull UIImage *)image
                           resizeMode:(RCTResizeMode)resizeMode
                  accumulatedCacheKey:(nonnull NSString *)accumulatedCacheKey;

+ (nonnull instancetype)createWithImage:(nonnull UIImage *)image
                             resizeMode:(RCTResizeMode)resizeMode
                    accumulatedCacheKey:(nonnull NSString *)accumulatedCacheKey;

@end
