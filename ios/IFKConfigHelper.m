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
    && [[[config objectForKey:@"disableCache"] objectForKey:@"bool"] boolValue];
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

+ (NSUInteger)maxImageIndex:(nonnull NSDictionary *)config
{
  NSNumber *(^__block iter)(NSDictionary *, NSNumber *);
  NSNumber *(^__weak __block weakIter)(NSDictionary *, NSNumber *);
  
  weakIter = iter = ^(NSDictionary *nextConfig, NSNumber *prevMaxImageIndex) {
    return [[nextConfig allValues] reduce:^id(NSNumber *acc, NSDictionary *val, int idx) {
      NSObject *image = [val isKindOfClass:[NSDictionary class]]
        ? [val objectForKey:@"image"]
        : nil;
      
      return [image isKindOfClass:[NSNumber class]]
        ? ([acc intValue] > ((NSNumber *)image).intValue ? acc : image)
        : ([image isKindOfClass:[NSDictionary class]] ? weakIter((NSDictionary *)image, acc) : acc);
    } init:prevMaxImageIndex];
  };
  
  return [iter(config, @(0)) intValue];
}

@end
