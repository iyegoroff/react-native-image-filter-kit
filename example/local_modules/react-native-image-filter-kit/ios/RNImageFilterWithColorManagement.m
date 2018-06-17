#import "RNImageFilterWithColorManagement.h"

static CIContext* context;

@implementation RNImageFilterWithColorManagement

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    static dispatch_once_t onceToken;
    
    dispatch_once(&onceToken, ^{
      context = [RNImageFilter createContextWithOptions:nil];
    });
  }
  
  return self;
}

- (CIContext *)context
{
  return context;
}

@end
