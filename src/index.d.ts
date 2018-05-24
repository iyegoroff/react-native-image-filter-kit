import * as React from 'react';
import * as ReactNative from 'react-native';

export interface ImageMatrixFilterProps extends ReactNative.ViewProps {
  readonly matrix: ReadonlyArray<number>;
}

export class ImageMatrixFilter extends React.Component<ImageMatrixFilterProps> { }


export interface ImageNormalMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageNormalMatrixFilter extends React.Component<ImageNormalMatrixFilterProps> { }


export interface ImageSaturateMatrixFilterProps extends ReactNative.ViewProps {
  readonly value: number;
}

export class ImageSaturateMatrixFilter extends React.Component<ImageSaturateMatrixFilterProps> { }


export interface ImageHueRotateMatrixFilterProps extends ReactNative.ViewProps {
  readonly value: number;
}

export class ImageHueRotateMatrixFilter extends React.Component<ImageHueRotateMatrixFilterProps> { }


export interface ImageLuminanceToAlphaMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageLuminanceToAlphaMatrixFilter extends React.Component<ImageLuminanceToAlphaMatrixFilterProps> { }


export interface ImageInvertMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageInvertMatrixFilter extends React.Component<ImageInvertMatrixFilterProps> { }


export interface ImageGrayscaleMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageGrayscaleMatrixFilter extends React.Component<ImageGrayscaleMatrixFilterProps> { }


export interface ImageSepiaMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageSepiaMatrixFilter extends React.Component<ImageSepiaMatrixFilterProps> { }


export interface ImageNightvisionMatrixFilterProps extends ReactNative.ViewProps {
  readonly value: number;
}

export class ImageNightvisionMatrixFilter extends React.Component<ImageNightvisionMatrixFilterProps> { }


export interface ImageWarmMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageWarmMatrixFilter extends React.Component<ImageWarmMatrixFilterProps> { }


export interface ImageCoolMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageCoolMatrixFilter extends React.Component<ImageCoolMatrixFilterProps> { }


export interface ImageBrightnessMatrixFilterProps extends ReactNative.ViewProps {
  readonly value: number;
}

export class ImageBrightnessMatrixFilter extends React.Component<ImageBrightnessMatrixFilterProps> { }


export interface ImageExposureMatrixFilterProps extends ReactNative.ViewProps {
  readonly value: number;
}

export class ImageExposureMatrixFilter extends React.Component<ImageExposureMatrixFilterProps> { }


export interface ImageContrastMatrixFilterProps extends ReactNative.ViewProps {
  readonly value: number;
}

export class ImageContrastMatrixFilter extends React.Component<ImageContrastMatrixFilterProps> { }


export interface ImageTemperatureMatrixFilterProps extends ReactNative.ViewProps {
  readonly value: number;
}

export class ImageTemperatureMatrixFilter extends React.Component<ImageTemperatureMatrixFilterProps> { }


export interface ImageTintMatrixFilterProps extends ReactNative.ViewProps {
  readonly value: number;
}

export class ImageTintMatrixFilter extends React.Component<ImageTintMatrixFilterProps> { }


export interface ImageThresholdMatrixFilterProps extends ReactNative.ViewProps {
  readonly value: number;
}

export class ImageThresholdMatrixFilter extends React.Component<ImageThresholdMatrixFilterProps> { }


export interface ImageProtanomalyMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageProtanomalyMatrixFilter extends React.Component<ImageProtanomalyMatrixFilterProps> { }


export interface ImageDeuteranomalyMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageDeuteranomalyMatrixFilter extends React.Component<ImageDeuteranomalyMatrixFilterProps> { }


export interface ImageTritanomalyMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageTritanomalyMatrixFilter extends React.Component<ImageTritanomalyMatrixFilterProps> { }


export interface ImageProtanopiaMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageProtanopiaMatrixFilter extends React.Component<ImageProtanopiaMatrixFilterProps> { }


export interface ImageDeuteranopiaMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageDeuteranopiaMatrixFilter extends React.Component<ImageDeuteranopiaMatrixFilterProps> { }


export interface ImageTritanopiaMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageTritanopiaMatrixFilter extends React.Component<ImageTritanopiaMatrixFilterProps> { }


export interface ImageAchromatopsiaMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageAchromatopsiaMatrixFilter extends React.Component<ImageAchromatopsiaMatrixFilterProps> { }


export interface ImageAchromatomalyMatrixFilterProps extends ReactNative.ViewProps { }

export class ImageAchromatomalyMatrixFilter extends React.Component<ImageAchromatomalyMatrixFilterProps> { }


export interface CIGaussianBlurProps extends ReactNative.ViewProps {
  readonly inputRadius?: number;
}

export class CIGaussianBlur extends React.Component<CIGaussianBlurProps> { }


export interface CIDiscBlurProps extends ReactNative.ViewProps {
  readonly inputRadius?: number;
}

export class CIDiscBlur extends React.Component<CIDiscBlurProps> { }


export interface CIMedianFilterProps extends ReactNative.ViewProps { }

export class CIMedianFilter extends React.Component<CIMedianFilterProps> { }


export interface CIMotionBlurProps extends ReactNative.ViewProps {
  readonly inputRadius?: number;
  readonly inputAngle?: number;
}

export class CIMotionBlur extends React.Component<CIMotionBlurProps> { }


export interface CINoiseReductionProps extends ReactNative.ViewProps {
  readonly inputNoiseLevel?: number;
  readonly inputSharpness?: number;
}

export class CINoiseReduction extends React.Component<CINoiseReductionProps> { }


export interface CIZoomBlurProps extends ReactNative.ViewProps {
  readonly inputCenter?: Readonly<{ x: number; y: number }>;
  readonly inputAmount?: number;
}

export class CIZoomBlur extends React.Component<CIZoomBlurProps> { }


export interface CIColorControlsProps extends ReactNative.ViewProps {
  readonly inputSaturation?: number;
  readonly inputBrightness?: number;
  readonly inputContrast?: number;
}

export class CIColorControls extends React.Component<CIColorControlsProps> { }


export interface CIColorClampProps extends ReactNative.ViewProps {
  readonly inputMinComponents?: ReadonlyArray<number>;
  readonly inputMaxComponents?: ReadonlyArray<number>;
}

export class CIColorClamp extends React.Component<CIColorClampProps> { }


export interface CIMaskToAlphaProps extends ReactNative.ViewProps { }

export class CIMaskToAlpha extends React.Component<CIMaskToAlphaProps> { }


export interface CIMaximumComponentProps extends ReactNative.ViewProps { }

export class CIMaximumComponent extends React.Component<CIMaximumComponentProps> { }


export interface CIMinimumComponentProps extends ReactNative.ViewProps { }

export class CIMinimumComponent extends React.Component<CIMinimumComponentProps> { }


export interface CIPhotoEffectChromeProps extends ReactNative.ViewProps { }

export class CIPhotoEffectChrome extends React.Component<CIPhotoEffectChromeProps> { }


export interface CIPhotoEffectFadeProps extends ReactNative.ViewProps { }

export class CIPhotoEffectFade extends React.Component<CIPhotoEffectFadeProps> { }


export interface CIPhotoEffectInstantProps extends ReactNative.ViewProps { }

export class CIPhotoEffectInstant extends React.Component<CIPhotoEffectInstantProps> { }


export interface CIPhotoEffectMonoProps extends ReactNative.ViewProps { }

export class CIPhotoEffectMono extends React.Component<CIPhotoEffectMonoProps> { }


export interface CIPhotoEffectNoirProps extends ReactNative.ViewProps { }

export class CIPhotoEffectNoir extends React.Component<CIPhotoEffectNoirProps> { }


export interface CIPhotoEffectProcessProps extends ReactNative.ViewProps { }

export class CIPhotoEffectProcess extends React.Component<CIPhotoEffectProcessProps> { }


export interface CIPhotoEffectTonalProps extends ReactNative.ViewProps { }

export class CIPhotoEffectTonal extends React.Component<CIPhotoEffectTonalProps> { }


export interface CIPhotoEffectTransferProps extends ReactNative.ViewProps { }

export class CIPhotoEffectTransfer extends React.Component<CIPhotoEffectTransferProps> { }


export interface CIColorInvertProps extends ReactNative.ViewProps { }

export class CIColorInvert extends React.Component<CIColorInvertProps> { }


export interface CIColorPosterizeProps extends ReactNative.ViewProps { }

export class CIColorPosterize extends React.Component<CIColorPosterizeProps> { }


export interface CIVibranceProps extends ReactNative.ViewProps {
  readonly inputAmount?: number;
}

export class CIVibrance extends React.Component<CIVibranceProps> { }


export interface CICircularScreenProps extends ReactNative.ViewProps {
  readonly inputCenter?: Readonly<{ x: number; y: number }>;
  readonly inputSharpness?: number;
  readonly inputWidth?: number;
}

export class CICircularScreen extends React.Component<CICircularScreenProps> { }


export interface CIBumpDistortionProps extends ReactNative.ViewProps {
  readonly inputCenter?: Readonly<{ x: number; y: number }>;
  readonly inputRadius?: number;
  readonly inputScale?: number;
}

export class CIBumpDistortion extends React.Component<CIBumpDistortionProps> { }


export interface CIBumpDistortionLinearProps extends ReactNative.ViewProps {
  readonly inputCenter?: Readonly<{ x: number; y: number }>;
  readonly inputRadius?: number;
  readonly inputScale?: number;
  readonly inputAngle?: number;
}

export class CIBumpDistortionLinear extends React.Component<CIBumpDistortionLinearProps> { }


export interface CICircleSplashDistortionProps extends ReactNative.ViewProps {
  readonly inputCenter?: Readonly<{ x: number; y: number }>;
  readonly inputRadius?: number;
}

export class CICircleSplashDistortion extends React.Component<CICircleSplashDistortionProps> { }


export interface CICircularWrapProps extends ReactNative.ViewProps {
  readonly inputCenter?: Readonly<{ x: number; y: number }>;
  readonly inputRadius?: number;
  readonly inputAngle?: number;
}

export class CICircularWrap extends React.Component<CICircularWrapProps> { }
