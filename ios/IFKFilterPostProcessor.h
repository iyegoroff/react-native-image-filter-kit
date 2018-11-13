#import <UIKit/UIKit.h>
#import "IFKFilteredImage.h"
#import "IFKTuple.h"

typedef IFKFilteredImage * (^Filtering) (void);

@interface IFKFilterPostProcessor : NSObject

+ (IFKFilteredImage *)process:(nonnull NSString *)name
                      inputs:(nonnull NSDictionary<NSString *, IFKTuple<id, NSString *> *> *)inputs
                     context:(nonnull CIContext *)context
                  filterings:(nonnull NSDictionary<NSString *, Filtering> *)filterings
                resizeOutput:(BOOL)resizeOutput
                   mainFrame:(CGRect)mainFrame;

@end
