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
  config
} from '../common/inputs'

export const shapes = {
  ImageFilter: {
    config: config
  },

  CIBoxBlur: {
    inputRadius: distance,
    inputImage: image
  },

  CIDiscBlur: {
    inputRadius: distance,
    inputImage: image
  },

  CIGaussianBlur: {
    inputRadius: distance,
    inputImage: image
  },

  CIMaskedVariableBlur: {
    inputRadius: distance,
    inputImage: image,
    inputMask: image
  },

  CIMedianFilter: {
    inputImage: image
  },

  CIMotionBlur: {
    inputRadius: distance,
    inputAngle: scalar,
    inputImage: image
  },

  CINoiseReduction: {
    inputNoiseLevel: scalar,
    inputSharpness: scalar,
    inputImage: image
  },

  CIZoomBlur: {
    inputCenter: position,
    inputAmount: distance,
    inputImage: image
  },

  CIColorClamp: {
    inputMinComponents: scalarVector,
    inputMaxComponents: scalarVector,
    inputImage: image
  },

  CIColorControls: {
    inputSaturation: scalar,
    inputBrightness: scalar,
    inputContrast: scalar,
    inputImage: image
  },

  CIColorMatrix: {
    inputRVector: scalarVector,
    inputGVector: scalarVector,
    inputBVector: scalarVector,
    inputAVector: scalarVector,
    inputBiasVector: scalarVector,
    inputImage: image
  },

  CIColorPolynomial: {
    inputRedCoefficients: scalarVector,
    inputGreenCoefficients: scalarVector,
    inputBlueCoefficients: scalarVector,
    inputAlphaCoefficients: scalarVector,
    inputImage: image
  },

  CIExposureAdjust: {
    inputEV: scalar,
    inputImage: image
  },

  CIGammaAdjust: {
    inputPower: scalar,
    inputImage: image
  },

  CIHueAdjust: {
    inputAngle: scalar,
    inputImage: image
  },

  CILinearToSRGBToneCurve: {
    inputImage: image
  },

  CISRGBToneCurveToLinear: {
    inputImage: image
  },

  CITemperatureAndTint: {
    inputNeutral: offset,
    inputTargetNeutral: offset,
    inputImage: image
  },

  CIToneCurve: {
    inputPoint0: offset,
    inputPoint1: offset,
    inputPoint2: offset,
    inputPoint3: offset,
    inputPoint4: offset,
    inputImage: image
  },

  CIVibrance: {
    inputAmount: scalar,
    inputImage: image
  },

  // CIWhitePointAdjust,
  // CIColorCrossPolynomial,
  // CIColorCube,
  // CIColorCubeWithColorSpace,
  CIColorInvert: {
    inputImage: image
  },

  // CIColorMap,
  CIColorMonochrome: {
    inputColor: color,
    inputIntensity: scalar,
    inputImage: image
  },

  CIColorPosterize: {
    inputLevels: scalar,
    inputImage: image
  },

  // CIFalseColor,
  CIMaskToAlpha: {
    inputImage: image
  },

  CIMaximumComponent: {
    inputImage: image
  },

  CIMinimumComponent: {
    inputImage: image
  },

  CIPhotoEffectChrome: {
    inputImage: image
  },

  CIPhotoEffectFade: {
    inputImage: image
  },

  CIPhotoEffectInstant: {
    inputImage: image
  },

  CIPhotoEffectMono: {
    inputImage: image
  },

  CIPhotoEffectNoir: {
    inputImage: image
  },

  CIPhotoEffectProcess: {
    inputImage: image
  },

  CIPhotoEffectTonal: {
    inputImage: image
  },

  CIPhotoEffectTransfer: {
    inputImage: image
  },

  CISepiaTone: {
    inputIntensity: scalar,
    inputImage: image
  },

  CIVignette: {
    inputRadius: distance,
    inputIntensity: scalar,
    inputImage: image
  },

  CIVignetteEffect: {
    inputCenter: position,
    inputIntensity: scalar,
    inputRadius: distance,
    inputImage: image
  },

  CIAdditionCompositing: {
    inputImage: image,
    inputBackgroundImage: image
  },

  CIColorBlendMode: {
    inputImage: image,
    inputBackgroundImage: image
  },

  CIColorBurnBlendMode: {
    inputImage: image,
    inputBackgroundImage: image
  },

  CIColorDodgeBlendMode: {
    inputImage: image,
    inputBackgroundImage: image
  },

  CIDarkenBlendMode: {
    inputImage: image,
    inputBackgroundImage: image
  },

  // CIDifferenceBlendMode,
  // CIDivideBlendMode,
  CIExclusionBlendMode: {
    inputImage: image,
    inputBackgroundImage: image
  },

  // CIHardLightBlendMode,
  CIHueBlendMode: {
    inputImage: image,
    inputBackgroundImage: image
  },

  CILightenBlendMode: {
    inputImage: image,
    inputBackgroundImage: image
  },

  // CILinearBurnBlendMode,
  // CILinearDodgeBlendMode,
  // CILuminosityBlendMode,
  // CIMaximumCompositing,
  // CIMinimumCompositing,
  CIMultiplyBlendMode: {
    inputImage: image,
    inputBackgroundImage: image
  },

  // CIMultiplyCompositing,
  CIOverlayBlendMode: {
    inputImage: image,
    inputBackgroundImage: image
  },

  // CIPinLightBlendMode,
  // CISaturationBlendMode,
  CIScreenBlendMode: {
    inputImage: image,
    inputBackgroundImage: image
  },

  CISoftLightBlendMode: {
    inputImage: image,
    inputBackgroundImage: image
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
    inputImage: image
  },

  CIBumpDistortionLinear: {
    inputCenter: position,
    inputRadius: distance,
    inputScale: scalar,
    inputAngle: scalar,
    inputImage: image
  },

  CICircleSplashDistortion: {
    inputCenter: position,
    inputRadius: distance,
    inputImage: image
  },

  CICircularWrap: {
    inputCenter: position,
    inputRadius: distance,
    inputAngle: scalar,
    inputImage: image
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
    inputImage: image
  },

  // CIAztecCodeGenerator,
  // CICheckerboardGenerator,
  // CICode128BarcodeGenerator,
  CIConstantColorGenerator: {
    inputColor: color,
    imageStyle: imageStyle
  },

  // CILenticularHaloGenerator,
  // CIPDF417BarcodeGenerator,
  // CIQRCodeGenerator,
  CIRandomGenerator: {
    imageStyle: imageStyle
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
    imageStyle: imageStyle
  },

  CIRadialGradient: {
    inputCenter: position,
    inputRadius0: distance,
    inputRadius1: distance,
    inputColor0: color,
    inputColor1: color,
    imageStyle: imageStyle
  },

  // CISmoothLinearGradient,
  CICircularScreen: {
    inputCenter: position,
    inputWidth: distance,
    inputSharpness: scalar,
    inputImage: image
  },

  // CICMYKHalftone,
  CIDotScreen: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar,
    inputImage: image
  },

  // CIHatchedScreen,
  CILineScreen: {
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar,
    inputImage: image
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
    inputImage: image
  },

  CIUnsharpMask: {
    inputRadius: distance,
    inputIntensity: scalar,
    inputImage: image
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
    inputImage: image
  },

  // CIDepthOfField,
  CIEdges: {
    inputIntensity: scalar,
    inputImage: image
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
    inputImage: image
  },

  CIPixellate: {
    inputCenter: position,
    inputScale: distance,
    inputImage: image
  },

  CIPointillize: {
    inputRadius: distance,
    inputCenter: position,
    inputImage: image
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
    inputImage: image
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
