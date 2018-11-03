// tslint:disable:max-file-line-count

import rgbaToRgb from 'rgba-to-rgb'
import { concatColorMatrices } from 'concat-color-matrices'
import matrices from 'rn-color-matrices'
import { Image } from 'react-native'

const {
  brightness,
  contrast,
  sepia,
  saturate,
  hueRotate,
  grayscale
} = matrices

export interface FilterConfig {
  readonly image: Image
  readonly disableCache?: boolean
  readonly disableIntermediateCaches?: boolean
}

const degToRad = (deg: number) => Math.PI * deg / 180

const colorMatrices = {
  _1977: concatColorMatrices(
    [contrast(1.1), brightness(1.1), saturate(1.3)]
  ),

  Aden: concatColorMatrices(
    [hueRotate(degToRad(-20)), contrast(0.9), saturate(0.85), brightness(1.2)]
  ),

  Brannan: concatColorMatrices(
    [sepia(0.5), contrast(1.4)]
  ),

  Brooklyn: concatColorMatrices(
    [contrast(0.9), brightness(1.1)]
  ),

  Clarendon: concatColorMatrices(
    [contrast(1.2), saturate(1.35)]
  ),

  Earlybird: concatColorMatrices(
    [contrast(0.9), sepia(0.2)]
  ),

  Gingham: [], // soft-light

  Hudson: concatColorMatrices(
    [brightness(1.2), contrast(0.9), saturate(1.1)]
  ),

  Inkwell: concatColorMatrices(
    [sepia(0.3), contrast(1.1), brightness(1.1), grayscale(1)]
  ),

  Lark: contrast(0.9), // color-dodge

  Lofi: concatColorMatrices(
    [saturate(1.1), contrast(1.5)]
  ),

  Maven: [], // hue

  Mayfair: concatColorMatrices(
    [contrast(1.1), saturate(1.1)]
  ),

  Moon: [], // soft-light

  Nashville: concatColorMatrices(
    [sepia(0.2), contrast(1.2), brightness(1.05), saturate(1.2)]
  ),

  Perpetua: [], // soft-light

  Reyes: [], // soft-light

  Rise: concatColorMatrices(
    [brightness(1.05), sepia(0.2), contrast(0.9), saturate(0.9)]
  ),

  Slumber: [], // soft-light

  Stinson: [], // soft-light

  // Toaster: concatColorMatrices(
  //   [contrast(1.5), brightness(0.9)]
  // ),

  // Toaster: [
  //   1.35, 0, 0, 0, -57,
  //   0, 1.35, 0, 0, -57,
  //   0, 0, 1.35, 0, -57,
  //   0, 0, 0, 1, -255
  // ],

  Valencia: concatColorMatrices(
    [contrast(1.08), brightness(1.08), sepia(0.08)]
  ),

  Walden: concatColorMatrices(
    [brightness(1.1), hueRotate(degToRad(-10)), sepia(0.3), saturate(1.6)]
  ),

  Willow: [], // color

  Xpro2: sepia(0.3) // color-burn
}

const background = 'rgb(255, 255, 255)'

export const shapeTransforms = {
  _1977: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices._1977,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'SCREEN',
      dstImage: image,
      srcImage: {
        name: 'Color',
        disableCache: disableIntermediateCaches,
        color: 'rgba(243, 106, 188, .3)'
      }
    }
  }),

  Aden: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Aden,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'DARKEN',
      dstImage: image,
      srcImage: {
        name: 'LinearGradient',
        disableCache: disableIntermediateCaches,
        colors: ['rgba(66, 10, 14, .2)', 'transparent']
      }
    }
  }),

  Brannan: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Brannan,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'LIGHTEN',
      dstImage: image,
      srcImage: {
        name: 'Color',
        disableCache: disableIntermediateCaches,
        color: 'rgba(161, 44, 199, .31)'
      }
    }
  }),

  Brooklyn: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Brooklyn,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'OVERLAY',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        disableCache: disableIntermediateCaches,
        colors: ['rgba(168, 223, 193, .4)', 'rgb(196, 183, 200)'],
        stops: [0.7, 1],
        radius: '70min'
      }
    }
  }),

  Clarendon: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Clarendon,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'OVERLAY',
      dstImage: image,
      srcImage: {
        name: 'Color',
        disableCache: disableIntermediateCaches,
        color: 'rgba(127, 187, 227, .2)'
      }
    }
  }),

  Earlybird: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Earlybird,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'OVERLAY',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        disableCache: disableIntermediateCaches,
        colors: ['rgb(208, 186, 142)', 'rgb(54, 3, 9)', 'rgb(29, 2, 16)'],
        stops: [0.2, 0.85, 1],
        radius: '70min'
      }
    }
  }),

  Gingham: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'Gingham - not implemented!',
    disableCache,
    image: ''
  }),

  Hudson: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Hudson,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'MULTIPLY',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        disableCache: disableIntermediateCaches,
        colors: [
          rgbaToRgb(background, `rgba(166, 177, 255, 0.5)`),
          rgbaToRgb(background, `rgba(52, 33, 52, 0.5)`)
        ],
        stops: [0.5, 1],
        radius: '70min'
      }
    }
  }),

  Inkwell: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Inkwell,
    image
  }),

  Kelvin: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'PorterDuffXfermode',
    disableCache,
    mode: 'OVERLAY',
    dstImage: {
      name: 'ColorDodgeBlend',
      disableCache,
      dstImage: image,
      srcImage: {
        name: 'Color',
        disableCache: disableIntermediateCaches,
        color: 'rgb(56, 44, 52)'
      }
    },
    srcImage: {
      name: 'Color',
      disableCache: disableIntermediateCaches,
      color: 'rgb(183, 125, 33)'
    }
  }),

  Lark: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Lark,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'DARKEN',
      dstImage: {
        name: 'ColorDodgeBlend',
        disableCache,
        dstImage: image,
        srcImage: {
          name: 'Color',
          disableCache: disableIntermediateCaches,
          color: 'rgb(34, 37, 63)'
        }
      },
      srcImage: {
        name: 'Color',
        disableCache: disableIntermediateCaches,
        color: 'rgba(242, 242, 242, 0.8)'
      }
    }
  }),

  Lofi: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Lofi,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'MULTIPLY',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        disableCache: disableIntermediateCaches,
        colors: [rgbaToRgb(background, 'rgba(255, 255, 255, 0)'), 'rgb(172, 172, 172)'],
        stops: [0.7, 1],
        radius: '70min'
      }
    }
  }),

  Maven: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'Maven - not implemented!',
    disableCache,
    image: ''
  }),

  Mayfair: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Mayfair,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'OVERLAY',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        disableCache: disableIntermediateCaches,
        colors: [
          `rgba(255, 255, 255, ${0.8 * 0.4})`,
          `rgba(255, 200, 200, ${0.6 * 0.4})`,
          `rgba(17, 17, 17, ${0.4})`
        ],
        stops: [0, 0.3, 0.6],
        radius: '84min',
        centerX: '40w',
        centerY: '40h'
      }
    }
  }),

  Moon: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'Moon - not implemented!',
    disableCache,
    image: ''
  }),

  Nashville: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Nashville,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'LIGHTEN',
      dstImage: {
        name: 'PorterDuffXfermode',
        disableCache,
        mode: 'DARKEN',
        dstImage: image,
        srcImage: {
          name: 'Color',
          disableCache: disableIntermediateCaches,
          color: 'rgba(247, 176, 153, 0.56)'
        }
      },
      srcImage: {
        name: 'Color',
        disableCache: disableIntermediateCaches,
        color: 'rgba(0, 70, 150, 0.4)'
      }
    }
  }),

  Perpetua: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'Perpetua - not implemented!',
    disableCache,
    image: ''
  }),

  Reyes: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'Reyes - not implemented!',
    disableCache,
    image: ''
  }),

  Rise: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Rise,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'OVERLAY',
      dstImage: {
        name: 'PorterDuffXfermode',
        disableCache,
        mode: 'MULTIPLY',
        dstImage: image,
        srcImage: {
          name: 'RadialGradient',
          disableCache: disableIntermediateCaches,
          colors: [
            rgbaToRgb(background, 'rgba(236, 205, 169, 0.15)'),
            rgbaToRgb(background, 'rgba(50, 30, 7, 0.4)')
          ],
          stops: [0.55, 1],
          radius: '70min'
        }
      },
      srcImage: {
        name: 'RadialGradient',
        disableCache: disableIntermediateCaches,
        colors: [`rgba(232, 197, 152, ${0.8 * 0.6})`, 'rgba(255, 255, 255, 0)'],
        stops: [0, 0.9],
        radius: '70min'
      }
    }
  }),

  Slumber: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'Slumber - not implemented!',
    disableCache,
    image: ''
  }),

  Stinson: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'Stinson - not implemented!',
    disableCache,
    image: ''
  }),

  Toaster: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: brightness(0.9),
    image: {
      name: 'ColorMatrix',
      disableCache,
      matrix: contrast(1.5),
      image: {
        name: 'PorterDuffXfermode',
        disableCache,
        mode: 'SCREEN',
        dstImage: image,
        srcImage: {
          name: 'RadialGradient',
          disableCache: disableIntermediateCaches,
          colors: [`rgb(128, 78, 15)`, `rgb(59, 0, 59)`],
          stops: [0, 1],
          radius: '70min'
        }
      }
    }
  }),

  Valencia: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Valencia,
    image: {
      name: 'ExclusionBlend',
      disableCache,
      dstImage: image,
      srcImage: {
        name: 'Color',
        disableCache: disableIntermediateCaches,
        color: 'rgba(58, 3, 57, 0.5)'
      }
    }
  }),

  Walden: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Walden,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'SCREEN',
      dstImage: image,
      srcImage: {
        name: 'Color',
        disableCache: disableIntermediateCaches,
        color: 'rgba(0, 68, 204, 0.3)'
      }
    }
  }),

  Willow: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'Willow - not implemented!',
    disableCache,
    image: ''
  }),

  Xpro2: ({ image, disableCache, disableIntermediateCaches = true }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Xpro2,
    image: {
      name: 'ColorBurnBlend',
      disableCache,
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        disableCache: disableIntermediateCaches,
        colors: ['rgb(230, 231, 224)', 'rgba(70, 69, 170, 0.66)'],
        stops: [0.4, 1],
        radius: '73.5min'
      }
    }
  })
}
