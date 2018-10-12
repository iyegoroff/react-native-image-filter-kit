import React from 'react';
import filters from 'rn-color-matrices';
import ColorMatrix from './color-matrix';

const filterName = (name) => {
  const [first, ...rest] = name.split('');
  return name === 'rgba' ? 'RGBA' : first.toUpperCase() + rest.join('');
};

const filterMap = {
  ColorTone: (filter) => ({ desaturation, toned, lightColor, darkColor, ...restProps }) => (
    <ColorMatrix matrix={filter(desaturation, toned, lightColor, darkColor)} {...restProps} />
  ),

  RGBA: (filter) => ({ red, green, blue, alpha, ...restProps }) => (
    <ColorMatrix matrix={filter(red, green, blue, alpha)} {...restProps} />
  ),

  DuoTone: (filter) => ({ firstColor, secondColor, ...restProps }) => (
    <ColorMatrix matrix={filter(firstColor, secondColor)} {...restProps} />
  )
};

const createFilter = (key) => (
  filterMap[key] ||
    ((filter) => ({ value, ...restProps }) => <ColorMatrix matrix={filter(value)} {...restProps} />)
);

export default Object.keys(filters).reduce(
  (acc, name) => {
    const key = filterName(name);

    acc[key] = createFilter(key)(filters[name]);
    acc[key].displayName = key;
    return acc;
  },
  { ColorMatrix }
);
