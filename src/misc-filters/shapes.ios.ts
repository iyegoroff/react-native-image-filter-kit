import { scalar, color, position, distance, colorVector, scalarVector } from '../common/inputs'
import {
  GeneratorIos as Generator,
  CommonIos as Common,
  CompositionIos as Composition
} from '../common/shapes'

const Gradient = {
  inputColors: colorVector,
  inputStops: scalarVector,
  ...Generator
}

export const shapes = {
  IosIFKHazeRemoval: {
    inputDistance: scalar,
    inputSlope: scalar,
    inputColor: color,
    ...Common
  },

  IosIFKLinearGradient: {
    inputStart: position,
    inputEnd: position,
    ...Gradient
  },

  IosIFKRadialGradient: {
    inputCenter: position,
    inputRadius: distance,
    ...Gradient
  },

  IosIFKSweepGradient: {
    inputCenter: position,
    ...Gradient
  },

  IosIFKXorCompositing: Composition
}
