import invariant from 'invariant'
import { LinearGradientConfig, RadialGradientConfig, SweepGradientConfig } from './shapes'
import { isUnit, unitSupplement } from '../common/util'

export const shapeTransforms = {
  Color: (config: Object) => ({
    ...config,
    name: 'AndroidColor'
  }),

  LinearGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    start = { x: 0, y: '0h' },
    end = { x: '100w', y: '0h' },
    ...config
  }: LinearGradientConfig) => {
    invariant(
      isUnit(start.y) && isUnit(end.y),
      `ImageFilterKit: LinearGradient props 'start.y' and 'end.y' should have measure ` +
      `units.`
    )

    return {
      ...config,
      name: 'AndroidLinearGradient',
      colors,
      locations: stops,
      x0: start.x,
      y0: unitSupplement(start.y),
      x1: end.x,
      y1: unitSupplement(end.y)
    }
  },

  RadialGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    radius = '50min',
    ...config
  }: RadialGradientConfig) => {
    invariant(
      isUnit(center.y),
      `ImageFilterKit: RadialGradient props 'center.y' should have measure unit.`
    )

    return {
      ...config,
      name: 'AndroidRadialGradient',
      colors,
      stops,
      radius,
      centerX: center.x,
      centerY: unitSupplement(center.y)
    }
  },

  SweepGradient: ({
    colors = ['red', 'blue'],
    stops = [0, 1],
    center = { x: '50w', y: '50h' },
    ...config
  }: SweepGradientConfig) => {
    invariant(
      isUnit(center.y),
      `ImageFilterKit: SweepGradient props 'center.y' should have measure unit.`
    )

    return {
      ...config,
      name: 'AndroidSweepGradient',
      colors: Array.from(colors).reverse(),
      positions: stops.map(stop => 1 - stop).reverse(),
      centerX: center.x,
      centerY: unitSupplement(center.y)
    }
  }
}
