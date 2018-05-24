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
  Button,
  Switch
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
  CIBoxBlur,
  CIGaussianBlur,
  CIDiscBlur,
  CIMedianFilter,
  CIMotionBlur,
  CINoiseReduction,
  CIZoomBlur,
  CIColorControls,
  CIColorClamp,
  CIMaskToAlpha,
  CIMaximumComponent,
  CIMinimumComponent,
  CIPhotoEffectChrome,
  CIPhotoEffectFade,
  CIPhotoEffectInstant,
  CIPhotoEffectMono,
  CIPhotoEffectNoir,
  CIPhotoEffectProcess,
  CIPhotoEffectTonal,
  CIPhotoEffectTransfer,
  CIColorInvert,
  CIColorPosterize,
  CIVibrance,
  CICircularScreen,
  CICircleSplashDistortion,
  CICircularWrap,
  CIBumpDistortion,
  CIBumpDistortionLinear,
  CIUnsharpMask,
  CISharpenLuminance
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
      (content, { Filter, filters }) => <Filter {...filters} resizeOutput={true}>{content}</Filter>,
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
    const { name, Filter, ...ranges } = filter;
    const { original, ...values } = this.state;

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

const imageHeight = 300;

export default class App extends Component {
  state = {
    image: require('./673px-Ara_macao_-flying_away-8a.png'),
    background: 'transparent'
  };

  filters = [
    [{
      name: 'Sharpen luminance',
      Filter: CISharpenLuminance,
      inputSharpness: [-10, 10]
    }],
    [{
      name: 'Unsharp mask',
      Filter: CIUnsharpMask,
      inputRadius: [0, 100],
      inputIntensity: [0, 30]
    }],
    // [{
    //   name: 'Circular wrap',
    //   Filter: CICircularWrap,
    //   'inputCenter.x': [0, 1],
    //   'inputCenter.y': [0, 1],
    //   inputRadius: [0, 300],
    //   inputAngle: [-Math.PI, Math.PI]
    // }],
    // [{
    //   name: 'Cicle splash distortion',
    //   Filter: CICircleSplashDistortion,
    //   'inputCenter.x': [0, 1],
    //   'inputCenter.y': [0, 1],
    //   inputRadius: [0, 100],
    // }],
    // [{
    //   name: 'Bump distortion linear',
    //   Filter: CIBumpDistortionLinear,
    //   'inputCenter.x': [0, 1],
    //   'inputCenter.y': [0, 1],
    //   inputRadius: [0, 100],
    //   inputScale: [0, 3],
    //   inputAngle: [-Math.PI, Math.PI]
    // }],
    // [{
    //   name: 'Bump distortion',
    //   Filter: CIBumpDistortion,
    //   'inputCenter.x': [0, 1],
    //   'inputCenter.y': [0, 1],
    //   inputRadius: [0, 100],
    //   inputScale: [0, 3]
    // }],
    // [{
    //   name: 'Circular screen',
    //   Filter: CICircularScreen,
    //   inputWidth: [0, 300],
    //   inputSharpness: [-10, 10],
    //   'inputCenter.x': [0, 1],
    //   'inputCenter.y': [0, 1]
    // }],
    // [{
    //   name: 'Vibrance',
    //   Filter: CIVibrance,
    //   inputAmount: [-10, 10]
    // }],
    // [{
    //   name: 'Box blur',
    //   Filter: CIBoxBlur,
    //   inputRadius: [0, 100]
    // }],
    // [{
    //   name: 'Disc blur',
    //   Filter: CIDiscBlur,
    //   inputRadius: [0, 100]
    // }],
    // [{
    //   name: 'Gaussian blur',
    //   Filter: CIGaussianBlur,
    //   inputRadius: [0, 100]
    // }],
    // [{
    //   name: 'Median filter',
    //   Filter: CIMedianFilter
    // }],
    // [{
    //   name: 'Motion blur',
    //   Filter: CIMotionBlur,
    //   inputRadius: [0, 100],
    //   inputAngle: [-Math.PI, Math.PI]
    // }],
    // [{
    //   name: 'Noise reduction',
    //   Filter: CINoiseReduction,
    //   inputNoiseLevel: [0, 1],
    //   inputSharpness: [0, 30]
    // }]
    // [{
    //   name: 'Color controls',
    //   Filter: CIColorControls,
    //   inputSaturation: [-10, 10],
    //   inputBrightness: [-10, 10],
    //   inputContrast: [-10, 10]
    // }],
    // [{
    //   name: 'Zoom blur',
    //   Filter: CIZoomBlur,
    //   inputAmount: [0, 100],
    //   'inputCenter.x': [0, 1],
    //   'inputCenter.y': [0, 1]
    // }],
    // [{
    //   name: 'Color clamp',
    //   Filter: CIColorClamp,
    //   'inputMinComponents.0': [0, 1],
    //   'inputMinComponents.1': [0, 1],
    //   'inputMinComponents.2': [0, 1],
    //   'inputMinComponents.3': [0, 1],
    //   'inputMaxComponents.0': [0, 1],
    //   'inputMaxComponents.1': [0, 1],
    //   'inputMaxComponents.2': [0, 1],
    //   'inputMaxComponents.3': [0, 1]
    // }],
    //   [{ name: 'Mask to alpha', Filter: CIMaskToAlpha }],
    //   [{ name: 'Maximum component', Filter: CIMaximumComponent }],
    //   [{ name: 'Minimum component', Filter: CIMinimumComponent }],
    //   [{ name: 'Photo effect "Chrome"', Filter: CIPhotoEffectChrome }],
    //   [{ name: 'Photo effect "Fade"', Filter: CIPhotoEffectFade }],
    //   [{ name: 'Photo effect "Instant"', Filter: CIPhotoEffectInstant }],
    //   [{ name: 'Photo effect "Mono"', Filter: CIPhotoEffectMono }],
    //   [{ name: 'Photo effect "Noir"', Filter: CIPhotoEffectNoir }],
    //   [{ name: 'Photo effect "Process"', Filter: CIPhotoEffectProcess }],
    //   [{ name: 'Photo effect "Tonal"', Filter: CIPhotoEffectTonal }],
    //   [{ name: 'Photo effect "Transfer"', Filter: CIPhotoEffectTransfer }],
    //   [{ name: 'Color invert', Filter: CIColorInvert }],
    //   [{
    //     name: 'Color posterize',
    //     Filter: CIColorPosterize,
    //     inputLevels: [0, 50]
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
    borderWidth: 1
  },
  slider: {
    flex: 1
  },
  image: {
    marginTop: 5,
    width: '100%',
    height: imageHeight,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 20,
    marginBottom: 5
  },
  text: {
  }
});
