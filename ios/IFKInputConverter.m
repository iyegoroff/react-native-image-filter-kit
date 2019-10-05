#import "IFKInputConverter.h"
#import "NSArray+FilterMapReduce.h"
#import <React/RCTAssert.h>

typedef enum {
  CLAMP = 0,
  SMOOTH = 1
} IFKMixStep;

static NSString *pattern = @"(-?\\d+(?:\\.\\d+)?(?:h|w|min|max)?)(?:\\s*([-+])\\s*(-?\\d+(?:\\.\\d+)?(?:h|w|min|max)?))?(?:\\s*([-+])\\s*(-?\\d+(?:\\.\\d+)?(?:h|w|min|max)?))?";

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
          self convertBoolean:any defaultValue:(id)[
          self convertColorVector:any defaultValue:(id)[
          self convertPath:any bounds:bounds defaultValue:(id)[
          self convertAngle:any defaultValue:(id)[
          self convertMixStep:any defaultValue:nil]]]]]]]]]]]]]]]];
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

+ (nullable NSNumber *)convertAngle:(nullable NSDictionary *)angle
                       defaultValue:(nullable NSNumber *)defaultValue
{
  return [self extractAngle:angle != nil ? [angle objectForKey:@"angle"] : nil
               defaultValue:defaultValue];
}

+ (nullable NSNumber *)extractAngle:(nullable NSObject *)angle
                       defaultValue:(nullable NSNumber *)defaultValue
{
  if ([angle isKindOfClass:[NSNumber class]]) {
    return (NSNumber *)angle;
  }
  
  if ([angle isKindOfClass:[NSString class]]) {
    double ang;
    NSScanner *scanner = [NSScanner scannerWithString:(NSString *)angle];
    
    [scanner scanDouble:&ang];
    NSString *unit = [(NSString *)angle substringFromIndex:[scanner scanLocation]];
    
    if ([unit isEqualToString:@"deg"]) {
      return @(M_PI * ang / 180.0f);
    }
    
    if ([unit isEqualToString:@"rad"]) {
      return @(ang);
    }
    
    return @(ang);
  }
  
  return defaultValue;
}

+ (nullable CIColor *)convertColor:(nullable NSDictionary *)color
                      defaultValue:(nullable CIColor *)defaultValue
{
  if (color != nil && [color objectForKey:@"color"]) {
    return [self color:[((NSNumber *)[color objectForKey:@"color"]) unsignedIntegerValue]];
  }
  
  return defaultValue;
}

+ (nullable NSNumber *)convertDistance:(nullable NSDictionary *)distance
                                bounds:(CGSize)bounds
                          defaultValue:(nullable NSNumber *)defaultValue
{
  return distance != nil
    ? [self convertRelativeExpr:[distance objectForKey:@"distance"]
                     bounds:bounds
               defaultValue:defaultValue]
    : defaultValue;
}

+ (nonnull IFKScale *)convertScale:(nullable NSDictionary *)scale
                       defaultMode:(IFKScaleMode)defaultMode
                      defaultScale:(CGPoint)defaultScale
{
  return [self extractScale:scale != nil ? [scale objectForKey:@"scale"] : nil
                defaultMode:defaultMode
               defaultScale:defaultScale];
}

+ (nonnull IFKScale *)extractScale:(nullable NSObject *)scale
                       defaultMode:(IFKScaleMode)defaultMode
                      defaultScale:(CGPoint)defaultScale
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
  
  if ([scale isKindOfClass:[NSString class]] && [convert objectForKey:(NSString *)scale]) {
    return [[IFKScaleWithMode alloc] initWithMode:[[convert objectForKey:(NSString *)scale] intValue]];
  }
  
  if ([scale isKindOfClass:[NSDictionary class]]) {
    NSDictionary *scaleSize = (NSDictionary *)scale;
    
    CGFloat x = [scaleSize objectForKey:@"x"] != nil
      ? [[scaleSize objectForKey:@"x"] floatValue]
      : defaultScale.x;
    CGFloat y = [scaleSize objectForKey:@"y"] != nil
      ? [[scaleSize objectForKey:@"y"] floatValue]
      : defaultScale.y;
    
    return [[IFKScaleWithSize alloc] initWithX:x andY:y];
  }
  
  return [[IFKScaleWithMode alloc] initWithMode:defaultMode];
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

+ (nullable NSArray<CIColor *> *)convertColorVector:(nullable NSDictionary *)colorVector
                                       defaultValue:(nullable NSArray<CIColor *> *)defaultValue
{
  if (colorVector != nil && [colorVector objectForKey:@"colorVector"]) {
    return [[colorVector objectForKey:@"colorVector"] map:^id(NSNumber *val, int idx) {
      return [self color:[val unsignedIntegerValue]];
    }];
  }
  
  return defaultValue;
}

+ (nullable CIVector *)convertOffset:(nullable NSDictionary *)offset
                        defaultValue:(nullable CIVector *)defaultValue
{
  return [self extractOffset:offset != nil ? [offset objectForKey:@"offset"] : nil
                defaultValue:defaultValue];
}

+ (nullable CIVector *)extractOffset:(nullable NSDictionary *)offset
                        defaultValue:(nullable CIVector *)defaultValue
{
  return offset != nil
    ? [CIVector vectorWithCGPoint:CGPointMake(
        offset[@"x"] ? [offset[@"x"] floatValue] : [defaultValue valueAtIndex:0],
        offset[@"y"] ? [offset[@"y"] floatValue] : [defaultValue valueAtIndex:1]
      )]
    : defaultValue;
}

+ (nullable CIVector *)convertPosition:(nullable NSDictionary *)position
                                bounds:(CGSize)bounds
                          defaultValue:(nullable CIVector *)defaultValue
{
  if (position != nil && [position objectForKey:@"position"]) {
    NSDictionary *vector = [position objectForKey:@"position"];
    NSNumber *x = [self convertRelativeExpr:vector[@"x"]
                                 bounds:bounds
                           defaultValue:@(defaultValue ? [defaultValue valueAtIndex:0] : 0)];
    NSNumber *y = [self convertRelativeExpr:vector[@"y"]
                                 bounds:bounds
                           defaultValue:@(defaultValue ? [defaultValue valueAtIndex:1] : 0)];
    
    return [CIVector vectorWithCGPoint:CGPointMake([x floatValue], [y floatValue])];
  }
  
  return defaultValue;
}

+ (nullable UIBezierPath *)convertPath:(nullable NSDictionary *)path
                                bounds:(CGSize)bounds
                          defaultValue:(nullable UIBezierPath *)defaultValue
{
  NSArray *steps = path != nil ? [path objectForKey:@"path"] : nil;
  
  if (steps == nil) {
    return defaultValue;
  }
  
  UIBezierPath *p = [UIBezierPath bezierPath];
  
  [p moveToPoint:CGPointZero];
  
  for (NSDictionary *step in steps) {
    NSArray *args;
    
    if ([step objectForKey:@"moveTo"]) {
      args = [self convertPathStep:step name:@"moveTo" bounds:bounds];
      
      [p moveToPoint:CGPointMake([args[0] floatValue], [args[1] floatValue])];
      
    } else if ([step objectForKey:@"lineTo"]) {
      args = [self convertPathStep:step name:@"lineTo" bounds:bounds];
      
      [p addLineToPoint:CGPointMake([args[0] floatValue], [args[1] floatValue])];
      
    } else if ([step objectForKey:@"quadTo"]) {
      args = [self convertPathStep:step name:@"quadTo" bounds:bounds];
      
      [p addQuadCurveToPoint:CGPointMake([args[2] floatValue], [args[3] floatValue])
                controlPoint:CGPointMake([args[0] floatValue], [args[1] floatValue])];

    } else if ([step objectForKey:@"cubicTo"]) {
      args = [self convertPathStep:step name:@"cubicTo" bounds:bounds];
      
      [p addCurveToPoint:CGPointMake([args[4] floatValue], [args[5] floatValue])
           controlPoint1:CGPointMake([args[0] floatValue], [args[1] floatValue])
           controlPoint2:CGPointMake([args[2] floatValue], [args[3] floatValue])];

    } else if ([step objectForKey:@"closePath"]) {
      [p closePath];
    }
  }
  
  [p closePath];
  
  return p;
}

+ (NSArray<NSNumber *> *)convertPathStep:(nonnull NSDictionary *)step
                                    name:(nonnull NSString *)name
                                  bounds:(CGSize)bounds
{
  return [[step objectForKey:name] map:^id(id val, int idx) {
    return [self convertRelativeExpr:val bounds:bounds defaultValue:@(0)];
  }];
}

+ (nullable CIVector *)convertDistanceVector:(nullable NSDictionary *)distanceVector
                                      bounds:(CGSize)bounds
                                defaultValue:(nullable CIVector *)defaultValue
{
  if (distanceVector != nil && [distanceVector objectForKey:@"distanceVector"]) {
    NSArray<NSString *> *vector = [distanceVector objectForKey:@"distanceVector"];
    CGFloat v[vector.count];
    
    for (int i = 0; i < vector.count; i++) {
      v[i] = [[self convertRelativeExpr:vector[i] bounds:bounds defaultValue:nil] floatValue];
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
    NSNumber *x = [self convertRelativeExpr:vector[@"x"] bounds:bounds defaultValue:nil];
    NSNumber *y = [self convertRelativeExpr:vector[@"y"] bounds:bounds defaultValue:nil];
    NSNumber *width = [self convertRelativeExpr:vector[@"width"] bounds:bounds defaultValue:nil];
    NSNumber *height = [self convertRelativeExpr:vector[@"height"] bounds:bounds defaultValue:nil];
    
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

+ (nullable NSNumber *)convertMixStep:(nullable NSDictionary *)mixStep
                         defaultValue:(nullable NSNumber *)defaultValue
{
  return mixStep == nil
    ? defaultValue
    : [@"SMOOTH" isEqualToString:[mixStep objectForKey:@"mixStep"]]
    ? @(SMOOTH)
    : [@"CLAMP" isEqualToString:[mixStep objectForKey:@"mixStep"]]
    ? @(CLAMP)
    : defaultValue;
}

+ (nullable NSNumber *)convertRelativeExpr:(nullable NSString *)relative
                                    bounds:(CGSize)bounds
                              defaultValue:(nullable NSNumber *)defaultValue
{
  if (relative != nil) {
    NSError *error = NULL;
    NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:pattern
                                                                           options:NSRegularExpressionCaseInsensitive
                                                                             error:&error];
    NSTextCheckingResult *match = [regex firstMatchInString:relative
                                                    options:0
                                                      range:NSMakeRange(0, [relative length])];
    if (match) {
      NSRange firstRange = [match rangeAtIndex:1];
      NSRange firstOperationRange = [match rangeAtIndex:2];
      NSRange secondRange = [match rangeAtIndex:3];
      NSRange secondOperationRange = [match rangeAtIndex:4];
      NSRange thirdRange = [match rangeAtIndex:5];
      
      NSNumber *first;
      NSString *firstOperation;
      NSNumber *second;
      NSString *secondOperation;
      NSNumber *third;
      
      if (firstRange.location != NSNotFound) {
        first = [self convertRelative:[relative substringWithRange:firstRange] bounds:bounds];
      }
      
      if (firstOperationRange.location != NSNotFound) {
        firstOperation = [relative substringWithRange:firstOperationRange];
      }
      
      if (secondRange.location != NSNotFound) {
        second = [self convertRelative:[relative substringWithRange:secondRange] bounds:bounds];
      }
      
      if (secondOperationRange.location != NSNotFound) {
        secondOperation = [relative substringWithRange:secondOperationRange];
      }
      
      if (thirdRange.location != NSNotFound) {
        third = [self convertRelative:[relative substringWithRange:thirdRange] bounds:bounds];
      }
      
      float secondResult = (secondOperation == nil || third == nil)
        ? [second floatValue]
        : [second floatValue] + ([@"+" isEqualToString:secondOperation] ? 1.0f : -1.0f) * [third floatValue];
      
      return (firstOperation == nil || second == nil)
        ? first
        : @([first floatValue] + ([@"+" isEqualToString:firstOperation] ? 1.0f : -1.0f) * secondResult);
    }

#if RCT_DEBUG
    RCTAssert(false, @"ImageFilterKit: Invalid relative expr - '%@'", relative);
#endif
  }
  
  return defaultValue;
}

+ (nonnull NSNumber *)convertRelative:(nonnull NSString *)relative
                               bounds:(CGSize)bounds
{
  double num;
  NSScanner *scanner = [NSScanner scannerWithString:relative];
  
  [scanner scanDouble:&num];
  NSString *unit = [relative substringFromIndex:[scanner scanLocation]];
  
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
  
  return @(num);
}

+ (CIColor *)color:(NSUInteger)color
{
  return [CIColor colorWithRed:((color >> 16) & 0xFF) / 255.0
                         green:((color >> 8) & 0xFF) / 255.0
                          blue:(color & 0xFF) / 255.0
                         alpha:((color >> 24) & 0xFF) / 255.0];
}

+ (nullable IFKTransform *)convertTransform:(nullable NSDictionary *)transform
                               defaultValue:(nullable IFKTransform *)defaultValue
{
  if (transform != nil && [transform objectForKey:@"transform"]) {
    NSDictionary *value = [transform objectForKey:@"transform"];
    
    CGPoint anchor = [value objectForKey:@"anchor"] != nil
      ? [[self extractOffset:[value objectForKey:@"anchor"]
                defaultValue:[CIVector vectorWithCGPoint:defaultValue.anchor]] CGPointValue]
      : defaultValue.anchor;
    
    CGPoint translate = [value objectForKey:@"translate"] != nil
      ? [[self extractOffset:[value objectForKey:@"translate"]
                defaultValue:[CIVector vectorWithCGPoint:defaultValue.translate]] CGPointValue]
      : defaultValue.translate;
    
    IFKScale *scale = [value objectForKey:@"scale"] != nil
      ? [self extractScale:[value objectForKey:@"scale"]
               defaultMode:[defaultValue.scale isKindOfClass:[IFKScaleWithMode class]]
                             ? ((IFKScaleWithMode *)defaultValue.scale).mode
                             : COVER
              defaultScale:[defaultValue.scale isKindOfClass:[IFKScaleWithSize class]]
                             ? ((IFKScaleWithSize *)defaultValue.scale).scale
                             : CGPointMake(1.0f, 1.0f)]
      : defaultValue.scale;
    
    CGFloat rotate = [value objectForKey:@"rotate"] != nil
      ? [[self extractAngle:[value objectForKey:@"rotate"]
               defaultValue:@(defaultValue.rotate)] floatValue]
      : defaultValue.rotate;

    return [[IFKTransform alloc] initWithAnchor:anchor
                                      translate:translate
                                          scale:scale
                                         rotate:rotate];
  }
  
  return defaultValue;
}

@end
