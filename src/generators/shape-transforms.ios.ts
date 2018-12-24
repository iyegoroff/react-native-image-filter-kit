import { LinearGradientConfig, RadialGradientConfig, SweepGradientConfig } from './shapes'

export const shapeTransforms = {
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
  })
}
