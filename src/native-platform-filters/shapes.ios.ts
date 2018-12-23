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
  resizeMode,
  text,
  area,
  ISOLatin1EncodedText,
  distanceVector
} from '../common/inputs'
import {
  GeneratorIos as Generator,
  CommonIos as Common,
  CompositionIos as Composition
} from '../common/shapes'

export const shapes = {
  ImageFilter: {
    config: config
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBoxBlur
  CIBoxBlur: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDiscBlur
  CIDiscBlur: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGaussianBlur
  CIGaussianBlur: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMaskedVariableBlur
  CIMaskedVariableBlur: {
    resizeCanvasTo: text,
    inputImage: image,
    inputImageResizeMode: resizeMode,
    inputImageAnchor: offset,
    inputImagePosition: offset,
    inputMask: image,
    inputMaskResizeMode: resizeMode,
    inputMaskAnchor: offset,
    inputMaskPosition: offset,
    clampToExtent: bool,
    disableCache: bool,
    swapImages: bool,
    inputRadius: distance
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMedianFilter
  CIMedianFilter: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMotionBlur
  CIMotionBlur: {
    inputRadius: distance,
    inputAngle: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CINoiseReduction
  CINoiseReduction: {
    inputNoiseLevel: scalar,
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIZoomBlur
  CIZoomBlur: {
    inputCenter: position,
    inputAmount: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorClamp
  CIColorClamp: {
    inputMinComponents: scalarVector,
    inputMaxComponents: scalarVector,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorControls
  CIColorControls: {
    inputSaturation: scalar,
    inputBrightness: scalar,
    inputContrast: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorMatrix
  CIColorMatrix: {
    inputRVector: scalarVector,
    inputGVector: scalarVector,
    inputBVector: scalarVector,
    inputAVector: scalarVector,
    inputBiasVector: scalarVector,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorPolynomial
  CIColorPolynomial: {
    // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/inputRedCoefficients
    inputRedCoefficients: scalarVector,
    // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/inputGreenCoefficients
    inputGreenCoefficients: scalarVector,
    // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/inputBlueCoefficients
    inputBlueCoefficients: scalarVector,
    // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/inputAlphaCoefficients
    inputAlphaCoefficients: scalarVector,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIExposureAdjust
  CIExposureAdjust: {
    inputEV: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGammaAdjust
  CIGammaAdjust: {
    inputPower: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHueAdjust
  CIHueAdjust: {
    inputAngle: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILinearToSRGBToneCurve
  CILinearToSRGBToneCurve: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISRGBToneCurveToLinear
  CISRGBToneCurveToLinear: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITemperatureAndTint
  CITemperatureAndTint: {
    inputNeutral: offset,
    inputTargetNeutral: offset,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIToneCurve
  CIToneCurve: {
    inputPoint0: offset,
    inputPoint1: offset,
    inputPoint2: offset,
    inputPoint3: offset,
    inputPoint4: offset,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIVibrance
  CIVibrance: {
    inputAmount: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIWhitePointAdjust
  CIWhitePointAdjust: {
    inputColor: color,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorCrossPolynomial,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorCube
  CIColorCube: {
    inputCubeDimension: scalar,
    inputCubeData: text,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorCubeWithColorSpace,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorInvert
  CIColorInvert: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorMap
  CIColorMap: {
    resizeCanvasTo: text,
    inputImage: image,
    inputImageResizeMode: resizeMode,
    inputImageAnchor: offset,
    inputImagePosition: offset,
    inputGradientImage: image,
    inputGradientImageResizeMode: resizeMode,
    inputGradientImageAnchor: offset,
    inputGradientImagePosition: offset,
    clampToExtent: bool,
    disableCache: bool,
    swapImages: bool
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorMonochrome
  CIColorMonochrome: {
    inputColor: color,
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorPosterize
  CIColorPosterize: {
    inputLevels: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIFalseColor
  CIFalseColor: {
    inputColor0: color,
    inputColor1: color,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMaskToAlpha
  CIMaskToAlpha: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMaximumComponent
  CIMaximumComponent: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMinimumComponent
  CIMinimumComponent: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectChrome
  CIPhotoEffectChrome: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectFade
  CIPhotoEffectFade: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectInstant
  CIPhotoEffectInstant: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectMono
  CIPhotoEffectMono: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectNoir
  CIPhotoEffectNoir: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectProcess
  CIPhotoEffectProcess: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectTonal
  CIPhotoEffectTonal: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPhotoEffectTransfer
  CIPhotoEffectTransfer: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISepiaTone
  CISepiaTone: {
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIVignette
  CIVignette: {
    inputRadius: distance,
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIVignetteEffect
  CIVignetteEffect: {
    inputCenter: position,
    inputIntensity: scalar,
    inputRadius: distance,
    inputFalloff: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAdditionCompositing
  CIAdditionCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorBlendMode
  CIColorBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorBurnBlendMode
  CIColorBurnBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorDodgeBlendMode
  CIColorDodgeBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDarkenBlendMode
  CIDarkenBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDifferenceBlendMode
  CIDifferenceBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDivideBlendMode
  CIDivideBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIExclusionBlendMode
  CIExclusionBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHardLightBlendMode
  CIHardLightBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHueBlendMode
  CIHueBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILightenBlendMode
  CILightenBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILinearBurnBlendMode
  CILinearBurnBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILinearDodgeBlendMode
  CILinearDodgeBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILuminosityBlendMode
  CILuminosityBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMaximumCompositing
  CIMaximumCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMinimumCompositing
  CIMinimumCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMultiplyBlendMode
  CIMultiplyBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMultiplyCompositing
  CIMultiplyCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIOverlayBlendMode
  CIOverlayBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPinLightBlendMode
  CIPinLightBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISaturationBlendMode
  CISaturationBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIScreenBlendMode
  CIScreenBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISoftLightBlendMode
  CISoftLightBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISourceAtopCompositing
  CISourceAtopCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISourceInCompositing
  CISourceInCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISourceOutCompositing
  CISourceOutCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISourceOverCompositing
  CISourceOverCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISubtractBlendMode
  CISubtractBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBumpDistortion
  CIBumpDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputScale: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBumpDistortionLinear
  CIBumpDistortionLinear: {
    inputCenter: position,
    inputRadius: distance,
    inputScale: scalar,
    inputAngle: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICircleSplashDistortion
  CICircleSplashDistortion: {
    inputCenter: position,
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICircularWrap
  CICircularWrap: {
    inputCenter: position,
    inputRadius: distance,
    inputAngle: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDroste,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDisplacementDistortion
  CIDisplacementDistortion: {
    resizeCanvasTo: text,
    inputImage: image,
    inputImageResizeMode: resizeMode,
    inputImageAnchor: offset,
    inputImagePosition: offset,
    inputDisplacementImage: image,
    inputDisplacementImageResizeMode: resizeMode,
    inputDisplacementImageAnchor: offset,
    inputDisplacementImagePosition: offset,
    clampToExtent: bool,
    disableCache: bool,
    swapImages: bool,
    inputScale: distance
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGlassDistortion,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGlassLozenge,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHoleDistortion
  CIHoleDistortion: {
    inputCenter: position,
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILightTunnel
  CILightTunnel: {
    inputCenter: position,
    inputRotation: scalar,
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPinchDistortion
  CIPinchDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputScale: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIStretchCrop,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITorusLensDistortion
  CITorusLensDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputWidth: distance,
    inputRefraction: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITwirlDistortion
  CITwirlDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputAngle: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIVortexDistortion
  CIVortexDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputAngle: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAztecCodeGenerator
  CIAztecCodeGenerator: {
    inputMessage: ISOLatin1EncodedText,
    inputCorrectionLevel: scalar,
    inputLayers: scalar,
    inputCompactStyle: scalar,
    ...Generator
  },
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICheckerboardGenerator
  CICheckerboardGenerator: {
    inputCenter: position,
    inputColor0: color,
    inputColor1: color,
    inputWidth: distance,
    inputShaprness: scalar,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICode128BarcodeGenerator,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConstantColorGenerator
  CIConstantColorGenerator: {
    inputColor: color,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILenticularHaloGenerator,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPDF417BarcodeGenerator,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIQRCodeGenerator
  CIQRCodeGenerator: {
    inputMessage: ISOLatin1EncodedText,
    inputCorrectionLevel: text,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIRandomGenerator
  CIRandomGenerator: Generator,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIStarShineGenerator
  CIStarShineGenerator: {
    inputCenter: position,
    inputColor: color,
    inputRadius: distance,
    inputCrossScale: scalar,
    inputCrossAngle: scalar,
    // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/inputCrossOpacity
    inputCrossOpacity: scalar,
    inputCrossWidth: distance,
    inputEpsilon: scalar,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIStripesGenerator,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISunbeamsGenerator,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAffineTransform,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICrop
  CICrop: {
    inputRectangle: area,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILanczosScaleTransform,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPerspectiveCorrection,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPerspectiveTransform,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPerspectiveTransformWithExtent,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIStraightenFilter,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGaussianGradient
  CIGaussianGradient: {
    inputCenter: position,
    inputRadius: distance,
    inputColor0: color,
    inputColor1: color,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILinearGradient
  CILinearGradient: {
    inputPoint0: position,
    inputPoint1: position,
    inputColor0: color,
    inputColor1: color,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIRadialGradient
  CIRadialGradient: {
    inputCenter: position,
    inputRadius0: distance,
    inputRadius1: distance,
    inputColor0: color,
    inputColor1: color,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISmoothLinearGradient
  CISmoothLinearGradient: {
    inputPoint0: position,
    inputPoint1: position,
    inputColor0: color,
    inputColor1: color,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICircularScreen
  CICircularScreen: {
    inputCenter: position,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICMYKHalftone,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDotScreen
  CIDotScreen: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHatchedScreen
  CIHatchedScreen: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILineScreen
  CILineScreen: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaAverage,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaHistogram,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIRowAverage
  CIRowAverage: {
    inputExtent: area,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColumnAverage,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHistogramDisplayFilter
  CIHistogramDisplayFilter: {
    inputHeight: scalar,
    inputHighLimit: scalar,
    inputLowLimit: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaMaximum,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaMinimum,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaMaximumAlpha,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaMinimumAlpha,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISharpenLuminance
  CISharpenLuminance: {
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIUnsharpMask
  CIUnsharpMask: {
    inputRadius: distance,
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBlendWithAlphaMask,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBlendWithMask,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBloom
  CIBloom: {
    inputRadius: distance,
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIComicEffect
  CIComicEffect: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution3X3
  CIConvolution3X3: {
    inputWeights: scalarVector,
    inputBias: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution5X5
  CIConvolution5X5: {
    inputWeights: scalarVector,
    inputBias: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution7X7
  CIConvolution7X7: {
    inputWeights: scalarVector,
    inputBias: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution9Horizontal,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution9Vertical,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CICrystallize
  CICrystallize: {
    inputRadius: distance,
    inputCenter: position,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDepthOfField,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIEdges
  CIEdges: {
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIEdgeWork
  CIEdgeWork: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGloom
  CIGloom: {
    inputRadius: distance,
    inputIntensity: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHeightFieldFromMask,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHexagonalPixellate
  CIHexagonalPixellate: {
    inputCenter: position,
    inputScale: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHighlightShadowAdjust
  CIHighlightShadowAdjust: {
    inputHighlightAmount: scalar,
    inputShadowAmount: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILineOverlay
  CILineOverlay: {
    inputNRNoiseLevel: scalar,
    inputNRSharpness: scalar,
    inputEdgeIntensity: scalar,
    inputThreshold: scalar,
    inputContrast: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPixellate
  CIPixellate: {
    inputCenter: position,
    inputScale: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPointillize
  CIPointillize: {
    inputRadius: distance,
    inputCenter: position,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIShadedMaterial,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISpotColor
  CISpotColor: {
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
  CISpotLight: {
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
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIFourfoldReflectedTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIFourfoldRotatedTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIFourfoldTranslatedTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGlideReflectedTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIKaleidoscope
  CIKaleidoscope: {
    inputCount: scalar,
    inputCenter: position,
    inputAngle: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIOpTile
  CIOpTile: {
    inputScale: scalar,
    inputAngle: scalar,
    inputCenter: position,
    inputWidth: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIParallelogramTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPerspectiveTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISixfoldReflectedTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISixfoldRotatedTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITriangleKaleidoscope,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITriangleTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITwelvefoldReflectedTile
  CITwelvefoldReflectedTile: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIXRay
  CIXRay: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIThermal
  CIThermal: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMorphologyGradient
  CIMorphologyGradient: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDisparityToDepth
  CIDisparityToDepth: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIBokehBlur
  CIBokehBlur: {
    inputRadius: distance,
    inputRingAmount: scalar,
    inputRingSize: scalar,
    inputSoftness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISaliencyMapFilter
  CISaliencyMapFilter: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISampleNearest
  CISampleNearest: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMix
  CIMix: {
    inputAmount: scalar,
    ...Composition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDepthToDisparity
  CIDepthToDisparity: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHeightFieldFromMask
  CIHeightFieldFromMask: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CITextImageGenerator
  CITextImageGenerator: {
    inputText: text,
    inputFontName: text,
    inputFontSize: distance,
    inputScaleFactor: scalar,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHueSaturationValueGradient
  CIHueSaturationValueGradient: {
    inputValue: scalar,
    inputRadius: distance,
    inputSoftness: scalar,
    inputDither: scalar,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMorphologyMaximum
  CIMorphologyMaximum: {
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMorphologyMinimum
  CIMorphologyMinimum: {
    inputRadius: distance,
    ...Common
  }
}
