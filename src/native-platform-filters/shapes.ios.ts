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
  IosCIMedianFilter: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMotionBlur
  IosCIMotionBlur: {
    inputRadius: distance,
    inputAngle: scalar,
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
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorPolynomial
  IosCIColorPolynomial: {
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
    inputAngle: scalar,
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
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorCube
  IosCIColorCube: {
    inputCubeDimension: scalar,
    inputCubeData: text,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorCubeWithColorSpace,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorInvert
  IosCIColorInvert: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorMap
  IosCIColorMap: {
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
  IosCIAdditionCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorBlendMode
  IosCIColorBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorBurnBlendMode
  IosCIColorBurnBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIColorDodgeBlendMode
  IosCIColorDodgeBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDarkenBlendMode
  IosCIDarkenBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDifferenceBlendMode
  IosCIDifferenceBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDivideBlendMode
  IosCIDivideBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIExclusionBlendMode
  IosCIExclusionBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHardLightBlendMode
  IosCIHardLightBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHueBlendMode
  IosCIHueBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILightenBlendMode
  IosCILightenBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILinearBurnBlendMode
  IosCILinearBurnBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILinearDodgeBlendMode
  IosCILinearDodgeBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILuminosityBlendMode
  IosCILuminosityBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMaximumCompositing
  IosCIMaximumCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMinimumCompositing
  IosCIMinimumCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMultiplyBlendMode
  IosCIMultiplyBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIMultiplyCompositing
  IosCIMultiplyCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIOverlayBlendMode
  IosCIOverlayBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPinLightBlendMode
  IosCIPinLightBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISaturationBlendMode
  IosCISaturationBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIScreenBlendMode
  IosCIScreenBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISoftLightBlendMode
  IosCISoftLightBlendMode: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISourceAtopCompositing
  IosCISourceAtopCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISourceInCompositing
  IosCISourceInCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISourceOutCompositing
  IosCISourceOutCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISourceOverCompositing
  IosCISourceOverCompositing: Composition,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CISubtractBlendMode
  IosCISubtractBlendMode: Composition,

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
    inputAngle: scalar,
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
    inputAngle: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDroste,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDisplacementDistortion
  IosCIDisplacementDistortion: {
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
  IosCIHoleDistortion: {
    inputCenter: position,
    inputRadius: distance,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILightTunnel
  IosCILightTunnel: {
    inputCenter: position,
    inputRotation: scalar,
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
    inputAngle: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIVortexDistortion
  IosCIVortexDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputAngle: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAztecCodeGenerator
  IosCIAztecCodeGenerator: {
    inputMessage: ISOLatin1EncodedText,
    inputCorrectionLevel: scalar,
    inputLayers: scalar,
    inputCompactStyle: scalar,
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
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConstantColorGenerator
  IosCIConstantColorGenerator: {
    inputColor: color,
    ...Generator
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILenticularHaloGenerator,
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
  IosCICrop: {
    inputRectangle: area,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILanczosScaleTransform,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPerspectiveCorrection,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPerspectiveTransform,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPerspectiveTransformWithExtent,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIStraightenFilter,
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
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDotScreen
  IosCIDotScreen: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHatchedScreen
  IosCIHatchedScreen: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CILineScreen
  IosCILineScreen: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaAverage,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaHistogram,
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
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaMinimum,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaMaximumAlpha,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIAreaMinimumAlpha,
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
    inputWeights: scalarVector,
    inputBias: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution5X5
  IosCIConvolution5X5: {
    inputWeights: scalarVector,
    inputBias: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution7X7
  IosCIConvolution7X7: {
    inputWeights: scalarVector,
    inputBias: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution9Horizontal,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution9Vertical,
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
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIFourfoldReflectedTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIFourfoldRotatedTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIFourfoldTranslatedTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIGlideReflectedTile,
  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIKaleidoscope
  IosCIKaleidoscope: {
    inputCount: scalar,
    inputCenter: position,
    inputAngle: scalar,
    ...Common
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIOpTile
  IosCIOpTile: {
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
  IosCITwelvefoldReflectedTile: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: scalar,
    ...Common
  },

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
    ...Composition
  },

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDepthToDisparity
  IosCIDepthToDisparity: Common,

  // https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIHeightFieldFromMask
  IosCIHeightFieldFromMask: {
    inputRadius: distance,
    ...Common
  },

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
  }
}
