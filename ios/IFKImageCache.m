#import "IFKImageCache.h"
#import <React/RCTDefines.h>

static IFKImageCache *instance = nil;
static dispatch_once_t onceToken;

#if RCT_DEBUG
static double asMB(unsigned long long bytes) {
  return bytes / 1024.0 / 1024.0;
}
#endif

@interface IFKImageCache ()

@property (nonatomic, strong) NSCache *cache;
#if RCT_DEBUG
@property (nonatomic, assign) NSUInteger cacheSize;
#endif

@end

@implementation IFKImageCache

+ (nonnull IFKImageCache *)instance
{
  dispatch_once(&onceToken, ^{
    if (instance == nil) {
      instance = [[IFKImageCache alloc] initPrivate:[NSProcessInfo processInfo].physicalMemory / 4];
    }
  });
  
  return instance;
}

+ (nonnull IFKImageCache *)instance:(unsigned long long)maxCacheSizeInBytes
{
  dispatch_once(&onceToken, ^{
    if (instance == nil) {
      instance = [[IFKImageCache alloc] initPrivate:maxCacheSizeInBytes];
    }
  });
  
  return instance;
}

- (instancetype)initPrivate:(unsigned long long)maxCacheSizeInBytes {
  if ((self = [super init])) {
    _cache = [[NSCache alloc] init];
    _cache.name = @"IFKImageCache";
    _cache.totalCostLimit = maxCacheSizeInBytes > NSUIntegerMax
      ? NSUIntegerMax
      : (NSUInteger)maxCacheSizeInBytes;
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(recievedMemoryWarning)
                                                 name:UIApplicationDidReceiveMemoryWarningNotification
                                               object:nil];

    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(clearCache)
                                                 name:UIApplicationWillResignActiveNotification
                                               object:nil];
    
#if RCT_DEBUG
    NSLog(@"ImageFilterKit: max cache size %.3f MB", asMB(maxCacheSizeInBytes));
    _cacheSize = 0;
#endif
  }

  return self;
}

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)recievedMemoryWarning
{
#if RCT_DEBUG
  NSLog(@"ImageFilterKit: recieved memory warning !!!");
#endif
  [self clearCache];
}

- (void)clearCache
{
  [_cache removeAllObjects];
#if RCT_DEBUG
  NSLog(@"ImageFilterKit: clear cache");
  _cacheSize = 0;
#endif
}

- (NSUInteger)costFor:(nonnull UIImage *)image
{
  return image.size.width * image.size.height * image.scale * image.scale * 4;
}

- (nullable UIImage *)imageForKey:(nonnull NSString *)key
{
  return (UIImage *)[_cache objectForKey:key];
}

- (void)setImage:(nonnull UIImage *)image forKey:(nonnull NSString *)key
{
  NSUInteger size = [self costFor:image];
  [_cache setObject:image forKey:key cost:size];

#if RCT_DEBUG
  _cacheSize += size;
  
  if (_cacheSize > _cache.totalCostLimit) {
    [self clearCache];
  }
  
  NSLog(@"ImageFilterKit: added %.3f MB sized image to cache", asMB(size));
  NSLog(@"ImageFilterKit: used cache size %.3f MB, %.3f %%",
        asMB(_cacheSize),
        (float)(_cacheSize / (float)_cache.totalCostLimit) * 100.0f);
#endif
}

@end
