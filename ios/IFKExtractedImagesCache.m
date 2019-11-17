#import "IFKExtractedImagesCache.h"
#import "NSArray+FilterMapReduce.h"
#import <React/RCTBridge.h>

@implementation IFKExtractedImagesCache

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(clean)
{
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    NSString *directory = [NSTemporaryDirectory() stringByAppendingPathComponent:@"ReactNative"];
    NSFileManager *fileManager = [NSFileManager new];
    NSArray<NSString *> *contents = [[fileManager contentsOfDirectoryAtPath:directory
                                                                      error:NULL]
                                     filter:^BOOL(NSString *val, int idx) {
                                       return [val hasSuffix:@"rnifk.png"];
                                     }];

    for (NSString *path in contents) {
      NSString *fullPath = [directory stringByAppendingPathComponent:path];
      if ([fileManager fileExistsAtPath:fullPath]) {
        [fileManager removeItemAtPath:fullPath error:NULL];
#if RCT_DEBUG
        NSLog(@"ImageFilterKit: removed tmp file %@", fullPath);
#endif
      }
    }
  });
}

@end
