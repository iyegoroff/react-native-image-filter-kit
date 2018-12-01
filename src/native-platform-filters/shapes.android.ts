import {
  scalar,
  scalarVector,
  color,
  colorVector,
  distance,
  tileMode,
  porterDuffMode,
  config
} from '../common/inputs'
import { Common, Composition, Generator } from '../common/shapes'

export const shapes = {
  ImageFilter: {
    config: config
  },

  ColorMatrixColorFilter: {
    matrix: scalarVector,
    ...Common
  },

  IterativeBoxBlur: {
    blurRadius: scalar,
    iterations: scalar,
    ...Common
  },

  LightingColorFilter: {
    mul: color,
    add: color,
    ...Common
  },

  RoundAsCircle: Common,

  Color: {
    color: color,
    ...Generator
  },

  LinearGradient: {
    x0: distance,
    y0: distance,
    x1: distance,
    y1: distance,
    colors: colorVector,
    locations: scalarVector,
    tile: tileMode,
    ...Generator
  },

  RadialGradient: {
    centerX: distance,
    centerY: distance,
    radius: distance,
    colors: colorVector,
    stops: scalarVector,
    tileMode: tileMode,
    ...Generator
  },

  SweepGradient: {
    cx: distance,
    cy: distance,
    colors: colorVector,
    positions: scalarVector,
    ...Generator
  },

  PorterDuffColorFilter: {
    color: color,
    mode: porterDuffMode,
    ...Common
  },

  PorterDuffXfermode: {
    mode: porterDuffMode,
    ...Composition
  },

  ScriptIntrinsicBlur: {
    radius: scalar,
    ...Common
  },

  ScriptIntrinsicConvolve3x3: {
    coefficients: scalarVector,
    ...Common
  },

  ScriptIntrinsicConvolve5x5: {
    coefficients: scalarVector,
    ...Common
  }
}
