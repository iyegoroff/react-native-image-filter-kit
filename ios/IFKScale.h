#import <UIKit/UIKit.h>

typedef enum {
  STRETCH,
  CONTAIN,
  COVER
} IFKScaleMode;

@interface IFKScale : NSObject

@end

@interface IFKScaleWithMode : IFKScale

@property (nonatomic, assign) IFKScaleMode mode;

- (nonnull instancetype)initWithMode:(IFKScaleMode)mode;

@end

@interface IFKScaleWithSize : IFKScale

@property (nonatomic, assign) CGPoint scale;

- (nonnull instancetype)initWithX:(CGFloat)x andY:(CGFloat)y;

@end
