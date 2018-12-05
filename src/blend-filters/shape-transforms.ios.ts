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

interface BlendConfig {
  readonly dstImage: unknown
  readonly srcImage: unknown
  readonly dstResizeMode?: ResizeMode
  readonly dstAnchor?: Offset
  readonly dstPosition?: Offset
  readonly srcResizeMode?: ResizeMode
  readonly srcAnchor?: Offset
  readonly srcPosition?: Offset
  readonly disableCache?: boolean
  readonly disableIntermediateCaches?: boolean
  readonly resizeCanvasTo?: 'dstImage' | 'srcImage'
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
  resizeCanvasTo,
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
  resizeCanvasTo: resizeCanvasTo !== undefined
    ? resizeCanvasTo === 'dstImage' ? 'srcImage' : 'dstImage'
    : resizeCanvasTo,
  ...config
})

const asNativeBlendColorConfig = (
  { srcColor, dstImage, disableIntermediateCaches = true, ...config }: ColorBlendConfig
) => ({
  ...config,
  swapImages: true,
  inputImage: dstImage,
  resizeCanvasTo: 'srcImage',
  inputBackgroundImage: {
    name: 'CIConstantColorGenerator',
    inputColor: srcColor,
    disableCache: disableIntermediateCaches
  }
})

const asInvertedNativeBlendColorConfig = (config: ColorBlendConfig) => ({
  ...asNativeBlendColorConfig(config),
  swapImages: false
})

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

  ColorDodgeBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIColorDodgeBlendMode'
  }),

  ExclusionBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIExclusionBlendMode'
  }),

  ColorBurnBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIColorBurnBlendMode'
  }),

  SoftLightBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CISoftLightBlendMode'
  }),

  HueBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIHueBlendMode'
  }),

  ColorBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIColorBlendMode'
  }),

  HardLightBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIHardLightBlendMode'
  }),

  DifferenceBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CIDifferenceBlendMode'
  }),

  SaturationBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CISaturationBlendMode'
  }),

  LuminosityBlend: (config: BlendConfig) => ({
    ...asNativeBlendConfig(config),
    name: 'CILuminosityBlendMode'
  }),

  // DstBlend: (config: Object) => ({
  //   ...asNativeBlendConfig(config),
  //   mode: 'DST'
  // }),

  // SrcBlend: (config: Object) => ({
  //   ...asNativeBlendConfig(config),
  //   mode: 'SRC'
  // }),

  PlusBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CIAdditionCompositing'
  }),

  // ClearBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'CLEAR'
  // }),

  DarkenBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CIDarkenBlendMode'
  }),

  // DstBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'DST'
  // }),

  DstATopBlendColor: (config: ColorBlendConfig) => ({
    ...asInvertedNativeBlendColorConfig(config),
    name: 'CISourceAtopCompositing'
  }),

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

  LightenBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CILightenBlendMode'
  }),

  ModulateBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CIMultiplyCompositing'
  }),

  MultiplyBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CIMultiplyBlendMode'
  }),

  OverlayBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CIOverlayBlendMode'
  }),

  ScreenBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CIScreenBlendMode'
  }),

  // SrcBlendColor: (config: ColorBlendConfig) => ({
  //   ...asNativeBlendColorConfig(config),
  //   mode: 'SRC'
  // }),

  SrcATopBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CISourceAtopCompositing'
  }),

  SrcInBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CISourceInCompositing'
  }),

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

  ColorDodgeBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CIColorDodgeBlendMode'
  }),

  ExclusionBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CIExclusionBlendMode'
  }),

  ColorBurnBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CIColorBurnBlendMode'
  }),

  SoftLightBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CISoftLightBlendMode'
  }),

  HueBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CIHueBlendMode'
  }),

  ColorBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CIColorBlendMode'
  }),

  SaturationBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CISaturationBlendMode'
  }),

  LuminosityBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CILuminosityBlendMode'
  }),

  DifferenceBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CIDifferenceBlendMode'
  }),

  HardLightBlendColor: (config: ColorBlendConfig) => ({
    ...asNativeBlendColorConfig(config),
    name: 'CIHardLightBlendMode'
  })
}
