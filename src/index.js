import matrixFilters from './color-matrix-filters';
import nativeFilters from './native-platform-filters';
import { ImagePlaceholder, imagePlaceholderSource } from './common/image-placeholder';

module.exports = {
  ...matrixFilters,
  ...nativeFilters,
  ImagePlaceholder,
  imagePlaceholderSource
};