#import "IFKInputConverter.h"
#import "RCTAssert.h"
#import "IFKCompositionPostProcessor.h"
#import "NSArray+FilterMapReduce.h"

@interface IFKPostProcessor ()

- (nonnull UIImage *)filteredImage:(UIImage *)image viewFrame:(CGRect)viewFrame;
- (nonnull CIFilter *)filter;
- (void)initFilter:(CGSize)size;
- (nonnull NSDictionary*)inputs;

@end

@interface IFKCompositionPostProcessor ()

@property (nonatomic, assign) BOOL swapImages;
@property (nonatomic, assign) CGSize canvasSize;
@property (nonatomic, strong) NSString *resizeCanvasTo;
@property (nonatomic, strong) IFKTransform *dstTransform;
@property (nonatomic, strong) IFKTransform *srcTransform;

@end

@implementation IFKCompositionPostProcessor

- (nonnull instancetype)initWithName:(nonnull NSString *)name
                              inputs:(nonnull NSDictionary *)inputs
                          canvasSize:(CGSize)canvasSize
{
  if ((self = [super initWithName:name inputs:inputs])) {
    IFKTransform *transform = [[IFKTransform alloc] initWithAnchor:CGPointMake(0.5f, 0.5f)
                                                         translate:CGPointMake(0.5f, 0.5f)
                                                             scale:[[IFKScaleWithMode alloc] initWithMode:COVER]
                                                            rotate:0];

    _swapImages = [[IFKInputConverter convertBoolean:[[self inputs] objectForKey:@"swapImages"]
                                        defaultValue:@(NO)] boolValue];
    _resizeCanvasTo = [IFKInputConverter convertText:[[self inputs] objectForKey:@"resizeCanvasTo"]
                                        defaultValue:nil];
    _dstTransform = [IFKInputConverter convertTransform:[[self inputs] objectForKey:@"dstTransform"]
                                           defaultValue:transform];
    _srcTransform = [IFKInputConverter convertTransform:[[self inputs] objectForKey:@"srcTransform"]
                                           defaultValue:transform];
    _canvasSize = canvasSize;
  }

  return self;
}

+ (CGAffineTransform)imageTransformWithCanvasWidth:(CGFloat)canvasWidth
                                      canvasHeight:(CGFloat)canvasHeight
                                        imageWidth:(CGFloat)bitmapWidth
                                       imageHeight:(CGFloat)bitmapHeight
                                         transform:(IFKTransform *)transform
{
  CGFloat width = 0;
  CGFloat height = 0;

  if ([transform.scale isKindOfClass:[IFKScaleWithMode class]]) {
    IFKScaleMode mode = ((IFKScaleWithMode *)transform.scale).mode;
    CGFloat bitmapAspect = bitmapWidth / bitmapHeight;
    CGFloat canvasAspect = canvasWidth / canvasHeight;

    if (mode == CONTAIN) {
      if (bitmapAspect < canvasAspect) {
        height = canvasHeight;
        width = bitmapWidth * height / bitmapHeight;
      } else {
        width = canvasWidth;
        height = bitmapHeight * width / bitmapWidth;
      }

    } else if (mode == COVER) {
      if (bitmapAspect < canvasAspect) {
        width = canvasWidth;
        height = bitmapHeight * width / bitmapWidth;
      } else {
        height = canvasHeight;
        width = bitmapWidth * height / bitmapHeight;
      }

    } else if (mode == STRETCH) {
      width = canvasWidth;
      height = canvasHeight;
    }

  } else if ([transform.scale isKindOfClass:[IFKScaleWithSize class]]) {
    width = canvasWidth * ((IFKScaleWithSize *) transform.scale).scale.x;
    height = canvasHeight * ((IFKScaleWithSize *) transform.scale).scale.y;
  }

  CGRect f = CGRectMake(canvasWidth * transform.translate.x - width * transform.anchor.x,
                        canvasHeight * transform.translate.y - height * transform.anchor.y,
                        width,
                        height);

  CGAffineTransform t = CGAffineTransformMakeScale(f.size.width / bitmapWidth, f.size.height / bitmapHeight);
  t = CGAffineTransformConcat(t, CGAffineTransformMakeTranslation(-f.size.width * transform.anchor.x, -f.size.height * transform.anchor.y));
  t = CGAffineTransformConcat(t, CGAffineTransformMakeRotation(-transform.rotate));
  t = CGAffineTransformConcat(t, CGAffineTransformMakeTranslation(f.size.width * transform.anchor.x, f.size.height * transform.anchor.y));
  t = CGAffineTransformConcat(t, CGAffineTransformMakeTranslation(f.origin.x, f.origin.y));

  return t;
}

- (nonnull NSString *)dstImageName
{
  static NSArray<NSString *> *dstImageNames;

  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    dstImageNames = @[
      @"inputBackgroundImage",
      @"inputMask",
      @"inputGradientImage",
      @"inputTargetImage",
      @"inputDisplacementImage",
      @"inputTexture",
      @"inputShadingImage"
    ];
  });

  NSArray *inputKeys = [[self filter] inputKeys];

  NSString *name = [dstImageNames reduce:^id(id acc, NSString *val, int idx) {
    return [inputKeys containsObject:val] ? val : acc;
  } init:@""];

  RCTAssert(![name isEqualToString:@""],
            @"ImageFilterKit: unknown filter input - %@",
            [self filter].name);

  return name;
}

- (CGFloat)canvasExtentWithDstExtent:(CGFloat)dstExtent
                           srcExtent:(CGFloat)srcExtent
                       defaultExtent:(CGFloat)defaultExtent
{
  if (_resizeCanvasTo == nil) {
    return defaultExtent;
  }

  if ([@"dstImage" isEqualToString:_resizeCanvasTo]) {
    return dstExtent;
  }

  if ([@"srcImage" isEqualToString:_resizeCanvasTo]) {
    return srcExtent;
  }

  if ([@"MIN" isEqualToString:_resizeCanvasTo]) {
    return MIN(dstExtent, srcExtent);
  }

  if ([@"MAX" isEqualToString:_resizeCanvasTo]) {
    return MAX(dstExtent, srcExtent);
  }

  RCTAssert(false, @"ImageFilterKit: unknown resizeCanvasTo input - %@", _resizeCanvasTo);

  return 0;
}

- (nonnull UIImage *)processFilter:(nonnull UIImage *)image
{
  CIImage *srcImage = [[CIImage alloc] initWithImage:image];
  CIImage *dstImage = ((CIImage *)[self inputs][[self dstImageName]][@"image"]);
  CGRect srcFrame = srcImage.extent;
  CGRect dstFrame = dstImage.extent;

  CGSize outSize = CGSizeMake(
    [self canvasExtentWithDstExtent:dstFrame.size.width
                          srcExtent:srcFrame.size.width
                      defaultExtent:_canvasSize.width],
    [self canvasExtentWithDstExtent:dstFrame.size.height
                          srcExtent:srcFrame.size.height
                      defaultExtent:_canvasSize.height]
  );

  [self initFilter:outSize];

  CGAffineTransform dstTransform = [IFKCompositionPostProcessor
                                    imageTransformWithCanvasWidth:outSize.width
                                    canvasHeight:outSize.height
                                    imageWidth:dstFrame.size.width
                                    imageHeight:dstFrame.size.height
                                    transform:_dstTransform];

  CGAffineTransform srcTransform = [IFKCompositionPostProcessor
                                    imageTransformWithCanvasWidth:outSize.width
                                    canvasHeight:outSize.height
                                    imageWidth:srcFrame.size.width
                                    imageHeight:srcFrame.size.height
                                    transform:_srcTransform];

  [[self filter] setValue:[srcImage imageByApplyingTransform:srcTransform]
                   forKey:_swapImages ? [self dstImageName] : @"inputImage"];

  [[self filter] setValue:[dstImage imageByApplyingTransform:dstTransform]
                   forKey:_swapImages ? @"inputImage" : [self dstImageName]];

  return [self filteredImage:image viewFrame:CGRectMake(0, 0, outSize.width, outSize.height)];
}

@end
