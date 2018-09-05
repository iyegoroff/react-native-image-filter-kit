import matrixFilters from './matrix-filters';
import nativeFilters from './native-filters';
import { ImagePlaceholder, imagePlaceholderSource } from './image-placeholder';

module.exports = {
  ...matrixFilters,
  ...nativeFilters,
  ImagePlaceholder,
  imagePlaceholderSource
};