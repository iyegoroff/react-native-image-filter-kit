import * as React from 'react'
import {
  GenericImageFilter,
  QuadGradient,
  RadialGradient,
  RadialGradientConfig,
  SweepGradient,
  LinearGradient,
  EllipticalGradient,
  Position,
  RectangularGradient
} from 'react-native-image-filter-kit'
import { Image, ScrollView, Text } from 'react-native'
import { Ashby, Poprocket, InstagramCSSExtensionConfig, PoprocketStandalone } from './InstagramCSS'

const uri = 'https://picturepan2.github.io/instagram.css/assets/img/instagram.jpg'

const style = { width: 320, height: 500, marginBottom: 25 }

const textStyle = { fontSize: 20 }

const image = (
  <Image
    style={style}
    source={{ uri }}
  />
)

const colors = ['red', 'blue', 'green', 'blue', 'red'] as RadialGradientConfig['colors']
const stops = [0, 0.25, 0.5, 0.75, 1] as RadialGradientConfig['stops']

const center: Position = {
  x: '50w',
  y: '50h'
}

const app = () => (
  <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
    <RectangularGradient
      halfWidth={'25min'}
      halfHeight={'25min'}
      center={center}
      colors={colors}
      stops={stops}
      style={style}
    />
    <RectangularGradient
      halfWidth={'25max'}
      halfHeight={'25max'}
      center={center}
      colors={colors}
      stops={stops}
      style={style}
      mixStep={'SMOOTH'}
    />
    <EllipticalGradient
      radiusX={'25w'}
      radiusY={'50h'}
      center={center}
      colors={colors}
      stops={stops}
      style={style}
    />
    <EllipticalGradient
      radiusX={'50w'}
      radiusY={'25h'}
      center={center}
      colors={colors}
      stops={stops}
      style={style}
      mixStep={'SMOOTH'}
    />
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
      center={center}
      colors={colors}
      stops={stops}
      style={style}
    />
    <RadialGradient
      center={center}
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
