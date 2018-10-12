import {
  scalar,
  scalarVector,
  color,
  colorVector,
  distance,
  image,
  tileMode,
  porterDuffMode,
  generatedImageStyle
} from './inputs';

export default {
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
    imageStyle: generatedImageStyle
  },

  LinearGradient: {
    x0: distance,
    y0: distance,
    x1: distance,
    y1: distance,
    colors: colorVector,
    locations: scalarVector,
    tile: tileMode,
    imageStyle: generatedImageStyle
  },

  RadialGradient: {
    centerX: distance,
    centerY: distance,
    radius: distance,
    colors: colorVector,
    stops: scalarVector,
    tileMode: tileMode,
    imageStyle: generatedImageStyle
  },

  SweepGradient: {
    cx: distance,
    cy: distance,
    colors: colorVector,
    positions: scalarVector,
    imageStyle: generatedImageStyle
  },

  PorterDuffColorFilter: {
    color: color,
    mode: porterDuffMode,
    image: image
  },

  PorterDuffXfermode: {
    mode: porterDuffMode,
    srcImage: image,
    dstImage: image
  }
};
