import { Platform } from 'react-native';
import matrices from 'rn-color-matrices';

const asNativeFilterConfig = Platform.select({
  ios: ({ matrix, image }) => ({
    name: 'CIColorMatrix',
    inputRVector: matrix.slice(0, 4),
    inputGVector: matrix.slice(5, 9),
    inputBVector: matrix.slice(10, 14),
    inputAVector: matrix.slice(15, 19),
    inputBiasVector: [matrix[4], matrix[9], matrix[14], matrix[19]],
    image
  }),

  android: ({ matrix, image }) => ({
    name: 'ColorMatrixColorFilter',
    matrix,
    image
  })
});

const luminanceToAlphaAndroidFix = [
  -0.299, -0.587, -0.114, 0, 255,
  -0.299, -0.587, -0.114, 0, 255,
  -0.299, -0.587, -0.114, 0, 255,
  0, 0, 0, 1, 255
];

export const luminanceToAlpha = Platform.select({
  ios: matrices.luminanceToAlpha,
  android: () => luminanceToAlphaAndroidFix
});

export default {
  ColorMatrix: asNativeFilterConfig,

  Normal: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.normal(),
      image
    })
  ),

  RGBA: ({ red, green, blue, alpha, image }) => (
    asNativeFilterConfig({
      matrix: matrices.rgba(red, green, blue, alpha),
      image
    })
  ),

  Saturate: ({ amount, image }) => (
    asNativeFilterConfig({
      matrix: matrices.saturate(amount),
      image
    })
  ),

  HueRotate: ({ amount, image }) => (
    asNativeFilterConfig({
      matrix: matrices.hueRotate(amount),
      image
    })
  ),

  LuminanceToAlpha: ({ image }) => (
    asNativeFilterConfig({
      matrix: luminanceToAlpha(),
      image
    })
  ),

  Invert: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.invert(),
      image
    })
  ),

  Grayscale: ({ amount, image }) => (
    asNativeFilterConfig({
      matrix: matrices.grayscale(amount),
      image
    })
  ),

  Sepia: ({ amount, image }) => (
    asNativeFilterConfig({
      matrix: matrices.sepia(amount),
      image
    })
  ),

  Nightvision: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.nightvision(),
      image
    })
  ),

  Warm: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.warm(),
      image
    })
  ),

  Cool: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.cool(),
      image
    })
  ),

  Brightness: ({ amount, image }) => (
    asNativeFilterConfig({
      matrix: matrices.brightness(amount),
      image
    })
  ),

  Contrast: ({ amount, image }) => (
    asNativeFilterConfig({
      matrix: matrices.contrast(amount),
      image
    })
  ),

  Temperature: ({ amount, image }) => (
    asNativeFilterConfig({
      matrix: matrices.temperature(amount),
      image
    })
  ),

  Tint: ({ amount, image }) => (
    asNativeFilterConfig({
      matrix: matrices.tint(amount),
      image
    })
  ),

  Threshold: ({ amount, image }) => (
    asNativeFilterConfig({
      matrix: matrices.threshold(amount),
      image
    })
  ),

  Technicolor: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.technicolor(),
      image
    })
  ),

  Polaroid: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.polaroid(),
      image
    })
  ),

  ToBGR: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.toBGR(),
      image
    })
  ),

  Kodachrome: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.kodachrome(),
      image
    })
  ),

  Browni: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.browni(),
      image
    })
  ),

  Vintage: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.vintage(),
      image
    })
  ),

  Night: ({ amount, image }) => (
    asNativeFilterConfig({
      matrix: matrices.night(amount),
      image
    })
  ),

  Predator: ({ amount, image }) => (
    asNativeFilterConfig({
      matrix: matrices.predator(amount),
      image
    })
  ),

  Lsd: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.lsd(),
      image
    })
  ),

  ColorTone: ({ desaturation, toned, lightColor, darkColor, image }) => (
    asNativeFilterConfig({
      matrix: matrices.colorTone(desaturation, toned, lightColor, darkColor),
      image
    })
  ),

  DuoTone: ({ firstColor, secondColor, image }) => (
    asNativeFilterConfig({
      matrix: matrices.duoTone(firstColor, secondColor),
      image
    })
  ),

  Protanomaly: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.protanomaly()
    })
  ),

  Deuteranomaly: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.deuteranomaly()
    })
  ),

  Tritanomaly: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.tritanomaly()
    })
  ),

  Protanopia: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.protanopia()
    })
  ),

  Deuteranopia: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.deuteranopia()
    })
  ),

  Tritanopia: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.tritanopia()
    })
  ),

  Achromatopsia: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.achromatopsia()
    })
  ),

  Achromatomaly: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.achromatomaly()
    })
  )
};
