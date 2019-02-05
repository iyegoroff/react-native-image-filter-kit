#import "RCTImageView+CacheKey.h"
#import <React/RCTImageSource.h>
#import "NSArray+FilterMapReduce.h"

@implementation RCTImageView (CacheKey)

- (nonnull NSString *)cacheKey
{
  return [self.imageSources reduce:^id(NSString *key, RCTImageSource *source, int idx) {
    return [NSString stringWithFormat:
            @"%@(%@_%f_%@)",
            key,
            [NSValue valueWithCGSize:source.size],
            source.scale,
            source.request.URL.absoluteString];
    
  } init:[NSString stringWithFormat:@"%ld", (long)self.resizeMode]];
}

@end
