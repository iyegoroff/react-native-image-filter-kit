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

  Kelvin: [], // color-dodge

  Lark: [], // color-dodge

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

  Toaster: concatColorMatrices(
    [contrast(1.5), brightness(0.9)]
  ),

  Valencia: [], // exclusion

  Walden: concatColorMatrices(
    [brightness(1.1), hueRotate(degToRad(-10)), sepia(0.3), saturate(1.6)]
  ),

  Willow: [], // color

  Xpro2: [] // color-burn
}

const background = 'rgb(255, 255, 255)'

export const shapeTransforms = {
  _1977: ({ image, disableCache }: FilterConfig) => ({
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
        disableCache,
        color: 'rgba(243, 106, 188, .3)'
      }
    }
  }),

  Aden: ({ image, disableCache }: FilterConfig) => ({
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
        disableCache,
        colors: ['rgba(66, 10, 14, .2)', 'transparent']
      }
    }
  }),

  Brannan: ({ image, disableCache }: FilterConfig) => ({
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
        disableCache,
        color: 'rgba(161, 44, 199, .31)'
      }
    }
  }),

  Brooklyn: ({ image, disableCache }: FilterConfig) => ({
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
        disableCache,
        colors: ['rgba(168, 223, 193, .4)', 'rgb(196, 183, 200)'],
        stops: [0.7, 1],
        radius: '70min'
      }
    }
  }),

  Clarendon: ({ image, disableCache }: FilterConfig) => ({
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
        disableCache,
        color: 'rgba(127, 187, 227, .2)'
      }
    }
  }),

  Earlybird: ({ image, disableCache }: FilterConfig) => ({
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
        disableCache,
        colors: ['rgb(208, 186, 142)', 'rgb(54, 3, 9)', 'rgb(29, 2, 16)'],
        stops: [0.2, 0.85, 1],
        radius: '70min'
      }
    }
  }),

  Gingham: ({ image, disableCache }: FilterConfig) => ({
    name: 'Gingham - not implemented!',
    disableCache,
    image: ''
  }),

  Hudson: ({ image, disableCache }: FilterConfig) => ({
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
        disableCache,
        colors: [
          rgbaToRgb(background, `rgba(166, 177, 255, 0.5)`),
          rgbaToRgb(background, `rgba(52, 33, 52, 0.5)`)
        ],
        stops: [0.5, 1],
        radius: '72.5min'
      }
    }
  }),

  Inkwell: ({ image, disableCache }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Inkwell,
    image
  }),

  Kelvin: ({ image, disableCache }: FilterConfig) => ({
    name: 'Kelvin - not implemented!',
    disableCache,
    image: ''
  }),

  Lark: ({ image, disableCache }: FilterConfig) => ({
    name: 'Lark - not implemented!',
    disableCache,
    image: ''
  }),

  Lofi: ({ image, disableCache }: FilterConfig) => ({
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
        disableCache,
        colors: [rgbaToRgb(background, 'rgba(255, 255, 255, 0)'), 'rgb(125, 125, 125)'],
        stops: [0.7, 1],
        radius: '70min'
      }
    }
  }),

  Maven: ({ image, disableCache }: FilterConfig) => ({
    name: 'Maven - not implemented!',
    disableCache,
    image: ''
  }),

  Mayfair: ({ image, disableCache }: FilterConfig) => ({
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
        disableCache,
        colors: [
          `rgba(255, 255, 255, ${0.8 * 0.4})`,
          `rgba(255, 200, 200, ${0.6 * 0.4})`,
          `rgba(17, 17, 17, ${0.4})`
        ],
        stops: [0, 0.3, 0.6],
        radius: '82.5min',
        centerX: '40w',
        centerY: '40h'
      }
    }
  }),

  Moon: ({ image, disableCache }: FilterConfig) => ({
    name: 'Moon - not implemented!',
    disableCache,
    image: ''
  }),

  Nashville: ({ image, disableCache }: FilterConfig) => ({
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
          disableCache,
          color: 'rgba(247, 176, 153, 0.56)'
        }
      },
      srcImage: {
        name: 'Color',
        disableCache,
        color: 'rgba(0, 70, 150, 0.4)'
      }
    }
  }),

  Perpetua: ({ image, disableCache }: FilterConfig) => ({
    name: 'Perpetua - not implemented!',
    disableCache,
    image: ''
  }),

  Reyes: ({ image, disableCache }: FilterConfig) => ({
    name: 'Reyes - not implemented!',
    disableCache,
    image: ''
  }),

  Rise: ({ image, disableCache }: FilterConfig) => ({
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
          disableCache,
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
        disableCache,
        colors: [`rgba(232, 197, 152, ${0.8 * 0.6})`, 'rgba(255, 255, 255, 0)'],
        stops: [0, 0.9],
        radius: '70min'
      }
    }
  }),

  Slumber: ({ image, disableCache }: FilterConfig) => ({
    name: 'Slumber - not implemented!',
    disableCache,
    image: ''
  }),

  Stinson: ({ image, disableCache }: FilterConfig) => ({
    name: 'Stinson - not implemented!',
    disableCache,
    image: ''
  }),

  Toaster: ({ image, disableCache }: FilterConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: colorMatrices.Toaster,
    image: {
      name: 'PorterDuffXfermode',
      disableCache,
      mode: 'SCREEN',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        disableCache,
        colors: [`rgb(128, 78, 15)`, `rgb(59, 0, 59)`],
        stops: [0, 1],
        radius: '70min'
      }
    }
  }),

  Valencia: ({ image, disableCache }: FilterConfig) => ({
    name: 'Valencia - not implemented!',
    disableCache,
    image: ''
  }),

  Walden: ({ image, disableCache }: FilterConfig) => ({
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
        disableCache,
        color: 'rgba(0, 68, 204, 0.3)'
      }
    }
  }),

  Willow: ({ image, disableCache }: FilterConfig) => ({
    name: 'Willow - not implemented!',
    disableCache,
    image: ''
  }),

  Xpro2: ({ image, disableCache }: FilterConfig) => ({
    name: 'Xpro2 - not implemented!',
    disableCache,
    image: ''
  })
}
