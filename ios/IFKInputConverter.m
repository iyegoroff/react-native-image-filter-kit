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

- (nonnull IFKResize *)convertResize:(nullable NSDictionary *)resize
                        defaultValue:(IFKResizeMode)defaultValue
{
  static NSDictionary *convert;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    convert = @{
      @"STRETCH": @(STRETCH),
      @"CONTAIN": @(CONTAIN),
      @"COVER": @(COVER),
    };
  });
  
  if (resize != nil && [resize objectForKey:@"resizeMode"]) {
    id resizeMode = [resize objectForKey:@"resizeMode"];
    
    if ([resizeMode isKindOfClass:[NSString class]] && [convert objectForKey:resizeMode]) {
      return [[IFKResizeWithMode alloc] initWithMode:[[convert objectForKey:resizeMode] intValue]];
    }
    
    if ([resizeMode isKindOfClass:[NSDictionary class]]) {
      return [[IFKResizeWithSize alloc] initWithSize:resizeMode];
    }
  }
  
  return [[IFKResizeWithMode alloc] initWithMode:defaultValue];
}

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

- (nonnull IFKScale *)convertScale:(nullable NSDictionary *)scale
                      defaultValue:(IFKScaleMode)defaultValue
{
  static NSDictionary *convert;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    convert = @{
      @"UP": @(UP),
      @"DOWN": @(DOWN),
    };
  });
  
  if (scale != nil && [scale objectForKey:@"scaleMode"]) {
    id scaleMode = [scale objectForKey:@"scaleMode"];
    
    if ([scaleMode isKindOfClass:[NSString class]] && [convert objectForKey:scaleMode] != nil) {
      return [[IFKScaleWithMode alloc] initWithMode:[[convert objectForKey:scaleMode] intValue]];
    }
    
    if ([scaleMode isKindOfClass:[NSDictionary class]]) {
      NSString *match = [(NSDictionary *)scaleMode objectForKey:@"match"];
      
      return [[IFKScaleWithMatch alloc] initWithMatch:match];
    }
  }
  
  return [[IFKScaleWithMode alloc] initWithMode:defaultValue];
}

- (IFKGravityAxis)convertGravityAxis:(nullable NSDictionary *)gravityAxis
                        defaultValue:(IFKGravityAxis)defaultValue
{
  static NSDictionary *convert;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    convert = @{
      @"CENTER": @(CENTER),
      @"CENTER_LEFT": @(CENTER_LEFT),
      @"CENTER_RIGHT": @(CENTER_RIGHT),
      @"CENTER_TOP": @(CENTER_TOP),
      @"CENTER_BOTTOM": @(CENTER_BOTTOM),
      @"LEFT_TOP": @(LEFT_TOP),
      @"LEFT_BOTTOM": @(LEFT_BOTTOM),
      @"RIGHT_TOP": @(RIGHT_TOP),
      @"RIGHT_BOTTOM": @(RIGHT_BOTTOM)
    };
  });
  
  if (gravityAxis != nil && [gravityAxis objectForKey:@"gravityAxis"]) {
    NSNumber *value = [convert objectForKey:[gravityAxis objectForKey:@"gravityAxis"]];
    
    return value != nil ? [value intValue] : defaultValue;
  }
  
  return defaultValue;
}

- (nullable CIVector *)convertOffset:(nullable NSDictionary *)offset
                        defaultValue:(nullable CIVector *)defaultValue
{
  if (offset != nil && [offset objectForKey:@"offset"]) {
    NSDictionary *vector = [offset objectForKey:@"offset"];
    
    return [CIVector vectorWithCGPoint:CGPointMake([vector[@"x"] floatValue],
                                                   [vector[@"y"] floatValue])];
  }
  
  return defaultValue;
}

- (nullable CIVector *)convertPosition:(nullable NSDictionary *)position
                          defaultValue:(nullable CIVector *)defaultValue
{
  if (position != nil && [position objectForKey:@"position"]) {
    NSDictionary *vector = [position objectForKey:@"position"];
    NSNumber *x = [self convertRelative:vector[@"x"] defaultValue:nil];
    NSNumber *y = [self convertRelative:vector[@"y"] defaultValue:nil];
    
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
