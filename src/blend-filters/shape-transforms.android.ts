export const shapeTransforms = {
  PlusBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'ADD'
  }),

  ClearBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'CLEAR'
  }),

  DarkenBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'DARKEN'
  }),

  DstBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'DST'
  }),

  DstATopBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'DST_ATOP'
  }),

  DstInBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'DST_IN'
  }),

  DstOutBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'DST_OUT'
  }),

  DstOverBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'DST_OVER'
  }),

  LightenBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'LIGHTEN'
  }),

  ModulateBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'MULTIPLY'
  }),

  OverlayBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'OVERLAY'
  }),

  ScreenBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'SCREEN'
  }),

  SrcBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'SRC'
  }),

  SrcATopBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'SRC_ATOP'
  }),

  SrcInBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'SRC_IN'
  }),

  SrcOutBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'SRC_OUT'
  }),

  SrcOverBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'SRC_OVER'
  }),

  XorBlend: (config: Object) => ({
    ...config,
    name: 'PorterDuffXfermode',
    mode: 'XOR'
  })
}
