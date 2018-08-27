#import <UIKit/UIKit.h>
#import "RNTuple.h"

@interface RNOutputExtentHandler : NSObject

+ (CGRect)resizedRect:(nonnull CIFilter *)filter
          inputExtent:(CGRect)inputExtent
             destSize:(CGSize)destSize;

@end
