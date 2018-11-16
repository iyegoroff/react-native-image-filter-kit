#import <Foundation/Foundation.h>
#import "Image/RCTImageView.h"
#import "IFKPostProcessor.h"

@interface IFKFilterableImage : NSObject

- (nonnull instancetype)initWithTarget:(nonnull RCTImageView *)target
                        originalImage:(nonnull UIImage *)originalImage
                       postProcessors:(nonnull NSArray<IFKPostProcessor *> *)postProcessors
                        cacheDisabled:(BOOL)cacheDisabled;

- (nonnull NSString *)generatedCacheKey;
- (nonnull RCTImageView *)target;
- (nonnull UIImage *)originalImage;
- (nonnull NSArray<IFKPostProcessor *> *)postProcessors;
- (BOOL)cacheDisabled;

@end
