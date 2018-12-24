const asNativeCompositionConfig = (mode: String) => (config: Object) => ({
  ...config,
  mode,
  name: 'AndroidPorterDuffXfermode'
})

const asRenderscriptCompositingConfig = (name: string) => (config: Object) => ({
  ...config,
  name
})

export const shapeTransforms = {
  // ClearComposition: asNativeCompositionConfig('CLEAR'),

  // DstComposition: asNativeCompositionConfig('DST'),

  DstATopComposition: asRenderscriptCompositingConfig('AndroidDestinationATopCompositing'),

  DstInComposition: asRenderscriptCompositingConfig('AndroidDestinationInCompositing'),

  DstOutComposition: asNativeCompositionConfig('DST_OUT'),

  DstOverComposition: asNativeCompositionConfig('DST_OVER'),

  // SrcComposition: asNativeCompositionConfig('SRC'),

  SrcATopComposition: asNativeCompositionConfig('SRC_ATOP'),

  SrcInComposition: asRenderscriptCompositingConfig('AndroidSourceInCompositing'),

  SrcOutComposition: asRenderscriptCompositingConfig('AndroidSourceOutCompositing'),

  SrcOverComposition: asNativeCompositionConfig('SRC_OVER'),

  XorComposition: asNativeCompositionConfig('XOR')
}
