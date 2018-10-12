import { processColor, Platform } from 'react-native';
import invariant from 'fbjs/lib/invariant';
import {
  distance,
  position,
  scalar,
  offset,
  color,
  colorVector,
  image,
  generatedImageStyle,
  generatedImage
} from './inputs';
import shapes from './shapes';
import { ImagePlaceholder } from './image-placeholder';

const isAndroid = Platform.OS === 'android';
const id = x => x;
const anyToString = n => `${n}`;
const pointToArray = p => [`${p.x}`, `${p.y}`];
const convertColor = c => (isAndroid ? processColor(c) : c);
const convertColors = cs => cs.map(convertColor);

const paramConvertMap = {
  [position]: pointToArray,
  [offset]: pointToArray,
  [distance]: anyToString,
  [scalar]: anyToString,
  [color]: convertColor,
  [colorVector]: convertColors
};

export const finalizeConfig = ({ name, ...values }) => {
  const shape = shapes[name];

  invariant(shape, `ImageFilter: ${name} filter doesn't exist on ${Platform.OS}.`);

  return {
    name,
    ...(Object.keys(shape).reduce(
      (acc, key) => {
        const value = values[key];

        if (value !== undefined) {
          const inputType = shape[key];
          const convert = paramConvertMap[inputType] || (inputType === image ? finalizeConfig : id);

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
      images.push(filter);
      return images.length - 1;
    }

    const {
      name = (filter.type && filter.type.displayName),
      ...rest
    } = filter.props ? (filter.props.config || filter.props) : filter;

    const shape = shapes[name];

    return ({
      name,
      ...(Object.keys(rest).reduce(
        (acc, key) => {
          const inputType = shape[key];

          if (inputType === image) {
            acc[key] = parseFilter(rest[key]);
          } else if (inputType === generatedImageStyle) {
            images.push(<ImagePlaceholder style={rest[key]} />);
            acc[generatedImage] = images.length - 1;
          } else {
            acc[key] = rest[key];
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
