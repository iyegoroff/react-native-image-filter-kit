import * as React from 'react'
import { registerFilter, Config, ImageFilter } from 'react-native-image-filter-kit'
import { Image, ScrollView } from 'react-native'

// Poprocket Filter - https://github.com/picturepan2/instagram.css/blob/master/src/_poprocket.scss
// .filter-poprocket {
//   filter: sepia(.15) brightness(1.2);

//   &::before {
//     background:
//       radial-gradient(circle closest-corner, rgba(206, 39, 70, .75) 40 %, rgba(0, 0, 0, 1) 80 %);
//     content: "";
//     mix-blend-mode: screen;
//   }
// }

interface PoprocketConfig {
  readonly image: React.ReactElement<unknown> | Config
  readonly disableCache?: boolean
  readonly disableIntermediateCaches?: boolean
}

const Poprocket = registerFilter(
  'Poprocket',
  {
    image: 'image',
    disableCache: 'bool',
    disableIntermediateCaches: 'bool'
  },
  ({ image, disableCache, disableIntermediateCaches = true }: PoprocketConfig) => ({
    name: 'Brightness',
    disableCache,
    amount: 1.2,
    image: {
      name: 'Sepia',
      amount: 0.15,
      disableCache,
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

const uri = 'https://picturepan2.github.io/instagram.css/assets/img/instagram.jpg'

const style = { width: 320, height: 320 }

const app = () => (
  <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
    <Poprocket
      image={
        <Image
          source={{ uri }}
          style={style}
        />
      }
    />
    <ImageFilter
      config={{
        name: 'Poprocket',
        image: (
          <Image
            source={{ uri }}
            style={style}
          />
        )
      } as any}
    />
  </ScrollView>
)

export default app
