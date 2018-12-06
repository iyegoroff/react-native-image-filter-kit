import { shapes } from './shapes'
import { ShapeRegistry } from '../common/shape-registry'
import shapesToComponents from '../common/shapes-to-components'

ShapeRegistry.addShapes(shapes)

export default shapesToComponents(shapes)
