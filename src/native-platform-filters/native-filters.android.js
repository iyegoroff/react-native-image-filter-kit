import {
  scalar,
  scalarVector,
  offset,
  color,
  colorVector,
  enumeration,
  distance
} from '../common/input-types';
import { generatedImage, inputImage, inputBackgroundImage, inputMask } from '../common/image-names';
import { filter, generator } from '../common/utils';

export default {
  ColorMatrixColorFilter: filter({
    matrix: scalarVector
  }),

  IterativeBoxBlur: filter({
    blurRadius: scalar,
    iterations: scalar
  }),

  LightingColorFilter: filter({
    mul: color,
    add: color
  }),

  RoundAsCircle: filter({}),

  Color: generator({
    color: color
  }),

  LinearGradient: generator({
    x0: distance,
    y0: distance,
    x1: distance,
    y1: distance,
    colors: colorVector,
    locations: scalarVector,
    tile: enumeration
  }),

  RadialGradient: generator({
    centerX: distance,
    centerY: distance,
    radius: distance,
    colors: colorVector,
    stops: scalarVector,
    tileMode: enumeration
  }),

  SweepGradient: generator({
    cx: distance,
    cy: distance,
    colors: colorVector,
    positions: scalarVector
  }),

  PorterDuffColorFilter: filter({
    color: color,
    mode: enumeration
  })
};
