namespace Fable.Import

open Fable.Core
open ReactNative

[<Erase>]
module ReactNativeImageFilterKit =

  type FilterProps =
      inherit ViewProperties
      abstract resizeOutput: bool option with get, set

  and FilterPoint =
      abstract x: string with get, set
      abstract y: string with get, set

  and ImageMatrixFilterProps =
      inherit FilterProps
      abstract matrix: ResizeArray<float> with get, set

  and ImageMatrixFilterStatic =
      inherit React.ComponentClass<ImageMatrixFilterProps>

  and ImageMatrixFilter =
      ImageMatrixFilterStatic

  and ImageNormalMatrixFilterProps =
      inherit FilterProps

  and ImageNormalMatrixFilterStatic =
      inherit React.ComponentClass<ImageNormalMatrixFilterProps>

  and ImageNormalMatrixFilter =
      ImageNormalMatrixFilterStatic

  and ImageSaturateMatrixFilterProps =
      inherit FilterProps
      abstract value: float with get, set

  and ImageSaturateMatrixFilterStatic =
      inherit React.ComponentClass<ImageSaturateMatrixFilterProps>

  and ImageSaturateMatrixFilter =
      ImageSaturateMatrixFilterStatic

  and ImageHueRotateMatrixFilterProps =
      inherit FilterProps
      abstract value: float with get, set

  and ImageHueRotateMatrixFilterStatic =
      inherit React.ComponentClass<ImageHueRotateMatrixFilterProps>

  and ImageHueRotateMatrixFilter =
      ImageHueRotateMatrixFilterStatic

  and ImageLuminanceToAlphaMatrixFilterProps =
      inherit FilterProps

  and ImageLuminanceToAlphaMatrixFilterStatic =
      inherit React.ComponentClass<ImageLuminanceToAlphaMatrixFilterProps>

  and ImageLuminanceToAlphaMatrixFilter =
      ImageLuminanceToAlphaMatrixFilterStatic

  and ImageInvertMatrixFilterProps =
      inherit FilterProps

  and ImageInvertMatrixFilterStatic =
      inherit React.ComponentClass<ImageInvertMatrixFilterProps>

  and ImageInvertMatrixFilter =
      ImageInvertMatrixFilterStatic

  and ImageGrayscaleMatrixFilterProps =
      inherit FilterProps

  and ImageGrayscaleMatrixFilterStatic =
      inherit React.ComponentClass<ImageGrayscaleMatrixFilterProps>

  and ImageGrayscaleMatrixFilter =
      ImageGrayscaleMatrixFilterStatic

  and ImageSepiaMatrixFilterProps =
      inherit FilterProps

  and ImageSepiaMatrixFilterStatic =
      inherit React.ComponentClass<ImageSepiaMatrixFilterProps>

  and ImageSepiaMatrixFilter =
      ImageSepiaMatrixFilterStatic

  and ImageNightvisionMatrixFilterProps =
      inherit FilterProps
      abstract value: float with get, set

  and ImageNightvisionMatrixFilterStatic =
      inherit React.ComponentClass<ImageNightvisionMatrixFilterProps>

  and ImageNightvisionMatrixFilter =
      ImageNightvisionMatrixFilterStatic

  and ImageWarmMatrixFilterProps =
      inherit FilterProps

  and ImageWarmMatrixFilterStatic =
      inherit React.ComponentClass<ImageWarmMatrixFilterProps>

  and ImageWarmMatrixFilter =
      ImageWarmMatrixFilterStatic

  and ImageCoolMatrixFilterProps =
      inherit FilterProps

  and ImageCoolMatrixFilterStatic =
      inherit React.ComponentClass<ImageCoolMatrixFilterProps>

  and ImageCoolMatrixFilter =
      ImageCoolMatrixFilterStatic

  and ImageBrightnessMatrixFilterProps =
      inherit FilterProps
      abstract value: float with get, set

  and ImageBrightnessMatrixFilterStatic =
      inherit React.ComponentClass<ImageBrightnessMatrixFilterProps>

  and ImageBrightnessMatrixFilter =
      ImageBrightnessMatrixFilterStatic

  and ImageExposureMatrixFilterProps =
      inherit FilterProps
      abstract value: float with get, set

  and ImageExposureMatrixFilterStatic =
      inherit React.ComponentClass<ImageExposureMatrixFilterProps>

  and ImageExposureMatrixFilter =
      ImageExposureMatrixFilterStatic

  and ImageContrastMatrixFilterProps =
      inherit FilterProps
      abstract value: float with get, set

  and ImageContrastMatrixFilterStatic =
      inherit React.ComponentClass<ImageContrastMatrixFilterProps>

  and ImageContrastMatrixFilter =
      ImageContrastMatrixFilterStatic

  and ImageTemperatureMatrixFilterProps =
      inherit FilterProps
      abstract value: float with get, set

  and ImageTemperatureMatrixFilterStatic =
      inherit React.ComponentClass<ImageTemperatureMatrixFilterProps>

  and ImageTemperatureMatrixFilter =
      ImageTemperatureMatrixFilterStatic

  and ImageTintMatrixFilterProps =
      inherit FilterProps
      abstract value: float with get, set

  and ImageTintMatrixFilterStatic =
      inherit React.ComponentClass<ImageTintMatrixFilterProps>

  and ImageTintMatrixFilter =
      ImageTintMatrixFilterStatic

  and ImageThresholdMatrixFilterProps =
      inherit FilterProps
      abstract value: float with get, set

  and ImageThresholdMatrixFilterStatic =
      inherit React.ComponentClass<ImageThresholdMatrixFilterProps>

  and ImageThresholdMatrixFilter =
      ImageThresholdMatrixFilterStatic

  and ImageProtanomalyMatrixFilterProps =
      inherit FilterProps

  and ImageProtanomalyMatrixFilterStatic =
      inherit React.ComponentClass<ImageProtanomalyMatrixFilterProps>

  and ImageProtanomalyMatrixFilter =
      ImageProtanomalyMatrixFilterStatic

  and ImageDeuteranomalyMatrixFilterProps =
      inherit FilterProps

  and ImageDeuteranomalyMatrixFilterStatic =
      inherit React.ComponentClass<ImageDeuteranomalyMatrixFilterProps>

  and ImageDeuteranomalyMatrixFilter =
      ImageDeuteranomalyMatrixFilterStatic

  and ImageTritanomalyMatrixFilterProps =
      inherit FilterProps

  and ImageTritanomalyMatrixFilterStatic =
      inherit React.ComponentClass<ImageTritanomalyMatrixFilterProps>

  and ImageTritanomalyMatrixFilter =
      ImageTritanomalyMatrixFilterStatic

  and ImageProtanopiaMatrixFilterProps =
      inherit FilterProps

  and ImageProtanopiaMatrixFilterStatic =
      inherit React.ComponentClass<ImageProtanopiaMatrixFilterProps>

  and ImageProtanopiaMatrixFilter =
      ImageProtanopiaMatrixFilterStatic

  and ImageDeuteranopiaMatrixFilterProps =
      inherit FilterProps

  and ImageDeuteranopiaMatrixFilterStatic =
      inherit React.ComponentClass<ImageDeuteranopiaMatrixFilterProps>

  and ImageDeuteranopiaMatrixFilter =
      ImageDeuteranopiaMatrixFilterStatic

  and ImageTritanopiaMatrixFilterProps =
      inherit FilterProps

  and ImageTritanopiaMatrixFilterStatic =
      inherit React.ComponentClass<ImageTritanopiaMatrixFilterProps>

  and ImageTritanopiaMatrixFilter =
      ImageTritanopiaMatrixFilterStatic

  and ImageAchromatopsiaMatrixFilterProps =
      inherit FilterProps

  and ImageAchromatopsiaMatrixFilterStatic =
      inherit React.ComponentClass<ImageAchromatopsiaMatrixFilterProps>

  and ImageAchromatopsiaMatrixFilter =
      ImageAchromatopsiaMatrixFilterStatic

  and ImageAchromatomalyMatrixFilterProps =
      inherit FilterProps

  and ImageAchromatomalyMatrixFilterStatic =
      inherit React.ComponentClass<ImageAchromatomalyMatrixFilterProps>

  and ImageAchromatomalyMatrixFilter =
      ImageAchromatomalyMatrixFilterStatic

  and CIBoxBlurProps =
      inherit FilterProps
      abstract inputRadius: string option with get, set

  and CIBoxBlurStatic =
      inherit React.ComponentClass<CIBoxBlurProps>

  and CIBoxBlur =
      CIBoxBlurStatic

  and CIGaussianBlurProps =
      inherit FilterProps
      abstract inputRadius: string option with get, set

  and CIGaussianBlurStatic =
      inherit React.ComponentClass<CIGaussianBlurProps>

  and CIGaussianBlur =
      CIGaussianBlurStatic

  and CIDiscBlurProps =
      inherit FilterProps
      abstract inputRadius: string option with get, set

  and CIDiscBlurStatic =
      inherit React.ComponentClass<CIDiscBlurProps>

  and CIDiscBlur =
      CIDiscBlurStatic

  and CIMedianFilterProps =
      inherit FilterProps

  and CIMedianFilterStatic =
      inherit React.ComponentClass<CIMedianFilterProps>

  and CIMedianFilter =
      CIMedianFilterStatic

  and CIMotionBlurProps =
      inherit FilterProps
      abstract inputRadius: string option with get, set
      abstract inputAngle: float option with get, set

  and CIMotionBlurStatic =
      inherit React.ComponentClass<CIMotionBlurProps>

  and CIMotionBlur =
      CIMotionBlurStatic

  and CINoiseReductionProps =
      inherit FilterProps
      abstract inputNoiseLevel: float option with get, set
      abstract inputSharpness: float option with get, set

  and CINoiseReductionStatic =
      inherit React.ComponentClass<CINoiseReductionProps>

  and CINoiseReduction =
      CINoiseReductionStatic

  and CIZoomBlurProps =
      inherit FilterProps
      abstract inputCenter: FilterPoint option with get, set
      abstract inputAmount: float option with get, set

  and CIZoomBlurStatic =
      inherit React.ComponentClass<CIZoomBlurProps>

  and CIZoomBlur =
      CIZoomBlurStatic

  and CIColorControlsProps =
      inherit FilterProps
      abstract inputSaturation: float option with get, set
      abstract inputBrightness: float option with get, set
      abstract inputContrast: float option with get, set

  and CIColorControlsStatic =
      inherit React.ComponentClass<CIColorControlsProps>

  and CIColorControls =
      CIColorControlsStatic

  and CIColorClampProps =
      inherit FilterProps
      abstract inputMinComponents: ResizeArray<float> option with get, set
      abstract inputMaxComponents: ResizeArray<float> option with get, set

  and CIColorClampStatic =
      inherit React.ComponentClass<CIColorClampProps>

  and CIColorClamp =
      CIColorClampStatic

  and CIMaskToAlphaProps =
      inherit FilterProps

  and CIMaskToAlphaStatic =
      inherit React.ComponentClass<CIMaskToAlphaProps>

  and CIMaskToAlpha =
      CIMaskToAlphaStatic

  and CIMaximumComponentProps =
      inherit FilterProps

  and CIMaximumComponentStatic =
      inherit React.ComponentClass<CIMaximumComponentProps>

  and CIMaximumComponent =
      CIMaximumComponentStatic

  and CIMinimumComponentProps =
      inherit FilterProps

  and CIMinimumComponentStatic =
      inherit React.ComponentClass<CIMinimumComponentProps>

  and CIMinimumComponent =
      CIMinimumComponentStatic

  and CIPhotoEffectChromeProps =
      inherit FilterProps

  and CIPhotoEffectChromeStatic =
      inherit React.ComponentClass<CIPhotoEffectChromeProps>

  and CIPhotoEffectChrome =
      CIPhotoEffectChromeStatic

  and CIPhotoEffectFadeProps =
      inherit FilterProps

  and CIPhotoEffectFadeStatic =
      inherit React.ComponentClass<CIPhotoEffectFadeProps>

  and CIPhotoEffectFade =
      CIPhotoEffectFadeStatic

  and CIPhotoEffectInstantProps =
      inherit FilterProps

  and CIPhotoEffectInstantStatic =
      inherit React.ComponentClass<CIPhotoEffectInstantProps>

  and CIPhotoEffectInstant =
      CIPhotoEffectInstantStatic

  and CIPhotoEffectMonoProps =
      inherit FilterProps

  and CIPhotoEffectMonoStatic =
      inherit React.ComponentClass<CIPhotoEffectMonoProps>

  and CIPhotoEffectMono =
      CIPhotoEffectMonoStatic

  and CIPhotoEffectNoirProps =
      inherit FilterProps

  and CIPhotoEffectNoirStatic =
      inherit React.ComponentClass<CIPhotoEffectNoirProps>

  and CIPhotoEffectNoir =
      CIPhotoEffectNoirStatic

  and CIPhotoEffectProcessProps =
      inherit FilterProps

  and CIPhotoEffectProcessStatic =
      inherit React.ComponentClass<CIPhotoEffectProcessProps>

  and CIPhotoEffectProcess =
      CIPhotoEffectProcessStatic

  and CIPhotoEffectTonalProps =
      inherit FilterProps

  and CIPhotoEffectTonalStatic =
      inherit React.ComponentClass<CIPhotoEffectTonalProps>

  and CIPhotoEffectTonal =
      CIPhotoEffectTonalStatic

  and CIPhotoEffectTransferProps =
      inherit FilterProps

  and CIPhotoEffectTransferStatic =
      inherit React.ComponentClass<CIPhotoEffectTransferProps>

  and CIPhotoEffectTransfer =
      CIPhotoEffectTransferStatic

  and CIColorInvertProps =
      inherit FilterProps

  and CIColorInvertStatic =
      inherit React.ComponentClass<CIColorInvertProps>

  and CIColorInvert =
      CIColorInvertStatic

  and CIColorPosterizeProps =
      inherit FilterProps
      abstract inputLevels: float option with get, set

  and CIColorPosterizeStatic =
      inherit React.ComponentClass<CIColorPosterizeProps>

  and CIColorPosterize =
      CIColorPosterizeStatic

  and CIVibranceProps =
      inherit FilterProps
      abstract inputAmount: float option with get, set

  and CIVibranceStatic =
      inherit React.ComponentClass<CIVibranceProps>

  and CIVibrance =
      CIVibranceStatic

  and CICircularScreenProps =
      inherit FilterProps
      abstract inputCenter: FilterPoint option with get, set
      abstract inputSharpness: float option with get, set
      abstract inputWidth: string option with get, set

  and CICircularScreenStatic =
      inherit React.ComponentClass<CICircularScreenProps>

  and CICircularScreen =
      CICircularScreenStatic

  and CIBumpDistortionProps =
      inherit FilterProps
      abstract inputCenter: FilterPoint option with get, set
      abstract inputRadius: string option with get, set
      abstract inputScale: float option with get, set

  and CIBumpDistortionStatic =
      inherit React.ComponentClass<CIBumpDistortionProps>

  and CIBumpDistortion =
      CIBumpDistortionStatic

  and CIBumpDistortionLinearProps =
      inherit FilterProps
      abstract inputCenter: FilterPoint option with get, set
      abstract inputRadius: string option with get, set
      abstract inputScale: float option with get, set
      abstract inputAngle: float option with get, set

  and CIBumpDistortionLinearStatic =
      inherit React.ComponentClass<CIBumpDistortionLinearProps>

  and CIBumpDistortionLinear =
      CIBumpDistortionLinearStatic

  and CICircleSplashDistortionProps =
      inherit FilterProps
      abstract inputCenter: FilterPoint option with get, set
      abstract inputRadius: string option with get, set

  and CICircleSplashDistortionStatic =
      inherit React.ComponentClass<CICircleSplashDistortionProps>

  and CICircleSplashDistortion =
      CICircleSplashDistortionStatic

  and CICircularWrapProps =
      inherit FilterProps
      abstract inputCenter: FilterPoint option with get, set
      abstract inputRadius: string option with get, set
      abstract inputAngle: float option with get, set

  and CICircularWrapStatic =
      inherit React.ComponentClass<CICircularWrapProps>

  and CICircularWrap =
      CICircularWrapStatic

  and CISharpenLuminanceProps =
      inherit FilterProps
      abstract inputSharpness: float option with get, set

  and CISharpenLuminanceStatic =
      inherit React.ComponentClass<CISharpenLuminanceProps>

  and CISharpenLuminance =
      CISharpenLuminanceStatic

  and CIUnsharpMaskProps =
      inherit FilterProps
      abstract inputRadius: string option with get, set
      abstract inputIntensity: float option with get, set

  and CIUnsharpMaskStatic =
      inherit React.ComponentClass<CIUnsharpMaskProps>

  and CIUnsharpMask =
      CIUnsharpMaskStatic

  type Globals =
      [<Import("ImageMatrixFilter", "react-native-image-filter-kit")>] static member ImageMatrixFilter with get(): ImageMatrixFilterStatic = jsNative and set(v: ImageMatrixFilterStatic): unit = jsNative
      [<Import("ImageNormalMatrixFilter", "react-native-image-filter-kit")>] static member ImageNormalMatrixFilter with get(): ImageNormalMatrixFilterStatic = jsNative and set(v: ImageNormalMatrixFilterStatic): unit = jsNative
      [<Import("ImageSaturateMatrixFilter", "react-native-image-filter-kit")>] static member ImageSaturateMatrixFilter with get(): ImageSaturateMatrixFilterStatic = jsNative and set(v: ImageSaturateMatrixFilterStatic): unit = jsNative
      [<Import("ImageHueRotateMatrixFilter", "react-native-image-filter-kit")>] static member ImageHueRotateMatrixFilter with get(): ImageHueRotateMatrixFilterStatic = jsNative and set(v: ImageHueRotateMatrixFilterStatic): unit = jsNative
      [<Import("ImageLuminanceToAlphaMatrixFilter", "react-native-image-filter-kit")>] static member ImageLuminanceToAlphaMatrixFilter with get(): ImageLuminanceToAlphaMatrixFilterStatic = jsNative and set(v: ImageLuminanceToAlphaMatrixFilterStatic): unit = jsNative
      [<Import("ImageInvertMatrixFilter", "react-native-image-filter-kit")>] static member ImageInvertMatrixFilter with get(): ImageInvertMatrixFilterStatic = jsNative and set(v: ImageInvertMatrixFilterStatic): unit = jsNative
      [<Import("ImageGrayscaleMatrixFilter", "react-native-image-filter-kit")>] static member ImageGrayscaleMatrixFilter with get(): ImageGrayscaleMatrixFilterStatic = jsNative and set(v: ImageGrayscaleMatrixFilterStatic): unit = jsNative
      [<Import("ImageSepiaMatrixFilter", "react-native-image-filter-kit")>] static member ImageSepiaMatrixFilter with get(): ImageSepiaMatrixFilterStatic = jsNative and set(v: ImageSepiaMatrixFilterStatic): unit = jsNative
      [<Import("ImageNightvisionMatrixFilter", "react-native-image-filter-kit")>] static member ImageNightvisionMatrixFilter with get(): ImageNightvisionMatrixFilterStatic = jsNative and set(v: ImageNightvisionMatrixFilterStatic): unit = jsNative
      [<Import("ImageWarmMatrixFilter", "react-native-image-filter-kit")>] static member ImageWarmMatrixFilter with get(): ImageWarmMatrixFilterStatic = jsNative and set(v: ImageWarmMatrixFilterStatic): unit = jsNative
      [<Import("ImageCoolMatrixFilter", "react-native-image-filter-kit")>] static member ImageCoolMatrixFilter with get(): ImageCoolMatrixFilterStatic = jsNative and set(v: ImageCoolMatrixFilterStatic): unit = jsNative
      [<Import("ImageBrightnessMatrixFilter", "react-native-image-filter-kit")>] static member ImageBrightnessMatrixFilter with get(): ImageBrightnessMatrixFilterStatic = jsNative and set(v: ImageBrightnessMatrixFilterStatic): unit = jsNative
      [<Import("ImageExposureMatrixFilter", "react-native-image-filter-kit")>] static member ImageExposureMatrixFilter with get(): ImageExposureMatrixFilterStatic = jsNative and set(v: ImageExposureMatrixFilterStatic): unit = jsNative
      [<Import("ImageContrastMatrixFilter", "react-native-image-filter-kit")>] static member ImageContrastMatrixFilter with get(): ImageContrastMatrixFilterStatic = jsNative and set(v: ImageContrastMatrixFilterStatic): unit = jsNative
      [<Import("ImageTemperatureMatrixFilter", "react-native-image-filter-kit")>] static member ImageTemperatureMatrixFilter with get(): ImageTemperatureMatrixFilterStatic = jsNative and set(v: ImageTemperatureMatrixFilterStatic): unit = jsNative
      [<Import("ImageTintMatrixFilter", "react-native-image-filter-kit")>] static member ImageTintMatrixFilter with get(): ImageTintMatrixFilterStatic = jsNative and set(v: ImageTintMatrixFilterStatic): unit = jsNative
      [<Import("ImageThresholdMatrixFilter", "react-native-image-filter-kit")>] static member ImageThresholdMatrixFilter with get(): ImageThresholdMatrixFilterStatic = jsNative and set(v: ImageThresholdMatrixFilterStatic): unit = jsNative
      [<Import("ImageProtanomalyMatrixFilter", "react-native-image-filter-kit")>] static member ImageProtanomalyMatrixFilter with get(): ImageProtanomalyMatrixFilterStatic = jsNative and set(v: ImageProtanomalyMatrixFilterStatic): unit = jsNative
      [<Import("ImageDeuteranomalyMatrixFilter", "react-native-image-filter-kit")>] static member ImageDeuteranomalyMatrixFilter with get(): ImageDeuteranomalyMatrixFilterStatic = jsNative and set(v: ImageDeuteranomalyMatrixFilterStatic): unit = jsNative
      [<Import("ImageTritanomalyMatrixFilter", "react-native-image-filter-kit")>] static member ImageTritanomalyMatrixFilter with get(): ImageTritanomalyMatrixFilterStatic = jsNative and set(v: ImageTritanomalyMatrixFilterStatic): unit = jsNative
      [<Import("ImageProtanopiaMatrixFilter", "react-native-image-filter-kit")>] static member ImageProtanopiaMatrixFilter with get(): ImageProtanopiaMatrixFilterStatic = jsNative and set(v: ImageProtanopiaMatrixFilterStatic): unit = jsNative
      [<Import("ImageDeuteranopiaMatrixFilter", "react-native-image-filter-kit")>] static member ImageDeuteranopiaMatrixFilter with get(): ImageDeuteranopiaMatrixFilterStatic = jsNative and set(v: ImageDeuteranopiaMatrixFilterStatic): unit = jsNative
      [<Import("ImageTritanopiaMatrixFilter", "react-native-image-filter-kit")>] static member ImageTritanopiaMatrixFilter with get(): ImageTritanopiaMatrixFilterStatic = jsNative and set(v: ImageTritanopiaMatrixFilterStatic): unit = jsNative
      [<Import("ImageAchromatopsiaMatrixFilter", "react-native-image-filter-kit")>] static member ImageAchromatopsiaMatrixFilter with get(): ImageAchromatopsiaMatrixFilterStatic = jsNative and set(v: ImageAchromatopsiaMatrixFilterStatic): unit = jsNative
      [<Import("ImageAchromatomalyMatrixFilter", "react-native-image-filter-kit")>] static member ImageAchromatomalyMatrixFilter with get(): ImageAchromatomalyMatrixFilterStatic = jsNative and set(v: ImageAchromatomalyMatrixFilterStatic): unit = jsNative
      [<Import("CIBoxBlur", "react-native-image-filter-kit")>] static member CIBoxBlur with get(): CIBoxBlurStatic = jsNative and set(v: CIBoxBlurStatic): unit = jsNative
      [<Import("CIGaussianBlur", "react-native-image-filter-kit")>] static member CIGaussianBlur with get(): CIGaussianBlurStatic = jsNative and set(v: CIGaussianBlurStatic): unit = jsNative
      [<Import("CIDiscBlur", "react-native-image-filter-kit")>] static member CIDiscBlur with get(): CIDiscBlurStatic = jsNative and set(v: CIDiscBlurStatic): unit = jsNative
      [<Import("CIMedianFilter", "react-native-image-filter-kit")>] static member CIMedianFilter with get(): CIMedianFilterStatic = jsNative and set(v: CIMedianFilterStatic): unit = jsNative
      [<Import("CIMotionBlur", "react-native-image-filter-kit")>] static member CIMotionBlur with get(): CIMotionBlurStatic = jsNative and set(v: CIMotionBlurStatic): unit = jsNative
      [<Import("CINoiseReduction", "react-native-image-filter-kit")>] static member CINoiseReduction with get(): CINoiseReductionStatic = jsNative and set(v: CINoiseReductionStatic): unit = jsNative
      [<Import("CIZoomBlur", "react-native-image-filter-kit")>] static member CIZoomBlur with get(): CIZoomBlurStatic = jsNative and set(v: CIZoomBlurStatic): unit = jsNative
      [<Import("CIColorControls", "react-native-image-filter-kit")>] static member CIColorControls with get(): CIColorControlsStatic = jsNative and set(v: CIColorControlsStatic): unit = jsNative
      [<Import("CIColorClamp", "react-native-image-filter-kit")>] static member CIColorClamp with get(): CIColorClampStatic = jsNative and set(v: CIColorClampStatic): unit = jsNative
      [<Import("CIMaskToAlpha", "react-native-image-filter-kit")>] static member CIMaskToAlpha with get(): CIMaskToAlphaStatic = jsNative and set(v: CIMaskToAlphaStatic): unit = jsNative
      [<Import("CIMaximumComponent", "react-native-image-filter-kit")>] static member CIMaximumComponent with get(): CIMaximumComponentStatic = jsNative and set(v: CIMaximumComponentStatic): unit = jsNative
      [<Import("CIMinimumComponent", "react-native-image-filter-kit")>] static member CIMinimumComponent with get(): CIMinimumComponentStatic = jsNative and set(v: CIMinimumComponentStatic): unit = jsNative
      [<Import("CIPhotoEffectChrome", "react-native-image-filter-kit")>] static member CIPhotoEffectChrome with get(): CIPhotoEffectChromeStatic = jsNative and set(v: CIPhotoEffectChromeStatic): unit = jsNative
      [<Import("CIPhotoEffectFade", "react-native-image-filter-kit")>] static member CIPhotoEffectFade with get(): CIPhotoEffectFadeStatic = jsNative and set(v: CIPhotoEffectFadeStatic): unit = jsNative
      [<Import("CIPhotoEffectInstant", "react-native-image-filter-kit")>] static member CIPhotoEffectInstant with get(): CIPhotoEffectInstantStatic = jsNative and set(v: CIPhotoEffectInstantStatic): unit = jsNative
      [<Import("CIPhotoEffectMono", "react-native-image-filter-kit")>] static member CIPhotoEffectMono with get(): CIPhotoEffectMonoStatic = jsNative and set(v: CIPhotoEffectMonoStatic): unit = jsNative
      [<Import("CIPhotoEffectNoir", "react-native-image-filter-kit")>] static member CIPhotoEffectNoir with get(): CIPhotoEffectNoirStatic = jsNative and set(v: CIPhotoEffectNoirStatic): unit = jsNative
      [<Import("CIPhotoEffectProcess", "react-native-image-filter-kit")>] static member CIPhotoEffectProcess with get(): CIPhotoEffectProcessStatic = jsNative and set(v: CIPhotoEffectProcessStatic): unit = jsNative
      [<Import("CIPhotoEffectTonal", "react-native-image-filter-kit")>] static member CIPhotoEffectTonal with get(): CIPhotoEffectTonalStatic = jsNative and set(v: CIPhotoEffectTonalStatic): unit = jsNative
      [<Import("CIPhotoEffectTransfer", "react-native-image-filter-kit")>] static member CIPhotoEffectTransfer with get(): CIPhotoEffectTransferStatic = jsNative and set(v: CIPhotoEffectTransferStatic): unit = jsNative
      [<Import("CIColorInvert", "react-native-image-filter-kit")>] static member CIColorInvert with get(): CIColorInvertStatic = jsNative and set(v: CIColorInvertStatic): unit = jsNative
      [<Import("CIColorPosterize", "react-native-image-filter-kit")>] static member CIColorPosterize with get(): CIColorPosterizeStatic = jsNative and set(v: CIColorPosterizeStatic): unit = jsNative
      [<Import("CIVibrance", "react-native-image-filter-kit")>] static member CIVibrance with get(): CIVibranceStatic = jsNative and set(v: CIVibranceStatic): unit = jsNative
      [<Import("CICircularScreen", "react-native-image-filter-kit")>] static member CICircularScreen with get(): CICircularScreenStatic = jsNative and set(v: CICircularScreenStatic): unit = jsNative
      [<Import("CIBumpDistortion", "react-native-image-filter-kit")>] static member CIBumpDistortion with get(): CIBumpDistortionStatic = jsNative and set(v: CIBumpDistortionStatic): unit = jsNative
      [<Import("CIBumpDistortionLinear", "react-native-image-filter-kit")>] static member CIBumpDistortionLinear with get(): CIBumpDistortionLinearStatic = jsNative and set(v: CIBumpDistortionLinearStatic): unit = jsNative
      [<Import("CICircleSplashDistortion", "react-native-image-filter-kit")>] static member CICircleSplashDistortion with get(): CICircleSplashDistortionStatic = jsNative and set(v: CICircleSplashDistortionStatic): unit = jsNative
      [<Import("CICircularWrap", "react-native-image-filter-kit")>] static member CICircularWrap with get(): CICircularWrapStatic = jsNative and set(v: CICircularWrapStatic): unit = jsNative
      [<Import("CISharpenLuminance", "react-native-image-filter-kit")>] static member CISharpenLuminance with get(): CISharpenLuminanceStatic = jsNative and set(v: CISharpenLuminanceStatic): unit = jsNative
      [<Import("CIUnsharpMask", "react-native-image-filter-kit")>] static member CIUnsharpMask with get(): CIUnsharpMaskStatic = jsNative and set(v: CIUnsharpMaskStatic): unit = jsNative