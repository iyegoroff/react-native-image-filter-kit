namespace FilterConstructor

open Fable.Helpers.ReactNative
open Fable.Import
open Fable.Helpers
open System
open Fable.Helpers.ReactNativeImageFilterKit.Props

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNF = Fable.Helpers.ReactNativeImageFilterKit
module CFI = CombinedFilterInput

module CombinedFilter =

  type Model =
    | CIBoxBlur
    | CIDiscBlur
    | CIGaussianBlur
    | CIMedianFilter
    | CIMotionBlur
    | CINoiseReduction
    | CIZoomBlur
    | CIColorClamp
    | CIColorControls
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
    | CIColorInvert
    | CIColorPosterize
    | CIVibrance
    | CICircularScreen
    | CIBumpDistortion
    | CIBumpDistortionLinear
    | CICircleSplashDistortion
    | CICircularWrap
    | CISharpenLuminance
    | CIUnsharpMask

  let name =
    sprintf "%A"

  let private toPoint (x, y) =
    RNF.Point (RNF.Distance.WPct x, RNF.Distance.HPct y)

  let init model : Filter.Model =
    match model with
    | CIBoxBlur ->
      Filter.init
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 1. ]

    | CIDiscBlur ->
      Filter.init
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 50. ]

    | CIGaussianBlur ->
      Filter.init
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 50. ]

    | CIMedianFilter ->
      Filter.init []

    | CIMotionBlur ->
      Filter.init
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 50.
          Filter.InputAngle, CFI.initScalar 0. (2. * Math.PI) ]

    | CINoiseReduction ->
      Filter.init
        [ Filter.InputNoiseLevel, CFI.initScalar 0. 10.
          Filter.InputSharpness, CFI.initScalar 0. 10. ]

    | CIZoomBlur ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (1., 1.)
          Filter.InputAmount, CFI.initDistance RNF.Distance.MaxPct  0. 1. ]

    | CIColorClamp ->
      Filter.init
        [ Filter.InputMinComponents, CFI.initRGBAVector (0., 0., 0., 0.) (100., 100., 100., 100.)
          Filter.InputMaxComponents, CFI.initRGBAVector (0., 0., 0., 0.) (100., 100., 100., 100.) ]

    | CIColorControls -> 
      Filter.init
        [ Filter.InputSaturation, CFI.initScalar 0. 10.
          Filter.InputBrightness, CFI.initScalar 0. 10.
          Filter.InputContrast, CFI.initScalar 0. 10. ]

    | CIMaskToAlpha ->
      Filter.init []

    | CIMaximumComponent ->
      Filter.init []

    | CIMinimumComponent ->
      Filter.init []

    | CIPhotoEffectChrome ->
      Filter.init []

    | CIPhotoEffectFade ->
      Filter.init []

    | CIPhotoEffectInstant ->
      Filter.init []

    | CIPhotoEffectMono ->
      Filter.init []

    | CIPhotoEffectNoir ->
      Filter.init []

    | CIPhotoEffectProcess ->
      Filter.init []

    | CIPhotoEffectTonal ->
      Filter.init []

    | CIPhotoEffectTransfer ->
      Filter.init []

    | CIColorInvert ->
      Filter.init []

    | CIColorPosterize ->
      Filter.init
        [ Filter.InputLevels, CFI.initScalar 0. 10. ]

    | CIVibrance ->
      Filter.init
        [ Filter.InputAmount, CFI.initScalar 0. 10. ]

    | CICircularScreen ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (1., 1.)
          Filter.InputSharpness, CFI.initScalar 0. 10.
          Filter.InputWidth, CFI.initDistance RNF.Distance.MaxPct 0. 1. ]

    | CIBumpDistortion ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (1., 1.)
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 1.
          Filter.InputScale, CFI.initScalar -2. 2. ]

    | CIBumpDistortionLinear ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (1., 1.)
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 1.
          Filter.InputScale, CFI.initScalar -2. 2.
          Filter.InputAngle, CFI.initScalar 0. (2. * Math.PI) ]

    | CICircleSplashDistortion ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (10., 10.)
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 10. ]

    | CICircularWrap ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.)
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 100.
          Filter.InputAngle, CFI.initScalar 0. (2. * Math.PI) ]

    | CISharpenLuminance ->
      Filter.init
        [ Filter.InputSharpness, CFI.initScalar 0. 10. ]

    | CIUnsharpMask ->
      Filter.init
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 50.
          Filter.InputIntensity, CFI.initScalar 0. 10. ]

  let view =
    function
    | CIBoxBlur ->
      Filter.view
        RNF.CIBoxBlur
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIBoxBlurProps.InputRadius (input.Convert input.Value))
         | _ -> None)
         
    | CIDiscBlur ->
      Filter.view
        RNF.CIDiscBlur
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIDiscBlurProps.InputRadius (input.Convert input.Value))
         | _ -> None)
         
    | CIGaussianBlur ->
      Filter.view
        RNF.CIGaussianBlur
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIGaussianBlurProps.InputRadius (input.Convert input.Value))
         | _ -> None)
         
    | CIMedianFilter ->
      Filter.view
        RNF.CIMedianFilter
        (function
         | _ -> None)
         
    | CIMotionBlur ->
      Filter.view
        RNF.CIMotionBlur
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIMotionBlurProps.InputRadius (input.Convert input.Value))
         | Filter.InputAngle, CFI.Scalar input ->
           Some (CIMotionBlurProps.InputAngle (input.Convert input.Value))
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
         
    | CIMaskToAlpha ->
      Filter.view
        RNF.CIMaskToAlpha
        (function
         | _ -> None)
         
    | CIMaximumComponent ->
      Filter.view
        RNF.CIMaximumComponent
        (function
         | _ -> None)
         
    | CIMinimumComponent ->
      Filter.view
        RNF.CIMinimumComponent
        (function
         | _ -> None)
         
    | CIPhotoEffectChrome ->
      Filter.view
        RNF.CIPhotoEffectChrome
        (function
         | _ -> None)
         
    | CIPhotoEffectFade ->
      Filter.view
        RNF.CIPhotoEffectFade
        (function
         | _ -> None)
         
    | CIPhotoEffectInstant ->
      Filter.view
        RNF.CIPhotoEffectInstant
        (function
         | _ -> None)
         
    | CIPhotoEffectMono ->
      Filter.view
        RNF.CIPhotoEffectMono
        (function
         | _ -> None)
         
    | CIPhotoEffectNoir ->
      Filter.view
        RNF.CIPhotoEffectNoir
        (function
         | _ -> None)
         
    | CIPhotoEffectProcess ->
      Filter.view
        RNF.CIPhotoEffectProcess
        (function
         | _ -> None)
         
    | CIPhotoEffectTonal ->
      Filter.view
        RNF.CIPhotoEffectTonal
        (function
         | _ -> None)
         
    | CIPhotoEffectTransfer ->
      Filter.view
        RNF.CIPhotoEffectTransfer
        (function
         | _ -> None)
         
    | CIColorInvert ->
      Filter.view
        RNF.CIColorInvert
        (function
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

  let controls =
    function
    | CIBoxBlur -> Filter.controls (name CIBoxBlur)
    | CIDiscBlur -> Filter.controls (name CIDiscBlur)
    | CIGaussianBlur -> Filter.controls (name CIGaussianBlur)
    | CIMedianFilter -> Filter.controls (name CIMedianFilter)
    | CIMotionBlur -> Filter.controls (name CIMotionBlur)
    | CINoiseReduction -> Filter.controls (name CINoiseReduction)
    | CIZoomBlur -> Filter.controls (name CIZoomBlur)
    | CIColorClamp -> Filter.controls (name CIColorClamp)
    | CIColorControls -> Filter.controls (name CIColorControls)
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
    | CIColorInvert -> Filter.controls (name CIColorInvert)
    | CIColorPosterize -> Filter.controls (name CIColorPosterize)
    | CIVibrance -> Filter.controls (name CIVibrance)
    | CICircularScreen -> Filter.controls (name CICircularScreen)
    | CIBumpDistortion -> Filter.controls (name CIBumpDistortion)
    | CIBumpDistortionLinear -> Filter.controls (name CIBumpDistortionLinear)
    | CICircleSplashDistortion -> Filter.controls (name CICircleSplashDistortion)
    | CICircularWrap -> Filter.controls (name CICircularWrap)
    | CISharpenLuminance -> Filter.controls (name CISharpenLuminance)
    | CIUnsharpMask -> Filter.controls (name CIUnsharpMask)

  let private availableAndroidFilters: Model array =
    [| |]

  let private availableIosFilters =
    [| CIBoxBlur
       CIDiscBlur
       CIGaussianBlur
       CIMedianFilter
       CIMotionBlur
       CINoiseReduction
       CIZoomBlur
       CIColorClamp
       CIColorControls
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
       CIColorInvert
       CIColorPosterize
       CIVibrance
       CICircularScreen
       CIBumpDistortion
       CIBumpDistortionLinear
       CICircleSplashDistortion
       CICircularWrap
       CISharpenLuminance
       CIUnsharpMask |]

  let availableFilters =
    Platform.select
      [ Platform.Ios availableIosFilters
        Platform.Android availableAndroidFilters ]
