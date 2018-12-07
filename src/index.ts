import generators from './generators'
import colorMatrixFilters from './color-matrix-filters'
import cssgramFilters from './cssgram-filters'
import blendFilters from './blend-filters'
import miscFilters from './misc-filters'
import compositionFilters from './composition-filters'
import convolveMatrixFilters from './convolve-matrix-filters'
import nativePlatformFilters from './native-platform-filters'
import { ImagePlaceholder, imagePlaceholderSource } from './common/image-placeholder'
import colorMatrices from 'rn-color-matrices'
import { concatColorMatrices } from 'concat-color-matrices'
// import { luminanceToAlpha } from './color-matrix-filters/shape-transforms'
import rgbaToRgb from 'rgba-to-rgb'

const exports = {
  ...generators,
  ...colorMatrixFilters,
  ...convolveMatrixFilters,
  ...nativePlatformFilters,
  ...cssgramFilters,
  ...colorMatrices,
  ...blendFilters,
  ...miscFilters,
  ...compositionFilters,
  // luminanceToAlpha,
  rgbaToRgb,
  concatColorMatrices,
  ImagePlaceholder,
  imagePlaceholderSource
}

declare const module: { exports: typeof exports }
module.exports = exports
