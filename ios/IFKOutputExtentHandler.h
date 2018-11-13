#import <UIKit/UIKit.h>
#import "IFKTuple.h"

@interface IFKOutputExtentHandler : NSObject

+ (CGRect)resizedRect:(nonnull CIFilter *)filter
          inputExtent:(CGRect)inputExtent
             destSize:(CGSize)destSize;

@end
