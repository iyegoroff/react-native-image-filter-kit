#import "IFKGradient.h"

@interface IFKLinearGradient : IFKGradient

@property (nonatomic, copy) CIVector *inputStart;
@property (nonatomic, copy) CIVector *inputEnd;

@end
