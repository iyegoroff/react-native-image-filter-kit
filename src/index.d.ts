import * as React from 'react';
import * as ReactNative from 'react-native';

interface FilterProps extends ReactNative.ViewProps { }

interface ResizingFilterProps extends FilterProps {
  readonly resizeOutput?: boolean;
}

interface GeneratorProps extends FilterProps {
  readonly imageStyle?: ReactNative.ImageStyle;
}

export type Distance = string | number;

export interface Position {
  readonly x: Distance;
  readonly y: Distance;
}

export interface Offset {
  readonly x: number;
  readonly y: number;
}

export type RGBAVector = [number, number, number, number];

export type Matrix = [
  number, number, number, number, number, number, number, number, number, number,
  number, number, number, number, number, number, number, number, number, number
];

export type TileMode = 'CLAMP' | 'MIRROR' | 'REPEAT';

export type PorterDuffMode =
    'ADD'
  | 'CLEAR'
  | 'DARKEN'
  | 'DST'
  | 'DST_ATOP'
  | 'DST_IN'
  | 'DST_OUT'
  | 'DST_OVER'
  | 'LIGHTEN'
  | 'MULTIPLY'
  | 'OVERLAY'
  | 'SCREEN'
  | 'SRC'
  | 'SRC_ATOP'
  | 'SRC_IN'
  | 'SRC_OUT'
  | 'SRC_OVER'
  | 'XOR'


export interface ValueFilterProps extends FilterProps {
  readonly value?: number;
}

export interface ColorMatrixProps extends FilterProps {
  readonly matrix: Readonly<Matrix> | ReadonlyArray<Readonly<Matrix>>;
}

export interface ColorToneProps extends FilterProps {
  readonly desaturation?: number;
  readonly toned?: number;
  readonly lightColor?: string;
  readonly darkColor?: string;
}

export interface RGBAProps extends FilterProps {
  readonly red?: number;
  readonly green?: number;
  readonly blue?: number;
  readonly alpha?: number;
}

export interface DuoToneProps extends FilterProps {
  readonly firstColor?: string;
  readonly secondColor?: string;
}


export class ColorMatrix extends React.Component<ColorMatrixProps> { }
export class Normal extends React.Component<FilterProps> { }
export class RGBA extends React.Component<RGBAProps> { }
export class Saturate extends React.Component<ValueFilterProps> { }
export class HueRotate extends React.Component<ValueFilterProps> { }
export class LuminanceToAlpha extends React.Component<FilterProps> { }
export class Invert extends React.Component<FilterProps> { }
export class BlackAndWhite extends React.Component<FilterProps> { }
export class Grayscale extends React.Component<ValueFilterProps> { }
export class Sepia extends React.Component<FilterProps> { }
export class Nightvision extends React.Component<FilterProps> { }
export class Warm extends React.Component<FilterProps> { }
export class Cool extends React.Component<FilterProps> { }
export class Brightness extends React.Component<ValueFilterProps> { }
export class Exposure extends React.Component<ValueFilterProps> { }
export class Contrast extends React.Component<ValueFilterProps> { }
export class Temperature extends React.Component<ValueFilterProps> { }
export class Tint extends React.Component<ValueFilterProps> { }
export class Threshold extends React.Component<ValueFilterProps> { }
export class Technicolor extends React.Component<FilterProps> { }
export class Polaroid extends React.Component<FilterProps> { }
export class ToBGR extends React.Component<FilterProps> { }
export class Kodachrome extends React.Component<FilterProps> { }
export class Browni extends React.Component<FilterProps> { }
export class Vintage extends React.Component<FilterProps> { }
export class Night extends React.Component<ValueFilterProps> { }
export class Predator extends React.Component<ValueFilterProps> { }
export class Lsd extends React.Component<FilterProps> { }
export class ColorTone extends React.Component<ColorToneProps> { }
export class DuoTone extends React.Component<DuoToneProps> { }
export class Protanomaly extends React.Component<FilterProps> { }
export class Deuteranomaly extends React.Component<FilterProps> { }
export class Tritanomaly extends React.Component<FilterProps> { }
export class Protanopia extends React.Component<FilterProps> { }
export class Deuteranopia extends React.Component<FilterProps> { }
export class Tritanopia extends React.Component<FilterProps> { }
export class Achromatopsia extends React.Component<FilterProps> { }
export class Achromatomaly extends React.Component<FilterProps> { }


export interface ColorMatrixColorFilterProps extends FilterProps {
  readonly matrix: Readonly<Matrix>;
}

export class ColorMatrixColorFilter extends React.Component<ColorMatrixColorFilterProps> { }


export interface IterativeBoxBlurProps extends FilterProps {
  readonly blurRadius?: number;
  readonly iterations?: number;
}

export class IterativeBoxBlur extends React.Component<IterativeBoxBlurProps> { }


export interface LightingColorFilterProps extends FilterProps {
  readonly mul?: string;
  readonly add?: string;
}

export class LightingColorFilter extends React.Component<LightingColorFilterProps> { }


export interface RoundAsCircleProps extends FilterProps { }

export class RoundAsCircle extends React.Component<RoundAsCircleProps> { }


export interface ColorProps extends FilterProps {
  readonly color?: string;
}

export class Color extends React.Component<ColorProps> { }


export interface LinearGradientProps extends FilterProps {
  readonly x0?: string;
  readonly y0?: string;
  readonly x1?: string;
  readonly y1?: string;
  readonly colors?: ReadonlyArray<string>;
  readonly locations?: ReadonlyArray<number>;
  readonly tile?: TileMode;
}

export class LinearGradient extends React.Component<LinearGradientProps> { }


export interface RadialGradientProps extends FilterProps {
  readonly centerX?: string;
  readonly centerY?: string;
  readonly radius?: string;
  readonly colors?: ReadonlyArray<string>;
  readonly stops?: ReadonlyArray<number>;
  readonly tileMode?: TileMode;
}

export class RadialGradient extends React.Component<RadialGradientProps> { }


export interface SweepGradientProps extends FilterProps {
  readonly cx?: string;
  readonly cy?: string;
  readonly colors?: ReadonlyArray<string>;
  readonly positions?: ReadonlyArray<number>;
}

export class SweepGradient extends React.Component<SweepGradientProps> { }


export interface PorterDuffColorFilterProps extends FilterProps {
  readonly color?: string
  readonly mode?: PorterDuffMode;
}

export class PorterDuffColorFilter extends React.Component<PorterDuffColorFilterProps> { }


export interface PorterDuffXfermodeProps extends FilterProps {
  readonly mode?: PorterDuffMode;
}

export class PorterDuffXfermode extends React.Component<PorterDuffXfermodeProps> { }


export interface CIBoxBlurProps extends ResizingFilterProps {
  readonly inputRadius?: Distance;
}

export class CIBoxBlur extends React.Component<CIBoxBlurProps> { }


export interface CIDiscBlurProps extends ResizingFilterProps {
  readonly inputRadius?: Distance;
}

export class CIDiscBlur extends React.Component<CIDiscBlurProps> { }


export interface CIGaussianBlurProps extends ResizingFilterProps {
  readonly inputRadius?: Distance;
}

export class CIGaussianBlur extends React.Component<CIGaussianBlurProps> { }


export interface CIMaskedVariableBlurProps extends ResizingFilterProps {
  readonly inputRadius?: Distance;
}

export class CIMaskedVariableBlur extends React.Component<CIMaskedVariableBlurProps> { }


export interface CIMedianFilterProps extends FilterProps { }

export class CIMedianFilter extends React.Component<CIMedianFilterProps> { }


export interface CIMotionBlurProps extends ResizingFilterProps {
  readonly inputRadius?: Distance;
  readonly inputAngle?: number;
}

export class CIMotionBlur extends React.Component<CIMotionBlurProps> { }


export interface CINoiseReductionProps extends FilterProps {
  readonly inputNoiseLevel?: number;
  readonly inputSharpness?: number;
}

export class CINoiseReduction extends React.Component<CINoiseReductionProps> { }


export interface CIZoomBlurProps extends ResizingFilterProps {
  readonly inputCenter?: Position;
  readonly inputAmount?: Distance;
}

export class CIZoomBlur extends React.Component<CIZoomBlurProps> { }


export interface CIColorControlsProps extends FilterProps {
  readonly inputSaturation?: number;
  readonly inputBrightness?: number;
  readonly inputContrast?: number;
}

export class CIColorControls extends React.Component<CIColorControlsProps> { }


export interface CIColorMatrixProps extends FilterProps {
  readonly inputRVector?: Readonly<RGBAVector>;
  readonly inputGVector?: Readonly<RGBAVector>;
  readonly inputBVector?: Readonly<RGBAVector>;
  readonly inputAVector?: Readonly<RGBAVector>;
  readonly inputBiasVector?: Readonly<RGBAVector>;
}

export class CIColorMatrix extends React.Component<CIColorMatrixProps> { }


export interface CIColorPolynomialProps extends FilterProps {
  readonly inputRedCoefficients?: Readonly<RGBAVector>;
  readonly inputGreenCoefficients?: Readonly<RGBAVector>;
  readonly inputBlueCoefficients?: Readonly<RGBAVector>;
  readonly inputAlphaCoefficients?: Readonly<RGBAVector>;
}

export class CIColorPolynomial extends React.Component<CIColorPolynomialProps> { }


export interface CIExposureAdjustProps extends FilterProps {
  readonly inputEV?: number;
}

export class CIExposureAdjust extends React.Component<CIExposureAdjustProps> { }


export interface CIGammaAdjustProps extends FilterProps {
  readonly inputPower?: number;
}

export class CIGammaAdjust extends React.Component<CIGammaAdjustProps> { }


export interface CIHueAdjustProps extends FilterProps {
  readonly inputAngle?: number;
}

export class CIHueAdjust extends React.Component<CIHueAdjustProps> { }


export interface CILinearToSRGBToneCurveProps extends FilterProps { }

export class CILinearToSRGBToneCurve extends React.Component<CILinearToSRGBToneCurveProps> { }


export interface CISRGBToneCurveToLinearProps extends FilterProps { }

export class CISRGBToneCurveToLinear extends React.Component<CISRGBToneCurveToLinearProps> { }


export interface CITemperatureAndTintProps extends FilterProps {
  readonly inputNeutral?: Readonly<Offset>;
  readonly inputTargetNeutral?: ReadonlyArray<Offset>;
}

export class CITemperatureAndTint extends React.Component<CITemperatureAndTintProps> { }


export interface CIColorClampProps extends FilterProps {
  readonly inputMinComponents?: Readonly<RGBAVector>;
  readonly inputMaxComponents?: Readonly<RGBAVector>;
}

export class CIColorClamp extends React.Component<CIColorClampProps> { }


export interface CIMaskToAlphaProps extends FilterProps { }

export class CIMaskToAlpha extends React.Component<CIMaskToAlphaProps> { }


export interface CIMaximumComponentProps extends FilterProps { }

export class CIMaximumComponent extends React.Component<CIMaximumComponentProps> { }


export interface CIMinimumComponentProps extends FilterProps { }

export class CIMinimumComponent extends React.Component<CIMinimumComponentProps> { }


export interface CIPhotoEffectChromeProps extends FilterProps { }

export class CIPhotoEffectChrome extends React.Component<CIPhotoEffectChromeProps> { }


export interface CIPhotoEffectFadeProps extends FilterProps { }

export class CIPhotoEffectFade extends React.Component<CIPhotoEffectFadeProps> { }


export interface CIPhotoEffectInstantProps extends FilterProps { }

export class CIPhotoEffectInstant extends React.Component<CIPhotoEffectInstantProps> { }


export interface CIPhotoEffectMonoProps extends FilterProps { }

export class CIPhotoEffectMono extends React.Component<CIPhotoEffectMonoProps> { }


export interface CIPhotoEffectNoirProps extends FilterProps { }

export class CIPhotoEffectNoir extends React.Component<CIPhotoEffectNoirProps> { }


export interface CIPhotoEffectProcessProps extends FilterProps { }

export class CIPhotoEffectProcess extends React.Component<CIPhotoEffectProcessProps> { }


export interface CIPhotoEffectTonalProps extends FilterProps { }

export class CIPhotoEffectTonal extends React.Component<CIPhotoEffectTonalProps> { }


export interface CIPhotoEffectTransferProps extends FilterProps { }

export class CIPhotoEffectTransfer extends React.Component<CIPhotoEffectTransferProps> { }


export interface CISepiaToneProps extends FilterProps {
  readonly inputIntensity?: number;
}

export class CISepiaTone extends React.Component<CISepiaToneProps> { }


export interface CIVignetteProps extends FilterProps {
  readonly inputRadius?: Distance;
  readonly inputIntensity?: number;
}

export class CIVignette extends React.Component<CIVignetteProps> { }


export interface CIVignetteEffectProps extends FilterProps {
  readonly inputCenter?: Position;
  readonly inputIntensity?: number;
  readonly inputRadius?: Distance;
}

export class CIVignetteEffect extends React.Component<CIVignetteEffectProps> { }


export interface CIAdditionCompositingProps extends FilterProps { }

export class CIAdditionCompositing extends React.Component<CIAdditionCompositingProps> { }


export interface CIColorBlendModeProps extends FilterProps { }

export class CIColorBlendMode extends React.Component<CIColorBlendModeProps> { }


export interface CIColorBurnBlendModeProps extends FilterProps { }

export class CIColorBurnBlendMode extends React.Component<CIColorBurnBlendModeProps> { }


export interface CIColorDodgeBlendModeProps extends FilterProps { }

export class CIColorDodgeBlendMode extends React.Component<CIColorDodgeBlendModeProps> { }


export interface CIDarkenBlendModeProps extends FilterProps { }

export class CIDarkenBlendMode extends React.Component<CIDarkenBlendModeProps> { }


export interface CIExclusionBlendModeProps extends FilterProps { }

export class CIExclusionBlendMode extends React.Component<CIExclusionBlendModeProps> { }


export interface CIHueBlendModeProps extends FilterProps { }

export class CIHueBlendMode extends React.Component<CIHueBlendModeProps> { }


export interface CILightenBlendModeProps extends FilterProps { }

export class CILightenBlendMode extends React.Component<CILightenBlendModeProps> { }


export interface CIMultiplyBlendModeProps extends FilterProps { }

export class CIMultiplyBlendMode extends React.Component<CIMultiplyBlendModeProps> { }


export interface CIOverlayBlendModeProps extends FilterProps { }

export class CIOverlayBlendMode extends React.Component<CIOverlayBlendModeProps> { }


export interface CIScreenBlendModeProps extends FilterProps { }

export class CIScreenBlendMode extends React.Component<CIScreenBlendModeProps> { }


export interface CISoftLightBlendModeProps extends FilterProps { }

export class CISoftLightBlendMode extends React.Component<CISoftLightBlendModeProps> { }


export interface CIColorInvertProps extends FilterProps { }

export class CIColorInvert extends React.Component<CIColorInvertProps> { }


export interface CIColorMonochromeProps extends FilterProps {
  readonly inputColor?: string;
  readonly inputIntensity?: number;
}

export class CIColorMonochrome extends React.Component<CIColorMonochromeProps> { }


export interface CIColorPosterizeProps extends FilterProps {
  readonly inputLevels?: number;
}

export class CIColorPosterize extends React.Component<CIColorPosterizeProps> { }


export interface CIToneCurveProps extends FilterProps {
  readonly inputPoint0?: Offset;
  readonly inputPoint1?: Offset;
  readonly inputPoint2?: Offset;
  readonly inputPoint3?: Offset;
  readonly inputPoint4?: Offset;
}

export class CIToneCurve extends React.Component<CIToneCurveProps> { }


export interface CIVibranceProps extends FilterProps {
  readonly inputAmount?: number;
}

export class CIVibrance extends React.Component<CIVibranceProps> { }


export interface CICircularScreenProps extends FilterProps {
  readonly inputCenter?: Position;
  readonly inputSharpness?: number;
  readonly inputWidth?: Distance;
}

export class CICircularScreen extends React.Component<CICircularScreenProps> { }


export interface CIDotScreenProps extends FilterProps {
  readonly inputCenter?: Position;
  readonly inputAngle?: Position;
  readonly inputSharpness?: number;
  readonly inputWidth?: Distance;
}

export class CIDotScreen extends React.Component<CIDotScreenProps> { }


export interface CILineScreenProps extends FilterProps {
  readonly inputCenter?: Position;
  readonly inputAngle?: Position;
  readonly inputSharpness?: number;
  readonly inputWidth?: Distance;
}

export class CILineScreen extends React.Component<CILineScreenProps> { }


export interface CIBumpDistortionProps extends ResizingFilterProps {
  readonly inputCenter?: Position;
  readonly inputRadius?: Distance;
  readonly inputScale?: number;
}

export class CIBumpDistortion extends React.Component<CIBumpDistortionProps> { }


export interface CIBumpDistortionLinearProps extends FilterProps {
  readonly inputCenter?: Position;
  readonly inputRadius?: Distance;
  readonly inputScale?: number;
  readonly inputAngle?: number;
}

export class CIBumpDistortionLinear extends React.Component<CIBumpDistortionLinearProps> { }


export interface CICircleSplashDistortionProps extends FilterProps {
  readonly inputCenter?: Position;
  readonly inputRadius?: Distance;
}

export class CICircleSplashDistortion extends React.Component<CICircleSplashDistortionProps> { }


export interface CICircularWrapProps extends ResizingFilterProps {
  readonly inputCenter?: Position;
  readonly inputRadius?: Distance;
  readonly inputAngle?: number;
}

export class CICircularWrap extends React.Component<CICircularWrapProps> { }


export interface CIVortexDistortionProps extends ResizingFilterProps {
  readonly inputCenter?: Position;
  readonly inputRadius?: Distance;
  readonly inputAngle?: number;
}

export class CIVortexDistortion extends React.Component<CIVortexDistortionProps> { }


export interface CIConstantColorGeneratorProps extends GeneratorProps {
  readonly inputColor?: string;
}

export class CIConstantColorGenerator extends React.Component<CIConstantColorGeneratorProps> { }


export interface CIRandomGeneratorProps extends GeneratorProps { }

export class CIRandomGenerator extends React.Component<CIRandomGeneratorProps> { }


export interface CILinearGradientProps extends GeneratorProps { }

export class CILinearGradient extends React.Component<CILinearGradientProps> {
  readonly inputPoint0?: Position;
  readonly inputPoint1?: Position;
  readonly inputColor0?: string;
  readonly inputColor1?: string;
}


export interface CIRadialGradientProps extends GeneratorProps {
  readonly inputCenter?: Position;
  readonly inputRadius0?: Distance;
  readonly inputRadius1?: Distance;
  readonly inputColor0?: Distance;
  readonly inputColor1?: Distance;
}

export class CIRadialGradient extends React.Component<CIRadialGradientProps> { }


export interface CISharpenLuminanceProps extends FilterProps {
  readonly inputSharpness?: number;
}

export class CISharpenLuminance extends React.Component<CISharpenLuminanceProps> { }


export interface CIUnsharpMaskProps extends FilterProps {
  readonly inputRadius?: Distance;
  readonly inputIntensity?: number;
}

export class CIUnsharpMask extends React.Component<CIUnsharpMaskProps> { }


export interface CICrystallizeProps extends FilterProps {
  readonly inputRadius?: Distance;
  readonly inputCenter?: Position;
}

export class CICrystallize extends React.Component<CICrystallizeProps> { }


export interface CIEdgesProps extends FilterProps {
  readonly inputIntensity?: number;
}

export class CIEdges extends React.Component<CIEdgesProps> { }


export interface CILineOverlayProps extends FilterProps {
  readonly inputNRNoiseLevel?: number;
  readonly inputNRSharpness?: number;
  readonly inputEdgeIntensity?: number;
  readonly inputThreshold?: number;
  readonly inputContrast?: number;
}

export class CILineOverlay extends React.Component<CILineOverlayProps> { }


export interface CIPixellateProps extends FilterProps {
  readonly inputScale?: Distance;
  readonly inputCenter?: Position;
}

export class CIPixellate extends React.Component<CIPixellateProps> { }


export interface CIPointillizeProps extends FilterProps {
  readonly inputRadius?: Distance;
  readonly inputCenter?: Position;
}

export class CIPointillize extends React.Component<CIPointillizeProps> { }


export interface CIOpTileProps extends FilterProps {
  readonly inputWidth?: Distance;
  readonly inputScale?: number;
  readonly inputAngle?: number;
  readonly inputCenter?: Position;
}

export class CIOpTile extends React.Component<CIOpTileProps> { }

export const imagePlaceholderSource: ReactNative.ImageURISource;

export type ImagePlaceholderProps = Pick<
  ReactNative.ImageProps,
  Exclude<keyof ReactNative.ImageProps, 'source'>
>;

export class ImagePlaceholder extends React.Component<ImagePlaceholderProps> { }

export function concatColorMatrices(matrices: Matrix[]): Matrix;

export function normal(): Matrix;
export function rgba(red?: number, green?: number, blue?: number, alpha?: number): Matrix;
export function saturate(value?: number): Matrix;
export function hueRotate(value?: number): Matrix;
export function luminanceToAlpha(): Matrix;
export function invert(): Matrix;
export function blackAndWhite(): Matrix;
export function grayscale(value?: number): Matrix;
export function sepia(): Matrix;
export function nightvision(): Matrix;
export function warm(): Matrix;
export function cool(): Matrix;
export function brightness(value?: number): Matrix;
export function exposure(value?: number): Matrix;
export function contrast(value?: number): Matrix;
export function temperature(value?: number): Matrix;
export function tint(value?: number): Matrix;
export function threshold(value?: number): Matrix;
export function technicolor(): Matrix;
export function polaroid(): Matrix;
export function toBGR(): Matrix;
export function kodachrome(): Matrix;
export function browni(): Matrix;
export function vintage(): Matrix;
export function night(value?: number): Matrix;
export function predator(value?: number): Matrix;
export function lsd(): Matrix;
export function colorTone(
  desaturation?: number,
  toned?: number,
  lightColor?: string,
  darkColor?: string
): Matrix;
export function duoTone(firstColor?: string, secondColor?: string): Matrix;
export function protanomaly(): Matrix;
export function deuteranomaly(): Matrix;
export function tritanomaly(): Matrix;
export function protanopia(): Matrix;
export function deuteranopia(): Matrix;
export function tritanopia(): Matrix;
export function achromatopsia(): Matrix;
export function achromatomaly(): Matrix;
