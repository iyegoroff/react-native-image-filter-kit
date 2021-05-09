// tslint:disable:max-file-line-count

import rgbaToRgb from 'rgba-to-rgb'
import { concatColorMatrices } from 'concat-color-matrices'
import matrices from 'rn-color-matrices'
import { degToRad } from '../common/util'
import { TransformMap } from '../common/shapes'
import { shapes } from './shapes'
const { brightness, contrast, saturate, grayscale, hueRotate, sepia } = matrices

export type CSSGramConfig = {
  readonly image: unknown
  readonly disableCache?: boolean
  readonly disableIntermediateCaches?: boolean
}

const background = 'rgb(255, 255, 255)'

export const shapeTransforms: TransformMap<typeof shapes> = {
  _1977Compat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Saturate',
    disableCache,
    amount: 1.3,
    image: {
      name: 'Brightness',
      disableCache,
      amount: 1.1,
      image: {
        name: 'Contrast',
        disableCache,
        amount: 1.1,
        image: {
          name: 'ScreenBlendColor',
          disableCache,
          disableIntermediateCaches,
          dstImage: image,
          srcColor: 'rgba(243, 106, 188, .3)'
        }
      }
    }
  }),

  AdenCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Brightness',
    disableCache,
    amount: 1.2,
    image: {
      name: 'Saturate',
      disableCache,
      amount: 0.85,
      image: {
        name: 'Contrast',
        disableCache,
        amount: 0.9,
        image: {
          name: 'HueRotate',
          disableCache,
          amount: degToRad(-20),
          image: {
            name: 'DarkenBlend',
            disableCache,
            resizeCanvasTo: 'dstImage',
            dstImage: image,
            srcImage: {
              name: 'LinearGradient',
              disableCache: disableIntermediateCaches,
              colors: ['rgba(66, 10, 14, .2)', 'transparent']
            }
          }
        }
      }
    }
  }),

  BrannanCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Contrast',
    disableCache,
    amount: 1.4,
    image: {
      name: 'Sepia',
      disableCache,
      amount: 0.5,
      image: {
        name: 'LightenBlendColor',
        disableCache,
        disableIntermediateCaches,
        dstImage: image,
        srcColor: 'rgba(161, 44, 199, .31)'
      }
    }
  }),

  BrooklynCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Brightness',
    disableCache,
    amount: 1.1,
    image: {
      name: 'Contrast',
      disableCache,
      amount: 0.9,
      image: {
        name: 'OverlayBlend',
        disableCache,
        resizeCanvasTo: 'dstImage',
        dstImage: image,
        srcImage: {
          name: 'RadialGradient',
          disableCache: disableIntermediateCaches,
          colors: ['rgba(168, 223, 193, .4)', 'rgb(196, 183, 200)'],
          stops: [0.7, 1],
          radius: '70min'
        }
      }
    }
  }),

  ClarendonCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Saturate',
    disableCache,
    amount: 1.35,
    image: {
      name: 'Contrast',
      disableCache,
      amount: 1.2,
      image: {
        name: 'OverlayBlendColor',
        disableCache,
        disableIntermediateCaches,
        dstImage: image,
        srcColor: 'rgba(127, 187, 227, .2)'
      }
    }
  }),

  EarlybirdCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Sepia',
    disableCache,
    amount: 0.2,
    image: {
      name: 'Contrast',
      disableCache,
      amount: 0.9,
      image: {
        name: 'OverlayBlend',
        disableCache,
        resizeCanvasTo: 'dstImage',
        dstImage: image,
        srcImage: {
          name: 'RadialGradient',
          disableCache: disableIntermediateCaches,
          colors: ['rgb(208, 186, 142)', 'rgb(54, 3, 9)', 'rgb(29, 2, 16)'],
          stops: [0.2, 0.85, 1],
          radius: '70min'
        }
      }
    }
  }),

  GinghamCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'HueRotate',
    disableCache,
    amount: degToRad(-10),
    image: {
      name: 'Brightness',
      disableCache,
      amount: 1.05,
      image: {
        name: 'SoftLightBlendColor',
        disableCache,
        disableIntermediateCaches,
        dstImage: image,
        srcColor: 'rgb(230, 230, 250)'
      }
    }
  }),

  HudsonCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Saturate',
    disableCache,
    amount: 1.1,
    image: {
      name: 'Contrast',
      disableCache,
      amount: 0.9,
      image: {
        name: 'Brightness',
        disableCache,
        amount: 1.2,
        image: {
          name: 'MultiplyBlend',
          disableCache,
          resizeCanvasTo: 'dstImage',
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
      }
    }
  }),

  InkwellCompat: ({ image, disableCache }: CSSGramConfig) => ({
    name: 'Grayscale',
    disableCache,
    amount: 1,
    image: {
      name: 'Brightness',
      disableCache,
      amount: 1.1,
      image: {
        name: 'Contrast',
        disableCache,
        amount: 1.1,
        image: {
          name: 'Sepia',
          disableCache,
          amount: 0.3,
          image
        }
      }
    }
  }),

  KelvinCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'OverlayBlendColor',
    disableCache,
    disableIntermediateCaches,
    dstImage: {
      name: 'ColorDodgeBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: image,
      srcColor: 'rgb(56, 44, 52)'
    },
    srcColor: 'rgb(183, 125, 33)'
  }),

  LarkCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Contrast',
    disableCache,
    amount: 0.9,
    image: {
      name: 'DarkenBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: {
        name: 'ColorDodgeBlendColor',
        disableCache,
        disableIntermediateCaches,
        dstImage: image,
        srcColor: 'rgb(34, 37, 63)'
      },
      srcColor: 'rgba(242, 242, 242, 0.8)'
    }
  }),

  LofiCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Contrast',
    disableCache,
    amount: 1.5,
    image: {
      name: 'Saturate',
      disableCache,
      amount: 1.1,
      image: {
        name: 'MultiplyBlend',
        disableCache,
        resizeCanvasTo: 'dstImage',
        dstImage: image,
        srcImage: {
          name: 'RadialGradient',
          disableCache: disableIntermediateCaches,
          colors: [rgbaToRgb(background, 'rgba(255, 255, 255, 0)'), 'rgb(172, 172, 172)'],
          stops: [0.7, 1],
          radius: '70min'
        }
      }
    }
  }),

  MavenCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Saturate',
    disableCache,
    amount: 1.5,
    image: {
      name: 'Contrast',
      disableCache,
      amount: 0.95,
      image: {
        name: 'Brightness',
        disableCache,
        amount: 0.95,
        image: {
          name: 'Sepia',
          disableCache,
          amount: 0.25,
          image: {
            name: 'HueBlendColor',
            disableCache,
            disableIntermediateCaches,
            dstImage: image,
            srcColor: 'rgba(3, 230, 26, 0.2)'
          }
        }
      }
    }
  }),

  MayfairCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Saturate',
    disableCache,
    amount: 1.1,
    image: {
      name: 'Contrast',
      disableCache,
      amount: 1.1,
      image: {
        name: 'OverlayBlend',
        disableCache,
        resizeCanvasTo: 'dstImage',
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
          center: { x: '40w', y: '60h' }
        }
      }
    }
  }),

  MoonCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Brightness',
    disableCache,
    amount: 1.1,
    image: {
      name: 'Contrast',
      disableCache,
      amount: 1.1,
      image: {
        name: 'Grayscale',
        disableCache,
        amount: 1,
        image: {
          name: 'LightenBlendColor',
          disableCache,
          disableIntermediateCaches,
          dstImage: {
            name: 'SoftLightBlendColor',
            disableCache,
            disableIntermediateCaches,
            dstImage: image,
            srcColor: 'rgb(160, 160, 160)'
          },
          srcColor: 'rgb(56, 56, 56)'
        }
      }
    }
  }),

  NashvilleCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Saturate',
    disableCache,
    amount: 1.2,
    image: {
      name: 'Brightness',
      disableCache,
      amount: 1.05,
      image: {
        name: 'Contrast',
        disableCache,
        amount: 1.2,
        image: {
          name: 'Sepia',
          disableCache,
          amount: 0.2,
          image: {
            name: 'LightenBlendColor',
            disableCache,
            disableIntermediateCaches,
            dstImage: {
              name: 'DarkenBlendColor',
              disableCache,
              disableIntermediateCaches,
              dstImage: image,
              srcColor: 'rgba(247, 176, 153, 0.56)'
            },
            srcColor: 'rgba(0, 70, 150, 0.4)'
          }
        }
      }
    }
  }),

  PerpetuaCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'SoftLightBlend',
    disableCache,
    resizeCanvasTo: 'dstImage',
    dstImage: image,
    srcImage: {
      name: 'LinearGradient',
      disableCache: disableIntermediateCaches,
      start: { x: '0w', y: '100h' },
      end: { x: '0w', y: '0h' },
      colors: ['rgba(0, 91, 154, 0.5)', 'rgba(230, 193, 61, 0.5)']
    }
  }),

  ReyesCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Saturate',
    disableCache,
    amount: 0.75,
    image: {
      name: 'Contrast',
      disableCache,
      amount: 0.85,
      image: {
        name: 'Brightness',
        disableCache,
        amount: 1.1,
        image: {
          name: 'Sepia',
          disableCache,
          amount: 0.22,
          image: {
            name: 'SoftLightBlendColor',
            disableCache,
            disableIntermediateCaches,
            dstImage: image,
            srcColor: 'rgba(239, 205, 173, 0.5)'
          }
        }
      }
    }
  }),

  RiseCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Saturate',
    disableCache,
    amount: 0.9,
    image: {
      name: 'Contrast',
      disableCache,
      amount: 0.9,
      image: {
        name: 'Sepia',
        disableCache,
        amount: 0.2,
        image: {
          name: 'Brightness',
          disableCache,
          amount: 1.05,
          image: {
            name: 'OverlayBlend',
            disableCache,
            resizeCanvasTo: 'dstImage',
            dstImage: {
              name: 'MultiplyBlend',
              disableCache,
              resizeCanvasTo: 'dstImage',
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
        }
      }
    }
  }),

  SlumberCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Brightness',
    disableCache,
    amount: 1.05,
    image: {
      name: 'Saturate',
      disableCache,
      amount: 0.66,
      image: {
        name: 'SoftLightBlendColor',
        disableCache,
        disableIntermediateCaches,
        dstImage: {
          name: 'LightenBlendColor',
          disableCache,
          disableIntermediateCaches,
          dstImage: image,
          srcColor: 'rgba(69, 41, 12, 0.4)'
        },
        srcColor: 'rgba(125, 105, 24, 0.5)'
      }
    }
  }),

  StinsonCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Brightness',
    disableCache,
    amount: 1.15,
    image: {
      name: 'Saturate',
      disableCache,
      amount: 0.85,
      image: {
        name: 'Contrast',
        disableCache,
        amount: 0.75,
        image: {
          name: 'SoftLightBlendColor',
          disableCache,
          disableIntermediateCaches,
          dstImage: image,
          srcColor: 'rgba(240, 149, 128, 0.2)'
        }
      }
    }
  }),

  ToasterCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Brightness',
    disableCache,
    amount: 0.9,
    image: {
      name: 'Contrast',
      disableCache,
      amount: 1.5,
      image: {
        name: 'ScreenBlend',
        disableCache,
        resizeCanvasTo: 'dstImage',
        dstImage: image,
        srcImage: {
          name: 'RadialGradient',
          disableCache: disableIntermediateCaches,
          colors: [`rgb(128, 78, 15)`, `rgb(59, 0, 59)`],
          radius: '70min'
        }
      }
    }
  }),

  ValenciaCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Sepia',
    disableCache,
    amount: 0.08,
    image: {
      name: 'Brightness',
      disableCache,
      amount: 1.08,
      image: {
        name: 'Contrast',
        disableCache,
        amount: 1.08,
        image: {
          name: 'ExclusionBlendColor',
          disableCache,
          disableIntermediateCaches,
          dstImage: image,
          srcColor: 'rgba(58, 3, 57, 0.5)'
        }
      }
    }
  }),

  WaldenCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Saturate',
    disableCache,
    amount: 1.6,
    image: {
      name: 'Sepia',
      disableCache,
      amount: 0.3,
      image: {
        name: 'HueRotate',
        disableCache,
        amount: degToRad(-10),
        image: {
          name: 'Brightness',
          disableCache,
          amount: 1.1,
          image: {
            name: 'ScreenBlendColor',
            disableCache,
            disableIntermediateCaches,
            dstImage: image,
            srcColor: 'rgba(0, 68, 204, 0.3)'
          }
        }
      }
    }
  }),

  WillowCompat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Brightness',
    disableCache,
    amount: 0.9,
    image: {
      name: 'Contrast',
      disableCache,
      amount: 0.95,
      image: {
        name: 'Grayscale',
        disableCache,
        amount: 0.5,
        image: {
          name: 'ColorBlendColor',
          disableCache,
          disableIntermediateCaches,
          dstImage: {
            name: 'OverlayBlend',
            disableCache,
            resizeCanvasTo: 'dstImage',
            dstImage: image,
            srcImage: {
              name: 'RadialGradient',
              disableCache: disableIntermediateCaches,
              colors: [`rgb(212, 169, 175)`, `rgb(112, 89, 92)`],
              stops: [0.55, 1],
              radius: '70min'
            }
          },
          srcColor: 'rgb(216, 205, 203)'
        }
      }
    }
  }),

  Xpro2Compat: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Sepia',
    disableCache,
    amount: 0.3,
    image: {
      name: 'ColorBurnBlend',
      disableCache,
      resizeCanvasTo: 'dstImage',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        disableCache: disableIntermediateCaches,
        colors: ['rgb(230, 231, 224)', 'rgba(70, 69, 170, 0.66)'],
        stops: [0.4, 1],
        radius: '72.5min'
      }
    }
  }),

  _1977: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'ScreenBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: image,
      srcColor: 'rgba(243, 106, 188, .3)'
    },
    matrix: concatColorMatrices([contrast(1.1), brightness(1.1), saturate(1.3)]),
    disableCache
  }),

  Aden: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'DarkenBlend',
      disableCache,
      resizeCanvasTo: 'dstImage',
      dstImage: image,
      srcImage: {
        name: 'LinearGradient',
        disableCache: disableIntermediateCaches,
        colors: ['rgba(66, 10, 14, .2)', 'transparent']
      }
    },
    matrix: concatColorMatrices([
      hueRotate(degToRad(-20)),
      contrast(0.9),
      saturate(0.85),
      brightness(1.2)
    ]),
    disableCache
  }),

  Brannan: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'LightenBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: image,
      srcColor: 'rgba(161, 44, 199, .31)'
    },
    matrix: concatColorMatrices([sepia(0.5), contrast(1.4)]),
    disableCache
  }),

  Brooklyn: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'OverlayBlend',
      disableCache,
      resizeCanvasTo: 'dstImage',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        disableCache: disableIntermediateCaches,
        colors: ['rgba(168, 223, 193, .4)', 'rgb(196, 183, 200)'],
        stops: [0.7, 1],
        radius: '70min'
      }
    },
    matrix: concatColorMatrices([contrast(0.9), brightness(1.1)]),
    disableCache
  }),

  Clarendon: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'Contrast',
      disableCache,
      amount: 1.2,
      image: {
        name: 'OverlayBlendColor',
        disableCache,
        disableIntermediateCaches,
        dstImage: image,
        srcColor: 'rgba(127, 187, 227, .2)'
      }
    },
    matrix: saturate(1.35),
    disableCache
  }),

  Earlybird: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'OverlayBlend',
      disableCache,
      resizeCanvasTo: 'dstImage',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        disableCache: disableIntermediateCaches,
        colors: ['rgb(208, 186, 142)', 'rgb(54, 3, 9)', 'rgb(29, 2, 16)'],
        stops: [0.2, 0.85, 1],
        radius: '70min'
      }
    },
    matrix: concatColorMatrices([contrast(0.9), sepia(0.2)]),
    disableCache
  }),

  Gingham: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'SoftLightBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: image,
      srcColor: 'rgb(230, 230, 250)'
    },
    matrix: concatColorMatrices([brightness(1.05), hueRotate(degToRad(-10))]),
    disableCache
  }),

  Hudson: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'MultiplyBlend',
      disableCache,
      resizeCanvasTo: 'dstImage',
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
    },
    matrix: concatColorMatrices([brightness(1.2), contrast(0.9), saturate(1.1)]),
    disableCache
  }),

  Inkwell: ({ image, disableCache }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image,
    matrix: concatColorMatrices([sepia(0.3), contrast(1.1), brightness(1.1), grayscale(1)]),
    disableCache
  }),

  Kelvin: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'OverlayBlendColor',
    disableCache,
    disableIntermediateCaches,
    dstImage: {
      name: 'ColorDodgeBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: image,
      srcColor: 'rgb(56, 44, 52)'
    },
    srcColor: 'rgb(183, 125, 33)'
  }),

  Lark: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    matrix: contrast(0.9),
    disableCache,
    image: {
      name: 'DarkenBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: {
        name: 'ColorDodgeBlendColor',
        disableCache,
        disableIntermediateCaches,
        dstImage: image,
        srcColor: 'rgb(34, 37, 63)'
      },
      srcColor: 'rgba(242, 242, 242, 0.8)'
    }
  }),

  Lofi: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'MultiplyBlend',
      disableCache,
      resizeCanvasTo: 'dstImage',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        disableCache: disableIntermediateCaches,
        colors: [rgbaToRgb(background, 'rgba(255, 255, 255, 0)'), 'rgb(172, 172, 172)'],
        stops: [0.7, 1],
        radius: '70min'
      }
    },
    matrix: concatColorMatrices([saturate(1.1), contrast(1.5)]),
    disableCache
  }),

  Maven: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'HueBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: image,
      srcColor: 'rgba(3, 230, 26, 0.2)'
    },
    matrix: concatColorMatrices([sepia(0.25), brightness(0.95), contrast(0.95), saturate(1.5)]),
    disableCache
  }),

  Mayfair: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'OverlayBlend',
      disableCache,
      resizeCanvasTo: 'dstImage',
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
        center: { x: '40w', y: '60h' }
      }
    },
    matrix: concatColorMatrices([contrast(1.1), saturate(1.1)]),
    disableCache
  }),

  Moon: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'LightenBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: {
        name: 'SoftLightBlendColor',
        disableCache,
        disableIntermediateCaches,
        dstImage: image,
        srcColor: 'rgb(160, 160, 160)'
      },
      srcColor: 'rgb(56, 56, 56)'
    },
    matrix: concatColorMatrices([grayscale(1), contrast(1.1), brightness(1.1)]),
    disableCache
  }),

  Nashville: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'LightenBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: {
        name: 'DarkenBlendColor',
        disableCache,
        disableIntermediateCaches,
        dstImage: image,
        srcColor: 'rgba(247, 176, 153, 0.56)'
      },
      srcColor: 'rgba(0, 70, 150, 0.4)'
    },
    matrix: concatColorMatrices([sepia(0.2), contrast(1.2), brightness(1.05), saturate(1.2)]),
    disableCache
  }),

  Perpetua: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'SoftLightBlend',
    disableCache,
    resizeCanvasTo: 'dstImage',
    dstImage: image,
    srcImage: {
      name: 'LinearGradient',
      disableCache: disableIntermediateCaches,
      start: { x: '0w', y: '100h' },
      end: { x: '0w', y: '0h' },
      colors: ['rgba(0, 91, 154, 0.5)', 'rgba(230, 193, 61, 0.5)']
    }
  }),

  Reyes: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'SoftLightBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: image,
      srcColor: 'rgba(239, 205, 173, 0.5)'
    },
    matrix: concatColorMatrices([sepia(0.22), brightness(1.1), contrast(0.85), saturate(0.75)]),
    disableCache
  }),

  Rise: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'OverlayBlend',
      disableCache,
      resizeCanvasTo: 'dstImage',
      dstImage: {
        name: 'MultiplyBlend',
        disableCache,
        resizeCanvasTo: 'dstImage',
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
    },
    matrix: concatColorMatrices([brightness(1.05), sepia(0.2), contrast(0.9), saturate(0.9)]),
    disableCache
  }),

  Slumber: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'SoftLightBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: {
        name: 'LightenBlendColor',
        disableCache,
        disableIntermediateCaches,
        dstImage: image,
        srcColor: 'rgba(69, 41, 12, 0.4)'
      },
      srcColor: 'rgba(125, 105, 24, 0.5)'
    },
    matrix: concatColorMatrices([saturate(0.66), brightness(1.05)]),
    disableCache
  }),

  Stinson: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'SoftLightBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: image,
      srcColor: 'rgba(240, 149, 128, 0.2)'
    },
    matrix: concatColorMatrices([contrast(0.75), saturate(0.85), brightness(1.15)]),
    disableCache
  }),

  Toaster: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'ScreenBlend',
      disableCache,
      resizeCanvasTo: 'dstImage',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        disableCache: disableIntermediateCaches,
        colors: [`rgb(128, 78, 15)`, `rgb(59, 0, 59)`],
        radius: '70min'
      }
    },
    matrix: concatColorMatrices([contrast(1.5), brightness(0.9)]),
    disableCache
  }),

  Valencia: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'ExclusionBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: image,
      srcColor: 'rgba(58, 3, 57, 0.5)'
    },
    matrix: concatColorMatrices([contrast(1.08), brightness(1.08), sepia(0.08)]),
    disableCache
  }),

  Walden: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'ScreenBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: image,
      srcColor: 'rgba(0, 68, 204, 0.3)'
    },
    matrix: concatColorMatrices([
      brightness(1.1),
      hueRotate(degToRad(-10)),
      sepia(0.3),
      saturate(1.6)
    ]),
    disableCache
  }),

  Willow: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    image: {
      name: 'ColorBlendColor',
      disableCache,
      disableIntermediateCaches,
      dstImage: {
        name: 'OverlayBlend',
        disableCache,
        resizeCanvasTo: 'dstImage',
        dstImage: image,
        srcImage: {
          name: 'RadialGradient',
          disableCache: disableIntermediateCaches,
          colors: [`rgb(212, 169, 175)`, `rgb(112, 89, 92)`],
          stops: [0.55, 1],
          radius: '70min'
        }
      },
      srcColor: 'rgb(216, 205, 203)'
    },
    matrix: concatColorMatrices([grayscale(0.5), contrast(0.95), brightness(0.9)]),
    disableCache
  }),

  Xpro2: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'ColorMatrix',
    disableCache,
    matrix: sepia(0.3),
    image: {
      name: 'ColorBurnBlend',
      disableCache,
      resizeCanvasTo: 'dstImage',
      dstImage: image,
      srcImage: {
        name: 'RadialGradient',
        disableCache: disableIntermediateCaches,
        colors: ['rgb(230, 231, 224)', 'rgba(70, 69, 170, 0.66)'],
        stops: [0.4, 1],
        radius: '72.5min'
      }
    }
  })
}
