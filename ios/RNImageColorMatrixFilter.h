#import "RNImageFilterWithoutColorManagement.h"

@interface RNImageColorMatrixFilter : RNImageFilterWithoutColorManagement

@property (nonatomic, strong) NSArray<NSNumber *> *matrix;

@end
