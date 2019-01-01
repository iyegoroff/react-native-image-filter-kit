#import "RCTImageView.h"
#import "IFKCacheable.h"

@interface RCTImageView (CacheKey) <IFKCacheable>

- (nonnull NSString *)cacheKey;

@end
