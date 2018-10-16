import React from 'react';
import { ImageFilter } from './image-filter';
import shapes from './shapes';
import { extractConfigAndImages } from './config';

const propsByKeys = (props, keys) => (
  Object.keys(props).reduce(
    (acc, key) => {
      if (keys.includes(key)) {
        acc[key] = props[key];
      }
      return acc;
    },
    {}
  )
);

const createNativeImageFilter = (name) => (props) => {
  const shapePropKeys = Object.keys(shapes[name]);
  const restPropKeys = Object.keys(props).filter(key => !shapePropKeys.includes(key));

  const { config, images } = extractConfigAndImages({
    type: { isImageFilter: true },
    name,
    ...(props.config || propsByKeys(props, shapePropKeys))
  });

  return (
    <ImageFilter
      config={config}
      {...propsByKeys(props, restPropKeys)}
    >
      {images}
    </ImageFilter>
  );
};

export default Object.keys(shapes).reduce(
  (acc, name) => {
    acc[name] = createNativeImageFilter(name);
    acc[name].displayName = name;
    acc[name].isImageFilter = true;

    return acc;
  },
  {}
);
