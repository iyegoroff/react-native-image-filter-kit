import { TransformMap } from '../common/shapes'
import { shapes } from './shapes'

const asNativeCompositionConfig = (mode: string) => (config: Object) => ({
  ...config,
  mode,
  name: 'AndroidPorterDuffXfermode'
})

const asRenderscriptCompositingConfig = (name: string) => (config: Object) => ({
  ...config,
  name
})

export const shapeTransforms: TransformMap<typeof shapes> = {
  DstATopComposition: asRenderscriptCompositingConfig('AndroidDestinationATopCompositing'),

  DstInComposition: asRenderscriptCompositingConfig('AndroidDestinationInCompositing'),

  DstOutComposition: asNativeCompositionConfig('DST_OUT'),

  DstOverComposition: asNativeCompositionConfig('DST_OVER'),

  SrcATopComposition: asNativeCompositionConfig('SRC_ATOP'),

  SrcInComposition: asRenderscriptCompositingConfig('AndroidSourceInCompositing'),

  SrcOutComposition: asRenderscriptCompositingConfig('AndroidSourceOutCompositing'),

  SrcOverComposition: asNativeCompositionConfig('SRC_OVER'),

  XorComposition: asNativeCompositionConfig('XOR')
}
