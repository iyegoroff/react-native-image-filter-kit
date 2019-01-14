#import "IFKScale.h"

@interface IFKTransform : NSObject

@property (nonatomic, assign) CGPoint anchor;
@property (nonatomic, assign) CGPoint translate;
@property (nonatomic, strong) IFKScale *scale;
@property (nonatomic, assign) CGFloat rotate;

- (nonnull instancetype)initWithAnchor:(CGPoint)anchor
                             translate:(CGPoint)translate
                                 scale:(IFKScale *)scale
                                rotate:(CGFloat)rotate;

@end
