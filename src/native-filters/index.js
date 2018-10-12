import React from 'react';
import { NativeImageFilter } from './native-image-filter';
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

const createImageNativeFilter = (name) => (props) => {
  const shapePropKeys = ['config', ...Object.keys(shapes[name])];
  const restPropKeys = Object.keys(props).filter(key => !shapePropKeys.includes(key));

  const { config, images } = extractConfigAndImages({
    type: { isImageFilter: true },
    name,
    ...propsByKeys(props, shapePropKeys)
  });

  return (
    <NativeImageFilter
      config={config}
      {...propsByKeys(props, restPropKeys)}
    >
      {images}
    </NativeImageFilter>
  );
};

export default Object.keys(shapes).reduce(
  (acc, name) => {
    acc[name] = createImageNativeFilter(name);
    acc[name].displayName = name;
    acc[name].isImageFilter = true;

    return acc;
  },
  {}
);
