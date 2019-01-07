import * as React from 'react'
import { GenericImageFilter } from 'react-native-image-filter-kit'
import { Image, ScrollView } from 'react-native'
import { HazeRemoval, HazeRemovalExtensionConfig } from 'react-native-image-filter-kit-haze-removal'

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
    <HazeRemoval
      image={image}
      distance={1}
      slope={1}
    />

    {/* <GenericImageFilter<HazeRemovalExtensionConfig>
      config={{
        name: 'HazeRemoval',
        image
      }}
    /> */}
  </ScrollView>
)

export default app
