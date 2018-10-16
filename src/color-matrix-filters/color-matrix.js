import React from 'react';
import { Platform } from 'react-native';
import filters from '../native-filters';

const { CIColorMatrix, ColorMatrixColorFilter } = filters;

export default Platform.select({
  ios: ({ matrix, ...restProps }) => (
    <CIColorMatrix
      inputRVector={matrix.slice(0, 4)}
      inputGVector={matrix.slice(5, 9)}
      inputBVector={matrix.slice(10, 14)}
      inputAVector={matrix.slice(15, 19)}
      inputBiasVector={[matrix[4], matrix[9], matrix[14], matrix[19]]}
      {...restProps}
    />
  ),

  android: ({ matrix, ...restProps }) => <ColorMatrixColorFilter matrix={matrix} {...restProps} />
});
