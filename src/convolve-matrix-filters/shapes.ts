import { scalar, scalarVector } from '../common/inputs'
import { Common } from '../common/shapes'

export const shapes = {
  ConvolveMatrix3x3: {
    matrix: scalarVector,
    ...Common
  },

  ConvolveMatrix5x5: {
    matrix: scalarVector,
    ...Common
  },

  Sharpen: {
    amount: scalar,
    ...Common
  },

  EdgeDetection: Common,

  Emboss: Common,

  FuzzyGlass: Common
}
