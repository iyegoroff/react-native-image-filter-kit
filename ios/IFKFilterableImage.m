#import "IFKFilterableImage.h"
#import "React/RCTImageSource.h"
#import "NSArray+FilterMapReduce.h"

@interface IFKFilterableImage ()

@property (nonatomic, strong) RCTImageView *target;
@property (nonatomic, strong) UIImage *originalImage;
@property (nonatomic, strong) NSArray<IFKPostProcessor *> *postProcessors;
@property (nonatomic, assign) BOOL cacheDisabled;

@end

@implementation IFKFilterableImage

- (nonnull instancetype)initWithTarget:(nonnull RCTImageView *)target
                        originalImage:(nonnull UIImage *)originalImage
                       postProcessors:(nonnull NSArray<IFKPostProcessor *> *)postProcessors
                        cacheDisabled:(BOOL)cacheDisabled
{
  if ((self = [super init])) {
    _target = target;
    _postProcessors = postProcessors;
    _cacheDisabled = cacheDisabled;
    _originalImage = originalImage;
  }
  
  return self;
}

- (nonnull NSString *)generatedCacheKey
{
  return [_postProcessors reduce:^id(NSString *key, IFKPostProcessor *postProcessor, int idx) {
    return [NSString stringWithFormat:@"%@{%@}", key, [postProcessor postProcessorCacheKey]];

  } init:[_target.imageSources reduce:^id(NSString *key, RCTImageSource *source, int idx) {
    return [NSString stringWithFormat:@"%@(%@_%f_%@)",
            key,
            [NSValue valueWithCGSize:source.size],
            source.scale,
            source.request.URL.absoluteString];

  } init:@""]];
}

@end
