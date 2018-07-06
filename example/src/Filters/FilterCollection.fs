namespace FilterConstructor

open Fable.Helpers.ReactNative
open Fable.Import
open Fable.Core
open Fable.Helpers
open Elmish
open System
open Fable.Helpers.ReactNativeImageFilterKit
open Fable.Helpers.ReactNativeImageFilterKit.Props

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNF = Fable.Helpers.ReactNativeImageFilterKit

module FilterCollection =

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
    function
    | CIBoxBlur -> "CIBoxBlur"
    | CIDiscBlur -> "CIDiscBlur"
    | CIGaussianBlur -> "CIGaussianBlur"
    | CIMedianFilter -> "CIMedianFilter"
    | CIMotionBlur -> "CIMotionBlur"
    | CINoiseReduction -> "CINoiseReduction"
    | CIZoomBlur -> "CIZoomBlur"
    | CIColorClamp -> "CIColorClamp"
    | CIColorControls -> "CIColorControls"
    | CIMaskToAlpha -> "CIMaskToAlpha"
    | CIMaximumComponent -> "CIMaximumComponent"
    | CIMinimumComponent -> "CIMinimumComponent"
    | CIPhotoEffectChrome -> "CIPhotoEffectChrome"
    | CIPhotoEffectFade -> "CIPhotoEffectFade"
    | CIPhotoEffectInstant -> "CIPhotoEffectInstant"
    | CIPhotoEffectMono -> "CIPhotoEffectMono"
    | CIPhotoEffectNoir -> "CIPhotoEffectNoir"
    | CIPhotoEffectProcess -> "CIPhotoEffectProcess"
    | CIPhotoEffectTonal -> "CIPhotoEffectTonal"
    | CIPhotoEffectTransfer -> "CIPhotoEffectTransfer"
    | CIColorInvert -> "CIColorInvert"
    | CIColorPosterize -> "CIColorPosterize"
    | CIVibrance -> "CIVibrance"
    | CICircularScreen -> "CICircularScreen"
    | CIBumpDistortion -> "CIBumpDistortion"
    | CIBumpDistortionLinear -> "CIBumpDistortionLinear"
    | CICircleSplashDistortion -> "CICircleSplashDistortion"
    | CICircularWrap -> "CICircularWrap"
    | CISharpenLuminance -> "CISharpenLuminance"
    | CIUnsharpMask -> "CIUnsharpMask"

  let init =
    function
    | CIBoxBlur ->
      [ FilterDistanceInput.init Distance.Dip "inputRadius" 0. 100. ]
    | CIDiscBlur -> []
    | CIGaussianBlur -> []
    | CIMedianFilter -> []
    | CIMotionBlur -> []
    | CINoiseReduction -> []
    | CIZoomBlur -> []
    | CIColorClamp -> []
    | CIColorControls -> []
    | CIMaskToAlpha -> []
    | CIMaximumComponent -> []
    | CIMinimumComponent -> []
    | CIPhotoEffectChrome -> []
    | CIPhotoEffectFade -> []
    | CIPhotoEffectInstant -> []
    | CIPhotoEffectMono -> []
    | CIPhotoEffectNoir -> []
    | CIPhotoEffectProcess -> []
    | CIPhotoEffectTonal -> []
    | CIPhotoEffectTransfer -> []
    | CIColorInvert -> []
    | CIColorPosterize -> []
    | CIVibrance -> []
    | CICircularScreen -> []
    | CIBumpDistortion -> []
    | CIBumpDistortionLinear -> []
    | CICircleSplashDistortion -> []
    | CICircularWrap -> []
    | CISharpenLuminance -> []
    | CIUnsharpMask -> []

  let view =
    function
    | CIBoxBlur ->
      Filter.view
        RNF.CIBoxBlur
        (function
         | Filter.InputRadius input ->
           Some (CIBoxBlurProps.InputRadius (input.Convert input.Value))
         | _ -> None)
         
    | CIDiscBlur ->
      Filter.view
        RNF.CIDiscBlur
        (function
         | Filter.InputRadius input ->
           Some (CIDiscBlurProps.InputRadius (input.Convert input.Value))
         | _ -> None)
         
    | CIGaussianBlur ->
      Filter.view
        RNF.CIGaussianBlur
        (function
         | Filter.InputRadius input ->
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
         | Filter.InputRadius input ->
           Some (CIMotionBlurProps.InputRadius (input.Convert input.Value))
         | Filter.InputAngle input ->
           Some (CIMotionBlurProps.InputAngle (input.Convert input.Value))
         | _ -> None)
         
    | CINoiseReduction ->
      Filter.view
        RNF.CINoiseReduction
        (function
         | Filter.InputNoiseLevel input ->
           Some (CINoiseReductionProps.InputNoiseLevel (input.Convert input.Value))
         | Filter.InputSharpness input ->
           Some (CINoiseReductionProps.InputSharpness (input.Convert input.Value))
         | _ -> None)
         
    | CIZoomBlur ->
      Filter.view
        RNF.CIZoomBlur
        (function
         | Filter.InputCenter input ->
           Some (CIZoomBlurProps.InputCenter (input.Convert input.Value))
         | Filter.InputAmount input ->
           Some (CIZoomBlurProps.InputAmount (input.Convert input.Value))
         | _ -> None)
         
    | CIColorClamp ->
      Filter.view
        RNF.CIColorClamp
        (function
         | Filter.InputMinComponents input ->
           Some (CIColorClampProps.InputMinComponents (input.Convert input.Value))
         | Filter.InputMaxComponents input ->
           Some (CIColorClampProps.InputMaxComponents (input.Convert input.Value))
         | _ -> None)
         
    | CIColorControls ->
      Filter.view
        RNF.CIColorControls
        (function
         | Filter.InputSaturation input ->
           Some (CIColorControlsProps.InputSaturation (input.Convert input.Value))
         | Filter.InputBrightness input ->
           Some (CIColorControlsProps.InputBrightness (input.Convert input.Value))
         | Filter.InputContrast input ->
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
         | Filter.InputLevels input ->
           Some (CIColorPosterizeProps.InputLevels (input.Convert input.Value))
         | _ -> None)
         
    | CIVibrance ->
      Filter.view
        RNF.CIVibrance
        (function
         | Filter.InputAmount input ->
           Some (CIVibranceProps.InputAmount (input.Convert input.Value))
         | _ -> None)
         
    | CICircularScreen ->
      Filter.view
        RNF.CICircularScreen
        (function
         | Filter.InputCenter input ->
           Some (CICircularScreenProps.InputCenter (input.Convert input.Value))
         | Filter.InputSharpness input ->
           Some (CICircularScreenProps.InputSharpness (input.Convert input.Value))
         | Filter.InputWidth input ->
           Some (CICircularScreenProps.InputWidth (input.Convert input.Value))
         | _ -> None)
         
    | CIBumpDistortion ->
      Filter.view
        RNF.CIBumpDistortion
        (function
         | Filter.InputCenter input ->
           Some (CIBumpDistortionProps.InputCenter (input.Convert input.Value))
         | Filter.InputRadius input ->
           Some (CIBumpDistortionProps.InputRadius (input.Convert input.Value))
         | Filter.InputScale input ->
           Some (CIBumpDistortionProps.InputScale (input.Convert input.Value))
         | _ -> None)
         
    | CIBumpDistortionLinear ->
      Filter.view
        RNF.CIBumpDistortionLinear
        (function
         | Filter.InputCenter input ->
           Some (CIBumpDistortionLinearProps.InputCenter (input.Convert input.Value))
         | Filter.InputRadius input ->
           Some (CIBumpDistortionLinearProps.InputRadius (input.Convert input.Value))
         | Filter.InputScale input ->
           Some (CIBumpDistortionLinearProps.InputScale (input.Convert input.Value))
         | Filter.InputAngle input ->
           Some (CIBumpDistortionLinearProps.InputAngle (input.Convert input.Value))
         | _ -> None)
         
    | CICircleSplashDistortion ->
      Filter.view
        RNF.CICircleSplashDistortion
        (function
         | Filter.InputCenter input ->
           Some (CICircleSplashDistortionProps.InputCenter (input.Convert input.Value))
         | Filter.InputRadius input ->
           Some (CICircleSplashDistortionProps.InputRadius (input.Convert input.Value))
         | _ -> None)
         
    | CICircularWrap ->
      Filter.view
        RNF.CICircularWrap
        (function
         | Filter.InputCenter input ->
           Some (CICircularWrapProps.InputCenter (input.Convert input.Value))
         | Filter.InputRadius input ->
           Some (CICircularWrapProps.InputRadius (input.Convert input.Value))
         | Filter.InputAngle input ->
           Some (CICircularWrapProps.InputAngle (input.Convert input.Value))
         | _ -> None)
         
    | CISharpenLuminance ->
      Filter.view
        RNF.CISharpenLuminance
        (function
         | Filter.InputSharpness input ->
           Some (CISharpenLuminanceProps.InputSharpness (input.Convert input.Value))
         | _ -> None)
         
    | CIUnsharpMask ->
      Filter.view
        RNF.CIUnsharpMask
        (function
         | Filter.InputRadius input ->
           Some (CIUnsharpMaskProps.InputRadius (input.Convert input.Value))
         | Filter.InputIntensity input ->
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
