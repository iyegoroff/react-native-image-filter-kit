#import <Foundation/Foundation.h>
#import "RNImageMatrixFilter.h"

static CIContext* context;

@interface RNImageMatrixFilter ()

@property (nonatomic, strong) NSMapTable<UIView *, CIImage *> *originalImages;
@property (nonatomic, strong) CIFilter* filter;

- (void)drawImages:(CIFilter* )filter;

@end

@implementation RNImageMatrixFilter

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
//      CFAbsoluteTime start = CFAbsoluteTimeGetCurrent();
      // use metal context if supported ?
      EAGLContext *eaglContext = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES3];
      eaglContext = eaglContext ?: [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2];
      
      context = [CIContext contextWithEAGLContext:eaglContext
                                          options:@{kCIImageColorSpace: [NSNull null],
                                                    kCIImageProperties: [NSNull null],
                                                    kCIContextWorkingColorSpace: [NSNull null]}];
//      NSLog(@"filter: context %f", CFAbsoluteTimeGetCurrent() - start);
    });
    
    _originalImages = [NSMapTable weakToStrongObjectsMapTable];
    _filter = [CIFilter filterWithName:@"CIColorMatrix"];
  }
  
  return self;
}

- (void)dealloc
{
  for (UIView *child in self.subviews) {
    if ([child isKindOfClass:[UIImageView class]]) {
      [child removeObserver:self forKeyPath:@"image"];
    }
  }
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  
  for (UIView *child in self.subviews) {
    if ([child isKindOfClass:[UIImageView class]]) {
      [child addObserver:self forKeyPath:@"image" options:NSKeyValueObservingOptionNew context:NULL];
    }
  }
}

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary *)change
                       context:(void *)context {
  if ([keyPath isEqualToString:@"image"]) {
    [_originalImages removeObjectForKey:object];
    [self drawImages: [_filter copy]];
  }
}

- (void)setMatrix:(NSArray<NSNumber *> *)matrix
{
//  NSLog(@"filter: %i", [matrix isEqualToArray:_matrix]);
//  CFAbsoluteTime start = CFAbsoluteTimeGetCurrent();
  _matrix = matrix;

  CGFloat m[20] = {
    [_matrix[0] floatValue], [_matrix[1] floatValue], [_matrix[2] floatValue], [_matrix[3] floatValue],
    [_matrix[5] floatValue], [_matrix[6] floatValue], [_matrix[7] floatValue], [_matrix[8] floatValue],
    [_matrix[10] floatValue], [_matrix[11] floatValue], [_matrix[12] floatValue], [_matrix[13] floatValue],
    [_matrix[15] floatValue], [_matrix[16] floatValue], [_matrix[17] floatValue], [_matrix[18] floatValue],
    [_matrix[4] floatValue], [_matrix[9] floatValue], [_matrix[14] floatValue], [_matrix[19] floatValue]
  };
  
  [_filter setValue:[CIVector vectorWithValues:&m[0] count:4] forKey:@"inputRVector"];
  [_filter setValue:[CIVector vectorWithValues:&m[4] count:4] forKey:@"inputGVector"];
  [_filter setValue:[CIVector vectorWithValues:&m[8] count:4] forKey:@"inputBVector"];
  [_filter setValue:[CIVector vectorWithValues:&m[12] count:4] forKey:@"inputAVector"];
  [_filter setValue:[CIVector vectorWithValues:&m[16] count:4] forKey:@"inputBiasVector"];
  
//  NSLog(@"filter: setMatrix %f", CFAbsoluteTimeGetCurrent() - start);
  
  [self drawImages: [_filter copy]];
}

- (void)drawImages:(CIFilter *)filter {
//  CFAbsoluteTime start = CFAbsoluteTimeGetCurrent();
  
  for (UIImageView *child in self.subviews) {
    if ([child isKindOfClass:[UIImageView class]]) {
      
      CIImage* originalImage = [_originalImages objectForKey:child];
      CIImage* image = originalImage ? originalImage : [[CIImage alloc] initWithImage:child.image];
      
      [_originalImages setObject:image forKey:child];
      
      [filter setValue:image forKey:@"inputImage"];
      
      CGImageRef cgim = [context createCGImage:filter.outputImage
                                      fromRect:filter.outputImage.extent];
      
      UIImage *newImage = [UIImage imageWithCGImage:cgim];
      
      [child removeObserver:self forKeyPath:@"image"];
      [child setImage:newImage];
      [child addObserver:self forKeyPath:@"image" options:NSKeyValueObservingOptionNew context:NULL];

      CGImageRelease(cgim);
    }
  }
  
//  NSLog(@"filter: draw %f", CFAbsoluteTimeGetCurrent() - start);
}

@end

