#import <Foundation/Foundation.h>

typedef enum {
  UP,
  DOWN
} IFKScaleMode;

@interface IFKScale : NSObject

@end

@interface IFKScaleWithMode : IFKScale

@property (nonatomic, assign) IFKScaleMode mode;

- (nonnull instancetype)initWithMode:(IFKScaleMode)mode;

@end

@interface IFKScaleWithMatch : IFKScale

@property (nonatomic, strong) NSString *match;

- (nonnull instancetype)initWithMatch:(NSString *)match;

@end
