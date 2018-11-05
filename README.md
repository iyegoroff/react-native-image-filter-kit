
# 🚧 🚧 🚧 WIP 🚧 🚧 🚧

# react-native-image-filter-kit

## Getting started

`$ npm install react-native-image-filter-kit --save`

### Mostly automatic installation

`$ react-native link react-native-image-filter-kit`

### Manual installation

[link](manual_installation.md)

## Usage
```javascript
import RNImageColorFilter from 'react-native-image-filter-kit';

// TODO: What to do with the module?
RNImageColorFilter;
```

## Caveats
- blurRadius
- disableCache = true + resizeMode != 'cover'
- MainReactPackage - makePackagePatch.js issue
- Android: add renderscript support to build.gradle

## FAQ
#### How to configure image cache on Android?
- [Configure Fresco in React Native](https://medium.com/in-the-hudl/configure-fresco-in-react-native-28c2bc7dcc4d) article by Brent Kelly