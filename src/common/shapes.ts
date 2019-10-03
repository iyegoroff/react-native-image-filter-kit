import { bool, image, color, text, marker, transform } from './inputs'

export type TransformMap<Shapes> = { [P in keyof Shapes]: unknown }

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

export const CommonIos = {
  inputImage: image,
  clampToExtent: bool,
  disableCache: bool
}

export const CompositionBaseIos = {
  ...CommonIos,
  resizeCanvasTo: text,
  inputImageTransform: transform,
  swapImages: bool
}

export const GeneratorIos = {
  ...CommonIos,
  isGenerator: marker
}
