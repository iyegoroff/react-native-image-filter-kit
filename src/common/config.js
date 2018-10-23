import React from 'react';
import { processColor, Platform } from 'react-native';
import invariant from 'fbjs/lib/invariant';
import {
  distance,
  scalar,
  color,
  colorVector,
  image,
  imageStyle
} from './inputs';
import ShapeRegistry from './shape-registry';
import { ImagePlaceholder } from './image-placeholder';

const isAndroid = Platform.OS === 'android';
const id = x => x;
const anyToString = n => `${n}`;
const convertColor = c => (isAndroid ? processColor(c) : c);
const convertColors = cs => cs.map(convertColor);

const paramConvertMap = {
  [distance]: anyToString,
  [scalar]: anyToString,
  [color]: convertColor,
  [colorVector]: convertColors
};

const defaultImageStyle = { width: '100%', height: '100%' };

const requiredValueInvariant = (filterName, value, key) => {
  invariant(
    value !== undefined,
    `ImageFilterKit: ${filterName} filter should specify '${key}' value.`
  );
};

export const finalizeConfig = ({ name, ...values }) => {
  const shape = ShapeRegistry.shape(name);

  return {
    name,
    ...(Object.keys(shape).reduce(
      (acc, key) => {
        const inputType = shape[key] === imageStyle ? image : shape[key];
        key = shape[key] === imageStyle ? 'image' : key;
        const inputValue = values[key];

        if (inputValue !== undefined && inputType !== undefined) {
          const convert = paramConvertMap[inputType] ||
            (inputType === image && typeof inputValue !== 'number' ? finalizeConfig : id);

          acc[key] = { [inputType]: convert(values[key]) };
        }

        return acc;
      },
      {}
    ))
  };
};

export const extractConfigAndImages = (filter) => {
  const images = [];

  const parseFilter = (filter) => {
    if (filter.type && !filter.type.isImageFilter) {
      const idx = images.length;
      images.push(
        filter.props.key !== undefined
          ? filter
          : <React.Fragment key={`image_#${idx}`}>{filter}</React.Fragment>
      );

      return idx;
    }

    const {
      name: n = (filter.type && filter.type.displayName),
      ...values
    } = filter.props ? (filter.props.config || filter.props) : filter;

    let prevConfig;
    let nextConfig = { name: n, ...values };
    do {
      prevConfig = nextConfig;
      nextConfig = ShapeRegistry.transform(prevConfig.name)(prevConfig);
    } while (nextConfig.name !== prevConfig.name);

    const { name, ...rest } = nextConfig;
    const shape = ShapeRegistry.shape(name);

    return ({
      name,
      ...(Object.keys(shape).reduce(
        (acc, key) => {
          const inputType = shape[key];
          const inputValue = rest[key];

          if (inputType === image) {
            requiredValueInvariant(name, inputValue, key);

            acc[key] = parseFilter(inputValue);
          } else if (inputType === imageStyle) {
            const idx = images.length;

            images.push(
              <ImagePlaceholder
                style={inputValue || defaultImageStyle}
                key={`image_placeholder_#${idx}`}
              />
            );

            acc.image = idx;
          } else if (inputType !== undefined && inputValue !== undefined) {
            acc[key] = inputValue;
          }

          return acc;
        },
        {}
      ))
    });
  };

  const config = parseFilter(filter);

  return { config, images };
};
