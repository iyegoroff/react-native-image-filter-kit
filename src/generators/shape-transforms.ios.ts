import { LinearGradientGeneratorConfig, RadialGradientGeneratorConfig } from './shapes'

export const shapeTransforms = {
  ColorGenerator: ({ color, ...config }: { color: string }) => ({
    ...config,
    name: 'CIConstantColorGenerator',
    inputColor: color
  }),

  LinearGradientGenerator: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    start = { x: 0, y: '0h' },
    end = { x: '100w', y: '0h' },
    ...config
  }: LinearGradientGeneratorConfig) => ({
    ...config,
    name: 'IFKLinearGradient',
    inputColors: colors,
    inputStops: stops,
    inputStart: start,
    inputEnd: end
  }),

  RadialGradientGenerator: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    radius = '50min',
    ...config
  }: RadialGradientGeneratorConfig) => ({
    ...config,
    name: 'IFKRadialGradient',
    inputColors: colors,
    inputStops: stops,
    inputCenter: center,
    inputRadius: radius
  }),

  SweepGradientGenerator: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    ...config
  }: RadialGradientGeneratorConfig) => ({
    ...config,
    name: 'IFKSweepGradient',
    inputColors: colors,
    inputStops: stops,
    inputCenter: center
  })
}
