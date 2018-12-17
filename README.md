# react-native-image-filter-kit
[![npm version](https://badge.fury.io/js/react-native-image-filter-kit.svg)](https://badge.fury.io/js/react-native-image-filter-kit)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)
[![Dependency Status](https://david-dm.org/iyegoroff/react-native-image-filter-kit.svg)](https://david-dm.org/iyegoroff/react-native-image-filter-kit)
[![devDependencies Status](https://david-dm.org/iyegoroff/react-native-image-filter-kit/dev-status.svg)](https://david-dm.org/iyegoroff/react-native-image-filter-kit?type=dev)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/react-native-image-filter-kit)

Various image filters for iOS & Android.

## Status

- iOS & Android:
  - filter components work as combinable wrappers for standard `Image` component
  - resulting images are being cached
  - <strong>Minimum Android SDK version - 17</strong>
- React-Native:
  - with rn >= 0.57.1 use latest version

## Getting started

`$ npm install react-native-image-filter-kit --save`

### Mostly automatic installation

`$ react-native link react-native-image-filter-kit`

### Manual installation

[link](docs/manual_installation.md)

### Final step

Open `android/build.gradle` and change `minSdkVersion` to 17.

## Scope

The purpose of this module is to support most of the native image filters on each platform and to provide a common interface for these filters. If the filter exists only on one platform, then its counterpart will be implemented using `renderscript` on Android and `cikernel` on iOS. If you need only [color matrix](docs/color_matrix_filters.md) filters - better use a [lightweight predecessor](https://github.com/iyegoroff/react-native-color-matrix-image-filters) of this module.


## Example

```javascript
import { Image } from 'react-native';
import {
  SoftLightBlend,
  Emboss,
  Earlybird,
  Invert,
  RadialGradientGenerator
} from 'react-native-image-filter-kit';

const result = (
  <Earlybird
    image={
      <SoftLightBlend
        resizeCanvasTo={'dstImage'}
        dstResizeMode={'CONTAIN'}
        dstImage={
          <Emboss
            image={
              <Image
                style={{ width: 320, height: 320 }}
                source={require('./parrot.png')}
                resizeMode={'contain'}
              />
            }
          />
        }
        srcAnchor={{ x: 0.5, y: 1 }}
        srcPosition={{ x: 0.5, y: 1 }}
        srcImage={
          <Invert
            image={
              <RadialGradientGenerator
                colors={['rgba(0, 0, 255, 1)', '#00ff00', 'red']}
                stops={[0.25, 0.75, 1]}
                center={{ x: '50w', y: '100h' }}
              />
            }
          />
        }
      />
    }
  />
)
```

<table>
  <tr>
    <th>original image</th>
    <th>result</th>
  </tr>
  <tr>
    <th><img src="https://raw.githubusercontent.com/iyegoroff/react-native-image-filter-kit/master/img/parrot.png" align="left" width="300"></th>
    <th><img src="https://raw.githubusercontent.com/iyegoroff/react-native-image-filter-kit/master/img/earlybird.png" align="left" width="300"></th>
  </tr>
</table>
&nbsp;
<details>
  <summary>filter steps</summary>
  <table>
  <tr>
    <th>
      <table>
        <tr><th>original image</th></tr>
        <tr><th><img src="https://raw.githubusercontent.com/iyegoroff/react-native-image-filter-kit/master/img/parrot.png" align="left" width="170"></th></tr>
      </table>
    </th>
    <th>
      <table>
        <tr><th>Emboss</th></tr>
        <tr><th><img src="https://raw.githubusercontent.com/iyegoroff/react-native-image-filter-kit/master/img/emboss.png" align="left" width="170"></th></tr>
      </table>
    </th>
    <th rowspan="2">
      <table>
        <tr><th>SoftLightBlend</th></tr>
        <tr><th><img src="https://raw.githubusercontent.com/iyegoroff/react-native-image-filter-kit/master/img/soft_light_blend.png" align="left" width="170"></th></tr>
      </table>
    </th>
    <th rowspan="2">
      <table>
        <tr><th>Earlybird</th></tr>
        <tr><th><img src="https://raw.githubusercontent.com/iyegoroff/react-native-image-filter-kit/master/img/earlybird.png" align="left" width="170"></th></tr>
      </table>
    </th>
  </tr>
  <tr>
    <td>
      <table>
        <tr><th>RadialGradient</th></tr>
        <tr><th><img src="https://raw.githubusercontent.com/iyegoroff/react-native-image-filter-kit/master/img/radial_gradient.png" align="left" width="170"></th></tr>
      </table>
    </td>
    <td>
      <table>
        <tr><th>Invert</th></tr>
        <tr><th><img src="https://raw.githubusercontent.com/iyegoroff/react-native-image-filter-kit/master/img/invert.png" align="left" width="170"></th></tr>
      </table>
    </td>
  </tr>
</table>

</details>

## Reference

- [Types](docs/types.md)
- [Color matrix filters](docs/color_matrix_filters.md)
- [Blur filters](docs/blur_filters.md)
- [Convolve matrix filters](docs/convolve_matrix_filters.md)
- [Generators](docs/generators.md)
- [Composition filters](docs/composition_filters.md)
- [Blend filters](docs/blend_filters.md)
- [CSSGram filters](docs/cssgram_filters.md)
- [Android-only filters](docs/android_only_filters.md)
- [iOS-only filters](docs/ios_only_filters.md)

## Caveats
- `blurRadius` Image prop will not work in conjunction with this library, instead of it just use [BoxBlur](docs/blur_filters.md#BoxBlur) filter
- When running on pre-Lollipop (SDK < 21) Android devices you may experience [TooManyBitmapsException](https://frescolib.org/javadoc/reference/com/facebook/imagepipeline/common/TooManyBitmapsException.html), which results in image is not being rendered (this can be logged with [onFilteringError](docs/types.md#ImageFilter) prop). It looks like this is a relatively rare case which arises on low-end devices when filtering wallpaper-sized images (like 1920 × 1080 pixels). The common workarounds are:
  - using smaller images
  - using [ColorMatrix](docs/color_matrix_filters.md#ColorMatrix) filter with [concatColorMatrices](docs/functions.md#concatColorMatrices) instead of wrapping the image with multiple color matrix based filters
  - replacing standard `MainReactPackage` with [alternative](android/src/main/java/iyegoroff/imagefilterkit/MainReactPackageWithFrescoCache.java
) one provided by this module:
    &nbsp;
    ```diff
      ...
    - import com.facebook.react.shell.MainReactPackage;
    + import iyegoroff.imagefilterkit.MainReactPackageWithFrescoCache;
      import com.facebook.soloader.SoLoader;

      import java.util.Arrays;
      import java.util.List;

      public class MainApplication extends Application implements ReactApplication {

    +   private class MainReactPackage extends MainReactPackageWithFrescoCache {}
      ...
    ```
    After this change `ImageFilter` will not throw `TooManyBitmapsException` immediately and will clear Fresco image caches, trim bitmap pool memory and try to filter the image again several times until succeed or reach the limit of retries, specified by [clearCachesMaxRetries](docs/types.md#ImageFilter) prop. 

## Credits
- CSSGram filters are taken from [cssgram](https://github.com/una/cssgram) project by @una
- `EdgeDetection`, `Emboss` and `FuzzyGlass` filters are taken from [android-graphics-demo](https://github.com/chiuki/android-graphics-demo) project by @chiuki
- parrot [image](https://commons.wikimedia.org/wiki/File:Ara_macao_-flying_away-8a.jpg) by
  [Robert01](https://de.wikipedia.org/wiki/Benutzer:Robert01)