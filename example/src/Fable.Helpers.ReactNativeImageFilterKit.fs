module Fable.Helpers.ReactNativeImageFilterKit

open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Core
open Fable.Import

type RN = ReactNative.Globals
type RNIFK = ReactNativeImageFilterKit.Globals


module Props =

  type IDistance =
    interface end

  type IPoint =
    interface end

  type IRGBAVector =
    interface end

  type ColorMatrixProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Matrix of ResizeArray<float>

  type NormalProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type SaturateProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type HueRotateProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type LuminanceToAlphaProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type InvertProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type GrayscaleProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type SepiaProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type NightvisionProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type WarmProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type CoolProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type BrightnessProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type ExposureProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type ContrastProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type TemperatureProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type TintProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type ThresholdProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type ProtanomalyProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type DeuteranomalyProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type TritanomalyProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ProtanopiaProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type DeuteranopiaProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type TritanopiaProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type AchromatopsiaProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type AchromatomalyProps =
    | Style of IStyle list
    | ResizeOutput of bool

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
    | ResizeOutput of bool

  type CIMotionBlurProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputRadius of IDistance
    | InputAngle of float

  type CINoiseReductionProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputNoiseLevel of float
    | InputSharpness of float

  type CIZoomBlurProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputCenter of IPoint
    | InputAmount of IDistance

  type CIColorControlsProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputSaturation of float
    | InputBrightness of float
    | InputContrast of float

  type CIColorMatrixProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputRVector of IRGBAVector
    | InputGVector of IRGBAVector
    | InputBVector of IRGBAVector
    | InputAVector of IRGBAVector
    | InputBiasVector of IRGBAVector

  type CIColorClampProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputMinComponents of IRGBAVector
    | InputMaxComponents of IRGBAVector

  type CIMaskToAlphaProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type CIMaximumComponentProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type CIMinimumComponentProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type CIPhotoEffectChromeProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type CIPhotoEffectFadeProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type CIPhotoEffectInstantProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type CIPhotoEffectMonoProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type CIPhotoEffectNoirProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type CIPhotoEffectProcessProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type CIPhotoEffectTonalProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type CIPhotoEffectTransferProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type CIColorInvertProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type CIColorPosterizeProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputLevels of float

  type CIVibranceProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputAmount of float

  type CICircularScreenProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputCenter of IPoint
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
    | ResizeOutput of bool
    | InputCenter of IPoint
    | InputRadius of IDistance
    | InputScale of float
    | InputAngle of float

  type CICircleSplashDistortionProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputCenter of IPoint
    | InputRadius of IDistance

  type CICircularWrapProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputCenter of IPoint
    | InputRadius of IDistance
    | InputAngle of float

  type CISharpenLuminanceProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputSharpness of float

  type CIUnsharpMaskProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputRadius of IDistance
    | InputIntensity of float


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

let inline ColorMatrix (props: ColorMatrixProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ColorMatrix, props, children)

let inline Normal (props: NormalProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Normal, props, children)

let inline Saturate (props: SaturateProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Saturate, props, children)

let inline HueRotate (props: HueRotateProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.HueRotate, props, children)

let inline LuminanceToAlpha (props: LuminanceToAlphaProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.LuminanceToAlpha, props, children)

let inline Invert (props: InvertProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Invert, props, children)

let inline Grayscale (props: GrayscaleProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Grayscale, props, children)

let inline Sepia (props: SepiaProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Sepia, props, children)

let inline Nightvision (props: NightvisionProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Nightvision, props, children)

let inline Warm (props: WarmProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Warm, props, children)

let inline Cool (props: CoolProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Cool, props, children)

let inline Brightness (props: BrightnessProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Brightness, props, children)

let inline Exposure (props: ExposureProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Exposure, props, children)

let inline Contrast (props: ContrastProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Contrast, props, children)

let inline Temperature (props: TemperatureProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Temperature, props, children)

let inline Tint (props: TintProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Tint, props, children)

let inline Threshold (props: ThresholdProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Threshold, props, children)

let inline Protanomaly (props: ProtanomalyProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Protanomaly, props, children)

let inline Deuteranomaly (props: DeuteranomalyProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Deuteranomaly, props, children)

let inline Tritanomaly (props: TritanomalyProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Tritanomaly, props, children)

let inline Protanopia (props: ProtanopiaProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Protanopia, props, children)

let inline Deuteranopia (props: DeuteranopiaProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Deuteranopia, props, children)

let inline Tritanopia (props: TritanopiaProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Tritanopia, props, children)

let inline Achromatopsia (props: AchromatopsiaProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Achromatopsia, props, children)

let inline Achromatomaly (props: AchromatomalyProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.Achromatomaly, props, children)

let inline CIBoxBlur (props: CIBoxBlurProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIBoxBlur, props, children)

let inline CIGaussianBlur (props: CIGaussianBlurProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIGaussianBlur, props, children)

let inline CIDiscBlur (props: CIDiscBlurProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIDiscBlur, props, children)

let inline CIMedianFilter (props: CIMedianFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIMedianFilter, props, children)

let inline CIMotionBlur (props: CIMotionBlurProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIMotionBlur, props, children)

let inline CINoiseReduction (props: CINoiseReductionProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CINoiseReduction, props, children)

let inline CIZoomBlur (props: CIZoomBlurProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIZoomBlur, props, children)

let inline CIColorControls (props: CIColorControlsProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIColorControls, props, children)

let inline CIColorMatrix (props: CIColorMatrixProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIColorMatrix, props, children)

let inline CIColorClamp (props: CIColorClampProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIColorClamp, props, children)

let inline CIMaskToAlpha (props: CIMaskToAlphaProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIMaskToAlpha, props, children)

let inline CIMaximumComponent (props: CIMaximumComponentProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIMaximumComponent, props, children)

let inline CIMinimumComponent (props: CIMinimumComponentProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIMinimumComponent, props, children)

let inline CIPhotoEffectChrome (props: CIPhotoEffectChromeProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectChrome, props, children)

let inline CIPhotoEffectFade (props: CIPhotoEffectFadeProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectFade, props, children)

let inline CIPhotoEffectInstant (props: CIPhotoEffectInstantProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectInstant, props, children)

let inline CIPhotoEffectMono (props: CIPhotoEffectMonoProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectMono, props, children)

let inline CIPhotoEffectNoir (props: CIPhotoEffectNoirProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectNoir, props, children)

let inline CIPhotoEffectProcess (props: CIPhotoEffectProcessProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectProcess, props, children)

let inline CIPhotoEffectTonal (props: CIPhotoEffectTonalProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectTonal, props, children)

let inline CIPhotoEffectTransfer (props: CIPhotoEffectTransferProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectTransfer, props, children)

let inline CIColorInvert (props: CIColorInvertProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIColorInvert, props, children)

let inline CIColorPosterize (props: CIColorPosterizeProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIColorPosterize, props, children)

let inline CIVibrance (props: CIVibranceProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIVibrance, props, children)

let inline CICircularScreen (props: CICircularScreenProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CICircularScreen, props, children)

let inline CIBumpDistortion (props: CIBumpDistortionProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIBumpDistortion, props, children)

let inline CIBumpDistortionLinear (props: CIBumpDistortionLinearProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIBumpDistortionLinear, props, children)

let inline CICircleSplashDistortion (props: CICircleSplashDistortionProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CICircleSplashDistortion, props, children)

let inline CICircularWrap (props: CICircularWrapProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CICircularWrap, props, children)

let inline CISharpenLuminance (props: CISharpenLuminanceProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CISharpenLuminance, props, children)

let inline CIUnsharpMask (props: CIUnsharpMaskProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIUnsharpMask, props, children)
