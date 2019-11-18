// tslint:disable:jsx-no-lambda

import React from 'react'
import { Grayscale, cleanExtractedImagesCache } from 'react-native-image-filter-kit'
import {
  Image,
  View,
  Button,
  ViewStyle,
  ImageStyle,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native'
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker'
import useElmish, { Effects, Reducer, Effect } from 'react-use-elmish'
import { unreachableCase } from 'ts-assert-unreachable'
import CameraRoll from '@react-native-community/cameraroll'

type State =
  | ['ready']
  | ['in-progress']
  | ['photo-taken', string]

type Action =
  | ['take-photo']
  | ['set-uri', string | undefined]
  | ['save-photo', string]
  | ['show-error', string]

const init = (): [State, Effect<Action>] => (
  [['ready'], Effects.none()]
)

const update: Reducer<State, Action> = (_, action) => {
  switch (action[0]) {
    case 'take-photo': {
      const effect = Effects.fromPromise(() => (
        takePhoto()
          .then<Action>(uri => ['set-uri', uri])
          .catch<Action>(error => ['show-error', error])
      ))

      return [['in-progress'], effect]
    }

    case 'set-uri': {
      const [, uri] = action

      return uri === undefined
        ? [['ready'], Effects.fromFunction(() => cleanExtractedImagesCache())]
        : [['photo-taken', uri], Effects.none()]
    }

    case 'save-photo': {
      const effect = Effects.fromPromise(() => (
        saveImage(action[1])
          .then(() => showMessage('Success', 'Filtered image was saved to photos'))
          .then<Action>(() => ['set-uri', undefined])
          .catch<Action>(error => ['show-error', error])
      ))

      return [['in-progress'], effect]
    }

    case 'show-error': {
      const effect = Effects.fromPromise(() => (
        showMessage('Error', action[1])
          .then<Action>(() => ['set-uri', undefined])
          .catch<Action>(error => ['show-error', error])
      ))

      return [['in-progress'], effect]
    }

    default:
      return unreachableCase(action)
  }
}

const showMessage = (title: string, message: string) => (
  new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [{ onPress: resolve, text: 'OK' }],
      { onDismiss: resolve }
    )
  })
)

const takePhoto = () => (
  new Promise<string>((resolve, reject) => {
    ImagePicker.launchCamera(
      {},
      ({ didCancel, error, uri }: ImagePickerResponse) => {
        if (didCancel) {
          reject('cancelled')

        } else if (error) {
          reject(error)

        } else {
          resolve(uri)
        }
      }
    )
  })
)

const saveImage = (uri: string) => (
  CameraRoll.saveToCameraRoll(uri, 'photo')
)

const Extractor = () => {
  const [state, dispatch] = useElmish(update, init)

  switch (state[0]) {
    case 'ready': {
      return (
        <Button
          title={'Take a photo, apply grayscale and save the result'}
          onPress={() => dispatch(['take-photo'])}
          color={'green'}
        />
      )
    }

    case 'in-progress': {
      return (
        <ActivityIndicator size={'large'} />
      )
    }

    case 'photo-taken': {
      return (
        <Grayscale
          style={styles.image}
          extractImageEnabled={true}
          onFilteringError={({ nativeEvent }) => dispatch(['show-error', nativeEvent.message])}
          onExtractImage={({ nativeEvent }) => dispatch(['save-photo', nativeEvent.uri])}
          image={
            <Image
              style={styles.image}
              source={{ uri: state[1] }}
            />
          }
        />
      )
    }

    default:
      return unreachableCase(state[0])
  }
}

const App = () => (
  <View style={styles.container}>
    <Extractor />
  </View>
)

type Styles = {
  readonly container: ViewStyle
  readonly image: ImageStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  image: {
    width: '100%',
    height: '100%'
  }
})

export default App
