#import <Foundation/Foundation.h>

@interface NSArray<T> (FilterMapReduce)

- (NSArray *)map:(id (^)(T val, int idx))block;
- (NSArray<T> *)filter:(BOOL (^)(T val, int idx))block;
- (id)reduce:(id (^)(id acc, T val, int idx))block init:(id)initial;
- (T)at:(int)idx;

@end
