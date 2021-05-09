import React from 'react'
import { requireNativeComponent, ViewProps, NativeSyntheticEvent } from 'react-native'
import { defaultStyle, checkStyle, hidden } from './style'
import { finalizeConfig, extractConfigAndImages } from './config'
import pick from 'lodash.pick'
import { id } from './util'

type NativeProps = ViewProps & {
  readonly config: string
  readonly onIFKFilteringError?: (event: NativeSyntheticEvent<{ message: string }>) => void
  readonly onIFKFilteringStart?: (event: NativeSyntheticEvent<{}>) => void
  readonly onIFKFilteringFinish?: (event: NativeSyntheticEvent<{}>) => void
  readonly onIFKExtractImage?: (event: NativeSyntheticEvent<{ uri: string }>) => void
}

type Props = ViewProps & {
  readonly config: object
  readonly onFilteringError?: NativeProps['onIFKFilteringError']
  readonly onFilteringStart?: NativeProps['onIFKFilteringStart']
  readonly onFilteringFinish?: NativeProps['onIFKFilteringFinish']
  readonly onExtractImage?: NativeProps['onIFKExtractImage']
}

const IFKImageFilter = requireNativeComponent<NativeProps>('IFKImageFilter')

const hideEveryTailChild = (child: React.ReactChild, index: number) =>
  index === 0 ? child : hidden(child as React.ReactElement<ViewProps>)

export const createImageFilter = (name: string, shape: object): React.FunctionComponent<Props> => ({
  style,
  onFilteringError,
  onFilteringStart,
  onFilteringFinish,
  onExtractImage,
  ...props
}: Props) => {
  const shapePropKeys = Object.keys(shape)
  const restPropKeys = Object.keys(props).filter((key) => !shapePropKeys.includes(key))

  const { config, images } = extractConfigAndImages({
    type: { isImageFilter: true },
    name,
    ...(props.config || pick(props, shapePropKeys))
  })

  checkStyle(style)

  return (
    <IFKImageFilter
      style={[defaultStyle, style]}
      config={JSON.stringify(finalizeConfig(config, images))}
      onIFKFilteringError={onFilteringError ?? id}
      onIFKFilteringStart={onFilteringStart ?? id}
      onIFKFilteringFinish={onFilteringFinish ?? id}
      onIFKExtractImage={onExtractImage ?? id}
      {...(pick(props, restPropKeys) as object)}
    >
      {React.Children.map(images, hideEveryTailChild)}
    </IFKImageFilter>
  )
}
