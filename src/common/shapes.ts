import { bool, scaleMode, image, resizeMode, gravityAxis, color } from './inputs'

export const Blend = {
  scaleMode: scaleMode,
  dstImage: image,
  dstGravityAxis: gravityAxis,
  dstResizeMode: resizeMode,
  srcImage: image,
  srcGravityAxis: gravityAxis,
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
