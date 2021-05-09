import { Platform } from 'react-native'
import { FilterConfig } from '../common/configs'
import { TransformMap } from '../common/shapes'
import { shapes } from './shapes'

type BlurConfig = {
  readonly radius: number
} & FilterConfig

export const shapeTransforms: TransformMap<typeof shapes> = {
  BoxBlur: Platform.select({
    ios: ({ radius = 5, image, disableCache }: BlurConfig) =>
      ({
        name: 'IosCIBoxBlur',
        disableCache,
        inputRadius: radius * 2,
        clampToExtent: true,
        inputImage: {
          name: 'IosCIBoxBlur',
          disableCache,
          inputRadius: radius * 2,
          clampToExtent: true,
          inputImage: {
            name: 'IosCIBoxBlur',
            disableCache,
            inputRadius: radius * 2,
            clampToExtent: true,
            inputImage: image
          }
        }
      } as object),

    android: ({ radius = 5, ...config }: BlurConfig) =>
      ({
        ...config,
        name: 'AndroidIterativeBoxBlur',
        blurRadius: radius
      } as object)
  }),

  GaussianBlur: Platform.select({
    ios: ({ radius = 5, image, disableCache }: BlurConfig) =>
      ({
        name: 'IosCIGaussianBlur',
        disableCache,
        inputRadius: radius,
        inputImage: image,
        clampToExtent: true
      } as object),

    android: ({ radius = 5, ...config }: BlurConfig) =>
      ({
        ...config,
        name: 'AndroidScriptIntrinsicBlur',
        radius: radius * 2
      } as object)
  })
}
