import React from 'react'
import { Image, ImageProps, ImageBackgroundProps, ImageBackground } from 'react-native'
import { Omit } from './util'

export const imagePlaceholderSource = {
  uri:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAM' +
    'AAWgmWQ0AAAAASUVORK5CYII='
}

export const transparentPlaceholderSource = {
  uri:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAY' +
    'AAjCB0C8AAAAASUVORK5CYII='
}

const defaultStyle = {
  width: '100%',
  height: '100%'
}

export const ImagePlaceholder = ({ style, ...props }: Omit<ImageProps, 'source'>) => (
  <Image {...props} source={imagePlaceholderSource} style={[defaultStyle, style]} />
)

export const ImageBackgroundPlaceholder = ({
  style,
  ...props
}: Omit<ImageBackgroundProps, 'source'>) => (
  <ImageBackground {...props} source={imagePlaceholderSource} style={[defaultStyle, style]} />
)

export const ImageTransparentPlaceholder = ({ style, ...props }: Omit<ImageProps, 'source'>) => (
  <Image {...props} source={transparentPlaceholderSource} style={[defaultStyle, style]} />
)
