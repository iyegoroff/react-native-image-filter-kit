import matrixFilters from './matrix-filters';
import nativeFilters from './native-filters';
import FilterableImage from './filterable-image';

module.exports = {
  ...matrixFilters,
  ...nativeFilters,
  FilterableImage
};