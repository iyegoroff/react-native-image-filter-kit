import {
  LinearGradientConfig,
  RadialGradientConfig,
  SweepGradientConfig,
  TextImageConfig,
  CircleConfig,
  OvalConfig
} from './shapes'

export const shapeTransforms = {
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
    ...config
  }: RadialGradientConfig) => ({
    ...config,
    name: 'AndroidRadialGradient',
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
    centerX: center.x,
    centerY: `100h - ${center.y}`
  }),

  TextImage: (config: TextImageConfig) => ({
    ...config,
    name: 'AndroidTextImage'
  }),

  Circle: (config: CircleConfig) => ({
    ...config,
    name: 'AndroidCircle'
  }),

  Oval: (config: OvalConfig) => ({
    ...config,
    name: 'AndroidOval'
  })
}
