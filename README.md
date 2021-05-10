# react-native-image-filter-kit

[![npm version](https://badge.fury.io/js/react-native-image-filter-kit.svg)](https://badge.fury.io/js/react-native-image-filter-kit)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)
[![Dependency Status](https://david-dm.org/iyegoroff/react-native-image-filter-kit.svg)](https://david-dm.org/iyegoroff/react-native-image-filter-kit)
[![devDependencies Status](https://david-dm.org/iyegoroff/react-native-image-filter-kit/dev-status.svg)](https://david-dm.org/iyegoroff/react-native-image-filter-kit?type=dev)
[![typings included](https://img.shields.io/badge/typings-included-brightgreen.svg?t=1495378566925)](src/typings/index.d.ts)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/react-native-image-filter-kit)

<!-- [![CircleCI](https://circleci.com/gh/iyegoroff/react-native-image-filter-kit.svg?style=svg)](https://circleci.com/gh/iyegoroff/react-native-image-filter-kit) -->

Various image filters for iOS & Android.

## Status

- iOS & Android:
  - filter components work as combinable wrappers for standard `Image` and `ImageBackground` components
  - resulting images are being cached in memory and can be
    [extracted into temporary files](docs/image_extraction.md) of original resolution
  - [additional filters](https://github.com/iyegoroff/react-native-image-filter-kit/tree/master/examples) can be developed as separate modules
- react-native:

  - supported versions:

    | react-native     | min Android SDK | min iOS version |
    | ---------------- | --------------- | --------------- |
    | >=0.64.0         | 21              | 9.0             |
    | >=0.57.1 <0.64.0 | 17              | 9.0             |

## Installation

<table>
<td>
<details style="border: 1px solid; border-radius: 5px; padding: 5px">
  <summary>with react-native "<strong>&gt;=0.64.0</strong>"</summary>

### 1. Install latest version from npm

`$ npm i react-native-image-filter-kit -S`

### 2. Install pods

`$ cd ios && pod install && cd ..`

</details>
</td>
</table>
<table>
<td>
<details style="border: 1px solid; border-radius: 5px; padding: 5px">
  <summary>with react-native "<strong>&gt;=0.61.0 &lt;0.64.0</strong>"</summary>

### 1. Install v0.7.3 from npm

`$ npm i react-native-image-filter-kit@0.7.3 -S`

### 2. Install pods

`$ cd ios && pod install && cd ..`

### 3. Enable renderscript

- Modify `android/build.gradle`:

  ```diff
  buildscript {
    ext {
  -   buildToolsVersion = "28.0.3"
  -   minSdkVersion = 16
  -   compileSdkVersion = 28
  -   targetSdkVersion = 28
  +   buildToolsVersion = "29.0.3"
  +   minSdkVersion = 17
  +   compileSdkVersion = 29
  +   targetSdkVersion = 29
  +   renderscriptVersion = 21
  ...

    dependencies {
  -   classpath("com.android.tools.build:gradle:3.4.2")
  +   classpath("com.android.tools.build:gradle:3.6.0")
  ```

- Modify `android/app/build.gradle`:

  ```diff
  android {
    compileSdkVersion rootProject.ext.compileSdkVersion
  + buildToolsVersion rootProject.ext.buildToolsVersion

    ...

    defaultConfig {
      ...
  +   renderscriptTargetApi rootProject.ext.renderscriptVersion
  +   renderscriptSupportModeEnabled true
    }
  ```

- Modify `android/gradle/wrapper/gradle-wrapper.properties`:

  ```diff
  - distributionUrl=https\://services.gradle.org/distributions/gradle-5.5-all.zip
  + distributionUrl=https\://services.gradle.org/distributions/gradle-6.2-all.zip
  ```

</details>
</td>
</table>
<table>
<td>
<details style="border: 1px solid; border-radius: 5px; padding: 5px">
  <summary>with react-native "<strong>&gt;=0.60.0 &lt;0.61.0</strong>"</summary>

### 1. Install v0.5.18 from npm

`$ npm i react-native-image-filter-kit@0.5.18 -S`

### 2. Install pods

`$ cd ios && pod install && cd ..`

### 3. Enable renderscript

- Modify `android/build.gradle`:

  ```diff
  buildscript {
    ext {
  -   buildToolsVersion = "28.0.3"
  -   minSdkVersion = 16
  -   compileSdkVersion = 28
  -   targetSdkVersion = 28
  +   buildToolsVersion = "29.0.3"
  +   minSdkVersion = 17
  +   compileSdkVersion = 29
  +   targetSdkVersion = 29
  ...

    dependencies {
  -   classpath("com.android.tools.build:gradle:3.4.2")
  +   classpath("com.android.tools.build:gradle:3.6.0")
  ...

  allprojects {
    repositories {
      ...
  +   maven { url 'https://jitpack.io' }
    }
  }
  ```

- Modify `android/app/build.gradle`:

  ```diff
  android {
    compileSdkVersion rootProject.ext.compileSdkVersion
  + buildToolsVersion rootProject.ext.buildToolsVersion

    ...

    defaultConfig {
      ...
  +   renderscriptTargetApi 21
  +   renderscriptSupportModeEnabled true
    }
  ```

- Modify `android/gradle/wrapper/gradle-wrapper.properties`:

  ```diff
  - distributionUrl=https\://services.gradle.org/distributions/gradle-5.5-all.zip
  + distributionUrl=https\://services.gradle.org/distributions/gradle-6.2-all.zip
  ```

</details>
</td>
</table>
<table>
<td>
<details style="border: 1px solid; border-radius: 5px; padding: 5px">
  <summary>with react-native "<strong>&gt;=0.58.0 &lt;0.60.0</strong>"</summary>

### 1. Install v0.4.14 from npm

`$ npm i react-native-image-filter-kit@0.4.14 -S`

### 2-a. Link native modules

`$ react-native link react-native-image-filter-kit`

### 2-b. Install pods

If you use Cocoapods add the following line to your Podfile:

```sh
pod 'React', :path => '../node_modules/react-native'
pod 'RNImageFilterKit', :path => '../node_modules/react-native-image-filter-kit'
```

`$ cd ios && pod install && cd ..`

### 2-c. Manual installation

Install manually if `react-native link` failed - [link](docs/manual_installation.md)

### 3. Enable renderscript

- Modify `android/build.gradle`:
  ```diff
  buildscript {
    ext {
      ...
  -   minSdkVersion = 16
  +   minSdkVersion = 17
  ```
- Modify `android/app/build.gradle`:

  ```diff
  defaultConfig {
    ...
  + renderscriptTargetApi 21
  + renderscriptSupportModeEnabled true
  }
  ```

</details>
</td>
</table>
<table>
<td>
<details style="border: 1px solid; border-radius: 5px; padding: 5px">
  <summary>with react-native "<strong>&gt;=0.57.1 &lt;0.58.0</strong>"</summary>

### 1. Install v0.3.9 from npm

`$ npm i react-native-image-filter-kit@0.3.9 -S`

### 2-a. Link native modules

`$ react-native link react-native-image-filter-kit`

### 2-b. Install pods

If you use Cocoapods add the following line to your Podfile:

```sh
pod 'React', :path => '../node_modules/react-native'
pod 'RNImageFilterKit', :path => '../node_modules/react-native-image-filter-kit'
```

`$ cd ios && pod install && cd ..`

### 2-c. Manual installation

Install manually if `react-native link` failed - [link](docs/manual_installation.md)

### 3. Final step

Open `android/build.gradle` and change `minSdkVersion` to 17.

</details>
</td>
</table>

## Scope

The purpose of this module is to support most of the native image filters on each platform and to provide a common interface for these filters. If the filter exists only on one platform, then its counterpart will be implemented using `renderscript` on Android and `cikernel` on iOS. If you need only [color matrix](docs/color_matrix_filters.md) filters - better use a [lightweight predecessor](https://github.com/iyegoroff/react-native-color-matrix-image-filters) of this module.

## Example

```javascript
import { Image } from 'react-native'
import {
  SoftLightBlend,
  Emboss,
  Earlybird,
  Invert,
  RadialGradient
} from 'react-native-image-filter-kit'

const result = (
  <Earlybird
    image={
      <SoftLightBlend
        resizeCanvasTo={'dstImage'}
        dstTransform={{
          scale: 'CONTAIN'
        }}
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
        srcTransform={{
          anchor: { x: 0.5, y: 1 },
          translate: { x: 0.5, y: 1 }
        }}
        srcImage={
          <Invert
            image={
              <RadialGradient
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
- [Functions](docs/functions.md)
- [Image extraction](docs/image_extraction.md)
- [Color matrix filters](docs/color_matrix_filters.md)
- [Blur filters](docs/blur_filters.md)
- [Convolve matrix filters](docs/convolve_matrix_filters.md)
- [Generators](docs/generators.md)
- [Composition filters](docs/composition_filters.md)
- [Blend filters](docs/blend_filters.md)
- [CSSGram filters](docs/cssgram_filters.md)
- [Android-only filters](src/native-platform-filters/shapes.android.ts)
- [iOS-only filters](src/native-platform-filters/shapes.ios.ts)

## Caveats

- `blurRadius` Image prop will not work in conjunction with this library, instead of it just use [BoxBlur](docs/blur_filters.md#BoxBlur) filter
- When running on pre-Lollipop (SDK < 21) Android devices you may experience [TooManyBitmapsException](https://frescolib.org/javadoc/reference/com/facebook/imagepipeline/common/TooManyBitmapsException.html), which results in image is not being rendered (this can be logged with [onFilteringError](docs/types.md#ImageFilter) prop). It looks like this is a relatively rare case which arises on low-end devices when filtering wallpaper-sized images (like 1920 × 1080 pixels). The common workarounds are:

  - using smaller images
  - using [ColorMatrix](docs/color_matrix_filters.md#ColorMatrix) filter with [concatColorMatrices](docs/functions.md#concatColorMatrices) instead of wrapping the image with multiple color matrix based filters
  - adding `android:largeHeap="true"` to `android/app/src/main/AndroidManifest.xml`
  - replacing standard `MainReactPackage` with [alternative](android/src/main/java/iyegoroff/imagefilterkit/MainReactPackageWithFrescoCache.java) one provided by this module:

    ````diff
    ... + import iyegoroff.imagefilterkit.MainReactPackageWithFrescoCache;

          public class MainApplication extends Application implements ReactApplication {

          ...
              List<ReactPackage> packages = new PackageList(this).getPackages();
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // packages.add(new MyReactNativePackage());
        -     return packages;
        +     return MainReactPackageWithFrescoCache.inject(packages);
            }
          ...
        ```
        After this change `ImageFilter` will not throw `TooManyBitmapsException` immediately and will clear Fresco image caches, trim bitmap pool memory and try to filter the image again several times until succeed or reach the limit of retries, specified by [clearCachesMaxRetries](docs/types.md#ImageFilter) prop.
    ````

- If you are using `react-native-asset` with "<strong>&lt;=0.4.14</strong>" version of this library - switch to `iyegoroff/react-native-asset#with-key`. In order to prevent unlinking of `.cikernel` files provided by `react-native-image-filter-kit` use `react-native-asset` the following way: `npx iyegoroff/react-native-asset#with-key -a YOUR-OWN-ASSETS -k YOUR-APP-ID`

## Credits

- CSSGram filters are taken from [cssgram](https://github.com/una/cssgram) project by @una
- `EdgeDetection`, `Emboss` and `FuzzyGlass` filters are taken from [android-graphics-demo](https://github.com/chiuki/android-graphics-demo) project by @chiuki
- Parrot [image](https://commons.wikimedia.org/wiki/File:Ara_macao_-flying_away-8a.jpg) by
  [Robert01](https://de.wikipedia.org/wiki/Benutzer:Robert01)
- Blend filters are based on `skia` [sources](https://github.com/google/skia/blob/master/src/gpu/glsl/GrGLSLBlend.cpp)
- File save functionality is based on [react-native-view-shot](https://github.com/gre/react-native-view-shot) project by @gre
