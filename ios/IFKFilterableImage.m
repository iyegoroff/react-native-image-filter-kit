#import "IFKFilterableImage.h"
#import "IFKConfigHelper.h"

@interface IFKFilterableImage ()

@property (nonatomic, strong) RCTImageView *target;
@property (nonatomic, strong) UIImage *originalImage;
@property (nonatomic, strong) NSString *config;
@property (nonatomic, strong) NSArray<IFKPostProcessor *> *postProcessors;
@property (nonatomic, assign) BOOL isCacheDisabled;

@end

@implementation IFKFilterableImage

- (nonnull instancetype)initWithTarget:(nonnull RCTImageView *)target
                         originalImage:(nonnull UIImage *)originalImage
                                config:(nonnull NSObject *)config
                        postProcessors:(nonnull NSArray<IFKPostProcessor *> *)postProcessors
{
  if ((self = [super init])) {
    _target = target;
    _postProcessors = postProcessors;
    _config = [NSString stringWithFormat:@"%@", config];
    _originalImage = originalImage;
    _isCacheDisabled = [config isKindOfClass:[NSDictionary class]]
      && [IFKConfigHelper isCacheDisabled:(NSDictionary *)config];
  }
  
  return self;
}

@end
