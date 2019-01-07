import {
  registerFilter,
  CommonConfig,
  ConfigCase,
  CacheableConfig,
  Filterable
} from 'react-native-image-filter-kit'
import { Platform } from 'react-native'

interface HazeRemovalConfig<Rest = never> extends CommonConfig<HazeRemovalExtensionConfig<Rest>> {
  readonly distance?: number
  readonly slope?: number
  readonly color?: string
}

interface AndroidHazeRemovalConfig<Rest = never>
  extends HazeRemovalConfig<HazeRemovalExtensionConfig<Rest>> { }

interface IosIFKHRHazeRemovalConfig<Rest = never> extends CacheableConfig {
  readonly inputDistance?: number
  readonly inputSlope?: number
  readonly inputColor?: string
  readonly inputImage: Filterable<Rest>
}

export type HazeRemovalExtensionConfig<Rest = never> =
  | ConfigCase<'HazeRemoval', HazeRemovalConfig<Rest>>
  | ConfigCase<'AndroidHazeRemoval', AndroidHazeRemovalConfig<Rest>>
  | ConfigCase<'IosIFKHRHazeRemoval', IosIFKHRHazeRemovalConfig<Rest>>

registerFilter(
  'AndroidHazeRemoval',
  {
    image: 'image',
    disableCache: 'bool',
    distance: 'scalar',
    slope: 'scalar',
    color: 'color'
  }
)

registerFilter(
  'IosIFKHRHazeRemoval',
  {
    inputImage: 'image',
    disableCache: 'bool',
    inputDistance: 'scalar',
    inputSlope: 'scalar',
    inputColor: 'color'
  }
)

export const HazeRemoval = registerFilter(
  'HazeRemoval',
  {
    image: 'image',
    disableCache: 'bool',
    distance: 'scalar',
    slope: 'scalar',
    color: 'color'
  },
  ({ image, disableCache, distance = 0.2, slope = 0, color = 'white' }: HazeRemovalConfig) => (
    Platform.select({
      ios: {
        name: 'IosIFKHRHazeRemoval',
        inputImage: image,
        disableCache,
        inputDistance: distance,
        inputSlope: slope,
        inputColor: color
      } as HazeRemovalExtensionConfig,
      android: {
        name: 'AndroidHazeRemoval',
        image,
        disableCache,
        distance,
        slope,
        color
      } as HazeRemovalExtensionConfig
    })
  )
)
