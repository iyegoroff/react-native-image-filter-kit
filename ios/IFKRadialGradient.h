#import "IFKGradient.h"

@interface IFKRadialGradient : IFKGradient

@property (nonatomic, copy) CIVector *inputCenter;
@property (nonatomic, copy) NSNumber *inputRadius;

@end
