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
  scale,
  path,
  distanceVector,
  angle
} from '../common/inputs'
import { GeneratorIos as Generator, CompositionBaseIos as CompositionBase } from '../common/shapes'

const Gradient = {
  inputColors: colorVector,
  inputStops: scalarVector,
  ...Generator
}

export const shapes = {
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
    inputBackgroundImageScale: scale,
    inputBackgroundImageAnchor: offset,
    inputBackgroundImagePosition: offset,
    inputBackgroundImageRotate: angle
  },

  IosIFKTextImage: {
    inputText: text,
    inputLineWidth: scalar,
    inputFontName: text,
    inputFontSize: distance,
    inputColor: color,
    ...Generator
  },

  IosIFKCircleShape: {
    inputRadius: distance,
    inputColor: color,
    ...Generator
  },

  IosIFKOvalShape: {
    inputRadiusX: distance,
    inputRadiusY: distance,
    inputColor: color,
    ...Generator
  },

  IosIFKPathShape: {
    inputPath: path,
    inputColor: color,
    ...Generator
  },

  IosIFKRegularPolygonShape: {
    inputCircumradius: distance,
    inputBorderRadiuses: distanceVector,
    inputColor: color,
    ...Generator
  }
}
