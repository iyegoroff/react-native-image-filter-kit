/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, PureComponent} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  Picker,
  Switch,
  Button,
  PickerIOS
} from 'react-native';
import {
  ImageFilter,
  RoundAsCircle,
  IterativeBoxBlur,
  PorterDuffXfermode,
  Color,
  concatColorMatrices,
  luminanceToAlpha,
  rgbaToRgb
} from 'react-native-image-filter-kit';
import matrices from 'rn-color-matrices';
import imageCacheHoc from 'react-native-image-cache-hoc';
import { ShapeRegistry } from '../dist/common/shape-registry';

const CacheableImage = imageCacheHoc(Image);

const imageStyle = { width: 320, height: 320, backgroundColor: 'green' }
const Pick = Platform.OS === 'ios' ? PickerIOS : Picker
const PickItem = Platform.OS === 'ios' ? PickerIOS.Item : Picker.Item

// Image.prefetch('http://www.maximumwall.com/wp-content/uploads/2017/01/wallpaper-image-nourriture-hd-13.jpg');
// Image.prefetch('https://media.ooreka.fr/public/image/plant/314/mainImage-source-11702050.jpg');

const degToRad = (deg) => Math.PI * deg / 180;
const background = 'rgb(255, 255, 255)';
const resizeMode = 'contain'
const atx = (
  <Image
    style={imageStyle}
    source={{ uri: 'https://una.im/CSSgram/img/atx.jpg' }}
    resizeMode={resizeMode}
  />
);

const bike = (
  <Image
    style={imageStyle}
    source={{ uri: 'https://una.im/CSSgram/img/bike.jpg' }}
    resizeMode={resizeMode}
  />
);

const cacti = (
  <Image
    style={imageStyle}
    source={{ uri: 'https://una.im/CSSgram/img/cacti.jpg' }}
    resizeMode={resizeMode}
  />
);

const tahoe = (
  <Image
    style={imageStyle}
    source={{ uri: 'https://una.im/CSSgram/img/tahoe.jpg' }}
    resizeMode={resizeMode}
  />
)

const dest = (
  <Image
    style={imageStyle}
    source={require('./dest.png')}
    resizeMode={resizeMode}
  />
);

const src = (
  <Image
    style={imageStyle}
    source={require('./src.png')}
    resizeMode={resizeMode}
  />
);

const parrot = (
  <Image
    style={imageStyle}
    source={require('./parrot.png')}
    resizeMode={resizeMode}
  />
);

const flowers = (
  <Image
    style={imageStyle}
    source={{ uri: 'https://media.ooreka.fr/public/image/plant/314/mainImage-source-11702050.jpg' }}
    resizeMode={resizeMode}
  />
);

const pizza = (
  <Image
    style={imageStyle}
    source={{ uri: 'http://www.maximumwall.com/wp-content/uploads/2017/01/wallpaper-image-nourriture-hd-13.jpg' }}
    resizeMode={resizeMode}
  />
);

const random = (
  <Image
    style={imageStyle}
    source={{ uri: 'https://picsum.photos/200/?random?t=' + Date.now() }}
    resizeMode={resizeMode}
  />
);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const Img = (props) => <Image {...props} />

class CSSGramItem extends PureComponent {
  static defaultProps = {
    filter: 'Normal',
    image: require('./parrot.png')
  }

  halfTimer = null;
  timer = null;

  state = { isFiltered: true, isHalf: false };

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.halfTimer);
  }

  render() {
    const { isFiltered } = this.state;

    return (
      <View style={styles.filter}>
        <TouchableWithoutFeedback onPress={this.pressed}>
          {isFiltered ? this.filteredImage() : this.image()}
        </TouchableWithoutFeedback>
        {isFiltered
          ? <View style={styles.textWrap}><Text style={styles.text}>{this.props.filter}</Text></View>
          : null}
      </View>
    );
  }

  image() {
    const { image: uri } = this.props;
    const Component = typeof uri === 'number' ? Image : CacheableImage;

    return (
      <Img
        style={this.state.isHalf ? styles.halfImage : styles.image}
        source={typeof uri === 'number' ? uri : { uri }}
        resizeMode={'contain'}
      />
    );
  }

  filteredImage() {
    return (
      <ImageFilter
        config={{
          name: this.props.filter,
          image: this.image(),
          disableCache: false,
        }}
      />
    );
  }

  pressed = () => {
    const { isFiltered } = this.state;

    // if (!isFiltered) {
    //   this.halfTimer = setTimeout(() => this.setState({ isHalf: true }), 1000);
    //   this.timer = setTimeout(() => this.setState({ isHalf: false }), 2000);
    // }
    this.setState({ isFiltered: !isFiltered });
  }
};

type Props = {};
export default class App extends Component<Props> {
  state = {
    t: Date.now(),
    blends: [
      'Modulate',
      'Multiply',
      'Difference',
      'Color',
      'Exclusion',
      'Luminosity',
      'HardLight',
      'Darken',
      'Saturation',
      'SoftLight',
      'Lighten',
      'Plus',
      'ColorBurn',
      'ColorDodge',
      'Hue',
      'Overlay',
      'Screen'
    ],
    selectedBlend: 'Lighten',
    blendImages: [
      { name: 'parrot', item: parrot },
      { name: 'tahoe', item: tahoe },
      { name: 'atx', item: atx },
      { name: 'cacti', item: cacti },
      { name: 'bike', item: bike },
      { name: 'dest', item: dest },
      { name: 'src', item: src },
      { name: 'pizza', item: pizza },
    ],
    firstSelectedImage: 'parrot',
    secondSelectedImage: 'tahoe',
    showList: false,
    selectedFilter: 'Normal_0',
    selectedImage: 'Parrot',
    images: [
      { name: 'Parrot', uri: require('./parrot.png') },
      { name: 'Pizza', uri: 'http://www.maximumwall.com/wp-content/uploads/2017/01/wallpaper-image-nourriture-hd-13.jpg' },
      { name: 'Coast', uri: 'https://thisismyhappiness.com/wp-content/uploads/2014/05/big-sur-bixby.jpg' },
      { name: 'Mountains', uri: 'https://www.highreshdwallpapers.com/wp-content/uploads/2011/09/Large-Format-HD-Wallpaper.jpg' },
      { name: 'Flowers', uri: 'https://media.ooreka.fr/public/image/plant/314/mainImage-source-11702050.jpg' },
      { name: 'Atx', uri: 'https://una.im/CSSgram/img/atx.jpg' },
      { name: 'Bike', uri: 'https://una.im/CSSgram/img/bike.jpg' },
      { name: 'Tahoe', uri: 'https://una.im/CSSgram/img/tahoe.jpg' },
      { name: 'Cacti', uri: 'https://una.im/CSSgram/img/cacti.jpg' },
      { name: 'LakeGeneva', uri: 'https://una.im/CSSgram/img/lakegeneva.jpg' }
    ],
    filters: [].concat.apply([], Array.from(Array(1)).map((x, i) => [
      { name: 'Normal', key: `Normal_${i}` },
      { name: 'Sepia', key: `Sepia_${i}` },
      { name: 'Saturate', key: `Saturate_${i}` },
      { name: 'HueRotate', key: `HueRotate_${i}` },
      { name: 'LuminanceToAlpha', key: `LuminanceToAlpha_${i}` },
      { name: 'Invert', key: `Invert_${i}` },
      { name: 'Grayscale', key: `Grayscale_${i}` },
      { name: 'Warm', key: `Warm_${i}` },
      { name: 'Cool', key: `Cool_${i}` },
      { name: 'Tint', key: `Tint_${i}` },
      { name: 'Night', key: `Night_${i}` },
      { name: 'Lsd', key: `Lsd_${i}` },
      { name: 'Browni', key: `Browni_${i}` },
      // { uri: 'https://una.im/CSSgram/img/bike.jpg', key: `bike_${i}` },
      // { uri: 'http://travellingmoods.com/wp-content/uploads/2015/05/New-York-City.jpg', key: `ny_${i}` },
      // { uri: 'https://wallpapercave.com/wp/ZXkSCiR.jpg', key: `paper_${i}` },
      // { uri: 'http://image.pbs.org/video-assets/iZOsUzY-asset-mezzanine-16x9-8YZsCRv.jpg', key: `asswwr_${i}` },
      // { uri: 'https://www.visitnsw.com/nsw-tales/wp-content/uploads/2013/08/The-Big-Merino-in-Goulburn-NSW-Image-Credit-Bec-Flickr.jpg', key: `flick_${i}` },
      // { uri: 'https://una.im/CSSgram/img/atx.jpg', key: `atx_${i}` },
      // { uri: 'https://thisismyhappiness.com/wp-content/uploads/2014/05/big-sur-bixby.jpg', key: `vig_${i}` },
      // { uri: 'http://www.guoguiyan.com/data/out/113/69175307-large-wallpapers.jpeg', key: `larg_${i}` },
      // { uri: 'https://una.im/CSSgram/img/tahoe.jpg', key: `tahoe_${i}` },
      // { uri: 'https://dailydatanews.com/wp-content/uploads/2017/08/ThinkstockPhotos-627427636.jpg', key: `lpg_${i}` },
      // { uri: 'http://patricksmithphotography.com/blog/wp-content/uploads/2015/05/101114-5428-TheSpectacleBig.jpg', key: `spec_${i}` },
      // { uri: 'https://www.highreshdwallpapers.com/wp-content/uploads/2011/09/Large-Format-HD-Wallpaper.jpg', key: `eee_${i}` },
      // { uri: 'https://una.im/CSSgram/img/cacti.jpg', key: `cacti_${i}` },
      // { uri: 'https://una.im/CSSgram/img/lakegeneva.jpg', key: `lakegeneva_${i}` },
      // { uri: 'http://www.hdwallpapery.com/static/images/Sv4BC_ltdPPcT.png', key: `Sv4BC_ltdPPcT_${i}` },
      // { uri: 'http://img.talkandroid.com/uploads/2015/03/square_cash_app_icon-450x450.png', key: `square_cash_app_icon-450x450_${i}` },
      // { name: 'Normal', key: `Normal_${i}` },
      // { name: 'Sharpen', key: `Sharpen_${i}` },
      // { name: 'Emboss', key: `Emboss_${i}` },
      // { name: 'EdgeDetection', key: `EdgeDetection_${i}` },
      // { name: 'FuzzyGlass', key: `FuzzyGlass_${i}` },
      { name: '_1977', key: `_1977_${i}` },
      { name: 'Aden', key: `Aden_${i}` },
      { name: 'Brannan', key: `Brannan_${i}` },
      { name: 'Brooklyn', key: `Brooklyn_${i}` },
      { name: 'Clarendon', key: `Clarendon_${i}` },
      { name: 'Earlybird', key: `Earlybird_${i}` },
      { name: 'Gingham', key: `Gingham_${i}` },
      { name: 'Hudson', key: `Hudson_${i}` },
      { name: 'Kelvin', key: `Kelvin_${i}` },
      { name: 'Lark', key: `Lark_${i}` },
      { name: 'Inkwell', key: `dInkwell_${i}` },
      { name: 'Lofi', key: `Lofi_${i}` },
      { name: 'Maven', key: `Maven_${i}` },
      { name: 'Mayfair', key: `Mayfair_${i}` },
      { name: 'Moon', key: `Moon_${i}` },
      { name: 'Nashville', key: `Nashville_${i}` },
      { name: 'Perpetua', key: `Perpetua_${i}` },
      { name: 'Reyes', key: `Reyes_${i}` },
      { name: 'Rise', key: `Rise_${i}` },
      { name: 'Slumber', key: `Slumber_${i}` },
      { name: 'Stinson', key: `Stinson_${i}` },
      { name: 'Toaster', key: `Toaster_${i}` },
      { name: 'Valencia', key: `Valencia_${i}` },
      { name: 'Walden', key: `Walden_${i}` },
      { name: 'Willow', key: `Willow_${i}` },
      { name: 'Xpro2', key: `Xpro2_${i}` }
    ]))
  };

  componentDidMount() {
    // this.interval = setInterval(() => this.setState({ t: Date.now() }), 7000);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  renderList() {
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={this.state.filters}
        renderItem={this.renderFilter}
      />
    );
  }

  renderSelect() {
    const { selectedFilter, first, filters, images, selectedImage } = this.state;
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Pick
          style={styles.picker}
          selectedValue={selectedFilter}
          onValueChange={this.filterChanged}
        >
          {filters.map(({ name, key }) => <PickItem value={key} label={name} key={key} />)}
        </Pick>
        <Pick
          style={styles.picker}
          selectedValue={selectedImage}
          onValueChange={this.valueChanged}
        >
          {images.map(({ name }) => <PickItem value={name} label={name} key={name} />)}
        </Pick>
        <CSSGramItem
          filter={filters.find(({ key }) => key === selectedFilter).name}
          image={images.find(({ name }) => name === selectedImage).uri}
        />
      </ScrollView>
    );
  }

  filterChanged = (item) => {
    this.setState({ selectedFilter: item })
  }

  valueChanged = (item) => {
    this.setState({ selectedImage: item })
  }

  renderBlend(name, firstSelectedImage, secondSelectedImage) {
    const blend = `${name}Blend`
    const blendColor = `${blend}Color`

    const config = {
      name: blend,
      dstResizeMode: 'CONTAIN',
      srcResizeMode: 'CONTAIN',
      // dstAnchor: { x: 0, y: 1 },
      // srcPosition: { x: 0, y: 1 },'
      // srcAnchor: { x: 0, y: 1 },
      // srcPosition: { x: 0, y: 1 }
    }

    return (
      <View>
        <Text>{blend}</Text>
        <ImageFilter
          key={blend + '1'}
          config={{
            dstImage: firstSelectedImage,
            srcImage: secondSelectedImage,
            ...config
          }}
        />
        <ImageFilter
          key={blend + '2'}
          config={{
            dstImage: secondSelectedImage,
            srcImage: firstSelectedImage,
            ...config
          }}
        />
        <Text>{blendColor}</Text>
        <ImageFilter
          key={blendColor}
          config={{
            name: blendColor,
            dstImage: firstSelectedImage,
            srcColor: '#0080ff80',
          }}
        />
      </View>
    )
  }

  blendChanged = (selectedBlend) => {
    this.setState({ selectedBlend })
  }

  firstImageChanged = (firstSelectedImage) => {
    this.setState({ firstSelectedImage })
  }

  secondImageChanged = (secondSelectedImage) => {
    this.setState({ secondSelectedImage })
  }

  image(name) {
    return this.state.blendImages.find(x => x.name === name).item
  }

  render() {
    const { selectedBlend, blends, firstSelectedImage, secondSelectedImage, blendImages } = this.state

    return (
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <ImageFilter
          key={'N'}
          config={{
            name: 'IFKHazeRemoval',
            inputColor: '#80ff0080',
            inputDistance: 0.5,
            inputSlope: -0.0001,
            inputImage: tahoe
          }}
        />
        {/* <Pick
          style={styles.picker}
          selectedValue={selectedBlend}
          onValueChange={this.blendChanged}
        >
          {blends.map((blend) => <PickItem value={blend} label={blend} key={blend} />)}
        </Pick>
        <Pick
          style={styles.picker}
          selectedValue={firstSelectedImage}
          onValueChange={this.firstImageChanged}
        >
          {blendImages.map(({ name }) => <PickItem value={name} label={name} key={name} />)}
        </Pick>
        <Pick
          style={styles.picker}
          selectedValue={secondSelectedImage}
          onValueChange={this.secondImageChanged}
        >
          {blendImages.map(({ name }) => <PickItem value={name} label={name} key={name} />)}
        </Pick>
        {this.renderBlend(selectedBlend, this.image(firstSelectedImage), this.image(secondSelectedImage))} */}
        {/* <ImageFilter
          key={'CITextImageGenerator'}
          config={{
            name: 'CITextImageGenerator',
            imageStyle: { height: 100, backgroundColor: 'red' },
            inputScaleFactor: 2,
            inputFontSize: 50,
            inputText: 'tesTsss'
          }}
        /> */}
        {/* <ImageFilter
          key={'CIHistogramDisplayFilter'}
          config={{
            name: 'CIHistogramDisplayFilter',
            inputImage: flowers,
            inputHeight: 200
          }}
        />
        <ImageFilter
          key={'CIHexagonalPixellate'}
          config={{
            name: 'CIHexagonalPixellate',
            inputImage: atx,
            inputCenter: { x: 0, y: 250 },
            inputScale: 15
          }}
        />
        <ImageFilter
          key={'CIFalseColor'}
          config={{
            name: 'CIFalseColor',
            inputColor0: 'red',
            inputColor1: 'green',
            inputImage: atx
          }}
        />
        <ImageFilter
          key={'CIHeightFieldFromMask'}
          config={{
            name: 'CIHeightFieldFromMask',
            inputImage: cacti,
            inputRadius: 2
          }}
        />
        <ImageFilter
          key={'CIMix'}
          config={{
            name: 'CIMix',
            inputImage: atx,
            inputBackgroundImage: cacti,
            inputAmount: 0.5
          }}
        />
        <ImageFilter
          key={'CIEdgeWork'}
          config={{
            name: 'CIEdgeWork',
            inputImage: parrot,
            inputRadius: 5
          }}
        /> */}
        {/* <ImageFilter
          key={'CISampleNearest'}
          config={{
            name: 'CISampleNearest',
            inputImage: parrot
          }}
        />
        <ImageFilter
          key={'CISaliencyMapFilter'}
          config={{
            name: 'CISaliencyMapFilter',
            inputImage: tahoe
          }}
        />
        <ImageFilter
          key={'CITwirlDistortion'}
          config={{
            name: 'CITwirlDistortion',
            inputImage: atx,
            inputCenter: { x: '50w', y: '50h' },
            inputAngle: Math.PI / 2,
            inputRadius: '50min',
          }}
        />
        <ImageFilter
          key={'CIVignetteEffect'}
          config={{
            name: 'CIVignetteEffect',
            inputImage: parrot,
            inputCenter: { x: '50w', y: '50h' },
            inputIntensity: 1,
            inputRadius: '25min',
            inputFalloff: 0
          }}
        />
        <ImageFilter
          config={{
            name: 'CIWhitePointAdjust',
            inputImage: parrot,
            inputColor: '#FF00FF'
          }}
        />
        <ImageFilter
          config={{
            name: 'CIQRCodeGenerator',
            inputMessage: `d`,
            imageStyle: { height: 320, width: 320 }
          }}
        />
        <ImageFilter
          config={{
            name: 'CIAztecCodeGenerator',
            inputMessage: ` Generates an output image representing the input data according to the ISO/IEC 18004:2006 standard. The width and height of each module (square dot) of the code in the output image is one point. To create a QR code from a string or URL, convert it to an NSData object using the NSISOLatin1StringEncoding string encoding.
The inputCorrectionLevel parameter controls the amount of additional data encoded in the output image to provide error correction. Higher levels of error correction result in larger output images but allow larger areas of the code to be damaged or obscured without. There are four possible correction modes (with corresponding error resilience levels): `,
            inputLayers: 32,
            inputCompactStyle: 0,
            inputCorrectionLevel: 23,
            imageStyle: { height: 320, width: 320 }
          }}
        />
        <ImageFilter
          config={{
            name: 'CICrop',
            inputImage: cacti,
            inputRectangle: { x:'25w', y:'25h', width:'50w', height:'50h' }
          }}
        />
        <ImageFilter
          config={{
            name: 'CIStarShineGenerator',
            imageStyle: { height: 320, backgroundColor: 'black' },
            inputColor: '#134523',
            inputRadius: 20,
            inputCrossScale: 20,
            inputCrossAngle: Math.PI * 0.35,
            inputCenter: { x: '50w', y: '50h' },
            inputCrossOpacity: -2.5,
            inputCrossWidth: 2,
            inputEpsilon: 0.2
          }}
        />
        <ImageFilter
          config={{
            name: 'CIBokehBlur',
            inputImage: parrot,
            inputRadius: '3min',
            inputRingAmount: 5,
            inputSoftness: 5,
            inputRingSize: 2
          }}
        />
        <ImageFilter
          config={{
            name: 'CIMorphologyGradient',
            inputImage: cacti,
            inputRadius: 5
          }}
        />
        <ImageFilter
          config={{
            name: 'CIXRay',
            inputImage: atx
          }}
        />
        <ImageFilter
          config={{
            name: 'CIThermal',
            inputImage: tahoe
          }}
        />
        <ImageFilter
          config={{
            name: 'CIBloom',
            inputImage: cacti,
            inputRadius: '5min',
            inputIntensity: 2,
          }}
        />
        <ImageFilter
          config={{
            name: 'CIHoleDistortion',
            inputImage: {
              name: 'CIHoleDistortion',
              inputImage: {
                name: 'CIHoleDistortion',
                inputImage: parrot,
                inputCenter: { x: '85w', y: '85h' },
                inputRadius: '5min'
              },
              inputCenter: { x: '15w', y: '15h' },
              inputRadius: '5min'
            },
            inputCenter: { x: '50w', y: '50h' },
            inputRadius: '5min'
          }}
        />
        <ImageFilter
          config={{
            name: 'CIColorMap',
            inputImage: parrot,
            inputGradientImage: tahoe,
            scaleMode: 'UP'
          }}
        />
        <ImageFilter
          config={{
            name: 'Sharpen',
            image: parrot,
            amount: 4
          }}
        />
        <ImageFilter
          config={{
            name: 'EdgeDetection',
            image: parrot
          }}
        />
        <ImageFilter
          config={{
            name: 'Emboss',
            image: parrot
          }}
        />
        <ImageFilter
          config={{
            name: 'FuzzyGlass',
            image: parrot
          }}
        />
        <ImageFilter
          config={{
            name: 'CIConvolution5X5',
            inputImage: parrot,
            inputWeights: [
              0.5, 0, 0, 0, 0,
              0, 0, 0, 0, 0,
              0, 0, 0, 0, 0,
              0, 0, 0, 0, 0,
              0, 0, 0, 0, 0.5,
            ],
            inputBias: 0
          }}
        />
        <ImageFilter
          config={{
            name: 'CIConvolution7X7',
            inputImage: parrot,
            inputWeights: [
              0, 0, -1, -1, -1, 0, 0,
              0, -1, -3, -3, -3, -1, 0,
              -1, -3, 0, 7, 0, -3, -1, 
              -1, -3, 7, 25, 7, -3, -1, 
              -1, -3, 0, 7, 0, -3, -1, 
              0, -1, -3, -3, -3, -1, 0, 
              0, 0, -1, -1, -1, 0, 0
            ],
            inputBias: 0
          }}
        />
        <ImageFilter
          config={{
            name: 'CILightTunnel',
            inputImage: parrot,
            inputCenter: { x: '50w', y: '50h' },
            inputRadius: '3min',
            inputRotation: Math.PI * 20
          }}
        />
        <ImageFilter
          config={{
            name: 'CIVignetteEffect',
            inputImage: parrot,
            inputCenter: { x: '50w', y: '50h' },
            inputRadius: '5min'
          }}
        />
        <ImageFilter
          config={{
            name: 'CIEdges',
            inputImage: parrot,
            inputIntensity: 15
          }}
        />
        <ImageFilter
          config={{
            name: 'CIComicEffect',
            inputImage: parrot
          }}
        />
        <ImageFilter
          config={{
            name: 'CITwelvefoldReflectedTile',
            inputImage: cacti,
            inputCenter: { x: '50w', y: '50h' },
            inputWidth: '500min',
            inputAngle: -Math.PI * 0.5
          }}
        />
        <ImageFilter
          config={{
            name: 'CIGaussianGradient',
            imageStyle: { width: 320, height: 320 },
            inputColor0: 'red',
            inputColor1: 'green',
            inputCenter: { x: '50w', y: '50h' },
            inputRadius: '25min'
          }}
        />
        <ImageFilter
          config={{
            name: 'CIRadialGradient',
            imageStyle: { width: 320, height: 320 },
            inputColor0: 'blue',
            inputColor1: 'green',
            inputCenter: { x: '50w', y: '50h' },
            inputRadius0: '35min',
            inputRadius1: '25min'
          }}
        />
        <ImageFilter
          config={{
            name: 'CISmoothLinearGradient',
            imageStyle: { width: 320, height: 320 },
            inputPoint0: { x: '0w', y: '0h' },
            inputPoint1: { x: '100w', y: '0h' },
            inputColor0: 'blue',
            inputColor1: 'green'
          }}
        />
        <ImageFilter
          config={{
            name: 'CILinearGradient',
            imageStyle: { width: 320, height: 320 },
            inputPoint0: { x: '0w', y: '0h' },
            inputPoint1: { x: '100w', y: '0h' },
            inputColor0: 'blue',
            inputColor1: 'green'
          }}
        />
        <ImageFilter
          config={{
            name: 'CIMaskedVariableBlur',
            inputMask: {
              name: 'CIMultiplyBlendMode',
              inputImage: {
                name: 'CILinearGradient',
                imageStyle: { width: 320, height: 320 },
                inputColor0: '#FFFFFF00',
                inputColor1: '#987654',
                inputPoint0: { x: '0w', y: '100h' },
                inputPoint1: { x: '100w', y: '100h' },
              },
              inputBackgroundImage: {
                name: 'CILinearGradient',
                imageStyle: { width: 320, height: 320 },
                inputColor0: '#abcdef00',
                inputColor1: '#fedcba01',
                inputPoint0: { x: '100w', y: '0h' },
                inputPoint1: { x: '100w', y: '100h' },
              },
            },
            inputImage: atx,
            inputRadius: '10min',
            scaleMode: { match: 'inputImage' },
            inputImageResizeMode: { width: 1, height: 0.5 },
            inputBackgroundImageResizeMode: { width: 0.5, height: 1 }
          }}
        />
        <ImageFilter
          config={{
            name: 'CIOverlayBlendMode',
            inputImage: atx,
            inputBackgroundImage: {
              name: 'CIMultiplyBlendMode',
              inputImage: {
                name: 'CILinearGradient',
                imageStyle: { width: 320, height: 320 },
                inputColor0: '#FFFFFF00',
                inputColor1: '#987654',
                inputPoint0: { x: '0w', y: '100h' },
                inputPoint1: { x: '100w', y: '100h' },
              },
              inputBackgroundImage: {
                name: 'CILinearGradient',
                imageStyle: { width: 320, height: 320 },
                inputColor0: '#abcdef00',
                inputColor1: '#fedcba01',
                inputPoint0: { x: '100w', y: '0h' },
                inputPoint1: { x: '100w', y: '100h' },
              },
            },
            scaleMode: { match: 'inputImage' },
            // inputImageResizeMode: { width: 0.5 }
            // name: 'CILinearGradient',
            // imageStyle: { width: 320, height: 320 },
            // inputColor0: '#000000ff',
            // inputColor1: '#00000000',
            // inputPoint0: { x: '100w', y: '0h' },
            // inputPoint1: { x: '100w', y: '100h' },
          }}
        />
        <ImageFilter
          config={{
            name: 'CIMultiplyBlendMode',
            inputImage: {
              name: 'CILinearGradient',
              imageStyle: { width: 320, height: 320 },
              inputColor0: '#FFFFFF00',
              inputColor1: '#987654',
              inputPoint0: { x: '0w', y: '100h' },
              inputPoint1: { x: '100w', y: '100h' },
            },
            inputBackgroundImage: {
              name: 'CILinearGradient',
              imageStyle: { width: 320, height: 320 },
              inputColor0: '#abcdef00',
              inputColor1: '#fedcba01',
              inputPoint0: { x: '100w', y: '0h' },
              inputPoint1: { x: '100w', y: '100h' },
            },
          }}
        /> */}
        {/* <Switch
          value={this.state.showList}
          onValueChange={(showList) => this.setState({ showList })}
        />
        {this.state.showList ? this.renderList() : this.renderSelect()} */}
      </ScrollView>
    )
  }

  renderFilter = ({ item }) => (
    item.uri
      ? <Image
          style={{ width: 360, height: 360, borderRadius: 25 }}
          source={item}
          blurRadius={5}
          resizeMode={'contain'}
        />
      : <CSSGramItem filter={item.name} />
  )
}

const styles = StyleSheet.create({
  filter: {
  },
  textWrap: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.35)'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  container: {
    width: '100%',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  picker: {
    alignSelf: 'stretch',
    maxHeight: 150
  },
  image: imageStyle,
  halfImage: { width: 180, height: 180 }
});
