import React from 'react';
import {
  ImageFilterWithColorManagement,
  ImageFilterWithoutColorManagement,
  ImageFilter
} from '../common/image-filter';
import { ImagePlaceholder } from '../common/image-placeholder';
import { Platform } from 'react-native';
import filters from './native-filters';
import { generatedImage } from '../common/image-names';

const nativeImageFilter = (name) => (
  Platform.select({
    ios: ['CIColorMatrix', 'CIColorInvert', 'CIColorPolynomial'].includes(name)
      ? ImageFilterWithoutColorManagement
      : ImageFilterWithColorManagement,

    android: ImageFilter
  })
);

const createImageNativeFilter = (name, config, ImageFilter) => ({
  children,
  imageStyle,
  ...restProps
}) => (
  <ImageFilter
    name={name}
    {...config}
    {...restProps}
  >
    {config.imageNames.includes(generatedImage) && React.Children.count(children) === 0
      ? <ImagePlaceholder style={imageStyle} />
      : children}
  </ImageFilter>
);

export default Object.keys(filters).reduce(
  (acc, name) => {
    acc[name] = createImageNativeFilter(name, filters[name], nativeImageFilter(name));
    acc[name].displayName = name;
    return acc;
  },
  {}
);
