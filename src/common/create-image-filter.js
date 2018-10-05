import React from 'react';
import Children from 'react-children-utilities';
import { defaultStyle, checkStyle } from './style';
import { View, processColor, Platform } from 'react-native';
import { distance, position, scalar, scalarVector, offset, color, colorVector } from './input-types'; 

const isAndroid = Platform.OS === 'android';
const id = x => x;
const anyToString = n => `${n}`;
const pointToArray = p => [`${p.x}`, `${p.y}`];
const convertColor = c => isAndroid ? processColor(c) : c;
const convertColors = cs => cs.map(convertColor);

const paramConvertMap = {
  [position]: pointToArray,
  [offset]: pointToArray,
  [distance]: anyToString,
  [scalar]: anyToString,
  [color]: convertColor,
  [colorVector]: convertColors
};

const hiddenImageStyle = {
  position: 'absolute',
  opacity: 0,
  zIndex: Number.MIN_SAFE_INTEGER
};

const mapHiddenImageStyle = style => style ? [style, hiddenImageStyle] : hiddenImageStyle;

const isImage = (element) => (
  element &&
  element.type &&
  typeof element.type.getSize === 'function' &&
  typeof element.type.prefetch === 'function' &&
  typeof element.type.resolveAssetSource === 'function'
);

const createImageFilter = (ImageFilter) => ({ style, children, ...restProps }) => {
  checkStyle(style);

  const props = Object.assign(
    {},
    restProps,
    restProps.paramNames.reduce(
      (acc, val, idx) => {
        const paramType = restProps.paramTypes[idx];
        const convert = paramConvertMap[paramType] || id;

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
        if (isImage(child)) {
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
