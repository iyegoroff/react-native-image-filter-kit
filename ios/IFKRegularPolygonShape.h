#import "IFKShape.h"

@interface IFKRegularPolygonShape : IFKShape

@property (nonatomic, copy) NSNumber *inputCircumradius;
@property (nonatomic, copy) CIVector *inputBorderRadiuses;

@end
