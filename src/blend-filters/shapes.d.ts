import { shapes as shapesAndroid } from './shapes.android'
import { shapes as shapesIos } from './shapes.ios'

declare const shapes: typeof shapesAndroid & typeof shapesIos
