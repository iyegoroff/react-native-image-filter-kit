import React from 'react';
import { Text } from 'react-native';
// import { defaultStyle, checkStyle, hidden } from './style';
import { finalizeConfig } from './config';

// const hideEveryTailChild = (child, index) => (
//   index === 0 ? child : hidden(child)
// );

export const createNativeFilter = ImageFilter => {
  const NativeFilter = ({ style, children, config, ...restProps }) => {
    // checkStyle(style);

    return (
      <Text>{JSON.stringify(finalizeConfig(config))}</Text>
    );

    // return (
    //   <ImageFilter
    //     style={[defaultStyle, style]}
    //     config={JSON.stringify(finalizeConfig(config))}
    //     {...restProps}
    //   >
    //     {React.Children.map(children, hideEveryTailChild)}
    //   </ImageFilter>
    // );
  };

  NativeFilter.isImageFilterWithConfig = true;

  return NativeFilter;
};
