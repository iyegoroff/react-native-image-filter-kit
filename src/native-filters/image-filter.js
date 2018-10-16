import React from 'react';
import { requireNativeComponent } from 'react-native';
import { defaultStyle, checkStyle, hidden } from './style';
import { finalizeConfig } from './config';

const RNImageFilter = requireNativeComponent('RNImageFilter');

const hideEveryTailChild = (child, index) => (
  index === 0 ? child : hidden(child)
);

export const ImageFilter = ({ style, children, config, ...restProps }) => {
  checkStyle(style);

  return (
    <RNImageFilter
      style={[defaultStyle, style]}
      config={JSON.stringify(finalizeConfig(config))}
      {...restProps}
    >
      {/* {children} */}
      {React.Children.map(children, hideEveryTailChild)}
    </RNImageFilter>
  );
};
