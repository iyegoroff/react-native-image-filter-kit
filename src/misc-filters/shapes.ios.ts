import {
  scalar,
  color,
  position,
  distance,
  colorVector,
  scalarVector,
  text,
  image,
  path,
  distanceVector,
  transform,
  mixStep,
  marker
} from '../common/inputs'
import { GeneratorIos as Generator, CompositionBaseIos as CompositionBase } from '../common/shapes'

const Gradient = {
  inputColors: colorVector,
  inputStops: scalarVector,
  inputMixStep: mixStep,
  hasColorManagement: marker,
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

  IosIFKEllipticalGradient: {
    inputCenter: position,
    inputRadiusX: distance,
    inputRadiusY: distance,
    ...Gradient
  },

  IosIFKRectangularGradient: {
    inputCenter: position,
    inputHalfWidth: distance,
    inputHalfHeight: distance,
    ...Gradient
  },

  IosIFKSweepGradient: {
    inputCenter: position,
    ...Gradient
  },

  IosIFKQuadGradient: {
    inputBottomLeftColor: color,
    inputBottomRightColor: color,
    inputTopLeftColor: color,
    inputTopRightColor: color,
    hasColorManagement: marker,
    ...Generator
  },

  IosIFKXorCompositing: {
    ...CompositionBase,
    inputBackgroundImage: image,
    inputBackgroundImageTransform: transform
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
