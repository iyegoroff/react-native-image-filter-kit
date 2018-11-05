import { shapeTransforms as shapeTransformsAndroid } from './shape-transforms.android'
import { shapeTransforms as shapeTransformsIos } from './shape-transforms.android'

declare const shapeTransforms: typeof shapeTransformsAndroid & typeof shapeTransformsIos
