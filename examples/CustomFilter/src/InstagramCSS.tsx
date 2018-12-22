import * as React from 'react'
import {
  registerFilter,
  ConfigCase,
  Brightness,
  Sepia,
  ScreenBlend,
  RadialGradientGenerator,
  ConfigWithIntermediates
} from 'react-native-image-filter-kit'

interface InstagramCSSConfig<Rest = never>
  extends ConfigWithIntermediates<InstagramCSSExtensionConfig<Rest>> { }

export type InstagramCSSExtensionConfig<Rest = never> =
  | ConfigCase<'Ashby', InstagramCSSConfig<Rest>>
  | ConfigCase<'Poprocket', InstagramCSSConfig<Rest>>

/**
 *  Ashby Filter - https://github.com/picturepan2/instagram.css/blob/master/src/_ashby.scss
 *
 *     .filter-ashby {
 *       filter: sepia(.5) contrast(1.2) saturate(1.8);
 *
 *       &::before {
 *         background: rgba(125, 105, 24, .35);
 *         content: "";
 *         mix-blend-mode: lighten;
 *       }
 *     }
 */
export const Ashby = registerFilter(
  'Ashby',
  {
    image: 'image',
    disableCache: 'bool',
    disableIntermediateCaches: 'bool'
  },
  ({ image, disableCache, disableIntermediateCaches = true }: InstagramCSSConfig) => ({
    name: 'Saturate',
    disableCache,
    amount: 1.8,
    image: {
      name: 'Contrast',
      disableCache,
      amount: 1.2,
      image: {
        name: 'Sepia',
        disableCache,
        amount: 0.5,
        image: {
          name: 'LightenBlendColor',
          disableCache,
          disableIntermediateCaches,
          dstImage: image,
          srcColor: 'rgba(125, 105, 24, 0.35)'
        }
      }
    }
  })
)

/**
 *  Poprocket Filter - https://github.com/picturepan2/instagram.css/blob/master/src/_poprocket.scss
 *
 *     .filter-poprocket {
 *       filter: sepia(.15) brightness(1.2);
 *
 *       &::before {
 *         background: radial-gradient(
 *           circle closest-corner,
 *           rgba(206, 39, 70, .75) 40 %,
 *           rgba(0, 0, 0, 1) 80 %
 *         );
 *         content: "";
 *         mix-blend-mode: screen;
 *       }
 *     }
 */
export const Poprocket = registerFilter(
  'Poprocket',
  {
    image: 'image',
    disableCache: 'bool',
    disableIntermediateCaches: 'bool'
  },
  ({ image, disableCache, disableIntermediateCaches = true }: InstagramCSSConfig) => ({
    name: 'Brightness',
    disableCache,
    amount: 1.2,
    image: {
      name: 'Sepia',
      disableCache,
      amount: 0.15,
      image: {
        name: 'ScreenBlend',
        disableCache,
        resizeCanvasTo: 'dstImage',
        dstImage: image,
        srcImage: {
          name: 'RadialGradientGenerator',
          disableCache: disableIntermediateCaches,
          colors: ['rgba(206, 39, 70, 0.75)', 'rgba(0, 0, 0, 1)'],
          stops: [0.4, 0.8],
          radius: '70min'
        }
      }
    }
  })
)

/**
 * It is possible to create custom filter just with JSX without registering it, but in this case
 * the resulting filter can't be mixed with other filters
 */
export const PoprocketStandalone = (
  { image, disableCache, disableIntermediateCaches = true }: ConfigWithIntermediates
) => (
  <Brightness
    disableCache={disableCache}
    amount={1.2}
    image={
      <Sepia
        disableCache={disableCache}
        amount={0.15}
        image={
          <ScreenBlend
            disableCache={disableCache}
            resizeCanvasTo={'dstImage'}
            dstImage={image}
            srcImage={
              <RadialGradientGenerator
                disableCache={disableIntermediateCaches}
                colors={['rgba(206, 39, 70, 0.75)', 'rgba(0, 0, 0, 1)']}
                stops={[0.4, 0.8]}
                radius={'70min'}
              />
            }
          />
        }
      />
    }
  />
)
