#import <UIKit/UIKit.h>
#import "RNFilteredImage.h"
#import "RNTuple.h"

typedef RNFilteredImage * (^Filtering) (void);

@interface RNFilterPostProcessor : NSObject

+ (RNFilteredImage *)process:(nonnull NSString *)name
                      inputs:(nonnull NSDictionary<NSString *, RNTuple<id, NSString *> *> *)inputs
                     context:(nonnull CIContext *)context
                  filterings:(nonnull NSDictionary<NSString *, Filtering> *)filterings
                resizeOutput:(BOOL)resizeOutput;

@end
