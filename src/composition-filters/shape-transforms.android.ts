const asNativeCompositionConfig = (mode: String) => (config: Object) => ({
  ...config,
  mode,
  name: 'PorterDuffXfermode'
})

export const shapeTransforms = {
  ClearBlend: asNativeCompositionConfig('CLEAR'),

  DstBlend: asNativeCompositionConfig('DST'),

  DstATopBlend: asNativeCompositionConfig('DST_ATOP'),

  DstInBlend: asNativeCompositionConfig('DST_IN'),

  DstOutBlend: asNativeCompositionConfig('DST_OUT'),

  DstOverBlend: asNativeCompositionConfig('DST_OVER'),

  SrcBlend: asNativeCompositionConfig('SRC'),

  SrcATopBlend: asNativeCompositionConfig('SRC_ATOP'),

  SrcInBlend: asNativeCompositionConfig('SRC_IN'),

  SrcOutBlend: asNativeCompositionConfig('SRC_OUT'),

  SrcOverBlend: asNativeCompositionConfig('SRC_OVER'),

  XorBlend: asNativeCompositionConfig('XOR')
}
