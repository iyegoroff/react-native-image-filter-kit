
# react-native-image-filter-kit-haze-removal

## Getting started

`$ npm install react-native-image-filter-kit-haze-removal --save`

### Mostly automatic installation

`$ react-native link react-native-image-filter-kit-haze-removal`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-image-filter-kit-haze-removal` and add `RNImageFilterKitHazeRemoval.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNImageFilterKitHazeRemoval.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import iyegoroff.imagefilterkit.hazeremoval.RNImageFilterKitHazeRemovalPackage;` to the imports at the top of the file
  - Add `new RNImageFilterKitHazeRemovalPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-image-filter-kit-haze-removal'
  	project(':react-native-image-filter-kit-haze-removal').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-image-filter-kit-haze-removal/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-image-filter-kit-haze-removal')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNImageFilterKitHazeRemoval.sln` in `node_modules/react-native-image-filter-kit-haze-removal/windows/RNImageFilterKitHazeRemoval.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Image.Filter.Kit.Haze.Removal.RNImageFilterKitHazeRemoval;` to the usings at the top of the file
  - Add `new RNImageFilterKitHazeRemovalPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNImageFilterKitHazeRemoval from 'react-native-image-filter-kit-haze-removal';

// TODO: What to do with the module?
RNImageFilterKitHazeRemoval;
```
  