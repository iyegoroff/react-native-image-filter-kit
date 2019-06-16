/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');

const extraNodeModules = {
  'react': path.resolve(__dirname, 'node_modules/react'),
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
  '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
  'react-native-image-filter-kit': path.resolve(__dirname, '../../'),
  'react-native-image-filter-kit-haze-removal': path.resolve(__dirname, 'local_modules/react-native-image-filter-kit-haze-removal')
};
const watchFolders = [
  path.resolve(__dirname, '../../'),
  path.resolve(__dirname, 'local_modules/react-native-image-filter-kit-haze-removal')
];

module.exports = {
  resolver: {
    extraNodeModules,
  },
  watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
