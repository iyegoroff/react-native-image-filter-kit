import React from 'react';
import {
  ImageFilterWithColorManagement,
  ImageFilterWithoutColorManagement
} from './image-filter';
import {
  distance,
  point,
  scalar,
  vector
} from './input-types';

const filter = (paramMap, imageNames = ['inputImage']) => ({
  paramNames: Object.keys(paramMap),
  paramTypes: Object.values(paramMap),
  imageNames
});

const filters = {
  CIBoxBlur: filter({
    inputRadius: distance
  }),

  CIDiscBlur: filter({
    inputRadius: distance
  }),

  CIGaussianBlur: filter({
    inputRadius: distance
  }),

  // CIMaskedVariableBlur: filter(['inputRadius', 'inputMask']),
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
    inputCenter: point,
    inputAmount: distance
  }),

  CIColorClamp: filter({
    inputMinComponents: vector,
    inputMaxComponents: vector
  }),

  CIColorControls: filter({
    inputSaturation: scalar,
    inputBrightness: scalar,
    inputContrast: scalar
  }),

  CIColorMatrix: filter({
    inputRVector: vector,
    inputGVector: vector,
    inputBVector: vector,
    inputAVector: vector,
    inputBiasVector: vector
  }),

  // CIColorPolynomial,
  // CIExposureAdjust,
  CIGammaAdjust: filter({
    inputPower: scalar
  }),

  CIHueAdjust: filter({
    inputAngle: scalar
  }),

  // CILinearToSRGBToneCurve,
  // CISRGBToneCurveToLinear,
  // CITemperatureAndTint,
  // CIToneCurve,
  CIVibrance: filter({
    inputAmount: scalar
  }),

  // CIWhitePointAdjust,
  // CIColorCrossPolynomial,
  // CIColorCube,
  // CIColorCubeWithColorSpace,
  CIColorInvert: filter({}),

  // CIColorMap,
  // CIColorMonochrome,
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

  // CISepiaTone,
  // CIVignette,
  CIVignetteEffect: filter({
    inputCenter: point,
    inputIntensity: scalar,
    inputRadius: distance
  }),

  // CIAdditionCompositing,
  // CIColorBlendMode,
  // CIColorBurnBlendMode,
  // CIColorDodgeBlendMode,
  // CIDarkenBlendMode,
  // CIDifferenceBlendMode,
  // CIDivideBlendMode,
  // CIExclusionBlendMode,
  // CIHardLightBlendMode,
  // CIHueBlendMode,
  // CILightenBlendMode,
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
    inputCenter: point,
    inputRadius: distance,
    inputScale: scalar
  }),

  CIBumpDistortionLinear: filter({
    inputCenter: point,
    inputRadius: distance,
    inputScale: scalar,
    inputAngle: scalar
  }),

  CICircleSplashDistortion: filter({
    inputCenter: point,
    inputRadius: distance
  }),

  CICircularWrap: filter({
    inputCenter: point,
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
    inputCenter: point,
    inputRadius: distance,
    inputAngle: scalar
  }),

  // CIAztecCodeGenerator,
  // CICheckerboardGenerator,
  // CICode128BarcodeGenerator,
  // CIConstantColorGenerator,
  // CILenticularHaloGenerator,
  // CIPDF417BarcodeGenerator,
  // CIQRCodeGenerator,
  // CIRandomGenerator,
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
    inputCenter: point,
    inputWidth: distance, 
    inputSharpness: scalar
  }),

  // CICMYKHalftone,
  CIDotScreen: filter({
    inputCenter: point,
    inputAngle: scalar,
    inputWidth: distance,
    inputSharpness: scalar
  }),

  // CIHatchedScreen,
  // CILineScreen,
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
    inputCenter: point
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
  // CILineOverlay,
  CIPixellate: filter({
    inputCenter: point,
    inputScale: distance
  }),

  CIPointillize: filter({
    inputRadius: distance,
    inputCenter: point
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
    inputCenter: point,
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

const nativeImageFilter = (name) => {
  return name === 'CIColorMatrix' || name === 'CIColorInvert'
    ? ImageFilterWithoutColorManagement
    : ImageFilterWithColorManagement;
};

const createImageNativeFilter = (name, config, ImageFilter) => ({ children, ...restProps }) => (
  <ImageFilter
    name={name}
    {...config}
    {...restProps}
  >
    {children}
  </ImageFilter>
);

export default Object.keys(filters).reduce(
  (acc, name) => {
    acc[name] = createImageNativeFilter(name, filters[name], nativeImageFilter(name));
    acc[name].displayName = name;
    return acc;
  },
  {}
);

