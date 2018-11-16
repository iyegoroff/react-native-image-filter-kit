#import <UIKit/UIKit.h>
#import "IFKResize.h"
#import "IFKScale.h"
#import "IFKGravityAxis.h"

@interface IFKInputConverter : NSObject

- (nonnull instancetype)initWithWidth:(CGFloat)boundsWidth height:(CGFloat)boundsHeight;

- (nullable NSObject *)convertAny:(nullable NSDictionary *)any;

- (nullable UIImage *)convertImage:(nullable NSDictionary *)image
                      defaultValue:(nullable UIImage *)defaultValue;

- (nullable NSNumber *)convertScalar:(nullable NSDictionary *)scalar
                        defaultValue:(nullable NSNumber *)defaultValue;

- (nullable CIColor *)convertColor:(nullable NSDictionary *)color
                      defaultValue:(nullable CIColor *)defaultValue;

- (nullable NSNumber *)convertDistance:(nullable NSDictionary *)distance
                          defaultValue:(nullable NSNumber *)defaultValue;

//- (nonnull IFKResize *)convertResize:(nullable NSDictionary *)resize
//                        defaultValue:(IFKResizeMode)defaultValue;

- (nullable CIVector *)convertScalarVector:(nullable NSDictionary *)scalarVector
                              defaultValue:(nullable CIVector *)defaultValue;

//- (nonnull IFKScale *)convertScale:(nullable NSDictionary *)scale
//                      defaultValue:(IFKScaleMode)defaultValue;

//- (IFKGravityAxis)convertGravityAxis:(nullable NSDictionary *)gravityAxis
//                        defaultValue:(IFKGravityAxis)defaultValue;

- (nullable CIVector *)convertOffset:(nullable NSDictionary *)offset
                        defaultValue:(nullable CIVector *)defaultValue;

- (nullable CIVector *)convertPosition:(nullable NSDictionary *)position
                          defaultValue:(nullable CIVector *)defaultValue;

@end
