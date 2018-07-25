namespace Fable.Import

open Fable.Core
open Fable.Import.ReactNative

[<Erase>]
module ReactNativeImageFilterKit =

  type FilterProps =
      inherit ViewProperties

  and ResizingFilterProps =
      inherit FilterProps
      abstract resizeOutput: bool option with get, set

  and FilterPoint =
      abstract x: string with get, set
      abstract y: string with get, set

  and ColorMatrixProps =
      inherit FilterProps
      abstract matrix: ResizeArray<float> with get, set

  and ColorMatrixStatic =
      inherit React.ComponentClass<ColorMatrixProps>

  and ColorMatrix =
      ColorMatrixStatic

  and NormalProps =
      inherit FilterProps

  and NormalStatic =
      inherit React.ComponentClass<NormalProps>

  and Normal =
      NormalStatic

  and SaturateProps =
      inherit FilterProps
      abstract value: float with get, set

  and SaturateStatic =
      inherit React.ComponentClass<SaturateProps>

  and Saturate =
      SaturateStatic

  and HueRotateProps =
      inherit FilterProps
      abstract value: float with get, set

  and HueRotateStatic =
      inherit React.ComponentClass<HueRotateProps>

  and HueRotate =
      HueRotateStatic

  and LuminanceToAlphaProps =
      inherit FilterProps

  and LuminanceToAlphaStatic =
      inherit React.ComponentClass<LuminanceToAlphaProps>

  and LuminanceToAlpha =
      LuminanceToAlphaStatic

  and InvertProps =
      inherit FilterProps

  and InvertStatic =
      inherit React.ComponentClass<InvertProps>

  and Invert =
      InvertStatic

  and GrayscaleProps =
      inherit FilterProps

  and GrayscaleStatic =
      inherit React.ComponentClass<GrayscaleProps>

  and Grayscale =
      GrayscaleStatic

  and SepiaProps =
      inherit FilterProps

  and SepiaStatic =
      inherit React.ComponentClass<SepiaProps>

  and Sepia =
      SepiaStatic

  and NightvisionProps =
      inherit FilterProps

  and NightvisionStatic =
      inherit React.ComponentClass<NightvisionProps>

  and Nightvision =
      NightvisionStatic

  and WarmProps =
      inherit FilterProps

  and WarmStatic =
      inherit React.ComponentClass<WarmProps>

  and Warm =
      WarmStatic

  and CoolProps =
      inherit FilterProps

  and CoolStatic =
      inherit React.ComponentClass<CoolProps>

  and Cool =
      CoolStatic

  and BrightnessProps =
      inherit FilterProps
      abstract value: float with get, set

  and BrightnessStatic =
      inherit React.ComponentClass<BrightnessProps>

  and Brightness =
      BrightnessStatic

  and ExposureProps =
      inherit FilterProps
      abstract value: float with get, set

  and ExposureStatic =
      inherit React.ComponentClass<ExposureProps>

  and Exposure =
      ExposureStatic

  and ContrastProps =
      inherit FilterProps
      abstract value: float with get, set

  and ContrastStatic =
      inherit React.ComponentClass<ContrastProps>

  and Contrast =
      ContrastStatic

  and TemperatureProps =
      inherit FilterProps
      abstract value: float with get, set

  and TemperatureStatic =
      inherit React.ComponentClass<TemperatureProps>

  and Temperature =
      TemperatureStatic

  and TintProps =
      inherit FilterProps
      abstract value: float with get, set

  and TintStatic =
      inherit React.ComponentClass<TintProps>

  and Tint =
      TintStatic

  and ThresholdProps =
      inherit FilterProps
      abstract value: float with get, set

  and ThresholdStatic =
      inherit React.ComponentClass<ThresholdProps>

  and Threshold =
      ThresholdStatic

  and ProtanomalyProps =
      inherit FilterProps

  and ProtanomalyStatic =
      inherit React.ComponentClass<ProtanomalyProps>

  and Protanomaly =
      ProtanomalyStatic

  and DeuteranomalyProps =
      inherit FilterProps

  and DeuteranomalyStatic =
      inherit React.ComponentClass<DeuteranomalyProps>

  and Deuteranomaly =
      DeuteranomalyStatic

  and TritanomalyProps =
      inherit FilterProps

  and TritanomalyStatic =
      inherit React.ComponentClass<TritanomalyProps>

  and Tritanomaly =
      TritanomalyStatic

  and ProtanopiaProps =
      inherit FilterProps

  and ProtanopiaStatic =
      inherit React.ComponentClass<ProtanopiaProps>

  and Protanopia =
      ProtanopiaStatic

  and DeuteranopiaProps =
      inherit FilterProps

  and DeuteranopiaStatic =
      inherit React.ComponentClass<DeuteranopiaProps>

  and Deuteranopia =
      DeuteranopiaStatic

  and TritanopiaProps =
      inherit FilterProps

  and TritanopiaStatic =
      inherit React.ComponentClass<TritanopiaProps>

  and Tritanopia =
      TritanopiaStatic

  and AchromatopsiaProps =
      inherit FilterProps

  and AchromatopsiaStatic =
      inherit React.ComponentClass<AchromatopsiaProps>

  and Achromatopsia =
      AchromatopsiaStatic

  and AchromatomalyProps =
      inherit FilterProps

  and AchromatomalyStatic =
      inherit React.ComponentClass<AchromatomalyProps>

  and Achromatomaly =
      AchromatomalyStatic

  and ColorMatrixColorFilterProps =
      inherit FilterProps
      abstract matrix: ResizeArray<float> with get, set

  and ColorMatrixColorFilterStatic =
      inherit React.ComponentClass<ColorMatrixColorFilterProps>

  and ColorMatrixColorFilter =
      ColorMatrixColorFilterStatic

  and RoundAsCircleProps =
      inherit FilterProps

  and RoundAsCircleStatic =
      inherit React.ComponentClass<RoundAsCircleProps>

  and RoundAsCircle =
      RoundAsCircleStatic

  and IterativeBoxBlurProps =
      inherit FilterProps
      abstract blurRadius: float option with get, set
      abstract iterations: float option with get, set

  and IterativeBoxBlurStatic =
      inherit React.ComponentClass<IterativeBoxBlurProps>

  and IterativeBoxBlur =
      IterativeBoxBlurStatic

  and CIBoxBlurProps =
      inherit ResizingFilterProps
      abstract inputRadius: string option with get, set

  and CIBoxBlurStatic =
      inherit React.ComponentClass<CIBoxBlurProps>

  and CIBoxBlur =
      CIBoxBlurStatic

  and CIGaussianBlurProps =
      inherit ResizingFilterProps
      abstract inputRadius: string option with get, set

  and CIGaussianBlurStatic =
      inherit React.ComponentClass<CIGaussianBlurProps>

  and CIGaussianBlur =
      CIGaussianBlurStatic

  and CIDiscBlurProps =
      inherit ResizingFilterProps
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
      inherit ResizingFilterProps
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
      inherit ResizingFilterProps
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

  and CIColorMatrixProps =
      inherit FilterProps
      abstract inputRVector: ResizeArray<float> option with get, set
      abstract inputGVector: ResizeArray<float> option with get, set
      abstract inputBVector: ResizeArray<float> option with get, set
      abstract inputAVector: ResizeArray<float> option with get, set
      abstract inputBiasVector: ResizeArray<float> option with get, set

  and CIColorMatrixStatic =
      inherit React.ComponentClass<CIColorMatrixProps>

  and CIColorMatrix =
      CIColorMatrixStatic

  and CIHueAdjustProps =
      inherit FilterProps
      abstract inputAngle: float option with get, set

  and CIHueAdjustStatic =
      inherit React.ComponentClass<CIHueAdjustProps>

  and CIHueAdjust =
      CIHueAdjustStatic

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

  and CIVignetteEffectProps =
      inherit FilterProps
      abstract inputCenter: FilterPoint option with get, set
      abstract inputIntensity: float option with get, set
      abstract inputRadius: string option with get, set

  and CIVignetteEffectStatic =
      inherit React.ComponentClass<CIVignetteEffectProps>

  and CIVignetteEffect =
      CIVignetteEffectStatic

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

  and CIDotScreenProps =
      inherit FilterProps
      abstract inputCenter: FilterPoint option with get, set
      abstract inputAngle: float option with get, set
      abstract inputSharpness: float option with get, set
      abstract inputWidth: string option with get, set

  and CIDotScreenStatic =
      inherit React.ComponentClass<CIDotScreenProps>

  and CIDotScreen =
      CIDotScreenStatic

  and CIBumpDistortionProps =
      inherit ResizingFilterProps
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
      inherit ResizingFilterProps
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

  and CICrystallizeProps =
      inherit FilterProps
      abstract inputRadius: string option with get, set
      abstract inputCenter: FilterPoint option with get, set

  and CICrystallizeStatic =
      inherit React.ComponentClass<CICrystallizeProps>

  and CICrystallize =
      CICrystallizeStatic


  type Globals =
      [<Import("ColorMatrix", "react-native-image-filter-kit")>] static member ColorMatrix with get(): ColorMatrixStatic = jsNative and set(v: ColorMatrixStatic): unit = jsNative
      [<Import("Normal", "react-native-image-filter-kit")>] static member Normal with get(): NormalStatic = jsNative and set(v: NormalStatic): unit = jsNative
      [<Import("Saturate", "react-native-image-filter-kit")>] static member Saturate with get(): SaturateStatic = jsNative and set(v: SaturateStatic): unit = jsNative
      [<Import("HueRotate", "react-native-image-filter-kit")>] static member HueRotate with get(): HueRotateStatic = jsNative and set(v: HueRotateStatic): unit = jsNative
      [<Import("LuminanceToAlpha", "react-native-image-filter-kit")>] static member LuminanceToAlpha with get(): LuminanceToAlphaStatic = jsNative and set(v: LuminanceToAlphaStatic): unit = jsNative
      [<Import("Invert", "react-native-image-filter-kit")>] static member Invert with get(): InvertStatic = jsNative and set(v: InvertStatic): unit = jsNative
      [<Import("Grayscale", "react-native-image-filter-kit")>] static member Grayscale with get(): GrayscaleStatic = jsNative and set(v: GrayscaleStatic): unit = jsNative
      [<Import("Sepia", "react-native-image-filter-kit")>] static member Sepia with get(): SepiaStatic = jsNative and set(v: SepiaStatic): unit = jsNative
      [<Import("Nightvision", "react-native-image-filter-kit")>] static member Nightvision with get(): NightvisionStatic = jsNative and set(v: NightvisionStatic): unit = jsNative
      [<Import("Warm", "react-native-image-filter-kit")>] static member Warm with get(): WarmStatic = jsNative and set(v: WarmStatic): unit = jsNative
      [<Import("Cool", "react-native-image-filter-kit")>] static member Cool with get(): CoolStatic = jsNative and set(v: CoolStatic): unit = jsNative
      [<Import("Brightness", "react-native-image-filter-kit")>] static member Brightness with get(): BrightnessStatic = jsNative and set(v: BrightnessStatic): unit = jsNative
      [<Import("Exposure", "react-native-image-filter-kit")>] static member Exposure with get(): ExposureStatic = jsNative and set(v: ExposureStatic): unit = jsNative
      [<Import("Contrast", "react-native-image-filter-kit")>] static member Contrast with get(): ContrastStatic = jsNative and set(v: ContrastStatic): unit = jsNative
      [<Import("Temperature", "react-native-image-filter-kit")>] static member Temperature with get(): TemperatureStatic = jsNative and set(v: TemperatureStatic): unit = jsNative
      [<Import("Tint", "react-native-image-filter-kit")>] static member Tint with get(): TintStatic = jsNative and set(v: TintStatic): unit = jsNative
      [<Import("Threshold", "react-native-image-filter-kit")>] static member Threshold with get(): ThresholdStatic = jsNative and set(v: ThresholdStatic): unit = jsNative
      [<Import("Protanomaly", "react-native-image-filter-kit")>] static member Protanomaly with get(): ProtanomalyStatic = jsNative and set(v: ProtanomalyStatic): unit = jsNative
      [<Import("Deuteranomaly", "react-native-image-filter-kit")>] static member Deuteranomaly with get(): DeuteranomalyStatic = jsNative and set(v: DeuteranomalyStatic): unit = jsNative
      [<Import("Tritanomaly", "react-native-image-filter-kit")>] static member Tritanomaly with get(): TritanomalyStatic = jsNative and set(v: TritanomalyStatic): unit = jsNative
      [<Import("Protanopia", "react-native-image-filter-kit")>] static member Protanopia with get(): ProtanopiaStatic = jsNative and set(v: ProtanopiaStatic): unit = jsNative
      [<Import("Deuteranopia", "react-native-image-filter-kit")>] static member Deuteranopia with get(): DeuteranopiaStatic = jsNative and set(v: DeuteranopiaStatic): unit = jsNative
      [<Import("Tritanopia", "react-native-image-filter-kit")>] static member Tritanopia with get(): TritanopiaStatic = jsNative and set(v: TritanopiaStatic): unit = jsNative
      [<Import("Achromatopsia", "react-native-image-filter-kit")>] static member Achromatopsia with get(): AchromatopsiaStatic = jsNative and set(v: AchromatopsiaStatic): unit = jsNative
      [<Import("Achromatomaly", "react-native-image-filter-kit")>] static member Achromatomaly with get(): AchromatomalyStatic = jsNative and set(v: AchromatomalyStatic): unit = jsNative
      [<Import("ColorMatrixColorFilter", "react-native-image-filter-kit")>] static member ColorMatrixColorFilter with get(): ColorMatrixColorFilterStatic = jsNative and set(v: ColorMatrixColorFilterStatic): unit = jsNative
      [<Import("RoundAsCircle", "react-native-image-filter-kit")>] static member RoundAsCircle with get(): RoundAsCircleStatic = jsNative and set(v: RoundAsCircleStatic): unit = jsNative
      [<Import("IterativeBoxBlur", "react-native-image-filter-kit")>] static member IterativeBoxBlur with get(): IterativeBoxBlurStatic = jsNative and set(v: IterativeBoxBlurStatic): unit = jsNative
      [<Import("CIBoxBlur", "react-native-image-filter-kit")>] static member CIBoxBlur with get(): CIBoxBlurStatic = jsNative and set(v: CIBoxBlurStatic): unit = jsNative
      [<Import("CIGaussianBlur", "react-native-image-filter-kit")>] static member CIGaussianBlur with get(): CIGaussianBlurStatic = jsNative and set(v: CIGaussianBlurStatic): unit = jsNative
      [<Import("CIDiscBlur", "react-native-image-filter-kit")>] static member CIDiscBlur with get(): CIDiscBlurStatic = jsNative and set(v: CIDiscBlurStatic): unit = jsNative
      [<Import("CIMedianFilter", "react-native-image-filter-kit")>] static member CIMedianFilter with get(): CIMedianFilterStatic = jsNative and set(v: CIMedianFilterStatic): unit = jsNative
      [<Import("CIMotionBlur", "react-native-image-filter-kit")>] static member CIMotionBlur with get(): CIMotionBlurStatic = jsNative and set(v: CIMotionBlurStatic): unit = jsNative
      [<Import("CINoiseReduction", "react-native-image-filter-kit")>] static member CINoiseReduction with get(): CINoiseReductionStatic = jsNative and set(v: CINoiseReductionStatic): unit = jsNative
      [<Import("CIZoomBlur", "react-native-image-filter-kit")>] static member CIZoomBlur with get(): CIZoomBlurStatic = jsNative and set(v: CIZoomBlurStatic): unit = jsNative
      [<Import("CIColorControls", "react-native-image-filter-kit")>] static member CIColorControls with get(): CIColorControlsStatic = jsNative and set(v: CIColorControlsStatic): unit = jsNative
      [<Import("CIColorMatrix", "react-native-image-filter-kit")>] static member CIColorMatrix with get(): CIColorMatrixStatic = jsNative and set(v: CIColorMatrixStatic): unit = jsNative
      [<Import("CIHueAdjust", "react-native-image-filter-kit")>] static member CIHueAdjust with get(): CIHueAdjustStatic = jsNative and set(v: CIHueAdjustStatic): unit = jsNative
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
      [<Import("CIVignetteEffect", "react-native-image-filter-kit")>] static member CIVignetteEffect with get(): CIVignetteEffectStatic = jsNative and set(v: CIVignetteEffectStatic): unit = jsNative
      [<Import("CIColorInvert", "react-native-image-filter-kit")>] static member CIColorInvert with get(): CIColorInvertStatic = jsNative and set(v: CIColorInvertStatic): unit = jsNative
      [<Import("CIColorPosterize", "react-native-image-filter-kit")>] static member CIColorPosterize with get(): CIColorPosterizeStatic = jsNative and set(v: CIColorPosterizeStatic): unit = jsNative
      [<Import("CIVibrance", "react-native-image-filter-kit")>] static member CIVibrance with get(): CIVibranceStatic = jsNative and set(v: CIVibranceStatic): unit = jsNative
      [<Import("CICircularScreen", "react-native-image-filter-kit")>] static member CICircularScreen with get(): CICircularScreenStatic = jsNative and set(v: CICircularScreenStatic): unit = jsNative
      [<Import("CIDotScreen", "react-native-image-filter-kit")>] static member CIDotScreen with get(): CIDotScreenStatic = jsNative and set(v: CIDotScreenStatic): unit = jsNative
      [<Import("CIBumpDistortion", "react-native-image-filter-kit")>] static member CIBumpDistortion with get(): CIBumpDistortionStatic = jsNative and set(v: CIBumpDistortionStatic): unit = jsNative
      [<Import("CIBumpDistortionLinear", "react-native-image-filter-kit")>] static member CIBumpDistortionLinear with get(): CIBumpDistortionLinearStatic = jsNative and set(v: CIBumpDistortionLinearStatic): unit = jsNative
      [<Import("CICircleSplashDistortion", "react-native-image-filter-kit")>] static member CICircleSplashDistortion with get(): CICircleSplashDistortionStatic = jsNative and set(v: CICircleSplashDistortionStatic): unit = jsNative
      [<Import("CICircularWrap", "react-native-image-filter-kit")>] static member CICircularWrap with get(): CICircularWrapStatic = jsNative and set(v: CICircularWrapStatic): unit = jsNative
      [<Import("CISharpenLuminance", "react-native-image-filter-kit")>] static member CISharpenLuminance with get(): CISharpenLuminanceStatic = jsNative and set(v: CISharpenLuminanceStatic): unit = jsNative
      [<Import("CIUnsharpMask", "react-native-image-filter-kit")>] static member CIUnsharpMask with get(): CIUnsharpMaskStatic = jsNative and set(v: CIUnsharpMaskStatic): unit = jsNative
      [<Import("CICrystallize", "react-native-image-filter-kit")>] static member CICrystallize with get(): CICrystallizeStatic = jsNative and set(v: CICrystallizeStatic): unit = jsNative
