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
  bool
} from '../common/inputs'

export const shapes = {
  ImageFilter: {
    config: config
  },

  CIBoxBlur: {
    inputRadius: distance,
    inputImage: image,
    disableCache: bool
  },

  CIDiscBlur: {
    inputRadius: distance,
    inputImage: image,
    disableCache: bool
  },

  CIGaussianBlur: {
    inputRadius: distance,
    inputImage: image,
    disableCache: bool
  },

  CIMaskedVariableBlur: {
    inputRadius: distance,
    inputImage: image,
    inputMask: image,
    disableCache: bool
  },

  CIMedianFilter: {
    inputImage: image,
    disableCache: bool
  },

  CIMotionBlur: {
    inputRadius: distance,
    inputAngle: scalar,
    inputImage: image,
    disableCache: bool
  },

  CINoiseReduction: {
    inputNoiseLevel: scalar,
    inputSharpness: scalar,
    inputImage: image,
    disableCache: bool
  },

  CIZoomBlur: {
    inputCenter: position,
    inputAmount: distance,
    inputImage: image,
    disableCache: bool
  },

  CIColorClamp: {
    inputMinComponents: scalarVector,
    inputMaxComponents: scalarVector,
    inputImage: image,
    disableCache: bool
  },

  CIColorControls: {
    inputSaturation: scalar,
    inputBrightness: scalar,
    inputContrast: scalar,
    inputImage: image,
    disableCache: bool
  },

  CIColorMatrix: {
    inputRVector: scalarVector,
    inputGVector: scalarVector,
    inputBVector: scalarVector,
    inputAVector: scalarVector,
    inputBiasVector: scalarVector,
    inputImage: image,
    disableCache: bool
  },

  CIColorPolynomial: {
    inputRedCoefficients: scalarVector,
    inputGreenCoefficients: scalarVector,
    inputBlueCoefficients: scalarVector,
    inputAlphaCoefficients: scalarVector,
    inputImage: image,
    disableCache: bool
  },

  CIExposureAdjust: {
    inputEV: scalar,
    inputImage: image,
    disableCache: bool
  },

  CIGammaAdjust: {
    inputPower: scalar,
    inputImage: image,
    disableCache: bool
  },

  CIHueAdjust: {
    inputAngle: scalar,
    inputImage: image,
    disableCache: bool
  },

  CILinearToSRGBToneCurve: {
    inputImage: image,
    disableCache: bool
  },

  CISRGBToneCurveToLinear: {
    inputImage: image,
    disableCache: bool
  },

  CITemperatureAndTint: {
    inputNeutral: offset,
    inputTargetNeutral: offset,
    inputImage: image,
    disableCache: bool
  },

  CIToneCurve: {
    inputPoint0: offset,
    inputPoint1: offset,
    inputPoint2: offset,
    inputPoint3: offset,
    inputPoint4: offset,
    inputImage: image,
    disableCache: bool
  },

  CIVibrance: {
    inputAmount: scalar,
    inputImage: image,
    disableCache: bool
  },

  // CIWhitePointAdjust,
  // CIColorCrossPolynomial,
  // CIColorCube,
  // CIColorCubeWithColorSpace,
  CIColorInvert: {
    inputImage: image,
    disableCache: bool
  },

  // CIColorMap,
  CIColorMonochrome: {
    inputColor: color,
    inputIntensity: scalar,
    inputImage: image,
    disableCache: bool
  },

  CIColorPosterize: {
    inputLevels: scalar,
    inputImage: image,
    disableCache: bool
  },

  // CIFalseColor,
  CIMaskToAlpha: {
    inputImage: image,
    disableCache: bool
  },

  CIMaximumComponent: {
    inputImage: image,
    disableCache: bool
  },

  CIMinimumComponent: {
    inputImage: image,
    disableCache: bool
  },

  CIPhotoEffectChrome: {
    inputImage: image,
    disableCache: bool
  },

  CIPhotoEffectFade: {
    inputImage: image,
    disableCache: bool
  },

  CIPhotoEffectInstant: {
    inputImage: image,
    disableCache: bool
  },

  CIPhotoEffectMono: {
    inputImage: image,
    disableCache: bool
  },

  CIPhotoEffectNoir: {
    inputImage: image,
    disableCache: bool
  },

  CIPhotoEffectProcess: {
    inputImage: image,
    disableCache: bool
  },

  CIPhotoEffectTonal: {
    inputImage: image,
    disableCache: bool
  },

  CIPhotoEffectTransfer: {
    inputImage: image,
    disableCache: bool
  },

  CISepiaTone: {
    inputIntensity: scalar,
    inputImage: image,
    disableCache: bool
  },

  CIVignette: {
    inputRadius: distance,
    inputIntensity: scalar,
    inputImage: image,
    disableCache: bool
  },

  CIVignetteEffect: {
    inputCenter: position,
    inputIntensity: scalar,
    inputRadius: distance,
    inputImage: image,
    disableCache: bool
  },

  CIAdditionCompositing: {
    inputImage: image,
    inputBackgroundImage: image,
    disableCache: bool
  },

  CIColorBlendMode: {
    inputImage: image,
    inputBackgroundImage: image,
    disableCache: bool
  },

  CIColorBurnBlendMode: {
    inputImage: image,
    inputBackgroundImage: image,
    disableCache: bool
  },

  CIColorDodgeBlendMode: {
    inputImage: image,
    inputBackgroundImage: image,
    disableCache: bool
  },

  CIDarkenBlendMode: {
    inputImage: image,
    inputBackgroundImage: image,
    disableCache: bool
  },

  // CIDifferenceBlendMode,
  // CIDivideBlendMode,
  CIExclusionBlendMode: {
    inputImage: image,
    inputBackgroundImage: image,
    disableCache: bool
  },

  // CIHardLightBlendMode,
  CIHueBlendMode: {
    inputImage: image,
    inputBackgroundImage: image,
    disableCache: bool
  },

  CILightenBlendMode: {
    inputImage: image,
    inputBackgroundImage: image,
    disableCache: bool
  },

  // CILinearBurnBlendMode,
  // CILinearDodgeBlendMode,
  // CILuminosityBlendMode,
  // CIMaximumCompositing,
  // CIMinimumCompositing,
  CIMultiplyBlendMode: {
    inputImage: image,
    inputBackgroundImage: image,
    disableCache: bool
  },

  // CIMultiplyCompositing,
  CIOverlayBlendMode: {
    inputImage: image,
    inputBackgroundImage: image,
    disableCache: bool
  },

  // CIPinLightBlendMode,
  // CISaturationBlendMode,
  CIScreenBlendMode: {
    inputImage: image,
    inputBackgroundImage: image,
    disableCache: bool
  },

  CISoftLightBlendMode: {
    inputImage: image,
    inputBackgroundImage: image,
    disableCache: bool
  },

  // CISourceAtopCompositing,
  // CISourceInCompositing,
  // CISourceOutCompositing,
  // CISourceOverCompositing,
  // CISubtractBlendMode,
  CIBumpDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputScale: scalar,
    inputImage: image,
    disableCache: bool
  },

  CIBumpDistortionLinear: {
    inputCenter: position,
    inputRadius: distance,
    inputScale: scalar,
    inputAngle: scalar,
    inputImage: image,
    disableCache: bool
  },

  CICircleSplashDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputImage: image,
    disableCache: bool
  },

  CICircularWrap: {
    inputCenter: position,
    inputRadius: distance,
    inputAngle: scalar,
    inputImage: image,
    disableCache: bool
  },

  // CIDroste,
  // CIDisplacementDistortion,
  // CIGlassDistortion,
  // CIGlassLozenge,
  // CIHoleDistortion,
  // CILightTunnel,
  // CIPinchDistortion,
  // CIStretchCrop,
  // CITorusLensDistortion,
  // CITwirlDistortion,
  CIVortexDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputAngle: scalar,
    inputImage: image,
    disableCache: bool
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
  // CIGaussianGradient,
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

  // CISmoothLinearGradient,
  CICircularScreen: {
    inputCenter: position,
    inputWidth: distance,
    inputSharpness: scalar,
    inputImage: image,
    disableCache: bool
  },

  // CICMYKHalftone,
  CIDotScreen: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar,
    inputImage: image,
    disableCache: bool
  },

  // CIHatchedScreen,
  CILineScreen: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar,
    inputImage: image,
    disableCache: bool
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
    inputImage: image,
    disableCache: bool
  },

  CIUnsharpMask: {
    inputRadius: distance,
    inputIntensity: scalar,
    inputImage: image,
    disableCache: bool
  },

  // CIBlendWithAlphaMask,
  // CIBlendWithMask,
  // CIBloom,
  // CIComicEffect,
  // CIConvolution3X3,
  // CIConvolution5X5,
  // CIConvolution7X7,
  // CIConvolution9Horizontal,
  // CIConvolution9Vertical,
  CICrystallize: {
    inputRadius: distance,
    inputCenter: position,
    inputImage: image,
    disableCache: bool
  },

  // CIDepthOfField,
  CIEdges: {
    inputIntensity: scalar,
    inputImage: image,
    disableCache: bool
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
    inputImage: image,
    disableCache: bool
  },

  CIPixellate: {
    inputCenter: position,
    inputScale: distance,
    inputImage: image,
    disableCache: bool
  },

  CIPointillize: {
    inputRadius: distance,
    inputCenter: position,
    inputImage: image,
    disableCache: bool
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
    inputImage: image,
    disableCache: bool
  }

  // CIParallelogramTile,
  // CIPerspectiveTile,
  // CISixfoldReflectedTile,
  // CISixfoldRotatedTile,
  // CITriangleKaleidoscope,
  // CITriangleTile,
  // CITwelvefoldReflectedTile,
  // CIAccordionFoldTransition,
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
