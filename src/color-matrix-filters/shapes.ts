import { image, scalar, color, scalarVector } from '../common/inputs'

export const shapes = {
  ColorMatrix: {
    matrix: scalarVector,
    image: image
  },

  Normal: {
    image: image
  },

  RGBA: {
    red: scalar,
    green: scalar,
    blue: scalar,
    alpha: scalar,
    image: image
  },

  Saturate: {
    amount: scalar,
    image: image
  },

  HueRotate: {
    amount: scalar,
    image: image
  },

  LuminanceToAlpha: {
    image: image
  },

  Invert: {
    image: image
  },

  Grayscale: {
    amount: scalar,
    image: image
  },

  Sepia: {
    amount: scalar,
    image: image
  },

  Nightvision: {
    image: image
  },

  Warm: {
    image: image
  },

  Cool: {
    image: image
  },

  Brightness: {
    amount: scalar,
    image: image
  },

  Contrast: {
    amount: scalar,
    image: image
  },

  Temperature: {
    amount: scalar,
    image: image
  },

  Tint: {
    amount: scalar,
    image: image
  },

  Threshold: {
    amount: scalar,
    image: image
  },

  Technicolor: {
    image: image
  },

  Polaroid: {
    image: image
  },

  ToBGR: {
    image: image
  },

  Kodachrome: {
    image: image
  },

  Browni: {
    image: image
  },

  Vintage: {
    image: image
  },

  Night: {
    amount: scalar,
    image: image
  },

  Predator: {
    amount: scalar,
    image: image
  },

  Lsd: {
    image: image
  },

  ColorTone: {
    desaturation: scalar,
    toned: scalar,
    lightColor: color,
    darkColor: color,
    image: image
  },

  DuoTone: {
    firstColor: color,
    secondColor: color,
    image: image
  },

  Protanomaly: {
    image: image
  },

  Deuteranomaly: {
    image: image
  },

  Tritanomaly: {
    image: image
  },

  Protanopia: {
    image: image
  },

  Deuteranopia: {
    image: image
  },

  Tritanopia: {
    image: image
  },

  Achromatopsia: {
    image: image
  },

  Achromatomaly: {
    image: image
  }
}
