import * as React from 'react';
import * as ReactNative from 'react-native';  

interface FilterProps extends ReactNative.ViewProps {
  readonly resizeOutput?: boolean;
}

interface FilterPoint {
  readonly x: string;
  readonly y: string;
}

export interface ImageMatrixFilterProps extends FilterProps {
  readonly matrix: ReadonlyArray<number>;
}

export class ImageMatrixFilter extends React.Component<ImageMatrixFilterProps> { }


export interface ImageNormalMatrixFilterProps extends FilterProps { }

export class ImageNormalMatrixFilter extends React.Component<ImageNormalMatrixFilterProps> { }


export interface ImageSaturateMatrixFilterProps extends FilterProps {
  readonly value: number;
}

export class ImageSaturateMatrixFilter extends React.Component<ImageSaturateMatrixFilterProps> { }


export interface ImageHueRotateMatrixFilterProps extends FilterProps {
  readonly value: number;
}

export class ImageHueRotateMatrixFilter extends React.Component<ImageHueRotateMatrixFilterProps> { }


export interface ImageLuminanceToAlphaMatrixFilterProps extends FilterProps { }

export class ImageLuminanceToAlphaMatrixFilter extends React.Component<ImageLuminanceToAlphaMatrixFilterProps> { }


export interface ImageInvertMatrixFilterProps extends FilterProps { }

export class ImageInvertMatrixFilter extends React.Component<ImageInvertMatrixFilterProps> { }


export interface ImageGrayscaleMatrixFilterProps extends FilterProps { }

export class ImageGrayscaleMatrixFilter extends React.Component<ImageGrayscaleMatrixFilterProps> { }


export interface ImageSepiaMatrixFilterProps extends FilterProps { }

export class ImageSepiaMatrixFilter extends React.Component<ImageSepiaMatrixFilterProps> { }


export interface ImageNightvisionMatrixFilterProps extends FilterProps {
  readonly value: number;
}

export class ImageNightvisionMatrixFilter extends React.Component<ImageNightvisionMatrixFilterProps> { }


export interface ImageWarmMatrixFilterProps extends FilterProps { }

export class ImageWarmMatrixFilter extends React.Component<ImageWarmMatrixFilterProps> { }


export interface ImageCoolMatrixFilterProps extends FilterProps { }

export class ImageCoolMatrixFilter extends React.Component<ImageCoolMatrixFilterProps> { }


export interface ImageBrightnessMatrixFilterProps extends FilterProps {
  readonly value: number;
}

export class ImageBrightnessMatrixFilter extends React.Component<ImageBrightnessMatrixFilterProps> { }


export interface ImageExposureMatrixFilterProps extends FilterProps {
  readonly value: number;
}

export class ImageExposureMatrixFilter extends React.Component<ImageExposureMatrixFilterProps> { }


export interface ImageContrastMatrixFilterProps extends FilterProps {
  readonly value: number;
}

export class ImageContrastMatrixFilter extends React.Component<ImageContrastMatrixFilterProps> { }


export interface ImageTemperatureMatrixFilterProps extends FilterProps {
  readonly value: number;
}

export class ImageTemperatureMatrixFilter extends React.Component<ImageTemperatureMatrixFilterProps> { }


export interface ImageTintMatrixFilterProps extends FilterProps {
  readonly value: number;
}

export class ImageTintMatrixFilter extends React.Component<ImageTintMatrixFilterProps> { }


export interface ImageThresholdMatrixFilterProps extends FilterProps {
  readonly value: number;
}

export class ImageThresholdMatrixFilter extends React.Component<ImageThresholdMatrixFilterProps> { }


export interface ImageProtanomalyMatrixFilterProps extends FilterProps { }

export class ImageProtanomalyMatrixFilter extends React.Component<ImageProtanomalyMatrixFilterProps> { }


export interface ImageDeuteranomalyMatrixFilterProps extends FilterProps { }

export class ImageDeuteranomalyMatrixFilter extends React.Component<ImageDeuteranomalyMatrixFilterProps> { }


export interface ImageTritanomalyMatrixFilterProps extends FilterProps { }

export class ImageTritanomalyMatrixFilter extends React.Component<ImageTritanomalyMatrixFilterProps> { }


export interface ImageProtanopiaMatrixFilterProps extends FilterProps { }

export class ImageProtanopiaMatrixFilter extends React.Component<ImageProtanopiaMatrixFilterProps> { }


export interface ImageDeuteranopiaMatrixFilterProps extends FilterProps { }

export class ImageDeuteranopiaMatrixFilter extends React.Component<ImageDeuteranopiaMatrixFilterProps> { }


export interface ImageTritanopiaMatrixFilterProps extends FilterProps { }

export class ImageTritanopiaMatrixFilter extends React.Component<ImageTritanopiaMatrixFilterProps> { }


export interface ImageAchromatopsiaMatrixFilterProps extends FilterProps { }

export class ImageAchromatopsiaMatrixFilter extends React.Component<ImageAchromatopsiaMatrixFilterProps> { }


export interface ImageAchromatomalyMatrixFilterProps extends FilterProps { }

export class ImageAchromatomalyMatrixFilter extends React.Component<ImageAchromatomalyMatrixFilterProps> { }


export interface CIGaussianBlurProps extends FilterProps {
  readonly inputRadius?: string;
}

export class CIGaussianBlur extends React.Component<CIGaussianBlurProps> { }


export interface CIDiscBlurProps extends FilterProps {
  readonly inputRadius?: string;
}

export class CIDiscBlur extends React.Component<CIDiscBlurProps> { }


export interface CIMedianFilterProps extends FilterProps { }

export class CIMedianFilter extends React.Component<CIMedianFilterProps> { }


export interface CIMotionBlurProps extends FilterProps {
  readonly inputRadius?: string;
  readonly inputAngle?: number;
}

export class CIMotionBlur extends React.Component<CIMotionBlurProps> { }


export interface CINoiseReductionProps extends FilterProps {
  readonly inputNoiseLevel?: number;
  readonly inputSharpness?: number;
}

export class CINoiseReduction extends React.Component<CINoiseReductionProps> { }


export interface CIZoomBlurProps extends FilterProps {
  readonly inputCenter?: FilterPoint;
  readonly inputAmount?: number;
}

export class CIZoomBlur extends React.Component<CIZoomBlurProps> { }


export interface CIColorControlsProps extends FilterProps {
  readonly inputSaturation?: number;
  readonly inputBrightness?: number;
  readonly inputContrast?: number;
}

export class CIColorControls extends React.Component<CIColorControlsProps> { }


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


export interface CIColorInvertProps extends FilterProps { }

export class CIColorInvert extends React.Component<CIColorInvertProps> { }


export interface CIColorPosterizeProps extends FilterProps { }

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


export interface CIBumpDistortionProps extends FilterProps {
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


export interface CICircularWrapProps extends FilterProps {
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
