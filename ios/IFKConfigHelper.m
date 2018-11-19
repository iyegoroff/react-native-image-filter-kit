#import "IFKConfigHelper.h"
#import "NSArray+FilterMapReduce.h"
#import <React/RCTAssert.h>

@implementation IFKConfigHelper

+ (nonnull NSString *)name:(nonnull NSDictionary *)config
{
  return [config objectForKey:@"name"];
}

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

+ (NSString *)mainImage:(nonnull NSDictionary *)config
{
  if ([config objectForKey:@"inputImage"] != nil) {
    return @"inputImage";
  }
  
  if ([config objectForKey:@"generatedImage"] != nil) {
    return @"generatedImage";
  }
  
  RCTAssert(false,
            @"ImageFilterKit: ConfigHelper - can't find any main image for %@ config",
            [IFKConfigHelper name:config]);
  
  return nil;
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
