import React, { Component } from 'react';
import { unflatten } from 'flat'; 
import deepmerge from 'deepmerge';
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
import {
  ImageBoxBlurFilter,
  ImageGaussianBlurFilter,
  ImageDiscBlurFilter,
  ImageMedianFilterFilter,
  ImageMotionBlurFilter,
  ImageNoiseReductionFilter,
  ImageZoomBlurFilter,
  ImageColorControlsFilter,
  ImageColorClampFilter,
  ImageMaskToAlphaFilter,
  ImageMaximumComponentFilter,
  ImageMinimumComponentFilter,
  ImagePhotoEffectChromeFilter,
  ImagePhotoEffectFadeFilter,
  ImagePhotoEffectInstantFilter,
  ImagePhotoEffectMonoFilter,
  ImagePhotoEffectNoirFilter,
  ImagePhotoEffectProcessFilter,
  ImagePhotoEffectTonalFilter,
  ImagePhotoEffectTransferFilter,
  ImageColorInvertFilter,
  ImageColorPosterizeFilter,
  ImageVibranceFilter,
  ImageCircularScreenFilter
} from 'react-native-image-filter-kit';

class FilterSlider extends Component {
  render() {
    const { label, value, min, max } = this.props;
    const interval = Math.abs(min) + Math.abs(max);

    return (
      <View style={styles.sliderContainer}>
        <Text
          style={styles.text}
          numberOfLines={1}
          ellipsizeMode={'middle'}
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
    const {source, filters, background} = this.props;
    const {original, ...values} = this.state;

    const image = (
      <Image
        style={[styles.image, {backgroundColor: background}]}
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

    const options = {
      arrayMerge: (d, s) => (
        Array(Math.max(d.length, s.length)).fill(0).map((_, i) => s[i] !== undefined ? s[i] : d[i])
      )
    };

    const filters = controls.sliders.reduce(
      (acc, { label, value }) => deepmerge(acc, unflatten({[label]: value}), options),
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
  state = {
    image: require('./673px-Ara_macao_-flying_away-8a.png'),
    background: 'transparent'
  };

  filters = [
    [{
      name: 'Circular screen',
      Filter: ImageCircularScreenFilter,
      filterWidth: [0, 300],
      sharpness: [-10, 10],
      'center.x': [0, 1],
      'center.y': [0, 1]
    }],
    [{
      name: 'Vibrance',
      Filter: ImageVibranceFilter,
      amount: [-10, 10]
    }],
    // [{
    //   name: 'Box blur',
    //   Filter: ImageBoxBlurFilter,
    //   radius: [0, 100]
    // }],
    // [{
    //   name: 'Disc blur',
    //   Filter: ImageDiscBlurFilter,
    //   radius: [0, 100]
    // }],
    // [{
    //   name: 'Gaussian blur',
    //   Filter: ImageGaussianBlurFilter,
    //   radius: [0, 100]
    // }],
    // [{
    //   name: 'Median filter',
    //   Filter: ImageMedianFilterFilter
    // }],
    // [{
    //   name: 'Motion blur',
    //   Filter: ImageMotionBlurFilter,
    //   radius: [0, 100],
    //   angle: [-Math.PI, Math.PI]
    // }],
    // [{
    //   name: 'Noise reduction',
    //   Filter: ImageNoiseReductionFilter,
    //   noiseLevel: [0, 1],
    //   sharpness: [0, 30]
    // }],
    // [{
    //   name: 'Color controls',
    //   Filter: ImageColorControlsFilter,
    //   saturation: [-10, 10],
    //   brightness: [-10, 10],
    //   contrast: [-10, 10]
    // }],
    // [{
    //   name: 'Zoom blur',
    //   Filter: ImageZoomBlurFilter,
    //   amount: [0, 100],
    //   'center.x': [0, 1],
    //   'center.y': [0, 1]
    // }],
    // [{
    //   name: 'Color clamp',
    //   Filter: ImageColorClampFilter,
    //   'minComponents.0': [0, 1],
    //   'minComponents.1': [0, 1],
    //   'minComponents.2': [0, 1],
    //   'minComponents.3': [0, 1],
    //   'maxComponents.0': [0, 1],
    //   'maxComponents.1': [0, 1],
    //   'maxComponents.2': [0, 1],
    //   'maxComponents.3': [0, 1]
    // }],
    //   [{ name: 'Mask to alpha', Filter: ImageMaskToAlphaFilter }],
    //   [{ name: 'Maximum component', Filter: ImageMaximumComponentFilter }],
    //   [{ name: 'Minimum component', Filter: ImageMinimumComponentFilter }],
    //   [{ name: 'Photo effect "Chrome"', Filter: ImagePhotoEffectChromeFilter }],
    //   [{ name: 'Photo effect "Fade"', Filter: ImagePhotoEffectFadeFilter }],
    //   [{ name: 'Photo effect "Instant"', Filter: ImagePhotoEffectInstantFilter }],
    //   [{ name: 'Photo effect "Mono"', Filter: ImagePhotoEffectMonoFilter }],
    //   [{ name: 'Photo effect "Noir"', Filter: ImagePhotoEffectNoirFilter }],
    //   [{ name: 'Photo effect "Process"', Filter: ImagePhotoEffectProcessFilter }],
    //   [{ name: 'Photo effect "Tonal"', Filter: ImagePhotoEffectTonalFilter }],
    //   [{ name: 'Photo effect "Transfer"', Filter: ImagePhotoEffectTransferFilter }],
    //   [{ name: 'Color invert', Filter: ImageColorInvertFilter }],
    //   [{
    //     name: 'Color posterize',
    //     Filter: ImageColorPosterizeFilter,
    //     levels: [0, 50]
    //   }],
  ];

  // filters = [
  //   [{
  //     name: 'Normal',
  //     Filter: ImageNormalMatrixFilter
  //   }],
  //   [{
  //     name: 'Saturate',
  //     Filter: ImageSaturateMatrixFilter,
  //     value: [-10, 10]
  //   }],
  //   [{
  //     name: 'HueRotate',
  //     Filter: ImageHueRotateMatrixFilter,
  //     value: [-10, 10]
  //   }],
  //   [{
  //     name: 'Luminance to alpha',
  //     Filter: ImageLuminanceToAlphaMatrixFilter
  //   }],
  //   [{
  //     name: 'Invert',
  //     Filter: ImageInvertMatrixFilter
  //   }],
  //   [{
  //     name: 'Grayscale',
  //     Filter: ImageGrayscaleMatrixFilter
  //   }],
  //   [{
  //     name: 'Sepia',
  //     Filter: ImageSepiaMatrixFilter
  //   }],
  //   [{
  //     name: 'Nightvision',
  //     Filter: ImageNightvisionMatrixFilter
  //   }],
  //   [{
  //     name: 'Warm',
  //     Filter: ImageWarmMatrixFilter
  //   }],
  //   [{
  //     name: 'Cool',
  //     Filter: ImageCoolMatrixFilter
  //   }],
  //   [{
  //     name: 'Brightness',
  //     Filter: ImageBrightnessMatrixFilter,
  //     value: [-100, 100]
  //   }],
  //   [{
  //     name: 'Exposure',
  //     Filter: ImageExposureMatrixFilter,
  //     value: [0, 5]
  //   }],
  //   [{
  //     name: 'Contrast',
  //     Filter: ImageContrastMatrixFilter,
  //     value: [0, 5]
  //   }],
  //   [{
  //     name: 'Temperature',
  //     Filter: ImageTemperatureMatrixFilter,
  //     value: [-5, 5]
  //   }],
  //   [{
  //     name: 'Tint',
  //     Filter: ImageTintMatrixFilter,
  //     value: [-5, 5]
  //   }],
  //   [{
  //     name:'Threshold',
  //     Filter: ImageThresholdMatrixFilter,
  //     value: [0, 255]
  //   }],
  //   [{
  //     name: 'Protanomaly',
  //     Filter: ImageProtanomalyMatrixFilter
  //   }],
  //   [{
  //     name: 'Deuteranomaly',
  //     Filter: ImageDeuteranomalyMatrixFilter
  //   }],
  //   [{
  //     name: 'Tritanomaly',
  //     Filter: ImageTritanomalyMatrixFilter
  //   }],
  //   [{
  //     name: 'Protanopia',
  //     Filter: ImageProtanopiaMatrixFilter
  //   }],
  //   [{
  //     name: 'Deuteranopia',
  //     Filter: ImageDeuteranopiaMatrixFilter
  //   }],
  //   [{
  //     name: 'Tritanopia',
  //     Filter: ImageTritanopiaMatrixFilter
  //   }],
  //   [{
  //     name: 'Achromatopsia',
  //     Filter: ImageAchromatopsiaMatrixFilter
  //   }],
  //   [{
  //     name: 'Achromatomaly',
  //     Filter: ImageAchromatomalyMatrixFilter
  //   }]
  // ];

  changeImage = () => {
    const imageId = Math.round(Math.random() * 992);

    this.setState({
      image: {
        uri: `https://picsum.photos/${imageHeight}?image=${imageId}&t=${Date.now()}`,
        cache: `force-cache`
      }
    });
  }

  changeBackground = () => {
    const r = Math.trunc(Math.random() * 255);
    const g = Math.trunc(Math.random() * 255);
    const b = Math.trunc(Math.random() * 255);
    const a = Math.trunc(Math.random() * 100) / 100;

    this.setState({
      background: `rgba(${r}, ${g}, ${b}, ${a})`
    });
  }

  render() {
    const { image, background } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Text>Press and hold on filtered image to see original</Text>
        <Button
          onPress={this.changeImage}
          title={'Random image'}
        />
        <Button
          onPress={this.changeBackground}
          title={'Random background'}
        />
        <Text>{`Current background: \n${background}`}</Text>
        {this.filters.map((filter, i) => (
          <FilteredImage source={image} filters={filter} key={i} background={background} />
        ))}
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
    resizeMode: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 5
  },
  text: {
    minWidth: 100,
    width: '30%'
  }
});
