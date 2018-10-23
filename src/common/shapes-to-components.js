import { createImageFilter } from './image-filter';

export default (shapes) => (
  Object.keys(shapes).reduce(
    (acc, name) => {
      acc[name] = createImageFilter(name, shapes[name]);
      acc[name].displayName = name;
      acc[name].isImageFilter = true;

      return acc;
    },
    {}
  )
);
