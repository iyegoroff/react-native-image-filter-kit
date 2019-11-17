import blurFilters from './blur-filters'
import generators from './generators'
import colorMatrixFilters from './color-matrix-filters'
import cssgramFilters from './cssgram-filters'
import blendFilters from './blend-filters'
import miscFilters from './misc-filters'
import compositionFilters from './composition-filters'
import convolveMatrixFilters from './convolve-matrix-filters'
import nativePlatformFilters from './native-platform-filters'
import { ImagePlaceholder, ImageBackgroundPlaceholder } from './common/image-placeholder'
import registerFilter from './common/register-filter'
import colorMatrices from 'rn-color-matrices'
import { concatColorMatrices } from 'concat-color-matrices'
import rgbaToRgb from 'rgba-to-rgb'
import { cubicTo, lineTo, quadTo, moveTo, closePath } from './common/path'
import { cleanExtractedImagesCache } from './common/extracted-images-cache'

const exports = {
  ...blurFilters,
  ...generators,
  ...colorMatrixFilters,
  ...convolveMatrixFilters,
  ...nativePlatformFilters,
  ...cssgramFilters,
  ...colorMatrices,
  ...blendFilters,
  ...miscFilters,
  ...compositionFilters,
  rgbaToRgb,
  concatColorMatrices,
  ImagePlaceholder,
  ImageBackgroundPlaceholder,
  registerFilter,
  GenericImageFilter: nativePlatformFilters.ImageFilter,
  cubicTo,
  lineTo,
  quadTo,
  moveTo,
  closePath,
  cleanExtractedImagesCache
}

declare const module: { exports: typeof exports }
module.exports = exports
