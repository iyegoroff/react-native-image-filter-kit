import { Platform } from 'react-native'
import { FilterConfig } from '../common/configs'

interface BlurConfig extends FilterConfig {
  readonly radius: number
}

export const shapeTransforms = {
  BoxBlur: Platform.select({
    ios: ({ radius = 5, image, disableCache }: BlurConfig) => ({
      name: 'CIBoxBlur',
      disableCache,
      inputRadius: radius * 2,
      clampToExtent: true,
      inputImage: {
        name: 'CIBoxBlur',
        disableCache,
        inputRadius: radius * 2,
        clampToExtent: true,
        inputImage: {
          name: 'CIBoxBlur',
          disableCache,
          inputRadius: radius * 2,
          clampToExtent: true,
          inputImage: image
        }
      }
    } as object),

    android: ({ radius = 5, ...config }: BlurConfig) => ({
      ...config,
      name: 'IterativeBoxBlur',
      blurRadius: radius
    } as object)
  }),

  GaussianBlur: Platform.select({
    ios: ({ radius = 5, image, disableCache }: BlurConfig) => ({
      name: 'CIGaussianBlur',
      disableCache,
      inputRadius: radius,
      inputImage: image,
      clampToExtent: true
    } as object),

    android: ({ radius = 5, ...config }: BlurConfig) => ({
      ...config,
      name: 'ScriptIntrinsicBlur',
      radius: radius * 2
    } as object)
  })
}
