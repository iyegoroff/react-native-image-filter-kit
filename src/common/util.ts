export const id = <T>(x: T) => x

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

const unitPattern = () => /(\d+)(h|w|min|max)/

export const isUnit = (unit: string | number) => unitPattern().test(`${unit}`)

export const unitSupplement = (unit: string | number) => {
  const [, amount, measure] = `${unit}`.match(unitPattern()) || [void 0, void 0, void 0]

  return amount !== undefined && measure !== undefined ? `${100 - +amount}${measure}` : unit
}
