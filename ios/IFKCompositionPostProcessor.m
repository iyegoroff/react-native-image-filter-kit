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
@property (nonatomic, assign) IFKGravityAxis dstGravityAxis;
@property (nonatomic, strong) IFKResize *srcResizeMode;
@property (nonatomic, assign) IFKGravityAxis srcGravityAxis;

@end

@implementation IFKCompositionPostProcessor

- (nonnull instancetype)initWithName:(nonnull NSString *)name inputs:(nonnull NSDictionary *)inputs
{
  if ((self = [super initWithName:name inputs:inputs])) {
    IFKInputConverter *converter = [[IFKInputConverter alloc] initWithWidth:0 height:0];
    
    _scaleMode = [converter convertScale:[[self inputs] objectForKey:@"scaleMode"] defaultValue:UP];
  }
  
  return self;
}

- (CGFloat)outImageExtentWithDstExtent:(CGFloat)dstExtent srcExtent:(CGFloat)srcExtent
{
  if ([_scaleMode isKindOfClass:[IFKScaleWithMode class]]) {
    return ((IFKScaleWithMode *)_scaleMode).mode == UP
      ? MAX(dstExtent, srcExtent)
      : MIN(dstExtent, srcExtent);
    
  } else if ([_scaleMode isKindOfClass:[IFKScaleWithMatch class]]) {
    NSString *match = ((IFKScaleWithMatch *)_scaleMode).match;
    
    if ([@"dstImage" isEqualToString:match]) {
      return dstExtent;
      
    } else if ([@"srcImage" isEqualToString:match]) {
      return srcExtent;
    }
  }
  
  RCTAssert(false, @"ImageFilterKit: invalid scaleMode - %@", _scaleMode);
  
  return 0.0f;
}

+ (CGRect)imageFrameWithCanvasWidth:(CGFloat)canvasWidth
                       canvasHeight:(CGFloat)canvasHeight
                         imageWidth:(CGFloat)bitmapWidth
                        imageHeight:(CGFloat)bitmapHeight
                         resizeMode:(nonnull IFKResize *)resizeMode
                        gravityAxis:(IFKGravityAxis)gravityAxis
{
  CGFloat width = 0;
  CGFloat height = 0;
  CGFloat x = 0;
  CGFloat y = 0;
  
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
  
  if (gravityAxis == CENTER) {
    x = canvasWidth / 2 - width / 2;
    y = canvasHeight / 2 - height / 2;
    
  } else if (gravityAxis == CENTER_LEFT) {
    x = 0;
    y = canvasHeight / 2 - height / 2;
    
  } else if (gravityAxis == CENTER_RIGHT) {
    x = canvasWidth - width;
    y = canvasHeight / 2 - height / 2;
    
  } else if (gravityAxis == CENTER_TOP) {
    x = canvasWidth / 2 - width / 2;
    y = canvasHeight - height;
    
  } else if (gravityAxis == CENTER_BOTTOM) {
    x = canvasWidth / 2 - width / 2;
    y = 0;
    
  } else if (gravityAxis == LEFT_TOP) {
    x = 0;
    y = canvasHeight - height;
    
  } else if (gravityAxis == LEFT_BOTTOM) {
    x = 0;
    y = 0;
    
  } else if (gravityAxis == RIGHT_TOP) {
    x = canvasWidth - width;
    y = canvasHeight - height;
    
  } else if (gravityAxis == RIGHT_BOTTOM) {
    x = canvasWidth - width;
    y = 0;
  }
  
  return CGRectMake(x, y, width, height);
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
  
  RCTAssert(false, @"ImageFilterKit: unknown filter input - %@", [self filter].name);
  
  return @"";
}

- (void)initFilter:(CGSize)size
{
  [super initFilter:size];

  IFKInputConverter *converter = [[IFKInputConverter alloc] initWithWidth:size.width
                                                                   height:size.height];
  
  _dstResizeMode = [converter convertResize:[[self inputs] objectForKey:@"dstResizeMode"]
                               defaultValue:COVER];
  _srcResizeMode = [converter convertResize:[[self inputs] objectForKey:@"srcResizeMode"]
                               defaultValue:COVER];
  _dstGravityAxis = [converter convertGravityAxis:[[self inputs] objectForKey:@"dstGravityAxis"]
                                     defaultValue:CENTER];
  _srcGravityAxis = [converter convertGravityAxis:[[self inputs] objectForKey:@"srcGravityAxis"]
                                     defaultValue:CENTER];
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
    [self outImageExtentWithDstExtent:dstFrame.size.width srcExtent:srcFrame.size.width],
    [self outImageExtentWithDstExtent:dstFrame.size.height srcExtent:srcFrame.size.height]
  );
  
  [self initFilter:outSize];
  
  NSLog(@"post: outExtent %@ -> %@", _scaleMode, [NSValue valueWithCGSize:outSize]);
  
  CGRect dst = [IFKCompositionPostProcessor imageFrameWithCanvasWidth:outSize.width
                                                         canvasHeight:outSize.height
                                                           imageWidth:dstFrame.size.width
                                                          imageHeight:dstFrame.size.height
                                                           resizeMode:_dstResizeMode
                                                          gravityAxis:_dstGravityAxis];
  
  CGRect src = [IFKCompositionPostProcessor imageFrameWithCanvasWidth:outSize.width
                                                         canvasHeight:outSize.height
                                                           imageWidth:srcFrame.size.width
                                                          imageHeight:srcFrame.size.height
                                                           resizeMode:_srcResizeMode
                                                          gravityAxis:_srcGravityAxis];
  
  NSLog(@"post: inputImage %@ -> %@ (%@ + %i)", [NSValue valueWithCGRect:srcFrame], [NSValue valueWithCGRect:src], _srcResizeMode, _srcGravityAxis);
  NSLog(@"post: inputBackgroundImage %@ -> %@ (%@ + %i)", [NSValue valueWithCGRect:dstFrame], [NSValue valueWithCGRect:dst], _dstResizeMode, _dstGravityAxis);
  
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
