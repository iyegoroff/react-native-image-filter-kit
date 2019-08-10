#### Description
Example shows how to [create](./local_modules/react-native-image-filter-kit-haze-removal) and use custom native filter.

### Run debug version
```bash
$ yarn
$ yarn run:android
```

### Build signed release apk with Docker
- Generate keystore `yarn generate:android:signing-key`
- Open `examples/CustomNativeFilter/android/gradle.properties` file and replace `qwerty`s with your passwords
- Run `yarn build:release:docker` - upon script completion apk will be copied to `examples/CustomNativeFilter/custom-native-filter.apk` file
