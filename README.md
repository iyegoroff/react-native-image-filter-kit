
# react-native-image-color-filter

## Getting started

`$ npm install react-native-image-color-filter --save`

### Mostly automatic installation

`$ react-native link react-native-image-color-filter`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-image-color-filter` and add `RNImageColorFilter.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNImageColorFilter.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import iyegoroff.ImageColorFilter.RNImageColorFilterPackage;` to the imports at the top of the file
  - Add `new RNImageColorFilterPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-image-color-filter'
  	project(':react-native-image-color-filter').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-image-color-filter/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-image-color-filter')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNImageColorFilter.sln` in `node_modules/react-native-image-color-filter/windows/RNImageColorFilter.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using iyegoroff.ImageColorFilter.RNImageColorFilter;` to the usings at the top of the file
  - Add `new RNImageColorFilterPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNImageColorFilter from 'react-native-image-color-filter';

// TODO: What to do with the module?
RNImageColorFilter;
```
  