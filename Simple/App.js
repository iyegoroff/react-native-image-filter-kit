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
import { ImageTransparentPlaceholder, ImagePlaceholder } from '../dist/common/image-placeholder';

const CacheableImage = imageCacheHoc(Image);

const imageStyle = { width: 320, height: 320 }
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

const rose = (
  <Image
    style={imageStyle}
    source={require('./rose.png')}
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

const miniCoast = (
  <Image
    style={{ width: 320, height: 100, resizeMode: 'stretch' }}
    source={{ uri: 'https://thisismyhappiness.com/wp-content/uploads/2014/05/big-sur-bixby.jpg' }}
  />
)

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
  DELTA_INDEX = [
    0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11,
    0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.20, 0.21, 0.22, 0.24,
    0.25, 0.27, 0.28, 0.30, 0.32, 0.34, 0.36, 0.38, 0.40, 0.42,
    0.44, 0.46, 0.48, 0.5, 0.53, 0.56, 0.59, 0.62, 0.65, 0.68,
    0.71, 0.74, 0.77, 0.80, 0.83, 0.86, 0.89, 0.92, 0.95, 0.98,
    1.0, 1.06, 1.12, 1.18, 1.24, 1.30, 1.36, 1.42, 1.48, 1.54,
    1.60, 1.66, 1.72, 1.78, 1.84, 1.90, 1.96, 2.0, 2.12, 2.25,
    2.37, 2.50, 2.62, 2.75, 2.87, 3.0, 3.2, 3.4, 3.6, 3.8,
    4.0, 4.3, 4.7, 4.9, 5.0, 5.5, 6.0, 6.5, 6.8, 7.0,
    7.3, 7.5, 7.8, 8.0, 8.4, 8.7, 9.0, 9.4, 9.6, 9.8,
    10.0
  ]

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
      // { name: 'Sepia', key: `Sepia_${i}` },
      // { name: 'Saturate', key: `Saturate_${i}` },
      // { name: 'HueRotate', key: `HueRotate_${i}` },
      // { name: 'LuminanceToAlpha', key: `LuminanceToAlpha_${i}` },
      // { name: 'Invert', key: `Invert_${i}` },
      // { name: 'Grayscale', key: `Grayscale_${i}` },
      // { name: 'Warm', key: `Warm_${i}` },
      // { name: 'Cool', key: `Cool_${i}` },
      // { name: 'Tint', key: `Tint_${i}` },
      // { name: 'Night', key: `Night_${i}` },
      // { name: 'Lsd', key: `Lsd_${i}` },
      // { name: 'Browni', key: `Browni_${i}` },
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
      { name: '_1977', key: `_1977_${i}` }, { name: '_1977Compat', key: `_1977Compat_${i}` },
      { name: 'Aden', key: `Aden_${i}` }, { name: 'AdenCompat', key: `AdenCompat_${i}` },
      { name: 'Brannan', key: `Brannan_${i}` }, { name: 'BrannanCompat', key: `BrannanCompat_${i}` },
      { name: 'Brooklyn', key: `Brooklyn_${i}` }, { name: 'BrooklynCompat', key: `BrooklynCompat_${i}` },
      { name: 'Clarendon', key: `Clarendon_${i}` }, { name: 'ClarendonCompat', key: `ClarendonCompat_${i}` },
      { name: 'Earlybird', key: `Earlybird_${i}` }, { name: 'EarlybirdCompat', key: `EarlybirdCompat_${i}` },
      { name: 'Gingham', key: `Gingham_${i}` }, { name: 'GinghamCompat', key: `GinghamCompat_${i}` },
      { name: 'Hudson', key: `Hudson_${i}` }, { name: 'HudsonCompat', key: `HudsonCompat_${i}` },
      { name: 'Kelvin', key: `Kelvin_${i}` }, { name: 'KelvinCompat', key: `KelvinCompat_${i}` },
      { name: 'Lark', key: `Lark_${i}` }, { name: 'LarkCompat', key: `LarkCompat_${i}` },
      { name: 'Inkwell', key: `dInkwell_${i}` }, { name: 'InkwellCompat', key: `dInkwellCompat_${i}` },
      { name: 'Lofi', key: `Lofi_${i}` }, { name: 'LofiCompat', key: `LofiCompat_${i}` },
      { name: 'Maven', key: `Maven_${i}` }, { name: 'MavenCompat', key: `MavenCompat_${i}` },
      { name: 'Mayfair', key: `Mayfair_${i}` }, { name: 'MayfairCompat', key: `MayfairCompat_${i}` },
      { name: 'Moon', key: `Moon_${i}` }, { name: 'MoonCompat', key: `MoonCompat_${i}` },
      { name: 'Nashville', key: `Nashville_${i}` }, { name: 'NashvilleCompat', key: `NashvilleCompat_${i}` },
      { name: 'Perpetua', key: `Perpetua_${i}` }, { name: 'PerpetuaCompat', key: `PerpetuaCompat_${i}` },
      { name: 'Reyes', key: `Reyes_${i}` }, { name: 'ReyesCompat', key: `ReyesCompat_${i}` },
      { name: 'Rise', key: `Rise_${i}` }, { name: 'RiseCompat', key: `RiseCompat_${i}` },
      { name: 'Slumber', key: `Slumber_${i}` }, { name: 'SlumberCompat', key: `SlumberCompat_${i}` },
      { name: 'Stinson', key: `Stinson_${i}` }, { name: 'StinsonCompat', key: `StinsonCompat_${i}` },
      { name: 'Toaster', key: `Toaster_${i}` }, { name: 'ToasterCompat', key: `ToasterCompat_${i}` },
      { name: 'Valencia', key: `Valencia_${i}` }, { name: 'ValenciaCompat', key: `ValenciaCompat_${i}` },
      { name: 'Walden', key: `Walden_${i}` }, { name: 'WaldenCompat', key: `WaldenCompat_${i}` },
      { name: 'Willow', key: `Willow_${i}` }, { name: 'WillowCompat', key: `WillowCompat_${i}` },
      { name: 'Xpro2', key: `Xpro2_${i}` }, { name: 'Xpro2Compat', key: `Xpro2Compat_${i}` }
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

  multiply(th, matrix) {
    var i, j, k, col = Array.from(5);

    for (i = 0; i < 5; i++) {
      for (j = 0; j < 5; j++) {
        col[j] = th[j + i * 5];
      }
      for (j = 0; j < 5; j++) {
        var val = 0;
        for (k = 0; k < 5; k++) {
          val += matrix[j + k * 5] * col[k];
        }
        th[j + i * 5] = val;
      }
    }

    return th
  };

  contrast(value) {
    var x;
    if (value < 0) {
      x = 0.5 + value * 0.5;
    } else {
      x = value % 1;
      if (x == 0) {
        x = this.DELTA_INDEX[value];
      } else {
        x = this.DELTA_INDEX[(value << 0)] * (1 - x) + this.DELTA_INDEX[(value << 0) + 1] * x; // use linear interpolation for more granularity.
      }
      x = x * 0.5 + 0.5;
    }
    return ([
      x / 0.5, 0, 0, 0, 0.5 * (0.5 - x),
      0, x / 0.5, 0, 0, 0.5 * (0.5 - x),
      0, 0, x / 0.5, 0, 0.5 * (0.5 - x),
      0, 0, 0, 1, 0
    ]);
  }

  brightness(b) {
    return [
      1, 0, 0, 0, b,
      0, 1, 0, 0, b,
      0, 0, 1, 0, b,
      0, 0, 0, 1, 0
    ]
  }

  // contrast(v) {
  //   const n = 0.5 * (1 - v);
  //   return [
  //     v, 0, 0, 0, n * 255,
  //     0, v, 0, 0, n * 255,
  //     0, 0, v, 0, n * 255,
  //     0, 0, 0, 1, 0
  //   ]
  // }


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
    const color = 'rgba(161, 44, 199, .31)'
    return (
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        {/* <ImageFilter
          config={{
            name: 'DstOverComposition',
            srcImage: atx,
            dstImage: cacti,
            dstAnchor: { x: 0.75, y: 0.75 },
            srcAnchor: { x: 0.25, y: 0.25 }
          }}
        />
        <ImageFilter
          config={{
            name: 'DstOverComposition',
            dstImage: atx,
            srcImage: cacti,
            dstAnchor: { x: 0.75, y: 0.75 },
            srcAnchor: { x: 0.25, y: 0.25 }
          }}
        /> */}
        <Switch
          value={this.state.showList}
          onValueChange={(showList) => this.setState({ showList })}
        />
        {this.state.showList ? this.renderList() : this.renderSelect()}
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
