import { distance, position, scalar, vector, offset, color } from '../common/input-types';
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

  RoundAsCircle: filter({})
};
