# ReactNative counter sample.

## Pre-requisites
1. Have the dotnet SDK and SDK of your target platform installed and working.
1. Install [react-native](https://facebook.github.io/react-native/) and test your installation
1. `npm install -g yarn`

## Build
1. Have your Android/iOS simulator or device started at this point 
1. `yarn`
1. `cd src`
1. `dotnet restore`
1. `dotnet fable yarn-watch` will start compiling on Save
1. `react-native run-ios` *or* `react-native run-android` 
