#import <UIKit/UIKit.h>

@interface IFKImage : NSObject

- (nonnull instancetype)initWithImage:(UIImage *)image hash:(NSString *)hashKey;

@property (nonatomic, strong) UIImage *image;
@property (nonatomic, strong) NSString *hashKey;

@end
