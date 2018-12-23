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

type OutputImageNames =
  | 'srcImage'
  | 'dstImage'

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
    CIMaskedVariableBlur: {
      inputImage: srcImage,
      inputMask: dstImage
    },
    CIDisplacementDistortion: {
      inputImage: srcImage,
      inputDisplacementImage: dstImage
    },
    CIColorMap: {
      inputImage: srcImage,
      inputGradientImage: dstImage
    },
    CIMix: toBackground,
    CIAdditionCompositing: toBackground,
    CIColorBlendMode: toBackground,
    CIColorBurnBlendMode: toBackground,
    CIColorDodgeBlendMode: toBackground,
    CIDarkenBlendMode: toBackground,
    CIDifferenceBlendMode: toBackground,
    CIDivideBlendMode: toBackground,
    CIExclusionBlendMode: toBackground,
    CIHardLightBlendMode: toBackground,
    CIHueBlendMode: toBackground,
    CILightenBlendMode: toBackground,
    CILinearBurnBlendMode: toBackground,
    CILinearDodgeBlendMode: toBackground,
    CILuminosityBlendMode: toBackground,
    CIMaximumCompositing: toBackground,
    CIMinimumCompositing: toBackground,
    CIMultiplyBlendMode: toBackground,
    CIMultiplyCompositing: toBackground,
    CIOverlayBlendMode: toBackground,
    CIPinLightBlendMode: toBackground,
    CISaturationBlendMode: toBackground,
    CIScreenBlendMode: toBackground,
    CISoftLightBlendMode: toBackground,
    CISourceAtopCompositing: toBackground,
    CISourceInCompositing: toBackground,
    CISourceOutCompositing: toBackground,
    CISourceOverCompositing: toBackground,
    CISubtractBlendMode: toBackground
  }
})

export const convertImageName = (
  filterName: string,
  normalImageName: InputImageNames
) => (
  convertMap[filterName as InputShapes] && convertMap[filterName as InputShapes]![normalImageName]
    || normalImageName
)
