#import <Foundation/Foundation.h>

@interface NSArray<T> (FilterMapReduce)

- (NSArray *)map:(id (^ __nonnull)(T val, int idx))block;
- (NSArray<T> *)filter:(BOOL (^ __nonnull)(T val, int idx))block;
- (id)reduce:(id (^ __nonnull)(id acc, T val, int idx))block init:(id)initial;
- (BOOL)every:(BOOL (^ __nonnull)(T val, int idx))block;
- (BOOL)some:(BOOL (^ __nonnull)(T val, int idx))block;
- (T)at:(int)idx;

@end
