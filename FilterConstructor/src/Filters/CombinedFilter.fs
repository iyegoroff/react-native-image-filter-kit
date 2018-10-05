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
module CFAI = CombinedFilterArrayInput

module CombinedFilter =

  type Model =
    | Normal
    | RGBA
    | Saturate
    | HueRotate
    | LuminanceToAlpha
    | Invert
    | BlackAndWhite
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
    | DuoTone
    | Protanomaly
    | Deuteranomaly
    | Tritanomaly
    | Protanopia
    | Deuteranopia
    | Tritanopia
    | Achromatopsia
    | Achromatomaly
    | RoundAsCircle
    | Color
    | LinearGradient
    | RadialGradient
    | SweepGradient
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
    | CILightenBlendMode
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

    | BlackAndWhite -> Filter.init []

    | Grayscale ->
      Filter.init
        [ Filter.Value, CFI.initScalar 0. 1. 1. ]

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

    | DuoTone ->
      Filter.init
        [ Filter.FirstColor, CFI.initColor "#ffe580"
          Filter.SecondColor, CFI.initColor "#338000" ]

    | Protanomaly -> Filter.init []

    | Deuteranomaly -> Filter.init []

    | Tritanomaly -> Filter.init []

    | Protanopia -> Filter.init []

    | Deuteranopia -> Filter.init []

    | Tritanopia -> Filter.init []

    | Achromatopsia -> Filter.init []

    | Achromatomaly -> Filter.init []

    | RoundAsCircle -> Filter.init []

    | Color ->
      Filter.init
        [ Filter.Color, CFI.initColor "#ffffff" ]

    | LinearGradient ->
      Filter.init
        [ Filter.X0, CFI.initDistance RNF.Distance.WPct 0. 100. 0. 
          Filter.Y0, CFI.initDistance RNF.Distance.HPct 0. 100. 0.
          Filter.X1, CFI.initDistance RNF.Distance.WPct 0. 100. 100.
          Filter.Y1, CFI.initDistance RNF.Distance.HPct 0. 100. 0.
          Filter.Colors,
          CFI.initColorArray "#ffffff"
            [ FilterColorInput.init "#ff0000"
              FilterColorInput.init "#0000ff" ]
          Filter.Locations,
          CFI.initScalarArray 0. 1. 0.
            [ FilterScalarInput.init 0. 1. 0.
              FilterScalarInput.init 0. 1. 1. ]
          Filter.Tile,
          CFI.initEnum (sprintf "%A" CLAMP) ([ CLAMP; REPEAT; MIRROR ] |> List.map (sprintf "%A")) ]

    | RadialGradient ->
      Filter.init
        [ Filter.CenterX, CFI.initDistance RNF.Distance.WPct 0. 100. 50. 
          Filter.CenterY, CFI.initDistance RNF.Distance.HPct 0. 100. 50.
          Filter.Radius, CFI.initDistance RNF.Distance.MinPct 0. 100. 50.
          Filter.Colors,
          CFI.initColorArray "#ffffff"
            [ FilterColorInput.init "#ff0000"
              FilterColorInput.init "#0000ff" ]
          Filter.Stops,
          CFI.initScalarArray 0. 1. 0.
            [ FilterScalarInput.init 0. 1. 0.
              FilterScalarInput.init 0. 1. 1. ]
          Filter.TileMode,
          CFI.initEnum (sprintf "%A" CLAMP) ([ CLAMP; REPEAT; MIRROR ] |> List.map (sprintf "%A")) ]

    | SweepGradient ->
      Filter.init
        [ Filter.Cx, CFI.initDistance RNF.Distance.WPct 0. 100. 50. 
          Filter.Cy, CFI.initDistance RNF.Distance.HPct 0. 100. 50.
          Filter.Colors,
          CFI.initColorArray "#ffffff"
            [ FilterColorInput.init "#ff0000"
              FilterColorInput.init "#0000ff" ]
          Filter.Positions,
          CFI.initScalarArray 0. 1. 0.
            [ FilterScalarInput.init 0. 1. 0.
              FilterScalarInput.init 0. 1. 1. ] ]

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

    | CILightenBlendMode -> Filter.init []

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
           Some (RGBAProps.Red (FilterRangeInput.convert input))
         | Filter.Green, CFI.Scalar input ->
           Some (RGBAProps.Green (FilterRangeInput.convert input))
         | Filter.Blue, CFI.Scalar input ->
           Some (RGBAProps.Blue (FilterRangeInput.convert input))
         | Filter.Alpha, CFI.Scalar input ->
           Some (RGBAProps.Alpha (FilterRangeInput.convert input))
         | _ -> None)

    | Saturate ->
      Filter.view
        RNF.Saturate
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (SaturateProps.Value (FilterRangeInput.convert input))
         | _ -> None)

    | HueRotate ->
      Filter.view
        RNF.HueRotate
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (HueRotateProps.Value (FilterRangeInput.convert input))
         | _ -> None)

    | LuminanceToAlpha -> emptyView RNF.LuminanceToAlpha

    | Invert -> emptyView RNF.Invert

    | BlackAndWhite -> emptyView RNF.BlackAndWhite

    | Grayscale ->
      Filter.view
        RNF.Grayscale
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (GrayscaleProps.Value (FilterRangeInput.convert input))
         | _ -> None)

    | Sepia -> emptyView RNF.Sepia

    | Nightvision -> emptyView RNF.Nightvision

    | Warm -> emptyView RNF.Warm

    | Cool -> emptyView RNF.Cool

    | Brightness ->
      Filter.view
        RNF.Brightness
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (BrightnessProps.Value (FilterRangeInput.convert input))
         | _ -> None)

    | Exposure ->
      Filter.view
        RNF.Exposure
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (ExposureProps.Value (FilterRangeInput.convert input))
         | _ -> None)

    | Contrast ->
      Filter.view
        RNF.Contrast
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (ContrastProps.Value (FilterRangeInput.convert input))
         | _ -> None)

    | Temperature ->
      Filter.view
        RNF.Temperature
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (TemperatureProps.Value (FilterRangeInput.convert input))
         | _ -> None)

    | Tint ->
      Filter.view
        RNF.Tint
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (TintProps.Value (FilterRangeInput.convert input))
         | _ -> None)

    | Threshold ->
      Filter.view
        RNF.Threshold
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (ThresholdProps.Value (FilterRangeInput.convert input))
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
           Some (NightProps.Value (FilterRangeInput.convert input))
         | _ -> None)

    | Predator ->
      Filter.view
        RNF.Predator
        (function
         | Filter.Value, CFI.Scalar input ->
           Some (PredatorProps.Value (FilterRangeInput.convert input))
         | _ -> None)

    | Lsd -> emptyView RNF.Lsd

    | ColorTone ->
      Filter.view
        RNF.ColorTone
        (function
         | Filter.Desaturation, CFI.Scalar input ->
           Some (ColorToneProps.Desaturation (FilterRangeInput.convert input))
         | Filter.Toned, CFI.Scalar input ->
           Some (ColorToneProps.Toned (FilterRangeInput.convert input))
         | Filter.DarkColor, CFI.Color input ->
           Some (ColorToneProps.DarkColor input.Value)
         | Filter.LightColor, CFI.Color input ->
           Some (ColorToneProps.LightColor input.Value)
         | _ -> None)

    | DuoTone ->
      Filter.view
        RNF.DuoTone
        (function
         | Filter.FirstColor, CFI.Color input ->
           Some (DuoToneProps.FirstColor input.Value)
         | Filter.SecondColor, CFI.Color input ->
           Some (DuoToneProps.SecondColor input.Value)
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

    | Color ->
      Filter.view
        RNF.Color
        (function
         | Filter.Color, CFI.Color input ->
           Some (ColorProps.Color input.Value)
         | _ -> None)

    | LinearGradient ->
      Filter.view
        RNF.LinearGradient
        (function
         | Filter.X0, CFI.Distance input ->
           Some (LinearGradientProps.X0 (FilterRangeInput.convert input))
         | Filter.Y0, CFI.Distance input ->
           Some (LinearGradientProps.Y0 (FilterRangeInput.convert input))
         | Filter.X1, CFI.Distance input ->
           Some (LinearGradientProps.X1 (FilterRangeInput.convert input))
         | Filter.Y1, CFI.Distance input ->
           Some (LinearGradientProps.Y1 (FilterRangeInput.convert input))
         | Filter.Colors, CFI.Array (CFAI.Color input) ->
           Some (LinearGradientProps.Colors (FilterColorArrayInput.convert input))
         | Filter.Locations, CFI.Array (CFAI.Scalar input) ->
           Some (LinearGradientProps.Locations (FilterScalarArrayInput.convert input))
         | Filter.Tile, CFI.Enum input ->
           Some (LinearGradientProps.Tile (EnumConverters.tileMode input.Value))
         | _ -> None)

    | RadialGradient ->
      Filter.view
        RNF.RadialGradient
        (function
         | Filter.CenterX, CFI.Distance input ->
           Some (RadialGradientProps.CenterX (FilterRangeInput.convert input))
         | Filter.CenterY, CFI.Distance input ->
           Some (RadialGradientProps.CenterY (FilterRangeInput.convert input))
         | Filter.Radius, CFI.Distance input ->
           Some (RadialGradientProps.Radius (FilterRangeInput.convert input))
         | Filter.Colors, CFI.Array (CFAI.Color input) ->
           Some (RadialGradientProps.Colors (FilterColorArrayInput.convert input))
         | Filter.Stops, CFI.Array (CFAI.Scalar input) ->
           Some (RadialGradientProps.Stops (FilterScalarArrayInput.convert input))
         | Filter.TileMode, CFI.Enum input ->
           Some (RadialGradientProps.TileMode (EnumConverters.tileMode input.Value))
         | _ -> None)

    | SweepGradient ->
      Filter.view
        RNF.SweepGradient
        (function
         | Filter.Cx, CFI.Distance input ->
           Some (SweepGradientProps.Cx (FilterRangeInput.convert input))
         | Filter.Cy, CFI.Distance input ->
           Some (SweepGradientProps.Cy (FilterRangeInput.convert input))
         | Filter.Colors, CFI.Array (CFAI.Color input) ->
           Some (SweepGradientProps.Colors (FilterColorArrayInput.convert input))
         | Filter.Positions, CFI.Array (CFAI.Scalar input) ->
           Some (SweepGradientProps.Positions (FilterScalarArrayInput.convert input))
         | _ -> None)

    | IterativeBoxBlur ->
      Filter.view
        RNF.IterativeBoxBlur
        (function
         | Filter.BlurRadius, CFI.Scalar input ->
           Some (IterativeBoxBlurProps.BlurRadius (FilterRangeInput.convert input))
         | Filter.Iterations, CFI.Scalar input ->
           Some (IterativeBoxBlurProps.Iterations (FilterRangeInput.convert input))
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
           Some (CIBoxBlurProps.InputRadius (FilterRangeInput.convert input))
         | ResizeOutput value -> Some (CIBoxBlurProps.ResizeOutput value)
         | _ -> None)
         
    | CIDiscBlur ->
      Filter.view
        RNF.CIDiscBlur
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIDiscBlurProps.InputRadius (FilterRangeInput.convert input))
         | ResizeOutput value -> Some (CIDiscBlurProps.ResizeOutput value)
         | _ -> None)
         
    | CIGaussianBlur ->
      Filter.view
        RNF.CIGaussianBlur
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIGaussianBlurProps.InputRadius (FilterRangeInput.convert input))
         | ResizeOutput value -> Some (CIGaussianBlurProps.ResizeOutput value)
         | _ -> None)
         
    | CIMaskedVariableBlur ->
      Filter.view
        RNF.CIMaskedVariableBlur
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIMaskedVariableBlurProps.InputRadius (FilterRangeInput.convert input))
         | ResizeOutput value -> Some (CIMaskedVariableBlurProps.ResizeOutput value)
         | _ -> None)
         
    | CIMedianFilter -> emptyView RNF.CIMedianFilter
         
    | CIMotionBlur ->
      Filter.view
        RNF.CIMotionBlur
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIMotionBlurProps.InputRadius (FilterRangeInput.convert input))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CIMotionBlurProps.InputAngle (FilterRangeInput.convert input))
         | ResizeOutput value -> Some (CIMotionBlurProps.ResizeOutput value)
         | _ -> None)
         
    | CINoiseReduction ->
      Filter.view
        RNF.CINoiseReduction
        (function
         | Filter.InputNoiseLevel, CFI.Scalar input ->
           Some (CINoiseReductionProps.InputNoiseLevel (FilterRangeInput.convert input))
         | Filter.InputSharpness, CFI.Scalar input ->
           Some (CINoiseReductionProps.InputSharpness (FilterRangeInput.convert input))
         | _ -> None)
         
    | CIZoomBlur ->
      Filter.view
        RNF.CIZoomBlur
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CIZoomBlurProps.InputCenter (FilterRangeInput.convert input))
         | Filter.InputAmount, CFI.Distance input ->
           Some (CIZoomBlurProps.InputAmount (FilterRangeInput.convert input))
         | ResizeOutput value -> Some (CIZoomBlurProps.ResizeOutput value)
         | _ -> None)
         
    | CIColorClamp ->
      Filter.view
        RNF.CIColorClamp
        (function
         | Filter.InputMinComponents, CFI.RGBAVector input ->
           Some (CIColorClampProps.InputMinComponents (FilterRangeInput.convert input))
         | Filter.InputMaxComponents, CFI.RGBAVector input ->
           Some (CIColorClampProps.InputMaxComponents (FilterRangeInput.convert input))
         | _ -> None)
         
    | CIColorControls ->
      Filter.view
        RNF.CIColorControls
        (function
         | Filter.InputSaturation, CFI.Scalar input ->
           Some (CIColorControlsProps.InputSaturation (FilterRangeInput.convert input))
         | Filter.InputBrightness, CFI.Scalar input ->
           Some (CIColorControlsProps.InputBrightness (FilterRangeInput.convert input))
         | Filter.InputContrast, CFI.Scalar input ->
           Some (CIColorControlsProps.InputContrast (FilterRangeInput.convert input))
         | _ -> None)

    | CIColorMatrix ->
      Filter.view
        RNF.CIColorMatrix
        (function
         | Filter.InputRVector, CFI.RGBAVector input ->
           Some (CIColorMatrixProps.InputRVector (FilterRangeInput.convert input))
         | Filter.InputGVector, CFI.RGBAVector input ->
           Some (CIColorMatrixProps.InputGVector (FilterRangeInput.convert input))
         | Filter.InputBVector, CFI.RGBAVector input ->
           Some (CIColorMatrixProps.InputBVector (FilterRangeInput.convert input))
         | Filter.InputAVector, CFI.RGBAVector input ->
           Some (CIColorMatrixProps.InputAVector (FilterRangeInput.convert input))
         | Filter.InputBiasVector, CFI.RGBAVector input ->
           Some (CIColorMatrixProps.InputBiasVector (FilterRangeInput.convert input))
         | _ -> None)

    | CIColorPolynomial ->
      Filter.view
        RNF.CIColorPolynomial
        (function
         | Filter.InputRedCoefficients, CFI.RGBAVector input ->
           Some (CIColorPolynomialProps.InputRedCoefficients (FilterRangeInput.convert input))
         | Filter.InputGreenCoefficients, CFI.RGBAVector input ->
           Some (CIColorPolynomialProps.InputGreenCoefficients (FilterRangeInput.convert input))
         | Filter.InputBlueCoefficients, CFI.RGBAVector input ->
           Some (CIColorPolynomialProps.InputBlueCoefficients (FilterRangeInput.convert input))
         | Filter.InputAlphaCoefficients, CFI.RGBAVector input ->
           Some (CIColorPolynomialProps.InputAlphaCoefficients (FilterRangeInput.convert input))
         | _ -> None)

    | CIExposureAdjust ->
      Filter.view
        RNF.CIExposureAdjust
        (function
         | Filter.InputEV, CFI.Scalar input ->
           Some (CIExposureAdjustProps.InputEV (FilterRangeInput.convert input))
         | _ -> None)

    | CIGammaAdjust ->
      Filter.view
        RNF.CIGammaAdjust
        (function
         | Filter.InputPower, CFI.Scalar input ->
           Some (CIGammaAdjustProps.InputPower (FilterRangeInput.convert input))
         | _ -> None)

    | CIHueAdjust ->
      Filter.view
        RNF.CIHueAdjust
        (function
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CIHueAdjustProps.InputAngle (FilterRangeInput.convert input))
         | _ -> None)
         
    | CILinearToSRGBToneCurve -> emptyView RNF.CIMaskToAlpha
         
    | CISRGBToneCurveToLinear -> emptyView RNF.CIMaskToAlpha

    | CITemperatureAndTint ->
      Filter.view
        RNF.CITemperatureAndTint
        (function
         | Filter.InputNeutral, CFI.Offset input ->
           Some (CITemperatureAndTintProps.InputNeutral (FilterRangeInput.convert input))
         | Filter.InputTargetNeutral, CFI.Offset input ->
           Some (CITemperatureAndTintProps.InputTargetNeutral (FilterRangeInput.convert input))
         | _ -> None)

    | CIToneCurve ->
      Filter.view
        RNF.CIToneCurve
        (function
         | Filter.InputPoint0, CFI.Offset input ->
           Some (CIToneCurveProps.InputPoint0 (FilterRangeInput.convert input))
         | Filter.InputPoint1, CFI.Offset input ->
           Some (CIToneCurveProps.InputPoint1 (FilterRangeInput.convert input))
         | Filter.InputPoint2, CFI.Offset input ->
           Some (CIToneCurveProps.InputPoint2 (FilterRangeInput.convert input))
         | Filter.InputPoint3, CFI.Offset input ->
           Some (CIToneCurveProps.InputPoint3 (FilterRangeInput.convert input))
         | Filter.InputPoint4, CFI.Offset input ->
           Some (CIToneCurveProps.InputPoint4 (FilterRangeInput.convert input))
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
           Some (CISepiaToneProps.InputIntensity (FilterRangeInput.convert input))
         | _ -> None)

    | CIVignette ->
      Filter.view
        RNF.CIVignette
        (function
         | Filter.InputIntensity, CFI.Scalar input ->
           Some (CIVignetteProps.InputIntensity (FilterRangeInput.convert input))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIVignetteProps.InputRadius (FilterRangeInput.convert input))
         | _ -> None)

    | CIVignetteEffect ->
      Filter.view
        RNF.CIVignetteEffect
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CIVignetteEffectProps.InputCenter (FilterRangeInput.convert input))
         | Filter.InputIntensity, CFI.Scalar input ->
           Some (CIVignetteEffectProps.InputIntensity (FilterRangeInput.convert input))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIVignetteEffectProps.InputRadius (FilterRangeInput.convert input))
         | _ -> None)
         
    | CIAdditionCompositing -> emptyView RNF.CIAdditionCompositing

    | CILightenBlendMode -> emptyView RNF.CILightenBlendMode

    | CIColorInvert -> emptyView RNF.CIColorInvert
         
    | CIColorMonochrome ->
      Filter.view
        RNF.CIColorMonochrome
        (function
         | Filter.InputColor, CFI.Color input ->
           Some (CIColorMonochromeProps.InputColor input.Value)
         | Filter.InputIntensity, CFI.Scalar input ->
           Some (CIColorMonochromeProps.InputIntensity (FilterRangeInput.convert input))
         | _ -> None)
         
    | CIColorPosterize ->
      Filter.view
        RNF.CIColorPosterize
        (function
         | Filter.InputLevels, CFI.Scalar input ->
           Some (CIColorPosterizeProps.InputLevels (FilterRangeInput.convert input))
         | _ -> None)
         
    | CIVibrance ->
      Filter.view
        RNF.CIVibrance
        (function
         | Filter.InputAmount, CFI.Scalar input ->
           Some (CIVibranceProps.InputAmount (FilterRangeInput.convert input))
         | _ -> None)
         
    | CICircularScreen ->
      Filter.view
        RNF.CICircularScreen
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CICircularScreenProps.InputCenter (FilterRangeInput.convert input))
         | Filter.InputSharpness, CFI.Scalar input ->
           Some (CICircularScreenProps.InputSharpness (FilterRangeInput.convert input))
         | Filter.InputWidth, CFI.Distance input ->
           Some (CICircularScreenProps.InputWidth (FilterRangeInput.convert input))
         | _ -> None)
         
    | CIDotScreen ->
      Filter.view
        RNF.CIDotScreen
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CIDotScreenProps.InputCenter (FilterRangeInput.convert input))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CIDotScreenProps.InputAngle (FilterRangeInput.convert input))
         | Filter.InputSharpness, CFI.Scalar input ->
           Some (CIDotScreenProps.InputSharpness (FilterRangeInput.convert input))
         | Filter.InputWidth, CFI.Distance input ->
           Some (CIDotScreenProps.InputWidth (FilterRangeInput.convert input))
         | _ -> None)
         
    | CILineScreen ->
      Filter.view
        RNF.CILineScreen
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CILineScreenProps.InputCenter (FilterRangeInput.convert input))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CILineScreenProps.InputAngle (FilterRangeInput.convert input))
         | Filter.InputSharpness, CFI.Scalar input ->
           Some (CILineScreenProps.InputSharpness (FilterRangeInput.convert input))
         | Filter.InputWidth, CFI.Distance input ->
           Some (CILineScreenProps.InputWidth (FilterRangeInput.convert input))
         | _ -> None)
         
    | CIBumpDistortion ->
      Filter.view
        RNF.CIBumpDistortion
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CIBumpDistortionProps.InputCenter (FilterRangeInput.convert input))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIBumpDistortionProps.InputRadius (FilterRangeInput.convert input))
         | Filter.InputScale, CFI.Scalar input ->
           Some (CIBumpDistortionProps.InputScale (FilterRangeInput.convert input))
         | ResizeOutput value -> Some (CIBumpDistortionProps.ResizeOutput value)
         | _ -> None)
         
    | CIBumpDistortionLinear ->
      Filter.view
        RNF.CIBumpDistortionLinear
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CIBumpDistortionLinearProps.InputCenter (FilterRangeInput.convert input))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIBumpDistortionLinearProps.InputRadius (FilterRangeInput.convert input))
         | Filter.InputScale, CFI.Scalar input ->
           Some (CIBumpDistortionLinearProps.InputScale (FilterRangeInput.convert input))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CIBumpDistortionLinearProps.InputAngle (FilterRangeInput.convert input))
         | _ -> None)
         
    | CICircleSplashDistortion ->
      Filter.view
        RNF.CICircleSplashDistortion
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CICircleSplashDistortionProps.InputCenter (FilterRangeInput.convert input))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CICircleSplashDistortionProps.InputRadius (FilterRangeInput.convert input))
         | _ -> None)
         
    | CICircularWrap ->
      Filter.view
        RNF.CICircularWrap
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CICircularWrapProps.InputCenter (FilterRangeInput.convert input))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CICircularWrapProps.InputRadius (FilterRangeInput.convert input))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CICircularWrapProps.InputAngle (FilterRangeInput.convert input))
         | ResizeOutput value -> Some (CICircularWrapProps.ResizeOutput value)
         | _ -> None)
         
    | CIVortexDistortion ->
      Filter.view
        RNF.CIVortexDistortion
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CIVortexDistortionProps.InputCenter (FilterRangeInput.convert input))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIVortexDistortionProps.InputRadius (FilterRangeInput.convert input))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CIVortexDistortionProps.InputAngle (FilterRangeInput.convert input))
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
           Some (CISharpenLuminanceProps.InputSharpness (FilterRangeInput.convert input))
         | _ -> None)
         
    | CIUnsharpMask ->
      Filter.view
        RNF.CIUnsharpMask
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIUnsharpMaskProps.InputRadius (FilterRangeInput.convert input))
         | Filter.InputIntensity, CFI.Scalar input ->
           Some (CIUnsharpMaskProps.InputIntensity (FilterRangeInput.convert input))
         | _ -> None)
         
    | CICrystallize ->
      Filter.view
        RNF.CICrystallize
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CICrystallizeProps.InputRadius (FilterRangeInput.convert input))
         | Filter.InputCenter, CFI.Point input ->
           Some (CICrystallizeProps.InputCenter (FilterRangeInput.convert input))
         | _ -> None)
         
    | CIEdges ->
      Filter.view
        RNF.CIEdges
        (function
         | Filter.InputIntensity, CFI.Scalar input ->
           Some (CIEdgesProps.InputIntensity (FilterRangeInput.convert input))
         | _ -> None)
         
    | CILineOverlay ->
      Filter.view
        RNF.CILineOverlay
        (function
         | Filter.InputNRNoiseLevel, CFI.Scalar input ->
           Some (CILineOverlayProps.InputNRNoiseLevel (FilterRangeInput.convert input))
         | Filter.InputNRSharpness, CFI.Scalar input ->
           Some (CILineOverlayProps.InputNRSharpness (FilterRangeInput.convert input))
         | Filter.InputEdgeIntensity, CFI.Scalar input ->
           Some (CILineOverlayProps.InputEdgeIntensity (FilterRangeInput.convert input))
         | Filter.InputThreshold, CFI.Scalar input ->
           Some (CILineOverlayProps.InputThreshold (FilterRangeInput.convert input))
         | Filter.InputContrast, CFI.Scalar input ->
           Some (CILineOverlayProps.InputContrast (FilterRangeInput.convert input))
         | _ -> None)
         
    | CIPixellate ->
      Filter.view
        RNF.CIPixellate
        (function
         | Filter.InputScale, CFI.Distance input ->
           Some (CIPixellateProps.InputScale (FilterRangeInput.convert input))
         | Filter.InputCenter, CFI.Point input ->
           Some (CIPixellateProps.InputCenter (FilterRangeInput.convert input))
         | _ -> None)
         
    | CIPointillize ->
      Filter.view
        RNF.CIPointillize
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIPointillizeProps.InputRadius (FilterRangeInput.convert input))
         | Filter.InputCenter, CFI.Point input ->
           Some (CIPointillizeProps.InputCenter (FilterRangeInput.convert input))
         | _ -> None)
         
    | CIOpTile ->
      Filter.view
        RNF.CIOpTile
        (function
         | Filter.InputWidth, CFI.Distance input ->
           Some (CIOpTileProps.InputWidth (FilterRangeInput.convert input))
         | Filter.InputCenter, CFI.Point input ->
           Some (CIOpTileProps.InputCenter (FilterRangeInput.convert input))
         | Filter.InputScale, CFI.Scalar input ->
           Some (CIOpTileProps.InputScale (FilterRangeInput.convert input))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CIOpTileProps.InputAngle (FilterRangeInput.convert input))
         | ResizeOutput value -> Some (CIOpTileProps.ResizeOutput value)
         | _ -> None)


  let requiredImagesAmount =
    function
    | CIMaskedVariableBlur
    | CIAdditionCompositing 
    | CILightenBlendMode -> 2
    | Color
    | LinearGradient
    | RadialGradient
    | SweepGradient
    | CIConstantColorGenerator
    | CIRandomGenerator -> 0
    | _ -> 1

  let isPersistent model =
    requiredImagesAmount model <> 1

  let controls model =    
    Filter.controls (name model) (isPersistent model)
