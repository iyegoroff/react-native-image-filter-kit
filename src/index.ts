import colorMatrixFilters from './color-matrix-filters'
import cssgramFilters from './cssgram-filters'
import blendFilters from './blend-filters'
import nativePlatformFilters from './native-platform-filters'
import { ImagePlaceholder, imagePlaceholderSource } from './common/image-placeholder'
import colorMatrices from 'rn-color-matrices'
import { concatColorMatrices } from 'concat-color-matrices'
import { luminanceToAlpha } from './color-matrix-filters/shape-transforms'
import rgbaToRgb from 'rgba-to-rgb'

const exports = {
  ...colorMatrixFilters,
  ...nativePlatformFilters,
  ...cssgramFilters,
  ...colorMatrices,
  ...blendFilters,
  luminanceToAlpha,
  rgbaToRgb,
  concatColorMatrices,
  ImagePlaceholder,
  imagePlaceholderSource
}

declare const module: { exports: typeof exports }
module.exports = exports
