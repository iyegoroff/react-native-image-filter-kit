import { concatColorMatrices } from 'concat-color-matrices';
import matrices from 'rn-color-matrices';
import rgbaToRgb from '../common/rgba-to-rgb';

const {
  brightness,
  contrast,
  sepia,
  saturate,
  hueRotate,
  grayscale
} = matrices;

const degToRad = (deg) => Math.PI * deg / 180;

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
};

const background = 'rgb(255, 255, 255)';

export default {
  _1977: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices._1977,
    image: {
      name: 'PorterDuffXfermode',
      mode: 'SCREEN',
      dstImage: image,
      srcImage: {
        name: 'Color',
        color: 'rgba(243, 106, 188, .3)'
      }
    }
  }),

  Aden: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices.Aden,
    image: {
      name: 'PorterDuffXfermode',
      mode: 'DARKEN',
      dstImage: image,
      srcImage: {
        name: 'LinearGradient',
        colors: ['rgba(66, 10, 14, .2)', 'transparent']
      }
    }
  }),

  Brannan: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices.Brannan,
    image: {
      name: 'PorterDuffXfermode',
      mode: 'LIGHTEN',
      dstImage: image,
      srcImage: {
        name: 'Color',
        color: 'rgba(161, 44, 199, .31)'
      }
    }
  }),

  Brooklyn: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices.Brooklyn,
    image: {
      name: 'PorterDuffXfermode',
      mode: 'OVERLAY',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        colors: ['rgba(168, 223, 193, .4)', 'rgb(196, 183, 200)'],
        stops: [0.7, 1],
        radius: '70min'
      }
    }
  }),

  Clarendon: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices.Clarendon,
    image: {
      name: 'PorterDuffXfermode',
      mode: 'OVERLAY',
      dstImage: image,
      srcImage: {
        name: 'Color',
        color: 'rgba(127, 187, 227, .2)'
      }
    }
  }),

  Earlybird: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices.Earlybird,
    image: {
      name: 'PorterDuffXfermode',
      mode: 'OVERLAY',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        colors: ['rgb(208, 186, 142)', 'rgb(54, 3, 9)', 'rgb(29, 2, 16)'],
        stops: [0.2, 0.85, 1],
        radius: '70min'
      }
    }
  }),

  Gingham: ({ image }) => ({
    name: '',
    image: ''
  }),

  Hudson: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices.Hudson,
    image: {
      name: 'PorterDuffXfermode',
      mode: 'MULTIPLY',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        colors: [
          rgbaToRgb(background, `rgba(166, 177, 255, 0.5)`),
          rgbaToRgb(background, `rgba(52, 33, 52, 0.5)`)
        ],
        stops: [0.5, 1],
        radius: '72.5min'
      }
    }
  }),

  Inkwell: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices.Inkwell,
    image
  }),

  Kelvin: ({ image }) => ({
    name: '',
    image: ''
  }),

  Lark: ({ image }) => ({
    name: '',
    image: ''
  }),

  Lofi: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices.Lofi,
    image: {
      name: 'PorterDuffXfermode',
      mode: 'MULTIPLY',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        colors: [rgbaToRgb(background, 'rgba(255, 255, 255, 0)'), 'rgb(125, 125, 125)'],
        stops: [0.7, 1],
        radius: '70min'
      }
    }
  }),

  Maven: ({ image }) => ({
    name: '',
    image: ''
  }),

  Mayfair: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices.Mayfair,
    image: {
      name: 'PorterDuffXfermode',
      mode: 'OVERLAY',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
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

  Moon: ({ image }) => ({
    name: '',
    image: ''
  }),

  Nashville: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices.Nashville,
    image: {
      name: 'PorterDuffXfermode',
      mode: 'LIGHTEN',
      dstImage: {
        name: 'PorterDuffXfermode',
        mode: 'DARKEN',
        dstImage: image,
        srcImage: {
          name: 'Color',
          color: 'rgba(247, 176, 153, 0.56)'
        }
      },
      srcImage: {
        name: 'Color',
        color: 'rgba(0, 70, 150, 0.4)'
      }
    }
  }),

  Perpetua: ({ image }) => ({
    name: '',
    image: ''
  }),

  Reyes: ({ image }) => ({
    name: '',
    image: ''
  }),

  Rise: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices.Rise,
    image: {
      name: 'PorterDuffXfermode',
      mode: 'OVERLAY',
      dstImage: {
        name: 'PorterDuffXfermode',
        mode: 'MULTIPLY',
        dstImage: image,
        srcImage: {
          name: 'RadialGradient',
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
        colors: [`rgba(232, 197, 152, ${0.8 * 0.6})`, 'rgba(255, 255, 255, 0)'],
        stops: [0, 0.9],
        radius: '70min'
      }
    }
  }),

  Slumber: ({ image }) => ({
    name: '',
    image: ''
  }),

  Stinson: ({ image }) => ({
    name: '',
    image: ''
  }),

  Toaster: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices.Toaster,
    image: {
      name: 'PorterDuffXfermode',
      mode: 'SCREEN',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        colors: [`rgb(128, 78, 15)`, `rgb(59, 0, 59)`],
        stops: [0, 1],
        radius: '70min'
      }
    }
  }),

  Valencia: ({ image }) => ({
    name: '',
    image: ''
  }),

  Walden: ({ image }) => ({
    name: 'ColorMatrix',
    matrix: colorMatrices.Walden,
    image: {
      name: 'PorterDuffXfermode',
      mode: 'SCREEN',
      dstImage: image,
      srcImage: {
        name: 'Color',
        color: 'rgba(0, 68, 204, 0.3)'
      }
    }
  }),

  Willow: ({ image }) => ({
    name: '',
    image: ''
  }),

  Xpro2: ({ image }) => ({
    name: '',
    image: ''
  })
};
