import React from 'react';
import Children from 'react-children-utilities';
import { defaultStyle, checkStyle } from './style';
import { View, processColor, Platform } from 'react-native';
import { distance, position, scalar, vector, offset, color, colors } from './input-types'; 

const isAndroid = Platform.OS === 'android';
const id = x => x;
const anyToString = n => `${n}`;
const pointToArray = p => [`${p.x}`, `${p.y}`];
const convertColor = c => isAndroid ? processColor(c) : c;
const convertColors = cs => cs.map(convertColor);

const hiddenImageStyle = {
  position: 'absolute',
  opacity: 0,
  zIndex: Number.MIN_SAFE_INTEGER
};

const mapHiddenImageStyle = style => style ? [style, hiddenImageStyle] : hiddenImageStyle;

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
          : paramType === color
          ? convertColor
          : paramType === colors
          ? convertColors
          : id;

        acc[val] = convert(restProps[val]);

        return acc; 
      },
      {}
    )
  );

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
              { ...child.props, style: mapHiddenImageStyle(child.props.style) }
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
