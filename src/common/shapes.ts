import { bool, image, resizeMode, color, imageStyle, offset, text } from './inputs'

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
  imageStyle: imageStyle,
  disableCache: bool
}

export const BlendIos = {
  resizeCanvasTo: text,
  inputImage: image,
  inputImageResizeMode: resizeMode,
  inputImageAnchor: offset,
  inputImagePosition: offset,
  inputBackgroundImage: image,
  inputBackgroundImageResizeMode: resizeMode,
  inputBackgroundImageAnchor: offset,
  inputBackgroundImagePosition: offset,
  disableCache: bool,
  swapImages: bool
}

export const CommonIos = {
  inputImage: image,
  disableCache: bool
}
