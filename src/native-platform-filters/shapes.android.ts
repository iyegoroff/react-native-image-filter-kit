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
  gravityAxis,
  bool
} from '../common/inputs'

export const shapes = {
  ImageFilter: {
    config: config
  },

  ColorMatrixColorFilter: {
    matrix: scalarVector,
    image: image,
    disableCache: bool
  },

  IterativeBoxBlur: {
    blurRadius: scalar,
    iterations: scalar,
    image: image,
    disableCache: bool
  },

  LightingColorFilter: {
    mul: color,
    add: color,
    image: image,
    disableCache: bool
  },

  RoundAsCircle: {
    image: image,
    disableCache: bool
  },

  Color: {
    color: color,
    imageStyle: imageStyle,
    disableCache: bool
  },

  LinearGradient: {
    x0: distance,
    y0: distance,
    x1: distance,
    y1: distance,
    colors: colorVector,
    locations: scalarVector,
    tile: tileMode,
    imageStyle: imageStyle,
    disableCache: bool
  },

  RadialGradient: {
    centerX: distance,
    centerY: distance,
    radius: distance,
    colors: colorVector,
    stops: scalarVector,
    tileMode: tileMode,
    imageStyle: imageStyle,
    disableCache: bool
  },

  SweepGradient: {
    cx: distance,
    cy: distance,
    colors: colorVector,
    positions: scalarVector,
    imageStyle: imageStyle,
    disableCache: bool
  },

  PorterDuffColorFilter: {
    color: color,
    mode: porterDuffMode,
    image: image,
    disableCache: bool
  },

  PorterDuffXfermode: {
    mode: porterDuffMode,
    scaleMode: scaleMode,
    dstImage: image,
    dstGravityAxis: gravityAxis,
    dstResizeMode: resizeMode,
    srcImage: image,
    srcGravityAxis: gravityAxis,
    srcResizeMode: resizeMode,
    disableCache: bool
  }
}
