import {
  LinearGradientGeneratorConfig,
  RadialGradientGeneratorConfig,
  SweepGradientGeneratorConfig
} from './shapes'

export const shapeTransforms = {
  ColorGenerator: ({ color, image, ...config }: { color: string, image: object }) => ({
    ...config,
    name: 'CIConstantColorGenerator',
    inputImage: image,
    inputColor: color
  }),

  LinearGradientGenerator: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    start = { x: 0, y: '0h' },
    end = { x: '100w', y: '0h' },
    image,
    ...config
  }: LinearGradientGeneratorConfig) => ({
    ...config,
    name: 'IFKLinearGradient',
    inputImage: image,
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
    image,
    ...config
  }: RadialGradientGeneratorConfig) => ({
    ...config,
    name: 'IFKRadialGradient',
    inputImage: image,
    inputColors: colors,
    inputStops: stops,
    inputCenter: center,
    inputRadius: radius
  }),

  SweepGradientGenerator: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    image,
    ...config
  }: SweepGradientGeneratorConfig) => ({
    ...config,
    name: 'IFKSweepGradient',
    inputImage: image,
    inputColors: colors,
    inputStops: stops,
    inputCenter: center
  })
}
