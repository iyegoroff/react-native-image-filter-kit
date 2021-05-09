import React from 'react'
import * as ReactIs from 'react-is'
import { processColor, ViewStyle, ViewProps, StyleProp } from 'react-native'
import invariant from 'ts-tiny-invariant'

// For some reason RNImageMatrixFilter draw method is not called when component's backgroundColor
// is not set or transparent
export const defaultStyle = {
  backgroundColor: '#fff0'
}

export const hiddenStyle = {
  position: 'absolute',
  opacity: 0,
  zIndex: Number.MIN_SAFE_INTEGER
}

export const checkStyle = (style: StyleProp<ViewStyle>) => {
  if (style) {
    const { backgroundColor } = defaultStyle

    invariant(
      processColor(backgroundColor) !== 0,
      `ImageFilterKit: Can't use '${backgroundColor}' backgroundColor,` +
        ` consider using '#fff0' instead.`
    )
  }
}

export const hidden = (item: React.ReactElement<ViewProps & { children?: React.ReactNode }>) => {
  if (ReactIs.isFragment(item)) {
    const child = item.props.children as React.ReactElement<ViewProps>

    return React.cloneElement(item, {
      ...item.props,
      children: {
        ...child,
        props: {
          ...child.props,
          style: child.props.style ? [child.props.style, hiddenStyle] : hiddenStyle
        }
      }
    })
  }

  const it = item as React.ReactElement<{ style?: unknown }>

  return React.cloneElement(it, {
    ...it.props,
    style: it.props.style ? [it.props.style, hiddenStyle] : hiddenStyle
  })
}
