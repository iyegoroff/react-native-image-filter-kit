import {
  color,
  colorVector,
  scalarVector,
  position,
  distance,
  text,
  distanceVector,
  path,
  mixStep
} from '../common/inputs'
import { Generator } from '../common/shapes'
import { Position, MixStep } from '../common/configs'

type GradientConfig = {
  readonly colors?: readonly string[]
  readonly stops?: readonly number[]
  readonly mixStep?: MixStep
  readonly image: object
}

export type LinearGradientConfig = {
  readonly start?: Position
  readonly end?: Position
} & GradientConfig

export type RadialGradientConfig = {
  readonly center?: Position
  readonly radius?: string
} & GradientConfig

export type SweepGradientConfig = {
  readonly center?: Position
} & GradientConfig

export type QuadGradientConfig = {
  readonly bottomLeftColor: string
  readonly bottomRightColor: string
  readonly topLeftColor: string
  readonly topRightColor: string
  readonly image: object
}

export type EllipticalGradientConfig = {
  readonly radiusX?: string
  readonly radiusY?: string
  readonly center?: Position
} & GradientConfig

export type RectangularGradientConfig = {
  readonly halfWidth?: string
  readonly halfHeight?: string
  readonly center?: Position
} & GradientConfig

export type TextImageConfig = {
  readonly text: string
  readonly fontName?: string
  readonly fontSize?: string
  readonly image: object
  readonly color?: string
}

type ShapeConfig = {
  readonly color?: string
  readonly image: object
}

export type CircleShapeConfig = {
  readonly radius?: string
} & ShapeConfig

export type OvalShapeConfig = {
  readonly radiusX?: string
  readonly radiusY?: string
} & ShapeConfig

export type PathShapeConfig = {
  readonly path: unknown[]
} & ShapeConfig

export type RegularPolygonShapeConfig = {
  readonly borderRadiuses: number[]
  readonly circumradius?: string
} & ShapeConfig

const Gradient = {
  colors: colorVector,
  stops: scalarVector,
  mixStep: mixStep,
  ...Generator
}

export const shapes = {
  Color: {
    color: color,
    ...Generator
  },

  LinearGradient: {
    start: position,
    end: position,
    ...Gradient
  },

  RadialGradient: {
    center: position,
    radius: distance,
    ...Gradient
  },

  SweepGradient: {
    center: position,
    ...Gradient
  },

  QuadGradient: {
    bottomLeftColor: color,
    bottomRightColor: color,
    topLeftColor: color,
    topRightColor: color,
    ...Generator
  },

  EllipticalGradient: {
    center: position,
    radiusX: distance,
    radiusY: distance,
    ...Gradient
  },

  RectangularGradient: {
    center: position,
    halfWidth: distance,
    halfHeight: distance,
    ...Gradient
  },

  TextImage: {
    text: text,
    fontName: text,
    fontSize: distance,
    color: color,
    ...Generator
  },

  CircleShape: {
    radius: distance,
    color: color,
    ...Generator
  },

  OvalShape: {
    radiusX: distance,
    radiusY: distance,
    color: color,
    ...Generator
  },

  PathShape: {
    path: path,
    color: color,
    ...Generator
  },

  RegularPolygonShape: {
    circumradius: distance,
    borderRadiuses: distanceVector,
    color: color,
    ...Generator
  }
}
