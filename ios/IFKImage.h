#import <UIKit/UIKit.h>
#import "IFKCacheable.h"

@interface IFKImage : NSObject <IFKCacheable>

- (nonnull instancetype)initWithImage:(nonnull UIImage *)image
                             cacheKey:(nonnull NSString *)cacheKey;

@property (nonatomic, strong) UIImage * _Nonnull image;
@property (nonatomic, strong) NSString * _Nonnull cacheKey;

@end
