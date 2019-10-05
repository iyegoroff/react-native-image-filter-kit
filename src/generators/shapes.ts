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

interface GradientConfig {
  readonly colors?: ReadonlyArray<string>
  readonly stops?: ReadonlyArray<number>
  readonly mixStep?: MixStep
  readonly image: object
}

export interface LinearGradientConfig extends GradientConfig {
  readonly start?: Position
  readonly end?: Position
}

export interface RadialGradientConfig extends GradientConfig {
  readonly center?: Position
  readonly radius?: string
}

export interface SweepGradientConfig extends GradientConfig {
  readonly center?: Position
}

export interface QuadGradientConfig {
  readonly bottomLeftColor: string
  readonly bottomRightColor: string
  readonly topLeftColor: string
  readonly topRightColor: string
  readonly image: object
}

export interface EllipticalGradientConfig extends GradientConfig {
  readonly radiusX?: string
  readonly radiusY?: string
  readonly center?: Position
}

export interface TextImageConfig {
  readonly text: string
  readonly fontName?: string
  readonly fontSize?: string
  readonly image: object
  readonly color?: string
}

interface ShapeConfig {
  readonly color?: string
  readonly image: object
}

export interface CircleShapeConfig extends ShapeConfig {
  readonly radius?: string
}

export interface OvalShapeConfig extends ShapeConfig {
  readonly radiusX?: string
  readonly radiusY?: string
}

export interface PathShapeConfig extends ShapeConfig {
  readonly path: unknown[]
}

export interface RegularPolygonShapeConfig extends ShapeConfig {
  readonly borderRadiuses: number[]
  readonly circumradius?: string
}

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
