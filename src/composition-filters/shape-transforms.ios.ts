interface Offset {
  readonly x?: number
  readonly y?: number
}

type ResizeMode = 'COVER' | 'CONTAIN' | 'STRETCH' | { width?: number; height?: number }

interface BlendConfig {
  readonly dstImage: unknown
  readonly srcImage: unknown
  readonly dstResizeMode?: ResizeMode
  readonly dstAnchor?: Offset
  readonly dstPosition?: Offset
  readonly srcResizeMode?: ResizeMode
  readonly srcAnchor?: Offset
  readonly srcPosition?: Offset
  readonly disableCache?: boolean
  readonly disableIntermediateCaches?: boolean
  readonly resizeCanvasTo?: 'dstImage' | 'srcImage'
}

const asNativeBlendConfig = (name: string) => ({
  dstImage,
  srcImage,
  dstResizeMode,
  srcResizeMode,
  dstAnchor,
  srcAnchor,
  dstPosition,
  srcPosition,
  ...config
}: BlendConfig) => ({
  inputImage: srcImage,
  inputImageResizeMode: srcResizeMode,
  inputImageAnchor: srcAnchor,
  inputImagePosition: srcPosition,
  inputBackgroundImage: dstImage,
  inputBackgroundImageResizeMode: dstResizeMode,
  inputBackgroundImageAnchor: dstAnchor,
  inputBackgroundImagePosition: dstPosition,
  ...config,
  name
})

const asInvertedNativeBlendConfig = (name: string) => ({
  dstImage,
  srcImage,
  dstResizeMode,
  srcResizeMode,
  dstAnchor,
  srcAnchor,
  dstPosition,
  srcPosition,
  resizeCanvasTo,
  ...config
}: BlendConfig) => ({
  inputImage: dstImage,
  inputImageResizeMode: dstResizeMode,
  inputImageAnchor: dstAnchor,
  inputImagePosition: dstPosition,
  inputBackgroundImage: srcImage,
  inputBackgroundImageResizeMode: srcResizeMode,
  inputBackgroundImageAnchor: srcAnchor,
  inputBackgroundImagePosition: srcPosition,
  resizeCanvasTo: resizeCanvasTo !== undefined
    ? resizeCanvasTo === 'dstImage' ? 'srcImage' : 'dstImage'
    : resizeCanvasTo,
  ...config,
  name
})

export const shapeTransforms = {
  // ClearBlend: asInvertedNativeBlendConfig('CISourceOutCompositing'),

  SrcATopBlend: asNativeBlendConfig('CISourceAtopCompositing'),

  DstATopBlend: asInvertedNativeBlendConfig('CISourceAtopCompositing'),

  DstInBlend: asInvertedNativeBlendConfig('CISourceInCompositing'),

  DstOutBlend: asInvertedNativeBlendConfig('CISourceOutCompositing'),

  DstOverBlend: asInvertedNativeBlendConfig('CISourceOverCompositing'),

  SrcInBlend: asNativeBlendConfig('CISourceInCompositing'),

  SrcOutBlend: asNativeBlendConfig('CISourceOutCompositing'),

  SrcOverBlend: asNativeBlendConfig('CISourceOverCompositing'),

  XorBlend: asNativeBlendConfig('CIDifferenceBlendMode')

  // DstBlend: asNativeBlendConfig('DST'),

  // SrcBlend: asNativeBlendConfig('SRC'),
}
