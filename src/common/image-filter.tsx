import React from 'react'
import { requireNativeComponent, ViewProps } from 'react-native'
import { defaultStyle, checkStyle, hidden } from './style'
import { finalizeConfig, extractConfigAndImages } from './config'
import pick from 'lodash.pick'

const IFKImageFilter = requireNativeComponent<ViewProps & { config: string }>('IFKImageFilter')

const hideEveryTailChild = (child: React.ReactChild, index: number) => (
  index === 0 ? child : hidden(child as React.ReactElement<ViewProps>)
)

export const createImageFilter = (
  name: string,
  shape: object
): React.SFC<ViewProps & { config: object }> => (
  ({ style, ...props }: ViewProps & { config: object }) => {
    const shapePropKeys = Object.keys(shape)
    const restPropKeys = Object.keys(props).filter(key => !shapePropKeys.includes(key))

    const { config, images } = extractConfigAndImages({
      type: { isImageFilter: true },
      name,
      ...(props.config || pick(props, shapePropKeys))
    })

    checkStyle(style)

    console.log('IFK: ' + JSON.stringify(finalizeConfig(config)))

    return (
      <IFKImageFilter
        style={[defaultStyle, style]}
        config={JSON.stringify(finalizeConfig(config))}
        {...pick(props, restPropKeys) as object}
      >
        {React.Children.map(images, hideEveryTailChild)}
      </IFKImageFilter>
    )
  }
)
