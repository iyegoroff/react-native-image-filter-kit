import { scalar, color, scalarVector } from '../common/inputs'
import { Common } from '../common/shapes'

const WithAmount = {
  amount: scalar,
  ...Common
}

export const shapes = {
  ColorMatrix: {
    matrix: scalarVector,
    ...Common
  },

  Normal: Common,

  RGBA: {
    red: scalar,
    green: scalar,
    blue: scalar,
    alpha: scalar,
    ...Common
  },

  Saturate: WithAmount,

  HueRotate: WithAmount,

  LuminanceToAlpha: Common,

  Invert: Common,

  Grayscale: WithAmount,

  Sepia: WithAmount,

  Nightvision: Common,

  Warm: Common,

  Cool: Common,

  Brightness: WithAmount,

  Contrast: WithAmount,

  Temperature: WithAmount,

  Tint: WithAmount,

  Threshold: WithAmount,

  Technicolor: Common,

  Polaroid: Common,

  ToBGR: Common,

  Kodachrome: Common,

  Browni: Common,

  Vintage: Common,

  Night: WithAmount,

  Predator: WithAmount,

  Lsd: Common,

  ColorTone: {
    desaturation: scalar,
    toned: scalar,
    lightColor: color,
    darkColor: color,
    ...Common
  },

  DuoTone: {
    firstColor: color,
    secondColor: color,
    ...Common
  },

  Protanomaly: Common,

  Deuteranomaly: Common,

  Tritanomaly: Common,

  Protanopia: Common,

  Deuteranopia: Common,

  Tritanopia: Common,

  Achromatopsia: Common,

  Achromatomaly: Common
}
