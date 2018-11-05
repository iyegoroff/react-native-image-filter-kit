import { shapes } from './shapes'
import { shapeTransforms } from './shape-transforms'
import { ShapeRegistry } from '../common/shape-registry'
import shapesToComponents from '../common/shapes-to-components'

ShapeRegistry.addShapes(shapes)
ShapeRegistry.addTransforms(shapeTransforms)

export default shapesToComponents(shapes)
