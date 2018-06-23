namespace FilterConstructor

open Fable.Helpers.ReactNative
open Fable.Import
open Fable.Core
open Fable.Helpers
open System

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNF = Fable.Helpers.ReactNativeImageFilterKit

module Filter =

  [<StringEnum>]
  type Model =
    | CIBoxBlur
    | CIGaussianBlur
    | CIDiscBlur
    | CIMedianFilter
    | CIMotionBlur
    | CINoiseReduction
    | CIZoomBlur
    | CIColorControls
    | CIColorClamp
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

  let name (filter: Model) =
    JS.JSON.stringify filter
    |> String.filter (fun c -> c <> '"')
    |> String.mapi (fun i c -> if i = 0 then Char.ToUpper c else c) 

  let controls (filter: Model) =
    let sliders =
      match filter with
      | CIBoxBlur -> []
      | CIGaussianBlur -> []
      | CIDiscBlur -> []
      | CIMedianFilter -> []
      | CIMotionBlur -> []
      | CINoiseReduction -> []
      | CIZoomBlur -> []
      | CIColorControls -> []
      | CIColorClamp -> []
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

    RN.view
      []
      [ RN.text [] (name filter)
        R.fragment
          []
          sliders ]

  let element (filter: Model) =
    match filter with
    | CIBoxBlur -> RNF.CIBoxBlur []
    | CIGaussianBlur -> RNF.CIGaussianBlur []
    | CIDiscBlur -> RNF.CIDiscBlur []
    | CIMedianFilter -> RNF.CIMedianFilter []
    | CIMotionBlur -> RNF.CIMotionBlur []
    | CINoiseReduction -> RNF.CINoiseReduction []
    | CIZoomBlur -> RNF.CIZoomBlur []
    | CIColorControls -> RNF.CIColorControls []
    | CIColorClamp -> RNF.CIColorClamp []
    | CIMaskToAlpha -> RNF.CIMaskToAlpha []
    | CIMaximumComponent -> RNF.CIMaximumComponent []
    | CIMinimumComponent -> RNF.CIMinimumComponent []
    | CIPhotoEffectChrome -> RNF.CIPhotoEffectChrome []
    | CIPhotoEffectFade -> RNF.CIPhotoEffectFade []
    | CIPhotoEffectInstant -> RNF.CIPhotoEffectInstant []
    | CIPhotoEffectMono -> RNF.CIPhotoEffectMono []
    | CIPhotoEffectNoir -> RNF.CIPhotoEffectNoir []
    | CIPhotoEffectProcess -> RNF.CIPhotoEffectProcess []
    | CIPhotoEffectTonal -> RNF.CIPhotoEffectTonal []
    | CIPhotoEffectTransfer -> RNF.CIPhotoEffectTransfer []
    | CIColorInvert -> RNF.CIColorInvert []
    | CIColorPosterize -> RNF.CIColorPosterize []
    | CIVibrance -> RNF.CIVibrance []
    | CICircularScreen -> RNF.CICircularScreen []
    | CIBumpDistortion -> RNF.CIBumpDistortion []
    | CIBumpDistortionLinear -> RNF.CIBumpDistortionLinear []
    | CICircleSplashDistortion -> RNF.CICircleSplashDistortion []
    | CICircularWrap -> RNF.CICircularWrap []
    | CISharpenLuminance -> RNF.CISharpenLuminance []
    | CIUnsharpMask -> RNF.CIUnsharpMask []

  let private availableAndroidFilters: Model array =
    [| |]

  let private availableIosFilters =
    [| CIBoxBlur
       CIGaussianBlur
       CIDiscBlur
       CIMedianFilter
       CIMotionBlur
       CINoiseReduction
       CIZoomBlur
       CIColorControls
       CIColorClamp
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
