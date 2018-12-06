#import <UIKit/UIKit.h>
#import "IFKCacheable.h"

@interface IFKImage : NSObject <IFKCacheable>

- (nonnull instancetype)initWithImage:(UIImage *)image cacheKey:(NSString *)cacheKey;

@property (nonatomic, strong) UIImage *image;
@property (nonatomic, strong) NSString *cacheKey;

@end
