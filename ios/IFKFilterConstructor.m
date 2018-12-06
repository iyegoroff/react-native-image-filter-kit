#import "IFKFilterConstructor.h"

// source: https://github.com/YuAo/Vivid/blob/master/Sources/YUCIFilterConstructor.m

@implementation IFKFilterConstructor

+ (instancetype)constructor {
  static IFKFilterConstructor *constructor;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    constructor = [[IFKFilterConstructor alloc] initForSharedConstructor];
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
