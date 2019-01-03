import { Composition, Generator } from '../common/shapes'
import { distance, color, scalar } from '../common/inputs'

export const shapes = {
  AndroidDestinationATopCompositing: Composition,

  AndroidSourceOutCompositing: Composition,

  AndroidDestinationInCompositing: Composition,

  AndroidSourceInCompositing: Composition,

  AndroidCircle: {
    radius: distance,
    color: color,
    ...Generator
  },

  AndroidOval: {
    radiusX: distance,
    radiusY: distance,
    rotation: scalar,
    color: color,
    ...Generator
  }
}
