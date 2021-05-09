import * as React from 'react'
import { GenericImageFilter } from 'react-native-image-filter-kit'
import { Image, ScrollView, Text } from 'react-native'
import { Ashby, Poprocket, InstagramCSSExtensionConfig, PoprocketStandalone } from './InstagramCSS'

const uri = 'https://picturepan2.github.io/instagram.css/assets/img/instagram.jpg'

const style = { width: 320, height: 320, marginBottom: 25 }

const textStyle = { fontSize: 20 }

const image = <Image style={style} source={{ uri }} />

const app = () => (
  <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
    <Text style={textStyle}>{'Ashby'}</Text>
    <Ashby image={image} />

    <Text style={textStyle}>{'Poprocket'}</Text>
    <Poprocket image={image} />

    <Text style={textStyle}>{'PoprocketStandalone'}</Text>
    <PoprocketStandalone image={image} />

    <Text style={textStyle}>{'Poprocket + Ashby'}</Text>
    <Poprocket image={<Ashby image={image} />} />

    <Text style={textStyle}>{'Ashby + Poprocket'}</Text>
    <GenericImageFilter<InstagramCSSExtensionConfig> /* in JS this can be just ImageFilter */
      config={{
        name: 'Poprocket',
        image: {
          name: 'Ashby',
          image
        }
      }}
    />
  </ScrollView>
)

export default app
