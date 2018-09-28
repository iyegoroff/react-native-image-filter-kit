import { scalar, vector, offset, color, colors, enumeration } from '../common/input-types';
import { generatedImage, inputImage, inputBackgroundImage, inputMask } from '../common/image-names';
import { filter, generator } from '../common/utils';

export default {
  ColorMatrixColorFilter: filter({
    matrix: vector
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
    x0: scalar,
    y0: scalar,
    x1: scalar,
    y1: scalar,
    colors: colors,
    locations: vector,
    tile: enumeration
  })
};
