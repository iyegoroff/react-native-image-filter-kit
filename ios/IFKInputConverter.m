#import "IFKInputConverter.h"

@interface IFKInputConverter ()

@property (nonatomic, assign) CGFloat boundsWidth;
@property (nonatomic, assign) CGFloat boundsHeight;

@end

@implementation IFKInputConverter

- (nonnull instancetype)initWithWidth:(CGFloat)boundsWidth height:(CGFloat)boundsHeight
{
  if ((self = [super init])) {
    _boundsWidth = boundsWidth;
    _boundsHeight = boundsHeight;
  }

  return self;
}

- (nullable NSObject *)convertAny:(nullable NSDictionary *)any
{
  return [self convertScalar:any defaultValue:(id)[
          self convertColor:any defaultValue:(id)[
          self convertDistance:any defaultValue:(id)[
          self convertScalarVector:any defaultValue:(id)[
          self convertOffset:any defaultValue:(id)[
          self convertPosition:any defaultValue:(id)[
          self convertImage:any defaultValue:nil]]]]]]];
}

- (nullable UIImage *)convertImage:(nullable NSDictionary *)image
                      defaultValue:(nullable UIImage *)defaultValue
{
  return image != nil && ![[image objectForKey:@"image"] isKindOfClass:[NSNumber class]]
    ? ([image objectForKey:@"image"] ?: defaultValue)
    : defaultValue;
}

- (nullable NSNumber *)convertScalar:(nullable NSDictionary *)scalar
                        defaultValue:(nullable NSNumber *)defaultValue
{
  return scalar != nil
    ? ([scalar objectForKey:@"scalar"] ?: defaultValue)
    : defaultValue;
}

- (nullable CIColor *)convertColor:(nullable NSDictionary *)color
                      defaultValue:(nullable CIColor *)defaultValue
{
  if (color != nil && [color objectForKey:@"color"]) {
    NSUInteger value = [((NSNumber *)[color objectForKey:@"color"]) unsignedIntegerValue];
    CGFloat alpha = ((value >> 24) & 0xFF) / 255.0;
    CGFloat red = ((value >> 16) & 0xFF) / 255.0;
    CGFloat green = ((value >> 8) & 0xFF) / 255.0;
    CGFloat blue = (value & 0xFF) / 255.0;
    
    return [CIColor colorWithRed:red green:green blue:blue alpha:alpha];
  }
  
  return defaultValue;
}

- (nullable NSNumber *)convertDistance:(nullable NSDictionary *)distance
                          defaultValue:(nullable NSNumber *)defaultValue
{
  return distance != nil
    ? [self convertRelative:[distance objectForKey:@"distance"] defaultValue:defaultValue]
    : defaultValue;
}

//- (nonnull IFKResize *)convertResize:(nullable NSDictionary *)resize
//                        defaultValue:(IFKResizeMode)defaultValue
//{
//
//}

- (nullable CIVector *)convertScalarVector:(nullable NSDictionary *)scalarVector
                              defaultValue:(nullable CIVector *)defaultValue
{
  if (scalarVector != nil && [scalarVector objectForKey:@"scalarVector"]) {
    NSArray<NSNumber *> *vector = [scalarVector objectForKey:@"scalarVector"];
    CGFloat v[vector.count];
    
    for (int i = 0; i < vector.count; i++) {
      v[i] = [vector[i] floatValue];
    }
    
    return [CIVector vectorWithValues:v count:vector.count];
  }
  
  return defaultValue;
}

//- (nonnull IFKScale *)convertScale:(nullable NSDictionary *)scale
//                      defaultValue:(IFKScaleMode)defaultValue
//{
//
//}

//- (IFKGravityAxis)convertGravityAxis:(nullable NSDictionary *)gravityAxis
//                        defaultValue:(IFKGravityAxis)defaultValue
//{
//
//}

- (nullable CIVector *)convertOffset:(nullable NSDictionary *)offset
                        defaultValue:(nullable CIVector *)defaultValue
{
  if (offset != nil && [offset objectForKey:@"offset"]) {
    NSArray<NSNumber *> *vector = [offset objectForKey:@"offset"];
    
    return [CIVector vectorWithCGPoint:CGPointMake([vector[0] floatValue], [vector[1] floatValue])];
  }
  
  return defaultValue;
}

- (nullable CIVector *)convertPosition:(nullable NSDictionary *)position
                          defaultValue:(nullable CIVector *)defaultValue
{
  if (position != nil && [position objectForKey:@"position"]) {
    NSArray<NSString *> *vector = [position objectForKey:@"position"];
    NSNumber *x = [self convertRelative:vector[0] defaultValue:nil];
    NSNumber *y = [self convertRelative:vector[1] defaultValue:nil];
    
    return [CIVector vectorWithCGPoint:CGPointMake([x floatValue], [y floatValue])];
  }
  
  return defaultValue;
}

- (nullable NSNumber *)convertRelative:(nullable NSString *)relative
                          defaultValue:(nullable NSNumber *)defaultValue;
{
  if (relative != nil) {
    double num;
    NSScanner *scanner = [NSScanner scannerWithString:relative];
    
    [scanner scanDouble:&num];
    NSString *unit = [relative substringFromIndex:[scanner scanLocation]];
    
    if ([unit isEqualToString:@""]) {
      return @(num);
    }
    
    if ([unit isEqualToString:@"h"]) {
      return @(num * _boundsHeight * 0.01f);
    }
    
    if ([unit isEqualToString:@"w"]) {
      return @(num * _boundsWidth * 0.01f);
    }
    
    if ([unit isEqualToString:@"max"]) {
      return @(num * MAX(_boundsWidth, _boundsHeight) * 0.01f);
    }
    
    if ([unit isEqualToString:@"min"]) {
      return @(num * MIN(_boundsWidth, _boundsHeight) * 0.01f);
    }
  }
  
  return defaultValue;
}

@end
