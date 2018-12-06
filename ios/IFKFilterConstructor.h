#import <CoreImage/CoreImage.h>

// source: https://github.com/YuAo/Vivid/blob/master/Sources/YUCIFilterConstructor.h

@interface IFKFilterConstructor : NSObject <CIFilterConstructor>

+ (instancetype)constructor;

- (instancetype)init NS_UNAVAILABLE;

@end
