import { Platform } from 'react-native'
import { shapes } from '../native-platform-filters/shapes'

type InputImageNames =
  | 'srcImage'
  | 'dstImage'
  | 'inputImage'
  | 'inputGradientImage'
  | 'inputBackgroundImage'
  | 'inputMask'
  | 'inputTargetImage'
  | 'inputDisplacementImage'
  | 'inputTexture'
  | 'inputShadingImage'

type OutputImageNames = 'srcImage' | 'dstImage'

const srcImage: OutputImageNames = 'srcImage'
const dstImage: OutputImageNames = 'dstImage'

const toBackground = {
  inputImage: srcImage,
  inputBackgroundImage: dstImage
}

type InputShapes = keyof typeof shapes

type ConvertMap = { [P in InputShapes]?: { [T in InputImageNames]?: OutputImageNames } }

const convertMap = Platform.select<ConvertMap>({
  android: {},

  ios: {
    IosCIMaskedVariableBlur: {
      inputImage: srcImage,
      inputMask: dstImage
    },
    IosCIDisplacementDistortion: {
      inputImage: srcImage,
      inputDisplacementImage: dstImage
    },
    IosCIColorMap: {
      inputImage: srcImage,
      inputGradientImage: dstImage
    },
    IosCIGlassDistortion: {
      inputImage: srcImage,
      inputTexture: dstImage
    },
    IosCIShadedMaterial: {
      inputImage: srcImage,
      inputShadingImage: dstImage
    },
    IosCIMix: toBackground,
    IosCIAdditionCompositing: toBackground,
    IosCIColorBlendMode: toBackground,
    IosCIColorBurnBlendMode: toBackground,
    IosCIColorDodgeBlendMode: toBackground,
    IosCIDarkenBlendMode: toBackground,
    IosCIDifferenceBlendMode: toBackground,
    IosCIDivideBlendMode: toBackground,
    IosCIExclusionBlendMode: toBackground,
    IosCIHardLightBlendMode: toBackground,
    IosCIHueBlendMode: toBackground,
    IosCILightenBlendMode: toBackground,
    IosCILinearBurnBlendMode: toBackground,
    IosCILinearDodgeBlendMode: toBackground,
    IosCILuminosityBlendMode: toBackground,
    IosCIMaximumCompositing: toBackground,
    IosCIMinimumCompositing: toBackground,
    IosCIMultiplyBlendMode: toBackground,
    IosCIMultiplyCompositing: toBackground,
    IosCIOverlayBlendMode: toBackground,
    IosCIPinLightBlendMode: toBackground,
    IosCISaturationBlendMode: toBackground,
    IosCIScreenBlendMode: toBackground,
    IosCISoftLightBlendMode: toBackground,
    IosCISourceAtopCompositing: toBackground,
    IosCISourceInCompositing: toBackground,
    IosCISourceOutCompositing: toBackground,
    IosCISourceOverCompositing: toBackground,
    IosCISubtractBlendMode: toBackground
  },

  default: {}
})

export const convertImageName = (filterName: string, normalImageName: InputImageNames) =>
  convertMap[filterName as InputShapes]?.[normalImageName] ?? normalImageName
