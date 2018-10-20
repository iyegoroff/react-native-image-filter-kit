import React from 'react';
import { requireNativeComponent } from 'react-native';
import { defaultStyle, checkStyle, hidden } from './style';
import { finalizeConfig, extractConfigAndImages } from './config';

const RNImageFilter = requireNativeComponent('RNImageFilter');

const hideEveryTailChild = (child, index) => (
  index === 0 ? child : hidden(child)
);

const propsByKeys = (props, keys) => (
  Object.keys(props).reduce(
    (acc, key) => {
      if (keys.includes(key)) {
        acc[key] = props[key];
      }
      return acc;
    },
    {}
  )
);

export const createImageFilter = (name, shape) => ({ style, ...props }) => {
  const shapePropKeys = Object.keys(shape);
  const restPropKeys = Object.keys(props).filter(key => !shapePropKeys.includes(key));

  const { config, images } = extractConfigAndImages({
    type: { isImageFilter: true },
    name,
    ...(props.config || propsByKeys(props, shapePropKeys))
  });

  checkStyle(style);

  return (
    <RNImageFilter
      style={[defaultStyle, style]}
      config={JSON.stringify(finalizeConfig(config))}
      {...propsByKeys(props, restPropKeys)}
    >
      {React.Children.map(images, hideEveryTailChild)}
    </RNImageFilter>
  );
};
