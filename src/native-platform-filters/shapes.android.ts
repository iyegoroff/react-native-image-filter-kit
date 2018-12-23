// tslint:disable:max-line-length

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

  // https://developer.android.com/reference/android/graphics/ColorMatrixColorFilter
  ColorMatrixColorFilter: {
    matrix: scalarVector,
    ...Common
  },

  // https://frescolib.org/javadoc/reference/com/facebook/imagepipeline/postprocessors/IterativeBoxBlurPostProcessor.html
  IterativeBoxBlur: {
    blurRadius: scalar,
    iterations: scalar,
    ...Common
  },

  // https://developer.android.com/reference/android/graphics/LightingColorFilter
  LightingColorFilter: {
    mul: color,
    add: color,
    ...Common
  },

  // https://frescolib.org/javadoc/reference/com/facebook/imagepipeline/postprocessors/RoundAsCirclePostprocessor.html
  RoundAsCircle: Common,

  // https://developer.android.com/reference/android/graphics/Color
  Color: {
    color: color,
    ...Generator
  },

  // https://developer.android.com/reference/android/graphics/LinearGradient
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

  // https://developer.android.com/reference/android/graphics/RadialGradient
  RadialGradient: {
    centerX: distance,
    centerY: distance,
    radius: distance,
    colors: colorVector,
    stops: scalarVector,
    tileMode: tileMode,
    ...Generator
  },

  // https://developer.android.com/reference/android/graphics/SweepGradient
  SweepGradient: {
    cx: distance,
    cy: distance,
    colors: colorVector,
    positions: scalarVector,
    ...Generator
  },

  // https://developer.android.com/reference/android/graphics/PorterDuffColorFilter
  PorterDuffColorFilter: {
    color: color,
    mode: porterDuffMode,
    ...Common
  },

  // https://developer.android.com/reference/android/graphics/PorterDuffXfermode
  PorterDuffXfermode: {
    mode: porterDuffMode,
    ...Composition
  },

  // https://developer.android.com/reference/android/renderscript/ScriptIntrinsicBlur
  ScriptIntrinsicBlur: {
    radius: scalar,
    ...Common
  },

  // https://developer.android.com/reference/android/renderscript/ScriptIntrinsicConvolve3x3
  ScriptIntrinsicConvolve3x3: {
    coefficients: scalarVector,
    ...Common
  },

  // https://developer.android.com/reference/android/renderscript/ScriptIntrinsicConvolve5x5
  ScriptIntrinsicConvolve5x5: {
    coefficients: scalarVector,
    ...Common
  }
}
