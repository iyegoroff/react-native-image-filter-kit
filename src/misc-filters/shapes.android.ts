import { Composition, Generator } from '../common/shapes'
import {
  distance,
  color,
  path,
  distanceVector,
  colorVector,
  scalarVector,
  mixStep
} from '../common/inputs'

const Gradient = {
  mixStep: mixStep,
  colors: colorVector,
  stops: scalarVector,
  ...Generator
}

export const shapes = {
  AndroidDestinationATopCompositing: Composition,

  AndroidSourceOutCompositing: Composition,

  AndroidDestinationInCompositing: Composition,

  AndroidSourceInCompositing: Composition,

  AndroidCircleShape: {
    radius: distance,
    color: color,
    ...Generator
  },

  AndroidOvalShape: {
    radiusX: distance,
    radiusY: distance,
    color: color,
    ...Generator
  },

  AndroidPathShape: {
    path: path,
    color: color,
    ...Generator
  },

  AndroidRegularPolygonShape: {
    circumradius: distance,
    borderRadiuses: distanceVector,
    color: color,
    ...Generator
  },

  AndroidQuadGradient: {
    bottomLeftColor: color,
    bottomRightColor: color,
    topLeftColor: color,
    topRightColor: color,
    ...Generator
  },

  AndroidSmoothLinearGradient: {
    x0: distance,
    y0: distance,
    x1: distance,
    y1: distance,
    colors: colorVector,
    locations: scalarVector,
    ...Generator
  },

  AndroidSmoothRadialGradient: {
    centerX: distance,
    centerY: distance,
    radius: distance,
    colors: colorVector,
    stops: scalarVector,
    ...Generator
  },

  AndroidSmoothSweepGradient: {
    cx: distance,
    cy: distance,
    colors: colorVector,
    positions: scalarVector,
    ...Generator
  },

  AndroidEllipticalGradient: {
    centerX: distance,
    centerY: distance,
    radiusX: distance,
    radiusY: distance,
    ...Gradient
  },

  AndroidRectangularGradient: {
    centerX: distance,
    centerY: distance,
    halfWidth: distance,
    halfHeight: distance,
    ...Gradient
  }
}
