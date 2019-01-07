import { bool, Input } from './inputs'
import { ShapeRegistry } from './shape-registry'
import shapesToComponents from './shapes-to-components'

type Shape = { [key: string]: Input }

export default (name: string, shape: Shape, transform?: (from: object) => object) => {
  const shapes = {
    [name]: {
      disableCache: bool,
      ...shape
    }
  }

  ShapeRegistry.addShapes(shapes)

  if (transform !== undefined) {
    ShapeRegistry.addTransforms({ [name]: transform })
  }

  return shapesToComponents(shapes)[name]
}
