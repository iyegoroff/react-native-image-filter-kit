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

  Saturate: ({ value, image }) => (
    asNativeFilterConfig({
      matrix: matrices.saturate(value),
      image
    })
  ),

  HueRotate: ({ value, image }) => (
    asNativeFilterConfig({
      matrix: matrices.hueRotate(value),
      image
    })
  ),

  LuminanceToAlpha: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.luminanceToAlpha(),
      image
    })
  ),

  Invert: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.invert(),
      image
    })
  ),

  BlackAndWhite: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.blackAndWhite(),
      image
    })
  ),

  Grayscale: ({ value, image }) => (
    asNativeFilterConfig({
      matrix: matrices.grayscale(value),
      image
    })
  ),

  Sepia: ({ image }) => (
    asNativeFilterConfig({
      matrix: matrices.sepia(),
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

  Brightness: ({ value, image }) => (
    asNativeFilterConfig({
      matrix: matrices.brightness(value),
      image
    })
  ),

  Exposure: ({ value, image }) => (
    asNativeFilterConfig({
      matrix: matrices.exposure(value),
      image
    })
  ),

  Contrast: ({ value, image }) => (
    asNativeFilterConfig({
      matrix: matrices.contrast(value),
      image
    })
  ),

  Temperature: ({ value, image }) => (
    asNativeFilterConfig({
      matrix: matrices.temperature(value),
      image
    })
  ),

  Tint: ({ value, image }) => (
    asNativeFilterConfig({
      matrix: matrices.tint(value),
      image
    })
  ),

  Threshold: ({ value, image }) => (
    asNativeFilterConfig({
      matrix: matrices.threshold(value),
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

  Night: ({ value, image }) => (
    asNativeFilterConfig({
      matrix: matrices.night(value),
      image
    })
  ),

  Predator: ({ value, image }) => (
    asNativeFilterConfig({
      matrix: matrices.predator(value),
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
