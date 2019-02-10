#import "NSArray+FilterMapReduce.h"

@implementation NSArray (FilterMapReduce)

- (NSArray *)map:(id (^ __nonnull)(id val, int idx))block
{
  NSMutableArray *arr = [NSMutableArray array];
  
  for (int i = 0; i < self.count; i++) {
    [arr addObject:block([self objectAtIndex:i], i)];
  }
  
  return arr;
}

- (NSArray *)filter:(BOOL (^ __nonnull)(id val, int idx))block
{
  NSMutableArray *arr = [NSMutableArray array];
  
  for (int i = 0; i < self.count; i++) {
    if (block([self objectAtIndex:i], i)) {
      [arr addObject:[self objectAtIndex:i]];
    }
  }
  
  return arr;
}

- (id)reduce:(id (^ __nonnull)(id acc, id val, int idx))block init:(id)initial
{
  id acc = initial;
  
  for (int i = 0; i < self.count; i++) {
    acc = block(acc, [self objectAtIndex:i], i);
  }
  
  return acc;
}

- (BOOL)every:(BOOL (^ __nonnull)(id val, int idx))block
{
  for (int i = 0; i < self.count; i++) {
    if (!block([self objectAtIndex:i], i)) {
      return NO;
    }
  }
  
  return YES;
}

- (BOOL)some:(BOOL (^ __nonnull)(id val, int idx))block
{
  for (int i = 0; i < self.count; i++) {
    if (block([self objectAtIndex:i], i)) {
      return YES;
    }
  }
  
  return NO;
}

- (id)at:(int)idx
{
  return self.count > idx ? [self objectAtIndex:idx] : nil;
}

@end
