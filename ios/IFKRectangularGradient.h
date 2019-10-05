#import "IFKGradient.h"

@interface IFKRectangularGradient : IFKGradient

@property (nonatomic, copy) CIVector *inputCenter;
@property (nonatomic, copy) NSNumber *inputHalfWidth;
@property (nonatomic, copy) NSNumber *inputHalfHeight;

@end
