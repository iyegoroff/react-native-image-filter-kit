const asNativeCompositionConfig = (mode: String) => (config: Object) => ({
  ...config,
  mode,
  name: 'PorterDuffXfermode'
})

const asRenderscriptCompositingConfig = (name: string) => (config: Object) => ({
  ...config,
  name
})

export const shapeTransforms = {
  // ClearComposition: asNativeCompositionConfig('CLEAR'),

  // DstComposition: asNativeCompositionConfig('DST'),

  DstATopComposition: asRenderscriptCompositingConfig('DestinationATopCompositing'),

  DstInComposition: asRenderscriptCompositingConfig('DestinationInCompositing'),

  DstOutComposition: asNativeCompositionConfig('DST_OUT'),

  DstOverComposition: asNativeCompositionConfig('DST_OVER'),

  // SrcComposition: asNativeCompositionConfig('SRC'),

  SrcATopComposition: asNativeCompositionConfig('SRC_ATOP'),

  SrcInComposition: asRenderscriptCompositingConfig('SourceInCompositing'),

  SrcOutComposition: asRenderscriptCompositingConfig('SourceOutCompositing'),

  SrcOverComposition: asNativeCompositionConfig('SRC_OVER'),

  XorComposition: asNativeCompositionConfig('XOR')
}
