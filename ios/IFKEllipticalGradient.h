#import "IFKGradient.h"

@interface IFKEllipticalGradient : IFKGradient

@property (nonatomic, copy) CIVector *inputCenter;
@property (nonatomic, copy) NSNumber *inputRadiusX;
@property (nonatomic, copy) NSNumber *inputRadiusY;

@end
