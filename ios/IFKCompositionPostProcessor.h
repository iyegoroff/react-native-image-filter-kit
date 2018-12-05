#import "IFKPostProcessor.h"

@interface IFKCompositionPostProcessor : IFKPostProcessor

- (nonnull instancetype)initWithName:(nonnull NSString *)name
                              inputs:(nonnull NSDictionary *)inputs
                          canvasSize:(CGSize)canvasSize;

@end
