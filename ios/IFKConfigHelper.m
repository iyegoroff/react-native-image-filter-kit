#import "IFKConfigHelper.h"
#import "NSArray+FilterMapReduce.h"

@implementation IFKConfigHelper

+ (BOOL)isCacheDisabled:(nonnull NSDictionary *)config
{
  return [config objectForKey:@"disableCache"] != nil
    && [[config objectForKey:@"disableCache"] objectForKey:@"bool"];
}

+ (BOOL)isSingular:(nonnull NSDictionary *)config
{
  return [IFKConfigHelper countImages:config] == 1;
}

+ (BOOL)isComposition:(nonnull NSDictionary *)config
{
  return [IFKConfigHelper countImages:config] > 1;
}

+ (nonnull NSDictionary<NSString *, NSObject *> *)wrappedConfigs:(nonnull NSDictionary *)config
{
  return [[config allKeys] reduce:^id(NSMutableDictionary *acc, NSString *key, int idx) {
    NSObject *input = [config objectForKey:key];
    NSObject *image = [input isKindOfClass:[NSDictionary class]]
      ? [(NSDictionary *)input objectForKey:@"image"]
      : nil;

    if (image != nil) {
      [acc setObject:image forKey:key];
    }
    
    return acc;
  } init:[NSMutableDictionary dictionary]];
}

+ (NSUInteger)countImages:(nonnull NSDictionary *)config
{
  return [[config allValues] filter:^BOOL(NSObject *val, int idx) {
    return [val isKindOfClass:[NSDictionary class]]
      && [(NSDictionary *)val objectForKey:@"image"] != nil;
  }].count;
}

@end
