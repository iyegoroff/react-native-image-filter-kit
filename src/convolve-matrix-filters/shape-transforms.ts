// tslint:disable:max-file-line-count

import { Platform } from 'react-native'
import { MatrixFilterConfig, Config, AmountFilterConfig, FilterConfig } from '../common/configs'

export interface EdgeDetectionConfig extends FilterConfig {
  readonly disableIntermediateCaches?: boolean
}

const asNative3x3FilterConfig = Platform.select({
  // ios: ({ matrix, image, disableCache }: MatrixFilterConfig) => ({
  //   name: 'CIColorMatrix',
  //   inputRVector: matrix.slice(0, 4),
  //   inputGVector: matrix.slice(5, 9),
  //   inputBVector: matrix.slice(10, 14),
  //   inputAVector: matrix.slice(15, 19),
  //   inputBiasVector: [matrix[4], matrix[9], matrix[14], matrix[19]],
  //   image,
  //   disableCache
  // } as Config),

  android: ({ matrix, image, disableCache }: MatrixFilterConfig) => ({
    name: 'ScriptIntrinsicConvolve3x3',
    coefficients: matrix,
    image,
    disableCache
  } as Config)
})

const asNative5x5FilterConfig = Platform.select({
  // ios: ({ matrix, image, disableCache }: MatrixFilterConfig) => ({
  //   name: 'CIColorMatrix',
  //   inputRVector: matrix.slice(0, 4),
  //   inputGVector: matrix.slice(5, 9),
  //   inputBVector: matrix.slice(10, 14),
  //   inputAVector: matrix.slice(15, 19),
  //   inputBiasVector: [matrix[4], matrix[9], matrix[14], matrix[19]],
  //   image,
  //   disableCache
  // } as Config),

  android: ({ matrix, image, disableCache }: MatrixFilterConfig) => ({
    name: 'ScriptIntrinsicConvolve5x5',
    coefficients: matrix,
    image,
    disableCache
  } as Config)
})

export const shapeTransforms = {
  ConvolveMatrix3x3: asNative3x3FilterConfig,

  ConvolveMatrix5x5: asNative5x5FilterConfig,

  Sharpen: ({ amount = 1, ...config }: AmountFilterConfig) => (
    asNative3x3FilterConfig({
      ...config,
      matrix: [
        0, -amount, 0,
        -amount, amount * 4 + 1, -amount,
        0, -amount, 0
      ]
    })
  ),

  EdgeDetection: (
    { image, disableCache, disableIntermediateCaches = true }: EdgeDetectionConfig
  ) => ({
    name: 'PlusBlendColor',
    dstImage: asNative3x3FilterConfig({
      image,
      disableCache,
      matrix: [
        -1, -1, -1,
        -1, 8, -1,
        -1, -1, -1
      ]
    }),
    disableCache,
    disableIntermediateCaches,
    srcColor: 'black'
  }),

  Emboss: (config: FilterConfig) => (
    asNative3x3FilterConfig({
      ...config,
      matrix: [
        -2, -1, 0,
        -1, 1, 1,
        0, 1, 2
      ]
    })
  ),

  FuzzyGlass: (config: FilterConfig) => (
    asNative3x3FilterConfig({
      ...config,
      matrix: [
        0, 20, 0,
        20, -59, 20,
        1, 13, 0
      ].map(w => w / 7)
    })
  )
}
