import { bool, image, resizeMode, color, offset, text, marker, size } from './inputs'

export const Composition = {
  dstImage: image,
  dstAnchor: offset,
  dstPosition: offset,
  dstResizeMode: resizeMode,
  srcImage: image,
  srcAnchor: offset,
  srcPosition: offset,
  srcResizeMode: resizeMode,
  resizeCanvasTo: text,
  disableCache: bool,
  swapImages: bool,
  size: size
}

export const Common = {
  image: image,
  disableCache: bool,
  size: size
}

export const BlendColor = {
  dstImage: image,
  srcColor: color,
  disableCache: bool,
  size: size
}

export const Generator = {
  ...Common,
  isGenerator: marker
}

export const CompositionIos = {
  resizeCanvasTo: text,
  inputImage: image,
  inputImageResizeMode: resizeMode,
  inputImageAnchor: offset,
  inputImagePosition: offset,
  inputBackgroundImage: image,
  inputBackgroundImageResizeMode: resizeMode,
  inputBackgroundImageAnchor: offset,
  inputBackgroundImagePosition: offset,
  clampToExtent: bool,
  disableCache: bool,
  swapImages: bool,
  size: size
}

export const CommonIos = {
  inputImage: image,
  clampToExtent: bool,
  disableCache: bool,
  size: size
}

export const GeneratorIos = {
  ...CommonIos,
  isGenerator: marker
}
