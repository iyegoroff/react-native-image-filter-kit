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

  type ImageMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Matrix of ResizeArray<float>

  type ImageNormalMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageSaturateMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type ImageHueRotateMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type ImageLuminanceToAlphaMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageInvertMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageGrayscaleMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageSepiaMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageNightvisionMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type ImageWarmMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageCoolMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageBrightnessMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type ImageExposureMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type ImageContrastMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type ImageTemperatureMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type ImageTintMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | Value of float

  type ImageThresholdMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageProtanomalyMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageDeuteranomalyMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageTritanomalyMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageProtanopiaMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageDeuteranopiaMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageTritanopiaMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageAchromatopsiaMatrixFilterProps =
    | Style of IStyle list
    | ResizeOutput of bool

  type ImageAchromatomalyMatrixFilterProps =
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

let inline ImageMatrixFilter (props: ImageMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageMatrixFilter, props, children)

let inline ImageNormalMatrixFilter (props: ImageNormalMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageNormalMatrixFilter, props, children)

let inline ImageSaturateMatrixFilter (props: ImageSaturateMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageSaturateMatrixFilter, props, children)

let inline ImageHueRotateMatrixFilter (props: ImageHueRotateMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageHueRotateMatrixFilter, props, children)

let inline ImageLuminanceToAlphaMatrixFilter (props: ImageLuminanceToAlphaMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageLuminanceToAlphaMatrixFilter, props, children)

let inline ImageInvertMatrixFilter (props: ImageInvertMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageInvertMatrixFilter, props, children)

let inline ImageGrayscaleMatrixFilter (props: ImageGrayscaleMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageGrayscaleMatrixFilter, props, children)

let inline ImageSepiaMatrixFilter (props: ImageSepiaMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageSepiaMatrixFilter, props, children)

let inline ImageNightvisionMatrixFilter (props: ImageNightvisionMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageNightvisionMatrixFilter, props, children)

let inline ImageWarmMatrixFilter (props: ImageWarmMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageWarmMatrixFilter, props, children)

let inline ImageCoolMatrixFilter (props: ImageCoolMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageCoolMatrixFilter, props, children)

let inline ImageBrightnessMatrixFilter (props: ImageBrightnessMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageBrightnessMatrixFilter, props, children)

let inline ImageExposureMatrixFilter (props: ImageExposureMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageExposureMatrixFilter, props, children)

let inline ImageContrastMatrixFilter (props: ImageContrastMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageContrastMatrixFilter, props, children)

let inline ImageTemperatureMatrixFilter (props: ImageTemperatureMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageTemperatureMatrixFilter, props, children)

let inline ImageTintMatrixFilter (props: ImageTintMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageTintMatrixFilter, props, children)

let inline ImageThresholdMatrixFilter (props: ImageThresholdMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageThresholdMatrixFilter, props, children)

let inline ImageProtanomalyMatrixFilter (props: ImageProtanomalyMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageProtanomalyMatrixFilter, props, children)

let inline ImageDeuteranomalyMatrixFilter (props: ImageDeuteranomalyMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageDeuteranomalyMatrixFilter, props, children)

let inline ImageTritanomalyMatrixFilter (props: ImageTritanomalyMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageTritanomalyMatrixFilter, props, children)

let inline ImageProtanopiaMatrixFilter (props: ImageProtanopiaMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageProtanopiaMatrixFilter, props, children)

let inline ImageDeuteranopiaMatrixFilter (props: ImageDeuteranopiaMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageDeuteranopiaMatrixFilter, props, children)

let inline ImageTritanopiaMatrixFilter (props: ImageTritanopiaMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageTritanopiaMatrixFilter, props, children)

let inline ImageAchromatopsiaMatrixFilter (props: ImageAchromatopsiaMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageAchromatopsiaMatrixFilter, props, children)

let inline ImageAchromatomalyMatrixFilter (props: ImageAchromatomalyMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageAchromatomalyMatrixFilter, props, children)

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
