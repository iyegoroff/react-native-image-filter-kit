#import "RNImageColorMatrixFilter.h"

@interface RNImageFilter ()

- (RNImageFilter *)outputFilter;
- (CIFilter *)filter;
- (void)runFilterPipeline:(RNImageFilter *)invalidationStartNode;

@end

@implementation RNImageColorMatrixFilter

- (void)setMatrix:(NSArray<NSNumber *> *)matrix
{
  _matrix = matrix;
  
  CGFloat m[20] = {
    [_matrix[0] floatValue], [_matrix[1] floatValue], [_matrix[2] floatValue], [_matrix[3] floatValue],
    [_matrix[5] floatValue], [_matrix[6] floatValue], [_matrix[7] floatValue], [_matrix[8] floatValue],
    [_matrix[10] floatValue], [_matrix[11] floatValue], [_matrix[12] floatValue], [_matrix[13] floatValue],
    [_matrix[15] floatValue], [_matrix[16] floatValue], [_matrix[17] floatValue], [_matrix[18] floatValue],
    [_matrix[4] floatValue], [_matrix[9] floatValue], [_matrix[14] floatValue], [_matrix[19] floatValue]
  };
  
  CIFilter *filter = [self filter];
  
  [filter setValue:[CIVector vectorWithValues:&m[0] count:4] forKey:@"inputRVector"];
  [filter setValue:[CIVector vectorWithValues:&m[4] count:4] forKey:@"inputGVector"];
  [filter setValue:[CIVector vectorWithValues:&m[8] count:4] forKey:@"inputBVector"];
  [filter setValue:[CIVector vectorWithValues:&m[12] count:4] forKey:@"inputAVector"];
  [filter setValue:[CIVector vectorWithValues:&m[16] count:4] forKey:@"inputBiasVector"];
  
  [self runFilterPipeline:[self outputFilter]];
}
@end
