import { color, colorVector, scalarVector, position, distance } from '../common/inputs'
import { Generator } from '../common/shapes'
import { Position } from '../common/configs'

export interface LinearGradientGeneratorConfig {
  readonly colors?: ReadonlyArray<string>
  readonly stops?: ReadonlyArray<number>
  readonly start?: Position
  readonly end?: Position
}

export interface RadialGradientGeneratorConfig {
  readonly colors?: ReadonlyArray<string>
  readonly stops?: ReadonlyArray<number>
  readonly center?: Position
  readonly radius?: string
}

export const shapes = {
  ColorGenerator: {
    color: color,
    ...Generator
  },

  LinearGradientGenerator: {
    colors: colorVector,
    stops: scalarVector,
    start: position,
    end: position,
    ...Generator
  },

  RadialGradientGenerator: {
    colors: colorVector,
    stops: scalarVector,
    center: position,
    radius: distance,
    ...Generator
  },

  SweepGradientGenerator: {
    colors: colorVector,
    stops: scalarVector,
    center: position,
    ...Generator
  }
}
