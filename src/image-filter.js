import React from 'react';
import PropTypes from 'prop-types';
import { defaultStyle, checkStyle } from './style';
import { requireNativeComponent, View } from 'react-native';

const NativeImageFilter = requireNativeComponent(
  'RNImageFilter',
  {
    name: 'NativeImageFilter',
    propTypes: {
      ...{
        name: PropTypes.string,
        radius: PropTypes.number,
        angle: PropTypes.number,
        noiseLevel: PropTypes.number,
        sharpness: PropTypes.number,
        amount: PropTypes.number,
        brightness: PropTypes.number,
        contrast: PropTypes.number,
        saturation: PropTypes.number,
        center: PropTypes.shape({
          x: PropTypes.number,
          y: PropTypes.number
        }),
        paramNames: PropTypes.arrayOf(PropTypes.string)
      },
      ...View.propTypes
    }
  },
  {
    nativeOnly: {
      nativeBackgroundAndroid: true,
      nativeForegroundAndroid: true,
    }
  }
);

export default ({ style, children, ...restProps }) => {
  checkStyle(style);

  return (
    <NativeImageFilter
      style={[defaultStyle.container, style]}
      {...restProps}
    >
      {children}
    </NativeImageFilter>
  );
};
