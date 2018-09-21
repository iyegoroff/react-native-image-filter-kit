import matrixFilters from './color-matrix-filters';
import nativeFilters from './native-platform-filters';
import { ImagePlaceholder, imagePlaceholderSource } from './common/image-placeholder';
import colorMatrices from 'rn-color-matrices';
import { concatColorMatrices } from 'concat-color-matrices';

module.exports = {
  ...matrixFilters,
  ...nativeFilters,
  ...colorMatrices,
  concatColorMatrices,
  ImagePlaceholder,
  imagePlaceholderSource
};