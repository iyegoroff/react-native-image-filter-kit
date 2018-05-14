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


export interface ImageGaussianBlurFilterProps extends ReactNative.ViewProps {
  readonly radius: number;
}

export class ImageGaussianBlurFilter extends React.Component<ImageGaussianBlurFilterProps> { }


export interface ImageDiscBlurFilterProps extends ReactNative.ViewProps {
  readonly radius: number;
}

export class ImageDiscBlurFilter extends React.Component<ImageDiscBlurFilterProps> { }


export interface ImageMedianFilterFilterProps extends ReactNative.ViewProps { }

export class ImageMedianFilterFilter extends React.Component<ImageMedianFilterFilterProps> { }


export interface ImageMotionBlurFilterProps extends ReactNative.ViewProps {
  readonly radius: number;
  readonly angle: number;
}

export class ImageMotionBlurFilter extends React.Component<ImageMotionBlurFilterProps> { }


export interface ImageNoiseReductionFilterProps extends ReactNative.ViewProps {
  readonly noiseLevel: number;
  readonly zoomBlur: number;
}

export class ImageNoiseReductionFilter extends React.Component<ImageNoiseReductionFilterProps> { }


export interface ImageZoomBlurFilterProps extends ReactNative.ViewProps {
  readonly center: number;
  readonly amount: number;
}

export class ImageZoomBlurFilter extends React.Component<ImageZoomBlurFilterProps> { }


export interface ImageColorControlsFilterProps extends ReactNative.ViewProps {
  readonly saturation: number;
  readonly brightness: number;
  readonly contrast: number;
}

export class ImageColorControlsFilter extends React.Component<ImageColorControlsFilterProps> { }
