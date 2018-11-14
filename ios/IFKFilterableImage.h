#import <Foundation/Foundation.h>
#import "Image/RCTImageView.h"
#import "IFKPostProcessor.h"

@interface IFKFilterableImage : NSObject

- (nonnull instancetype)initWithImage:(nonnull RCTImageView *)image
                       postProcessors:(nonnull NSArray<IFKPostProcessor *> *)postProcessors
                        cacheDisabled:(BOOL)cacheDisabled;

- (nonnull NSString *)generatedCacheKey;
- (nonnull RCTImageView *)image;
- (nonnull NSArray<IFKPostProcessor *> *)postProcessors;
- (BOOL)cacheDisabled;

@end
