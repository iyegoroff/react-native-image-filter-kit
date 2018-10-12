import React from 'react';
import { processColor } from 'react-native';
import invariant from 'fbjs/lib/invariant';

// For some reason RNImageMatrixFilter draw method is not called when component's backgroundColor
// is not set or transparent
export const defaultStyle = {
  backgroundColor: '#fff0'
};

export const hiddenStyle = {
  position: 'absolute',
  opacity: 0,
  zIndex: Number.MIN_SAFE_INTEGER
};

export const checkStyle = (style) => {
  if (style) {
    const { backgroundColor } = defaultStyle;

    invariant(
      processColor(backgroundColor) !== 0,
      `ImageFilter: Can't use '${backgroundColor}' backgroundColor,` +
      ` consider using '#fff0' instead.`
    );
  }
};

export const hidden = (item) => (
  React.cloneElement(item, {
    ...item.props,
    style: item.props.style ? [item.props.style, hiddenStyle] : hiddenStyle
  })
);
