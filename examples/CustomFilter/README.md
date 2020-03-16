#### Description
Example shows how to create and use a set of JS/TS-only custom filters.

### Run debug version
```bash
$ yarn
$ yarn run:android
```

### Build signed release apk with Docker
- Generate keystore `yarn generate:android:signing-key`
- Open `examples/CustomFilter/android/gradle.properties` file and replace `qwerty`s with your passwords
- Run `yarn build:release:docker` - upon script completion apk will be copied to `examples/CustomFilter/custom-filter.apk` file
