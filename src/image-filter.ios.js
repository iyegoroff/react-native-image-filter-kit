import React from 'react';
import PropTypes from 'prop-types';
import { defaultStyle, checkStyle } from './style';
import { requireNativeComponent, View } from 'react-native';

const anyToString = n => `${n}`;
const pointToArray = p => [`${p.x}`, `${p.y}`];

const requireNativeImageFilter = (name) => {
  return requireNativeComponent(
    name,
    {
      name: name,
      propTypes: {
        ...{
          name: PropTypes.string.isRequired,
          paramNames: PropTypes.arrayOf(PropTypes.string).isRequired,
          resizeOutput: PropTypes.bool,
          inputRadius: PropTypes.string,
          inputAngle: PropTypes.number,
          inputNoiseLevel: PropTypes.number,
          inputSharpness: PropTypes.number,
          inputAmount: PropTypes.number,
          inputBrightness: PropTypes.number,
          inputContrast: PropTypes.number,
          inputSaturation: PropTypes.number,
          inputCenter: PropTypes.arrayOf(PropTypes.string),
          inputPoint0: PropTypes.arrayOf(PropTypes.string),
          inputPoint1: PropTypes.arrayOf(PropTypes.string),
          inputMinComponents: PropTypes.arrayOf(PropTypes.number),
          inputMaxComponents: PropTypes.arrayOf(PropTypes.number),
          inputLevels: PropTypes.number,
          inputScale: PropTypes.number,
          inputRotation: PropTypes.number,
          inputRefraction: PropTypes.number,
          inputWidth: PropTypes.string,
          inputIntensity: PropTypes.number
        },
        ...View.propTypes
      }
    }
  );
};

const createImageFilter = (ImageFilter) => ({ style, children, ...restProps }) => {
  checkStyle(style);

  const {
    inputRadius,
    inputWidth,
    inputCenter,
    inputPoint0,
    inputPoint1,
    ...restInputs
  } = restProps;

  const props = {
    ...(inputRadius ? { inputRadius: anyToString(inputRadius) } : {}),
    ...(inputWidth ? { inputWidth: anyToString(inputWidth) } : {}),
    ...(inputCenter ? { inputCenter: pointToArray(inputCenter) } : {}),
    ...(inputPoint0 ? { inputPoint0: pointToArray(inputPoint0) } : {}),
    ...(inputPoint1 ? { inputPoint1: pointToArray(inputPoint1) } : {}),
    ...restInputs
  };

  return (
    <ImageFilter
      style={[defaultStyle.container, style]}
      {...props}
    >
      {children}
    </ImageFilter>
  );
};

export const ImageFilterWithColorManagement = createImageFilter(
  requireNativeImageFilter('RNImageFilterWithColorManagement')
);

export const ImageFilterWithoutColorManagement = createImageFilter(
  requireNativeImageFilter('RNImageFilterWithoutColorManagement')
);
