#import "IFKOutputExtentHandler.h"
#import <React/RCTLog.h>

#define rotatedSize(size, angle) ( \
  CGSizeMake(size.height * fabsf(sinf(angle)) + size.width * fabsf(cosf(angle)), \
             size.width * fabsf(sinf(angle)) + size.height * fabsf(cosf(angle))))

#define rotatedPoint(center, point, angle) ( \
  CGPointMake(center.x + (point.x - center.x) * (cosf(angle)) - (point.y - center.y) * (sinf(angle)), \
              center.y + (point.x - center.x) * (sinf(angle)) + (point.y - center.y) * (cosf(angle))))


@implementation IFKOutputExtentHandler

+ (CGRect)resizedRect:(nonnull CIFilter *)filter
          inputExtent:(CGRect)inputExtent
             destSize:(CGSize)destSize
{
  CGRect resized = filter.outputImage.extent;
  
  if (CGRectEqualToRect(resized, CGRectInfinite)) {
    if ([@"CIOpTile" isEqualToString:filter.name]) {
      CGFloat scale = [[filter valueForKey:@"inputScale"] floatValue];
      CGFloat width = [[filter valueForKey:@"inputWidth"] floatValue];
      CGPoint center = [[filter valueForKey:@"inputCenter"] CGPointValue];
      CGFloat angle = [[filter valueForKey:@"inputAngle"] floatValue];
      
      CGSize size = CGSizeMake((inputExtent.size.width + width) * scale - width,
                               (inputExtent.size.height + width) * scale - width);
      CGSize rotatedSize = rotatedSize(size, angle);
      
      CGPoint point = CGPointMake((-center.x * scale + center.x) + (-width * scale + width),
                                  (-center.y * scale + center.y) + (-width * scale + width));
      
      CGPoint rotatedPoint = rotatedPoint(CGPointMake(center.x - size.width / 2,
                                                      center.y - size.height / 2), point, angle);
      
      resized = CGRectMake(rotatedPoint.x - (rotatedSize.width - size.width) / 2,
                           rotatedPoint.y - (rotatedSize.height - size.height) / 2,
                           rotatedSize.width,
                           rotatedSize.height);
    }
  }
  
  return resized;
}

@end
