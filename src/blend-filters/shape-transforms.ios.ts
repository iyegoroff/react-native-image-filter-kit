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

const asNativeBlendConfig = (name: string) => ({
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
  ...config,
  name
})

const asNativeBlendColorConfig = (name: string) => (
  { srcColor, dstImage, disableIntermediateCaches = true, ...config }: ColorBlendConfig
) => ({
  ...config,
  name,
  inputImage: {
    name: 'CIConstantColorGenerator',
    inputColor: srcColor,
    disableCache: disableIntermediateCaches
  },
  resizeCanvasTo: 'dstImage',
  inputBackgroundImage: dstImage
})

export const shapeTransforms = {
  PlusBlend: asNativeBlendConfig('CIAdditionCompositing'),

  DarkenBlend: asNativeBlendConfig('CIDarkenBlendMode'),

  LightenBlend: asNativeBlendConfig('CILightenBlendMode'),

  OverlayBlend: asNativeBlendConfig('CIOverlayBlendMode'),

  ScreenBlend: asNativeBlendConfig('CIScreenBlendMode'),

  ModulateBlend: asNativeBlendConfig('CIMultiplyCompositing'),

  MultiplyBlend: asNativeBlendConfig('CIMultiplyBlendMode'),

  ColorDodgeBlend: asNativeBlendConfig('CIColorDodgeBlendMode'),

  ExclusionBlend: asNativeBlendConfig('CIExclusionBlendMode'),

  ColorBurnBlend: asNativeBlendConfig('CIColorBurnBlendMode'),

  SoftLightBlend: asNativeBlendConfig('CISoftLightBlendMode'),

  HueBlend: asNativeBlendConfig('CIHueBlendMode'),

  ColorBlend: asNativeBlendConfig('CIColorBlendMode'),

  HardLightBlend: asNativeBlendConfig('CIHardLightBlendMode'),

  DifferenceBlend: asNativeBlendConfig('CIDifferenceBlendMode'),

  SaturationBlend: asNativeBlendConfig('CISaturationBlendMode'),

  LuminosityBlend: asNativeBlendConfig('CILuminosityBlendMode'),

  PlusBlendColor: asNativeBlendColorConfig('CIAdditionCompositing'),

  DarkenBlendColor: asNativeBlendColorConfig('CIDarkenBlendMode'),

  LightenBlendColor: asNativeBlendColorConfig('CILightenBlendMode'),

  ModulateBlendColor: asNativeBlendColorConfig('CIMultiplyCompositing'),

  MultiplyBlendColor: asNativeBlendColorConfig('CIMultiplyBlendMode'),

  OverlayBlendColor: asNativeBlendColorConfig('CIOverlayBlendMode'),

  ScreenBlendColor: asNativeBlendColorConfig('CIScreenBlendMode'),

  ColorDodgeBlendColor: asNativeBlendColorConfig('CIColorDodgeBlendMode'),

  ExclusionBlendColor: asNativeBlendColorConfig('CIExclusionBlendMode'),

  ColorBurnBlendColor: asNativeBlendColorConfig('CIColorBurnBlendMode'),

  SoftLightBlendColor: asNativeBlendColorConfig('CISoftLightBlendMode'),

  HueBlendColor: asNativeBlendColorConfig('CIHueBlendMode'),

  ColorBlendColor: asNativeBlendColorConfig('CIColorBlendMode'),

  SaturationBlendColor: asNativeBlendColorConfig('CISaturationBlendMode'),

  LuminosityBlendColor: asNativeBlendColorConfig('CILuminosityBlendMode'),

  DifferenceBlendColor: asNativeBlendColorConfig('CIDifferenceBlendMode'),

  HardLightBlendColor: asNativeBlendColorConfig('CIHardLightBlendMode')
}
