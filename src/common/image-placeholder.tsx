import React from 'react'
import { Image, ImageProps } from 'react-native'
import { Omit } from './util'

export const imagePlaceholderSource = {
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAM' +
    'AAWgmWQ0AAAAASUVORK5CYII='
}

export const ImagePlaceholder = (props: Omit<ImageProps, 'source'>) => (
  <Image {...props} source={imagePlaceholderSource} />
)
