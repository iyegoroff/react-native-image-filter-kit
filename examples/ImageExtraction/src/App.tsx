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
import { ImagePickerResponse, launchCamera } from 'react-native-image-picker'
import useElmish, { Effects, Reducer, Effect } from 'react-use-elmish'
import { unreachableCase } from 'ts-assert-unreachable'
import CameraRoll from '@react-native-community/cameraroll'

type State = ['ready'] | ['in-progress'] | ['photo-taken', string]

type Action =
  | ['take-photo']
  | ['set-uri', string | undefined]
  | ['save-photo', string]
  | ['show-error', Error]

const init = (): [State, Effect<Action>] => [['ready'], Effects.none()]

const update: Reducer<State, Action> = (_, action) => {
  switch (action[0]) {
    case 'take-photo': {
      const effect = Effects.fromPromise<Action, string>(
        takePhoto,
        (uri) => ['set-uri', uri],
        (error) => ['show-error', error]
      )

      return [['in-progress'], effect]
    }

    case 'set-uri': {
      const [, uri] = action

      return uri === undefined
        ? [
            ['ready'],
          Effects.attemptFunction(cleanExtractedImagesCache, (error) => ['show-error', error])
        ]
        : [['photo-taken', uri], Effects.none()]
    }

    case 'save-photo': {
      const effect = Effects.fromPromise<Action>(
        () =>
          saveImage(action[1]).then(() =>
            showMessage('Success', 'Filtered image was saved to camera roll')
          ),
        () => ['set-uri', undefined],
        (error) => ['show-error', error]
      )

      return [['in-progress'], effect]
    }

    case 'show-error': {
      const effect = Effects.fromPromise<Action>(
        () => showMessage('Error', action[1].message),
        () => ['set-uri', undefined],
        (error) => ['show-error', error]
      )

      return [['in-progress'], effect]
    }

    default:
      return unreachableCase(action)
  }
}

const showMessage = (title: string, message: string) =>
  new Promise((resolve) => {
    Alert.alert(title, message, [{ onPress: resolve, text: 'OK' }], {
      onDismiss: () => resolve(undefined)
    })
  })

const takePhoto = () =>
  new Promise<string>((resolve, reject: (reason: Error) => void) => {
    launchCamera(
      { mediaType: 'photo' },
      ({ didCancel, errorMessage, uri }: ImagePickerResponse) => {
        if (didCancel) {
          reject(new Error('cancelled'))
        } else if (errorMessage || uri === undefined) {
          reject(new Error(errorMessage ?? 'no uri'))
        } else {
          resolve(uri)
        }
      }
    )
  })

const saveImage = (uri: string) => CameraRoll.save(uri, { type: 'photo' })

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
      return <ActivityIndicator size={'large'} />
    }

    case 'photo-taken': {
      return (
        <Grayscale
          style={styles.image}
          onFilteringError={({ nativeEvent }) =>
            dispatch(['show-error', new Error(nativeEvent.message)])
          }
          onExtractImage={({ nativeEvent }) => dispatch(['save-photo', nativeEvent.uri])}
          extractImageEnabled={true}
          image={<Image style={styles.image} source={{ uri: state[1] }} />}
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
