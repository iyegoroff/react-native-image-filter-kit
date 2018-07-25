import * as React from 'react';
import * as ReactNative from 'react-native';

interface FilterProps extends ReactNative.ViewProps { }

interface ResizingFilterProps extends FilterProps {
  readonly resizeOutput?: boolean;
}

interface FilterPoint {
  readonly x: string;
  readonly y: string;
}

export interface ColorMatrixProps extends FilterProps {
  readonly matrix: ReadonlyArray<number>;
}

export class ColorMatrix extends React.Component<ColorMatrixProps> { }


export interface NormalProps extends FilterProps { }

export class Normal extends React.Component<NormalProps> { }


export interface SaturateProps extends FilterProps {
  readonly value: number;
}

export class Saturate extends React.Component<SaturateProps> { }


export interface HueRotateProps extends FilterProps {
  readonly value: number;
}

export class HueRotate extends React.Component<HueRotateProps> { }


export interface LuminanceToAlphaProps extends FilterProps { }

export class LuminanceToAlpha extends React.Component<LuminanceToAlphaProps> { }


export interface InvertProps extends FilterProps { }

export class Invert extends React.Component<InvertProps> { }


export interface GrayscaleProps extends FilterProps { }

export class Grayscale extends React.Component<GrayscaleProps> { }


export interface SepiaProps extends FilterProps { }

export class Sepia extends React.Component<SepiaProps> { }


export interface NightvisionProps extends FilterProps { }

export class Nightvision extends React.Component<NightvisionProps> { }


export interface WarmProps extends FilterProps { }

export class Warm extends React.Component<WarmProps> { }


export interface CoolProps extends FilterProps { }

export class Cool extends React.Component<CoolProps> { }


export interface BrightnessProps extends FilterProps {
  readonly value: number;
}

export class Brightness extends React.Component<BrightnessProps> { }


export interface ExposureProps extends FilterProps {
  readonly value: number;
}

export class Exposure extends React.Component<ExposureProps> { }


export interface ContrastProps extends FilterProps {
  readonly value: number;
}

export class Contrast extends React.Component<ContrastProps> { }


export interface TemperatureProps extends FilterProps {
  readonly value: number;
}

export class Temperature extends React.Component<TemperatureProps> { }


export interface TintProps extends FilterProps {
  readonly value: number;
}

export class Tint extends React.Component<TintProps> { }


export interface ThresholdProps extends FilterProps {
  readonly value: number;
}

export class Threshold extends React.Component<ThresholdProps> { }


export interface ProtanomalyProps extends FilterProps { }

export class Protanomaly extends React.Component<ProtanomalyProps> { }


export interface DeuteranomalyProps extends FilterProps { }

export class Deuteranomaly extends React.Component<DeuteranomalyProps> { }


export interface TritanomalyProps extends FilterProps { }

export class Tritanomaly extends React.Component<TritanomalyProps> { }


export interface ProtanopiaProps extends FilterProps { }

export class Protanopia extends React.Component<ProtanopiaProps> { }


export interface DeuteranopiaProps extends FilterProps { }

export class Deuteranopia extends React.Component<DeuteranopiaProps> { }


export interface TritanopiaProps extends FilterProps { }

export class Tritanopia extends React.Component<TritanopiaProps> { }


export interface AchromatopsiaProps extends FilterProps { }

export class Achromatopsia extends React.Component<AchromatopsiaProps> { }


export interface AchromatomalyProps extends FilterProps { }

export class Achromatomaly extends React.Component<AchromatomalyProps> { }


export interface ColorMatrixColorFilterProps extends FilterProps {
  readonly matrix: ReadonlyArray<number>;
}

export class ColorMatrixColorFilter extends React.Component<ColorMatrixColorFilterProps> { }


export interface IterativeBoxBlurProps extends FilterProps {
  readonly blurRadius?: number;
  readonly iterations?: number;
}

export class IterativeBoxBlur
  extends React.Component<IterativeBoxBlurProps> { }


export interface LightingColorFilterProps extends FilterProps {
  readonly mul?: string;
  readonly add?: string;
}

export class LightingColorFilter
  extends React.Component<LightingColorFilterProps> { }


export interface RoundAsCircleProps extends FilterProps { }

export class RoundAsCircle extends React.Component<RoundAsCircleProps> { }


export interface CIBoxBlurProps extends ResizingFilterProps {
  readonly inputRadius?: string;
}

export class CIBoxBlur extends React.Component<CIBoxBlurProps> { }


export interface CIGaussianBlurProps extends ResizingFilterProps {
  readonly inputRadius?: string;
}

export class CIGaussianBlur extends React.Component<CIGaussianBlurProps> { }


export interface CIDiscBlurProps extends ResizingFilterProps {
  readonly inputRadius?: string;
}

export class CIDiscBlur extends React.Component<CIDiscBlurProps> { }


export interface CIMedianFilterProps extends FilterProps { }

export class CIMedianFilter extends React.Component<CIMedianFilterProps> { }


export interface CIMotionBlurProps extends ResizingFilterProps {
  readonly inputRadius?: string;
  readonly inputAngle?: number;
}

export class CIMotionBlur extends React.Component<CIMotionBlurProps> { }


export interface CINoiseReductionProps extends FilterProps {
  readonly inputNoiseLevel?: number;
  readonly inputSharpness?: number;
}

export class CINoiseReduction extends React.Component<CINoiseReductionProps> { }


export interface CIZoomBlurProps extends ResizingFilterProps {
  readonly inputCenter?: FilterPoint;
  readonly inputAmount?: string;
}

export class CIZoomBlur extends React.Component<CIZoomBlurProps> { }


export interface CIColorControlsProps extends FilterProps {
  readonly inputSaturation?: number;
  readonly inputBrightness?: number;
  readonly inputContrast?: number;
}

export class CIColorControls extends React.Component<CIColorControlsProps> { }


export interface CIColorMatrixProps extends FilterProps {
  readonly inputRVector?: ReadonlyArray<number>;
  readonly inputGVector?: ReadonlyArray<number>;
  readonly inputBVector?: ReadonlyArray<number>;
  readonly inputAVector?: ReadonlyArray<number>;
  readonly inputBiasVector?: ReadonlyArray<number>;
}

export class CIColorMatrix extends React.Component<CIColorMatrixProps> { }


export interface CIHueAdjustProps extends FilterProps {
  readonly inputAngle?: number;
}

export class CIHueAdjust extends React.Component<CIHueAdjustProps> { }


export interface CIColorClampProps extends FilterProps {
  readonly inputMinComponents?: ReadonlyArray<number>;
  readonly inputMaxComponents?: ReadonlyArray<number>;
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


export interface CIVignetteEffectProps extends FilterProps {
  readonly inputCenter?: FilterPoint;
  readonly inputIntensity?: number;
  readonly inputRadius?: string;
}

export class CIVignetteEffect extends React.Component<CIVignetteEffectProps> { }


export interface CIColorInvertProps extends FilterProps { }

export class CIColorInvert extends React.Component<CIColorInvertProps> { }


export interface CIColorPosterizeProps extends FilterProps {
  readonly inputLevels?: number;
}

export class CIColorPosterize extends React.Component<CIColorPosterizeProps> { }


export interface CIVibranceProps extends FilterProps {
  readonly inputAmount?: number;
}

export class CIVibrance extends React.Component<CIVibranceProps> { }


export interface CICircularScreenProps extends FilterProps {
  readonly inputCenter?: FilterPoint;
  readonly inputSharpness?: number;
  readonly inputWidth?: string;
}

export class CICircularScreen extends React.Component<CICircularScreenProps> { }


export interface CIDotScreenProps extends FilterProps {
  readonly inputCenter?: FilterPoint;
  readonly inputAngle?: FilterPoint;
  readonly inputSharpness?: number;
  readonly inputWidth?: string;
}

export class CIDotScreen extends React.Component<CIDotScreenProps> { }


export interface CIBumpDistortionProps extends ResizingFilterProps {
  readonly inputCenter?: FilterPoint;
  readonly inputRadius?: string;
  readonly inputScale?: number;
}

export class CIBumpDistortion extends React.Component<CIBumpDistortionProps> { }


export interface CIBumpDistortionLinearProps extends FilterProps {
  readonly inputCenter?: FilterPoint;
  readonly inputRadius?: string;
  readonly inputScale?: number;
  readonly inputAngle?: number;
}

export class CIBumpDistortionLinear extends React.Component<CIBumpDistortionLinearProps> { }


export interface CICircleSplashDistortionProps extends FilterProps {
  readonly inputCenter?: FilterPoint;
  readonly inputRadius?: string;
}

export class CICircleSplashDistortion extends React.Component<CICircleSplashDistortionProps> { }


export interface CICircularWrapProps extends ResizingFilterProps {
  readonly inputCenter?: FilterPoint;
  readonly inputRadius?: string;
  readonly inputAngle?: number;
}

export class CICircularWrap extends React.Component<CICircularWrapProps> { }


export interface CISharpenLuminanceProps extends FilterProps {
  readonly inputSharpness?: number;
}

export class CISharpenLuminance extends React.Component<CISharpenLuminanceProps> { }


export interface CIUnsharpMaskProps extends FilterProps {
  readonly inputRadius?: string;
  readonly inputIntensity?: number;
}

export class CIUnsharpMask extends React.Component<CIUnsharpMaskProps> { }


export interface CICrystallizeProps extends FilterProps {
  readonly inputRadius?: string;
  readonly inputCenter?: FilterPoint;
}

export class CICrystallize extends React.Component<CICrystallizeProps> { }
