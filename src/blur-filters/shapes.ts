import { scalar } from '../common/inputs'
import { Common } from '../common/shapes'

export const shapes = {
  BoxBlur: {
    radius: scalar,
    ...Common
  },

  GaussianBlur: {
    radius: scalar,
    ...Common
  }
}
