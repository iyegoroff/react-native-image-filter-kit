export const id = <T>(x: T) => x

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

const unitPattern = () => /(\d+)(h|w|min|max)/

export const isUnit = (unit: string | number) => unitPattern().test(`${unit}`)

export const degToRad = (deg: number) => (Math.PI * deg) / 180
