import { Image } from 'react-native';
import { Matrix } from 'rn-color-matrices';

export interface Config {
  readonly name: string
}

export interface FilterConfig {
  readonly image: Image
  readonly disableCache?: boolean
}

export interface AmountFilterConfig extends FilterConfig {
  readonly amount?: number
}

export interface MatrixFilterConfig extends FilterConfig {
  readonly matrix: number[]
}
