import React, { cloneElement } from 'react';
import { requireNativeComponent, View, Platform } from 'react-native';
import { defaultStyle, checkStyle } from '../common/style';
import nativeFilters from '../native-platform-filters';
import filters from 'rn-color-matrices';

const filterName = (name) => {
  const [first, ...rest] = name;
  return name === 'rgba' ? 'RGBA' : first.toUpperCase() + rest.join('');
};

const { CIColorMatrix, ColorMatrixColorFilter } = nativeFilters;

const ColorMatrix = Platform.select({
  ios: ({ matrix, children, ...restProps }) => (
    <CIColorMatrix
      inputRVector={matrix.slice(0, 4)}
      inputGVector={matrix.slice(5, 9)}
      inputBVector={matrix.slice(10, 14)}
      inputAVector={matrix.slice(15, 19)}
      inputBiasVector={[matrix[4], matrix[9], matrix[14], matrix[19]]}
      {...restProps}
    >
      {children}
    </CIColorMatrix>
  ),

  android: ({ matrix, children, ...restProps }) => (
    <ColorMatrixColorFilter
      matrix={matrix}
      {...restProps}
    >
      {children}
    </ColorMatrixColorFilter>
  )
});

const createColorMatrixImageFilter = (filter) => ({ value, ...restProps }) => (
  <ColorMatrix
    matrix={filter(value)}
    {...restProps}
  />
);

const createColorToneImageFilter = (filter) => ({
  desaturation,
  toned,
  lightColor,
  darkColor,
  ...restProps
}) => (
  <ColorMatrix
    matrix={filter(desaturation, toned, lightColor, darkColor)}
    {...restProps}
  />
);

const createRGBAImageFilter = (filter) => ({ red, green, blue, alpha, ...restProps }) => (
  <ColorMatrix
    matrix={filter(red, green, blue, alpha)}
    {...restProps}
  />
);

export default Object.keys(filters).reduce(
  (acc, name) => {
    const key = filterName(name);
    const create = key === 'ColorTone'
      ? createColorToneImageFilter
      : key === 'RGBA' ? createRGBAImageFilter : createColorMatrixImageFilter;

    acc[key] = create(filters[name]);
    acc[key].displayName = key;
    return acc;
  },
  { 'ColorMatrix': ColorMatrix }
);
