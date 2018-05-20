import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Slider,
  TouchableWithoutFeedback,
  Button
} from 'react-native';
import {
  ImageNormalMatrixFilter,
  ImageSaturateMatrixFilter,
  ImageHueRotateMatrixFilter,
  ImageLuminanceToAlphaMatrixFilter,
  ImageInvertMatrixFilter,
  ImageGrayscaleMatrixFilter,
  ImageSepiaMatrixFilter,
  ImageNightvisionMatrixFilter,
  ImageWarmMatrixFilter,
  ImageCoolMatrixFilter,
  ImageBrightnessMatrixFilter,
  ImageExposureMatrixFilter,
  ImageContrastMatrixFilter,
  ImageTemperatureMatrixFilter,
  ImageTintMatrixFilter,
  ImageThresholdMatrixFilter,
  ImageProtanomalyMatrixFilter,
  ImageDeuteranomalyMatrixFilter,
  ImageTritanomalyMatrixFilter,
  ImageProtanopiaMatrixFilter,
  ImageDeuteranopiaMatrixFilter,
  ImageTritanopiaMatrixFilter,
  ImageAchromatopsiaMatrixFilter,
  ImageAchromatomalyMatrixFilter
} from 'react-native-image-filter-kit';

// ios
// import {
//   ImageBoxBlurFilterIOS,
//   ImageGaussianBlurFilterIOS,
//   ImageDiscBlurFilterIOS,
//   ImageMedianFilterFilterIOS,
//   ImageMotionBlurFilterIOS,
//   ImageNoiseReductionFilterIOS,
//   ImageZoomBlurFilterIOS,
//   ImageColorControlsFilterIOS
// } from 'react-native-image-filter-kit';

class FilterSlider extends Component {
  render() {
    const { label, value, min, max } = this.props;
    const interval = Math.abs(min) + Math.abs(max);

    return (
      <View style={styles.sliderContainer}>
        <Text
          style={styles.text}
          numberOfLines={1}
        >
          {`${label}: ${Math.round(value * 10) / 10}`}
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
    const {source, filters} = this.props;
    const {original, ...values} = this.state;

    const image = (
      <Image
        style={styles.image}
        source={source}
      /> 
    );

    const controlProps = filters.map(f => this.controlProps(f));
    const filterProps = controlProps.map(c => this.filterProps(c));

    return (
      <View style={styles.view}>
        {controlProps.map(c => this.renderControls(c))}
        <TouchableWithoutFeedback
          onPressIn={this.showOriginal}
          onPressOut={this.hideOriginal}
        >
          <View>
            {original ? image : this.renderFilters(filterProps, image)}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderFilters(filterProps, image) {
    return filterProps.reduceRight(
      (content, { Filter, filters }) => <Filter {...filters}>{content}</Filter>,
      image
    );
  }

  renderControls(controls) {
    const { name, sliders } = controls;

    return (
      <React.Fragment key={name}>
        <Text style={styles.title}>{name}</Text>
        {sliders.map(props => <FilterSlider {...props} onValueChange={this.updateValue} />)}
      </React.Fragment>
    )
  }

  filterProps(controls) {
    const { sliders, Filter } = controls;

    const filters = controls.sliders.reduce(
      (acc, { label, value }) => { acc[label] = value; return acc; },
      {}
    );

    return { filters, Filter };
  }

  controlProps(filter) {
    const {name, Filter, ...ranges} = filter;
    const {original, ...values} = this.state;

    const sliders = Object.entries(ranges).map(([valueName, [min, max]]) => {
      const key = `${name}_${valueName}`;

      return {
        key,
        name: key,
        label: valueName,
        value: values[key] === undefined ? (min + max) / 2 : values[key],
        min,
        max
      };
    });

    return { sliders, name, Filter };
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

        // <FilteredImage
        //   name='Box blur'
        //   Filter={ImageBoxBlurFilterIOS}
        //   radius={[0, 100]}
        // /> 
        // <FilteredImage
        //   name='Gaussian blur'
        //   Filter={ImageGaussianBlurFilterIOS}
        //   radius={[0, 100]}
        // /> 
        // <FilteredImage
        //   name='Disc blur'
        //   Filter={ImageDiscBlurFilterIOS}
        //   radius={[0, 100]}
        // /> 
        // <FilteredImage
        //   name='Median filter'
        //   Filter={ImageMedianFilterFilterIOS}
        // /> 
        // <FilteredImage
        //   name='Motion blur'
        //   Filter={ImageMotionBlurFilterIOS}
        //   radius={[0, 100]}
        //   angle={[-Math.PI, Math.PI]}
        // /> 
        // <FilteredImage
        //   name='Noise reduction'
        //   Filter={ImageNoiseReductionFilterIOS}
        //   noiseLevel={[-1, 1]}
        //   sharpness={[-1, 1]}
        // /> 
        // {/* <FilteredImage
        //   name='Zoom blur'
        //   Filter={ImageZoomBlurFilterIOS}
        //   center={[-1, 1]}
        //   amount={[-1, 1]}
        // /> */}
        // <FilteredImage
        //   name='Color controls'
        //   Filter={ImageColorControlsFilterIOS}
        //   saturation={[-10, 10]}
        //   brightness={[-10, 10]}
        //   contrast={[-10, 10]}
        // /> 

const imageHeight = 300;

export default class App extends Component {
  state = { image: require('./673px-Ara_macao_-flying_away-8a.png') };

  filters = [
    [{
      name: 'Normal',
      Filter: ImageNormalMatrixFilter
    }],
    [{
      name: 'Saturate',
      Filter: ImageSaturateMatrixFilter,
      value: [-10, 10]
    }],
    [{
      name: 'HueRotate',
      Filter: ImageHueRotateMatrixFilter,
      value: [-10, 10]
    }],
    [{
      name: 'Luminance to alpha',
      Filter: ImageLuminanceToAlphaMatrixFilter
    }],
    [{
      name: 'Invert',
      Filter: ImageInvertMatrixFilter
    }],
    [{
      name: 'Grayscale',
      Filter: ImageGrayscaleMatrixFilter
    }],
    [{
      name: 'Sepia',
      Filter: ImageSepiaMatrixFilter
    }],
    [{
      name: 'Nightvision',
      Filter: ImageNightvisionMatrixFilter
    }],
    [{
      name: 'Warm',
      Filter: ImageWarmMatrixFilter
    }],
    [{
      name: 'Cool',
      Filter: ImageCoolMatrixFilter
    }],
    [{
      name: 'Brightness',
      Filter: ImageBrightnessMatrixFilter,
      value: [-100, 100]
    }],
    [{
      name: 'Exposure',
      Filter: ImageExposureMatrixFilter,
      value: [0, 5]
    }],
    [{
      name: 'Contrast',
      Filter: ImageContrastMatrixFilter,
      value: [0, 5]
    }],
    [{
      name: 'Temperature',
      Filter: ImageTemperatureMatrixFilter,
      value: [-5, 5]
    }],
    [{
      name: 'Tint',
      Filter: ImageTintMatrixFilter,
      value: [-5, 5]
    }],
    [{
      name:'Threshold',
      Filter: ImageThresholdMatrixFilter,
      value: [0, 255]
    }],
    [{
      name: 'Protanomaly',
      Filter: ImageProtanomalyMatrixFilter
    }],
    [{
      name: 'Deuteranomaly',
      Filter: ImageDeuteranomalyMatrixFilter
    }],
    [{
      name: 'Tritanomaly',
      Filter: ImageTritanomalyMatrixFilter
    }],
    [{
      name: 'Protanopia',
      Filter: ImageProtanopiaMatrixFilter
    }],
    [{
      name: 'Deuteranopia',
      Filter: ImageDeuteranopiaMatrixFilter
    }],
    [{
      name: 'Tritanopia',
      Filter: ImageTritanopiaMatrixFilter
    }],
    [{
      name: 'Achromatopsia',
      Filter: ImageAchromatopsiaMatrixFilter
    }],
    [{
      name: 'Achromatomaly',
      Filter: ImageAchromatomalyMatrixFilter
    }]
  ];

  changeImage = () => {
    this.setState({
      image: {
        uri: `https://picsum.photos/${imageHeight}?random&t=${Date.now()}`
      }
    });
  }

  render() {
    const { image } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Text>Press and hold on filtered image to see original</Text>
        <Button
          onPress={this.changeImage}
          title={'Change image'}
        />
        {this.filters.map((filter, i) => <FilteredImage source={image} filters={filter} key={i} />)}
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
    height: imageHeight,
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
