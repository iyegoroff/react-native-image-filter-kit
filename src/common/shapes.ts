import { bool, scaleMode, image, resizeMode, color, imageStyle, offset } from './inputs'

export const Composition = {
  scaleMode: scaleMode,
  dstImage: image,
  dstAnchor: offset,
  dstPosition: offset,
  dstResizeMode: resizeMode,
  srcImage: image,
  srcAnchor: offset,
  srcPosition: offset,
  srcResizeMode: resizeMode,
  disableCache: bool
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
