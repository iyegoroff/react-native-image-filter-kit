import React from 'react';
import { Image } from 'react-native';

export const imagePlaceholderSource = {
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII='
};

export const ImagePlaceholder = (props) => (
  <Image {...props} source={imagePlaceholderSource} />
);
