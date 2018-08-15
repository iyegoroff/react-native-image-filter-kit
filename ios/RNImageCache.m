#import "RNImageCache.h"

static NSCache *imageCache(void) {
  static NSCache *cache;
  static dispatch_once_t onceToken;
  
  dispatch_once(&onceToken, ^{
    cache = [[NSCache alloc] init];
    
    uint64_t physicalMemory = [NSProcessInfo processInfo].physicalMemory;
    float ratio = physicalMemory <= (1024 * 1024 * 512 /* 512 Mb */) ? 0.1 : 0.2;
    uint64_t limit = physicalMemory / (uint64_t)(1 / ratio);
    cache.totalCostLimit = limit > (uint64_t)(INT_MAX) ? INT_MAX : (int)limit;
    cache.name = @"RNImageCache";
  });
  
  return cache;
}

@implementation RNImageCache

+ (unsigned long)costFor:(nonnull UIImage *)image
{
  return [UIImageJPEGRepresentation(image, 1) length];
}

+ (nullable UIImage *)imageForKey:(nonnull NSString *)key
{
  UIImage *image = (UIImage *)[imageCache() objectForKey:key];
  
  if (image != nil) {
    NSLog(@"filter: cache hit");
  } else {
    NSLog(@"filter: cache miss");
  }
  
  return image;
}

+ (void)setImage:(nonnull UIImage *)image forKey:(nonnull NSString *)key
{
  [imageCache() setObject:image forKey:key cost:[RNImageCache costFor:image]];
}

@end
