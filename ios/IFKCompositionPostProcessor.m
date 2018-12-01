#import "IFKInputConverter.h"
#import "IFKCompositionPostProcessor.h"

@interface IFKPostProcessor ()

- (nonnull UIImage *)filteredImageWithScale:(CGFloat)scale
                                 resizeMode:(RCTResizeMode)resizeMode
                                  viewFrame:(CGRect)viewFrame
                                   destSize:(CGSize)destSize;
- (nonnull CIFilter *)filter;
- (void)initFilter:(CGSize)size;
- (nonnull NSDictionary*)inputs;

@end

@interface IFKCompositionPostProcessor ()

@property (nonatomic, strong) IFKScale *scaleMode;
@property (nonatomic, strong) IFKResize *dstResizeMode;
@property (nonatomic, assign) CGPoint dstAnchor;
@property (nonatomic, assign) CGPoint dstPosition;
@property (nonatomic, strong) IFKResize *srcResizeMode;
@property (nonatomic, assign) CGPoint srcAnchor;
@property (nonatomic, assign) CGPoint srcPosition;

@end

@implementation IFKCompositionPostProcessor

- (nonnull instancetype)initWithName:(nonnull NSString *)name inputs:(nonnull NSDictionary *)inputs
{
  if ((self = [super initWithName:name inputs:inputs])) {
    CIVector *center = [CIVector vectorWithCGPoint:CGPointMake(0.5f, 0.5f)];

    _scaleMode = [IFKInputConverter convertScale:[[self inputs] objectForKey:@"scaleMode"]
                                    defaultValue:UP];
    _dstResizeMode = [IFKInputConverter convertResize:[[self inputs] objectForKey:@"dstResizeMode"]
                                         defaultValue:COVER];
    _srcResizeMode = [IFKInputConverter convertResize:[[self inputs] objectForKey:@"srcResizeMode"]
                                         defaultValue:COVER];
    _dstAnchor = [[IFKInputConverter convertOffset:[[self inputs] objectForKey:@"dstAnchor"]
                                      defaultValue:center] CGPointValue];
    _srcAnchor = [[IFKInputConverter convertOffset:[[self inputs] objectForKey:@"srcAnchor"]
                                      defaultValue:center] CGPointValue];
    _dstPosition = [[IFKInputConverter convertOffset:[[self inputs] objectForKey:@"dstPosition"]
                                        defaultValue:center] CGPointValue];
    _srcPosition = [[IFKInputConverter convertOffset:[[self inputs] objectForKey:@"srcPosition"]
                                        defaultValue:center] CGPointValue];
  }
  
  return self;
}

+ (CGFloat)outImageExtentWithScaleMode:(IFKScale *)scaleMode
                             dstExtent:(CGFloat)dstExtent
                             srcExtent:(CGFloat)srcExtent
{
  if ([scaleMode isKindOfClass:[IFKScaleWithMode class]]) {
    return ((IFKScaleWithMode *)scaleMode).mode == UP
      ? MAX(dstExtent, srcExtent)
      : MIN(dstExtent, srcExtent);
    
  } else if ([scaleMode isKindOfClass:[IFKScaleWithMatch class]]) {
    NSString *match = ((IFKScaleWithMatch *)scaleMode).match;
    
    if ([@"dstImage" isEqualToString:match]) {
      return dstExtent;
      
    } else if ([@"srcImage" isEqualToString:match]) {
      return srcExtent;
    }
  }
  
  RCTAssert(false, @"ImageFilterKit: invalid scaleMode - %@", scaleMode);
  
  return 0.0f;
}

+ (CGRect)imageFrameWithCanvasWidth:(CGFloat)canvasWidth
                       canvasHeight:(CGFloat)canvasHeight
                         imageWidth:(CGFloat)bitmapWidth
                        imageHeight:(CGFloat)bitmapHeight
                         resizeMode:(nonnull IFKResize *)resizeMode
                             anchor:(CGPoint)anchor
                           position:(CGPoint)position
{
  CGFloat width = 0;
  CGFloat height = 0;
  
  if ([resizeMode isKindOfClass:[IFKResizeWithMode class]]) {
    IFKResizeMode mode = ((IFKResizeWithMode *)resizeMode).mode;
    
    if (mode == COVER) {
      if (bitmapWidth > bitmapHeight) {
        height = canvasHeight;
        width = bitmapWidth * height / bitmapHeight;
      } else {
        width = canvasWidth;
        height = bitmapHeight * width / bitmapWidth;
      }
    } else if (mode == CONTAIN) {
      if (bitmapWidth > bitmapHeight) {
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
    
  } else if ([resizeMode isKindOfClass:[IFKResizeWithSize class]]) {
    NSNumber *resizeWidth = ((IFKResizeWithSize *) resizeMode).width;
    NSNumber *resizeHeight = ((IFKResizeWithSize *) resizeMode).height;
    
    if (resizeHeight != nil && resizeWidth != nil) {
      width = canvasWidth * [resizeWidth floatValue];
      height = canvasHeight * [resizeHeight floatValue];
      
    } else if (resizeHeight == nil && resizeWidth == nil) {
      width = canvasWidth;
      height = canvasHeight;
      
    } else if (resizeHeight == nil) {
      width = canvasWidth * [resizeWidth floatValue];
      height = bitmapHeight * width / bitmapWidth;
      
    } else {
      height = canvasHeight * [resizeHeight floatValue];
      width = bitmapWidth * height / bitmapHeight;
    }
  }
  
  return CGRectMake(canvasWidth * position.x - width * anchor.x,
                    canvasHeight * position.y - height * anchor.y,
                    width,
                    height);
}

- (nonnull NSString *)dstImageName
{
  NSArray *inputKeys = [[self filter] inputKeys];
                        
  if ([inputKeys containsObject:@"inputBackgroundImage"]) {
    return @"inputBackgroundImage";
  }
  
  if ([inputKeys containsObject:@"inputMask"]) {
    return @"inputMask";
  }
  
  if ([inputKeys containsObject:@"inputGradientImage"]) {
    return @"inputGradientImage";
  }
  
  if ([inputKeys containsObject:@"inputTargetImage"]) {
    return @"inputTargetImage";
  }
  
  RCTAssert(false, @"ImageFilterKit: unknown filter input - %@", [self filter].name);
  
  return @"";
}

- (nonnull UIImage *)processFilter:(nonnull UIImage *)image resizeMode:(RCTResizeMode)resizeMode
{
  //  BOOL isSlow = arc4random() % 2 == 0;
  //  NSLog(@"filter: %@", isSlow ? @"slow" : @"fast");
  //  if (isSlow) {
  //    [NSThread sleepForTimeInterval:5];
  //  }
  CIImage *srcImage = [[CIImage alloc] initWithImage:image];
  CIImage *dstImage = ((CIImage *)[self inputs][[self dstImageName]][@"image"]);
  CGRect srcFrame = srcImage.extent;
  CGRect dstFrame = dstImage.extent;
  
  CGSize outSize = CGSizeMake(
    [IFKCompositionPostProcessor outImageExtentWithScaleMode:_scaleMode
                                                   dstExtent:dstFrame.size.width
                                                   srcExtent:srcFrame.size.width],
    [IFKCompositionPostProcessor outImageExtentWithScaleMode:_scaleMode
                                                   dstExtent:dstFrame.size.height
                                                   srcExtent:srcFrame.size.height]
  );
  
  [self initFilter:outSize];
  
  NSLog(@"post: outExtent %@ -> %@", _scaleMode, [NSValue valueWithCGSize:outSize]);
  
  CGRect dst = [IFKCompositionPostProcessor imageFrameWithCanvasWidth:outSize.width
                                                         canvasHeight:outSize.height
                                                           imageWidth:dstFrame.size.width
                                                          imageHeight:dstFrame.size.height
                                                           resizeMode:_dstResizeMode
                                                               anchor:_dstAnchor
                                                             position:_dstPosition];
  
  CGRect src = [IFKCompositionPostProcessor imageFrameWithCanvasWidth:outSize.width
                                                         canvasHeight:outSize.height
                                                           imageWidth:srcFrame.size.width
                                                          imageHeight:srcFrame.size.height
                                                           resizeMode:_srcResizeMode
                                                               anchor:_srcAnchor
                                                             position:_srcPosition];
  
  NSLog(@"IFK: DST %@ %f %f", [NSValue valueWithCGRect:dst], dstFrame.size.width, dstFrame.size.height);
  NSLog(@"IFK: SRC %@ %f %f", [NSValue valueWithCGRect:src], srcFrame.size.width, srcFrame.size.height);
  
  NSLog(@"IFK: DST {%f, %f, %@}; SRC {%f, %f, %@}; Canvas {%f, %f}",
        dstFrame.size.width, dstFrame.size.height, _dstResizeMode,
        srcFrame.size.width, srcFrame.size.height, _srcResizeMode,
        outSize.width, outSize.height);
  
  NSLog(@"post: inputImage %@ -> %@", [NSValue valueWithCGRect:srcFrame], [NSValue valueWithCGRect:src]);
  NSLog(@"post: inputBackgroundImage %@ -> %@", [NSValue valueWithCGRect:dstFrame], [NSValue valueWithCGRect:dst]);
  
  CGAffineTransform srcTransform = CGAffineTransformMake(src.size.width / srcFrame.size.width,
                                                         0,
                                                         0,
                                                         src.size.height / srcFrame.size.height,
                                                         src.origin.x,
                                                         src.origin.y);
  
  CGAffineTransform dstTransform = CGAffineTransformMake(dst.size.width / dstFrame.size.width,
                                                         0,
                                                         0,
                                                         dst.size.height / dstFrame.size.height,
                                                         dst.origin.x,
                                                         dst.origin.y);
  
  [[self filter] setValue:[srcImage imageByApplyingTransform:srcTransform]
                   forKey:@"inputImage"];
  
  [[self filter] setValue:[dstImage imageByApplyingTransform:dstTransform]
                   forKey:[self dstImageName]];
  
  return [self filteredImageWithScale:image.scale
                           resizeMode:resizeMode
                            viewFrame:CGRectMake(0, 0, outSize.width, outSize.height)
                             destSize:image.size];
}

@end