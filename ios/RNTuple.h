#import <Foundation/Foundation.h>

@interface RNTuple<__covariant First, __covariant Second> : NSObject

@property (nonatomic, strong) First first;
@property (nonatomic, strong) Second second;

- (instancetype)initWith:(First)first and:(Second)second;
+ (instancetype)createWith:(First)first and:(Second)second;

@end
