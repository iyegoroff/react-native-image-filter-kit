namespace FilterConstructor

open Fable.Helpers.ReactNative
open Fable.Import
open Fable.Core
open Fable.Helpers
open System

module IFK = Fable.Helpers.ReactNativeImageFilterKit

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

  let element (filter: Model) =
    match filter with
    | CIBoxBlur -> IFK.CIBoxBlur []
    | CIGaussianBlur -> IFK.CIGaussianBlur []
    | CIDiscBlur -> IFK.CIDiscBlur []
    | CIMedianFilter -> IFK.CIMedianFilter []
    | CIMotionBlur -> IFK.CIMotionBlur []
    | CINoiseReduction -> IFK.CINoiseReduction []
    | CIZoomBlur -> IFK.CIZoomBlur []
    | CIColorControls -> IFK.CIColorControls []
    | CIColorClamp -> IFK.CIColorClamp []
    | CIMaskToAlpha -> IFK.CIMaskToAlpha []
    | CIMaximumComponent -> IFK.CIMaximumComponent []
    | CIMinimumComponent -> IFK.CIMinimumComponent []
    | CIPhotoEffectChrome -> IFK.CIPhotoEffectChrome []
    | CIPhotoEffectFade -> IFK.CIPhotoEffectFade []
    | CIPhotoEffectInstant -> IFK.CIPhotoEffectInstant []
    | CIPhotoEffectMono -> IFK.CIPhotoEffectMono []
    | CIPhotoEffectNoir -> IFK.CIPhotoEffectNoir []
    | CIPhotoEffectProcess -> IFK.CIPhotoEffectProcess []
    | CIPhotoEffectTonal -> IFK.CIPhotoEffectTonal []
    | CIPhotoEffectTransfer -> IFK.CIPhotoEffectTransfer []
    | CIColorInvert -> IFK.CIColorInvert []
    | CIColorPosterize -> IFK.CIColorPosterize []
    | CIVibrance -> IFK.CIVibrance []
    | CICircularScreen -> IFK.CICircularScreen []
    | CIBumpDistortion -> IFK.CIBumpDistortion []
    | CIBumpDistortionLinear -> IFK.CIBumpDistortionLinear []
    | CICircleSplashDistortion -> IFK.CICircleSplashDistortion []
    | CICircularWrap -> IFK.CICircularWrap []
    | CISharpenLuminance -> IFK.CISharpenLuminance []
    | CIUnsharpMask -> IFK.CIUnsharpMask []

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
