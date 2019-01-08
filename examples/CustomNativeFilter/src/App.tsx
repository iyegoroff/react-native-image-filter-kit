import * as React from 'react'
import { GenericImageFilter } from 'react-native-image-filter-kit'
import { Image, View, Slider, StatusBar } from 'react-native'
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

  render() {
    const { distance, color } = this.state

    return (
      <View style={{ alignItems: 'center', height: '100%' }}>
        <StatusBar hidden={true} />
        <GenericImageFilter<HazeRemovalExtensionConfig>
          config={{
            name: 'HazeRemoval',
            image: image,
            color,
            distance: Math.trunc(distance * 100) / 100
          }}
        />
        <Slider
          style={{ width: '95%', height: 50 }}
          minimumValue={0}
          maximumValue={1}
          value={distance}
          onValueChange={this.setDistance}
        />
        <ColorWheel
          initialColor={color}
          onColorChange={this.setColor}
          style={{ width: '100%', flex: 1 }}
        />
      </View>
    )
  }
}

export default App
