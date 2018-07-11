#import "RNImageFilterWithoutColorManagement.h"

static CIContext* context;

@implementation RNImageFilterWithoutColorManagement

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    static dispatch_once_t onceToken;

    dispatch_once(&onceToken, ^{
      context = [RNImageFilter createContextWithOptions:@{kCIImageColorSpace: [NSNull null],
                                                          kCIImageProperties: [NSNull null],
                                                          kCIContextWorkingColorSpace: [NSNull null]}];
    });
  }
  
  return self;
}

- (CIContext *)context
{
  return context;
}

@end
