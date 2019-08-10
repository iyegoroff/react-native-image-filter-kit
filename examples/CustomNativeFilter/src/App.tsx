import * as React from 'react'
import { GenericImageFilter } from 'react-native-image-filter-kit'
import { Image, View, Slider, StatusBar, Text, StyleSheet } from 'react-native'
import { HazeRemovalExtensionConfig, init } from 'react-native-image-filter-kit-haze-removal'
const { ColorWheel } = require('react-native-color-wheel')
const colorsys = require('colorsys')

init()

const uri = 'https://raw.githubusercontent.com/iyegoroff/react-native-image-filter-kit/master/img' +
  '/parrot.png'

const style = { width: 320, height: 320 }

const image = (
  <Image
    style={style}
    source={{ uri }}
  />
)

const styles = StyleSheet.create({
  container: { alignItems: 'center', height: '100%' },
  slider: { width: '95%' },
  colorWheel: { width: '100%', flex: 1 },
  info: { position: 'absolute', left: 0, bottom: 0, backgroundColor: '#00000080', padding: 5 },
  text: { color: 'white', fontSize: 18, fontWeight: 'bold' }
})

class App extends React.Component<{}, { distance: number, color: string }> {

  constructor(props: {}) {
    super(props)

    this.state = {
      distance: 0.2,
      color: '#ff0000'
    }
  }

  setDistance = (distance: number) => {
    this.setState({ distance })
  }

  setColor = (color: object) => {
    this.setState({ color: colorsys.hsvToHex(color) })
  }

  roundedDistance = (distance: number) => Math.trunc(distance * 100) / 100

  render() {
    const { distance, color } = this.state
    const roundedDistance = this.roundedDistance(distance)

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <GenericImageFilter<HazeRemovalExtensionConfig>
          config={{
            name: 'HazeRemoval',
            image: image,
            color,
            distance: roundedDistance
          }}
        />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={distance}
          onSlidingComplete={this.setDistance}
        />
        <ColorWheel
          initialColor={color}
          onColorChange={this.setColor}
          style={styles.colorWheel}
        />
        <View
          pointerEvents={'none'}
          style={styles.info}
        >
          <Text style={styles.text}>{`distance: ${roundedDistance}`}</Text>
          <Text style={styles.text}>{`color: ${color}`}</Text>
        </View>
      </View>
    )
  }
}

export default App
