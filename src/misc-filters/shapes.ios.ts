import { scalar, color, position, distance, colorVector, scalarVector } from '../common/inputs'
import { Generator, CommonIos as Common, BlendIos as Blend } from '../common/shapes'

const Gradient = {
  inputColors: colorVector,
  inputStops: scalarVector,
  ...Generator
}

export const shapes = {
  IFKHazeRemoval: {
    inputDistance: scalar,
    inputSlope: scalar,
    inputColor: color,
    ...Common
  },

  IFKLinearGradient: {
    inputStart: position,
    inputEnd: position,
    ...Gradient
  },

  IFKRadialGradient: {
    inputCenter: position,
    inputRadius: distance,
    ...Gradient
  },

  IFKSweepGradient: {
    inputCenter: position,
    ...Gradient
  },

  IFKXorCompositing: Blend
}
