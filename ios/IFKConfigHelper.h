#import <Foundation/Foundation.h>

@interface IFKConfigHelper : NSObject

+ (nonnull NSString *)name:(nonnull NSDictionary *)config;
+ (BOOL)isCacheDisabled:(nonnull NSDictionary *)config;
+ (BOOL)isSingular:(nonnull NSDictionary *)config;
+ (BOOL)isComposition:(nonnull NSDictionary *)config;
+ (nonnull NSString *)mainImage:(nonnull NSDictionary *)config;
+ (nonnull NSDictionary<NSString *, NSObject *> *)wrappedConfigs:(nonnull NSDictionary *)config;
+ (NSUInteger)maxImageIndex:(nonnull NSDictionary *)config;

@end
