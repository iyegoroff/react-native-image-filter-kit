import { distance, position, scalar, scalarVector, offset, color } from '../common/input-types';
import { generatedImage, inputImage, inputBackgroundImage, inputMask } from '../common/image-names';
import { filter, generator } from '../common/utils';

export default {
  CIBoxBlur: filter({
    inputRadius: distance
  }),

  CIDiscBlur: filter({
    inputRadius: distance
  }),

  CIGaussianBlur: filter({
    inputRadius: distance
  }),

  CIMaskedVariableBlur: filter({
    inputRadius: distance
  }, [
    inputImage,
    inputMask
  ]),

  CIMedianFilter: filter({}),

  CIMotionBlur: filter({
    inputRadius: distance,
    inputAngle: scalar
  }),

  CINoiseReduction: filter({
    inputNoiseLevel: scalar,
    inputSharpness: scalar
  }),

  CIZoomBlur: filter({
    inputCenter: position,
    inputAmount: distance
  }),

  CIColorClamp: filter({
    inputMinComponents: scalarVector,
    inputMaxComponents: scalarVector
  }),

  CIColorControls: filter({
    inputSaturation: scalar,
    inputBrightness: scalar,
    inputContrast: scalar
  }),

  CIColorMatrix: filter({
    inputRVector: scalarVector,
    inputGVector: scalarVector,
    inputBVector: scalarVector,
    inputAVector: scalarVector,
    inputBiasVector: scalarVector
  }),

  CIColorPolynomial: filter({
    inputRedCoefficients: scalarVector,
    inputGreenCoefficients: scalarVector,
    inputBlueCoefficients: scalarVector,
    inputAlphaCoefficients: scalarVector
  }),

  CIExposureAdjust: filter({
    inputEV: scalar
  }),

  CIGammaAdjust: filter({
    inputPower: scalar
  }),

  CIHueAdjust: filter({
    inputAngle: scalar
  }),

  CILinearToSRGBToneCurve: filter({}),

  CISRGBToneCurveToLinear: filter({}),

  CITemperatureAndTint: filter({
    inputNeutral: offset,
    inputTargetNeutral: offset
  }),

  CIToneCurve: filter({
    inputPoint0: offset,
    inputPoint1: offset,
    inputPoint2: offset,
    inputPoint3: offset,
    inputPoint4: offset
  }),

  CIVibrance: filter({
    inputAmount: scalar
  }),

  // CIWhitePointAdjust,
  // CIColorCrossPolynomial,
  // CIColorCube,
  // CIColorCubeWithColorSpace,
  CIColorInvert: filter({}),

  // CIColorMap,
  CIColorMonochrome: filter({
    inputColor: color,
    inputIntensity: scalar
  }),

  CIColorPosterize: filter({
    inputLevels: scalar
  }),

  // CIFalseColor,
  CIMaskToAlpha: filter({}),

  CIMaximumComponent: filter({}),

  CIMinimumComponent: filter({}),

  CIPhotoEffectChrome: filter({}),

  CIPhotoEffectFade: filter({}),

  CIPhotoEffectInstant: filter({}),

  CIPhotoEffectMono: filter({}),

  CIPhotoEffectNoir: filter({}),

  CIPhotoEffectProcess: filter({}),

  CIPhotoEffectTonal: filter({}),

  CIPhotoEffectTransfer: filter({}),

  CISepiaTone: filter({
    inputIntensity: scalar
  }),
  
  CIVignette: filter({
    inputRadius: distance,
    inputIntensity: scalar
  }),

  CIVignetteEffect: filter({
    inputCenter: position,
    inputIntensity: scalar,
    inputRadius: distance
  }),

  CIAdditionCompositing: filter({}, [
    inputImage,
    inputBackgroundImage
  ]),
  
  // CIColorBlendMode,
  // CIColorBurnBlendMode,
  // CIColorDodgeBlendMode,
  // CIDarkenBlendMode,
  // CIDifferenceBlendMode,
  // CIDivideBlendMode,
  // CIExclusionBlendMode,
  // CIHardLightBlendMode,
  // CIHueBlendMode,
  CILightenBlendMode: filter({}, [
    inputImage,
    inputBackgroundImage
  ]),
  
  // CILinearBurnBlendMode,
  // CILinearDodgeBlendMode,
  // CILuminosityBlendMode,
  // CIMaximumCompositing,
  // CIMinimumCompositing,
  // CIMultiplyBlendMode,
  // CIMultiplyCompositing,
  // CIOverlayBlendMode,
  // CIPinLightBlendMode,
  // CISaturationBlendMode,
  // CIScreenBlendMode,
  // CISoftLightBlendMode,
  // CISourceAtopCompositing,
  // CISourceInCompositing,
  // CISourceOutCompositing,
  // CISourceOverCompositing,
  // CISubtractBlendMode,
  CIBumpDistortion: filter({
    inputCenter: position,
    inputRadius: distance,
    inputScale: scalar
  }),

  CIBumpDistortionLinear: filter({
    inputCenter: position,
    inputRadius: distance,
    inputScale: scalar,
    inputAngle: scalar
  }),

  CICircleSplashDistortion: filter({
    inputCenter: position,
    inputRadius: distance
  }),

  CICircularWrap: filter({
    inputCenter: position,
    inputRadius: distance,
    inputAngle: scalar
  }),

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
  CIVortexDistortion: filter({
    inputCenter: position,
    inputRadius: distance,
    inputAngle: scalar
  }),

  // CIAztecCodeGenerator,
  // CICheckerboardGenerator,
  // CICode128BarcodeGenerator,
  CIConstantColorGenerator: generator({
    inputColor: color
  }),
  
  // CILenticularHaloGenerator,
  // CIPDF417BarcodeGenerator,
  // CIQRCodeGenerator,
  CIRandomGenerator: generator({}),
  
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
  // CILinearGradient,
  // CIRadialGradient,
  // CISmoothLinearGradient,
  CICircularScreen: filter({
    inputCenter: position,
    inputWidth: distance, 
    inputSharpness: scalar
  }),

  // CICMYKHalftone,
  CIDotScreen: filter({
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar
  }),

  // CIHatchedScreen,
  CILineScreen: filter({
    inputCenter: position,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar
  }),

  // CIAreaAverage,
  // CIAreaHistogram,
  // CIRowAverage,
  // CIColumnAverage,
  // CIHistogramDisplayFilter,
  // CIAreaMaximum,
  // CIAreaMinimum,
  // CIAreaMaximumAlpha,
  // CIAreaMinimumAlpha,
  CISharpenLuminance: filter({
    inputSharpness: scalar
  }),

  CIUnsharpMask: filter({
    inputRadius: distance,
    inputIntensity: scalar
  }),

  // CIBlendWithAlphaMask,
  // CIBlendWithMask,
  // CIBloom,
  // CIComicEffect,
  // CIConvolution3X3,
  // CIConvolution5X5,
  // CIConvolution7X7,
  // CIConvolution9Horizontal,
  // CIConvolution9Vertical,
  CICrystallize: filter({
    inputRadius: distance,
    inputCenter: position
  }),

  // CIDepthOfField,
  CIEdges: filter({
    inputIntensity: scalar
  }),

  // CIEdgeWork,
  // CIGloom,
  // CIHeightFieldFromMask,
  // CIHexagonalPixellate,
  // CIHighlightShadowAdjust,
  CILineOverlay: filter({
    inputNRNoiseLevel: scalar,
    inputNRSharpness: scalar,
    inputEdgeIntensity: scalar,
    inputThreshold: scalar,
    inputContrast: scalar
  }),

  CIPixellate: filter({
    inputCenter: position,
    inputScale: distance
  }),

  CIPointillize: filter({
    inputRadius: distance,
    inputCenter: position
  }),

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
  CIOpTile: filter({
    inputScale: scalar,
    inputAngle: scalar,
    inputCenter: position,
    inputWidth: distance
  }),

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
};
