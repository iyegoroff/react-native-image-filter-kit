#import "IFKGradient.h"

@interface IFKQuadGradient : IFKGradient

@property (nonatomic, copy) CIColor *inputBottomLeftColor;
@property (nonatomic, copy) CIColor *inputBottomRightColor;
@property (nonatomic, copy) CIColor *inputTopLeftColor;
@property (nonatomic, copy) CIColor *inputTopRightColor;

@end
