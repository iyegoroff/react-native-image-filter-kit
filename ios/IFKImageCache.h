#import <UIKit/UIKit.h>

@interface IFKImageCache : NSObject

+ (nonnull IFKImageCache *)instance;
+ (nonnull IFKImageCache *)instance:(unsigned long long)maxCacheSizeInBytes;
- (nullable UIImage *)imageForKey:(nonnull NSString *)key;
- (void)setImage:(nonnull UIImage *)image forKey:(nonnull NSString *)key;

- (instancetype)init UNAVAILABLE_ATTRIBUTE;
+ (instancetype)new UNAVAILABLE_ATTRIBUTE;

@end
