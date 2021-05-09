// tslint:disable:max-file-line-count
// tslint:disable:max-line-length

import {
  distance,
  position,
  scalar,
  scalarVector,
  offset,
  color,
  image,
  config,
  bool,
  text,
  area,
  ISOLatin1EncodedText,
  distanceVector,
  angle,
  transform,
  marker
} from '../common/inputs'
import {
  GeneratorIos as Generator,
  CommonIos as Common,
  CompositionBaseIos as CompositionBase
} from '../common/shapes'

const BackgroundImageComposition = {
  ...CompositionBase,
  inputBackgroundImage: image,
  inputBackgroundImageTransform: transform
}

const Tile = {
  inputAngle: angle,
  inputCenter: position,
  inputWidth: distance,
  ...Common
}

const Convolution = {
  inputWeights: scalarVector,
  inputBias: scalar,
  ...Common
}

const ColorPolynomial = {
  inputRedCoefficients: scalarVector,
  inputGreenCoefficients: scalarVector,
  inputBlueCoefficients: scalarVector,
  ...Common
}

const Perspective = {
  inputTopLeft: position,
  inputTopRight: position,
  inputBottomLeft: position,
  inputBottomRight: position,
  ...Common
}

const Area = {
  inputExtent: area,
  ...Common
}

export const shapes = {
  ImageFilter: {
    config: config
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBoxBlur
  IosCIBoxBlur: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDiscBlur
  IosCIDiscBlur: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGaussianBlur
  IosCIGaussianBlur: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMaskedVariableBlur
  IosCIMaskedVariableBlur: {
    ...CompositionBase,
    inputMask: image,
    inputMaskTransform: transform,
    inputRadius: distance
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMedianFilter
  IosCIMedianFilter: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMotionBlur
  IosCIMotionBlur: {
    inputRadius: distance,
    inputAngle: angle,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CINoiseReduction
  IosCINoiseReduction: {
    inputNoiseLevel: scalar,
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIZoomBlur
  IosCIZoomBlur: {
    inputCenter: position,
    inputAmount: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorClamp
  IosCIColorClamp: {
    inputMinComponents: scalarVector,
    inputMaxComponents: scalarVector,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorControls
  IosCIColorControls: {
    inputSaturation: scalar,
    inputBrightness: scalar,
    inputContrast: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorMatrix
  IosCIColorMatrix: {
    inputRVector: scalarVector,
    inputGVector: scalarVector,
    inputBVector: scalarVector,
    inputAVector: scalarVector,
    inputBiasVector: scalarVector,
    hasColorManagement: marker,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorPolynomial
  IosCIColorPolynomial: {
    inputAlphaCoefficients: scalarVector,
    ...ColorPolynomial
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIExposureAdjust
  IosCIExposureAdjust: {
    inputEV: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGammaAdjust
  IosCIGammaAdjust: {
    inputPower: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHueAdjust
  IosCIHueAdjust: {
    inputAngle: angle,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILinearToSRGBToneCurve
  IosCILinearToSRGBToneCurve: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISRGBToneCurveToLinear
  IosCISRGBToneCurveToLinear: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITemperatureAndTint
  IosCITemperatureAndTint: {
    inputNeutral: offset,
    inputTargetNeutral: offset,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIToneCurve
  IosCIToneCurve: {
    inputPoint0: offset,
    inputPoint1: offset,
    inputPoint2: offset,
    inputPoint3: offset,
    inputPoint4: offset,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIVibrance
  IosCIVibrance: {
    inputAmount: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIWhitePointAdjust
  IosCIWhitePointAdjust: {
    inputColor: color,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorCrossPolynomial,
  IosCIColorCrossPolynomial: ColorPolynomial,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorCube
  IosCIColorCube: {
    inputCubeDimension: scalar,
    inputCubeData: text,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorCubeWithColorSpace,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorInvert
  IosCIColorInvert: {
    hasColorManagement: marker,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorMap
  IosCIColorMap: {
    ...CompositionBase,
    inputGradientImage: image,
    inputGradientImageTransform: transform
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorMonochrome
  IosCIColorMonochrome: {
    inputColor: color,
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorPosterize
  IosCIColorPosterize: {
    inputLevels: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIFalseColor
  IosCIFalseColor: {
    inputColor0: color,
    inputColor1: color,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMaskToAlpha
  IosCIMaskToAlpha: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMaximumComponent
  IosCIMaximumComponent: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMinimumComponent
  IosCIMinimumComponent: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectChrome
  IosCIPhotoEffectChrome: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectFade
  IosCIPhotoEffectFade: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectInstant
  IosCIPhotoEffectInstant: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectMono
  IosCIPhotoEffectMono: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectNoir
  IosCIPhotoEffectNoir: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectProcess
  IosCIPhotoEffectProcess: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectTonal
  IosCIPhotoEffectTonal: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectTransfer
  IosCIPhotoEffectTransfer: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISepiaTone
  IosCISepiaTone: {
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIVignette
  IosCIVignette: {
    inputRadius: distance,
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIVignetteEffect
  IosCIVignetteEffect: {
    inputCenter: position,
    inputIntensity: scalar,
    inputRadius: distance,
    inputFalloff: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAdditionCompositing
  IosCIAdditionCompositing: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorBlendMode
  IosCIColorBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorBurnBlendMode
  IosCIColorBurnBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorDodgeBlendMode
  IosCIColorDodgeBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDarkenBlendMode
  IosCIDarkenBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDifferenceBlendMode
  IosCIDifferenceBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDivideBlendMode
  IosCIDivideBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIExclusionBlendMode
  IosCIExclusionBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHardLightBlendMode
  IosCIHardLightBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHueBlendMode
  IosCIHueBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILightenBlendMode
  IosCILightenBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILinearBurnBlendMode
  IosCILinearBurnBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILinearDodgeBlendMode
  IosCILinearDodgeBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILuminosityBlendMode
  IosCILuminosityBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMaximumCompositing
  IosCIMaximumCompositing: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMinimumCompositing
  IosCIMinimumCompositing: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMultiplyBlendMode
  IosCIMultiplyBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMultiplyCompositing
  IosCIMultiplyCompositing: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIOverlayBlendMode
  IosCIOverlayBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPinLightBlendMode
  IosCIPinLightBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISaturationBlendMode
  IosCISaturationBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIScreenBlendMode
  IosCIScreenBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISoftLightBlendMode
  IosCISoftLightBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISourceAtopCompositing
  IosCISourceAtopCompositing: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISourceInCompositing
  IosCISourceInCompositing: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISourceOutCompositing
  IosCISourceOutCompositing: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISourceOverCompositing
  IosCISourceOverCompositing: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISubtractBlendMode
  IosCISubtractBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBumpDistortion
  IosCIBumpDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputScale: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBumpDistortionLinear
  IosCIBumpDistortionLinear: {
    inputCenter: position,
    inputRadius: distance,
    inputScale: scalar,
    inputAngle: angle,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICircleSplashDistortion
  IosCICircleSplashDistortion: {
    inputCenter: position,
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICircularWrap
  IosCICircularWrap: {
    inputCenter: position,
    inputRadius: distance,
    inputAngle: angle,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDroste,
  IosCIDroste: {
    inputInsetPoint0: position,
    inputInsetPoint1: position,
    inputStrands: distance,
    inputPeriodicity: distance,
    inputRotation: distance,
    inputZoom: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDisplacementDistortion
  IosCIDisplacementDistortion: {
    ...CompositionBase,
    inputDisplacementImage: image,
    inputDisplacementImageTransform: transform,
    inputScale: distance
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGlassDistortion,
  IosCIGlassDistortion: {
    ...CompositionBase,
    inputTexture: image,
    inputTextureTransform: transform,
    inputScale: distance,
    inputCenter: position
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGlassLozenge,
  IosCIGlassLozenge: {
    inputPoint0: position,
    inputPoint1: position,
    inputRadius: distance,
    inputRefraction: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHoleDistortion
  IosCIHoleDistortion: {
    inputCenter: position,
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILightTunnel
  IosCILightTunnel: {
    inputCenter: position,
    inputRotation: angle,
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPinchDistortion
  IosCIPinchDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputScale: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIStretchCrop,
  IosCIStretchCrop: {
    inputSize: distanceVector,
    inputCropAmount: scalar,
    inputCenterStretchAmount: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITorusLensDistortion
  IosCITorusLensDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputWidth: distance,
    inputRefraction: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITwirlDistortion
  IosCITwirlDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputAngle: angle,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIVortexDistortion
  IosCIVortexDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputAngle: angle,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAztecCodeGenerator
  IosCIAztecCodeGenerator: {
    inputMessage: ISOLatin1EncodedText,
    inputCorrectionLevel: scalar,
    inputLayers: scalar,
    inputCompactStyle: bool,
    ...Generator
  },
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICheckerboardGenerator
  IosCICheckerboardGenerator: {
    inputCenter: position,
    inputColor0: color,
    inputColor1: color,
    inputWidth: distance,
    inputShaprness: scalar,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICode128BarcodeGenerator,
  // IosCICode128BarcodeGenerator: {
  //   inputMessage: text,
  //   inputQuietSpace: scalar,
  //   inputBarcodeHeight: distance,
  //   ...Generator
  // },
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConstantColorGenerator
  IosCIConstantColorGenerator: {
    inputColor: color,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILenticularHaloGenerator,
  IosCILenticularHaloGenerator: {
    inputCenter: position,
    inputColor: color,
    inputHaloRadius: distance,
    inputHaloWidth: distance,
    inputHaloOverlap: scalar,
    inputStriationStrength: scalar,
    inputStriationContrast: scalar,
    inputTime: scalar,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPDF417BarcodeGenerator,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIQRCodeGenerator
  IosCIQRCodeGenerator: {
    inputMessage: ISOLatin1EncodedText,
    inputCorrectionLevel: text,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIRandomGenerator
  IosCIRandomGenerator: Generator,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIStarShineGenerator
  IosCIStarShineGenerator: {
    inputCenter: position,
    inputColor: color,
    inputRadius: distance,
    inputCrossScale: scalar,
    inputCrossAngle: angle,
    inputCrossOpacity: scalar,
    inputCrossWidth: distance,
    inputEpsilon: scalar,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIStripesGenerator,
  IosCIStripesGenerator: {
    inputCenter: position,
    inputColor0: color,
    inputColor1: color,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISunbeamsGenerator,
  IosCISunbeamsGenerator: {
    inputCenter: position,
    inputColor: color,
    inputSunRadius: distance,
    inputMaxStriationRadius: scalar,
    inputStriationStrength: scalar,
    inputStriationContrast: scalar,
    inputTime: scalar,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAffineTransform,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICrop
  IosCICrop: {
    inputRectangle: area,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILanczosScaleTransform
  IosCILanczosScaleTransform: {
    inputScale: scalar,
    inputAspectRatio: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPerspectiveCorrection,
  IosCIPerspectiveCorrection: {
    inputCrop: bool,
    ...Perspective
  },
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPerspectiveTransform,
  IosCIPerspectiveTransform: Perspective,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPerspectiveTransformWithExtent,
  IosCIPerspectiveTransformWithExtent: {
    inputExtent: area,
    ...Perspective
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIStraightenFilter,
  IosCIStraightenFilter: {
    inputAngle: angle,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGaussianGradient
  IosCIGaussianGradient: {
    inputCenter: position,
    inputRadius: distance,
    inputColor0: color,
    inputColor1: color,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILinearGradient
  IosCILinearGradient: {
    inputPoint0: position,
    inputPoint1: position,
    inputColor0: color,
    inputColor1: color,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIRadialGradient
  IosCIRadialGradient: {
    inputCenter: position,
    inputRadius0: distance,
    inputRadius1: distance,
    inputColor0: color,
    inputColor1: color,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISmoothLinearGradient
  IosCISmoothLinearGradient: {
    inputPoint0: position,
    inputPoint1: position,
    inputColor0: color,
    inputColor1: color,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICircularScreen
  IosCICircularScreen: {
    inputCenter: position,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICMYKHalftone,
  IosCICMYKHalftone: {
    inputCenter: position,
    inputWidth: distance,
    inputAngle: angle,
    inputSharpness: scalar,
    inputGCR: scalar,
    inputUCR: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDotScreen
  IosCIDotScreen: {
    inputCenter: position,
    inputAngle: angle,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHatchedScreen
  IosCIHatchedScreen: {
    inputCenter: position,
    inputAngle: angle,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILineScreen
  IosCILineScreen: {
    inputCenter: position,
    inputAngle: angle,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaAverage,
  IosCIAreaAverage: Area,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaHistogram,
  IosCIAreaHistogram: {
    inputScale: scalar,
    inputCount: scalar,
    ...Area
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIRowAverage
  IosCIRowAverage: {
    inputExtent: area,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColumnAverage,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHistogramDisplayFilter
  IosCIHistogramDisplayFilter: {
    inputHeight: scalar,
    inputHighLimit: scalar,
    inputLowLimit: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaMaximum,
  IosCIAreaMaximum: Area,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaMinimum,
  IosCIAreaMinimum: Area,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaMaximumAlpha,
  IosCIAreaMaximumAlpha: Area,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaMinimumAlpha,
  IosCIAreaMinimumAlpha: Area,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISharpenLuminance
  IosCISharpenLuminance: {
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIUnsharpMask
  IosCIUnsharpMask: {
    inputRadius: distance,
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBlendWithAlphaMask,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBlendWithMask,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBloom
  IosCIBloom: {
    inputRadius: distance,
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIComicEffect
  IosCIComicEffect: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution3X3
  IosCIConvolution3X3: {
    hasColorManagement: marker,
    ...Convolution
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution5X5
  IosCIConvolution5X5: {
    hasColorManagement: marker,
    ...Convolution
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution7X7
  IosCIConvolution7X7: {
    hasColorManagement: marker,
    ...Convolution
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution9Horizontal,
  IosCIConvolution9Horizontal: {
    hasColorManagement: marker,
    ...Convolution
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution9Vertical,
  IosCIConvolution9Vertical: {
    hasColorManagement: marker,
    ...Convolution
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICrystallize
  IosCICrystallize: {
    inputRadius: distance,
    inputCenter: position,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDepthOfField,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIEdges
  IosCIEdges: {
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIEdgeWork
  IosCIEdgeWork: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGloom
  IosCIGloom: {
    inputRadius: distance,
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHeightFieldFromMask,
  IosCIHeightFieldFromMask: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHexagonalPixellate
  IosCIHexagonalPixellate: {
    inputCenter: position,
    inputScale: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHighlightShadowAdjust
  IosCIHighlightShadowAdjust: {
    inputHighlightAmount: scalar,
    inputShadowAmount: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILineOverlay
  IosCILineOverlay: {
    inputNRNoiseLevel: scalar,
    inputNRSharpness: scalar,
    inputEdgeIntensity: scalar,
    inputThreshold: scalar,
    inputContrast: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPixellate
  IosCIPixellate: {
    inputCenter: position,
    inputScale: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPointillize
  IosCIPointillize: {
    inputRadius: distance,
    inputCenter: position,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIShadedMaterial,
  IosCIShadedMaterial: {
    ...CompositionBase,
    inputShadingImage: image,
    inputShadingImageTransform: transform,
    inputScale: scalar
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISpotColor
  IosCISpotColor: {
    inputCenterColor1: color,
    inputReplacementColor1: color,
    inputCloseness1: scalar,
    inputContrast1: scalar,
    inputCenterColor2: color,
    inputReplacementColor2: color,
    inputCloseness2: scalar,
    inputContrast2: scalar,
    inputCenterColor3: color,
    inputReplacementColor3: color,
    inputCloseness3: scalar,
    inputContrast3: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISpotLight
  IosCISpotLight: {
    inputLightPosition: distanceVector,
    inputLightPointsAt: distanceVector,
    inputBrightness: scalar,
    inputConcentration: scalar,
    inputColor: color,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAffineClamp,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAffineTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIEightfoldReflectedTile,
  IosCIEightfoldReflectedTile: Tile,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIFourfoldReflectedTile,
  IosCIFourfoldReflectedTile: Tile,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIFourfoldRotatedTile,
  IosCIFourfoldRotatedTile: Tile,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIFourfoldTranslatedTile,
  IosCIFourfoldTranslatedTile: {
    inputAcuteAngle: angle,
    ...Tile
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGlideReflectedTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIKaleidoscope
  IosCIKaleidoscope: {
    inputCount: scalar,
    inputCenter: position,
    inputAngle: angle,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIOpTile
  IosCIOpTile: {
    inputScale: scalar,
    ...Tile
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIParallelogramTile,
  IosCIParallelogramTile: {
    inputAcuteAngle: angle,
    ...Tile
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPerspectiveTile,
  IosCIPerspectiveTile: Perspective,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISixfoldReflectedTile,
  IosCISixfoldReflectedTile: Tile,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISixfoldRotatedTile,
  IosCISixfoldRotatedTile: Tile,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITriangleKaleidoscope,
  IosCITriangleKaleidoscope: {
    inputPoint: position,
    inputSize: distance,
    inputRotation: angle,
    inputDecay: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITriangleTile,
  IosCITriangleTile: Tile,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITwelvefoldReflectedTile
  IosCITwelvefoldReflectedTile: Tile,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIXRay
  IosCIXRay: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIThermal
  IosCIThermal: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMorphologyGradient
  IosCIMorphologyGradient: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDisparityToDepth
  IosCIDisparityToDepth: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBokehBlur
  IosCIBokehBlur: {
    inputRadius: distance,
    inputRingAmount: scalar,
    inputRingSize: scalar,
    inputSoftness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISaliencyMapFilter
  IosCISaliencyMapFilter: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISampleNearest
  IosCISampleNearest: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMix
  IosCIMix: {
    inputAmount: scalar,
    ...BackgroundImageComposition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDepthToDisparity
  IosCIDepthToDisparity: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITextImageGenerator
  IosCITextImageGenerator: {
    inputText: text,
    inputFontName: text,
    inputFontSize: distance,
    inputScaleFactor: scalar,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHueSaturationValueGradient
  IosCIHueSaturationValueGradient: {
    inputValue: scalar,
    inputRadius: distance,
    inputSoftness: scalar,
    inputDither: scalar,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMorphologyMaximum
  IosCIMorphologyMaximum: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMorphologyMinimum
  IosCIMorphologyMinimum: {
    inputRadius: distance,
    ...Common
  },

  IosCINinePartStretched: {
    inputBreakpoint0: position,
    inputBreakpoint1: position,
    inputGrowAmount: position,
    ...Common
  },

  IosCIWrapMirror: Common,

  IosCIMirror: {
    inputPoint: position,
    inputAngle: angle,
    ...Common
  },

  IosCIAreaMinMaxRed: Area,

  IosCIAreaMinMax: Area,

  IosCICheatBlur: {
    inputAmount: distance,
    ...Common
  },

  IosCICheapMorphology: {
    inputRadius: distance,
    ...Common
  },

  IosCIMorphology: {
    inputRadius: distance,
    ...Common
  },

  IosCICheapBlur: {
    inputPasses: scalar,
    inputSampling: scalar,
    ...Common
  },

  IosCIDither: {
    inputIntensity: scalar,
    ...Common
  },

  IosCIVividLightBlendMode: {
    hasColorManagement: marker,
    ...BackgroundImageComposition
  },

  IosCISkyAndGrassAdjust: {
    inputSkyAmount: scalar,
    inputGrassAmount: scalar,
    ...Common
  },

  IosCIRingBlur: {
    inputRadius: distance,
    inputPointCount: scalar,
    ...Common
  },

  IosCIPremultiply: Common,

  IosCIPhotoGrain: {
    inputAmount: scalar,
    inputISO: scalar,
    inputSeed: scalar,
    ...Common
  },

  IosCIUnpremultiply: Common,

  IosCILocalContrast: {
    inputStrength: scalar,
    inputScale: scalar,
    ...Common
  },

  IosCILinearBlur: {
    inputRadius: distance,
    ...Common
  },

  IosCIGaussianBlurXY: {
    inputSigmaX: distance,
    inputSigmaY: distance,
    ...Common
  },

  IosCIDocumentEnhancer: {
    inputAmount: scalar,
    ...Common
  },

  IosCIClamp: {
    inputExtent: area,
    ...Common
  },

  IosCIASG50Percent: Common,

  IosCIASG60Percent: Common,

  IosCIASG66Percent: Common,

  IosCIASG75Percent: Common,

  IosCIASG80Percent: Common,

  IosCIPaperWash: {
    inputSaturation: scalar,
    inputGreyscale: scalar,
    ...Common
  }
}
