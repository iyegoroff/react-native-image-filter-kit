import {
  LinearGradientConfig,
  RadialGradientConfig,
  SweepGradientConfig,
  TextImageConfig,
  CircleShapeConfig,
  OvalShapeConfig,
  PathShapeConfig,
  RegularPolygonShapeConfig,
  shapes
} from './shapes'
import { TransformMap } from '../common/shapes'

export const shapeTransforms /*: TransformMap<typeof shapes> */= {
  Color: ({ color, image, ...config }: { color: string, image: object }) => ({
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
    ...config
  }: LinearGradientConfig) => ({
    ...config,
    name: 'IosIFKLinearGradient',
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
    ...config
  }: RadialGradientConfig) => ({
    ...config,
    name: 'IosIFKRadialGradient',
    inputImage: image,
    inputColors: colors,
    inputStops: stops,
    inputCenter: center,
    inputRadius: radius
  }),

  SweepGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    image,
    ...config
  }: SweepGradientConfig) => ({
    ...config,
    name: 'IosIFKSweepGradient',
    inputImage: image,
    inputColors: colors,
    inputStops: stops,
    inputCenter: center
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

  OvalShape: (
    { radiusX = '50w', radiusY = '25h', color = 'black', image, ...config }: OvalShapeConfig
  ) => ({
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
