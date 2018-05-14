import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Slider,
  TouchableWithoutFeedback
} from 'react-native';
import {
  ImageNormalFilter,
  ImageSaturateFilter,
  ImageHueRotateFilter,
  ImageLuminanceToAlphaFilter,
  ImageInvertFilter,
  ImageGrayscaleFilter,
  ImageSepiaFilter,
  ImageNightvisionFilter,
  ImageWarmFilter,
  ImageCoolFilter,
  ImageBrightnessFilter,
  ImageExposureFilter,
  ImageContrastFilter,
  ImageTemperatureFilter,
  ImageTintFilter,
  ImageThresholdFilter,
  ImageProtanomalyFilter,
  ImageDeuteranomalyFilter,
  ImageTritanomalyFilter,
  ImageProtanopiaFilter,
  ImageDeuteranopiaFilter,
  ImageTritanopiaFilter,
  ImageAchromatopsiaFilter,
  ImageAchromatomalyFilter
} from 'react-native-image-filter-kit';

// ios
import {
  ImageBoxBlurFilterIOS,
  ImageGaussianBlurFilterIOS,
  ImageDiscBlurFilterIOS,
  ImageMedianFilterFilterIOS,
  ImageMotionBlurFilterIOS,
  ImageNoiseReductionFilterIOS,
  ImageZoomBlurFilterIOS,
  ImageColorControlsFilterIOS
} from 'react-native-image-filter-kit';

const parrot = require('./673px-Ara_macao_-flying_away-8a.png');
// const parrot = {uri: 'https://i.stack.imgur.com/WCveg.jpg'};

class FilterSlider extends Component {
  render() {
    const {name, value, min, max} = this.props;
    const interval = Math.abs(min) + Math.abs(max);

    return (
      <View style={styles.sliderContainer}>
        <Text
          style={styles.text}
          numberOfLines={1}
        >
          {`${name}: ${Math.round(value * 10) / 10}`}
        </Text>
        <Slider
          style={styles.slider}
          onValueChange={this.update}
          value={value}
          maximumValue={max} 
          minimumValue={min}
          step={interval >= 20 ? 0.1 : (interval / 200)}
        />
      </View>
    );
  }

  update = (value) => {
    const {name, onValueChange} = this.props;
    onValueChange(name, value);
  }
}

class FilteredImage extends Component {
  state = {};

  render() {
    const {name, Filter, ...ranges} = this.props;
    const {original, ...values} = this.state;

    const image = (
      <Image
        style={styles.image}
        source={parrot}
      /> 
    );

    const slidersProps = Object.entries(ranges).map(([valueName, [min, max]]) => ({
      key: valueName,
      name: valueName,
      value: values[valueName] === undefined ? (min + max) / 2 : values[valueName],
      min,
      max
    }));

    const filterProps = slidersProps.reduce(
      (acc, {name, value}) => { acc[name] = value; return acc; },
      {}
    );

    return (
      <View style={styles.view}>
        <Text style={styles.title}>{name}</Text>
        {slidersProps.map(props => <FilterSlider {...props} onValueChange={this.updateValue} />)}
        <TouchableWithoutFeedback
          onPressIn={this.showOriginal}
          onPressOut={this.hideOriginal}
        >
          <View>
            {original ? image : <Filter {...filterProps}>{image}</Filter>}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  updateValue = (name, value) => {
    this.setState({[name]: value});
  }

  showOriginal = () => {
    this.setState({original: true});
  }

  hideOriginal = () => {
    this.setState({original: false});
  }
}

export default class App extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <FilteredImage
          name='Normal'
          Filter={ImageNormalFilter}
        /> 
        <FilteredImage
          name='Saturate'
          Filter={ImageSaturateFilter}
          value={[-10, 10]}
        />
        <FilteredImage
          name='HueRotate'
          Filter={ImageHueRotateFilter}
          value={[-10, 10]}
        />
        <FilteredImage
          name='Luminance to alpha'
          Filter={ImageLuminanceToAlphaFilter}
        />
        <FilteredImage
          name='Invert'
          Filter={ImageInvertFilter}
        />
        <FilteredImage
          name='Grayscale'
          Filter={ImageGrayscaleFilter}
        />
        <FilteredImage
          name='Sepia'
          Filter={ImageSepiaFilter}
        />
        <FilteredImage
          name='Nightvision'
          Filter={ImageNightvisionFilter}
        />
        <FilteredImage
          name='Warm'
          Filter={ImageWarmFilter}
        />
        <FilteredImage
          name='Cool'
          Filter={ImageCoolFilter}
        />
        <FilteredImage
          name='Brightness'
          Filter={ImageBrightnessFilter}
          value={[-100, 100]}
        />
        <FilteredImage
          name='Exposure'
          Filter={ImageExposureFilter}
          value={[0, 5]}
        />
        <FilteredImage
          name='Contrast'
          Filter={ImageContrastFilter}
          value={[0, 5]}
        />
        <FilteredImage
          name='Temperature'
          Filter={ImageTemperatureFilter}
          value={[-5, 5]}
        />
        <FilteredImage
          name='Tint'
          Filter={ImageTintFilter}
          value={[-5, 5]}
        />
        <FilteredImage
          name='Threshold'
          Filter={ImageThresholdFilter}
          value={[0, 255]}
        />
        <FilteredImage
          name='Protanomaly'
          Filter={ImageProtanomalyFilter}
        />
        <FilteredImage
          name='Deuteranomaly'
          Filter={ImageDeuteranomalyFilter}
        />
        <FilteredImage
          name='Tritanomaly'
          Filter={ImageTritanomalyFilter}
        />
        <FilteredImage
          name='Protanopia'
          Filter={ImageProtanopiaFilter}
        />
        <FilteredImage
          name='Deuteranopia'
          Filter={ImageDeuteranopiaFilter}
        />
        <FilteredImage
          name='Tritanopia'
          Filter={ImageTritanopiaFilter}
        />
        <FilteredImage
          name='Achromatopsia'
          Filter={ImageAchromatopsiaFilter}
        />
        <FilteredImage
          name='Achromatomaly'
          Filter={ImageAchromatomalyFilter}
        />
        <FilteredImage
          name='Box blur'
          Filter={ImageBoxBlurFilterIOS}
          radius={[0, 100]}
        /> 
        <FilteredImage
          name='Gaussian blur'
          Filter={ImageGaussianBlurFilterIOS}
          radius={[0, 100]}
        /> 
        <FilteredImage
          name='Disc blur'
          Filter={ImageDiscBlurFilterIOS}
          radius={[0, 100]}
        /> 
        <FilteredImage
          name='Median filter'
          Filter={ImageMedianFilterFilterIOS}
        /> 
        <FilteredImage
          name='Motion blur'
          Filter={ImageMotionBlurFilterIOS}
          radius={[0, 100]}
          angle={[-Math.PI, Math.PI]}
        /> 
        <FilteredImage
          name='Noise reduction'
          Filter={ImageNoiseReductionFilterIOS}
          noiseLevel={[-1, 1]}
          sharpness={[-1, 1]}
        /> 
        {/* <FilteredImage
          name='Zoom blur'
          Filter={ImageZoomBlurFilterIOS}
          center={[-1, 1]}
          amount={[-1, 1]}
        /> */}
        <FilteredImage
          name='Color controls'
          Filter={ImageColorControlsFilterIOS}
          saturation={[-10, 10]}
          brightness={[-10, 10]}
          contrast={[-10, 10]}
        /> 
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    backgroundColor: '#F5FCFF',
  },
  view: {
    marginBottom: 35 
  },
  sliderContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  slider: {
    flex: 1
  },
  image: {
    marginTop: 5,
    width: '100%',
    height: 300,
    resizeMode: 'cover'
  },
  title: {
    fontSize: 20,
    marginBottom: 5
  },
  text: {
    width: 100
  }
});
