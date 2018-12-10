import React from 'react'
import { Image, ImageProps } from 'react-native'
import { Omit } from './util'

export const imagePlaceholderSource = {
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAM' +
    'AAWgmWQ0AAAAASUVORK5CYII='
}

export const transparentPlaceholderSource = {
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAY' +
    'AAjCB0C8AAAAASUVORK5CYII='
}

const defaultStyle = {
  width: 1,
  height: 1
}

export const ImagePlaceholder = ({ style, ...props }: Omit<ImageProps, 'source'>) => (
  <Image {...props} source={imagePlaceholderSource} style={style || defaultStyle}/>
)

export const ImageTransparentPlaceholder = ({ style, ...props }: Omit<ImageProps, 'source'>) => (
  <Image {...props} source={transparentPlaceholderSource} style={style || defaultStyle} />
)
