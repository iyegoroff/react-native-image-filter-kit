import { Platform } from 'react-native'
import invariant from 'invariant'
import { id } from './util'
import { Input } from './inputs'

export interface Shape {
  readonly name: string
  [input: string]: Input | string
}

export class ShapeRegistry {
  private static shapes: { [key: string]: Shape } = {}
  private static transforms: { [key: string]: Function } = {}

  public static addShapes = (shapes: object) => {
    const keys = Object.keys(ShapeRegistry.shapes)
    const intersection = Object.keys(shapes).filter(k => keys.includes(k))
    invariant(
      intersection.length === 0,
      `ImageFilterKit: Attempt to add already registered shape(s) - ${intersection.join()}.`
    )

    ShapeRegistry.shapes = {
      ...ShapeRegistry.shapes,
      ...shapes
    }
  }

  public static addTransforms = (transforms: object) => {
    const keys = Object.keys(ShapeRegistry.transforms)
    const intersection = Object.keys(transforms).filter(k => keys.includes(k))
    invariant(
      intersection.length === 0,
      `ImageFilterKit: Attempt to add already registered transform(s) - ${intersection.join()}.`
    )

    ShapeRegistry.transforms = {
      ...ShapeRegistry.transforms,
      ...transforms
    }
  }

  public static shape = (name: string) => {
    const shape = ShapeRegistry.shapes[name]

    invariant(shape, `ImageFilterKit: '${name}' shape doesn't exist on ${Platform.OS}.`)

    return shape
  }

  public static transform = (name: string) => (
    ShapeRegistry.transforms[name] || id
  )
}
