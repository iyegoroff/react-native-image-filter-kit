#import "RNImageColorMatrixFilterManager.h"
#import "RNImageColorMatrixFilter.h"

@implementation RNImageColorMatrixFilterManager

RCT_EXPORT_MODULE();

- (UIView *)view
{
  return [[RNImageColorMatrixFilter alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(matrix, NSArray<NSNumber *>);

@end
