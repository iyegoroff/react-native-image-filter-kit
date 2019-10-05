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

const colors = ['red', 'blue', 'green', 'white', 'red'] as RadialGradientConfig['colors']
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
  </ScrollView>
)

export default app
