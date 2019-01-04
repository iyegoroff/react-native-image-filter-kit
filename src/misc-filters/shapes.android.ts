import { Composition, Generator } from '../common/shapes'
import { distance, color, scalar, path, distanceVector } from '../common/inputs'

export const shapes = {
  AndroidDestinationATopCompositing: Composition,

  AndroidSourceOutCompositing: Composition,

  AndroidDestinationInCompositing: Composition,

  AndroidSourceInCompositing: Composition,

  AndroidCircleShape: {
    radius: distance,
    color: color,
    ...Generator
  },

  AndroidOvalShape: {
    radiusX: distance,
    radiusY: distance,
    rotation: scalar,
    color: color,
    ...Generator
  },

  AndroidPathShape: {
    path: path,
    rotation: scalar,
    color: color,
    ...Generator
  },

  AndroidRegularPolygonShape: {
    circumradius: distance,
    borderRadiuses: distanceVector,
    rotation: scalar,
    color: color,
    ...Generator
  }
}
