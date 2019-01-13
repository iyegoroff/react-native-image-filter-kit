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
  readonly dstRotate?: number
  readonly srcResizeMode?: ResizeMode
  readonly srcAnchor?: Offset
  readonly srcPosition?: Offset
  readonly srcRotate?: number
  readonly disableCache?: boolean
  readonly resizeCanvasTo?: 'dstImage' | 'srcImage'
  readonly swapImages?: boolean
}

const asNativeCompositionConfig = (name: string) => ({
  dstImage,
  srcImage,
  dstResizeMode,
  srcResizeMode,
  dstAnchor,
  srcAnchor,
  dstPosition,
  srcPosition,
  dstRotate,
  srcRotate,
  ...config
}: CompositionConfig) => ({
  inputImage: srcImage,
  inputImageResizeMode: srcResizeMode,
  inputImageAnchor: srcAnchor,
  inputImagePosition: srcPosition,
  inputImageRotate: srcRotate,
  inputBackgroundImage: dstImage,
  inputBackgroundImageResizeMode: dstResizeMode,
  inputBackgroundImageAnchor: dstAnchor,
  inputBackgroundImagePosition: dstPosition,
  inputBackgroundImageRotate: dstRotate,
  ...config,
  name
})

const asInvertedNativeCompositionConfig = (name: string) => (config: CompositionConfig) => ({
  ...asNativeCompositionConfig(name)(config),
  swapImages: !config.swapImages
})

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
