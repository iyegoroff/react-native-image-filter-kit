import invariant from 'ts-tiny-invariant'
import { Config } from './configs'
import { ShapeRegistry } from './shape-registry'

const srcImageNames = ['srcImage', 'inputImage']
const dstImageNames = [
  'dstImage',
  'inputBackgroundImage',
  'inputMask',
  'inputGradientImage',
  'inputTargetImage',
  'inputDisplacementImage',
  'inputTexture',
  'inputShadingImage'
]

export const swapComposition = (config: Config, resizeCanvasTo: string) => {
  const shape = ShapeRegistry.shape(config.name)
  const dstImage = Object.keys(shape).find((key) => dstImageNames.some((name) => name === key))
  const srcImage = Object.keys(shape).find((key) => srcImageNames.some((name) => name === key))

  invariant(srcImage !== undefined, `ImageFilterKit: can't find srcImage in ${config.name} shape.`)
  invariant(dstImage !== undefined, `ImageFilterKit: can't find dstImage in ${config.name} shape.`)

  if (dstImage && srcImage) {
    const dst = dstImage.replace('dstImage', 'dst')
    const src = srcImage.replace('srcImage', 'src')

    return {
      ...config,
      [dstImage]: config[srcImage],
      [srcImage]: config[dstImage],
      [dst + 'Transform']: config[src + 'Transform'],
      [src + 'Transform']: config[dst + 'Transform'],
      resizeCanvasTo,
      swapImages: true
    }
  }

  return config
}
