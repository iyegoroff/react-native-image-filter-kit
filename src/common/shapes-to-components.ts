import React from 'react'
import { createImageFilter } from './image-filter'
import { ViewProps } from 'react-native'

export default (shapes: { [key: string]: object }) =>
  Object.keys(shapes).reduce<{ [key: string]: React.SFC<ViewProps & { config: object }> }>(
    (acc, name) => {
      const component = createImageFilter(name, shapes[name]) as React.SFC<
        ViewProps & { config: object }
      > & { isImageFilter: boolean }
      component.displayName = name
      component.isImageFilter = true

      acc[name] = component

      return acc
    },
    {}
  )
