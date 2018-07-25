import React from 'react';
import { ImageFilter } from './image-filter';

const filters = {
  'ColorMatrixColorFilter': ['matrix'],
  'IterativeBoxBlur': ['blurRadius', 'iterations'],
  'LightingColorFilter': ['mul', 'add']
  'RoundAsCircle': []
};

const createImageNativeFilter = (name, paramNames, ImageFilter) => ({
  children,
  ...restProps
}) => (
  <ImageFilter
    name={name}
    paramNames={paramNames}
    {...restProps}
  >
    {children}
  </ImageFilter>
);

export default Object.keys(filters).reduce(
  (acc, name) => {
    acc[name] = createImageNativeFilter(name, filters[name], ImageFilter);
    acc[name].displayName = name;
    return acc;
  }, 
  {}
);
