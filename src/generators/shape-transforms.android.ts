import {
  LinearGradientConfig,
  RadialGradientConfig,
  SweepGradientConfig,
  TextImageConfig,
  CircleShapeConfig,
  OvalShapeConfig,
  PathShapeConfig,
  RegularPolygonShapeConfig,
  QuadGradientConfig,
  shapes,
  EllipticalGradientConfig,
  RectangularGradientConfig
} from './shapes'
import { TransformMap } from '../common/shapes'

export const shapeTransforms: TransformMap<typeof shapes> = {
  Color: (config: Object) => ({
    ...config,
    name: 'AndroidColor'
  }),

  LinearGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    start = { x: 0, y: '0h' },
    end = { x: '100w', y: '0h' },
    mixStep = 'CLAMP',
    ...config
  }: LinearGradientConfig) => ({
    ...config,
    name: mixStep === 'CLAMP' ? 'AndroidLinearGradient' : 'AndroidSmoothLinearGradient',
    colors,
    locations: stops,
    x0: start.x,
    y0: `100h - ${start.y}`,
    x1: end.x,
    y1: `100h - ${end.y}`
  }),

  RadialGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    radius = '50min',
    mixStep = 'CLAMP',
    ...config
  }: RadialGradientConfig) => ({
    ...config,
    name: mixStep === 'CLAMP' ? 'AndroidRadialGradient' : 'AndroidSmoothRadialGradient',
    colors,
    stops,
    radius,
    centerX: center.x,
    centerY: `100h - ${center.y}`
  }),

  EllipticalGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    radiusX = '50w',
    radiusY = '50h',
    mixStep = 'CLAMP',
    ...config
  }: EllipticalGradientConfig) => ({
    ...config,
    name: 'AndroidEllipticalGradient',
    mixStep,
    colors,
    stops,
    radiusX,
    radiusY,
    centerX: center.x,
    centerY: `100h - ${center.y}`
  }),

  RectangularGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    halfWidth = '50w',
    halfHeight = '50h',
    mixStep = 'CLAMP',
    ...config
  }: RectangularGradientConfig) => ({
    ...config,
    name: 'AndroidRectangularGradient',
    mixStep,
    colors,
    stops,
    halfWidth,
    halfHeight,
    centerX: center.x,
    centerY: `100h - ${center.y}`
  }),

  SweepGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    mixStep = 'CLAMP',
    ...config
  }: SweepGradientConfig) => ({
    ...config,
    name: mixStep === 'CLAMP' ? 'AndroidSweepGradient' : 'AndroidSmoothSweepGradient',
    colors: Array.from(colors).reverse(),
    positions: stops.map((stop) => 1 - stop).reverse(),
    cx: center.x,
    cy: `100h - ${center.y}`
  }),

  QuadGradient: ({
    bottomLeftColor,
    bottomRightColor,
    topLeftColor,
    topRightColor,
    ...config
  }: QuadGradientConfig) => ({
    ...config,
    name: 'AndroidQuadGradient',
    bottomLeftColor: topLeftColor,
    bottomRightColor: topRightColor,
    topLeftColor: bottomLeftColor,
    topRightColor: bottomRightColor
  }),

  TextImage: (config: TextImageConfig) => ({
    ...config,
    name: 'AndroidTextImage'
  }),

  CircleShape: (config: CircleShapeConfig) => ({
    ...config,
    name: 'AndroidCircleShape'
  }),

  OvalShape: (config: OvalShapeConfig) => ({
    ...config,
    name: 'AndroidOvalShape'
  }),

  PathShape: (config: PathShapeConfig) => ({
    ...config,
    name: 'AndroidPathShape'
  }),

  RegularPolygonShape: (config: RegularPolygonShapeConfig) => ({
    ...config,
    name: 'AndroidRegularPolygonShape'
  })
}
