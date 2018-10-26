import { image, scalar, color, scalarVector, bool } from '../common/inputs'

export const shapes = {
  ColorMatrix: {
    matrix: scalarVector,
    image: image,
    disableCache: bool
  },

  Normal: {
    image: image,
    disableCache: bool
  },

  RGBA: {
    red: scalar,
    green: scalar,
    blue: scalar,
    alpha: scalar,
    image: image,
    disableCache: bool
  },

  Saturate: {
    amount: scalar,
    image: image,
    disableCache: bool
  },

  HueRotate: {
    amount: scalar,
    image: image,
    disableCache: bool
  },

  LuminanceToAlpha: {
    image: image,
    disableCache: bool
  },

  Invert: {
    image: image,
    disableCache: bool
  },

  Grayscale: {
    amount: scalar,
    image: image,
    disableCache: bool
  },

  Sepia: {
    amount: scalar,
    image: image,
    disableCache: bool
  },

  Nightvision: {
    image: image,
    disableCache: bool
  },

  Warm: {
    image: image,
    disableCache: bool
  },

  Cool: {
    image: image,
    disableCache: bool
  },

  Brightness: {
    amount: scalar,
    image: image,
    disableCache: bool
  },

  Contrast: {
    amount: scalar,
    image: image,
    disableCache: bool
  },

  Temperature: {
    amount: scalar,
    image: image,
    disableCache: bool
  },

  Tint: {
    amount: scalar,
    image: image,
    disableCache: bool
  },

  Threshold: {
    amount: scalar,
    image: image,
    disableCache: bool
  },

  Technicolor: {
    image: image,
    disableCache: bool
  },

  Polaroid: {
    image: image,
    disableCache: bool
  },

  ToBGR: {
    image: image,
    disableCache: bool
  },

  Kodachrome: {
    image: image,
    disableCache: bool
  },

  Browni: {
    image: image,
    disableCache: bool
  },

  Vintage: {
    image: image,
    disableCache: bool
  },

  Night: {
    amount: scalar,
    image: image,
    disableCache: bool
  },

  Predator: {
    amount: scalar,
    image: image,
    disableCache: bool
  },

  Lsd: {
    image: image,
    disableCache: bool
  },

  ColorTone: {
    desaturation: scalar,
    toned: scalar,
    lightColor: color,
    darkColor: color,
    image: image,
    disableCache: bool
  },

  DuoTone: {
    firstColor: color,
    secondColor: color,
    image: image,
    disableCache: bool
  },

  Protanomaly: {
    image: image,
    disableCache: bool
  },

  Deuteranomaly: {
    image: image,
    disableCache: bool
  },

  Tritanomaly: {
    image: image,
    disableCache: bool
  },

  Protanopia: {
    image: image,
    disableCache: bool
  },

  Deuteranopia: {
    image: image,
    disableCache: bool
  },

  Tritanopia: {
    image: image,
    disableCache: bool
  },

  Achromatopsia: {
    image: image,
    disableCache: bool
  },

  Achromatomaly: {
    image: image,
    disableCache: bool
  }
}
