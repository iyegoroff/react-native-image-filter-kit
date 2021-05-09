import {
  LinearGradientConfig,
  RadialGradientConfig,
  SweepGradientConfig,
  TextImageConfig,
  CircleShapeConfig,
  OvalShapeConfig,
  PathShapeConfig,
  RegularPolygonShapeConfig,
  shapes,
  QuadGradientConfig,
  EllipticalGradientConfig,
  RectangularGradientConfig
} from './shapes'
import { TransformMap } from '../common/shapes'

export const shapeTransforms: TransformMap<typeof shapes> = {
  Color: ({ color, image, ...config }: { color: string; image: object }) => ({
    ...config,
    name: 'IosCIConstantColorGenerator',
    inputImage: image,
    inputColor: color
  }),

  LinearGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    start = { x: 0, y: '0h' },
    end = { x: '100w', y: '0h' },
    image,
    mixStep,
    ...config
  }: LinearGradientConfig) => ({
    ...config,
    name: 'IosIFKLinearGradient',
    inputMixStep: mixStep,
    inputImage: image,
    inputColors: colors,
    inputStops: stops,
    inputStart: start,
    inputEnd: end
  }),

  RadialGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    radius = '50min',
    image,
    mixStep,
    ...config
  }: RadialGradientConfig) => ({
    ...config,
    name: 'IosIFKRadialGradient',
    inputMixStep: mixStep,
    inputImage: image,
    inputColors: colors,
    inputStops: stops,
    inputCenter: center,
    inputRadius: radius
  }),

  EllipticalGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    radiusX = '50w',
    radiusY = '50h',
    image,
    mixStep,
    ...config
  }: EllipticalGradientConfig) => ({
    ...config,
    name: 'IosIFKEllipticalGradient',
    inputMixStep: mixStep,
    inputImage: image,
    inputColors: colors,
    inputStops: stops,
    inputCenter: center,
    inputRadiusX: radiusX,
    inputRadiusY: radiusY
  }),

  RectangularGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    halfWidth = '50w',
    halfHeight = '50h',
    image,
    mixStep,
    ...config
  }: RectangularGradientConfig) => ({
    ...config,
    name: 'IosIFKRectangularGradient',
    inputMixStep: mixStep,
    inputImage: image,
    inputColors: colors,
    inputStops: stops,
    inputCenter: center,
    inputHalfWidth: halfWidth,
    inputHalfHeight: halfHeight
  }),

  SweepGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    image,
    mixStep,
    ...config
  }: SweepGradientConfig) => ({
    ...config,
    name: 'IosIFKSweepGradient',
    inputMixStep: mixStep,
    inputImage: image,
    inputColors: colors,
    inputStops: stops,
    inputCenter: center
  }),

  QuadGradient: ({
    bottomLeftColor,
    bottomRightColor,
    topLeftColor,
    topRightColor,
    image,
    ...config
  }: QuadGradientConfig) => ({
    ...config,
    name: 'IosIFKQuadGradient',
    inputImage: image,
    inputBottomLeftColor: bottomLeftColor,
    inputBottomRightColor: bottomRightColor,
    inputTopLeftColor: topLeftColor,
    inputTopRightColor: topRightColor
  }),

  TextImage: ({ color, text, fontSize, fontName, image, ...config }: TextImageConfig) => ({
    ...config,
    name: 'IosIFKTextImage',
    inputImage: image,
    inputText: text,
    inputFontName: fontName,
    inputFontSize: fontSize,
    inputColor: color
  }),

  CircleShape: ({ radius = '50min', color = 'black', image, ...config }: CircleShapeConfig) => ({
    ...config,
    name: 'IosIFKCircleShape',
    inputRadius: radius,
    inputColor: color,
    inputImage: image
  }),

  OvalShape: ({
    radiusX = '50w',
    radiusY = '25h',
    color = 'black',
    image,
    ...config
  }: OvalShapeConfig) => ({
    ...config,
    name: 'IosIFKOvalShape',
    inputRadiusX: radiusX,
    inputRadiusY: radiusY,
    inputColor: color,
    inputImage: image
  }),

  PathShape: ({ color = 'black', image, path, ...config }: PathShapeConfig) => ({
    ...config,
    name: 'IosIFKPathShape',
    inputColor: color,
    inputImage: image,
    inputPath: path
  }),

  RegularPolygonShape: ({
    color = 'black',
    image,
    circumradius = '50min',
    borderRadiuses = [0, 0, 0],
    ...config
  }: RegularPolygonShapeConfig) => ({
    ...config,
    name: 'IosIFKRegularPolygonShape',
    inputColor: color,
    inputImage: image,
    inputCircumradius: circumradius,
    inputBorderRadiuses: borderRadiuses
  })
}
