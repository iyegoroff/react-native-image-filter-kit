import colorMatrixFilters from './color-matrix-filters';
import nativePlatformFilters from './native-platform-filters';
import { ImagePlaceholder, imagePlaceholderSource } from './common/image-placeholder';
import colorMatrices from 'rn-color-matrices';
import { concatColorMatrices } from 'concat-color-matrices';

module.exports = {
  ...colorMatrixFilters,
  ...nativePlatformFilters,
  ...colorMatrices,
  concatColorMatrices,
  ImagePlaceholder,
  imagePlaceholderSource
};