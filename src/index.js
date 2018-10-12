import colorMatrixFilters from './color-matrix-filters';
import nativeFilters from './native-filters';
import { ImagePlaceholder, imagePlaceholderSource } from './native-filters/image-placeholder';
import colorMatrices from 'rn-color-matrices';
import { concatColorMatrices } from 'concat-color-matrices';

module.exports = {
  ...colorMatrixFilters,
  ...nativeFilters,
  ...colorMatrices,
  concatColorMatrices,
  ImagePlaceholder,
  imagePlaceholderSource
};
