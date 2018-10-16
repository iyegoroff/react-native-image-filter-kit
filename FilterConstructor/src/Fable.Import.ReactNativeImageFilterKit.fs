module Fable.Import.ReactNativeImageFilterKit

open Fable.Helpers.ReactNative
open Fable.Helpers.React
open Fable.Helpers.ReactNative.Props
open Fable.Core
open Fable.Core.JsInterop
open Fable.Import


module Props =

  type Matrix =
    float * float * float * float * float * float * float * float * float * float *
    float * float * float * float * float * float * float * float * float * float

  type IDistance =
    interface end

  type IPoint =
    interface end

  type IRGBAVector =
    interface end


  type IOffset =
    interface end

  [<StringEnum>] [<RequireQualifiedAccess>] 
  type TileMode =
    | [<CompiledName("CLAMP")>] CLAMP
    | [<CompiledName("MIRROR")>] MIRROR
    | [<CompiledName("REPEAT")>] REPEAT

  [<StringEnum>] [<RequireQualifiedAccess>] 
  type PorterDuffMode =
    | [<CompiledName "ADD">] ADD
    | [<CompiledName "CLEAR">] CLEAR
    | [<CompiledName "DARKEN">] DARKEN
    | [<CompiledName "DST">] DST
    | [<CompiledName "DST_ATOP">] DST_ATOP
    | [<CompiledName "DST_IN">] DST_IN
    | [<CompiledName "DST_OUT">] DST_OUT
    | [<CompiledName "DST_OVER">] DST_OVER
    | [<CompiledName "LIGHTEN">] LIGHTEN
    | [<CompiledName "MULTIPLY">] MULTIPLY
    | [<CompiledName "OVERLAY">] OVERLAY
    | [<CompiledName "SCREEN">] SCREEN
    | [<CompiledName "SRC">] SRC
    | [<CompiledName "SRC_ATOP">] SRC_ATOP
    | [<CompiledName "SRC_IN">] SRC_IN
    | [<CompiledName "SRC_OUT">] SRC_OUT
    | [<CompiledName "SRC_OVER">] SRC_OVER
    | [<CompiledName "XOR">] XOR

  type ColorMatrixProps =
    | Style of IStyle list
    | Matrix of Matrix

  type NormalProps =
    | Style of IStyle list

  type RGBAProps =
    | Style of IStyle list
    | Red of float
    | Green of float
    | Blue of float
    | Alpha of float

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

  type BlackAndWhiteProps =
    | Style of IStyle list

  type GrayscaleProps =
    | Style of IStyle list
    | Value of float

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

  type TechnicolorProps =
    | Style of IStyle list

  type PolaroidProps =
    | Style of IStyle list

  type ToBGRProps =
    | Style of IStyle list

  type KodachromeProps =
    | Style of IStyle list

  type BrowniProps =
    | Style of IStyle list

  type VintageProps =
    | Style of IStyle list

  type NightProps =
    | Style of IStyle list
    | Value of float

  type PredatorProps =
    | Style of IStyle list
    | Value of float

  type LsdProps =
    | Style of IStyle list

  type ColorToneProps =
    | Style of IStyle list
    | Desaturation of float
    | Toned of float
    | DarkColor of string
    | LightColor of string

  type DuoToneProps =
    | Style of IStyle list
    | FirstColor of string
    | SecondColor of string

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

  type ColorProps =
    | Style of IStyle list
    | Color of string

  type LinearGradientProps =
    | Style of IStyle list
    | X0 of IDistance
    | Y0 of IDistance
    | X1 of IDistance
    | Y1 of IDistance
    | Colors of ResizeArray<string>
    | Locations of ResizeArray<float>
    | Tile of TileMode

  type RadialGradientProps =
    | Style of IStyle list
    | CenterX of IDistance
    | CenterY of IDistance
    | Radius of IDistance
    | Colors of ResizeArray<string>
    | Stops of ResizeArray<float>
    | TileMode of TileMode

  type SweepGradientProps =
    | Style of IStyle list
    | Cx of IDistance
    | Cy of IDistance
    | Colors of ResizeArray<string>
    | Positions of ResizeArray<float>

  type PorterDuffColorFilterProps =
    | Style of IStyle list
    | Color of string
    | Mode of PorterDuffMode

  type PorterDuffXfermodeProps =
    | Style of IStyle list
    | Mode of PorterDuffMode

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

  type CIMaskedVariableBlurProps =
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

  type CIColorClampProps =
    | Style of IStyle list
    | InputMinComponents of IRGBAVector
    | InputMaxComponents of IRGBAVector

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

  type CIColorPolynomialProps =
    | Style of IStyle list
    | InputRedCoefficients of IRGBAVector
    | InputGreenCoefficients of IRGBAVector
    | InputBlueCoefficients of IRGBAVector
    | InputAlphaCoefficients of IRGBAVector

  type CIExposureAdjustProps =
    | Style of IStyle list
    | InputEV of float

  type CIGammaAdjustProps =
    | Style of IStyle list
    | InputPower of float

  type CIHueAdjustProps =
    | Style of IStyle list
    | InputAngle of float

  type CILinearToSRGBToneCurveProps =
    | Style of IStyle list

  type CISRGBToneCurveToLinearProps =
    | Style of IStyle list

  type CITemperatureAndTintProps =
    | Style of IStyle list
    | InputNeutral of IOffset
    | InputTargetNeutral of IOffset

  type CIToneCurveProps =
    | Style of IStyle list
    | InputPoint0 of IOffset
    | InputPoint1 of IOffset
    | InputPoint2 of IOffset
    | InputPoint3 of IOffset
    | InputPoint4 of IOffset

  type CIVibranceProps =
    | Style of IStyle list
    | InputAmount of float

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

  type CISepiaToneProps =
    | Style of IStyle list
    | InputIntensity of float

  type CIVignetteProps =
    | Style of IStyle list
    | InputIntensity of float
    | InputRadius of IDistance

  type CIVignetteEffectProps =
    | Style of IStyle list
    | InputCenter of IPoint
    | InputIntensity of float
    | InputRadius of IDistance

  type CIAdditionCompositingProps =
    | Style of IStyle list

  type CIColorBlendModeProps =
    | Style of IStyle list

  type CIColorBurnBlendModeProps =
    | Style of IStyle list

  type CIColorDodgeBlendModeProps =
    | Style of IStyle list

  type CIDarkenBlendModeProps =
    | Style of IStyle list

  type CIExclusionBlendModeProps =
    | Style of IStyle list

  type CIHueBlendModeProps =
    | Style of IStyle list

  type CILightenBlendModeProps =
    | Style of IStyle list

  type CIMultiplyBlendModeProps =
    | Style of IStyle list

  type CIOverlayBlendModeProps =
    | Style of IStyle list

  type CIScreenBlendModeProps =
    | Style of IStyle list

  type CISoftLightBlendModeProps =
    | Style of IStyle list

  type CIColorInvertProps =
    | Style of IStyle list

  type CIColorMonochromeProps =
    | Style of IStyle list
    | InputColor of string
    | InputIntensity of float

  type CIColorPosterizeProps =
    | Style of IStyle list
    | InputLevels of float

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

  type CILineScreenProps =
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

  type CIConstantColorGeneratorProps =
    | Style of IStyle list
    | ImageStyle of IImageStyle list
    | InputColor of string

  type CIRandomGeneratorProps =
    | Style of IStyle list
    | ImageStyle of IImageStyle list

  type CILinearGradientProps =
    | Style of IStyle list
    | ImageStyle of IImageStyle list
    | InputPoint0 of IPoint
    | InputPoint1 of IPoint
    | InputColor0 of string
    | InputColor1 of string

  type CIRadialGradientProps =
    | Style of IStyle list
    | ImageStyle of IImageStyle list
    | InputCenter of IPoint
    | InputRadius0 of IDistance
    | InputRadius1 of IDistance
    | InputColor0 of string
    | InputColor1 of string


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

  type CIEdgesProps =
    | Style of IStyle list
    | InputIntensity of float

  type CILineOverlayProps =
    | Style of IStyle list
    | InputNRNoiseLevel of float
    | InputNRSharpness of float
    | InputEdgeIntensity of float
    | InputThreshold of float
    | InputContrast of float

  type CIPixellateProps =
    | Style of IStyle list
    | InputScale of IDistance
    | InputCenter of IPoint

  type CIPointillizeProps =
    | Style of IStyle list
    | InputRadius of IDistance
    | InputCenter of IPoint

  type CIOpTileProps =
    | Style of IStyle list
    | ResizeOutput of bool
    | InputWidth of IDistance
    | InputCenter of IPoint
    | InputAngle of float
    | InputScale of float

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

[<Emit("({ x:$0, y:$1 })")>]
let Offset (_x: float, _y: float): IOffset = jsNative

let concatColorMatrices (_matrices: Matrix array): Matrix =
  importMember "react-native-image-filter-kit"
let normal (): Matrix = importMember "react-native-image-filter-kit"
let rgba (_red: float) (_green: float) (_blue: float) (_alpha: float): Matrix =
  importMember "react-native-image-filter-kit"
let saturate (_v: float): Matrix = importMember "react-native-image-filter-kit"
let hueRotate (_v: float): Matrix = importMember "react-native-image-filter-kit"
let luminanceToAlpha (): Matrix = importMember "react-native-image-filter-kit"
let invert (): Matrix = importMember "react-native-image-filter-kit"
let blackAndWhite (): Matrix = importMember "react-native-image-filter-kit"
let grayscale (_v: float): Matrix = importMember "react-native-image-filter-kit"
let sepia (): Matrix = importMember "react-native-image-filter-kit"
let nightvision (): Matrix = importMember "react-native-image-filter-kit"
let warm (): Matrix = importMember "react-native-image-filter-kit"
let cool (): Matrix = importMember "react-native-image-filter-kit"
let brightness (_v: float): Matrix = importMember "react-native-image-filter-kit"
let exposure (_v: float): Matrix = importMember "react-native-image-filter-kit"
let contrast (_v: float): Matrix = importMember "react-native-image-filter-kit"
let temperature (_v: float): Matrix = importMember "react-native-image-filter-kit"
let tint (_v: float): Matrix = importMember "react-native-image-filter-kit"
let threshold (_v: float): Matrix = importMember "react-native-image-filter-kit"
let technicolor (): Matrix = importMember "react-native-image-filter-kit"
let polaroid (): Matrix = importMember "react-native-image-filter-kit"
let toBGR (): Matrix = importMember "react-native-image-filter-kit"
let kodachrome (): Matrix = importMember "react-native-image-filter-kit"
let browni (): Matrix = importMember "react-native-image-filter-kit"
let vintage (): Matrix = importMember "react-native-image-filter-kit"
let night (_v: float): Matrix = importMember "react-native-image-filter-kit"
let predator (_v: float): Matrix = importMember "react-native-image-filter-kit"
let lsd (): Matrix = importMember "react-native-image-filter-kit"
let colorTone (_desaturation: float) (_toned: float) (_lightColor: string) (_darkColor: string): Matrix =
  importMember "react-native-image-filter-kit"
let duoTone (_firstColor: string) (_secondColor: string): Matrix =
  importMember "react-native-image-filter-kit"
let protanomaly (): Matrix = importMember "react-native-image-filter-kit"
let deuteranomaly (): Matrix = importMember "react-native-image-filter-kit"
let tritanomaly (): Matrix = importMember "react-native-image-filter-kit"
let protanopia (): Matrix = importMember "react-native-image-filter-kit"
let deuteranopia (): Matrix = importMember "react-native-image-filter-kit"
let tritanopia (): Matrix = importMember "react-native-image-filter-kit"
let achromatopsia (): Matrix = importMember "react-native-image-filter-kit"
let achromatomaly (): Matrix = importMember "react-native-image-filter-kit"

let inline private propsToObj (props: 'a list): obj = keyValueList CaseRules.LowerFirst props

let inline ColorMatrix (props: ColorMatrixProps list) : React.ReactElement =
  ofImport "ColorMatrix" "react-native-image-filter-kit" (propsToObj props) []

let inline Normal (props: NormalProps list) : React.ReactElement =
  ofImport "Normal" "react-native-image-filter-kit" (propsToObj props) []

let inline RGBA (props: RGBAProps list) : React.ReactElement =
  ofImport "RGBA" "react-native-image-filter-kit" (propsToObj props) []

let inline Saturate (props: SaturateProps list) : React.ReactElement =
  ofImport "Saturate" "react-native-image-filter-kit" (propsToObj props) []

let inline HueRotate (props: HueRotateProps list) : React.ReactElement =
  ofImport "HueRotate" "react-native-image-filter-kit" (propsToObj props) []

let inline LuminanceToAlpha (props: LuminanceToAlphaProps list) : React.ReactElement =
  ofImport "LuminanceToAlpha" "react-native-image-filter-kit" (propsToObj props) []

let inline Invert (props: InvertProps list) : React.ReactElement =
  ofImport "Invert" "react-native-image-filter-kit" (propsToObj props) []

let inline BlackAndWhite (props: BlackAndWhiteProps list) : React.ReactElement =
  ofImport "BlackAndWhite" "react-native-image-filter-kit" (propsToObj props) []

let inline Grayscale (props: GrayscaleProps list) : React.ReactElement =
  ofImport "Grayscale" "react-native-image-filter-kit" (propsToObj props) []

let inline Sepia (props: SepiaProps list) : React.ReactElement =
  ofImport "Sepia" "react-native-image-filter-kit" (propsToObj props) []

let inline Nightvision (props: NightvisionProps list) : React.ReactElement =
  ofImport "Nightvision" "react-native-image-filter-kit" (propsToObj props) []

let inline Warm (props: WarmProps list) : React.ReactElement =
  ofImport "Warm" "react-native-image-filter-kit" (propsToObj props) []

let inline Cool (props: CoolProps list) : React.ReactElement =
  ofImport "Cool" "react-native-image-filter-kit" (propsToObj props) []

let inline Brightness (props: BrightnessProps list) : React.ReactElement =
  ofImport "Brightness" "react-native-image-filter-kit" (propsToObj props) []

let inline Exposure (props: ExposureProps list) : React.ReactElement =
  ofImport "Exposure" "react-native-image-filter-kit" (propsToObj props) []

let inline Contrast (props: ContrastProps list) : React.ReactElement =
  ofImport "Contrast" "react-native-image-filter-kit" (propsToObj props) []

let inline Temperature (props: TemperatureProps list) : React.ReactElement =
  ofImport "Temperature" "react-native-image-filter-kit" (propsToObj props) []

let inline Tint (props: TintProps list) : React.ReactElement =
  ofImport "Tint" "react-native-image-filter-kit" (propsToObj props) []

let inline Threshold (props: ThresholdProps list) : React.ReactElement =
  ofImport "Threshold" "react-native-image-filter-kit" (propsToObj props) []

let inline Technicolor (props: TechnicolorProps list) : React.ReactElement =
  ofImport "Technicolor" "react-native-image-filter-kit" (propsToObj props) []

let inline Polaroid (props: PolaroidProps list) : React.ReactElement =
  ofImport "Polaroid" "react-native-image-filter-kit" (propsToObj props) []

let inline ToBGR (props: ToBGRProps list) : React.ReactElement =
  ofImport "ToBGR" "react-native-image-filter-kit" (propsToObj props) []

let inline Kodachrome (props: KodachromeProps list) : React.ReactElement =
  ofImport "Kodachrome" "react-native-image-filter-kit" (propsToObj props) []

let inline Browni (props: BrowniProps list) : React.ReactElement =
  ofImport "Browni" "react-native-image-filter-kit" (propsToObj props) []

let inline Vintage (props: VintageProps list) : React.ReactElement =
  ofImport "Vintage" "react-native-image-filter-kit" (propsToObj props) []

let inline Night (props: NightProps list) : React.ReactElement =
  ofImport "Night" "react-native-image-filter-kit" (propsToObj props) []

let inline Predator (props: PredatorProps list) : React.ReactElement =
  ofImport "Predator" "react-native-image-filter-kit" (propsToObj props) []

let inline Lsd (props: LsdProps list) : React.ReactElement =
  ofImport "Lsd" "react-native-image-filter-kit" (propsToObj props) []

let inline ColorTone (props: ColorToneProps list) : React.ReactElement =
  ofImport "ColorTone" "react-native-image-filter-kit" (propsToObj props) []

let inline DuoTone (props: DuoToneProps list) : React.ReactElement =
  ofImport "DuoTone" "react-native-image-filter-kit" (propsToObj props) []

let inline Protanomaly (props: ProtanomalyProps list) : React.ReactElement =
  ofImport "Protanomaly" "react-native-image-filter-kit" (propsToObj props) []

let inline Deuteranomaly (props: DeuteranomalyProps list) : React.ReactElement =
  ofImport "Deuteranomaly" "react-native-image-filter-kit" (propsToObj props) []

let inline Tritanomaly (props: TritanomalyProps list) : React.ReactElement =
  ofImport "Tritanomaly" "react-native-image-filter-kit" (propsToObj props) []

let inline Protanopia (props: ProtanopiaProps list) : React.ReactElement =
  ofImport "Protanopia" "react-native-image-filter-kit" (propsToObj props) []

let inline Deuteranopia (props: DeuteranopiaProps list) : React.ReactElement =
  ofImport "Deuteranopia" "react-native-image-filter-kit" (propsToObj props) []

let inline Tritanopia (props: TritanopiaProps list) : React.ReactElement =
  ofImport "Tritanopia" "react-native-image-filter-kit" (propsToObj props) []

let inline Achromatopsia (props: AchromatopsiaProps list) : React.ReactElement =
  ofImport "Achromatopsia" "react-native-image-filter-kit" (propsToObj props) []

let inline Achromatomaly (props: AchromatomalyProps list) : React.ReactElement =
  ofImport "Achromatomaly" "react-native-image-filter-kit" (propsToObj props) []

let inline ColorMatrixColorFilter (props: ColorMatrixColorFilterProps list) : React.ReactElement =
  ofImport "ColorMatrixColorFilter" "react-native-image-filter-kit" (propsToObj props) []

let inline IterativeBoxBlur (props: IterativeBoxBlurProps list) : React.ReactElement =
  ofImport "IterativeBoxBlur" "react-native-image-filter-kit" (propsToObj props) []

let inline LightingColorFilter (props: LightingColorFilterProps list) : React.ReactElement =
  ofImport "LightingColorFilter" "react-native-image-filter-kit" (propsToObj props) []

let inline RoundAsCircle (props: RoundAsCircleProps list) : React.ReactElement =
  ofImport "RoundAsCircle" "react-native-image-filter-kit" (propsToObj props) []

let inline Color (props: ColorProps list) : React.ReactElement =
  ofImport "Color" "react-native-image-filter-kit" (propsToObj props) []

let inline LinearGradient (props: LinearGradientProps list) : React.ReactElement =
  ofImport "LinearGradient" "react-native-image-filter-kit" (propsToObj props) []

let inline RadialGradient (props: RadialGradientProps list) : React.ReactElement =
  ofImport "RadialGradient" "react-native-image-filter-kit" (propsToObj props) []

let inline SweepGradient (props: SweepGradientProps list) : React.ReactElement =
  ofImport "SweepGradient" "react-native-image-filter-kit" (propsToObj props) []

let inline PorterDuffColorFilter (props: PorterDuffColorFilterProps list) : React.ReactElement =
  ofImport "PorterDuffColorFilter" "react-native-image-filter-kit" (propsToObj props) []

let inline PorterDuffXfermode (props: PorterDuffXfermodeProps list) : React.ReactElement =
  ofImport "PorterDuffXfermode" "react-native-image-filter-kit" (propsToObj props) []

let inline CIBoxBlur (props: CIBoxBlurProps list) : React.ReactElement =
  ofImport "CIBoxBlur" "react-native-image-filter-kit" (propsToObj props) []

let inline CIGaussianBlur (props: CIGaussianBlurProps list) : React.ReactElement =
  ofImport "CIGaussianBlur" "react-native-image-filter-kit" (propsToObj props) []

let inline CIDiscBlur (props: CIDiscBlurProps list) : React.ReactElement =
  ofImport "CIDiscBlur" "react-native-image-filter-kit" (propsToObj props) []

let inline CIMaskedVariableBlur (props: CIMaskedVariableBlurProps list) : React.ReactElement =
  ofImport "CIMaskedVariableBlur" "react-native-image-filter-kit" (propsToObj props) []

let inline CIMedianFilter (props: CIMedianFilterProps list) : React.ReactElement =
  ofImport "CIMedianFilter" "react-native-image-filter-kit" (propsToObj props) []

let inline CIMotionBlur (props: CIMotionBlurProps list) : React.ReactElement =
  ofImport "CIMotionBlur" "react-native-image-filter-kit" (propsToObj props) []

let inline CINoiseReduction (props: CINoiseReductionProps list) : React.ReactElement =
  ofImport "CINoiseReduction" "react-native-image-filter-kit" (propsToObj props) []

let inline CIZoomBlur (props: CIZoomBlurProps list) : React.ReactElement =
  ofImport "CIZoomBlur" "react-native-image-filter-kit" (propsToObj props) []

let inline CIColorClamp (props: CIColorClampProps list) : React.ReactElement =
  ofImport "CIColorClamp" "react-native-image-filter-kit" (propsToObj props) []

let inline CIColorControls (props: CIColorControlsProps list) : React.ReactElement =
  ofImport "CIColorControls" "react-native-image-filter-kit" (propsToObj props) []

let inline CIColorMatrix (props: CIColorMatrixProps list) : React.ReactElement =
  ofImport "CIColorMatrix" "react-native-image-filter-kit" (propsToObj props) []

let inline CIColorPolynomial (props: CIColorPolynomialProps list) : React.ReactElement =
  ofImport "CIColorPolynomial" "react-native-image-filter-kit" (propsToObj props) []

let inline CIExposureAdjust (props: CIExposureAdjustProps list) : React.ReactElement =
  ofImport "CIExposureAdjust" "react-native-image-filter-kit" (propsToObj props) []

let inline CIGammaAdjust (props: CIGammaAdjustProps list) : React.ReactElement =
  ofImport "CIGammaAdjust" "react-native-image-filter-kit" (propsToObj props) []

let inline CIHueAdjust (props: CIHueAdjustProps list) : React.ReactElement =
  ofImport "CIHueAdjust" "react-native-image-filter-kit" (propsToObj props) []

let inline CILinearToSRGBToneCurve (props: CILinearToSRGBToneCurveProps list) : React.ReactElement =
  ofImport "CILinearToSRGBToneCurve" "react-native-image-filter-kit" (propsToObj props) []

let inline CISRGBToneCurveToLinear (props: CISRGBToneCurveToLinearProps list) : React.ReactElement =
  ofImport "CISRGBToneCurveToLinear" "react-native-image-filter-kit" (propsToObj props) []

let inline CITemperatureAndTint (props: CITemperatureAndTintProps list) : React.ReactElement =
  ofImport "CITemperatureAndTint" "react-native-image-filter-kit" (propsToObj props) []

let inline CIToneCurve (props: CIToneCurveProps list) : React.ReactElement =
  ofImport "CIToneCurve" "react-native-image-filter-kit" (propsToObj props) []

let inline CIVibrance (props: CIVibranceProps list) : React.ReactElement =
  ofImport "CIVibrance" "react-native-image-filter-kit" (propsToObj props) []

let inline CIMaskToAlpha (props: CIMaskToAlphaProps list) : React.ReactElement =
  ofImport "CIMaskToAlpha" "react-native-image-filter-kit" (propsToObj props) []

let inline CIMaximumComponent (props: CIMaximumComponentProps list) : React.ReactElement =
  ofImport "CIMaximumComponent" "react-native-image-filter-kit" (propsToObj props) []

let inline CIMinimumComponent (props: CIMinimumComponentProps list) : React.ReactElement =
  ofImport "CIMinimumComponent" "react-native-image-filter-kit" (propsToObj props) []

let inline CIPhotoEffectChrome (props: CIPhotoEffectChromeProps list) : React.ReactElement =
  ofImport "CIPhotoEffectChrome" "react-native-image-filter-kit" (propsToObj props) []

let inline CIPhotoEffectFade (props: CIPhotoEffectFadeProps list) : React.ReactElement =
  ofImport "CIPhotoEffectFade" "react-native-image-filter-kit" (propsToObj props) []

let inline CIPhotoEffectInstant (props: CIPhotoEffectInstantProps list) : React.ReactElement =
  ofImport "CIPhotoEffectInstant" "react-native-image-filter-kit" (propsToObj props) []

let inline CIPhotoEffectMono (props: CIPhotoEffectMonoProps list) : React.ReactElement =
  ofImport "CIPhotoEffectMono" "react-native-image-filter-kit" (propsToObj props) []

let inline CIPhotoEffectNoir (props: CIPhotoEffectNoirProps list) : React.ReactElement =
  ofImport "CIPhotoEffectNoir" "react-native-image-filter-kit" (propsToObj props) []

let inline CIPhotoEffectProcess (props: CIPhotoEffectProcessProps list) : React.ReactElement =
  ofImport "CIPhotoEffectProcess" "react-native-image-filter-kit" (propsToObj props) []

let inline CIPhotoEffectTonal (props: CIPhotoEffectTonalProps list) : React.ReactElement =
  ofImport "CIPhotoEffectTonal" "react-native-image-filter-kit" (propsToObj props) []

let inline CIPhotoEffectTransfer (props: CIPhotoEffectTransferProps list) : React.ReactElement =
  ofImport "CIPhotoEffectTransfer" "react-native-image-filter-kit" (propsToObj props) []

let inline CISepiaTone (props: CISepiaToneProps list) : React.ReactElement =
  ofImport "CISepiaTone" "react-native-image-filter-kit" (propsToObj props) []

let inline CIVignette (props: CIVignetteProps list) : React.ReactElement =
  ofImport "CIVignette" "react-native-image-filter-kit" (propsToObj props) []

let inline CIVignetteEffect (props: CIVignetteEffectProps list) : React.ReactElement =
  ofImport "CIVignetteEffect" "react-native-image-filter-kit" (propsToObj props) []

let inline CIAdditionCompositing (props: CIAdditionCompositingProps list) : React.ReactElement =
  ofImport "CIAdditionCompositing" "react-native-image-filter-kit" (propsToObj props) []

let inline CIColorBlendMode (props: CIColorBlendModeProps list) : React.ReactElement =
  ofImport "CIColorBlendMode" "react-native-image-filter-kit" (propsToObj props) []

let inline CIColorBurnBlendMode (props: CIColorBurnBlendModeProps list) : React.ReactElement =
  ofImport "CIColorBurnBlendMode" "react-native-image-filter-kit" (propsToObj props) []

let inline CIColorDodgeBlendMode (props: CIColorDodgeBlendModeProps list) : React.ReactElement =
  ofImport "CIColorDodgeBlendMode" "react-native-image-filter-kit" (propsToObj props) []

let inline CIDarkenBlendMode (props: CIDarkenBlendModeProps list) : React.ReactElement =
  ofImport "CIDarkenBlendMode" "react-native-image-filter-kit" (propsToObj props) []

let inline CIExclusionBlendMode (props: CIExclusionBlendModeProps list) : React.ReactElement =
  ofImport "CIExclusionBlendMode" "react-native-image-filter-kit" (propsToObj props) []

let inline CIHueBlendMode (props: CIHueBlendModeProps list) : React.ReactElement =
  ofImport "CIHueBlendMode" "react-native-image-filter-kit" (propsToObj props) []

let inline CILightenBlendMode (props: CILightenBlendModeProps list) : React.ReactElement =
  ofImport "CILightenBlendMode" "react-native-image-filter-kit" (propsToObj props) []

let inline CIMultiplyBlendMode (props: CIMultiplyBlendModeProps list) : React.ReactElement =
  ofImport "CIMultiplyBlendMode" "react-native-image-filter-kit" (propsToObj props) []

let inline CIOverlayBlendMode (props: CIOverlayBlendModeProps list) : React.ReactElement =
  ofImport "CIOverlayBlendMode" "react-native-image-filter-kit" (propsToObj props) []

let inline CIScreenBlendMode (props: CIScreenBlendModeProps list) : React.ReactElement =
  ofImport "CIScreenBlendMode" "react-native-image-filter-kit" (propsToObj props) []

let inline CISoftLightBlendMode (props: CISoftLightBlendModeProps list) : React.ReactElement =
  ofImport "CISoftLightBlendMode" "react-native-image-filter-kit" (propsToObj props) []

let inline CIColorInvert (props: CIColorInvertProps list) : React.ReactElement =
  ofImport "CIColorInvert" "react-native-image-filter-kit" (propsToObj props) []

let inline CIColorMonochrome (props: CIColorMonochromeProps list) : React.ReactElement =
  ofImport "CIColorMonochrome" "react-native-image-filter-kit" (propsToObj props) []

let inline CIColorPosterize (props: CIColorPosterizeProps list) : React.ReactElement =
  ofImport "CIColorPosterize" "react-native-image-filter-kit" (propsToObj props) []

let inline CICircularScreen (props: CICircularScreenProps list) : React.ReactElement =
  ofImport "CICircularScreen" "react-native-image-filter-kit" (propsToObj props) []

let inline CIDotScreen (props: CIDotScreenProps list) : React.ReactElement =
  ofImport "CIDotScreen" "react-native-image-filter-kit" (propsToObj props) []

let inline CILineScreen (props: CILineScreenProps list) : React.ReactElement =
  ofImport "CILineScreen" "react-native-image-filter-kit" (propsToObj props) []

let inline CIBumpDistortion (props: CIBumpDistortionProps list) : React.ReactElement =
  ofImport "CIBumpDistortion" "react-native-image-filter-kit" (propsToObj props) []

let inline CIBumpDistortionLinear (props: CIBumpDistortionLinearProps list) : React.ReactElement =
  ofImport "CIBumpDistortionLinear" "react-native-image-filter-kit" (propsToObj props) []

let inline CICircleSplashDistortion (props: CICircleSplashDistortionProps list) : React.ReactElement =
  ofImport "CICircleSplashDistortion" "react-native-image-filter-kit" (propsToObj props) []

let inline CICircularWrap (props: CICircularWrapProps list) : React.ReactElement =
  ofImport "CICircularWrap" "react-native-image-filter-kit" (propsToObj props) []

let inline CIVortexDistortion (props: CIVortexDistortionProps list) : React.ReactElement =
  ofImport "CIVortexDistortion" "react-native-image-filter-kit" (propsToObj props) []

let inline CIConstantColorGenerator (props: CIConstantColorGeneratorProps list) : React.ReactElement =
  ofImport "CIConstantColorGenerator" "react-native-image-filter-kit" (propsToObj props) []

let inline CIRandomGenerator (props: CIRandomGeneratorProps list) : React.ReactElement =
  ofImport "CIRandomGenerator" "react-native-image-filter-kit" (propsToObj props) []

let inline CILinearGradient (props: CILinearGradientProps list) : React.ReactElement =
  ofImport "CILinearGradient" "react-native-image-filter-kit" (propsToObj props) []

let inline CIRadialGradient (props: CIRadialGradientProps list) : React.ReactElement =
  ofImport "CIRadialGradient" "react-native-image-filter-kit" (propsToObj props) []

let inline CISharpenLuminance (props: CISharpenLuminanceProps list) : React.ReactElement =
  ofImport "CISharpenLuminance" "react-native-image-filter-kit" (propsToObj props) []

let inline CIUnsharpMask (props: CIUnsharpMaskProps list) : React.ReactElement =
  ofImport "CIUnsharpMask" "react-native-image-filter-kit" (propsToObj props) []

let inline CICrystallize (props: CICrystallizeProps list) : React.ReactElement =
  ofImport "CICrystallize" "react-native-image-filter-kit" (propsToObj props) []

let inline CIEdges (props: CIEdgesProps list) : React.ReactElement =
  ofImport "CIEdges" "react-native-image-filter-kit" (propsToObj props) []

let inline CILineOverlay (props: CILineOverlayProps list) : React.ReactElement =
  ofImport "CILineOverlay" "react-native-image-filter-kit" (propsToObj props) []

let inline CIPixellate (props: CIPixellateProps list) : React.ReactElement =
  ofImport "CIPixellate" "react-native-image-filter-kit" (propsToObj props) []

let inline CIPointillize (props: CIPointillizeProps list) : React.ReactElement =
  ofImport "CIPointillize" "react-native-image-filter-kit" (propsToObj props) []

let inline CIOpTile (props: CIOpTileProps list) : React.ReactElement =
  ofImport "CIOpTile" "react-native-image-filter-kit" (propsToObj props) []

let inline ImagePlaceholder (props: ImageProperties list) : React.ReactElement =
  ofImport "ImagePlaceholder" "react-native-image-filter-kit" (propsToObj props) []

let imagePlaceholderSource: IImageSource = importMember "react-native-image-filter-kit"
