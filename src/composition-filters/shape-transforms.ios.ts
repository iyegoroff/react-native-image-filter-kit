interface Offset {
  readonly x?: number
  readonly y?: number
}

type Angle = number | string

type Scale = 'COVER' | 'CONTAIN' | 'STRETCH' | { width?: number; height?: number }

interface CompositionConfig {
  readonly dstImage: unknown
  readonly srcImage: unknown
  readonly dstScale?: Scale
  readonly dstAnchor?: Offset
  readonly dstPosition?: Offset
  readonly dstRotate?: Angle
  readonly srcScale?: Scale
  readonly srcAnchor?: Offset
  readonly srcPosition?: Offset
  readonly srcRotate?: Angle
  readonly disableCache?: boolean
  readonly resizeCanvasTo?: 'dstImage' | 'srcImage'
  readonly swapImages?: boolean
}

const asNativeCompositionConfig = (name: string) => ({
  dstImage,
  srcImage,
  dstScale,
  srcScale,
  dstAnchor,
  srcAnchor,
  dstPosition,
  srcPosition,
  dstRotate,
  srcRotate,
  ...config
}: CompositionConfig) => ({
  inputImage: srcImage,
  inputImageScale: srcScale,
  inputImageAnchor: srcAnchor,
  inputImagePosition: srcPosition,
  inputImageRotate: srcRotate,
  inputBackgroundImage: dstImage,
  inputBackgroundImageScale: dstScale,
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
