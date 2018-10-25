import {
  scalar,
  scalarVector,
  color,
  colorVector,
  distance,
  image,
  tileMode,
  porterDuffMode,
  imageStyle,
  config,
  resizeMode,
  scaleMode,
  gravityAxis
} from '../common/inputs'

export const shapes = {
  ImageFilter: {
    config: config
  },

  ColorMatrixColorFilter: {
    matrix: scalarVector,
    image: image
  },

  IterativeBoxBlur: {
    blurRadius: scalar,
    iterations: scalar,
    image: image
  },

  LightingColorFilter: {
    mul: color,
    add: color,
    image: image
  },

  RoundAsCircle: {
    image: image
  },

  Color: {
    color: color,
    imageStyle: imageStyle
  },

  LinearGradient: {
    x0: distance,
    y0: distance,
    x1: distance,
    y1: distance,
    colors: colorVector,
    locations: scalarVector,
    tile: tileMode,
    imageStyle: imageStyle
  },

  RadialGradient: {
    centerX: distance,
    centerY: distance,
    radius: distance,
    colors: colorVector,
    stops: scalarVector,
    tileMode: tileMode,
    imageStyle: imageStyle
  },

  SweepGradient: {
    cx: distance,
    cy: distance,
    colors: colorVector,
    positions: scalarVector,
    imageStyle: imageStyle
  },

  PorterDuffColorFilter: {
    color: color,
    mode: porterDuffMode,
    image: image
  },

  PorterDuffXfermode: {
    mode: porterDuffMode,
    scaleMode: scaleMode,
    dstImage: image,
    dstGravityAxis: gravityAxis,
    dstResizeMode: resizeMode,
    srcImage: image,
    srcGravityAxis: gravityAxis,
    srcResizeMode: resizeMode
  }
}
