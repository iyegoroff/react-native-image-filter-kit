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
  Button
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
import { ShapeRegistry } from '../dist/common/shape-registry';

const degToRad = (deg) => Math.PI * deg / 180;
const background = 'rgb(255, 255, 255)';
const atx = (
  <Image
    style={{ width: 360, height: 360 }}
    source={{ uri: 'https://una.im/CSSgram/img/atx.jpg' }}
    resizeMode={'cover'}
  />
);

const bike = (
  <Image
    style={{ width: 360, height: 360 }}
    source={{ uri: 'https://una.im/CSSgram/img/bike.jpg' }}
    resizeMode={'cover'}
  />
);

const tahoe = (
  <Image
    style={{ width: 360, height: 360 }}
    source={{ uri: 'https://una.im/CSSgram/img/tahoe.jpg' }}
    resizeMode={'cover'}
  />
);

const dest = (
  <Image
    style={{ width: 128, height: 128 }}
    source={require('./dest.png')}
    resizeMode={'cover'}
  />
);

const src = (
  <Image
    style={{ width: 128, height: 128 }}
    source={require('./src.png')}
    resizeMode={'cover'}
  />
);

const parrot = (
  <Image
    style={{ width: 360, height: 360 }}
    source={require('./parrot.png')}
    resizeMode={'contain'}
  />
);

const flowers = (
  <Image
    style={{ width: 360, height: 360 }}
    source={{ uri: 'https://media.ooreka.fr/public/image/plant/314/mainImage-source-11702050.jpg' }}
    resizeMode={'cover'}
  />
);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

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
        {isFiltered ? <Text style={styles.text}>{this.props.filter}</Text> : null}
      </View>
    );
  }

  image() {
    const { image: uri } = this.props;
    return (
      <Image
        style={this.state.isHalf ? styles.halfImage : styles.image}
        source={typeof uri === 'number' ? uri : { uri }}
        // source={{ uri: 'http://travellingmoods.com/wp-content/uploads/2015/05/New-York-City.jpg' }}
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
    showList: false,
    selectedFilter: 'Normal_0',
    selectedImage: 'Parrot',
    images: [
      { name: 'Parrot', uri: require('./shmarrot.png') },
      { name: 'Pizza', uri: 'http://www.maximumwall.com/wp-content/uploads/2017/01/wallpaper-image-nourriture-hd-13.jpg' },
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
      { name: 'Sharpen', key: `Sharpen_${i}` },
      { name: 'Emboss', key: `Emboss_${i}` },
      { name: 'EdgeDetection', key: `EdgeDetection_${i}` },
      { name: 'FuzzyGlass', key: `FuzzyGlass_${i}` },
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

  selectedFilter = null;
  selectedImage = null;
  changeTimer = null;


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
    const { selectedFilter, selectedImage, filters, images } = this.state;
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={selectedFilter}
          onValueChange={this.filterChanged}
        >
          {filters.map(({ name, key }) => <Picker.Item value={key} label={name} key={key} />)}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={selectedImage}
          onValueChange={this.valueChanged}
        >
          {images.map(({ name }) => <Picker.Item value={name} label={name} key={name} />)}
        </Picker>
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

  render() {
    return (
      <View style={{flex: 1}}>
        <Switch
          value={this.state.showList}
          onValueChange={(showList) => this.setState({ showList })}
        />
        {this.state.showList ? this.renderList() : this.renderSelect()}
      </View>
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    right: 10,
    bottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.35)'
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
    alignSelf: 'stretch'
  },
  image: { width: 360, height: 360 },
  halfImage: { width: 180, height: 180 }
});
