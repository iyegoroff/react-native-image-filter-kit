import { TransformMap } from '../common/shapes'
import { shapes } from './shapes'

type Offset = {
  readonly x?: number
  readonly y?: number
}

type Angle = number | string

type Scale = 'COVER' | 'CONTAIN' | 'STRETCH' | { x?: number; y?: number }

type Transform = {
  readonly anchor?: Offset
  readonly translate?: Offset
  readonly scale?: Scale
  readonly rotate?: Angle
}

type CompositionConfig = {
  readonly dstImage: unknown
  readonly srcImage: unknown
  readonly dstTransform?: Transform
  readonly srcTransform?: Transform
  readonly disableCache?: boolean
  readonly resizeCanvasTo?: 'dstImage' | 'srcImage'
  readonly swapImages?: boolean
}

const asNativeCompositionConfig = (name: string) => ({
  dstImage,
  srcImage,
  dstTransform,
  srcTransform,
  ...config
}: CompositionConfig) => ({
  inputImage: srcImage,
  inputImageTransform: srcTransform,
  inputBackgroundImage: dstImage,
  inputBackgroundImageTransform: dstTransform,
  ...config,
  name
})

const asInvertedNativeCompositionConfig = (name: string) => (config: CompositionConfig) => ({
  ...asNativeCompositionConfig(name)(config),
  swapImages: !config.swapImages
})

export const shapeTransforms: TransformMap<typeof shapes> = {
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
