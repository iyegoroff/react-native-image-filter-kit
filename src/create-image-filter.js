import React from 'react';
import Children from 'react-children-utilities';
import { defaultStyle, checkStyle } from './style';
import { View, processColor } from 'react-native';
import { distance, position, scalar, vector, offset } from './input-types'; 

const id = x => x;
const anyToString = n => `${n}`;
const pointToArray = p => [`${p.x}`, `${p.y}`];

const imageStyle = {
  position: 'absolute',
  opacity: 0,
  zIndex: Number.MIN_SAFE_INTEGER
};

const mapImageStyle = style => style ? [style, imageStyle] : imageStyle;

const createImageFilter = (ImageFilter) => ({ style, children, ...restProps }) => {
  checkStyle(style);

  const props = Object.assign(
    {},
    restProps,
    restProps.paramNames.reduce(
      (acc, val, idx) => {
        const paramType = restProps.paramTypes[idx];
        const convert = paramType === position || paramType === offset
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

  let keepImage = true;

  return (
    <ImageFilter
      style={[defaultStyle.container, style]}
      {...props}
    >
      {Children.deepMap(children, (child) => {
        if (child && child.type && child.type.displayName === "Image") {
          if (keepImage) {
            keepImage = false;
            return child;

          } else {
            return React.cloneElement(
              child,
              { ...child.props, style: mapImageStyle(child.props.style) }
            );
          }

        } else {
          return child;
        }
      })}
    </ImageFilter>
  );
};

module.exports = createImageFilter;
