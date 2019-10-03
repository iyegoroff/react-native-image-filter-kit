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
  shapes
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
    ...config
  }: LinearGradientConfig) => ({
    ...config,
    name: 'AndroidLinearGradient',
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

  SweepGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    ...config
  }: SweepGradientConfig) => ({
    ...config,
    name: 'AndroidSweepGradient',
    colors: Array.from(colors).reverse(),
    positions: stops.map(stop => 1 - stop).reverse(),
    cx: center.x,
    cy: `100h - ${center.y}`
  }),

  QuadGradient: (config: QuadGradientConfig) => ({
    ...config,
    name: 'AndroidQuadGradient'
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
