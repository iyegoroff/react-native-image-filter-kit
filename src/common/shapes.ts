import { bool, image, scale, color, offset, text, marker, scalar, angle, transform } from './inputs'

export const Composition = {
  dstImage: image,
  dstAnchor: offset,
  dstPosition: offset,
  dstRotate: angle,
  dstScale: scale,
  dstTransform: transform,
  srcImage: image,
  srcAnchor: offset,
  srcPosition: offset,
  srcRotate: angle,
  srcScale: scale,
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
  inputImageScale: scale,
  inputImageAnchor: offset,
  inputImagePosition: offset,
  inputImageRotate: angle,
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
