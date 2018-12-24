import React from 'react'
import { processColor, Platform } from 'react-native'
import {
  distance,
  scalar,
  color,
  colorVector,
  image,
  Input,
  position,
  distanceVector,
  area,
  marker
} from './inputs'
import { ShapeRegistry } from './shape-registry'
import { id } from './util'
import { Config } from './configs'
import { swapComposition } from './swap-composition'
import { ImagePlaceholder } from './image-placeholder'
import { convertImageName } from './convert-image-name'

const anyToString = (n: unknown) => `${n}`
const convertDistances = (distances: unknown[]) => distances.map(anyToString)
const convertPosition = ({ x, y }: { x: unknown; y: unknown }) => ({ x: `${x}`, y: `${y}` })
const convertColor = processColor
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
  inputTargetImagePosition: dstPosition,
  inputDisplacementImageResizeMode: dstResizeMode,
  inputDisplacementImageAnchor: dstAnchor,
  inputDisplacementImagePosition: dstPosition
}

const srcImage = 'srcImage'
const dstImage = 'dstImage'

const iosMatchMap: { [key: string]: string } = {
  inputImage: srcImage,
  inputGradientImage: dstImage,
  inputBackgroundImage: dstImage,
  inputMask: dstImage,
  inputTargetImage: dstImage,
  inputDisplacementImage: dstImage
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

const removePlatformPrefixes = (name: string) => (
  name.replace(/^(?:Android|Ios)/, '')
)

export const finalizeConfig = ({ name, ...values }: Config) => {
  const shape = ShapeRegistry.shape(name)

  return ({
    name: removePlatformPrefixes(name),
    ...(Object.keys(shape).reduce(
      (acc, key) => {
        const inputType = shape[key] as Input
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

const patchComposition = (config: Config) => {
  const cfg = {
    ...config,
    resizeCanvasTo: convertImageName(config.name, config['resizeCanvasTo'])
  }

  return Platform.select({
    ios: cfg['resizeCanvasTo'] === 'dstImage' ? swapComposition(cfg, 'srcImage') : cfg,
    android: cfg['resizeCanvasTo'] === 'srcImage' ? swapComposition(cfg, 'dstImage') : cfg
  })
}

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
            acc[key] = parseFilter(
              inputValue || <ImagePlaceholder key={`ifk_placeholder_${images.length}`} />
            )

          } else if (inputType === marker) {
            acc[key] = true

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
