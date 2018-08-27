namespace FilterConstructor

open Fable.Helpers.ReactNative
open Fable.Import
open Fable.Helpers
open System
open Fable.Import.ReactNativeImageFilterKit.Props

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNF = Fable.Import.ReactNativeImageFilterKit
module CFI = CombinedFilterInput

module CombinedFilter =

  type Category =
    | Android
    | ColorMatrix
    | CICategoryBlur
    | CICategoryColorAdjustment
    | CICategoryColorEffect
    | CICategoryCompositeOperation
    | CICategoryDistortionEffect
    | CICategoryGenerator
    | CICategoryGeometryAdjustment
    | CICategoryGradient
    | CICategoryHalftoneEffect
    | CICategoryReduction
    | CICategorySharpen
    | CICategoryStylize
    | CICategoryTileEffect
    | CICategoryTransition


  type Model =
    | Normal
    | Saturate
    | HueRotate
    | LuminanceToAlpha
    | Invert
    | Grayscale
    | Sepia
    | Nightvision
    | Warm
    | Cool
    | Brightness
    | Exposure
    | Contrast
    | Temperature
    | Tint
    | Threshold
    | Protanomaly
    | Deuteranomaly
    | Tritanomaly
    | Protanopia
    | Deuteranopia
    | Tritanopia
    | Achromatopsia
    | Achromatomaly
    | RoundAsCircle
    | IterativeBoxBlur
    | LightingColorFilter
    | CIBoxBlur
    | CIDiscBlur
    | CIGaussianBlur
    | CIMedianFilter
    | CIMotionBlur
    | CINoiseReduction
    | CIZoomBlur
    | CIColorClamp
    | CIColorControls
    | CIColorMatrix
    | CIGammaAdjust
    | CIHueAdjust
    | CIMaskToAlpha
    | CIMaximumComponent
    | CIMinimumComponent
    | CIPhotoEffectChrome
    | CIPhotoEffectFade
    | CIPhotoEffectInstant
    | CIPhotoEffectMono
    | CIPhotoEffectNoir
    | CIPhotoEffectProcess
    | CIPhotoEffectTonal
    | CIPhotoEffectTransfer
    | CIVignetteEffect
    | CIColorInvert
    | CIColorPosterize
    | CIVibrance
    | CICircularScreen
    | CIDotScreen
    | CIBumpDistortion
    | CIBumpDistortionLinear
    | CICircleSplashDistortion
    | CICircularWrap
    | CIVortexDistortion
    | CISharpenLuminance
    | CIUnsharpMask
    | CICrystallize
    | CIEdges
    | CIPixellate
    | CIPointillize
    | CIOpTile

  type GroupedModel = Category * (Model array)


  let name =
    sprintf "%A"

  let private toPoint (x, y) =
    RNF.Point (RNF.Distance.WPct x, RNF.Distance.HPct y)

  let init model : Filter.Model =
    match model with
    | Normal -> Filter.init []

    | Saturate ->
      Filter.init
        [ Filter.Value, CFI.initScalar -10. 10. 1.]

    | HueRotate ->
      Filter.init
        [ Filter.Value, CFI.initScalar -10. 10. 0. ]

    | LuminanceToAlpha -> Filter.init []

    | Invert -> Filter.init []

    | Grayscale -> Filter.init []

    | Sepia -> Filter.init []

    | Nightvision -> Filter.init []

    | Warm -> Filter.init []

    | Cool -> Filter.init []

    | Brightness ->
      Filter.init
        [ Filter.Value, CFI.initScalar -10. 10. 1. ]

    | Exposure ->
      Filter.init
        [ Filter.Value, CFI.initScalar -10. 10. 1. ]

    | Contrast ->
      Filter.init
        [ Filter.Value, CFI.initScalar -10. 10. 1. ]

    | Temperature ->
      Filter.init
        [ Filter.Value, CFI.initScalar -10. 10. 1. ]

    | Tint ->
      Filter.init
        [ Filter.Value, CFI.initScalar -10. 10. 0. ]

    | Threshold ->
      Filter.init
        [ Filter.Value, CFI.initScalar -100. 100. 0. ]

    | Protanomaly -> Filter.init []

    | Deuteranomaly -> Filter.init []

    | Tritanomaly -> Filter.init []

    | Protanopia -> Filter.init []

    | Deuteranopia -> Filter.init []

    | Tritanopia -> Filter.init []

    | Achromatopsia -> Filter.init []

    | Achromatomaly -> Filter.init []

    | RoundAsCircle -> Filter.init []

    | IterativeBoxBlur ->
      Filter.init
        [ Filter.BlurRadius, CFI.initScalar 1. 50. 5.
          Filter.Iterations, CFI.initScalar 1. 5. 3. ]

    | LightingColorFilter ->
      Filter.init
        [ Filter.Mul, CFI.initColor
          Filter.Add, CFI.initColor ]

    | CIBoxBlur ->
      Filter.init
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 50. 10.
          Filter.ResizeOutput, CFI.initBoolean ]

    | CIDiscBlur ->
      Filter.init
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 50. 8.
          Filter.ResizeOutput, CFI.initBoolean ]

    | CIGaussianBlur ->
      Filter.init
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 50. 10.
          Filter.ResizeOutput, CFI.initBoolean ]

    | CIMedianFilter -> Filter.init []

    | CIMotionBlur ->
      Filter.init
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 50. 20.
          Filter.InputAngle, CFI.initScalar 0. (2. * Math.PI) 0.
          Filter.ResizeOutput, CFI.initBoolean ]

    | CINoiseReduction ->
      Filter.init
        [ Filter.InputNoiseLevel, CFI.initScalar 0. 1. 0.02
          Filter.InputSharpness, CFI.initScalar 0. 1. 0.4 ]

    | CIZoomBlur ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.)
          Filter.InputAmount, CFI.initDistance RNF.Distance.MaxPct  0. 100. 20.
          Filter.ResizeOutput, CFI.initBoolean ]

    | CIColorClamp ->
      Filter.init
        [ (Filter.InputMinComponents,
           CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.) (0., 0., 0., 0.))
          (Filter.InputMaxComponents,
           CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.) (1., 1., 1., 1.)) ]

    | CIColorControls -> 
      Filter.init
        [ Filter.InputSaturation, CFI.initScalar 0. 10. 1.
          Filter.InputBrightness, CFI.initScalar 0. 10. 0.
          Filter.InputContrast, CFI.initScalar 0. 10. 1. ]

    | CIColorMatrix ->
      Filter.init
        [ (Filter.InputRVector,
           CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.) (1., 0., 0., 0.))
          (Filter.InputGVector,
           CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.) (0., 1., 0., 0.))
          (Filter.InputBVector,
           CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.) (0., 0., 1., 0.))
          (Filter.InputAVector,
           CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.) (0., 0., 0., 1.))
          (Filter.InputBiasVector,
           CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.) (0., 0., 0., 0.)) ]

    | CIGammaAdjust ->
      Filter.init
        [ Filter.InputPower, CFI.initScalar 0. 10. 0.75 ]

    | CIHueAdjust ->
      Filter.init
        [ Filter.InputAngle, CFI.initScalar 0. (2. * Math.PI) 0. ]

    | CIMaskToAlpha -> Filter.init []

    | CIMaximumComponent -> Filter.init []

    | CIMinimumComponent -> Filter.init []

    | CIPhotoEffectChrome -> Filter.init []

    | CIPhotoEffectFade -> Filter.init []

    | CIPhotoEffectInstant -> Filter.init []

    | CIPhotoEffectMono -> Filter.init []

    | CIPhotoEffectNoir -> Filter.init []

    | CIPhotoEffectProcess -> Filter.init []

    | CIPhotoEffectTonal -> Filter.init []

    | CIPhotoEffectTransfer -> Filter.init []

    | CIVignetteEffect ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.)
          Filter.InputIntensity, CFI.initScalar 0. 1. 1.
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 100. 0. ]

    | CIColorInvert -> Filter.init []

    | CIColorPosterize ->
      Filter.init
        [ Filter.InputLevels, CFI.initScalar 0. 10. 6. ]

    | CIVibrance ->
      Filter.init
        [ Filter.InputAmount, CFI.initScalar -1. 1. 0. ]

    | CICircularScreen ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.)
          Filter.InputSharpness, CFI.initScalar 0. 1. 0.7
          Filter.InputWidth, CFI.initDistance RNF.Distance.MaxPct 0. 100. 6. ]

    | CIDotScreen ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.)
          Filter.InputAngle, CFI.initScalar 0. (2. * Math.PI) 0.
          Filter.InputSharpness, CFI.initScalar 0. 1. 0.7
          Filter.InputWidth, CFI.initDistance RNF.Distance.MaxPct 0. 50. 10. ]

    | CIBumpDistortion ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.)
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 100. 50.
          Filter.InputScale, CFI.initScalar -2. 2. 0.5
          Filter.ResizeOutput, CFI.initBoolean ]

    | CIBumpDistortionLinear ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.)
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 100. 50.
          Filter.InputScale, CFI.initScalar -2. 2. 0.5
          Filter.InputAngle, CFI.initScalar 0. (2. * Math.PI) 0. ]

    | CICircleSplashDistortion ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.)
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 100. 50. ]

    | CICircularWrap ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.)
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 100. 50.
          Filter.InputAngle, CFI.initScalar 0. (2. * Math.PI) 0.
          Filter.ResizeOutput, CFI.initBoolean ]

    | CIVortexDistortion ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.)
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 100. 50.
          Filter.InputAngle, CFI.initScalar 0. 360. 56.55
          Filter.ResizeOutput, CFI.initBoolean ]

    | CISharpenLuminance ->
      Filter.init
        [ Filter.InputSharpness, CFI.initScalar 0. 10. 0.4 ]

    | CIUnsharpMask ->
      Filter.init
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 20. 8.
          Filter.InputIntensity, CFI.initScalar 0. 10. 0.5 ]

    | CICrystallize ->
      Filter.init
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 20. 8.
          Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.) ]

    | CIEdges ->
      Filter.init
        [ Filter.InputIntensity, CFI.initScalar 0. 30. 1. ]

    | CIPixellate ->
      Filter.init
        [ Filter.InputScale, CFI.initDistance RNF.Distance.MaxPct  0. 20. 8.
          Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.) ]

    | CIPointillize ->
      Filter.init
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 20. 8.
          Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.) ]

    | CIOpTile ->
      Filter.init
        [ Filter.InputWidth, CFI.initDistance RNF.Distance.MaxPct  0. 100. 8.
          Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.) 
          Filter.InputScale, CFI.initScalar 0. 15. 1. 
          Filter.InputAngle, CFI.initScalar 0. (2. * Math.PI) 0.
          Filter.ResizeOutput, CFI.initBoolean ]

  let private (|ResizeOutput|_|) =
    function
    | Filter.ResizeOutput, CFI.Boolean (input: FilterBooleanInput.Model) -> Some input.Value
    | _ -> None

  let private emptyView filter =
    Filter.view
      filter
      (function
       | _ -> None)

  let view =
    function
    | Normal -> emptyView RNF.Normal

    | Saturate ->
      Filter.view
        RNF.Saturate
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (SaturateProps.Value (input.Convert input.Value))
         | _ -> None)

    | HueRotate ->
      Filter.view
        RNF.HueRotate
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (HueRotateProps.Value (input.Convert input.Value))
         | _ -> None)

    | LuminanceToAlpha -> emptyView RNF.LuminanceToAlpha

    | Invert -> emptyView RNF.Invert

    | Grayscale -> emptyView RNF.Grayscale

    | Sepia -> emptyView RNF.Sepia

    | Nightvision -> emptyView RNF.Nightvision

    | Warm -> emptyView RNF.Warm

    | Cool -> emptyView RNF.Cool

    | Brightness ->
      Filter.view
        RNF.Brightness
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (BrightnessProps.Value (input.Convert input.Value))
         | _ -> None)

    | Exposure ->
      Filter.view
        RNF.Exposure
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (ExposureProps.Value (input.Convert input.Value))
         | _ -> None)

    | Contrast ->
      Filter.view
        RNF.Contrast
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (ContrastProps.Value (input.Convert input.Value))
         | _ -> None)

    | Temperature ->
      Filter.view
        RNF.Temperature
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (TemperatureProps.Value (input.Convert input.Value))
         | _ -> None)

    | Tint ->
      Filter.view
        RNF.Tint
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (TintProps.Value (input.Convert input.Value))
         | _ -> None)

    | Threshold ->
      Filter.view
        RNF.Threshold
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (ThresholdProps.Value (input.Convert input.Value))
         | _ -> None)

    | Protanomaly -> emptyView RNF.Protanomaly

    | Deuteranomaly -> emptyView RNF.Deuteranomaly

    | Tritanomaly -> emptyView RNF.Tritanomaly

    | Protanopia -> emptyView RNF.Protanopia

    | Deuteranopia -> emptyView RNF.Deuteranopia

    | Tritanopia -> emptyView RNF.Tritanopia

    | Achromatopsia -> emptyView RNF.Achromatopsia

    | Achromatomaly -> emptyView RNF.Achromatomaly

    | RoundAsCircle -> emptyView RNF.RoundAsCircle

    | IterativeBoxBlur ->
      Filter.view
        RNF.IterativeBoxBlur
        (function
         | Filter.BlurRadius, CFI.Scalar input ->
           Some (IterativeBoxBlurProps.BlurRadius (input.Convert input.Value))
         | Filter.Iterations, CFI.Scalar input ->
           Some (IterativeBoxBlurProps.Iterations (input.Convert input.Value))
         | _ -> None)

    | LightingColorFilter ->
      Filter.view
        RNF.LightingColorFilter
        (function
         | Filter.Mul, CFI.Color input ->
           Some (LightingColorFilterProps.Mul input.Value)
         | Filter.Add, CFI.Color input ->
           Some (LightingColorFilterProps.Add input.Value)
         | _ -> None)

    | CIBoxBlur ->
      Filter.view
        RNF.CIBoxBlur
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIBoxBlurProps.InputRadius (input.Convert input.Value))
         | ResizeOutput value -> Some (CIBoxBlurProps.ResizeOutput value)
         | _ -> None)
         
    | CIDiscBlur ->
      Filter.view
        RNF.CIDiscBlur
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIDiscBlurProps.InputRadius (input.Convert input.Value))
         | ResizeOutput value -> Some (CIDiscBlurProps.ResizeOutput value)
         | _ -> None)
         
    | CIGaussianBlur ->
      Filter.view
        RNF.CIGaussianBlur
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIGaussianBlurProps.InputRadius (input.Convert input.Value))
         | ResizeOutput value -> Some (CIGaussianBlurProps.ResizeOutput value)
         | _ -> None)
         
    | CIMedianFilter -> emptyView RNF.CIMedianFilter
         
    | CIMotionBlur ->
      Filter.view
        RNF.CIMotionBlur
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIMotionBlurProps.InputRadius (input.Convert input.Value))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CIMotionBlurProps.InputAngle (input.Convert input.Value))
         | ResizeOutput value -> Some (CIMotionBlurProps.ResizeOutput value)
         | _ -> None)
         
    | CINoiseReduction ->
      Filter.view
        RNF.CINoiseReduction
        (function
         | Filter.InputNoiseLevel, CFI.Scalar input ->
           Some (CINoiseReductionProps.InputNoiseLevel (input.Convert input.Value))
         | Filter.InputSharpness, CFI.Scalar input ->
           Some (CINoiseReductionProps.InputSharpness (input.Convert input.Value))
         | _ -> None)
         
    | CIZoomBlur ->
      Filter.view
        RNF.CIZoomBlur
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CIZoomBlurProps.InputCenter (input.Convert input.Value))
         | Filter.InputAmount, CFI.Distance input ->
           Some (CIZoomBlurProps.InputAmount (input.Convert input.Value))
         | ResizeOutput value -> Some (CIZoomBlurProps.ResizeOutput value)
         | _ -> None)
         
    | CIColorClamp ->
      Filter.view
        RNF.CIColorClamp
        (function
         | Filter.InputMinComponents, CFI.RGBAVector input ->
           Some (CIColorClampProps.InputMinComponents (input.Convert input.Value))
         | Filter.InputMaxComponents, CFI.RGBAVector input ->
           Some (CIColorClampProps.InputMaxComponents (input.Convert input.Value))
         | _ -> None)
         
    | CIColorControls ->
      Filter.view
        RNF.CIColorControls
        (function
         | Filter.InputSaturation, CFI.Scalar input ->
           Some (CIColorControlsProps.InputSaturation (input.Convert input.Value))
         | Filter.InputBrightness, CFI.Scalar input ->
           Some (CIColorControlsProps.InputBrightness (input.Convert input.Value))
         | Filter.InputContrast, CFI.Scalar input ->
           Some (CIColorControlsProps.InputContrast (input.Convert input.Value))
         | _ -> None)

    | CIColorMatrix ->
      Filter.view
        RNF.CIColorMatrix
        (function
         | Filter.InputRVector, CFI.RGBAVector input ->
           Some (CIColorMatrixProps.InputRVector (input.Convert input.Value))
         | Filter.InputGVector, CFI.RGBAVector input ->
           Some (CIColorMatrixProps.InputGVector (input.Convert input.Value))
         | Filter.InputBVector, CFI.RGBAVector input ->
           Some (CIColorMatrixProps.InputBVector (input.Convert input.Value))
         | Filter.InputAVector, CFI.RGBAVector input ->
           Some (CIColorMatrixProps.InputAVector (input.Convert input.Value))
         | Filter.InputBiasVector, CFI.RGBAVector input ->
           Some (CIColorMatrixProps.InputBiasVector (input.Convert input.Value))
         | _ -> None)

    | CIGammaAdjust ->
      Filter.view
        RNF.CIGammaAdjust
        (function
         | Filter.InputPower, CFI.Scalar input ->
           Some (CIGammaAdjustProps.InputPower (input.Convert input.Value))
         | _ -> None)

    | CIHueAdjust ->
      Filter.view
        RNF.CIHueAdjust
        (function
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CIHueAdjustProps.InputAngle (input.Convert input.Value))
         | _ -> None)
         
    | CIMaskToAlpha -> emptyView RNF.CIMaskToAlpha
         
    | CIMaximumComponent -> emptyView RNF.CIMaximumComponent
         
    | CIMinimumComponent -> emptyView RNF.CIMinimumComponent
         
    | CIPhotoEffectChrome -> emptyView RNF.CIPhotoEffectChrome
         
    | CIPhotoEffectFade -> emptyView RNF.CIPhotoEffectFade
         
    | CIPhotoEffectInstant -> emptyView RNF.CIPhotoEffectInstant
         
    | CIPhotoEffectMono -> emptyView RNF.CIPhotoEffectMono
         
    | CIPhotoEffectNoir -> emptyView RNF.CIPhotoEffectNoir
         
    | CIPhotoEffectProcess -> emptyView RNF.CIPhotoEffectProcess
         
    | CIPhotoEffectTonal -> emptyView RNF.CIPhotoEffectTonal
         
    | CIPhotoEffectTransfer -> emptyView RNF.CIPhotoEffectTransfer

    | CIVignetteEffect ->
      Filter.view
        RNF.CIVignetteEffect
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CIVignetteEffectProps.InputCenter (input.Convert input.Value))
         | Filter.InputIntensity, CFI.Scalar input ->
           Some (CIVignetteEffectProps.InputIntensity (input.Convert input.Value))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIVignetteEffectProps.InputRadius (input.Convert input.Value))
         | _ -> None)
         
    | CIColorInvert -> emptyView RNF.CIColorInvert
         
    | CIColorPosterize ->
      Filter.view
        RNF.CIColorPosterize
        (function
         | Filter.InputLevels, CFI.Scalar input ->
           Some (CIColorPosterizeProps.InputLevels (input.Convert input.Value))
         | _ -> None)
         
    | CIVibrance ->
      Filter.view
        RNF.CIVibrance
        (function
         | Filter.InputAmount, CFI.Scalar input ->
           Some (CIVibranceProps.InputAmount (input.Convert input.Value))
         | _ -> None)
         
    | CICircularScreen ->
      Filter.view
        RNF.CICircularScreen
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CICircularScreenProps.InputCenter (input.Convert input.Value))
         | Filter.InputSharpness, CFI.Scalar input ->
           Some (CICircularScreenProps.InputSharpness (input.Convert input.Value))
         | Filter.InputWidth, CFI.Distance input ->
           Some (CICircularScreenProps.InputWidth (input.Convert input.Value))
         | _ -> None)
         
    | CIDotScreen ->
      Filter.view
        RNF.CIDotScreen
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CIDotScreenProps.InputCenter (input.Convert input.Value))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CIDotScreenProps.InputAngle (input.Convert input.Value))
         | Filter.InputSharpness, CFI.Scalar input ->
           Some (CIDotScreenProps.InputSharpness (input.Convert input.Value))
         | Filter.InputWidth, CFI.Distance input ->
           Some (CIDotScreenProps.InputWidth (input.Convert input.Value))
         | _ -> None)
         
    | CIBumpDistortion ->
      Filter.view
        RNF.CIBumpDistortion
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CIBumpDistortionProps.InputCenter (input.Convert input.Value))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIBumpDistortionProps.InputRadius (input.Convert input.Value))
         | Filter.InputScale, CFI.Scalar input ->
           Some (CIBumpDistortionProps.InputScale (input.Convert input.Value))
         | ResizeOutput value -> Some (CIBumpDistortionProps.ResizeOutput value)
         | _ -> None)
         
    | CIBumpDistortionLinear ->
      Filter.view
        RNF.CIBumpDistortionLinear
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CIBumpDistortionLinearProps.InputCenter (input.Convert input.Value))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIBumpDistortionLinearProps.InputRadius (input.Convert input.Value))
         | Filter.InputScale, CFI.Scalar input ->
           Some (CIBumpDistortionLinearProps.InputScale (input.Convert input.Value))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CIBumpDistortionLinearProps.InputAngle (input.Convert input.Value))
         | _ -> None)
         
    | CICircleSplashDistortion ->
      Filter.view
        RNF.CICircleSplashDistortion
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CICircleSplashDistortionProps.InputCenter (input.Convert input.Value))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CICircleSplashDistortionProps.InputRadius (input.Convert input.Value))
         | _ -> None)
         
    | CICircularWrap ->
      Filter.view
        RNF.CICircularWrap
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CICircularWrapProps.InputCenter (input.Convert input.Value))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CICircularWrapProps.InputRadius (input.Convert input.Value))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CICircularWrapProps.InputAngle (input.Convert input.Value))
         | ResizeOutput value -> Some (CICircularWrapProps.ResizeOutput value)
         | _ -> None)
         
    | CIVortexDistortion ->
      Filter.view
        RNF.CIVortexDistortion
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CIVortexDistortionProps.InputCenter (input.Convert input.Value))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIVortexDistortionProps.InputRadius (input.Convert input.Value))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CIVortexDistortionProps.InputAngle (input.Convert input.Value))
         | ResizeOutput value -> Some (CIVortexDistortionProps.ResizeOutput value)
         | _ -> None)
         
    | CISharpenLuminance ->
      Filter.view
        RNF.CISharpenLuminance
        (function
         | Filter.InputSharpness, CFI.Scalar input ->
           Some (CISharpenLuminanceProps.InputSharpness (input.Convert input.Value))
         | _ -> None)
         
    | CIUnsharpMask ->
      Filter.view
        RNF.CIUnsharpMask
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIUnsharpMaskProps.InputRadius (input.Convert input.Value))
         | Filter.InputIntensity, CFI.Scalar input ->
           Some (CIUnsharpMaskProps.InputIntensity (input.Convert input.Value))
         | _ -> None)
         
    | CICrystallize ->
      Filter.view
        RNF.CICrystallize
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CICrystallizeProps.InputRadius (input.Convert input.Value))
         | Filter.InputCenter, CFI.Point input ->
           Some (CICrystallizeProps.InputCenter (input.Convert input.Value))
         | _ -> None)
         
    | CIEdges ->
      Filter.view
        RNF.CIEdges
        (function
         | Filter.InputIntensity, CFI.Scalar input ->
           Some (CIEdgesProps.InputIntensity (input.Convert input.Value))
         | _ -> None)
         
    | CIPixellate ->
      Filter.view
        RNF.CIPixellate
        (function
         | Filter.InputScale, CFI.Distance input ->
           Some (CIPixellateProps.InputScale (input.Convert input.Value))
         | Filter.InputCenter, CFI.Point input ->
           Some (CIPixellateProps.InputCenter (input.Convert input.Value))
         | _ -> None)
         
    | CIPointillize ->
      Filter.view
        RNF.CIPointillize
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIPointillizeProps.InputRadius (input.Convert input.Value))
         | Filter.InputCenter, CFI.Point input ->
           Some (CIPointillizeProps.InputCenter (input.Convert input.Value))
         | _ -> None)
         
    | CIOpTile ->
      Filter.view
        RNF.CIOpTile
        (function
         | Filter.InputWidth, CFI.Distance input ->
           Some (CIOpTileProps.InputWidth (input.Convert input.Value))
         | Filter.InputCenter, CFI.Point input ->
           Some (CIOpTileProps.InputCenter (input.Convert input.Value))
         | Filter.InputScale, CFI.Scalar input ->
           Some (CIOpTileProps.InputScale (input.Convert input.Value))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CIOpTileProps.InputAngle (input.Convert input.Value))
         | ResizeOutput value -> Some (CIOpTileProps.ResizeOutput value)
         | _ -> None)

  let controls =
    function
    | Normal -> Filter.controls (name Normal)
    | Saturate -> Filter.controls (name Saturate)
    | HueRotate -> Filter.controls (name HueRotate)
    | LuminanceToAlpha -> Filter.controls (name LuminanceToAlpha)
    | Invert -> Filter.controls (name Invert)
    | Grayscale -> Filter.controls (name Grayscale)
    | Sepia -> Filter.controls (name Sepia)
    | Nightvision -> Filter.controls (name Nightvision)
    | Warm -> Filter.controls (name Warm)
    | Cool -> Filter.controls (name Cool)
    | Brightness -> Filter.controls (name Brightness)
    | Exposure -> Filter.controls (name Exposure)
    | Contrast -> Filter.controls (name Contrast)
    | Temperature -> Filter.controls (name Temperature)
    | Tint -> Filter.controls (name Tint)
    | Threshold -> Filter.controls (name Threshold)
    | Protanomaly -> Filter.controls (name Protanomaly)
    | Deuteranomaly -> Filter.controls (name Deuteranomaly)
    | Tritanomaly -> Filter.controls (name Tritanomaly)
    | Protanopia -> Filter.controls (name Protanopia)
    | Deuteranopia -> Filter.controls (name Deuteranopia)
    | Tritanopia -> Filter.controls (name Tritanopia)
    | Achromatopsia -> Filter.controls (name Achromatopsia)
    | Achromatomaly -> Filter.controls (name Achromatomaly)
    | RoundAsCircle -> Filter.controls (name RoundAsCircle)
    | IterativeBoxBlur -> Filter.controls (name IterativeBoxBlur)
    | LightingColorFilter -> Filter.controls (name LightingColorFilter)
    | CIBoxBlur -> Filter.controls (name CIBoxBlur)
    | CIDiscBlur -> Filter.controls (name CIDiscBlur)
    | CIGaussianBlur -> Filter.controls (name CIGaussianBlur)
    | CIMedianFilter -> Filter.controls (name CIMedianFilter)
    | CIMotionBlur -> Filter.controls (name CIMotionBlur)
    | CINoiseReduction -> Filter.controls (name CINoiseReduction)
    | CIZoomBlur -> Filter.controls (name CIZoomBlur)
    | CIColorClamp -> Filter.controls (name CIColorClamp)
    | CIColorControls -> Filter.controls (name CIColorControls)
    | CIColorMatrix -> Filter.controls (name CIColorMatrix)
    | CIGammaAdjust -> Filter.controls (name CIGammaAdjust)
    | CIHueAdjust -> Filter.controls (name CIHueAdjust)
    | CIMaskToAlpha -> Filter.controls (name CIMaskToAlpha)
    | CIMaximumComponent -> Filter.controls (name CIMaximumComponent)
    | CIMinimumComponent -> Filter.controls (name CIMinimumComponent)
    | CIPhotoEffectChrome -> Filter.controls (name CIPhotoEffectChrome)
    | CIPhotoEffectFade -> Filter.controls (name CIPhotoEffectFade)
    | CIPhotoEffectInstant -> Filter.controls (name CIPhotoEffectInstant)
    | CIPhotoEffectMono -> Filter.controls (name CIPhotoEffectMono)
    | CIPhotoEffectNoir -> Filter.controls (name CIPhotoEffectNoir)
    | CIPhotoEffectProcess -> Filter.controls (name CIPhotoEffectProcess)
    | CIPhotoEffectTonal -> Filter.controls (name CIPhotoEffectTonal)
    | CIPhotoEffectTransfer -> Filter.controls (name CIPhotoEffectTransfer)
    | CIVignetteEffect -> Filter.controls (name CIVignetteEffect)
    | CIColorInvert -> Filter.controls (name CIColorInvert)
    | CIColorPosterize -> Filter.controls (name CIColorPosterize)
    | CIVibrance -> Filter.controls (name CIVibrance)
    | CICircularScreen -> Filter.controls (name CICircularScreen)
    | CIDotScreen -> Filter.controls (name CIDotScreen)
    | CIBumpDistortion -> Filter.controls (name CIBumpDistortion)
    | CIBumpDistortionLinear -> Filter.controls (name CIBumpDistortionLinear)
    | CICircleSplashDistortion -> Filter.controls (name CICircleSplashDistortion)
    | CICircularWrap -> Filter.controls (name CICircularWrap)
    | CIVortexDistortion -> Filter.controls (name CIVortexDistortion)
    | CISharpenLuminance -> Filter.controls (name CISharpenLuminance)
    | CIUnsharpMask -> Filter.controls (name CIUnsharpMask)
    | CICrystallize -> Filter.controls (name CICrystallize)
    | CIEdges -> Filter.controls (name CIEdges)
    | CIPixellate -> Filter.controls (name CIPixellate)
    | CIPointillize -> Filter.controls (name CIPointillize)
    | CIOpTile -> Filter.controls (name CIOpTile)

  let private availableCommonFilters: GroupedModel array =
    [| ColorMatrix,
       [| Normal
          Saturate
          HueRotate
          LuminanceToAlpha
          Invert
          Grayscale
          Sepia
          Nightvision
          Warm
          Cool
          Brightness
          Exposure
          Contrast
          Temperature
          Tint
          Threshold
          Protanomaly
          Deuteranomaly
          Tritanomaly
          Protanopia
          Deuteranopia
          Tritanopia
          Achromatopsia
          Achromatomaly |] |]

  let private availableAndroidFilters: GroupedModel array =
    Array.concat
      [ availableCommonFilters
        [| Android,
           [| RoundAsCircle
              IterativeBoxBlur
              LightingColorFilter |] |] ]

  let private availableIosFilters =
    Array.concat
      [ availableCommonFilters

        [| CICategoryBlur,
           [| CIBoxBlur
              CIDiscBlur
              CIGaussianBlur
              CIMedianFilter
              CIMotionBlur
              CINoiseReduction
              CIZoomBlur |];

            CICategoryColorAdjustment,
            [| CIColorClamp
               CIColorControls
               CIColorMatrix
               CIGammaAdjust
               CIHueAdjust
               CIVibrance |];
                
            CICategoryColorEffect,
            [| CIColorInvert
               CIColorPosterize
               CIMaskToAlpha
               CIMaximumComponent
               CIMinimumComponent
               CIPhotoEffectChrome
               CIPhotoEffectFade
               CIPhotoEffectInstant
               CIPhotoEffectMono
               CIPhotoEffectNoir
               CIPhotoEffectProcess
               CIPhotoEffectTonal
               CIPhotoEffectTransfer
               CIVignetteEffect |];
               
            CICategoryCompositeOperation,
            [| |];
            
            CICategoryDistortionEffect,
            [| CIBumpDistortion
               CIBumpDistortionLinear
               CICircleSplashDistortion
               CICircularWrap
               CIVortexDistortion |];
            
            CICategoryGenerator,
            [| |];
            
            CICategoryGeometryAdjustment,
            [| |];
            
            CICategoryGradient,
            [| |];
            
            CICategoryHalftoneEffect,
            [| CICircularScreen
               CIDotScreen |];
               
            CICategoryReduction,
            [| |];
            
            CICategorySharpen,
            [| CISharpenLuminance
               CIUnsharpMask |];
               
            CICategoryStylize,
            [| CICrystallize
               CIEdges
               CIPixellate
               CIPointillize |];
            
            CICategoryTileEffect,
            [| CIOpTile |];
            
            CICategoryTransition,
            [| |] |] ]

  let availableFilters =
    Platform.select
      [ Platform.Ios availableIosFilters
        Platform.Android availableAndroidFilters ]
