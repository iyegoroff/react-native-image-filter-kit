
# react-native-image-filter-kit

## Getting started

`$ npm install react-native-image-filter-kit --save`

### Mostly automatic installation

`$ react-native link react-native-image-filter-kit`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-image-filter-kit` and add `RNImageColorFilter.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNImageColorFilter.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import iyegoroff.ImageColorFilter.RNImageColorFilterPackage;` to the imports at the top of the file
  - Add `new RNImageColorFilterPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-image-filter-kit'
  	project(':react-native-image-filter-kit').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-image-filter-kit/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-image-filter-kit')
  	```

## Usage
```javascript
import RNImageColorFilter from 'react-native-image-filter-kit';

// TODO: What to do with the module?
RNImageColorFilter;
```
  