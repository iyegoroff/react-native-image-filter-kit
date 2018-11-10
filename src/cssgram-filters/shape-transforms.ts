// tslint:disable:max-file-line-count

import rgbaToRgb from 'rgba-to-rgb'
import { Image } from 'react-native'

export interface CSSGramConfig {
  readonly image: Image
  readonly disableCache?: boolean
  readonly disableIntermediateCaches?: boolean
  readonly concatMatrices?: boolean
}

const degToRad = (deg: number) => Math.PI * deg / 180
const background = 'rgb(255, 255, 255)'

export const shapeTransforms = {
  _1977: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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

  Aden: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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
            scaleMode: { match: 'dstImage' },
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

  Brannan: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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

  Brooklyn: (
    { image, disableCache, disableIntermediateCaches = true }: CSSGramConfig
  ) => ({
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
        scaleMode: { match: 'dstImage' },
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

  Clarendon: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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

  Earlybird: (
    { image, disableCache, disableIntermediateCaches = true }: CSSGramConfig
  ) => ({
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
        scaleMode: { match: 'dstImage' },
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

  Gingham: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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

  Hudson: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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
          name: 'ModulateBlend',
          disableCache,
          scaleMode: { match: 'dstImage' },
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

  Inkwell: ({ image, disableCache }: CSSGramConfig) => ({
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

  Lofi: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Contrast',
    disableCache,
    amount: 1.5,
    image: {
      name: 'Saturate',
      disableCache,
      amount: 1.1,
      image: {
        name: 'ModulateBlend',
        disableCache,
        scaleMode: { match: 'dstImage' },
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

  Maven: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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

  Mayfair: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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
        scaleMode: { match: 'dstImage' },
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
    }
  }),

  Moon: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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

  Nashville: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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

  Perpetua: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'SoftLightBlend',
    disableCache,
    scaleMode: { match: 'dstImage' },
    dstImage: image,
    srcImage: {
      name: 'LinearGradient',
      disableCache: disableIntermediateCaches,
      x1: 0,
      y1: '100h',
      colors: ['rgba(0, 91, 154, 0.5)', 'rgba(230, 193, 61, 0.5)']
    }
  }),

  Reyes: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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

  Rise: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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
            scaleMode: { match: 'dstImage' },
            dstImage: {
              name: 'ModulateBlend',
              disableCache,
              scaleMode: { match: 'dstImage' },
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

  Slumber: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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

  Stinson: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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

  Toaster: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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
        scaleMode: { match: 'dstImage' },
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

  Valencia: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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

  Walden: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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

  Willow: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
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
            scaleMode: { match: 'dstImage' },
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

  Xpro2: ({ image, disableCache, disableIntermediateCaches = true }: CSSGramConfig) => ({
    name: 'Sepia',
    disableCache,
    amount: 0.3,
    image: {
      name: 'ColorBurnBlend',
      disableCache,
      scaleMode: { match: 'dstImage' },
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
