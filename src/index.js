import matrixFilters from './matrix-filters';
import nativeFilters from './native-filters';
console.log({
  ...matrixFilters,
  ...nativeFilters
});
module.exports = {
  ...matrixFilters,
  ...nativeFilters
};