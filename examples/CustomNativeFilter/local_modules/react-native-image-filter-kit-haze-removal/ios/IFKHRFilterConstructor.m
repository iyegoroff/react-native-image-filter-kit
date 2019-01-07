#import "IFKHRFilterConstructor.h"

// source: https://github.com/YuAo/Vivid/blob/master/Sources/YUCIFilterConstructor.m

@implementation IFKHRFilterConstructor

+ (instancetype)constructor {
  static IFKHRFilterConstructor *constructor;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    constructor = [[IFKHRFilterConstructor alloc] initForSharedConstructor];
  });
  return constructor;
}

- (instancetype)initForSharedConstructor {
  if (self = [super init]) {
    
  }
  return self;
}

- (CIFilter *)filterWithName:(NSString *)name {
  return [[NSClassFromString(name) alloc] init];
}

@end
