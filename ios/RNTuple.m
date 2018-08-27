#import "RNTuple.h"

@implementation RNTuple

- (instancetype)initWith:(id)first and:(id)second
{
  if ((self = [super init])) {
    _first = first;
    _second = second;
  }
  
  return self;
}

+ (instancetype)createWith:(id)first and:(id)second
{
  return [[RNTuple alloc] initWith:first and:second];
}

@end
