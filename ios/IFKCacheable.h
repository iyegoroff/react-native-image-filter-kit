#import <Foundation/Foundation.h>

#ifndef IFKCacheable_h
#define IFKCacheable_h

@protocol IFKCacheable <NSObject>

- (nonnull NSString *)cacheKey;

@end

#endif /* IFKCacheable_h */
