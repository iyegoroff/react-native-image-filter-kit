#import <UIKit/UIKit.h>
#import "IFKResize.h"

@interface IFKInputConverter : NSObject

+ (nullable NSObject *)convertAny:(nullable NSDictionary *)any bounds:(CGSize)bounds;

+ (nullable UIImage *)convertImage:(nullable NSDictionary *)image
                      defaultValue:(nullable UIImage *)defaultValue;

+ (nullable NSNumber *)convertScalar:(nullable NSDictionary *)scalar
                        defaultValue:(nullable NSNumber *)defaultValue;

+ (nullable CIColor *)convertColor:(nullable NSDictionary *)color
                      defaultValue:(nullable CIColor *)defaultValue;

+ (nullable NSNumber *)convertDistance:(nullable NSDictionary *)distance
                                bounds:(CGSize)bounds
                          defaultValue:(nullable NSNumber *)defaultValue;

+ (nonnull IFKResize *)convertResize:(nullable NSDictionary *)resize
                        defaultValue:(IFKResizeMode)defaultValue;

+ (nullable CIVector *)convertScalarVector:(nullable NSDictionary *)scalarVector
                              defaultValue:(nullable CIVector *)defaultValue;

+ (nullable NSArray<CIColor *> *)convertColorVector:(nullable NSDictionary *)colorVector
                                       defaultValue:(nullable NSArray<CIColor *> *)defaultValue;

+ (nullable CIVector *)convertOffset:(nullable NSDictionary *)offset
                        defaultValue:(nullable CIVector *)defaultValue;

+ (nullable CIVector *)convertPosition:(nullable NSDictionary *)position
                                bounds:(CGSize)bounds
                          defaultValue:(nullable CIVector *)defaultValue;

+ (nullable CIVector *)convertDistanceVector:(nullable NSDictionary *)distanceVector
                                      bounds:(CGSize)bounds
                                defaultValue:(nullable CIVector *)defaultValue;

+ (nullable NSString *)convertText:(nullable NSDictionary *)text
                      defaultValue:(nullable NSString *)defaultValue;

+ (nullable CIVector *)convertArea:(nullable NSDictionary *)area
                            bounds:(CGSize)bounds
                      defaultValue:(nullable CIVector *)defaultValue;

+ (nullable NSData *)convertISOLatin1EncodedText:(nullable NSDictionary *)text
                                    defaultValue:(nullable NSData *)defaultValue;

+ (nullable NSNumber *)convertBoolean:(nullable NSDictionary *)boolean
                         defaultValue:(nullable NSNumber *)defaultValue;

@end
