import { Platform } from 'react-native'
import { MatrixFilterConfig, Config, AmountFilterConfig, FilterConfig } from '../common/configs'
import { TransformMap } from '../common/shapes'
import { shapes } from './shapes'

export type EdgeDetectionConfig = {
  readonly disableIntermediateCaches?: boolean
} & FilterConfig

const edgeDetectionMatrix = [-1, -1, -1, -1, 8, -1, -1, -1, -1]

const embossMatrix = [-2, -1, 0, -1, 1, 1, 0, 1, 2]

const fuzzyGlassMatrix = [0, 20, 0, 20, -59, 20, 1, 13, 0].map((w) => w / 7)

const asNative3x3FilterConfig = Platform.select({
  ios: ({ matrix, image, disableCache }: MatrixFilterConfig) =>
    ({
      name: 'IosCIConvolution3X3',
      inputWeights: matrix,
      inputImage: image,
      disableCache
    } as Config),

  android: ({ matrix, image, disableCache }: MatrixFilterConfig) =>
    ({
      name: 'AndroidScriptIntrinsicConvolve3x3',
      coefficients: matrix,
      image,
      disableCache
    } as Config),

  default: () => ({} as Config)
})

const asNative5x5FilterConfig = Platform.select({
  ios: ({ matrix, image, disableCache }: MatrixFilterConfig) =>
    ({
      name: 'IosCIConvolution5X5',
      inputWeights: matrix,
      inputImage: image,
      disableCache
    } as Config),

  android: ({ matrix, image, disableCache }: MatrixFilterConfig) =>
    ({
      name: 'AndroidScriptIntrinsicConvolve5x5',
      coefficients: matrix,
      image,
      disableCache
    } as Config)
})

export const shapeTransforms: TransformMap<typeof shapes> = {
  ConvolveMatrix3x3: asNative3x3FilterConfig,

  ConvolveMatrix5x5: asNative5x5FilterConfig,

  Sharpen: ({ amount = 1, ...config }: AmountFilterConfig) =>
    asNative3x3FilterConfig({
      ...config,
      matrix: [0, -amount, 0, -amount, amount * 4 + 1, -amount, 0, -amount, 0]
    }),

  EdgeDetection: Platform.select({
    ios: ({ image, disableCache }: EdgeDetectionConfig) =>
      ({
        name: 'IosCIColorInvert',
        inputImage: {
          ...asNative3x3FilterConfig({
            image,
            disableCache,
            matrix: edgeDetectionMatrix
          }),
          inputBias: 1
        },
        disableCache
      } as Config),

    android: ({ image, disableCache, disableIntermediateCaches = true }: EdgeDetectionConfig) =>
      ({
        name: 'PlusBlendColor',
        dstImage: asNative3x3FilterConfig({
          image,
          disableCache,
          matrix: edgeDetectionMatrix
        }),
        disableCache,
        disableIntermediateCaches,
        srcColor: 'black'
      } as Config)
  }),

  Emboss: (config: FilterConfig) =>
    asNative3x3FilterConfig({
      ...config,
      matrix: embossMatrix
    }),

  FuzzyGlass: (config: FilterConfig) =>
    asNative3x3FilterConfig({
      ...config,
      matrix: fuzzyGlassMatrix
    })
}
