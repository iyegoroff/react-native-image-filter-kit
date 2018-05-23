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
        name: PropTypes.string.isRequired,
        paramNames: PropTypes.arrayOf(PropTypes.string).isRequired,
        inputRadius: PropTypes.number,
        inputAngle: PropTypes.number,
        inputNoiseLevel: PropTypes.number,
        inputSharpness: PropTypes.number,
        inputAmount: PropTypes.number,
        inputBrightness: PropTypes.number,
        inputContrast: PropTypes.number,
        inputSaturation: PropTypes.number,
        inputCenter: PropTypes.shape({
          x: PropTypes.number,
          y: PropTypes.number
        }),
        inputMinComponents: PropTypes.arrayOf(PropTypes.number),
        inputMaxComponents: PropTypes.arrayOf(PropTypes.number),
        inputLevels: PropTypes.number,
        inputWidth: PropTypes.number
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
