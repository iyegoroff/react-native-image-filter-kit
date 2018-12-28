interface Offset {
  readonly x?: number
  readonly y?: number
}

type ResizeMode = 'COVER' | 'CONTAIN' | 'STRETCH' | { width?: number; height?: number }

interface CompositionConfig {
  readonly dstImage: unknown
  readonly srcImage: unknown
  readonly dstResizeMode?: ResizeMode
  readonly dstAnchor?: Offset
  readonly dstPosition?: Offset
  readonly srcResizeMode?: ResizeMode
  readonly srcAnchor?: Offset
  readonly srcPosition?: Offset
  readonly disableCache?: boolean
  readonly resizeCanvasTo?: 'dstImage' | 'srcImage'
  readonly swapImages?: boolean
}

const asNativeCompositionConfig = (
  name: string,
  srcPlaceholder?: unknown,
  dstPlaceholder?: unknown
) => ({
  dstImage,
  srcImage,
  dstResizeMode,
  srcResizeMode,
  dstAnchor,
  srcAnchor,
  dstPosition,
  srcPosition,
  ...config
}: CompositionConfig) => ({
  inputImage: srcPlaceholder || srcImage,
  inputImageResizeMode: srcResizeMode,
  inputImageAnchor: srcAnchor,
  inputImagePosition: srcPosition,
  inputBackgroundImage: dstPlaceholder || dstImage,
  inputBackgroundImageResizeMode: dstResizeMode,
  inputBackgroundImageAnchor: dstAnchor,
  inputBackgroundImagePosition: dstPosition,
  ...config,
  name
})

const asInvertedNativeCompositionConfig = (name: string) => ({
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
}: CompositionConfig) => {
  // console.warn(resizeCanvasTo)
  return ({
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
}

export const shapeTransforms = {
  SrcATopComposition: asNativeCompositionConfig('IosCISourceAtopCompositing'),

  DstATopComposition: asInvertedNativeCompositionConfig('IosCISourceAtopCompositing'),

  DstInComposition: asInvertedNativeCompositionConfig('IosCISourceInCompositing'),

  DstOutComposition: asInvertedNativeCompositionConfig('IosCISourceOutCompositing'),

  DstOverComposition: asInvertedNativeCompositionConfig('IosCISourceOverCompositing'),

  SrcInComposition: asNativeCompositionConfig('IosCISourceInCompositing'),

  SrcOutComposition: asNativeCompositionConfig('IosCISourceOutCompositing'),

  SrcOverComposition: asNativeCompositionConfig('IosCISourceOverCompositing'),

  XorComposition: asNativeCompositionConfig('IosIFKXorCompositing')
}
