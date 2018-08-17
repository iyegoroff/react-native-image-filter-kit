module Fable.Import.ReactNativeImageFilterKit

open Fable.Helpers.ReactNative
open Fable.Helpers.React
open Fable.Helpers.ReactNative.Props
open Fable.Core
open Fable.Core.JsInterop
open Fable.Import


module Props =

  type IDistance =
    interface end

  type IPoint =
    interface end

  type IRGBAVector =
    interface end

  type ColorMatrixProps =
    | Style of IStyle list
    | Matrix of ResizeArray<float>

  type NormalProps =
    | Style of IStyle list

  type SaturateProps =
    | Style of IStyle list
    | Value of float

  type HueRotateProps =
    | Style of IStyle list
    | Value of float

  type LuminanceToAlphaProps =
    | Style of IStyle list

  type InvertProps =
    | Style of IStyle list

  type GrayscaleProps =
    | Style of IStyle list

  type SepiaProps =
    | Style of IStyle list

  type NightvisionProps =
    | Style of IStyle list

  type WarmProps =
    | Style of IStyle list

  type CoolProps =
    | Style of IStyle list

  type BrightnessProps =
    | Style of IStyle list
    | Value of float

  type ExposureProps =
    | Style of IStyle list
    | Value of float

  type ContrastProps =
    | Style of IStyle list
    | Value of float

  type TemperatureProps =
    | Style of IStyle list
    | Value of float

  type TintProps =
    | Style of IStyle list
    | Value of float

  type ThresholdProps =
    | Style of IStyle list
    | Value of float

  type ProtanomalyProps =
    | Style of IStyle list

  type DeuteranomalyProps =
    | Style of IStyle list

  type TritanomalyProps =
    | Style of IStyle list

  type ProtanopiaProps =
    | Style of IStyle list

  type DeuteranopiaProps =
    | Style of IStyle list

  type TritanopiaProps =
    | Style of IStyle list

  type AchromatopsiaProps =
    | Style of IStyle list

  type AchromatomalyProps =
    | Style of IStyle list

  type ColorMatrixColorFilterProps =
    | Style of IStyle list
    | Matrix of ResizeArray<float>

  type IterativeBoxBlurProps =
    | Style of IStyle list
    | BlurRadius of float
    | Iterations of float

  type LightingColorFilterProps =
    | Style of IStyle list
    | Mul of string
    | Add of string

  type RoundAsCircleProps =
    | Style of IStyle list

  type CIBoxBlurProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputRadius of IDistance

  type CIGaussianBlurProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputRadius of IDistance

  type CIDiscBlurProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputRadius of IDistance

  type CIMedianFilterProps =
    | Style of IStyle list

  type CIMotionBlurProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputRadius of IDistance
    | InputAngle of float

  type CINoiseReductionProps =
    | Style of IStyle list
    | InputNoiseLevel of float
    | InputSharpness of float

  type CIZoomBlurProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputCenter of IPoint
    | InputAmount of IDistance

  type CIColorControlsProps =
    | Style of IStyle list
    | InputSaturation of float
    | InputBrightness of float
    | InputContrast of float

  type CIColorMatrixProps =
    | Style of IStyle list
    | InputRVector of IRGBAVector
    | InputGVector of IRGBAVector
    | InputBVector of IRGBAVector
    | InputAVector of IRGBAVector
    | InputBiasVector of IRGBAVector

  type CIGammaAdjustProps =
    | Style of IStyle list
    | InputPower of float

  type CIHueAdjustProps =
    | Style of IStyle list
    | InputAngle of float

  type CIColorClampProps =
    | Style of IStyle list
    | InputMinComponents of IRGBAVector
    | InputMaxComponents of IRGBAVector

  type CIMaskToAlphaProps =
    | Style of IStyle list

  type CIMaximumComponentProps =
    | Style of IStyle list

  type CIMinimumComponentProps =
    | Style of IStyle list

  type CIPhotoEffectChromeProps =
    | Style of IStyle list

  type CIPhotoEffectFadeProps =
    | Style of IStyle list

  type CIPhotoEffectInstantProps =
    | Style of IStyle list

  type CIPhotoEffectMonoProps =
    | Style of IStyle list

  type CIPhotoEffectNoirProps =
    | Style of IStyle list

  type CIPhotoEffectProcessProps =
    | Style of IStyle list

  type CIPhotoEffectTonalProps =
    | Style of IStyle list

  type CIPhotoEffectTransferProps =
    | Style of IStyle list

  type CIVignetteEffectProps =
    | Style of IStyle list
    | InputCenter of IPoint
    | InputIntensity of float
    | InputRadius of IDistance

  type CIColorInvertProps =
    | Style of IStyle list

  type CIColorPosterizeProps =
    | Style of IStyle list
    | InputLevels of float

  type CIVibranceProps =
    | Style of IStyle list
    | InputAmount of float

  type CICircularScreenProps =
    | Style of IStyle list
    | InputCenter of IPoint
    | InputSharpness of float
    | InputWidth of IDistance

  type CIDotScreenProps =
    | Style of IStyle list
    | InputCenter of IPoint
    | InputAngle of float
    | InputSharpness of float
    | InputWidth of IDistance

  type CIBumpDistortionProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputCenter of IPoint
    | InputRadius of IDistance
    | InputScale of float

  type CIBumpDistortionLinearProps =
    | Style of IStyle list
    | InputCenter of IPoint
    | InputRadius of IDistance
    | InputScale of float
    | InputAngle of float

  type CICircleSplashDistortionProps =
    | Style of IStyle list
    | InputCenter of IPoint
    | InputRadius of IDistance

  type CICircularWrapProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputCenter of IPoint
    | InputRadius of IDistance
    | InputAngle of float

  type CIVortexDistortionProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputCenter of IPoint
    | InputRadius of IDistance
    | InputAngle of float

  type CISharpenLuminanceProps =
    | Style of IStyle list
    | InputSharpness of float

  type CIUnsharpMaskProps =
    | Style of IStyle list
    | InputRadius of IDistance
    | InputIntensity of float

  type CICrystallizeProps =
    | Style of IStyle list
    | InputRadius of IDistance
    | InputCenter of IPoint

  type CIPixellateProps =
    | Style of IStyle list
    | InputScale of IDistance
    | InputCenter of IPoint

  type AndroidTestFilterProps =
    | Style of IStyle list


open Props

type Distance =
  [<Emit("$0 + \"\"")>]
  static member Dip (_: float): IDistance = jsNative

  [<Emit("$0 + \"h\"")>]
  static member HPct (_: float): IDistance = jsNative

  [<Emit("$0 + \"w\"")>]
  static member WPct (_: float): IDistance = jsNative

  [<Emit("$0 + \"max\"")>]
  static member MaxPct (_: float): IDistance = jsNative

  [<Emit("$0 + \"min\"")>]
  static member MinPct (_: float): IDistance = jsNative

[<Emit("({ x:$0, y:$1 })")>]
let Point (_x: IDistance, _y: IDistance): IPoint = jsNative

[<Emit("[$0, $1, $2, $3]")>]
let RGBAVector (_r: float, _g: float, _b: float, _a: float): IRGBAVector = jsNative

let inline private propsToObj (props: 'a list): obj = keyValueList CaseRules.LowerFirst props

let inline ColorMatrix (props: ColorMatrixProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "ColorMatrix" "react-native-image-filter-kit" (propsToObj props) children

let inline Normal (props: NormalProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Normal" "react-native-image-filter-kit" (propsToObj props) children

let inline Saturate (props: SaturateProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Saturate" "react-native-image-filter-kit" (propsToObj props) children

let inline HueRotate (props: HueRotateProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "HueRotate" "react-native-image-filter-kit" (propsToObj props) children

let inline LuminanceToAlpha (props: LuminanceToAlphaProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "LuminanceToAlpha" "react-native-image-filter-kit" (propsToObj props) children

let inline Invert (props: InvertProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Invert" "react-native-image-filter-kit" (propsToObj props) children

let inline Grayscale (props: GrayscaleProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Grayscale" "react-native-image-filter-kit" (propsToObj props) children

let inline Sepia (props: SepiaProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Sepia" "react-native-image-filter-kit" (propsToObj props) children

let inline Nightvision (props: NightvisionProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Nightvision" "react-native-image-filter-kit" (propsToObj props) children

let inline Warm (props: WarmProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Warm" "react-native-image-filter-kit" (propsToObj props) children

let inline Cool (props: CoolProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Cool" "react-native-image-filter-kit" (propsToObj props) children

let inline Brightness (props: BrightnessProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Brightness" "react-native-image-filter-kit" (propsToObj props) children

let inline Exposure (props: ExposureProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Exposure" "react-native-image-filter-kit" (propsToObj props) children

let inline Contrast (props: ContrastProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Contrast" "react-native-image-filter-kit" (propsToObj props) children

let inline Temperature (props: TemperatureProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Temperature" "react-native-image-filter-kit" (propsToObj props) children

let inline Tint (props: TintProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Tint" "react-native-image-filter-kit" (propsToObj props) children

let inline Threshold (props: ThresholdProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Threshold" "react-native-image-filter-kit" (propsToObj props) children

let inline Protanomaly (props: ProtanomalyProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Protanomaly" "react-native-image-filter-kit" (propsToObj props) children

let inline Deuteranomaly (props: DeuteranomalyProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Deuteranomaly" "react-native-image-filter-kit" (propsToObj props) children

let inline Tritanomaly (props: TritanomalyProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Tritanomaly" "react-native-image-filter-kit" (propsToObj props) children

let inline Protanopia (props: ProtanopiaProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Protanopia" "react-native-image-filter-kit" (propsToObj props) children

let inline Deuteranopia (props: DeuteranopiaProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Deuteranopia" "react-native-image-filter-kit" (propsToObj props) children

let inline Tritanopia (props: TritanopiaProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Tritanopia" "react-native-image-filter-kit" (propsToObj props) children

let inline Achromatopsia (props: AchromatopsiaProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Achromatopsia" "react-native-image-filter-kit" (propsToObj props) children

let inline Achromatomaly (props: AchromatomalyProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "Achromatomaly" "react-native-image-filter-kit" (propsToObj props) children

let inline ColorMatrixColorFilter (props: ColorMatrixColorFilterProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "ColorMatrixColorFilter" "react-native-image-filter-kit" (propsToObj props) children

let inline IterativeBoxBlur (props: IterativeBoxBlurProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "IterativeBoxBlur" "react-native-image-filter-kit" (propsToObj props) children

let inline LightingColorFilter (props: LightingColorFilterProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "LightingColorFilter" "react-native-image-filter-kit" (propsToObj props) children

let inline RoundAsCircle (props: RoundAsCircleProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "RoundAsCircle" "react-native-image-filter-kit" (propsToObj props) children

let inline CIBoxBlur (props: CIBoxBlurProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIBoxBlur" "react-native-image-filter-kit" (propsToObj props) children

let inline CIGaussianBlur (props: CIGaussianBlurProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIGaussianBlur" "react-native-image-filter-kit" (propsToObj props) children

let inline CIDiscBlur (props: CIDiscBlurProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIDiscBlur" "react-native-image-filter-kit" (propsToObj props) children

let inline CIMedianFilter (props: CIMedianFilterProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIMedianFilter" "react-native-image-filter-kit" (propsToObj props) children

let inline CIMotionBlur (props: CIMotionBlurProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIMotionBlur" "react-native-image-filter-kit" (propsToObj props) children

let inline CINoiseReduction (props: CINoiseReductionProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CINoiseReduction" "react-native-image-filter-kit" (propsToObj props) children

let inline CIZoomBlur (props: CIZoomBlurProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIZoomBlur" "react-native-image-filter-kit" (propsToObj props) children

let inline CIColorControls (props: CIColorControlsProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIColorControls" "react-native-image-filter-kit" (propsToObj props) children

let inline CIColorMatrix (props: CIColorMatrixProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIColorMatrix" "react-native-image-filter-kit" (propsToObj props) children

let inline CIGammaAdjust (props: CIGammaAdjustProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIGammaAdjust" "react-native-image-filter-kit" (propsToObj props) children

let inline CIHueAdjust (props: CIHueAdjustProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIHueAdjust" "react-native-image-filter-kit" (propsToObj props) children

let inline CIColorClamp (props: CIColorClampProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIColorClamp" "react-native-image-filter-kit" (propsToObj props) children

let inline CIMaskToAlpha (props: CIMaskToAlphaProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIMaskToAlpha" "react-native-image-filter-kit" (propsToObj props) children

let inline CIMaximumComponent (props: CIMaximumComponentProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIMaximumComponent" "react-native-image-filter-kit" (propsToObj props) children

let inline CIMinimumComponent (props: CIMinimumComponentProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIMinimumComponent" "react-native-image-filter-kit" (propsToObj props) children

let inline CIPhotoEffectChrome (props: CIPhotoEffectChromeProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIPhotoEffectChrome" "react-native-image-filter-kit" (propsToObj props) children

let inline CIPhotoEffectFade (props: CIPhotoEffectFadeProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIPhotoEffectFade" "react-native-image-filter-kit" (propsToObj props) children

let inline CIPhotoEffectInstant (props: CIPhotoEffectInstantProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIPhotoEffectInstant" "react-native-image-filter-kit" (propsToObj props) children

let inline CIPhotoEffectMono (props: CIPhotoEffectMonoProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIPhotoEffectMono" "react-native-image-filter-kit" (propsToObj props) children

let inline CIPhotoEffectNoir (props: CIPhotoEffectNoirProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIPhotoEffectNoir" "react-native-image-filter-kit" (propsToObj props) children

let inline CIPhotoEffectProcess (props: CIPhotoEffectProcessProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIPhotoEffectProcess" "react-native-image-filter-kit" (propsToObj props) children

let inline CIPhotoEffectTonal (props: CIPhotoEffectTonalProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIPhotoEffectTonal" "react-native-image-filter-kit" (propsToObj props) children

let inline CIPhotoEffectTransfer (props: CIPhotoEffectTransferProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIPhotoEffectTransfer" "react-native-image-filter-kit" (propsToObj props) children

let inline CIVignetteEffect (props: CIVignetteEffectProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIVignetteEffect" "react-native-image-filter-kit" (propsToObj props) children

let inline CIColorInvert (props: CIColorInvertProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIColorInvert" "react-native-image-filter-kit" (propsToObj props) children

let inline CIColorPosterize (props: CIColorPosterizeProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIColorPosterize" "react-native-image-filter-kit" (propsToObj props) children

let inline CIVibrance (props: CIVibranceProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIVibrance" "react-native-image-filter-kit" (propsToObj props) children

let inline CICircularScreen (props: CICircularScreenProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CICircularScreen" "react-native-image-filter-kit" (propsToObj props) children

let inline CIDotScreen (props: CIDotScreenProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIDotScreen" "react-native-image-filter-kit" (propsToObj props) children

let inline CIBumpDistortion (props: CIBumpDistortionProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIBumpDistortion" "react-native-image-filter-kit" (propsToObj props) children

let inline CIBumpDistortionLinear (props: CIBumpDistortionLinearProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIBumpDistortionLinear" "react-native-image-filter-kit" (propsToObj props) children

let inline CICircleSplashDistortion (props: CICircleSplashDistortionProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CICircleSplashDistortion" "react-native-image-filter-kit" (propsToObj props) children

let inline CICircularWrap (props: CICircularWrapProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CICircularWrap" "react-native-image-filter-kit" (propsToObj props) children

let inline CIVortexDistortion (props: CIVortexDistortionProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIVortexDistortion" "react-native-image-filter-kit" (propsToObj props) children

let inline CISharpenLuminance (props: CISharpenLuminanceProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CISharpenLuminance" "react-native-image-filter-kit" (propsToObj props) children

let inline CIUnsharpMask (props: CIUnsharpMaskProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIUnsharpMask" "react-native-image-filter-kit" (propsToObj props) children

let inline CICrystallize (props: CICrystallizeProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CICrystallize" "react-native-image-filter-kit" (propsToObj props) children

let inline CIPixellate (props: CIPixellateProps list) (children: React.ReactElement list): React.ReactElement =
  ofImport "CIPixellate" "react-native-image-filter-kit" (propsToObj props) children
