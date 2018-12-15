import { distance } from '../common/inputs'
import { Common } from '../common/shapes'

export const shapes = {
  BoxBlur: {
    radius: distance,
    ...Common
  },

  GaussianBlur: {
    radius: distance,
    ...Common
  }
}
