// tslint:disable:max-file-line-count

import { Platform, Image, Shape } from 'react-native'
import matrices, { Matrix } from 'rn-color-matrices'

export interface FilterProps {
  readonly image: Image
}

export interface AmountFilterProps extends FilterProps {
  readonly amount?: number
}

export interface MatrixFilterProps extends FilterProps {
  readonly matrix: Matrix
}

export interface RGBAFilterProps extends FilterProps {
  readonly red?: number
  readonly green?: number
  readonly blue?: number
  readonly alpha?: number
}

export interface ColorToneProps extends FilterProps {
  readonly desaturation?: number
  readonly toned?: number
  readonly darkColor?: string
  readonly lightColor?: string
}

export interface DuoToneProps extends FilterProps {
  readonly firstColor?: string
  readonly secondColor?: string
}

export interface Config {
  readonly name: string
}

const asNativeFilterConfig = Platform.select({
  ios: ({ matrix, image }: MatrixFilterProps) => ({
    name: 'CIColorMatrix',
    inputRVector: matrix.slice(0, 4),
    inputGVector: matrix.slice(5, 9),
    inputBVector: matrix.slice(10, 14),
    inputAVector: matrix.slice(15, 19),
    inputBiasVector: [matrix[4], matrix[9], matrix[14], matrix[19]],
    image
  } as Config),

  android: ({ matrix, image }: MatrixFilterProps) => ({
    name: 'ColorMatrixColorFilter',
    matrix,
    image
  } as Config)
})

const luminanceToAlphaAndroidFix: Matrix = [
  -0.299, -0.587, -0.114, 0, 255,
  -0.299, -0.587, -0.114, 0, 255,
  -0.299, -0.587, -0.114, 0, 255,
  0, 0, 0, 1, 255
]

export const luminanceToAlpha = Platform.select({
  ios: matrices.luminanceToAlpha,
  android: () => luminanceToAlphaAndroidFix
})

export const shapeTransforms = {
  ColorMatrix: asNativeFilterConfig,

  Normal: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.normal(),
      image
    })
  ),

  RGBA: ({ red, green, blue, alpha, image }: RGBAFilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.rgba(red, green, blue, alpha),
      image
    })
  ),

  Saturate: ({ amount, image }: AmountFilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.saturate(amount),
      image
    })
  ),

  HueRotate: ({ amount, image }: AmountFilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.hueRotate(amount),
      image
    })
  ),

  LuminanceToAlpha: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: luminanceToAlpha(),
      image
    })
  ),

  Invert: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.invert(),
      image
    })
  ),

  Grayscale: ({ amount, image }: AmountFilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.grayscale(amount),
      image
    })
  ),

  Sepia: ({ amount, image }: AmountFilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.sepia(amount),
      image
    })
  ),

  Nightvision: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.nightvision(),
      image
    })
  ),

  Warm: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.warm(),
      image
    })
  ),

  Cool: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.cool(),
      image
    })
  ),

  Brightness: ({ amount, image }: AmountFilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.brightness(amount),
      image
    })
  ),

  Contrast: ({ amount, image }: AmountFilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.contrast(amount),
      image
    })
  ),

  Temperature: ({ amount, image }: AmountFilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.temperature(amount),
      image
    })
  ),

  Tint: ({ amount, image }: AmountFilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.tint(amount),
      image
    })
  ),

  Threshold: ({ amount, image }: AmountFilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.threshold(amount),
      image
    })
  ),

  Technicolor: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.technicolor(),
      image
    })
  ),

  Polaroid: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.polaroid(),
      image
    })
  ),

  ToBGR: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.toBGR(),
      image
    })
  ),

  Kodachrome: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.kodachrome(),
      image
    })
  ),

  Browni: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.browni(),
      image
    })
  ),

  Vintage: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.vintage(),
      image
    })
  ),

  Night: ({ amount, image }: AmountFilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.night(amount),
      image
    })
  ),

  Predator: ({ amount, image }: AmountFilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.predator(amount),
      image
    })
  ),

  Lsd: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.lsd(),
      image
    })
  ),

  ColorTone: ({ desaturation, toned, lightColor, darkColor, image }: ColorToneProps) => (
    asNativeFilterConfig({
      matrix: matrices.colorTone(desaturation, toned, lightColor, darkColor),
      image
    })
  ),

  DuoTone: ({ firstColor, secondColor, image }: DuoToneProps) => (
    asNativeFilterConfig({
      matrix: matrices.duoTone(firstColor, secondColor),
      image
    })
  ),

  Protanomaly: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.protanomaly(),
      image
    })
  ),

  Deuteranomaly: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.deuteranomaly(),
      image
    })
  ),

  Tritanomaly: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.tritanomaly(),
      image
    })
  ),

  Protanopia: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.protanopia(),
      image
    })
  ),

  Deuteranopia: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.deuteranopia(),
      image
    })
  ),

  Tritanopia: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.tritanopia(),
      image
    })
  ),

  Achromatopsia: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.achromatopsia(),
      image
    })
  ),

  Achromatomaly: ({ image }: FilterProps) => (
    asNativeFilterConfig({
      matrix: matrices.achromatomaly(),
      image
    })
  )
}
