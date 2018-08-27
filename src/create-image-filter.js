import React from 'react';
import { defaultStyle, checkStyle } from './style';
import { View, processColor } from 'react-native';
import {
  distance,
  point,
  scalar,
  vector
} from './input-types';

const id = x => x;
const anyToString = n => `${n}`;
const pointToArray = p => [`${p.x}`, `${p.y}`];

const createImageFilter = (ImageFilter) => ({ style, children, ...restProps }) => {
  checkStyle(style);

  const props = Object.assign(
    {},
    restProps,
    restProps.paramNames.reduce(
      (acc, val, idx) => {
        const paramType = restProps.paramTypes[idx];
        const convert = paramType === point
          ? pointToArray
          : paramType === distance || paramType === scalar
          ? anyToString
          : id;

        acc[val] = convert(restProps[val]);

        return acc; 
      },
      {}
    )
  );

  // const {
  //   inputRadius,
  //   inputWidth,
  //   inputAmount,
  //   inputScale,
  //   inputCenter,
  //   inputPoint0,
  //   inputPoint1,
  //   mul,
  //   add,
  //   ...restInputs
  // } = restProps;

  // const props = {
  //   ...(inputRadius ? { inputRadius: anyToString(inputRadius) } : {}),
  //   ...(inputWidth ? { inputWidth: anyToString(inputWidth) } : {}),
  //   ...(inputAmount ? { inputAmount: anyToString(inputAmount) } : {}),
  //   ...(inputScale ? { inputScale: anyToString(inputScale) } : {}),
  //   ...(inputCenter ? { inputCenter: pointToArray(inputCenter) } : {}),
  //   ...(inputPoint0 ? { inputPoint0: pointToArray(inputPoint0) } : {}),
  //   ...(inputPoint1 ? { inputPoint1: pointToArray(inputPoint1) } : {}),
  //   ...(mul ? { mul: processColor(mul) } : {}),
  //   ...(add ? { add: processColor(add) } : {}),
  //   ...restInputs
  // };

  return (
    <ImageFilter
      style={[defaultStyle.container, style]}
      {...props}
    >
      {children}
    </ImageFilter>
  );
};

module.exports = createImageFilter;
