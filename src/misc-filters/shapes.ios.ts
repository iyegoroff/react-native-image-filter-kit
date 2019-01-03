import {
  scalar,
  color,
  position,
  distance,
  colorVector,
  scalarVector,
  text,
  offset,
  image,
  resizeMode
} from '../common/inputs'
import {
  GeneratorIos as Generator,
  CommonIos as Common,
  CompositionBaseIos as CompositionBase
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

  IosIFKXorCompositing: {
    ...CompositionBase,
    inputBackgroundImage: image,
    inputBackgroundImageResizeMode: resizeMode,
    inputBackgroundImageAnchor: offset,
    inputBackgroundImagePosition: offset
  },

  IosIFKTextImage: {
    inputText: text,
    inputLineWidth: scalar,
    inputFontName: text,
    inputFontSize: distance,
    inputColor: color,
    ...Generator
  },

  IosIFKCircle: {
    inputRadius: distance,
    inputColor: color,
    ...Generator
  },

  IosIFKOval: {
    inputRadiusX: distance,
    inputRadiusY: distance,
    inputRotation: scalar,
    inputColor: color,
    ...Generator
  }
}
