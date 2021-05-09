import { TransformMap } from '../common/shapes'
import { shapes } from './shapes'

type ColorBlendConfig = {
  readonly dstImage: unknown
  readonly srcColor: string
  readonly disableCache?: boolean
  readonly disableIntermediateCaches?: boolean
}

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

type BlendConfig = {
  readonly dstImage: unknown
  readonly srcImage: unknown
  readonly dstTransform?: Transform
  readonly srcTransform?: Transform
  readonly disableCache?: boolean
  readonly disableIntermediateCaches?: boolean
  readonly resizeCanvasTo?: 'dstImage' | 'srcImage'
}

const asNativeBlendConfig = (name: string) => ({
  dstImage,
  srcImage,
  srcTransform,
  dstTransform,
  ...config
}: BlendConfig) => ({
  inputImage: srcImage,
  inputImageTransform: srcTransform,
  inputBackgroundImage: dstImage,
  inputBackgroundImageTransform: dstTransform,
  ...config,
  name
})

const asNativeBlendColorConfig = (name: string) => ({
  srcColor,
  dstImage,
  disableIntermediateCaches = true,
  ...config
}: ColorBlendConfig) => ({
  ...config,
  name,
  inputImage: {
    name: 'IosCIConstantColorGenerator',
    inputColor: srcColor,
    disableCache: disableIntermediateCaches
  },
  resizeCanvasTo: 'dstImage',
  inputBackgroundImage: dstImage
})

export const shapeTransforms: TransformMap<typeof shapes> = {
  PlusBlend: asNativeBlendConfig('IosCIAdditionCompositing'),

  DarkenBlend: asNativeBlendConfig('IosCIDarkenBlendMode'),

  LightenBlend: asNativeBlendConfig('IosCILightenBlendMode'),

  OverlayBlend: asNativeBlendConfig('IosCIOverlayBlendMode'),

  ScreenBlend: asNativeBlendConfig('IosCIScreenBlendMode'),

  ModulateBlend: asNativeBlendConfig('IosCIMultiplyCompositing'),

  MultiplyBlend: asNativeBlendConfig('IosCIMultiplyBlendMode'),

  ColorDodgeBlend: asNativeBlendConfig('IosCIColorDodgeBlendMode'),

  ExclusionBlend: asNativeBlendConfig('IosCIExclusionBlendMode'),

  ColorBurnBlend: asNativeBlendConfig('IosCIColorBurnBlendMode'),

  SoftLightBlend: asNativeBlendConfig('IosCISoftLightBlendMode'),

  HueBlend: asNativeBlendConfig('IosCIHueBlendMode'),

  ColorBlend: asNativeBlendConfig('IosCIColorBlendMode'),

  HardLightBlend: asNativeBlendConfig('IosCIHardLightBlendMode'),

  DifferenceBlend: asNativeBlendConfig('IosCIDifferenceBlendMode'),

  SaturationBlend: asNativeBlendConfig('IosCISaturationBlendMode'),

  LuminosityBlend: asNativeBlendConfig('IosCILuminosityBlendMode'),

  PlusBlendColor: asNativeBlendColorConfig('IosCIAdditionCompositing'),

  DarkenBlendColor: asNativeBlendColorConfig('IosCIDarkenBlendMode'),

  LightenBlendColor: asNativeBlendColorConfig('IosCILightenBlendMode'),

  ModulateBlendColor: asNativeBlendColorConfig('IosCIMultiplyCompositing'),

  MultiplyBlendColor: asNativeBlendColorConfig('IosCIMultiplyBlendMode'),

  OverlayBlendColor: asNativeBlendColorConfig('IosCIOverlayBlendMode'),

  ScreenBlendColor: asNativeBlendColorConfig('IosCIScreenBlendMode'),

  ColorDodgeBlendColor: asNativeBlendColorConfig('IosCIColorDodgeBlendMode'),

  ExclusionBlendColor: asNativeBlendColorConfig('IosCIExclusionBlendMode'),

  ColorBurnBlendColor: asNativeBlendColorConfig('IosCIColorBurnBlendMode'),

  SoftLightBlendColor: asNativeBlendColorConfig('IosCISoftLightBlendMode'),

  HueBlendColor: asNativeBlendColorConfig('IosCIHueBlendMode'),

  ColorBlendColor: asNativeBlendColorConfig('IosCIColorBlendMode'),

  SaturationBlendColor: asNativeBlendColorConfig('IosCISaturationBlendMode'),

  LuminosityBlendColor: asNativeBlendColorConfig('IosCILuminosityBlendMode'),

  DifferenceBlendColor: asNativeBlendColorConfig('IosCIDifferenceBlendMode'),

  HardLightBlendColor: asNativeBlendColorConfig('IosCIHardLightBlendMode')
}
