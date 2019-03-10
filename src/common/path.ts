// tslint:disable:max-line-length

type Distance = string | number

// https://developer.android.com/reference/android/graphics/Path#moveTo(float,%20float)
export const moveTo = (x: Distance, y: Distance) => ({
  moveTo: [`${x}`, `${y}`]
})

// https://developer.android.com/reference/android/graphics/Path#lineTo(float,%20float)
export const lineTo = (x: Distance, y: Distance) => ({
  lineTo: [`${x}`, `${y}`]
})

// https://developer.android.com/reference/android/graphics/Path#quadTo(float,%20float,%20float,%20float)
export const quadTo = (x1: Distance, y1: Distance, x2: Distance, y2: Distance) => ({
  quadTo: [`${x1}`, `${y1}`, `${x2}`, `${y2}`]
})

// https://developer.android.com/reference/android/graphics/Path#cubicTo(float,%20float,%20float,%20float,%20float,%20float)
export const cubicTo = (
  x1: Distance,
  y1: Distance,
  x2: Distance,
  y2: Distance,
  x3: Distance,
  y3: Distance
) => ({
  cubicTo: [`${x1}`, `${y1}`, `${x2}`, `${y2}`, `${x3}`, `${y3}`]
})

// https://developer.android.com/reference/android/graphics/Path#close()
export const closePath = () => ({
  closePath: []
})
