// tslint:disable:max-file-line-count

interface ColorBlendConfig {
  readonly dstImage: unknown
  readonly srcColor: string
  readonly disableCache?: boolean
  readonly disableIntermediateCaches?: boolean
}

interface Offset {
  readonly x?: number
  readonly y?: number
}

type ResizeMode = 'COVER' | 'CONTAIN' | 'STRETCH' | { width?: number; height?: number }

type ScaleMode = 'UP' | 'DOWN' | { match?: 'dstImage' | 'srcImage' }

interface BlendConfig {
  readonly dstImage: unknown
  readonly srcImage: unknown
  readonly dstResizeMode?: ResizeMode
  readonly dstAnchor?: Offset
  readonly dstPosition?: Offset
  readonly srcResizeMode?: ResizeMode
  readonly srcAnchor?: Offset
  readonly srcPosition?: Offset
  readonly scaleMode?: ScaleMode
  readonly disableCache?: boolean
  readonly disableIntermediateCaches?: boolean
}

const asNativeBlendConfig = ({
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
  ...config
})

const asInvertedNativeBlendConfig = ({
  dstImage,
  srcImage,
  dstResizeMode,
  srcResizeMode,
  dstAnchor,
  srcAnchor,
  dstPosition,
  srcPosition,
  scaleMode,
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
  scaleMode: scaleMode !== undefined && scaleMode.match !== undefined
    ? { match: scaleMode.match === 'dstImage' ? 'srcImage' : 'dstImage' }
    : scaleMode,
  ...config
})

// const asNativeBlendColorConfig = ({ disableCache, dstImage, srcColor }: ColorBlendConfig) => ({
//   name: 'PorterDuffColorFilter',
//   image: dstImage,
//   color: srcColor,
//   disableCache
// })

// const asRenderscriptBlendColorConfig = (
//   { srcColor, disableIntermediateCaches = true, ...config }: ColorBlendConfig
// ) => ({
//   ...config,
//   scaleMode: { match: 'dstImage' },
//   srcImage: {
//     name: 'Color',
//     color: srcColor,
//     disableCache: disableIntermediateCaches
//   }
// })

export const shapeTransforms = {
  PlusBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIAdditionCompositing'
  }),

  // ClearBlend: (config: BlendConfig) => ({
  //   ...asInvertedNativeBlendConfig(config),
  //   name: 'CISourceOutCompositing'
  // }),

  DarkenBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIDarkenBlendMode'
  }),

  LightenBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CILightenBlendMode'
  }),

  SrcATopBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CISourceAtopCompositing'
  }),

  DstATopBlend: (config: BlendConfig) => ({
    ...asInvertedNativeBlendConfig(config),
    name: 'CISourceAtopCompositing'
  }),

  DstInBlend: (config: BlendConfig) => ({
    ...asInvertedNativeBlendConfig(config),
    name: 'CISourceInCompositing'
  }),

  DstOutBlend: (config: BlendConfig) => ({
    ...asInvertedNativeBlendConfig(config),
    name: 'CISourceOutCompositing'
  }),

  DstOverBlend: (config: BlendConfig) => ({
    ...asInvertedNativeBlendConfig(config),
    name: 'CISourceOverCompositing'
  }),

  OverlayBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIOverlayBlendMode'
  }),

  ScreenBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIScreenBlendMode'
  }),

  ModulateBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIMultiplyCompositing'
  }),

  MultiplyBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIMultiplyBlendMode'
  }),

  SrcInBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CISourceInCompositing'
  }),

  SrcOutBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CISourceOutCompositing'
  }),

  SrcOverBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CISourceOverCompositing'
  }),

  XorBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIDifferenceBlendMode'
  }),

  ColorBurnBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIColorBurnBlendMode'
  }),

  SoftLightBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CISoftLightBlendMode'
  }),

  HardLightBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIHardLightBlendMode'
  }),

  DifferenceBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIDifferenceBlendMode'
  }),

  ExclusionBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIExclusionBlendMode'
  })

  // DstBlend: (config: Object) => ({
  //   ...asNativeBlendConfig(config),
  //   mode: 'DST'
  // }),

  // SrcBlend: (config: Object) => ({
  //   ...asNativeBlendConfig(config),
  //   mode: 'SRC'
  // }),

  // PlusBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'ADD'
  // }),

  // ClearBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'CLEAR'
  // }),

  // DarkenBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'DARKEN'
  // }),

  // DstBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'DST'
  // }),

  // DstATopBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'DST_ATOP'
  // }),

  // DstInBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'DST_IN'
  // }),

  // DstOutBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'DST_OUT'
  // }),

  // DstOverBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'DST_OVER'
  // }),

  // LightenBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'LIGHTEN'
  // }),

  // ModulateBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'MULTIPLY'
  // }),

  // OverlayBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'OVERLAY'
  // }),

  // ScreenBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'SCREEN'
  // }),

  // SrcBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'SRC'
  // }),

  // SrcATopBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'SRC_ATOP'
  // }),

  // SrcInBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'SRC_IN'
  // }),

  // SrcOutBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'SRC_OUT'
  // }),

  // SrcOverBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'SRC_OVER'
  // }),

  // XorBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'XOR'
  // }),

  // ColorDodgeBlendColor: (config: ColorBlendConfig) => ({
  //   ...asRenderscriptBlendColorConfig(config),
  //   name: 'ColorDodgeBlend'
  // }),

  // ExclusionBlendColor: (config: ColorBlendConfig) => ({
  //   ...asRenderscriptBlendColorConfig(config),
  //   name: 'ExclusionBlend'
  // }),

  // ColorBurnBlendColor: (config: ColorBlendConfig) => ({
  //   ...asRenderscriptBlendColorConfig(config),
  //   name: 'ColorBurnBlend'
  // }),

  // SoftLightBlendColor: (config: ColorBlendConfig) => ({
  //   ...asRenderscriptBlendColorConfig(config),
  //   name: 'SoftLightBlend'
  // }),

  // HueBlendColor: (config: ColorBlendConfig) => ({
  //   ...asRenderscriptBlendColorConfig(config),
  //   name: 'HueBlend'
  // }),

  // ColorBlendColor: (config: ColorBlendConfig) => ({
  //   ...asRenderscriptBlendColorConfig(config),
  //   name: 'ColorBlend'
  // }),

  // SaturationBlendColor: (config: ColorBlendConfig) => ({
  //   ...asRenderscriptBlendColorConfig(config),
  //   name: 'SaturationBlend'
  // }),

  // LuminosityBlendColor: (config: ColorBlendConfig) => ({
  //   ...asRenderscriptBlendColorConfig(config),
  //   name: 'LuminosityBlend'
  // }),

  // DifferenceBlendColor: (config: ColorBlendConfig) => ({
  //   ...asRenderscriptBlendColorConfig(config),
  //   name: 'DifferenceBlend'
  // }),

  // HardLightBlendColor: (config: ColorBlendConfig) => ({
  //   ...asRenderscriptBlendColorConfig(config),
  //   name: 'HardLightBlend'
  // }),

  // MultiplyBlendColor: (config: ColorBlendConfig) => ({
  //   ...asRenderscriptBlendColorConfig(config),
  //   name: 'MultiplyBlend'
  // })
}
