#import <UIKit/UIKit.h>
#import "RNFilteredImage.h"

@interface RNFilterPostProcessor : NSObject

- (nonnull instancetype)initWithName:(nonnull NSString *)name
                              inputs:(nonnull NSDictionary *)inputs
                             context:(nonnull CIContext *)context
                        resizeOutput:(BOOL)resizeOutput;

+ (nonnull instancetype)createWithName:(nonnull NSString *)name
                                inputs:(nonnull NSDictionary *)inputs
                               context:(nonnull CIContext *)context
                          resizeOutput:(BOOL)resizeOutput;

- (nonnull RNFilteredImage *)process:(nonnull NSDictionary<NSString *, RNFilteredImage *> *)images;

@end
