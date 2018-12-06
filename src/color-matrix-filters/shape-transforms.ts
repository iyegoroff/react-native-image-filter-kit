// tslint:disable:max-file-line-count

import { Platform } from 'react-native'
import matrices, { Matrix } from 'rn-color-matrices'
import { FilterConfig, MatrixFilterConfig, Config, AmountFilterConfig } from '../common/configs'

export interface RGBAFilterConfig extends FilterConfig {
  readonly red?: number
  readonly green?: number
  readonly blue?: number
  readonly alpha?: number
}

export interface ColorToneConfig extends FilterConfig {
  readonly desaturation?: number
  readonly toned?: number
  readonly darkColor?: string
  readonly lightColor?: string
}

export interface DuoToneConfig extends FilterConfig {
  readonly firstColor?: string
  readonly secondColor?: string
}

const asNativeFilterConfig = Platform.select({
  ios: ({ matrix, image, disableCache }: MatrixFilterConfig) => ({
    name: 'CIColorMatrix',
    inputRVector: matrix.slice(0, 4),
    inputGVector: matrix.slice(5, 9),
    inputBVector: matrix.slice(10, 14),
    inputAVector: matrix.slice(15, 19),
    inputBiasVector: [matrix[4], matrix[9], matrix[14], matrix[19]],
    inputImage: image,
    disableCache
  } as Config),

  android: ({ matrix, image, disableCache }: MatrixFilterConfig) => ({
    name: 'ColorMatrixColorFilter',
    matrix,
    image,
    disableCache
  } as Config)
})

// const luminanceToAlphaAndroidFix: Matrix = [
//   -0.299, -0.587, -0.114, 0, 255,
//   -0.299, -0.587, -0.114, 0, 255,
//   -0.299, -0.587, -0.114, 0, 255,
//   0, 0, 0, 1, 255
// ]

// export const luminanceToAlpha = Platform.select({
//   ios: matrices.luminanceToAlpha,
//   android: () => luminanceToAlphaAndroidFix
// })

export const shapeTransforms = {
  ColorMatrix: asNativeFilterConfig,

  Normal: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.normal(),
      ...config
    })
  ),

  RGBA: ({ red, green, blue, alpha, ...config }: RGBAFilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.rgba(red, green, blue, alpha),
      ...config
    })
  ),

  Saturate: ({ amount, ...config }: AmountFilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.saturate(amount),
      ...config
    })
  ),

  HueRotate: ({ amount, ...config }: AmountFilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.hueRotate(amount),
      ...config
    })
  ),

  LuminanceToAlpha: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.luminanceToAlpha(),
      ...config
    })
  ),

  Invert: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.invert(),
      ...config
    })
  ),

  Grayscale: ({ amount, ...config }: AmountFilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.grayscale(amount),
      ...config
    })
  ),

  Sepia: ({ amount, ...config }: AmountFilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.sepia(amount),
      ...config
    })
  ),

  Nightvision: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.nightvision(),
      ...config
    })
  ),

  Warm: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.warm(),
      ...config
    })
  ),

  Cool: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.cool(),
      ...config
    })
  ),

  Brightness: ({ amount, ...config }: AmountFilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.brightness(amount),
      ...config
    })
  ),

  Contrast: ({ amount, ...config }: AmountFilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.contrast(amount),
      ...config
    })
  ),

  Temperature: ({ amount, ...config }: AmountFilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.temperature(amount),
      ...config
    })
  ),

  Tint: ({ amount, ...config }: AmountFilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.tint(amount),
      ...config
    })
  ),

  Threshold: ({ amount, ...config }: AmountFilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.threshold(amount),
      ...config
    })
  ),

  Technicolor: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.technicolor(),
      ...config
    })
  ),

  Polaroid: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.polaroid(),
      ...config
    })
  ),

  ToBGR: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.toBGR(),
      ...config
    })
  ),

  Kodachrome: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.kodachrome(),
      ...config
    })
  ),

  Browni: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.browni(),
      ...config
    })
  ),

  Vintage: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.vintage(),
      ...config
    })
  ),

  Night: ({ amount, ...config }: AmountFilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.night(amount),
      ...config
    })
  ),

  Predator: ({ amount, ...config }: AmountFilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.predator(amount),
      ...config
    })
  ),

  Lsd: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.lsd(),
      ...config
    })
  ),

  ColorTone: ({ desaturation, toned, lightColor, darkColor, ...config }: ColorToneConfig) => (
    asNativeFilterConfig({
      matrix: matrices.colorTone(desaturation, toned, lightColor, darkColor),
      ...config
    })
  ),

  DuoTone: ({ firstColor, secondColor, ...config }: DuoToneConfig) => (
    asNativeFilterConfig({
      matrix: matrices.duoTone(firstColor, secondColor),
      ...config
    })
  ),

  Protanomaly: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.protanomaly(),
      ...config
    })
  ),

  Deuteranomaly: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.deuteranomaly(),
      ...config
    })
  ),

  Tritanomaly: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.tritanomaly(),
      ...config
    })
  ),

  Protanopia: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.protanopia(),
      ...config
    })
  ),

  Deuteranopia: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.deuteranopia(),
      ...config
    })
  ),

  Tritanopia: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.tritanopia(),
      ...config
    })
  ),

  Achromatopsia: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.achromatopsia(),
      ...config
    })
  ),

  Achromatomaly: (config: FilterConfig) => (
    asNativeFilterConfig({
      matrix: matrices.achromatomaly(),
      ...config
    })
  )
}
