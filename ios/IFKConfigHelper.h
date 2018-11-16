#import <Foundation/Foundation.h>

@interface IFKConfigHelper : NSObject

+ (BOOL)isCacheDisabled:(nonnull NSDictionary *)config;
+ (BOOL)isSingular:(nonnull NSDictionary *)config;
+ (BOOL)isComposition:(nonnull NSDictionary *)config;
+ (nonnull NSDictionary<NSString *, NSObject *> *)wrappedConfigs:(nonnull NSDictionary *)config;

@end
