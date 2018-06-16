module Fable.Helpers.ReactNativeImageFilterKit

// open System
// open Fable.Import.ReactNative
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Core
// open Fable.Core.JsInterop
open Fable.Import
// open Fable.PowerPack

type RN = ReactNative.Globals
type RNIFK = ReactNativeImageFilterKit.Globals


module Props =

  type IDistance =
    interface end

  type Point =
    { x: IDistance
      y: IDistance }

  type Distance =
    [<Emit("$0 + \"\"")>] static member Dip(_: float): IDistance = jsNative
    [<Emit("$0 + \"h\"")>] static member HPct(_: float): IDistance = jsNative
    [<Emit("$0 + \"w\"")>] static member WPct(_: float): IDistance = jsNative
    [<Emit("$0 + \"max\"")>] static member MaxPct(_: float): IDistance = jsNative
    [<Emit("$0 + \"min\"")>] static member MinPct(_: float): IDistance = jsNative

  type IImageMatrixFilterProps =
    interface end

  type IImageNormalMatrixFilterProps =
    interface end

  type IImageSaturateMatrixFilterProps =
    interface end

  type IImageHueRotateMatrixFilterProps =
    interface end

  type IImageLuminanceToAlphaMatrixFilterProps =
    interface end

  type IImageInvertMatrixFilterProps =
    interface end

  type IImageGrayscaleMatrixFilterProps =
    interface end

  type IImageSepiaMatrixFilterProps =
    interface end

  type IImageNightvisionMatrixFilterProps =
    interface end

  type IImageWarmMatrixFilterProps =
    interface end

  type IImageCoolMatrixFilterProps =
    interface end

  type IImageBrightnessMatrixFilterProps =
    interface end

  type IImageExposureMatrixFilterProps =
    interface end

  type IImageContrastMatrixFilterProps =
    interface end

  type IImageTemperatureMatrixFilterProps =
    interface end

  type IImageTintMatrixFilterProps =
    interface end

  type IImageThresholdMatrixFilterProps =
    interface end

  type IImageProtanomalyMatrixFilterProps =
    interface end

  type IImageDeuteranomalyMatrixFilterProps =
    interface end

  type IImageTritanomalyMatrixFilterProps =
    interface end

  type IImageProtanopiaMatrixFilterProps =
    interface end

  type IImageDeuteranopiaMatrixFilterProps =
    interface end

  type IImageTritanopiaMatrixFilterProps =
    interface end

  type IImageAchromatopsiaMatrixFilterProps =
    interface end

  type IImageAchromatomalyMatrixFilterProps =
    interface end

  type ICIBoxBlurProps =
    interface end

  type ICIGaussianBlurProps =
    interface end

  type ICIDiscBlurProps =
    interface end

  type ICIMedianFilterProps =
    interface end

  type ICIMotionBlurProps =
    interface end

  type ICINoiseReductionProps =
    interface end

  type ICIZoomBlurProps =
    interface end

  type ICIColorControlsProps =
    interface end

  type ICIColorClampProps =
    interface end

  type ICIMaskToAlphaProps =
    interface end

  type ICIMaximumComponentProps =
    interface end

  type ICIMinimumComponentProps =
    interface end

  type ICIPhotoEffectChromeProps =
    interface end

  type ICIPhotoEffectFadeProps =
    interface end

  type ICIPhotoEffectInstantProps =
    interface end

  type ICIPhotoEffectMonoProps =
    interface end

  type ICIPhotoEffectNoirProps =
    interface end

  type ICIPhotoEffectProcessProps =
    interface end

  type ICIPhotoEffectTonalProps =
    interface end

  type ICIPhotoEffectTransferProps =
    interface end

  type ICIColorInvertProps =
    interface end

  type ICIColorPosterizeProps =
    interface end

  type ICIVibranceProps =
    interface end

  type ICICircularScreenProps =
    interface end

  type ICIBumpDistortionProps =
    interface end

  type ICIBumpDistortionLinearProps =
    interface end

  type ICICircleSplashDistortionProps =
    interface end

  type ICICircularWrapProps =
    interface end

  type ICISharpenLuminanceProps =
    interface end

  type ICIUnsharpMaskProps =
    interface end

  type IFilterProps =
    inherit IImageMatrixFilterProps
    inherit IImageNormalMatrixFilterProps
    inherit IImageSaturateMatrixFilterProps
    inherit IImageHueRotateMatrixFilterProps
    inherit IImageLuminanceToAlphaMatrixFilterProps
    inherit IImageInvertMatrixFilterProps
    inherit IImageGrayscaleMatrixFilterProps
    inherit IImageSepiaMatrixFilterProps
    inherit IImageNightvisionMatrixFilterProps
    inherit IImageWarmMatrixFilterProps
    inherit IImageCoolMatrixFilterProps
    inherit IImageBrightnessMatrixFilterProps
    inherit IImageExposureMatrixFilterProps
    inherit IImageContrastMatrixFilterProps
    inherit IImageTemperatureMatrixFilterProps
    inherit IImageTintMatrixFilterProps
    inherit IImageThresholdMatrixFilterProps
    inherit IImageProtanomalyMatrixFilterProps
    inherit IImageDeuteranomalyMatrixFilterProps
    inherit IImageTritanomalyMatrixFilterProps
    inherit IImageProtanopiaMatrixFilterProps
    inherit IImageDeuteranopiaMatrixFilterProps
    inherit IImageTritanopiaMatrixFilterProps
    inherit IImageAchromatopsiaMatrixFilterProps
    inherit IImageAchromatomalyMatrixFilterProps
    inherit ICIBoxBlurProps
    inherit ICIGaussianBlurProps
    inherit ICIDiscBlurProps
    inherit ICIMedianFilterProps
    inherit ICIMotionBlurProps
    inherit ICINoiseReductionProps
    inherit ICIZoomBlurProps
    inherit ICIColorControlsProps
    inherit ICIColorClampProps
    inherit ICIMaskToAlphaProps
    inherit ICIMaximumComponentProps
    inherit ICIMinimumComponentProps
    inherit ICIPhotoEffectChromeProps
    inherit ICIPhotoEffectFadeProps
    inherit ICIPhotoEffectInstantProps
    inherit ICIPhotoEffectMonoProps
    inherit ICIPhotoEffectNoirProps
    inherit ICIPhotoEffectProcessProps
    inherit ICIPhotoEffectTonalProps
    inherit ICIPhotoEffectTransferProps
    inherit ICIColorInvertProps
    inherit ICIColorPosterizeProps
    inherit ICIVibranceProps
    inherit ICICircularScreenProps
    inherit ICIBumpDistortionProps
    inherit ICIBumpDistortionLinearProps
    inherit ICICircleSplashDistortionProps
    inherit ICICircularWrapProps
    inherit ICISharpenLuminanceProps
    inherit ICIUnsharpMaskProps

    type ImageMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | Matrix of ResizeArray<float>
      interface IFilterProps

    type ImageNormalMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageSaturateMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | Value of float
      interface IFilterProps

    type ImageHueRotateMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | Value of float
      interface IFilterProps

    type ImageLuminanceToAlphaMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageInvertMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageGrayscaleMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageSepiaMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageNightvisionMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | Value of float
      interface IFilterProps

    type ImageWarmMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageCoolMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageBrightnessMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | Value of float
      interface IFilterProps

    type ImageExposureMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | Value of float
      interface IFilterProps

    type ImageContrastMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | Value of float
      interface IFilterProps

    type ImageTemperatureMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | Value of float
      interface IFilterProps

    type ImageTintMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | Value of float
      interface IFilterProps

    type ImageThresholdMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageProtanomalyMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageDeuteranomalyMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageTritanomalyMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageProtanopiaMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageDeuteranopiaMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageTritanopiaMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageAchromatopsiaMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type ImageAchromatomalyMatrixFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIBoxBlurProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputRadius of IDistance
      interface IFilterProps

    type CIGaussianBlurProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputRadius of IDistance
      interface IFilterProps

    type CIDiscBlurProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputRadius of IDistance
      interface IFilterProps

    type CIMedianFilterProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIMotionBlurProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputRadius of IDistance
      | InputAngle of float
      interface IFilterProps

    type CINoiseReductionProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputNoiseLevel of float
      | InputSharpness of float
      interface IFilterProps

    type CIZoomBlurProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputCenter of Point
      | InputAmount of float
      interface IFilterProps

    type CIColorControlsProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputSaturation of float
      | InputBrightness of float
      | InputContrast of float
      interface IFilterProps

    type CIColorClampProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputMinComponents of ResizeArray<float>
      | InputMaxComponents of ResizeArray<float>
      interface IFilterProps

    type CIMaskToAlphaProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIMaximumComponentProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIMinimumComponentProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIPhotoEffectChromeProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIPhotoEffectFadeProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIPhotoEffectInstantProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIPhotoEffectMonoProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIPhotoEffectNoirProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIPhotoEffectProcessProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIPhotoEffectTonalProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIPhotoEffectTransferProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIColorInvertProps =
      | Style of IStyle list
      | ResizeOutput of bool
      interface IFilterProps

    type CIColorPosterizeProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputLevels of float
      interface IFilterProps

    type CIVibranceProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputAmount of float
      interface IFilterProps

    type CICircularScreenProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputCenter of Point
      | InputSharpness of float
      | InputWidth of IDistance
      interface IFilterProps

    type CIBumpDistortionProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputCenter of Point
      | InputRadius of IDistance
      | InputScale of float
      interface IFilterProps

    type CIBumpDistortionLinearProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputCenter of Point
      | InputRadius of IDistance
      | InputScale of float
      | InputAngle of float
      interface IFilterProps

    type CICircleSplashDistortionProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputCenter of Point
      | InputRadius of IDistance
      interface IFilterProps

    type CICircularWrapProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputCenter of Point
      | InputRadius of IDistance
      | InputAngle of float
      interface IFilterProps

    type CISharpenLuminanceProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputSharpness of float
      interface IFilterProps

    type CIUnsharpMaskProps =
      | Style of IStyle list
      | ResizeOutput of bool
      | InputRadius of IDistance
      | InputIntensity of float
      interface IFilterProps


open Props

let inline ImageMatrixFilter (props: IImageMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageMatrixFilter, props, children)

let inline ImageNormalMatrixFilter (props: IImageNormalMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageNormalMatrixFilter, props, children)

let inline ImageSaturateMatrixFilter (props: IImageSaturateMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageSaturateMatrixFilter, props, children)

let inline ImageHueRotateMatrixFilter (props: IImageHueRotateMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageHueRotateMatrixFilter, props, children)

let inline ImageLuminanceToAlphaMatrixFilter (props: IImageLuminanceToAlphaMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageLuminanceToAlphaMatrixFilter, props, children)

let inline ImageInvertMatrixFilter (props: IImageInvertMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageInvertMatrixFilter, props, children)

let inline ImageGrayscaleMatrixFilter (props: IImageGrayscaleMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageGrayscaleMatrixFilter, props, children)

let inline ImageSepiaMatrixFilter (props: IImageSepiaMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageSepiaMatrixFilter, props, children)

let inline ImageNightvisionMatrixFilter (props: IImageNightvisionMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageNightvisionMatrixFilter, props, children)

let inline ImageWarmMatrixFilter (props: IImageWarmMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageWarmMatrixFilter, props, children)

let inline ImageCoolMatrixFilter (props: IImageCoolMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageCoolMatrixFilter, props, children)

let inline ImageBrightnessMatrixFilter (props: IImageBrightnessMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageBrightnessMatrixFilter, props, children)

let inline ImageExposureMatrixFilter (props: IImageExposureMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageExposureMatrixFilter, props, children)

let inline ImageContrastMatrixFilter (props: IImageContrastMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageContrastMatrixFilter, props, children)

let inline ImageTemperatureMatrixFilter (props: IImageTemperatureMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageTemperatureMatrixFilter, props, children)

let inline ImageTintMatrixFilter (props: IImageTintMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageTintMatrixFilter, props, children)

let inline ImageThresholdMatrixFilter (props: IImageThresholdMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageThresholdMatrixFilter, props, children)

let inline ImageProtanomalyMatrixFilter (props: IImageProtanomalyMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageProtanomalyMatrixFilter, props, children)

let inline ImageDeuteranomalyMatrixFilter (props: IImageDeuteranomalyMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageDeuteranomalyMatrixFilter, props, children)

let inline ImageTritanomalyMatrixFilter (props: IImageTritanomalyMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageTritanomalyMatrixFilter, props, children)

let inline ImageProtanopiaMatrixFilter (props: IImageProtanopiaMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageProtanopiaMatrixFilter, props, children)

let inline ImageDeuteranopiaMatrixFilter (props: IImageDeuteranopiaMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageDeuteranopiaMatrixFilter, props, children)

let inline ImageTritanopiaMatrixFilter (props: IImageTritanopiaMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageTritanopiaMatrixFilter, props, children)

let inline ImageAchromatopsiaMatrixFilter (props: IImageAchromatopsiaMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageAchromatopsiaMatrixFilter, props, children)

let inline ImageAchromatomalyMatrixFilter (props: IImageAchromatomalyMatrixFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.ImageAchromatomalyMatrixFilter, props, children)

let inline CIBoxBlur (props: ICIBoxBlurProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIBoxBlur, props, children)

let inline CIGaussianBlur (props: ICIGaussianBlurProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIGaussianBlur, props, children)

let inline CIDiscBlur (props: ICIDiscBlurProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIDiscBlur, props, children)

let inline CIMedianFilter (props: ICIMedianFilterProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIMedianFilter, props, children)

let inline CIMotionBlur (props: ICIMotionBlurProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIMotionBlur, props, children)

let inline CINoiseReduction (props: ICINoiseReductionProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CINoiseReduction, props, children)

let inline CIZoomBlur (props: ICIZoomBlurProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIZoomBlur, props, children)

let inline CIColorControls (props: ICIColorControlsProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIColorControls, props, children)

let inline CIColorClamp (props: ICIColorClampProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIColorClamp, props, children)

let inline CIMaskToAlpha (props: ICIMaskToAlphaProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIMaskToAlpha, props, children)

let inline CIMaximumComponent (props: ICIMaximumComponentProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIMaximumComponent, props, children)

let inline CIMinimumComponent (props: ICIMinimumComponentProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIMinimumComponent, props, children)

let inline CIPhotoEffectChrome (props: ICIPhotoEffectChromeProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectChrome, props, children)

let inline CIPhotoEffectFade (props: ICIPhotoEffectFadeProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectFade, props, children)

let inline CIPhotoEffectInstant (props: ICIPhotoEffectInstantProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectInstant, props, children)

let inline CIPhotoEffectMono (props: ICIPhotoEffectMonoProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectMono, props, children)

let inline CIPhotoEffectNoir (props: ICIPhotoEffectNoirProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectNoir, props, children)

let inline CIPhotoEffectProcess (props: ICIPhotoEffectProcessProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectProcess, props, children)

let inline CIPhotoEffectTonal (props: ICIPhotoEffectTonalProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectTonal, props, children)

let inline CIPhotoEffectTransfer (props: ICIPhotoEffectTransferProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIPhotoEffectTransfer, props, children)

let inline CIColorInvert (props: ICIColorInvertProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIColorInvert, props, children)

let inline CIColorPosterize (props: ICIColorPosterizeProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIColorPosterize, props, children)

let inline CIVibrance (props: ICIVibranceProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIVibrance, props, children)

let inline CICircularScreen (props: ICICircularScreenProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CICircularScreen, props, children)

let inline CIBumpDistortion (props: ICIBumpDistortionProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIBumpDistortion, props, children)

let inline CIBumpDistortionLinear (props: ICIBumpDistortionLinearProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIBumpDistortionLinear, props, children)

let inline CICircleSplashDistortion (props: ICICircleSplashDistortionProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CICircleSplashDistortion, props, children)

let inline CICircularWrap (props: ICICircularWrapProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CICircularWrap, props, children)

let inline CISharpenLuminance (props: ICISharpenLuminanceProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CISharpenLuminance, props, children)

let inline CIUnsharpMask (props: ICIUnsharpMaskProps list) (children: React.ReactElement list): React.ReactElement =
  createElement(RNIFK.CIUnsharpMask, props, children)
