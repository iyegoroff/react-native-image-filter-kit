#import <UIKit/UIKit.h>

typedef enum {
  STRETCH,
  CONTAIN,
  COVER
} IFKResizeMode;

@interface IFKResize : NSObject

@end

@interface IFKResizeWithMode : IFKResize

@property (nonatomic, assign) IFKResizeMode mode;

- (nonnull instancetype)initWithMode:(IFKResizeMode)mode;

@end

@interface IFKResizeWithSize : IFKResize

@property (nonatomic, strong) NSNumber *width;
@property (nonatomic, strong) NSNumber *height;

- (nonnull instancetype)initWithSize:(nonnull NSDictionary *)size;

@end
