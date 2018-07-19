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
    | CIColorMatrix
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
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 50. ]

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
        [ Filter.InputNoiseLevel, CFI.initScalar 0. 1.
          Filter.InputSharpness, CFI.initScalar 0. 1. ]

    | CIZoomBlur ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.)
          Filter.InputAmount, CFI.initDistance RNF.Distance.MaxPct  0. 100. ]

    | CIColorClamp ->
      Filter.init
        [ Filter.InputMinComponents, CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.)
          Filter.InputMaxComponents, CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.) ]

    | CIColorControls -> 
      Filter.init
        [ Filter.InputSaturation, CFI.initScalar 0. 10.
          Filter.InputBrightness, CFI.initScalar 0. 10.
          Filter.InputContrast, CFI.initScalar 0. 10. ]

    | CIColorMatrix ->
      Filter.init
        [ Filter.InputRVector, CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.)
          Filter.InputGVector, CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.)
          Filter.InputBVector, CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.)
          Filter.InputAVector, CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.)
          Filter.InputBiasVector, CFI.initRGBAVector (0., 0., 0., 0.) (1., 1., 1., 1.) ]

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
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.)
          Filter.InputSharpness, CFI.initScalar 0. 1.
          Filter.InputWidth, CFI.initDistance RNF.Distance.MaxPct 0. 100. ]

    | CIBumpDistortion ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.)
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 100.
          Filter.InputScale, CFI.initScalar -2. 2. ]

    | CIBumpDistortionLinear ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.)
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 100.
          Filter.InputScale, CFI.initScalar -2. 2.
          Filter.InputAngle, CFI.initScalar 0. (2. * Math.PI) ]

    | CICircleSplashDistortion ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.)
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 100. ]

    | CICircularWrap ->
      Filter.init
        [ Filter.InputCenter, CFI.initPoint toPoint (0., 0.) (100., 100.)
          Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 100.
          Filter.InputAngle, CFI.initScalar 0. (2. * Math.PI) ]

    | CISharpenLuminance ->
      Filter.init
        [ Filter.InputSharpness, CFI.initScalar 0. 100. ]

    | CIUnsharpMask ->
      Filter.init
        [ Filter.InputRadius, CFI.initDistance RNF.Distance.MaxPct  0. 50.
          Filter.InputIntensity, CFI.initScalar 0. 10. ]

  let private (|ResizeOutput|_|) =
    function
    | Filter.ResizeOutput, CFI.Boolean (input: FilterBooleanInput.Model) -> Some input.Value
    | _ -> None

  let view =
    Browser.console.warn("filter")
    function
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
         
    | CIMedianFilter ->
      Filter.view
        RNF.CIMedianFilter
        (function
         | ResizeOutput value -> Some (CIMedianFilterProps.ResizeOutput value)
         | _ -> None)
         
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
         | ResizeOutput value -> Some (CINoiseReductionProps.ResizeOutput value)
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
         | ResizeOutput value -> Some (CIColorClampProps.ResizeOutput value)
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
         | ResizeOutput value -> Some (CIColorControlsProps.ResizeOutput value)
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
         | ResizeOutput value -> Some (CIColorMatrixProps.ResizeOutput value)
         | _ -> None)
         
    | CIMaskToAlpha ->
      Filter.view
        RNF.CIMaskToAlpha
        (function
         | ResizeOutput value -> Some (CIMaskToAlphaProps.ResizeOutput value)
         | _ -> None)
         
    | CIMaximumComponent ->
      Filter.view
        RNF.CIMaximumComponent
        (function
         | ResizeOutput value -> Some (CIMaximumComponentProps.ResizeOutput value) 
         | _ -> None)
         
    | CIMinimumComponent ->
      Filter.view
        RNF.CIMinimumComponent
        (function
         | ResizeOutput value -> Some (CIMinimumComponentProps.ResizeOutput value)
         | _ -> None)
         
    | CIPhotoEffectChrome ->
      Filter.view
        RNF.CIPhotoEffectChrome
        (function
         | ResizeOutput value -> Some (CIPhotoEffectChromeProps.ResizeOutput value)
         | _ -> None)
         
    | CIPhotoEffectFade ->
      Filter.view
        RNF.CIPhotoEffectFade
        (function
         | ResizeOutput value -> Some (CIPhotoEffectFadeProps.ResizeOutput value)
         | _ -> None)
         
    | CIPhotoEffectInstant ->
      Filter.view
        RNF.CIPhotoEffectInstant
        (function
         | ResizeOutput value -> Some (CIPhotoEffectInstantProps.ResizeOutput value)
         | _ -> None)
         
    | CIPhotoEffectMono ->
      Filter.view
        RNF.CIPhotoEffectMono
        (function
         | ResizeOutput value -> Some (CIPhotoEffectMonoProps.ResizeOutput value)
         | _ -> None)
         
    | CIPhotoEffectNoir ->
      Filter.view
        RNF.CIPhotoEffectNoir
        (function
         | ResizeOutput value -> Some (CIPhotoEffectNoirProps.ResizeOutput value)
         | _ -> None)
         
    | CIPhotoEffectProcess ->
      Filter.view
        RNF.CIPhotoEffectProcess
        (function
         | ResizeOutput value -> Some (CIPhotoEffectProcessProps.ResizeOutput value)
         | _ -> None)
         
    | CIPhotoEffectTonal ->
      Filter.view
        RNF.CIPhotoEffectTonal
        (function
         | ResizeOutput value -> Some (CIPhotoEffectTonalProps.ResizeOutput value)
         | _ -> None)
         
    | CIPhotoEffectTransfer ->
      Filter.view
        RNF.CIPhotoEffectTransfer
        (function
         | ResizeOutput value -> Some (CIPhotoEffectTransferProps.ResizeOutput value)
         | _ -> None)
         
    | CIColorInvert ->
      Filter.view
        RNF.CIColorInvert
        (function
         | ResizeOutput value -> Some (CIColorInvertProps.ResizeOutput value)
         | _ -> None)
         
    | CIColorPosterize ->
      Filter.view
        RNF.CIColorPosterize
        (function
         | Filter.InputLevels, CFI.Scalar input ->
           Some (CIColorPosterizeProps.InputLevels (input.Convert input.Value))
         | ResizeOutput value -> Some (CIColorPosterizeProps.ResizeOutput value)
         | _ -> None)
         
    | CIVibrance ->
      Filter.view
        RNF.CIVibrance
        (function
         | Filter.InputAmount, CFI.Scalar input ->
           Some (CIVibranceProps.InputAmount (input.Convert input.Value))
         | ResizeOutput value -> Some (CIVibranceProps.ResizeOutput value)
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
         | ResizeOutput value -> Some (CICircularScreenProps.ResizeOutput value)
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
         | ResizeOutput value -> Some (CIBumpDistortionLinearProps.ResizeOutput value)
         | _ -> None)
         
    | CICircleSplashDistortion ->
      Filter.view
        RNF.CICircleSplashDistortion
        (function
         | Filter.InputCenter, CFI.Point input ->
           Some (CICircleSplashDistortionProps.InputCenter (input.Convert input.Value))
         | Filter.InputRadius, CFI.Distance input ->
           Some (CICircleSplashDistortionProps.InputRadius (input.Convert input.Value))
         | ResizeOutput value -> Some (CICircleSplashDistortionProps.ResizeOutput value)
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
         
    | CISharpenLuminance ->
      Filter.view
        RNF.CISharpenLuminance
        (function
         | Filter.InputSharpness, CFI.Scalar input ->
           Some (CISharpenLuminanceProps.InputSharpness (input.Convert input.Value))
         | ResizeOutput value -> Some (CISharpenLuminanceProps.ResizeOutput value)
         | _ -> None)
         
    | CIUnsharpMask ->
      Filter.view
        RNF.CIUnsharpMask
        (function
         | Filter.InputRadius, CFI.Distance input ->
           Some (CIUnsharpMaskProps.InputRadius (input.Convert input.Value))
         | Filter.InputIntensity, CFI.Scalar input ->
           Some (CIUnsharpMaskProps.InputIntensity (input.Convert input.Value))
         | ResizeOutput value -> Some (CIUnsharpMaskProps.ResizeOutput value)
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
    | CIColorMatrix -> Filter.controls (name CIColorMatrix)
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
       CIColorMatrix
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
