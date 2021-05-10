#### Description

Example shows how to extract filtered image and save it to the camera roll.

### Run debug version

```bash
$ yarn
$ yarn run:android
```

### Build signed release apk with Docker

- Generate keystore `yarn generate:android:signing-key`
- Open `examples/ImageExtraction/android/gradle.properties` file and replace `qwerty`s with your passwords
- Run `yarn build:release:docker` - upon script completion apk will be copied to `examples/ImageExtraction/image-extraction.apk` file
