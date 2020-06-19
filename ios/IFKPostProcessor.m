#import "IFKPostProcessor.h"
#import "IFKInputConverter.h"
#import "NSArray+FilterMapReduce.h"

@interface UIImage (React)

@property (nonatomic, copy) CAKeyframeAnimation *reactKeyframeAnimation;

@end

@interface IFKPostProcessor ()

@property (nonatomic, strong) CIFilter *filter;
@property (nonatomic, strong) NSDictionary *inputs;
@property (nonatomic, assign) BOOL clampToExtent;
@property (nonatomic, assign) BOOL isGenerator;
@property (nonatomic, assign) BOOL hasColorManagement;

@end

@implementation IFKPostProcessor

- (nonnull instancetype)initWithName:(nonnull NSString *)name inputs:(nonnull NSDictionary *)inputs
{
  if ((self = [super init])) {
    _filter = [CIFilter filterWithName:name];
    _inputs = inputs;

    _clampToExtent = [[IFKInputConverter convertBoolean:[_inputs objectForKey:@"clampToExtent"]
                                           defaultValue:@NO] boolValue];
    _isGenerator = [[_inputs objectForKey:@"isGenerator"] objectForKey:@"marker"] != nil;
    _hasColorManagement = [[_inputs objectForKey:@"hasColorManagement"] objectForKey:@"marker"] != nil;
  }

  return self;
}

- (void)initFilter:(CGSize)size
{
  static NSArray<NSString *> *skippedInputs;

  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    skippedInputs = @[
      @"disableCache",
      @"name",
      @"key",
      @"inputImage",
      @"resizeCanvasTo",
      @"swapImages",
      @"clampToExtent",
      @"dstTransform",
      @"srcTransform"
    ];
  });

  NSArray *names = [[_inputs allKeys] filter:^BOOL(NSString *val, int idx) {
    return ![skippedInputs containsObject:val] && ![self->_inputs[val] objectForKey:@"marker"];
  }];

  for (NSString *inputName in names) {
    [_filter setValue:[IFKInputConverter convertAny:[_inputs objectForKey:inputName] bounds:size]
               forKey:inputName];
  }
}

- (nonnull UIImage *)process:(nonnull UIImage *)image canvasSize:(CGSize)canvasSize
{
  return _isGenerator
    ? [self processGenerator:image canvasSize:canvasSize]
    : [self processFilter:image];
}

- (nonnull UIImage *)processFilter:(nonnull UIImage *)image
{
  CIImage *tmp = [[CIImage alloc] initWithImage:image];
  [self initFilter:tmp.extent.size];

  [_filter setValue:_clampToExtent ? [tmp imageByClampingToExtent] : tmp forKey:@"inputImage"];

  return [self filteredImage:image viewFrame:tmp.extent];
}

- (nonnull UIImage *)processGenerator:(nonnull UIImage *)image canvasSize:(CGSize)canvasSize
{
  CGRect frame = CGRectMake(0, 0, canvasSize.width, canvasSize.height);

  [self initFilter:canvasSize];

  if ([[_filter inputKeys] containsObject:@"inputExtent"]) {
    [_filter setValue:[CIVector vectorWithCGRect:frame] forKey:@"inputExtent"];
  }

  return [self filteredImage:image viewFrame:frame];
}

- (nonnull UIImage *)filteredImage:(UIImage *)image viewFrame:(CGRect)viewFrame
{
  CGImageRef cgim = [[self context] createCGImage:_filter.outputImage fromRect:viewFrame];

  UIImage *filteredImage = [UIImage imageWithCGImage:cgim
                                               scale:image.scale
                                         orientation:image.imageOrientation];

  CGImageRelease(cgim);

  return filteredImage;
}


- (nonnull CIContext *)context
{
  static dispatch_once_t initToken;
  static dispatch_once_t contextWithColorManagementToken;
  static dispatch_once_t contextToken;

  static EAGLContext *eaglContext;
  static CIContext *context;
  static CIContext *contextWithColorManagement;

  dispatch_once(&initToken, ^{
    eaglContext = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES3]
      ?: [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2];
  });

  if (_hasColorManagement) {
    dispatch_once(&contextToken, ^{
      context = [CIContext contextWithEAGLContext:eaglContext
                                          options:@{kCIImageColorSpace: [NSNull null],
                                                    kCIImageProperties: [NSNull null],
                                                    kCIContextWorkingColorSpace: [NSNull null]}];
    });

    return context;

  } else {
    dispatch_once(&contextWithColorManagementToken, ^{
      contextWithColorManagement = [CIContext contextWithEAGLContext:eaglContext options:nil];
    });

    return contextWithColorManagement;
  }
}

@end
