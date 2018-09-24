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

  type Model =
    | Normal
    | RGBA
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
    | Technicolor
    | Polaroid
    | ToBGR
    | Kodachrome
    | Browni
    | Vintage
    | Night
    | Predator
    | Lsd
    | ColorTone
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
    | CIMaskedVariableBlur
    | CIMedianFilter
    | CIMotionBlur
    | CINoiseReduction
    | CIZoomBlur
    | CIColorClamp
    | CIColorControls
    | CIColorMatrix
    | CIColorPolynomial
    | CIExposureAdjust
    | CIGammaAdjust
    | CIHueAdjust
    | CILinearToSRGBToneCurve
    | CISRGBToneCurveToLinear
    | CITemperatureAndTint
    | CIToneCurve
    | CIVibrance
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
    | CISepiaTone
    | CIVignette
    | CIVignetteEffect
    | CIAdditionCompositing
    | CIColorInvert
    | CIColorMonochrome
    | CIColorPosterize
    | CICircularScreen
    | CIDotScreen
    | CILineScreen
    | CIBumpDistortion
    | CIBumpDistortionLinear
    | CICircleSplashDistortion
    | CICircularWrap
    | CIVortexDistortion
    | CIConstantColorGenerator
    | CIRandomGenerator
    | CISharpenLuminance
    | CIUnsharpMask
    | CICrystallize
    | CIEdges
    | CILineOverlay
    | CIPixellate
    | CIPointillize
    | CIOpTile


  let name =
    sprintf "%A"

  let private toPoint (x, y) =
    RNF.Point (RNF.Distance.WPct x, RNF.Distance.HPct y)

  let init model : Filter.Model =
    match model with
    | Normal -> Filter.init []

    | RGBA ->
      Filter.init
        [ Filter.Red, CFI.initScalar 0. 5. 1.
          Filter.Green, CFI.initScalar 0. 5. 1.
          Filter.Blue, CFI.initScalar 0. 5. 1.
          Filter.Alpha, CFI.initScalar 0. 5. 1. ]

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

    | Technicolor -> Filter.init []

    | Polaroid -> Filter.init []

    | ToBGR -> Filter.init []

    | Kodachrome -> Filter.init []

    | Browni -> Filter.init []

    | Vintage -> Filter.init []

    | Night -> Filter.init [ Filter.Value, CFI.initScalar -10. 10. 0.1 ]

    | Predator -> Filter.init [ Filter.Value, CFI.initScalar -10. 10. 1. ]

    | Lsd -> Filter.init []

    | ColorTone ->
      Filter.init
        [ Filter.Desaturation, CFI.initScalar -10. 10. 0.2
          Filter.Toned, CFI.initScalar -10. 10. 1.5
          Filter.LightColor, CFI.initColor "#ffe580"
          Filter.DarkColor, CFI.initColor "#338000" ]

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
        [ Filter.BlurRadius, CFI.initScalarStepper 1. 50. 5. 1.
          Filter.Iterations, CFI.initScalarStepper 1. 5. 3. 1. ]

    | LightingColorFilter ->
      Filter.init
        [ Filter.Mul, CFI.initColor "#ffffff"
          Filter.Add, CFI.initColor "#ffffff" ]

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

    | CIMaskedVariableBlur ->
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

    | CIColorPolynomial ->
      Filter.init
        [ (Filter.InputRedCoefficients,
           CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.) (0., 1., 0., 0.))
          (Filter.InputGreenCoefficients,
           CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.) (0., 1., 0., 0.))
          (Filter.InputBlueCoefficients,
           CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.) (0., 1., 0., 0.))
          (Filter.InputAlphaCoefficients,
           CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.) (0., 1., 0., 0.)) ]

    | CIExposureAdjust ->
      Filter.init
        [ Filter.InputEV, CFI.initScalar -5. 5. 0.5 ]

    | CIGammaAdjust ->
      Filter.init
        [ Filter.InputPower, CFI.initScalar 0. 10. 0.75 ]

    | CIHueAdjust ->
      Filter.init
        [ Filter.InputAngle, CFI.initScalar 0. (2. * Math.PI) 0. ]

    | CILinearToSRGBToneCurve -> Filter.init []

    | CISRGBToneCurveToLinear -> Filter.init []

    | CITemperatureAndTint ->
      Filter.init
        [ Filter.InputNeutral, CFI.initOffset (-10000., -1000.) (10000., 1000.) (6500., 0.)
          Filter.InputTargetNeutral, CFI.initOffset (-10000., -1000.) (10000., 1000.) (6500., 0.) ]

    | CIToneCurve ->
      Filter.init
        [ Filter.InputPoint0, CFI.initOffset (0., 0.) (1., 1.) (0., 0.)
          Filter.InputPoint1, CFI.initOffset (0., 0.) (1., 1.) (0.25, 0.25)
          Filter.InputPoint2, CFI.initOffset (0., 0.) (1., 1.) (0.5, 0.5)
          Filter.InputPoint3, CFI.initOffset (0., 0.) (1., 1.) (0.75, 0.75)
          Filter.InputPoint4, CFI.initOffset (0., 0.) (1., 1.) (1., 1.) ]

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

    | CISepiaTone ->
      Filter.init
        [ Filter.InputIntensity, CFI.initScalar -10. 10. 1. ]

    | CIVignette ->
      Filter.init
        [ Filter.InputIntensity, CFI.initScalar 0. 1. 1.
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 100. 0. ]

    | CIVignetteEffect ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.)
          Filter.InputIntensity, CFI.initScalar 0. 1. 1.
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 100. 0. ]

    | CIAdditionCompositing -> Filter.init []

    | CIColorInvert -> Filter.init []

    | CIColorMonochrome ->
      Filter.init
        [ Filter.InputColor, CFI.initColor "#ffffff"
          Filter.InputIntensity, CFI.initScalar -1. 10. 1. ]

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
          Filter.InputWidth, CFI.initDistance RNF.Distance.MaxPct 0. 100. 10. ]

    | CIDotScreen ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.) (50., 50.)
          Filter.InputAngle, CFI.initScalar 0. (2. * Math.PI) 0.
          Filter.InputSharpness, CFI.initScalar 0. 1. 0.7
          Filter.InputWidth, CFI.initDistance RNF.Distance.MaxPct 0. 50. 10. ]

    | CILineScreen ->
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

    | CIConstantColorGenerator ->
      Filter.init
        [ Filter.InputColor, CFI.initColor "#ffffff" ]

    | CIRandomGenerator -> Filter.init []

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

    | CILineOverlay ->
      Filter.init
        [ Filter.InputNRNoiseLevel, CFI.initScalar 0. 5. 0.07
          Filter.InputNRSharpness, CFI.initScalar 0. 5. 0.71
          Filter.InputEdgeIntensity, CFI.initScalar 0. 5. 1.
          Filter.InputThreshold, CFI.initScalar 0. 1. 0.1
          Filter.InputContrast, CFI.initScalar 0. 100. 50. ]

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

    | RGBA ->
      Filter.view
        RNF.RGBA
        (function
         | Filter.Red, CFI.Scalar input ->
           Some (RGBAProps.Red (input.Convert input.Value))
         | Filter.Green, CFI.Scalar input ->
           Some (RGBAProps.Green (input.Convert input.Value))
         | Filter.Blue, CFI.Scalar input ->
           Some (RGBAProps.Blue (input.Convert input.Value))
         | Filter.Alpha, CFI.Scalar input ->
           Some (RGBAProps.Alpha (input.Convert input.Value))
         | _ -> None)

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

    | Technicolor -> emptyView RNF.Technicolor

    | Polaroid -> emptyView RNF.Polaroid

    | ToBGR -> emptyView RNF.ToBGR

    | Kodachrome -> emptyView RNF.Kodachrome

    | Browni -> emptyView RNF.Browni

    | Vintage -> emptyView RNF.Vintage

    | Night ->
      Filter.view
        RNF.Night
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (NightProps.Value (input.Convert input.Value))
         | _ -> None)

    | Predator ->
      Filter.view
        RNF.Predator
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (PredatorProps.Value (input.Convert input.Value))
         | _ -> None)

    | Lsd -> emptyView RNF.Lsd

    | ColorTone ->
      Filter.view
        RNF.ColorTone
        (function
         | Filter.Desaturation, CFI.Scalar input ->
           Some (ColorToneProps.Desaturation (input.Convert input.Value))
         | Filter.Toned, CFI.Scalar input ->
           Some (ColorToneProps.Toned (input.Convert input.Value))
         | Filter.DarkColor, CFI.Color input ->
           Some (ColorToneProps.DarkColor input.Value)
         | Filter.LightColor, CFI.Color input ->
           Some (ColorToneProps.LightColor input.Value)
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
         
    | CIMaskedVariableBlur ->
      Filter.view
        RNF.CIMaskedVariableBlur
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIMaskedVariableBlurProps.InputRadius (input.Convert input.Value))
         | ResizeOutput value -> Some (CIMaskedVariableBlurProps.ResizeOutput value)
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

    | CIColorPolynomial ->
      Filter.view
        RNF.CIColorPolynomial
        (function
         | Filter.InputRedCoefficients, CFI.RGBAVector input ->
           Some (CIColorPolynomialProps.InputRedCoefficients (input.Convert input.Value))
         | Filter.InputGreenCoefficients, CFI.RGBAVector input ->
           Some (CIColorPolynomialProps.InputGreenCoefficients (input.Convert input.Value))
         | Filter.InputBlueCoefficients, CFI.RGBAVector input ->
           Some (CIColorPolynomialProps.InputBlueCoefficients (input.Convert input.Value))
         | Filter.InputAlphaCoefficients, CFI.RGBAVector input ->
           Some (CIColorPolynomialProps.InputAlphaCoefficients (input.Convert input.Value))
         | _ -> None)

    | CIExposureAdjust ->
      Filter.view
        RNF.CIExposureAdjust
        (function
         | Filter.InputEV, CFI.Scalar input ->
           Some (CIExposureAdjustProps.InputEV (input.Convert input.Value))
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
         
    | CILinearToSRGBToneCurve -> emptyView RNF.CIMaskToAlpha
         
    | CISRGBToneCurveToLinear -> emptyView RNF.CIMaskToAlpha

    | CITemperatureAndTint ->
      Filter.view
        RNF.CITemperatureAndTint
        (function
         | Filter.InputNeutral, CFI.Offset input ->
           Some (CITemperatureAndTintProps.InputNeutral (input.Convert input.Value))
         | Filter.InputTargetNeutral, CFI.Offset input ->
           Some (CITemperatureAndTintProps.InputTargetNeutral (input.Convert input.Value))
         | _ -> None)

    | CIToneCurve ->
      Filter.view
        RNF.CIToneCurve
        (function
         | Filter.InputPoint0, CFI.Offset input ->
           Some (CIToneCurveProps.InputPoint0 (input.Convert input.Value))
         | Filter.InputPoint1, CFI.Offset input ->
           Some (CIToneCurveProps.InputPoint1 (input.Convert input.Value))
         | Filter.InputPoint2, CFI.Offset input ->
           Some (CIToneCurveProps.InputPoint2 (input.Convert input.Value))
         | Filter.InputPoint3, CFI.Offset input ->
           Some (CIToneCurveProps.InputPoint3 (input.Convert input.Value))
         | Filter.InputPoint4, CFI.Offset input ->
           Some (CIToneCurveProps.InputPoint4 (input.Convert input.Value))
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

    | CISepiaTone ->
      Filter.view
        RNF.CISepiaTone
        (function
         | Filter.InputIntensity, CFI.Scalar input ->
           Some (CISepiaToneProps.InputIntensity (input.Convert input.Value))
         | _ -> None)

    | CIVignette ->
      Filter.view
        RNF.CIVignette
        (function
         | Filter.InputIntensity, CFI.Scalar input ->
           Some (CIVignetteProps.InputIntensity (input.Convert input.Value))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIVignetteProps.InputRadius (input.Convert input.Value))
         | _ -> None)

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
         
    | CIAdditionCompositing -> emptyView RNF.CIAdditionCompositing

    | CIColorInvert -> emptyView RNF.CIColorInvert
         
    | CIColorMonochrome ->
      Filter.view
        RNF.CIColorMonochrome
        (function
         | Filter.InputColor, CFI.Color input ->
           Some (CIColorMonochromeProps.InputColor input.Value)
         | Filter.InputIntensity, CFI.Scalar input ->
           Some (CIColorMonochromeProps.InputIntensity (input.Convert input.Value))
         | _ -> None)
         
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
         
    | CILineScreen ->
      Filter.view
        RNF.CILineScreen
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CILineScreenProps.InputCenter (input.Convert input.Value))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CILineScreenProps.InputAngle (input.Convert input.Value))
         | Filter.InputSharpness, CFI.Scalar input ->
           Some (CILineScreenProps.InputSharpness (input.Convert input.Value))
         | Filter.InputWidth, CFI.Distance input ->
           Some (CILineScreenProps.InputWidth (input.Convert input.Value))
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
         
    | CIConstantColorGenerator ->
      Filter.view
        RNF.CIConstantColorGenerator
        (function
         | Filter.InputColor, CFI.Color input ->
           Some (CIConstantColorGeneratorProps.InputColor input.Value)
         | _ -> None)

    | CIRandomGenerator -> emptyView RNF.CIRandomGenerator
         
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
         
    | CILineOverlay ->
      Filter.view
        RNF.CILineOverlay
        (function
         | Filter.InputNRNoiseLevel, CFI.Scalar input ->
           Some (CILineOverlayProps.InputNRNoiseLevel (input.Convert input.Value))
         | Filter.InputNRSharpness, CFI.Scalar input ->
           Some (CILineOverlayProps.InputNRSharpness (input.Convert input.Value))
         | Filter.InputEdgeIntensity, CFI.Scalar input ->
           Some (CILineOverlayProps.InputEdgeIntensity (input.Convert input.Value))
         | Filter.InputThreshold, CFI.Scalar input ->
           Some (CILineOverlayProps.InputThreshold (input.Convert input.Value))
         | Filter.InputContrast, CFI.Scalar input ->
           Some (CILineOverlayProps.InputContrast (input.Convert input.Value))
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


  let requiredImagesAmount =
    function
    | CIMaskedVariableBlur
    | CIAdditionCompositing -> 2
    | CIConstantColorGenerator
    | CIRandomGenerator -> 0
    | _ -> 1

  let isPersistent model =
    requiredImagesAmount model <> 1


  let controls model =
    let ctrl =
      match model with
      | Normal -> Filter.controls (name Normal)
      | RGBA -> Filter.controls (name RGBA)
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
      | Technicolor -> Filter.controls (name Technicolor)
      | Polaroid -> Filter.controls (name Polaroid)
      | ToBGR -> Filter.controls (name ToBGR)
      | Kodachrome -> Filter.controls (name Kodachrome)
      | Browni -> Filter.controls (name Browni)
      | Vintage -> Filter.controls (name Vintage)
      | Night -> Filter.controls (name Night)
      | Predator -> Filter.controls (name Predator)
      | Lsd -> Filter.controls (name Lsd)
      | ColorTone -> Filter.controls (name ColorTone)
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
      | CIMaskedVariableBlur -> Filter.controls (name CIMaskedVariableBlur)
      | CIMedianFilter -> Filter.controls (name CIMedianFilter)
      | CIMotionBlur -> Filter.controls (name CIMotionBlur)
      | CINoiseReduction -> Filter.controls (name CINoiseReduction)
      | CIZoomBlur -> Filter.controls (name CIZoomBlur)
      | CIColorClamp -> Filter.controls (name CIColorClamp)
      | CIColorControls -> Filter.controls (name CIColorControls)
      | CIColorMatrix -> Filter.controls (name CIColorMatrix)
      | CIColorPolynomial -> Filter.controls (name CIColorPolynomial)
      | CIExposureAdjust -> Filter.controls (name CIExposureAdjust)
      | CIGammaAdjust -> Filter.controls (name CIGammaAdjust)
      | CIHueAdjust -> Filter.controls (name CIHueAdjust)
      | CILinearToSRGBToneCurve -> Filter.controls (name CILinearToSRGBToneCurve)
      | CISRGBToneCurveToLinear -> Filter.controls (name CISRGBToneCurveToLinear)
      | CITemperatureAndTint -> Filter.controls (name CITemperatureAndTint)
      | CIToneCurve -> Filter.controls (name CIToneCurve)
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
      | CISepiaTone -> Filter.controls (name CISepiaTone)
      | CIVignette -> Filter.controls (name CIVignette)
      | CIVignetteEffect -> Filter.controls (name CIVignetteEffect)
      | CIAdditionCompositing -> Filter.controls (name CIAdditionCompositing)
      | CIColorInvert -> Filter.controls (name CIColorInvert)
      | CIColorMonochrome -> Filter.controls (name CIColorMonochrome)
      | CIColorPosterize -> Filter.controls (name CIColorPosterize)
      | CIVibrance -> Filter.controls (name CIVibrance)
      | CICircularScreen -> Filter.controls (name CICircularScreen)
      | CIDotScreen -> Filter.controls (name CIDotScreen)
      | CILineScreen -> Filter.controls (name CILineScreen)
      | CIBumpDistortion -> Filter.controls (name CIBumpDistortion)
      | CIBumpDistortionLinear -> Filter.controls (name CIBumpDistortionLinear)
      | CICircleSplashDistortion -> Filter.controls (name CICircleSplashDistortion)
      | CICircularWrap -> Filter.controls (name CICircularWrap)
      | CIVortexDistortion -> Filter.controls (name CIVortexDistortion)
      | CIConstantColorGenerator -> Filter.controls (name CIConstantColorGenerator)
      | CIRandomGenerator -> Filter.controls (name CIRandomGenerator)
      | CISharpenLuminance -> Filter.controls (name CISharpenLuminance)
      | CIUnsharpMask -> Filter.controls (name CIUnsharpMask)
      | CICrystallize -> Filter.controls (name CICrystallize)
      | CIEdges -> Filter.controls (name CIEdges)
      | CILineOverlay -> Filter.controls (name CILineOverlay)
      | CIPixellate -> Filter.controls (name CIPixellate)
      | CIPointillize -> Filter.controls (name CIPointillize)
      | CIOpTile -> Filter.controls (name CIOpTile)
    
    ctrl (isPersistent model)
