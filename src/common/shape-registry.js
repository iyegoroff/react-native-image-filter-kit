import { Platform } from 'react-native';
import invariant from 'fbjs/lib/invariant';

const id = x => x;

const ShapeRegistry = {
  shapes: {},
  transforms: {},

  addShapes: (shapes) => {
    const keys = Object.keys(ShapeRegistry.shapes);
    const intersection = Object.keys(shapes).filter(k => keys.includes(k));
    invariant(
      intersection.length === 0,
      `ImageFilterKit: Attempt to add already registered filter(s) - ${intersection.join()}.`
    );

    ShapeRegistry.shapes = {
      ...ShapeRegistry.shapes,
      ...shapes
    };
  },

  addTransforms: (transforms) => {
    const keys = Object.keys(ShapeRegistry.transforms);
    const intersection = Object.keys(transforms).filter(k => keys.includes(k));
    invariant(
      intersection.length === 0,
      `ImageFilterKit: Attempt to add already registered transform(s) - ${intersection.join()}.`
    );

    ShapeRegistry.transforms = {
      ...ShapeRegistry.transforms,
      ...transforms
    };
  },

  shape: (name) => {
    const shape = ShapeRegistry.shapes[name];

    invariant(shape, `ImageFilterKit: ${name} shape doesn't exist on ${Platform.OS}.`);

    return shape;
  },

  transform: (name) => (
    ShapeRegistry.transforms[name] || id
  )
};

export default ShapeRegistry;
