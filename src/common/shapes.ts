import { bool, image, color, text, marker, transform } from './inputs'

export const Composition = {
  dstImage: image,
  dstTransform: transform,
  srcImage: image,
  srcTransform: transform,
  resizeCanvasTo: text,
  disableCache: bool,
  swapImages: bool
}

export const Common = {
  image: image,
  disableCache: bool
}

export const BlendColor = {
  dstImage: image,
  srcColor: color,
  disableCache: bool
}

export const Generator = {
  ...Common,
  isGenerator: marker
}

export const CompositionBaseIos = {
  resizeCanvasTo: text,
  inputImage: image,
  inputImageTransform: transform,
  clampToExtent: bool,
  disableCache: bool,
  swapImages: bool
}

export const CommonIos = {
  inputImage: image,
  clampToExtent: bool,
  disableCache: bool
}

export const GeneratorIos = {
  ...CommonIos,
  isGenerator: marker
}
