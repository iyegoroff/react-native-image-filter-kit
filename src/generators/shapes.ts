import { color, colorVector, scalarVector, position, distance } from '../common/inputs'
import { Generator } from '../common/shapes'
import { Position } from '../common/configs'

interface GradientGeneratorConfig {
  readonly colors?: ReadonlyArray<string>
  readonly stops?: ReadonlyArray<number>
  readonly image: object
}

export interface LinearGradientGeneratorConfig extends GradientGeneratorConfig {
  readonly start?: Position
  readonly end?: Position
}

export interface RadialGradientGeneratorConfig extends GradientGeneratorConfig {
  readonly center?: Position
  readonly radius?: string
}

export interface SweepGradientGeneratorConfig extends GradientGeneratorConfig {
  readonly center?: Position
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
