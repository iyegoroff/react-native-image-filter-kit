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
  }: LinearGradientGeneratorConfig) => {
    const [inputStop0, inputStop1, inputStop2, inputStop3, inputStop4] = stops
    const [inputColor0, inputColor1, inputColor2, inputColor3, inputColor4] = colors

    return {
      ...config,
      name: 'IFKLinearGradient',
      inputColor0,
      inputColor1,
      inputColor2,
      inputColor3,
      inputColor4,
      inputStop0,
      inputStop1,
      inputStop2,
      inputStop3,
      inputStop4,
      inputStart: start,
      inputEnd: end,
      inputAmount: colors.length > 0
        ? colors.length
        : stops.length > 0
          ? stops.length
          : undefined
    }
  },

  RadialGradientGenerator: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    radius = '50min',
    ...config
  }: RadialGradientGeneratorConfig) => {
    const [inputStop0, inputStop1, inputStop2, inputStop3, inputStop4] = stops
    const [inputColor0, inputColor1, inputColor2, inputColor3, inputColor4] = colors

    return {
      ...config,
      name: 'IFKRadialGradient',
      inputColor0,
      inputColor1,
      inputColor2,
      inputColor3,
      inputColor4,
      inputStop0,
      inputStop1,
      inputStop2,
      inputStop3,
      inputStop4,
      inputCenter: center,
      inputRadius: radius,
      inputAmount: colors.length > 0
        ? colors.length
        : stops.length > 0
          ? stops.length
          : undefined
    }
  },

  SweepGradientGenerator: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    ...config
  }: RadialGradientGeneratorConfig) => {
    const [inputStop0, inputStop1, inputStop2, inputStop3, inputStop4] = stops
    const [inputColor0, inputColor1, inputColor2, inputColor3, inputColor4] = colors

    return {
      ...config,
      name: 'IFKSweepGradient',
      inputColor0,
      inputColor1,
      inputColor2,
      inputColor3,
      inputColor4,
      inputStop0,
      inputStop1,
      inputStop2,
      inputStop3,
      inputStop4,
      inputCenter: center,
      inputAmount: colors.length > 0
        ? colors.length
        : stops.length > 0
          ? stops.length
          : undefined
    }
  }
}
