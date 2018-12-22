#### Description
Example shows how to create and use a set of JS-only custom filters.

### Run debug version
```bash
$ npm i react-native-image-filter-kit
$ cd node_modules/react-native-image-filter-kit/examples/CustomFilter
$ npm i
$ npm run run:android
```

### Build signed release apk with Docker
- Clone the repo `git clone git@github.com:iyegoroff/react-native-image-filter-kit.git` or get it from npm
- Go to example folder `cd react-native-image-filter-kit/examples/CustomFilter`
- Generate keystore `npm run generate:android:signing-key`
- Open `examples/CustomFilter/android/gradle.properties` file and replace `qwerty`s with your passwords
- Run `npm run build:release:docker` - upon script completion apk will be copied to `examples/CustomFilter/custom-filter.apk` file