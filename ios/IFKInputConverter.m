#import "IFKInputConverter.h"

@implementation IFKInputConverter

+ (nullable NSObject *)convertAny:(nullable NSDictionary *)any bounds:(CGSize)bounds
{
  return [self convertScalar:any defaultValue:(id)[
          self convertColor:any defaultValue:(id)[
          self convertDistance:any bounds:bounds defaultValue:(id)[
          self convertScalarVector:any defaultValue:(id)[
          self convertOffset:any defaultValue:(id)[
          self convertPosition:any bounds:bounds defaultValue:(id)[
          self convertImage:any defaultValue:(id)[
          self convertDistanceVector:any bounds:bounds defaultValue:(id)[
          self convertISOLatin1EncodedText:any defaultValue:(id)[
          self convertArea:any bounds:bounds defaultValue:(id)[
          self convertText:any defaultValue:(id)[
          self convertBoolean:any defaultValue:nil]]]]]]]]]]]];
}

+ (nullable UIImage *)convertImage:(nullable NSDictionary *)image
                      defaultValue:(nullable UIImage *)defaultValue
{
  return image != nil && ![[image objectForKey:@"image"] isKindOfClass:[NSNumber class]]
    ? ([image objectForKey:@"image"] ?: defaultValue)
    : defaultValue;
}

+ (nullable NSNumber *)convertScalar:(nullable NSDictionary *)scalar
                        defaultValue:(nullable NSNumber *)defaultValue
{
  return scalar == nil
    ? defaultValue
    : [scalar objectForKey:@"scalar"]
    ? @([[scalar objectForKey:@"scalar"] floatValue])
    : defaultValue;
}

+ (nullable CIColor *)convertColor:(nullable NSDictionary *)color
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

+ (nullable NSNumber *)convertDistance:(nullable NSDictionary *)distance
                                bounds:(CGSize)bounds
                          defaultValue:(nullable NSNumber *)defaultValue
{
  return distance != nil
    ? [self convertRelative:[distance objectForKey:@"distance"]
                     bounds:bounds
               defaultValue:defaultValue]
    : defaultValue;
}

+ (nonnull IFKResize *)convertResize:(nullable NSDictionary *)resize
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

+ (nullable CIVector *)convertScalarVector:(nullable NSDictionary *)scalarVector
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

+ (nullable CIVector *)convertOffset:(nullable NSDictionary *)offset
                        defaultValue:(nullable CIVector *)defaultValue
{
  if (offset != nil && [offset objectForKey:@"offset"]) {
    NSDictionary *vector = [offset objectForKey:@"offset"];
    
    return [CIVector vectorWithCGPoint:CGPointMake(
      vector[@"x"] ? [vector[@"x"] floatValue] : [defaultValue valueAtIndex:0],
      vector[@"y"] ? [vector[@"y"] floatValue] : [defaultValue valueAtIndex:1]
    )];
  }
  
  return defaultValue;
}

+ (nullable CIVector *)convertPosition:(nullable NSDictionary *)position
                                bounds:(CGSize)bounds
                          defaultValue:(nullable CIVector *)defaultValue
{
  if (position != nil && [position objectForKey:@"position"]) {
    NSDictionary *vector = [position objectForKey:@"position"];
    NSNumber *x = [self convertRelative:vector[@"x"]
                                 bounds:bounds
                           defaultValue:@(defaultValue ? [defaultValue valueAtIndex:0] : 0)];
    NSNumber *y = [self convertRelative:vector[@"y"]
                                 bounds:bounds
                           defaultValue:@(defaultValue ? [defaultValue valueAtIndex:1] : 0)];
    
    return [CIVector vectorWithCGPoint:CGPointMake([x floatValue], [y floatValue])];
  }
  
  return defaultValue;
}

+ (nullable CIVector *)convertDistanceVector:(nullable NSDictionary *)distanceVector
                                      bounds:(CGSize)bounds
                                defaultValue:(nullable CIVector *)defaultValue
{
  if (distanceVector != nil && [distanceVector objectForKey:@"distanceVector"]) {
    NSArray<NSString *> *vector = [distanceVector objectForKey:@"distanceVector"];
    CGFloat v[vector.count];
    
    for (int i = 0; i < vector.count; i++) {
      v[i] = [[self convertRelative:vector[i] bounds:bounds defaultValue:nil] floatValue];
    }
    
    return [CIVector vectorWithValues:v count:vector.count];
  }
  
  return defaultValue;
}

+ (nullable NSData *)convertISOLatin1EncodedText:(nullable NSDictionary *)text
                                    defaultValue:(nullable NSData *)defaultValue
{
  return text == nil
    ? defaultValue
    : [text objectForKey:@"ISOLatin1EncodedText"]
    ? [[text objectForKey:@"ISOLatin1EncodedText"] dataUsingEncoding:NSISOLatin1StringEncoding]
    : defaultValue;
}

+ (nullable CIVector *)convertArea:(nullable NSDictionary *)area
                            bounds:(CGSize)bounds
                      defaultValue:(nullable CIVector *)defaultValue
{
  if (area != nil && [area objectForKey:@"area"]) {
    NSDictionary *vector = [area objectForKey:@"area"];
    NSNumber *x = [self convertRelative:vector[@"x"] bounds:bounds defaultValue:nil];
    NSNumber *y = [self convertRelative:vector[@"y"] bounds:bounds defaultValue:nil];
    NSNumber *width = [self convertRelative:vector[@"width"] bounds:bounds defaultValue:nil];
    NSNumber *height = [self convertRelative:vector[@"height"] bounds:bounds defaultValue:nil];
    
    return [CIVector vectorWithCGRect:CGRectMake([x floatValue],
                                                 [y floatValue],
                                                 [width floatValue],
                                                 [height floatValue])];
  }
  
  return defaultValue;
}

+ (nullable NSString *)convertText:(nullable NSDictionary *)text
                      defaultValue:(nullable NSString *)defaultValue
{
  return text != nil
    ? [text objectForKey:@"text"] ?: defaultValue
    : defaultValue;
}

+ (nullable NSNumber *)convertBoolean:(nullable NSDictionary *)boolean
                         defaultValue:(nullable NSNumber *)defaultValue
{
  return boolean == nil
    ? defaultValue
    : [boolean objectForKey:@"bool"]
    ? @([[boolean objectForKey:@"bool"] boolValue])
    : defaultValue;
}

+ (nullable NSNumber *)convertRelative:(nullable NSString *)relative
                                bounds:(CGSize)bounds
                          defaultValue:(nullable NSNumber *)defaultValue
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
      return @(num * bounds.height * 0.01f);
    }
    
    if ([unit isEqualToString:@"w"]) {
      return @(num * bounds.width * 0.01f);
    }
    
    if ([unit isEqualToString:@"max"]) {
      return @(num * MAX(bounds.width, bounds.height) * 0.01f);
    }
    
    if ([unit isEqualToString:@"min"]) {
      return @(num * MIN(bounds.width, bounds.height) * 0.01f);
    }
  }
  
  return defaultValue;
}

@end
