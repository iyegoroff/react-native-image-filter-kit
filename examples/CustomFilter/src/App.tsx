import * as React from 'react'
import {
  GenericImageFilter,
  QuadGradient,
  RadialGradient,
  RadialGradientConfig,
  SweepGradient,
  LinearGradient
} from 'react-native-image-filter-kit'
import { Image, ScrollView, Text } from 'react-native'
import { Ashby, Poprocket, InstagramCSSExtensionConfig, PoprocketStandalone } from './InstagramCSS'

const uri = 'https://picturepan2.github.io/instagram.css/assets/img/instagram.jpg'

const style = { width: 320, height: 320, marginBottom: 25 }

const textStyle = { fontSize: 20 }

const image = (
  <Image
    style={style}
    source={{ uri }}
  />
)

const colors = ['red', 'blue', 'green', 'blue', 'red'] as RadialGradientConfig['colors']
const stops = [0, 0.25, 0.5, 0.75, 1] as RadialGradientConfig['stops']

const app = () => (
  <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
    <LinearGradient
      colors={colors}
      stops={stops}
      style={style}
    />
    <LinearGradient
      colors={colors}
      stops={stops}
      style={style}
      mixStep={'SMOOTH'}
    />
    <SweepGradient
      colors={colors}
      stops={stops}
      style={style}
    />
    <SweepGradient
      colors={colors}
      stops={stops}
      style={style}
      mixStep={'SMOOTH'}
    />
    <RadialGradient
      colors={colors}
      stops={stops}
      style={style}
    />
    <RadialGradient
      style={style}
      colors={colors}
      stops={stops}
      mixStep={'SMOOTH'}
    />
    <QuadGradient
      style={style}
      bottomLeftColor={'black'}
      bottomRightColor={'green'}
      topLeftColor={'red'}
      topRightColor={'black'}
    />

    {image}

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
