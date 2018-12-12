import React from 'react'
import { requireNativeComponent, ViewProps } from 'react-native'
import { defaultStyle, checkStyle, hidden } from './style'
import { finalizeConfig, extractConfigAndImages } from './config'
import pick from 'lodash.pick'
import { id } from './util'

type ImageFilterProps<T> = ViewProps & {
  readonly config: T
  readonly onError?: (error: { message: string }) => void
}

const IFKImageFilter = requireNativeComponent<ImageFilterProps<string>>('IFKImageFilter')

const hideEveryTailChild = (child: React.ReactChild, index: number) => (
  index === 0 ? child : hidden(child as React.ReactElement<ViewProps>)
)

export const createImageFilter = (
  name: string,
  shape: object
): React.SFC<ImageFilterProps<object>> => (
  ({ style, onError, ...props }: ImageFilterProps<object>) => {
    const shapePropKeys = Object.keys(shape)
    const restPropKeys = Object.keys(props).filter(key => !shapePropKeys.includes(key))

    const { config, images } = extractConfigAndImages({
      type: { isImageFilter: true },
      name,
      ...(props.config || pick(props, shapePropKeys))
    })

    checkStyle(style)

    return (
      <IFKImageFilter
        style={[defaultStyle, style]}
        config={JSON.stringify(finalizeConfig(config))}
        onError={onError || id}
        {...pick(props, restPropKeys) as object}
      >
        {React.Children.map(images, hideEveryTailChild)}
      </IFKImageFilter>
    )
  }
)
