import React from 'react'
import { processColor, Platform } from 'react-native'
import invariant from 'invariant'
import {
  distance,
  scalar,
  color,
  colorVector,
  image,
  imageStyle,
  Input,
  position,
  distanceVector,
  area
} from './inputs'
import { ShapeRegistry } from './shape-registry'
import { ImagePlaceholder } from './image-placeholder'
import { id } from './util'

const mainImageName = Platform.OS === 'android' ? 'image' : 'generatedImage'

const anyToString = (n: unknown) => `${n}`
const convertDistances = (distances: unknown[]) => distances.map(anyToString)
const convertPosition = ({ x, y }: { x: unknown; y: unknown }) => ({ x: `${x}`, y: `${y}` })
const convertColor = processColor // (c: any) => (isAndroid ? processColor(c) : c)
const convertColors = (cs: unknown[]) => cs.map(convertColor)
const convertArea = (rect: { x: unknown; y: unknown; width: unknown; height: unknown }) => ({
  x: `${rect.x}`,
  y: `${rect.y}`,
  width: `${rect.width}`,
  height: `${rect.height}`
})

const paramConvertMap: { [key: string]: Function } = {
  [position]: convertPosition,
  [distance]: anyToString,
  [distanceVector]: convertDistances,
  [scalar]: anyToString,
  [color]: convertColor,
  [colorVector]: convertColors,
  [area]: convertArea
}

const srcResizeMode = 'srcResizeMode'
const srcAnchor = 'srcAnchor'
const srcPosition = 'srcPosition'
const dstResizeMode = 'dstResizeMode'
const dstAnchor = 'dstAnchor'
const dstPosition = 'dstPosition'

const iosKeyConvertMap: { [key: string]: string } = {
  inputImageResizeMode: srcResizeMode,
  inputImageAnchor: srcAnchor,
  inputImagePosition: srcPosition,
  inputBackgroundImageResizeMode: dstResizeMode,
  inputBackgroundImageAnchor: dstAnchor,
  inputBackgroundImagePosition: dstPosition,
  inputMaskResizeMode: dstResizeMode,
  inputMaskAnchor: dstAnchor,
  inputMaskPosition: dstPosition,
  inputGradientImageResizeMode: dstResizeMode,
  inputGradientImageAnchor: dstAnchor,
  inputGradientImagePosition: dstPosition,
  inputTargetImageResizeMode: dstResizeMode,
  inputTargetImageAnchor: dstAnchor,
  inputTargetImagePosition: dstPosition
}

const srcImage = 'srcImage'
const dstImage = 'dstImage'

const iosMatchMap: { [key: string]: string } = {
  inputImage: srcImage,
  inputGradientImage: dstImage,
  inputBackgroundImage: dstImage,
  inputMask: dstImage,
  inputTargetImage: dstImage
}

const defaultImageStyle = { width: '100%', height: '100%' }

const requiredValueInvariant = (filterName: string, value: any, key: string) => {
  invariant(
    value !== undefined,
    `ImageFilterKit: ${filterName} filter should specify '${key}' value.`
  )
}

interface Config {
  readonly name: string
  [key: string]: any
}

const convertKey = Platform.select({
  android: id,
  ios: (key: string) => iosKeyConvertMap[key] || key
})

const convertValue = Platform.select({
  android: id,
  ios: (value: any) => (
    typeof (value as { match: Function | string }).match === 'string'
      ? { match: iosMatchMap[value.match] || value.match }
      : value
  )
})

export const finalizeConfig = ({ name, ...values }: Config) => {
  const shape = ShapeRegistry.shape(name)

  return ({
    name,
    ...(Object.keys(shape).reduce(
      (acc, k) => {
        const inputType = shape[k] === imageStyle ? image : shape[k] as Input
        const key = shape[k] === imageStyle ? mainImageName : k
        const inputValue = values[key]

        if (inputValue !== undefined) {
          const convert: Function = paramConvertMap[inputType] ||
            (inputType === image && typeof inputValue !== 'number' ? finalizeConfig : id)

          acc[convertKey(key)] = { [inputType]: convertValue(convert(values[key])) }
        }

        return acc
      },
      {} as Config
    ))
  })
}

const swapComposition = (config: Config, resizeCanvasTo: string) => ({
  ...config,
  dstImage: config['srcImage'],
  srcImage: config['dstImage'],
  dstResizeMode: config['srcResizeMode'],
  srcResizeMode: config['dstResizeMode'],
  dstAnchor: config['srcAnchor'],
  srcAnchor: config['dstAnchor'],
  dstPosition: config['srcPosition'],
  srcPosition: config['dstPosition'],
  resizeCanvasTo,
  swapImages: true
})

const patchComposition = (config: Config) => (
  Platform.select({
    ios: config['resizeCanvasTo'] === 'dstImage' ? swapComposition(config, 'srcImage') : config,
    android: config['resizeCanvasTo'] === 'srcImage' ? swapComposition(config, 'dstImage') : config
  })
)

export const extractConfigAndImages = (filterProps: Config) => {
  const images: React.ReactElement<any>[] = []

  const parseFilter = (filter: Config | React.ReactElement<any>) => {
    if (filter.type && !filter.type.isImageFilter) {
      const idx = images.length
      const elem = filter as React.ReactElement<any>

      images.push(elem)

      return idx
    }

    const {
      name: n = (filter.type && filter.type.displayName),
      ...values
    } = filter.props ? (filter.props.config || filter.props) : filter

    let prevConfig
    let nextConfig = { name: n, ...values }
    do {
      prevConfig = nextConfig
      nextConfig = ShapeRegistry.transform(prevConfig.name)(patchComposition(prevConfig))
    } while (nextConfig.name !== prevConfig.name)

    const { name, ...rest } = nextConfig
    const shape = ShapeRegistry.shape(name)

    return ({
      name,
      ...(Object.keys(shape).reduce(
        (acc, key) => {
          const inputType = shape[key] as Input
          const inputValue = rest[key]

          if (inputType === image) {
            requiredValueInvariant(name, inputValue, key)

            acc[key] = parseFilter(inputValue)
          } else if (inputType === imageStyle) {
            const idx = images.length

            images.push(
              <ImagePlaceholder
                style={inputValue || defaultImageStyle}
                key={`image_placeholder_#${idx}`}
              />
            )

            acc[mainImageName] = idx
          } else if (inputValue !== undefined) {
            acc[key] = inputValue
          }

          return acc
        },
        {} as { [key: string]: any }
      ))
    })
  }

  const config = parseFilter(filterProps)

  return { config, images } as { config: Config; images: React.ReactElement<any>[] }
}
