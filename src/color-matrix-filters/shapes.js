import { image, scalar, color, scalarVector } from '../common/inputs';

export default {
  ColorMatrix: {
    matrix: scalarVector,
    image: image
  },

  Normal: {
    image: image
  },

  RGBA: {
    r: scalar,
    g: scalar,
    b: scalar,
    a: scalar,
    image: image
  },

  Saturate: {
    value: scalar,
    image: image
  },

  HueRotate: {
    value: scalar,
    image: image
  },

  LuminanceToAlpha: {
    image: image
  },

  Invert: {
    image: image
  },

  BlackAndWhite: {
    image: image
  },

  Grayscale: {
    value: scalar,
    image: image
  },

  Sepia: {
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
    value: scalar,
    image: image
  },

  Exposure: {
    value: scalar,
    image: image
  },

  Contrast: {
    value: scalar,
    image: image
  },

  Temperature: {
    value: scalar,
    image: image
  },

  Tint: {
    value: scalar,
    image: image
  },

  Threshold: {
    value: scalar,
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
    value: scalar,
    image: image
  },

  Predator: {
    value: scalar,
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
};
