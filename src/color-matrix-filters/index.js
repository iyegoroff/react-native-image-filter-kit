import { createImageFilter } from '../common/image-filter';
import shapes from './shapes';
import shapeTransforms from './shape-transforms';
import ShapeRegistry from '../common/shape-registry';

ShapeRegistry.addShapes(shapes);
ShapeRegistry.addTransforms(shapeTransforms);

export default Object.keys(shapes).reduce(
  (acc, name) => {
    acc[name] = createImageFilter(name, shapes[name]);
    acc[name].displayName = name;
    acc[name].isImageFilter = true;

    return acc;
  },
  {}
);
