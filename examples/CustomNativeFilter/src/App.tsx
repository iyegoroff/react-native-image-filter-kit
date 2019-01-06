import * as React from 'react'
import { GenericImageFilter, ImageFilter } from 'react-native-image-filter-kit'
import { Image, ScrollView } from 'react-native'

const uri = 'https://picturepan2.github.io/instagram.css/assets/img/instagram.jpg'

const style = { width: 320, height: 320 }

const image = (
  <Image
    style={style}
    source={{ uri }}
  />
)

const app = () => (
  <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
    <ImageFilter
      config={{
        name: 'Grayscale',
        image
      }}
    />
  </ScrollView>
)

export default app
