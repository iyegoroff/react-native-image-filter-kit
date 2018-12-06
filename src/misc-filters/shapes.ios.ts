import {
  scalar,
  color,
  image,
  bool
} from '../common/inputs'

const Common = {
  inputImage: image,
  disableCache: bool
}

export const shapes = {
  IFKHazeRemoval: {
    inputDistance: scalar,
    inputSlope: scalar,
    inputColor: color,
    ...Common
  }
}
