#import "IFKTransform.h"

@implementation IFKTransform

- (NSString *)description
{
  return [NSString stringWithFormat:
          @"Transform(%f, %f, %f, %f, %@, %f)",
          _anchor.x,
          _anchor.y,
          _translate.x,
          _translate.y,
          _scale,
          _rotate];
}

- (nonnull instancetype)initWithAnchor:(CGPoint)anchor
                             translate:(CGPoint)translate
                                 scale:(IFKScale *)scale
                                rotate:(CGFloat)rotate
{
  if ((self = [super init])) {
    _anchor = anchor;
    _translate = translate;
    _scale = scale;
    _rotate = rotate;
  }
  
  return self;
}

@end
