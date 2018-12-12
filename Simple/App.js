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
        onError={this.handleError}
        config={{
          name: this.props.filter,
          image: this.image(),
          disableCache: false,
        }}
      />
    );
  }

  handleError = (error) => {
    console.warn(error.nativeEvent.message)
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
      { name: 'Pizza-640', uri: require('./pizza-640.jpg') },
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
      { name: 'Sharpen', key: `Sharpen_${i}` },
      { name: 'Emboss', key: `Emboss_${i}` },
      { name: 'EdgeDetection', key: `EdgeDetection_${i}` },
      { name: 'FuzzyGlass', key: `FuzzyGlass_${i}` },
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

  renderBlends() {
    const { selectedBlend, blends, firstSelectedImage, secondSelectedImage, blendImages } = this.state

    return (
      <View>
        <Pick
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
        {this.renderBlend(
          selectedBlend,
          blendImages.find(b => b.name === firstSelectedImage).item,
          blendImages.find(b => b.name === secondSelectedImage).item,
        )}
      </View>
    );
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
    return (
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Switch
          value={this.state.showList}
          onValueChange={(showList) => this.setState({ showList })}
        />
        {this.state.showList ? this.renderBlends() : this.renderSelect()}
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
