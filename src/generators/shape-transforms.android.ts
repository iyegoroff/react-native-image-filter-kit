import invariant from 'invariant'
import {
  LinearGradientGeneratorConfig,
  RadialGradientGeneratorConfig,
  SweepGradientGeneratorConfig
} from './shapes'
import { isUnit, unitSupplement } from '../common/util'

export const shapeTransforms = {
  ColorGenerator: (config: Object) => ({
    ...config,
    name: 'Color'
  }),

  LinearGradientGenerator: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    start = { x: 0, y: '0h' },
    end = { x: '100w', y: '0h' },
    ...config
  }: LinearGradientGeneratorConfig) => {
    invariant(
      isUnit(start.y) && isUnit(end.y),
      `ImageFilterKit: LinearGradientGenerator props 'start.y' and 'end.y' should have measure ` +
      `units.`
    )

    return {
      ...config,
      name: 'LinearGradient',
      colors,
      locations: stops,
      x0: start.x,
      y0: unitSupplement(start.y),
      x1: end.x,
      y1: unitSupplement(end.y)
    }
  },

  RadialGradientGenerator: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    radius = '50min',
    ...config
  }: RadialGradientGeneratorConfig) => {
    invariant(
      isUnit(center.y),
      `ImageFilterKit: RadialGradientGenerator props 'center.y' should have measure unit.`
    )

    return {
      ...config,
      name: 'RadialGradient',
      colors,
      stops,
      radius,
      centerX: center.x,
      centerY: unitSupplement(center.y)
    }
  },

  SweepGradientGenerator: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    ...config
  }: SweepGradientGeneratorConfig) => {
    invariant(
      isUnit(center.y),
      `ImageFilterKit: SweepGradientGenerator props 'center.y' should have measure unit.`
    )

    return {
      ...config,
      name: 'SweepGradient',
      colors: Array.from(colors).reverse(),
      positions: stops.map(stop => 1 - stop).reverse(),
      centerX: center.x,
      centerY: unitSupplement(center.y)
    }
  }
}
