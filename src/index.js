import colorMatrixFilters from './color-matrix-filters';
import nativePlatformFilters from './native-platform-filters';
import cssgramFilters from './cssgram-filters';
import { ImagePlaceholder, imagePlaceholderSource } from './common/image-placeholder';
import colorMatrices from 'rn-color-matrices';
import { concatColorMatrices } from 'concat-color-matrices';
import { luminanceToAlpha } from './color-matrix-filters/shape-transforms';
import rgbaToRgb from './common/rgba-to-rgb';

module.exports = {
  ...colorMatrixFilters,
  ...nativePlatformFilters,
  ...cssgramFilters,
  ...colorMatrices,
  luminanceToAlpha,
  rgbaToRgb,
  concatColorMatrices,
  ImagePlaceholder,
  imagePlaceholderSource
};
