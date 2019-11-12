import * as React from 'react'
import { GenericImageFilter } from 'react-native-image-filter-kit'
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

/*
import * as React from 'react'
import {
  GenericImageFilter,
  SrcATopComposition,
  CircleShape,
  RegularPolygonShape,
  Grayscale,
  Nightvision,
  Sepia,
  Kodachrome,
  XorComposition,
  Lsd
} from 'react-native-image-filter-kit'
import { Image, ScrollView, Text, ImageURISource } from 'react-native'
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

class App extends React.Component<{}> {

  state: {
    first?: ImageURISource
    second?: ImageURISource
    extFirst?: any
    extSecond?: any
    enableExtract?: boolean
    power: number
  } = {
    power: 1
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        power: 0,
        extFirst: ({ nativeEvent: { uri } }: any) => {
          this.setState({ first: { uri } })
          console.warn('first', uri)
        },
        extSecond: ({ nativeEvent: { uri } }: any) => {
          this.setState({ second: { uri } })
          console.warn('second', uri)
        }
      })

      setTimeout(() => {
        this.setState({ enableExtract: true })

        setTimeout(() => {
          this.setState({ power: 1 })

          setTimeout(() => {
            this.setState({ power: 0.5 })

            setTimeout(() => {
              this.setState({ power: 1 })
            }, 5000)
          }, 5000)
        }, 5000)
      }, 3000)
    }, 2000)
  }

  render() {
    const { first, second, extFirst, extSecond, enableExtract, power } = this.state

    return (
      <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <XorComposition
          srcImage={
            <Sepia image={image} amount={power} />
          }
          dstImage={
            <CircleShape />
          }
          resizeCanvasTo={'srcImage'}
          extractImageEnabled={enableExtract}
          onExtractImage={extFirst}
          onFilteringError={({ nativeEvent: { message } }) => console.warn(message)}
        />

        <SrcATopComposition
          srcImage={
            <Grayscale image={image} amount={power} />
          }
          dstImage={
            <RegularPolygonShape />
          }
          resizeCanvasTo={'srcImage'}
          extractImageEnabled={enableExtract}
          onExtractImage={extSecond}
          onFilteringError={({ nativeEvent: { message } }) => console.warn(message)}
        />

        {first !== undefined && (
          <Image style={[style, { backgroundColor: 'wheat' }]} source={first} />
        )}

        {second !== undefined && (
          <Image style={[style, { backgroundColor: 'wheat' }]} source={second} />
        )}
      </ScrollView>
    )
  }
}

export default App
*/
