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

@property (nonatomic, assign) CGSize size;

- (nonnull instancetype)initWithSize:(CGSize)size;

@end
