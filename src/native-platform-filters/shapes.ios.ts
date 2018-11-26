// tslint:disable:max-file-line-count

import {
  distance,
  position,
  scalar,
  scalarVector,
  offset,
  color,
  image,
  imageStyle,
  config,
  bool,
  scaleMode,
  gravityAxis,
  resizeMode
} from '../common/inputs'

const Blend = {
  scaleMode: scaleMode,
  inputImage: image,
  inputImageResizeMode: resizeMode,
  inputImageGravityAxis: gravityAxis,
  inputBackgroundImage: image,
  inputBackgroundImageResizeMode: resizeMode,
  inputBackgroundImageGravityAxis: gravityAxis,
  disableCache: bool
}

const Common = {
  inputImage: image,
  disableCache: bool
}

export const shapes = {
  ImageFilter: {
    config: config
  },

  CIBoxBlur: {
    inputRadius: distance,
    ...Common
  },

  CIDiscBlur: {
    inputRadius: distance,
    ...Common
  },

  CIGaussianBlur: {
    inputRadius: distance,
    ...Common
  },

  CIMaskedVariableBlur: {
    inputImage: image,
    inputMask: image,
    inputRadius: distance,
    disableCache: bool
  },

  CIMedianFilter: Common,

  CIMotionBlur: {
    inputRadius: distance,
    inputAngle: scalar,
    ...Common
  },

  CINoiseReduction: {
    inputNoiseLevel: scalar,
    inputSharpness: scalar,
    ...Common
  },

  CIZoomBlur: {
    inputCenter: position,
    inputAmount: distance,
    ...Common
  },

  CIColorClamp: {
    inputMinComponents: scalarVector,
    inputMaxComponents: scalarVector,
    ...Common
  },

  CIColorControls: {
    inputSaturation: scalar,
    inputBrightness: scalar,
    inputContrast: scalar,
    ...Common
  },

  CIColorMatrix: {
    inputRVector: scalarVector,
    inputGVector: scalarVector,
    inputBVector: scalarVector,
    inputAVector: scalarVector,
    inputBiasVector: scalarVector,
    ...Common
  },

  CIColorPolynomial: {
    inputRedCoefficients: scalarVector,
    inputGreenCoefficients: scalarVector,
    inputBlueCoefficients: scalarVector,
    inputAlphaCoefficients: scalarVector,
    ...Common
  },

  CIExposureAdjust: {
    inputEV: scalar,
    ...Common
  },

  CIGammaAdjust: {
    inputPower: scalar,
    ...Common
  },

  CIHueAdjust: {
    inputAngle: scalar,
    ...Common
  },

  CILinearToSRGBToneCurve: Common,

  CISRGBToneCurveToLinear: Common,

  CITemperatureAndTint: {
    inputNeutral: offset,
    inputTargetNeutral: offset,
    ...Common
  },

  CIToneCurve: {
    inputPoint0: offset,
    inputPoint1: offset,
    inputPoint2: offset,
    inputPoint3: offset,
    inputPoint4: offset,
    ...Common
  },

  CIVibrance: {
    inputAmount: scalar,
    ...Common
  },

  // CIWhitePointAdjust,
  // CIColorCrossPolynomial,
  // CIColorCube,
  // CIColorCubeWithColorSpace,
  CIColorInvert: Common,

  // CIColorMap,
  CIColorMonochrome: {
    inputColor: color,
    inputIntensity: scalar,
    ...Common
  },

  CIColorPosterize: {
    inputLevels: scalar,
    ...Common
  },

  // CIFalseColor,
  CIMaskToAlpha: Common,

  CIMaximumComponent: Common,

  CIMinimumComponent: Common,

  CIPhotoEffectChrome: Common,

  CIPhotoEffectFade: Common,

  CIPhotoEffectInstant: Common,

  CIPhotoEffectMono: Common,

  CIPhotoEffectNoir: Common,

  CIPhotoEffectProcess: Common,

  CIPhotoEffectTonal: Common,

  CIPhotoEffectTransfer: Common,

  CISepiaTone: {
    inputIntensity: scalar,
    ...Common
  },

  CIVignette: {
    inputRadius: distance,
    inputIntensity: scalar,
    ...Common
  },

  CIVignetteEffect: {
    inputCenter: position,
    inputIntensity: scalar,
    inputRadius: distance,
    ...Common
  },

  CIAdditionCompositing: Blend,

  CIColorBlendMode: Blend,

  CIColorBurnBlendMode: Blend,

  CIColorDodgeBlendMode: Blend,

  CIDarkenBlendMode: Blend,

  CIDifferenceBlendMode: Blend,

  CIDivideBlendMode: Blend,

  CIExclusionBlendMode: Blend,

  CIHardLightBlendMode: Blend,

  CIHueBlendMode: Blend,

  CILightenBlendMode: Blend,

  CILinearBurnBlendMode: Blend,

  CILinearDodgeBlendMode: Blend,

  CILuminosityBlendMode: Blend,

  CIMaximumCompositing: Blend,

  CIMinimumCompositing: Blend,

  CIMultiplyBlendMode: Blend,

  CIMultiplyCompositing: Blend,

  CIOverlayBlendMode: Blend,

  CIPinLightBlendMode: Blend,

  CISaturationBlendMode: Blend,

  CIScreenBlendMode: Blend,

  CISoftLightBlendMode: Blend,

  CISourceAtopCompositing: Blend,

  CISourceInCompositing: Blend,

  CISourceOutCompositing: Blend,

  CISourceOverCompositing: Blend,

  CISubtractBlendMode: Blend,

  CIBumpDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputScale: scalar,
    ...Common
  },

  CIBumpDistortionLinear: {
    inputCenter: position,
    inputRadius: distance,
    inputScale: scalar,
    inputAngle: scalar,
    ...Common
  },

  CICircleSplashDistortion: {
    inputCenter: position,
    inputRadius: distance,
    ...Common
  },

  CICircularWrap: {
    inputCenter: position,
    inputRadius: distance,
    inputAngle: scalar,
    ...Common
  },

  // CIDroste,
  // CIDisplacementDistortion,
  // CIGlassDistortion,
  // CIGlassLozenge,
  // CIHoleDistortion,
  CILightTunnel: {
    inputCenter: position,
    inputRotation: scalar,
    inputRadius: distance,
    ...Common
  },

  // CIPinchDistortion,
  // CIStretchCrop,
  // CITorusLensDistortion,
  // CITwirlDistortion,
  CIVortexDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputAngle: scalar,
    ...Common
  },

  // CIAztecCodeGenerator,
  // CICheckerboardGenerator,
  // CICode128BarcodeGenerator,
  CIConstantColorGenerator: {
    inputColor: color,
    imageStyle: imageStyle,
    disableCache: bool
  },

  // CILenticularHaloGenerator,
  // CIPDF417BarcodeGenerator,
  // CIQRCodeGenerator,
  CIRandomGenerator: {
    imageStyle: imageStyle,
    disableCache: bool
  },

  // CIStarShineGenerator,
  // CIStripesGenerator,
  // CISunbeamsGenerator,
  // CIAffineTransform,
  // CICrop,
  // CILanczosScaleTransform,
  // CIPerspectiveCorrection,
  // CIPerspectiveTransform,
  // CIPerspectiveTransformWithExtent,
  // CIStraightenFilter,
  CIGaussianGradient: {
    inputCenter: position,
    inputRadius: distance,
    inputColor0: color,
    inputColor1: color,
    imageStyle: imageStyle,
    disableCache: bool
  },

  CILinearGradient: {
    inputPoint0: position,
    inputPoint1: position,
    inputColor0: color,
    inputColor1: color,
    imageStyle: imageStyle,
    disableCache: bool
  },

  CIRadialGradient: {
    inputCenter: position,
    inputRadius0: distance,
    inputRadius1: distance,
    inputColor0: color,
    inputColor1: color,
    imageStyle: imageStyle,
    disableCache: bool
  },

  CISmoothLinearGradient: {
    inputPoint0: position,
    inputPoint1: position,
    inputColor0: color,
    inputColor1: color,
    imageStyle: imageStyle,
    disableCache: bool
  },

  CICircularScreen: {
    inputCenter: position,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // CICMYKHalftone,
  CIDotScreen: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // CIHatchedScreen,
  CILineScreen: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar,
    ...Common
  },

  // CIAreaAverage,
  // CIAreaHistogram,
  // CIRowAverage,
  // CIColumnAverage,
  // CIHistogramDisplayFilter,
  // CIAreaMaximum,
  // CIAreaMinimum,
  // CIAreaMaximumAlpha,
  // CIAreaMinimumAlpha,
  CISharpenLuminance: {
    inputSharpness: scalar,
    ...Common
  },

  CIUnsharpMask: {
    inputRadius: distance,
    inputIntensity: scalar,
    ...Common
  },

  // CIBlendWithAlphaMask,
  // CIBlendWithMask,
  // CIBloom,
  CIComicEffect: Common,

  CIConvolution3X3: {
    inputWeights: scalarVector,
    inputBias: scalar,
    ...Common
  },

  // CIConvolution5X5,
  // CIConvolution7X7,
  // CIConvolution9Horizontal,
  // CIConvolution9Vertical,
  CICrystallize: {
    inputRadius: distance,
    inputCenter: position,
    ...Common
  },

  // CIDepthOfField,
  CIEdges: {
    inputIntensity: scalar,
    ...Common
  },

  // CIEdgeWork,
  // CIGloom,
  // CIHeightFieldFromMask,
  // CIHexagonalPixellate,
  // CIHighlightShadowAdjust,
  CILineOverlay: {
    inputNRNoiseLevel: scalar,
    inputNRSharpness: scalar,
    inputEdgeIntensity: scalar,
    inputThreshold: scalar,
    inputContrast: scalar,
    ...Common
  },

  CIPixellate: {
    inputCenter: position,
    inputScale: distance,
    ...Common
  },

  CIPointillize: {
    inputRadius: distance,
    inputCenter: position,
    ...Common
  },

  // CIShadedMaterial,
  // CISpotColor,
  // CISpotLight,
  // CIAffineClamp,
  // CIAffineTile,
  // CIEightfoldReflectedTile,
  // CIFourfoldReflectedTile,
  // CIFourfoldRotatedTile,
  // CIFourfoldTranslatedTile,
  // CIGlideReflectedTile,
  // CIKaleidoscope,
  CIOpTile: {
    inputScale: scalar,
    inputAngle: scalar,
    inputCenter: position,
    inputWidth: distance,
    ...Common
  },

  // CIParallelogramTile,
  // CIPerspectiveTile,
  // CISixfoldReflectedTile,
  // CISixfoldRotatedTile,
  // CITriangleKaleidoscope,
  // CITriangleTile,
  CITwelvefoldReflectedTile: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: scalar,
    ...Common
  }

  // CIAccordionFoldTransition: {
  //   inputImage: image,
  //   inputTargetImage: image,
  //   inputBottomHeight: distance,
  //   inputNumberOfFolds: scalar,
  //   inputFoldShadowAmount: scalar,
  //   inputTime: scalar
  // }

  // CIBarsSwipeTransition,
  // CICopyMachineTransition,
  // CIDisintegrateWithMaskTransition,
  // CIDissolveTransition,
  // CIFlashTransition,
  // CIModTransition,
  // CIPageCurlTransition,
  // CIPageCurlWithShadowTransition,
  // CIRippleTransition,
  // CISwipeTransition
}
