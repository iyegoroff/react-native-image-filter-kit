/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 const path = require('path')
 const blacklist = require('metro-config/src/defaults/exclusionList')

 const packagePath = path.resolve(__dirname, '../../')

 const extraNodeModules = {
   'react': path.resolve(__dirname, 'node_modules/react'),
   'react-native': path.resolve(__dirname, 'node_modules/react-native'),
   '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
   'react-native-image-filter-kit': packagePath
 };

 module.exports = {
   resolver: {
     extraNodeModules,
     blockList: blacklist([
       /^src[/\\].*/,
       /^examples[/\\]\w+[/\\]src[/\\].*/
     ])
   },
   watchFolders: [packagePath],
   transformer: {
     getTransformOptions: async () => ({
       transform: {
         experimentalImportSupport: false,
         inlineRequires: false,
       },
     }),
   },
 }
