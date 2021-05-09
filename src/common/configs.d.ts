import { Image } from 'react-native'
import { Matrix } from 'rn-color-matrices'

export type Config = {
  readonly name: string
  [key: string]: any
}

export type FilterConfig = {
  readonly image: Image
  readonly disableCache?: boolean
}

export type AmountFilterConfig = {
  readonly amount?: number
} & FilterConfig

export type MatrixFilterConfig = {
  readonly matrix: number[]
} & FilterConfig

export type Position = {
  readonly x: string | number
  readonly y: string | number
}

export type MixStep = 'CLAMP' | 'SMOOTH'
