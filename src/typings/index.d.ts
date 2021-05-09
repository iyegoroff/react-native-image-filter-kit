import * as React from 'react'
import { Matrix } from 'rn-color-matrices'
import { ViewProps, NativeSyntheticEvent, ImageProps, ImageBackgroundProps } from 'react-native'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type Distance = number | string

type Position = {
  readonly x: Distance
  readonly y: Distance
}

type Offset = {
  readonly x: number
  readonly y: number
}

type Scale = 'COVER' | 'CONTAIN' | 'STRETCH' | Offset

type Angle = number | string

type Transform = {
  readonly anchor?: Offset
  readonly translate?: Offset
  readonly scale?: Scale
  readonly rotate?: Angle
}

type PathStep =
  | { moveTo: [Distance, Distance] }
  | { lineTo: [Distance, Distance] }
  | { quadTo: [Distance, Distance, Distance, Distance] }
  | { cubicTo: [Distance, Distance, Distance, Distance, Distance, Distance] }
  | { closePath: [] }

type Path = readonly PathStep[]

type Area = {
  readonly x: Distance
  readonly y: Distance
  readonly width: Distance
  readonly height: Distance
}

type TileMode = 'CLAMP' | 'MIRROR' | 'REPEAT'

type MixStep = 'CLAMP' | 'SMOOTH'

type PorterDuffMode =
  | 'ADD'
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

export type Filterable<Rest> = React.ReactElement<unknown> | Config<Rest>

type CacheableConfig = {
  /** Should be used only when defining custom filters */
  readonly disableCache?: boolean
}

type CommonConfig<Rest = never> = {
  readonly image: Filterable<Rest>
} & CacheableConfig

type ColorMatrixConfig<Rest = never> = {
  readonly matrix: Matrix
} & CommonConfig<Rest>

type RGBAConfig<Rest = never> = {
  readonly red?: number
  readonly green?: number
  readonly blue?: number
  readonly alpha?: number
} & CommonConfig<Rest>

type AmountConfig<Rest = never> = {
  readonly amount?: number
} & CommonConfig<Rest>

type ColorToneConfig<Rest = never> = {
  readonly desaturation?: number
  readonly toned?: number
  readonly lightColor?: string
  readonly darkColor?: string
} & CommonConfig<Rest>

type DuoToneConfig<Rest = never> = {
  readonly firstColor?: string
  readonly secondColor?: string
} & CommonConfig<Rest>

type ConvolveMatrix3x3Config<Rest = never> = {
  readonly matrix?: [number, number, number, number, number, number, number, number, number]
} & CommonConfig<Rest>

type ConvolveMatrix5x5Config<Rest = never> = {
  readonly matrix?: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ]
} & CommonConfig<Rest>

type BlurConfig<Rest = never> = {
  readonly radius?: number
} & CommonConfig<Rest>

type CompositionConfig<Rest = never> = {
  readonly dstImage: Filterable<Rest>
  readonly dstTransform?: Transform
  readonly srcImage: Filterable<Rest>
  readonly srcTransform?: Transform
  readonly resizeCanvasTo?: 'dstImage' | 'srcImage'
} & CacheableConfig

type BlendColorConfig<Rest = never> = {
  readonly dstImage: Filterable<Rest>
  readonly srcColor: string
  /** Should be used only when defining custom filters */
  readonly disableIntermediateCaches?: boolean
} & CacheableConfig

type GradientConfig<Rest> = {
  readonly colors?: [
    string,
    string?,
    string?,
    string?,
    string?,
    string?,
    string?,
    string?,
    string?,
    string?
  ]
  readonly stops?: [
    number,
    number?,
    number?,
    number?,
    number?,
    number?,
    number?,
    number?,
    number?,
    number?
  ]
  readonly mixStep?: MixStep
} & Partial<CommonConfig<Rest>>

type QuadGradientConfig<Rest = never> = {
  readonly bottomLeftColor: string
  readonly bottomRightColor: string
  readonly topLeftColor: string
  readonly topRightColor: string
} & Partial<CommonConfig<Rest>>

type LinearGradientConfig<Rest = never> = {
  readonly start?: Position
  readonly end?: Position
} & GradientConfig<Rest>

type RadialGradientConfig<Rest = never> = {
  readonly center?: Position
  readonly radius?: Distance
} & GradientConfig<Rest>

type EllipticalGradientConfig<Rest = never> = {
  readonly center?: Position
  readonly radiusX?: Distance
  readonly radiusY?: Distance
} & GradientConfig<Rest>

type RectangularGradientConfig<Rest = never> = {
  readonly center?: Position
  readonly halfWidth?: Distance
  readonly halfHeight?: Distance
} & GradientConfig<Rest>

type SweepGradientConfig<Rest = never> = {
  readonly center?: Position
} & GradientConfig<Rest>

type ColorConfig<Rest = never> = {
  readonly color: string
} & Partial<CommonConfig<Rest>>

type TextImageConfig<Rest = never> = {
  readonly text: string
  readonly fontName?: string
  readonly fontSize?: number
  readonly color?: string
} & Partial<CommonConfig<Rest>>

type ShapeConfig<Rest = never> = {
  readonly color?: string
} & Partial<CommonConfig<Rest>>

type CircleShapeConfig<Rest = never> = {
  readonly radius?: Distance
} & ShapeConfig<Rest>

type OvalShapeConfig<Rest = never> = {
  readonly radiusX?: Distance
  readonly radiusY?: Distance
} & ShapeConfig<Rest>

type PathShapeConfig<Rest = never> = {
  readonly path: Path
} & ShapeConfig<Rest>

type RegularPolygonShapeConfig<Rest = never> = {
  readonly borderRadiuses?: readonly Distance[]
  readonly circumradius?: Distance
} & ShapeConfig<Rest>

type ConfigWithIntermediates<Rest = never> = {
  /** Should be used only when defining custom filters */
  readonly disableIntermediateCaches?: boolean
} & CommonConfig<Rest>

type IosCommonConfig<Rest = never> = {
  readonly inputImage: Filterable<Rest>
  readonly clampToExtent?: boolean
} & CacheableConfig

type IosRadiusConfig<Rest = never> = {
  readonly inputRadius?: Distance
} & IosCommonConfig<Rest>

type IosCompositionBaseConfig<ResizeTo, Rest = never> = {
  readonly resizeCanvasTo?: ResizeTo
  readonly inputImageTransform?: Transform
} & IosCommonConfig<Rest>

type IosCIMaskedVariableBlurConfig<Rest = never> = {
  readonly inputMask: Filterable<Rest>
  readonly inputMaskTransform?: Transform
  readonly inputRadius?: Distance
} & IosCompositionBaseConfig<'inputImage' | 'inputMask', Rest>

type IosCIMotionBlurConfig<Rest = never> = {
  readonly inputAngle?: Angle
} & IosRadiusConfig<Rest>

type IosCINoiseReductionConfig<Rest = never> = {
  readonly inputNoiseLevel?: number
  readonly inputSharpness?: number
} & IosCommonConfig<Rest>

type IosAmountConfig<Amount, Rest = never> = {
  readonly inputAmount?: Amount
} & IosCommonConfig<Rest>

type IosDistanceAmountConfig<Rest = never> = {} & IosAmountConfig<Distance, Rest>

type IosCIZoomBlurConfig<Rest = never> = {
  readonly inputCenter?: Position
} & IosDistanceAmountConfig<Rest>

type IosCIColorClampConfig<Rest = never> = {
  readonly inputMinComponents?: [number, number, number, number]
  readonly inputMaxComponents?: [number, number, number, number]
} & IosCommonConfig<Rest>

type IosCIColorControlsConfig<Rest = never> = {
  readonly inputSaturation?: number
  readonly inputBrightness?: number
  readonly inputContrast?: number
} & IosCommonConfig<Rest>

type IosCIColorMatrixConfig<Rest = never> = {
  readonly inputRVector?: [number, number, number, number]
  readonly inputGVector?: [number, number, number, number]
  readonly inputBVector?: [number, number, number, number]
  readonly inputAVector?: [number, number, number, number]
  readonly inputBiasVector?: [number, number, number, number]
} & IosCommonConfig<Rest>

type IosCIColorPolynomialBaseConfig<Rest = never> = {
  readonly inputRedCoefficients?: [number, number, number, number]
  readonly inputGreenCoefficients?: [number, number, number, number]
  readonly inputBlueCoefficients?: [number, number, number, number]
} & IosCommonConfig<Rest>

type IosCIColorPolynomialConfig<Rest = never> = {
  readonly inputAlphaCoefficients?: [number, number, number, number]
} & IosCIColorPolynomialBaseConfig<Rest>

type IosCIExposureAdjustConfig<Rest = never> = {
  readonly inputEV?: number
} & IosCommonConfig<Rest>

type IosCIGammaAdjustConfig<Rest = never> = {
  readonly inputPower?: number
} & IosCommonConfig<Rest>

type IosAngleConfig<Rest = never> = {
  readonly inputAngle?: Angle
} & IosCommonConfig<Rest>

type IosCITemperatureAndTintConfig<Rest = never> = {
  readonly inputNeutral?: Offset
  readonly inputTargetNeutral?: Offset
} & IosCommonConfig<Rest>

type IosCIToneCurveConfig<Rest = never> = {
  readonly inputPoint0?: Offset
  readonly inputPoint1?: Offset
  readonly inputPoint2?: Offset
  readonly inputPoint3?: Offset
  readonly inputPoint4?: Offset
} & IosCommonConfig<Rest>

type IosColorConfig<Rest = never> = {
  readonly inputColor?: string
} & IosCommonConfig<Rest>

type IosCIColorCubeConfig<Rest = never> = {
  readonly inputCubeDimension?: number
  readonly inputCubeData?: string
} & IosCommonConfig<Rest>

type IosScalarAmountConfig<Rest = never> = {} & IosAmountConfig<number, Rest>

type IosCIColorMapConfig<Rest = never> = {
  readonly inputGradientImage: Filterable<Rest>
  readonly inputGradientImageTransform?: Transform
} & IosCompositionBaseConfig<'inputImage' | 'inputGradientImage', Rest>

type IosCIColorMonochromeConfig<Rest = never> = {
  readonly inputIntensity?: number
} & IosColorConfig<Rest>

type IosCIColorPosterizeConfig<Rest = never> = {
  readonly inputLevels?: number
} & IosCommonConfig<Rest>

type IosCIFalseColorConfig<Rest = never> = {
  readonly inputColor0?: string
  readonly inputColor1?: string
} & IosCommonConfig<Rest>

type IosCISepiaToneConfig<Rest = never> = {
  readonly inputIntensity?: number
} & IosCommonConfig<Rest>

type IosCIVignetteConfig<Rest = never> = {
  readonly inputIntensity?: number
} & IosRadiusConfig<Rest>

type IosCIVignetteEffectConfig<Rest = never> = {
  readonly inputCenter?: Position
  readonly inputFalloff?: number
} & IosCIVignetteConfig<Rest>

type IosCIBackgroundImageCompositionConfig<Rest = never> = {
  readonly inputBackgroundImage: Filterable<Rest>
  readonly inputBackgroundImageTransform?: Transform
} & IosCompositionBaseConfig<'inputImage' | 'inputBackgroundImage', Rest>

type IosCenterRadiusConfig<Rest = never> = {
  readonly inputCenter?: Position
} & IosRadiusConfig<Rest>

type IosScaleCenterRadiusConfig<Rest = never> = {
  readonly inputScale?: number
} & IosCenterRadiusConfig<Rest>

type IosCIBumpDistortionLinearConfig<Rest = never> = {
  readonly inputAngle?: Angle
} & IosScaleCenterRadiusConfig<Rest>

type IosAngleCenterRadiusConfig<Rest = never> = {
  readonly inputAngle?: Angle
} & IosCenterRadiusConfig<Rest>

type IosCIDrosteConfig<Rest = never> = {
  readonly inputInsetPoint0?: Position
  readonly inputInsetPoint1?: Position
  readonly inputStrands?: Distance
  readonly inputPeriodicity?: Distance
  readonly inputRotation?: Distance
  readonly inputZoom?: number
} & IosCommonConfig<Rest>

type IosCIDisplacementDistortionConfig<Rest = never> = {
  readonly inputDisplacementImage: Filterable<Rest>
  readonly inputDisplacementImageTransform?: Transform
  readonly inputScale?: Distance
} & IosCompositionBaseConfig<'inputImage' | 'inputDisplacementImage', Rest>

type IosCIGlassDistortionConfig<Rest = never> = {
  readonly inputTexture: Filterable<Rest>
  readonly inputTextureTransform?: Transform
  readonly inputScale?: Distance
  readonly inputCenter?: Position
} & IosCompositionBaseConfig<'inputImage' | 'inputTexture', Rest>

type IosCIGlassLozengeConfig<Rest = never> = {
  readonly inputPoint0?: Position
  readonly inputPoint1?: Position
  readonly inputRadius?: Distance
  readonly inputRefraction?: number
} & IosCommonConfig<Rest>

type IosCILightTunnelConfig<Rest = never> = {
  readonly inputRotation?: Angle
} & IosCenterRadiusConfig<Rest>

type IosCIStretchCropConfig<Rest = never> = {
  readonly inputSize?: [Distance, Distance]
  readonly inputCropAmount?: number
  readonly inputCenterStretchAmount?: number
} & IosCommonConfig<Rest>

type IosCITorusLensDistortionConfig<Rest = never> = {
  readonly inputWidth?: Distance
  readonly inputRefraction?: number
} & IosCenterRadiusConfig<Rest>

type IosCIAztecCodeGeneratorConfig<Rest = never> = {
  readonly inputMessage: string
  readonly inputCorrectionLevel?: number
  readonly inputLayers?: number
  readonly inputCompactStyle?: boolean
} & IosCommonConfig<Rest>

type IosCICheckerboardGeneratorConfig<Rest = never> = {
  readonly inputCenter?: Position
  readonly inputColor0?: string
  readonly inputColor1?: string
  readonly inputWidth?: Distance
  readonly inputShaprness?: number
} & IosCommonConfig<Rest>

type IosCILenticularHaloGeneratorConfig<Rest = never> = {
  readonly inputCenter?: Position
  readonly inputHaloRadius?: Distance
  readonly inputHaloWidth?: Distance
  readonly inputHaloOverlap?: number
  readonly inputStriationStrength?: number
  readonly inputStriationContrast?: number
  readonly inputTime?: number
} & IosColorConfig<Rest>

type IosCIQRCodeGeneratorConfig<Rest = never> = {
  readonly inputMessage: string
  readonly inputCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
} & IosCommonConfig<Rest>

type IosCIStarShineGeneratorConfig<Rest = never> = {
  readonly inputColor?: string
  readonly inputCrossScale?: number
  readonly inputCrossAngle?: Angle
  readonly inputCrossOpacity?: number
  readonly inputCrossWidth?: Distance
  readonly inputEpsilon?: number
} & IosCenterRadiusConfig<Rest>

type IosCIStripesGeneratorConfig<Rest = never> = {
  readonly inputCenter?: Position
  readonly inputColor0?: string
  readonly inputColor1?: string
  readonly inputWidth?: Distance
  readonly inputSharpness?: number
} & IosCommonConfig<Rest>

type IosCISunbeamsGeneratorConfig<Rest = never> = {
  readonly inputCenter?: Position
  readonly inputSunRadius?: Distance
  readonly inputMaxStriationRadius?: number
  readonly inputStriationStrength?: number
  readonly inputStriationContrast?: number
  readonly inputTime?: number
} & IosColorConfig<Rest>

type IosCICropConfig<Rest = never> = {
  readonly inputRectangle?: Area
} & IosCommonConfig<Rest>

type IosCILanczosScaleTransformConfig<Rest = never> = {
  readonly inputScale?: number
  readonly inputAspectRatio?: number
} & IosCommonConfig<Rest>

type IosPerspectiveConfig<Rest = never> = {
  readonly inputTopLeft?: Position
  readonly inputTopRight?: Position
  readonly inputBottomLeft?: Position
  readonly inputBottomRight?: Position
} & IosCommonConfig<Rest>

type IosCIPerspectiveCorrectionConfig<Rest = never> = {
  readonly inputCrop?: boolean
} & IosPerspectiveConfig<Rest>

type IosCIPerspectiveTransformWithExtentConfig<Rest = never> = {
  readonly inputExtent?: Area
} & IosPerspectiveConfig<Rest>

type IosCIStraightenFilterConfig<Rest = never> = {
  readonly inputAngle?: Angle
} & IosCommonConfig<Rest>

type IosGradientConfig<Rest = never> = {
  readonly inputColor0?: string
  readonly inputColor1?: string
} & IosCommonConfig<Rest>

type IosCIGaussianGradientConfig<Rest = never> = {
  readonly inputCenter?: Position
  readonly inputRadius?: Distance
} & IosGradientConfig<Rest>

type IosCILinearGradientConfig<Rest = never> = {
  readonly inputPoint0?: Position
  readonly inputPoint1?: Position
} & IosGradientConfig<Rest>

type IosCIRadialGradientConfig<Rest = never> = {
  readonly inputCenter?: Position
  readonly inputRadius0?: Position
  readonly inputRadius1?: Position
} & IosGradientConfig<Rest>

type IosHalftoneEffectConfig<Rest = never> = {
  readonly inputCenter?: Position
  readonly inputWidth?: Distance
  readonly inputSharpness?: number
} & IosCommonConfig<Rest>

type IosAngleHalftoneEffectConfig<Rest = never> = {
  readonly inputAngle?: Angle
} & IosHalftoneEffectConfig<Rest>

type IosCICMYKHalftoneConfig<Rest = never> = {
  readonly inputGCR?: number
  readonly inputUCR?: number
} & IosAngleHalftoneEffectConfig<Rest>

type IosAreaConfig<Rest = never> = {
  readonly inputExtent?: Area
} & IosCommonConfig<Rest>

type IosCIAreaHistogramConfig<Rest = never> = {
  readonly inputScale?: number
  readonly inputCount?: number
} & IosAreaConfig<Rest>

type IosCIHistogramDisplayFilterConfig<Rest = never> = {
  readonly inputHeight?: number
  readonly inputHighLimit?: number
  readonly inputLowLimit?: number
} & IosCommonConfig<Rest>

type IosCISharpenLuminanceConfig<Rest = never> = {
  readonly inputSharpness?: number
} & IosCommonConfig<Rest>

type IosCIUnsharpMaskConfig<Rest = never> = {
  readonly inputIntensity?: number
} & IosRadiusConfig<Rest>

type IosCIBloomConfig<Rest = never> = {
  readonly inputIntensity?: number
} & IosRadiusConfig<Rest>

type IosConvolutionConfig<
  Weights = [number, number, number, number, number, number, number, number, number],
  Rest = never
> = {
  readonly inputWeights?: Weights
  readonly inputBias?: number
} & IosCommonConfig<Rest>

type IosCIConvolution5X5Config<Rest = never> = {} & IosConvolutionConfig<
  [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ],
  Rest
>

type IosCIConvolution7X7Config<Rest = never> = {} & IosConvolutionConfig<
  [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ],
  Rest
>

type IosCIEdgesConfig<Rest = never> = {
  readonly inputIntensity?: number
} & IosCommonConfig<Rest>

type IosCIGloomConfig<Rest = never> = {
  readonly inputIntensity?: number
} & IosRadiusConfig<Rest>

type IosCIHexagonalPixellateConfig<Rest = never> = {
  readonly inputCenter?: Position
  readonly inputScale?: Distance
} & IosCommonConfig<Rest>

type IosCIHighlightShadowAdjustConfig<Rest = never> = {
  readonly inputHighlightAmount?: number
  readonly inputShadowAmount?: number
} & IosCommonConfig<Rest>

type IosCILineOverlayConfig<Rest = never> = {
  readonly inputNRNoiseLevel?: number
  readonly inputNRSharpness?: number
  readonly inputEdgeIntensity?: number
  readonly inputThreshold?: number
  readonly inputContrast?: number
} & IosCommonConfig<Rest>

type IosCIPixellateConfig<Rest = never> = {
  readonly inputCenter?: Position
  readonly inputScale?: Distance
} & IosCommonConfig<Rest>

type IosCIShadedMaterialConfig<Rest = never> = {
  readonly inputShadingImage: Filterable<Rest>
  readonly inputShadingImageTransform?: Transform
  readonly inputScale?: number
} & IosCompositionBaseConfig<'inputImage' | 'inputShadingImage', Rest>

type IosCISpotColorConfig<Rest = never> = {
  readonly inputCenterColor1?: string
  readonly inputReplacementColor1?: string
  readonly inputCloseness1?: number
  readonly inputContrast1?: number
  readonly inputCenterColor2?: string
  readonly inputReplacementColor2?: string
  readonly inputCloseness2?: number
  readonly inputContrast2?: number
  readonly inputCenterColor3?: string
  readonly inputReplacementColor3?: string
  readonly inputCloseness3?: number
  readonly inputContrast3?: number
} & IosCommonConfig<Rest>

type IosCISpotLightConfig<Rest = never> = {
  readonly inputLightPosition?: [Distance, Distance, Distance]
  readonly inputLightPointsAt?: [Distance, Distance, Distance]
  readonly inputBrightness?: number
  readonly inputConcentration?: number
} & IosColorConfig<Rest>

type IosTileConfig<Rest = never> = {
  readonly inputAngle?: Angle
  readonly inputCenter?: Position
  readonly inputWidth?: Distance
} & IosCommonConfig<Rest>

type IosCIFourfoldTranslatedTileConfig<Rest = never> = {
  readonly inputAcuteAngle?: Angle
} & IosTileConfig<Rest>

type IosCIKaleidoscopeConfig<Rest = never> = {
  readonly inputAngle?: Angle
  readonly inputCenter?: Position
  readonly inputCount?: number
} & IosCommonConfig<Rest>

type IosCIOpTileConfig<Rest = never> = {
  readonly inputScale?: number
} & IosTileConfig<Rest>

type IosCITriangleKaleidoscopeConfig<Rest = never> = {
  readonly inputPoint?: Position
  readonly inputSize?: Distance
  readonly inputRotation?: Angle
  readonly inputDecay?: number
} & IosCommonConfig<Rest>

type IosCIBokehBlurConfig<Rest = never> = {
  readonly inputRingAmount?: number
  readonly inputRingSize?: number
  readonly inputSoftness?: number
} & IosRadiusConfig<Rest>

type IosCIMixConfig<Rest = never> = {
  readonly inputAmount?: number
} & IosCIBackgroundImageCompositionConfig<Rest>

type IosCITextImageGeneratorConfig<Rest = never> = {
  readonly inputText: string
  readonly inputFontName?: string
  readonly inputFontSize?: Distance
  readonly inputScaleFactor?: number
} & IosCommonConfig<Rest>

type IosCIHueSaturationValueGradientConfig<Rest = never> = {
  readonly inputValue?: number
  readonly inputSoftness?: number
  readonly inputDither?: number
} & IosRadiusConfig<Rest>

type IosCINinePartStretchedConfig<Rest = never> = {
  readonly inputBreakpoint0?: Position
  readonly inputBreakpoint1?: Position
  readonly inputGrowAmount?: Position
} & IosCommonConfig<Rest>

type IosCIMirrorConfig<Rest = never> = {
  readonly inputPoint?: Position
  readonly inputAngle?: Angle
} & IosCommonConfig<Rest>

type IosCICheapBlurConfig<Rest = never> = {
  readonly inputPasses?: number
  readonly inputSampling?: number
} & IosCommonConfig<Rest>

type IosCIDitherConfig<Rest = never> = {
  readonly inputIntensity?: number
} & IosCommonConfig<Rest>

type IosCISkyAndGrassAdjustConfig<Rest = never> = {
  readonly inputSkyAmount?: number
  readonly inputGrassAmount?: number
} & IosCommonConfig<Rest>

type IosCIRingBlurConfig<Rest = never> = {
  readonly inputPointCount?: number
} & IosRadiusConfig<Rest>

type IosCIPhotoGrainConfig<Rest = never> = {
  readonly inputISO?: number
  readonly inputSeed?: number
} & IosScalarAmountConfig<Rest>

type IosCILocalContrastConfig<Rest = never> = {
  readonly inputStrength?: number
  readonly inputScale?: number
} & IosCommonConfig<Rest>

type IosCIGaussianBlurXYConfig<Rest = never> = {
  readonly inputSigmaX?: Distance
  readonly inputSigmaY?: Distance
} & IosCommonConfig<Rest>

type IosCIPaperWashConfig<Rest = never> = {
  readonly inputSaturation?: number
  readonly inputGreyscale?: number
} & IosCommonConfig<Rest>

type AndroidIterativeBoxBlurConfig<Rest = never> = {
  readonly blurRadius?: number
  readonly iterations?: number
} & CommonConfig<Rest>

type AndroidLightingColorFilterConfig<Rest = never> = {
  readonly mul?: string
  readonly add?: string
} & CommonConfig<Rest>

type AndroidLinearGradientConfig<Rest = never> = {
  readonly x0?: Distance
  readonly y0?: Distance
  readonly x1?: Distance
  readonly y1?: Distance
  readonly colors?: readonly string[]
  readonly locations?: readonly number[]
  readonly tile?: TileMode
} & Partial<CommonConfig<Rest>>

type AndroidRadialGradientConfig<Rest = never> = {
  readonly centerX?: Distance
  readonly centerY?: Distance
  readonly radius?: Distance
  readonly colors?: readonly string[]
  readonly stops?: readonly number[]
  readonly tileMode?: TileMode
} & Partial<CommonConfig<Rest>>

type AndroidSweepGradientConfig<Rest = never> = {
  readonly cx?: Distance
  readonly cy?: Distance
  readonly colors?: readonly string[]
  readonly positions?: readonly number[]
} & Partial<CommonConfig<Rest>>

type AndroidPorterDuffColorFilterConfig<Rest = never> = {
  readonly color?: string
  readonly mode?: PorterDuffMode
} & CommonConfig<Rest>

type AndroidPorterDuffXfermodeConfig<Rest = never> = {
  readonly mode?: PorterDuffMode
} & CompositionConfig<Rest>

type AndroidScriptIntrinsicBlurConfig<Rest = never> = {
  readonly radius?: number
} & CommonConfig<Rest>

type AndroidScriptIntrinsicConvolve3x3Config<Rest = never> = {
  readonly coefficients?: [number, number, number, number, number, number, number, number, number]
} & CommonConfig<Rest>

type AndroidScriptIntrinsicConvolve5x5Config<Rest = never> = {
  readonly coefficients?: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ]
} & CommonConfig<Rest>

type AndroidTextImageConfig<Rest = never> = {
  readonly text: string
  readonly fontName?: string
  readonly fontSize?: Distance
  readonly color?: string
} & CommonConfig<Rest>

export type ConfigCase<Name, Config> = { readonly name: Name } & Config

export type Config<Rest = never> =
  | ConfigCase<'ColorMatrix', ColorMatrixConfig<Rest>>
  | ConfigCase<'Normal', CommonConfig<Rest>>
  | ConfigCase<'RGBA', RGBAConfig<Rest>>
  | ConfigCase<'Saturate', AmountConfig<Rest>>
  | ConfigCase<'HueRotate', AmountConfig<Rest>>
  | ConfigCase<'LuminanceToAlpha', CommonConfig<Rest>>
  | ConfigCase<'Invert', CommonConfig<Rest>>
  | ConfigCase<'Grayscale', AmountConfig<Rest>>
  | ConfigCase<'Sepia', AmountConfig<Rest>>
  | ConfigCase<'Nightvision', CommonConfig<Rest>>
  | ConfigCase<'Warm', CommonConfig<Rest>>
  | ConfigCase<'Cool', CommonConfig<Rest>>
  | ConfigCase<'Brightness', AmountConfig<Rest>>
  | ConfigCase<'Contrast', AmountConfig<Rest>>
  | ConfigCase<'Temperature', AmountConfig<Rest>>
  | ConfigCase<'Tint', AmountConfig<Rest>>
  | ConfigCase<'Threshold', AmountConfig<Rest>>
  | ConfigCase<'Technicolor', CommonConfig<Rest>>
  | ConfigCase<'Polaroid', CommonConfig<Rest>>
  | ConfigCase<'ToBGR', CommonConfig<Rest>>
  | ConfigCase<'Kodachrome', CommonConfig<Rest>>
  | ConfigCase<'Browni', CommonConfig<Rest>>
  | ConfigCase<'Vintage', CommonConfig<Rest>>
  | ConfigCase<'Night', AmountConfig<Rest>>
  | ConfigCase<'Predator', AmountConfig<Rest>>
  | ConfigCase<'Lsd', CommonConfig<Rest>>
  | ConfigCase<'ColorTone', ColorToneConfig<Rest>>
  | ConfigCase<'DuoTone', DuoToneConfig<Rest>>
  | ConfigCase<'Protanomaly', CommonConfig<Rest>>
  | ConfigCase<'Deuteranomaly', CommonConfig<Rest>>
  | ConfigCase<'Tritanomaly', CommonConfig<Rest>>
  | ConfigCase<'Protanopia', CommonConfig<Rest>>
  | ConfigCase<'Deuteranopia', CommonConfig<Rest>>
  | ConfigCase<'Tritanopia', CommonConfig<Rest>>
  | ConfigCase<'Achromatopsia', CommonConfig<Rest>>
  | ConfigCase<'Achromatomaly', CommonConfig<Rest>>
  | ConfigCase<'ConvolveMatrix3x3', ConvolveMatrix3x3Config<Rest>>
  | ConfigCase<'ConvolveMatrix5x5', ConvolveMatrix5x5Config<Rest>>
  | ConfigCase<'Sharpen', AmountConfig<Rest>>
  | ConfigCase<'EdgeDetection', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Emboss', CommonConfig<Rest>>
  | ConfigCase<'FuzzyGlass', CommonConfig<Rest>>
  | ConfigCase<'BoxBlur', BlurConfig<Rest>>
  | ConfigCase<'GaussianBlur', BlurConfig<Rest>>
  | ConfigCase<'PlusBlend', CompositionConfig<Rest>>
  | ConfigCase<'DarkenBlend', CompositionConfig<Rest>>
  | ConfigCase<'LightenBlend', CompositionConfig<Rest>>
  | ConfigCase<'ModulateBlend', CompositionConfig<Rest>>
  | ConfigCase<'OverlayBlend', CompositionConfig<Rest>>
  | ConfigCase<'ScreenBlend', CompositionConfig<Rest>>
  | ConfigCase<'ColorDodgeBlend', CompositionConfig<Rest>>
  | ConfigCase<'ExclusionBlend', CompositionConfig<Rest>>
  | ConfigCase<'ColorBurnBlend', CompositionConfig<Rest>>
  | ConfigCase<'SoftLightBlend', CompositionConfig<Rest>>
  | ConfigCase<'HueBlend', CompositionConfig<Rest>>
  | ConfigCase<'ColorBlend', CompositionConfig<Rest>>
  | ConfigCase<'SaturationBlend', CompositionConfig<Rest>>
  | ConfigCase<'LuminosityBlend', CompositionConfig<Rest>>
  | ConfigCase<'DifferenceBlend', CompositionConfig<Rest>>
  | ConfigCase<'HardLightBlend', CompositionConfig<Rest>>
  | ConfigCase<'MultiplyBlend', CompositionConfig<Rest>>
  | ConfigCase<'PlusBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'DarkenBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'LightenBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'ModulateBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'OverlayBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'ScreenBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'ColorDodgeBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'ExclusionBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'ColorBurnBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'SoftLightBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'HueBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'ColorBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'SaturationBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'LuminosityBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'DifferenceBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'HardLightBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'MultiplyBlendColor', BlendColorConfig<Rest>>
  | ConfigCase<'DstATopComposition', CompositionConfig<Rest>>
  | ConfigCase<'DstInComposition', CompositionConfig<Rest>>
  | ConfigCase<'DstOutComposition', CompositionConfig<Rest>>
  | ConfigCase<'DstOverComposition', CompositionConfig<Rest>>
  | ConfigCase<'SrcATopComposition', CompositionConfig<Rest>>
  | ConfigCase<'SrcInComposition', CompositionConfig<Rest>>
  | ConfigCase<'SrcOutComposition', CompositionConfig<Rest>>
  | ConfigCase<'SrcOverComposition', CompositionConfig<Rest>>
  | ConfigCase<'XorComposition', CompositionConfig<Rest>>
  | ConfigCase<'_1977', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Aden', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Brannan', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Brooklyn', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Clarendon', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Earlybird', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Gingham', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Hudson', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Inkwell', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Kelvin', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Lark', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Lofi', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Maven', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Mayfair', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Moon', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Nashville', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Perpetua', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Reyes', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Rise', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Slumber', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Stinson', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Toaster', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Valencia', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Walden', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Willow', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Xpro2', ConfigWithIntermediates<Rest>>
  | ConfigCase<'_1977Compat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'AdenCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'BrannanCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'BrooklynCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'ClarendonCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'EarlybirdCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'GinghamCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'HudsonCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'InkwellCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'KelvinCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'LarkCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'LofiCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'MavenCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'MayfairCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'MoonCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'NashvilleCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'PerpetuaCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'ReyesCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'RiseCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'SlumberCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'StinsonCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'ToasterCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'ValenciaCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'WaldenCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'WillowCompat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Xpro2Compat', ConfigWithIntermediates<Rest>>
  | ConfigCase<'Color', ColorConfig<Rest>>
  | ConfigCase<'LinearGradient', LinearGradientConfig<Rest>>
  | ConfigCase<'RadialGradient', RadialGradientConfig<Rest>>
  | ConfigCase<'EllipticalGradient', EllipticalGradientConfig<Rest>>
  | ConfigCase<'RectangularGradient', RectangularGradientConfig<Rest>>
  | ConfigCase<'SweepGradient', SweepGradientConfig<Rest>>
  | ConfigCase<'TextImage', TextImageConfig<Rest>>
  | ConfigCase<'CircleShape', CircleShapeConfig<Rest>>
  | ConfigCase<'OvalShape', OvalShapeConfig<Rest>>
  | ConfigCase<'PathShape', PathShapeConfig<Rest>>
  | ConfigCase<'RegularPolygonShape', RegularPolygonShapeConfig<Rest>>
  | ConfigCase<'QuadGradient', QuadGradientConfig<Rest>>
  | ConfigCase<'IosCIBoxBlur', IosRadiusConfig<Rest>>
  | ConfigCase<'IosCIDiscBlur', IosRadiusConfig<Rest>>
  | ConfigCase<'IosCIGaussianBlur', IosRadiusConfig<Rest>>
  | ConfigCase<'IosCIMaskedVariableBlur', IosCIMaskedVariableBlurConfig<Rest>>
  | ConfigCase<'IosCIMedianFilter', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIMotionBlur', IosCIMotionBlurConfig<Rest>>
  | ConfigCase<'IosCINoiseReduction', IosCINoiseReductionConfig<Rest>>
  | ConfigCase<'IosCIZoomBlur', IosCIZoomBlurConfig<Rest>>
  | ConfigCase<'IosCIColorClamp', IosCIColorClampConfig<Rest>>
  | ConfigCase<'IosCIColorControls', IosCIColorControlsConfig<Rest>>
  | ConfigCase<'IosCIColorMatrix', IosCIColorMatrixConfig<Rest>>
  | ConfigCase<'IosCIColorPolynomial', IosCIColorPolynomialConfig<Rest>>
  | ConfigCase<'IosCIExposureAdjust', IosCIExposureAdjustConfig<Rest>>
  | ConfigCase<'IosCIGammaAdjust', IosCIGammaAdjustConfig<Rest>>
  | ConfigCase<'IosCIHueAdjust', IosAngleConfig<Rest>>
  | ConfigCase<'IosCISRGBToneCurveToLinear', IosCommonConfig<Rest>>
  | ConfigCase<'IosCILinearToSRGBToneCurve', IosCommonConfig<Rest>>
  | ConfigCase<'IosCITemperatureAndTint', IosCITemperatureAndTintConfig<Rest>>
  | ConfigCase<'IosCIToneCurve', IosCIToneCurveConfig<Rest>>
  | ConfigCase<'IosCIVibrance', IosScalarAmountConfig<Rest>>
  | ConfigCase<'IosCIWhitePointAdjust', IosColorConfig<Rest>>
  | ConfigCase<'IosCIColorCrossPolynomial', IosCIColorPolynomialBaseConfig<Rest>>
  | ConfigCase<'IosCIColorCube', IosCIColorCubeConfig<Rest>>
  | ConfigCase<'IosCIColorInvert', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIColorMap', IosCIColorMapConfig<Rest>>
  | ConfigCase<'IosCIColorMonochrome', IosCIColorMonochromeConfig<Rest>>
  | ConfigCase<'IosCIColorPosterize', IosCIColorPosterizeConfig<Rest>>
  | ConfigCase<'IosCIFalseColor', IosCIFalseColorConfig<Rest>>
  | ConfigCase<'IosCIMaskToAlpha', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIMaximumComponent', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIMinimumComponent', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIPhotoEffectChrome', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIPhotoEffectFade', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIPhotoEffectInstant', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIPhotoEffectMono', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIPhotoEffectNoir', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIPhotoEffectProcess', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIPhotoEffectTonal', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIPhotoEffectTransfer', IosCommonConfig<Rest>>
  | ConfigCase<'IosCISepiaTone', IosCISepiaToneConfig<Rest>>
  | ConfigCase<'IosCIVignete', IosCIVignetteConfig<Rest>>
  | ConfigCase<'IosCIVigneteEffect', IosCIVignetteEffectConfig<Rest>>
  | ConfigCase<'IosCIAdditionCompositing', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIColorBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIColorBurnBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIColorDodgeBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIDarkenBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIDifferenceBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIDivideBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIExclusionBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIHardLightBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIHueBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCILightenBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCILinearBurnBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCILinearDodgeBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCILuminosityBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIMaximumCompositing', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIMinimumCompositing', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIMultiplyBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIMultiplyCompositing', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIOverlayBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIPinLightBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCISaturationBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIScreenBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCISoftLightBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCISourceAtopCompositing', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCISourceInCompositing', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCISourceOutCompositing', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCISourceOverCompositing', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCISubtractBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCIBumpDistortion', IosScaleCenterRadiusConfig<Rest>>
  | ConfigCase<'IosCIBumpDistortionLinear', IosCIBumpDistortionLinearConfig<Rest>>
  | ConfigCase<'IosCICircleSplashDistortion', IosCenterRadiusConfig<Rest>>
  | ConfigCase<'IosCICircularWrap', IosAngleCenterRadiusConfig<Rest>>
  | ConfigCase<'IosCIDroste', IosCIDrosteConfig<Rest>>
  | ConfigCase<'IosCIDisplacementDistortion', IosCIDisplacementDistortionConfig<Rest>>
  | ConfigCase<'IosCIGlassDistortion', IosCIGlassDistortionConfig<Rest>>
  | ConfigCase<'IosCIGlassLozenge', IosCIGlassLozengeConfig<Rest>>
  | ConfigCase<'IosCIHoleDistortion', IosCenterRadiusConfig<Rest>>
  | ConfigCase<'IosCILightTunnel', IosCILightTunnelConfig<Rest>>
  | ConfigCase<'IosCIPinchDistortion', IosScaleCenterRadiusConfig<Rest>>
  | ConfigCase<'IosCIStretchCrop', IosCIStretchCropConfig<Rest>>
  | ConfigCase<'IosCITorusLensDistortion', IosCITorusLensDistortionConfig<Rest>>
  | ConfigCase<'IosCITwirlDistortion', IosAngleCenterRadiusConfig<Rest>>
  | ConfigCase<'IosCIVortexDistortion', IosAngleCenterRadiusConfig<Rest>>
  | ConfigCase<'IosCIAztecCodeGenerator', IosCIAztecCodeGeneratorConfig<Rest>>
  | ConfigCase<'IosCICheckerboardGenerator', IosCICheckerboardGeneratorConfig<Rest>>
  | ConfigCase<'IosCIConstantColorGenerator', IosColorConfig<Rest>>
  | ConfigCase<'IosCILenticularHaloGenerator', IosCILenticularHaloGeneratorConfig<Rest>>
  | ConfigCase<'IosCIQRCodeGenerator', IosCIQRCodeGeneratorConfig<Rest>>
  | ConfigCase<'IosCIRandomGenerator', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIStarShineGenerator', IosCIStarShineGeneratorConfig<Rest>>
  | ConfigCase<'IosCIStripesGenerator', IosCIStripesGeneratorConfig<Rest>>
  | ConfigCase<'IosCISunbeamsGenerator', IosCISunbeamsGeneratorConfig<Rest>>
  | ConfigCase<'IosCICrop', IosCICropConfig<Rest>>
  | ConfigCase<'IosCILanczosScaleTransform', IosCILanczosScaleTransformConfig<Rest>>
  | ConfigCase<'IosCIPerspectiveCorrection', IosCIPerspectiveCorrectionConfig<Rest>>
  | ConfigCase<'IosCIPerspectiveTransform', IosPerspectiveConfig<Rest>>
  | ConfigCase<
      'IosCIPerspectiveTransformWithExtent',
      IosCIPerspectiveTransformWithExtentConfig<Rest>
    >
  | ConfigCase<'IosCIStraightenFilter', IosCIStraightenFilterConfig<Rest>>
  | ConfigCase<'IosCIGaussianGradient', IosCIGaussianGradientConfig<Rest>>
  | ConfigCase<'IosCILinearGradient', IosCILinearGradientConfig<Rest>>
  | ConfigCase<'IosCIRadialGradient', IosCIRadialGradientConfig<Rest>>
  | ConfigCase<'IosCISmoothLinearGradient', IosCILinearGradientConfig<Rest>>
  | ConfigCase<'IosCICircularScreen', IosHalftoneEffectConfig<Rest>>
  | ConfigCase<'IosCICMYKHalftone', IosCICMYKHalftoneConfig<Rest>>
  | ConfigCase<'IosCIDotScreen', IosAngleHalftoneEffectConfig<Rest>>
  | ConfigCase<'IosCIHatchedScreen', IosAngleHalftoneEffectConfig<Rest>>
  | ConfigCase<'IosCILineScreen', IosAngleHalftoneEffectConfig<Rest>>
  | ConfigCase<'IosCIAreaAverage', IosAreaConfig<Rest>>
  | ConfigCase<'IosCIAreaHistogram', IosCIAreaHistogramConfig<Rest>>
  | ConfigCase<'IosCIRowAverage', IosAreaConfig<Rest>>
  | ConfigCase<'IosCIColumnAverage', IosAreaConfig<Rest>>
  | ConfigCase<'IosCIHistogramDisplayFilter', IosCIHistogramDisplayFilterConfig<Rest>>
  | ConfigCase<'IosCIAreaMaximum', IosAreaConfig<Rest>>
  | ConfigCase<'IosCIAreaMinimum', IosAreaConfig<Rest>>
  | ConfigCase<'IosCIAreaMaximumAlpha', IosAreaConfig<Rest>>
  | ConfigCase<'IosCIAreaMinimumAlpha', IosAreaConfig<Rest>>
  | ConfigCase<'IosCISharpenLuminance', IosCISharpenLuminanceConfig<Rest>>
  | ConfigCase<'IosCIUnsharpMask', IosCIUnsharpMaskConfig<Rest>>
  | ConfigCase<'IosCIBloom', IosCIBloomConfig<Rest>>
  | ConfigCase<'IosCIComicEffect', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIConvolution3X3', IosConvolutionConfig<Rest>>
  | ConfigCase<'IosCIConvolution5X5', IosCIConvolution5X5Config<Rest>>
  | ConfigCase<'IosCIConvolution7X7', IosCIConvolution7X7Config<Rest>>
  | ConfigCase<'IosCIConvolution9Horizontal', IosConvolutionConfig<Rest>>
  | ConfigCase<'IosCIConvolution9Vertical', IosConvolutionConfig<Rest>>
  | ConfigCase<'IosCICrystallize', IosCenterRadiusConfig<Rest>>
  | ConfigCase<'IosCIEdges', IosCIEdgesConfig<Rest>>
  | ConfigCase<'IosCIEdgeWork', IosRadiusConfig<Rest>>
  | ConfigCase<'IosCIGloom', IosCIGloomConfig<Rest>>
  | ConfigCase<'IosCIHeightFieldFromMask', IosRadiusConfig<Rest>>
  | ConfigCase<'IosCIHexagonalPixellate', IosCIHexagonalPixellateConfig<Rest>>
  | ConfigCase<'IosCIHighlightShadowAdjust', IosCIHighlightShadowAdjustConfig<Rest>>
  | ConfigCase<'IosCILineOverlay', IosCILineOverlayConfig<Rest>>
  | ConfigCase<'IosCIPixellate', IosCIPixellateConfig<Rest>>
  | ConfigCase<'IosCIPointillize', IosCenterRadiusConfig<Rest>>
  | ConfigCase<'IosCIShadedMaterial', IosCIShadedMaterialConfig<Rest>>
  | ConfigCase<'IosCISpotColor', IosCISpotColorConfig<Rest>>
  | ConfigCase<'IosCISpotLight', IosCISpotLightConfig<Rest>>
  | ConfigCase<'IosCIEightfoldReflectedTile', IosTileConfig<Rest>>
  | ConfigCase<'IosCIFourfoldReflectedTile', IosTileConfig<Rest>>
  | ConfigCase<'IosCIFourfoldRotatedTile', IosTileConfig<Rest>>
  | ConfigCase<'IosCIFourfoldTranslatedTile', IosCIFourfoldTranslatedTileConfig<Rest>>
  | ConfigCase<'IosCIGlideReflectedTile', IosTileConfig<Rest>>
  | ConfigCase<'IosCIKaleidoscope', IosCIKaleidoscopeConfig<Rest>>
  | ConfigCase<'IosCIOpTile', IosCIOpTileConfig<Rest>>
  | ConfigCase<'IosCIParallelogramTile', IosCIFourfoldTranslatedTileConfig<Rest>>
  | ConfigCase<'IosCIPerspectiveTile', IosPerspectiveConfig<Rest>>
  | ConfigCase<'IosCISixfoldReflectedTile', IosTileConfig<Rest>>
  | ConfigCase<'IosCISixfoldRotatedTile', IosTileConfig<Rest>>
  | ConfigCase<'IosCITriangleKaleidoscope', IosCITriangleKaleidoscopeConfig<Rest>>
  | ConfigCase<'IosCITriangleTile', IosTileConfig<Rest>>
  | ConfigCase<'IosCITwelvefoldReflectedTile', IosTileConfig<Rest>>
  | ConfigCase<'IosCIXRay', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIThermal', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIMorphologyGradient', IosRadiusConfig<Rest>>
  | ConfigCase<'IosCIDisparityToDepth', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIBokehBlur', IosCIBokehBlurConfig<Rest>>
  | ConfigCase<'IosCISaliencyMapFilter', IosCommonConfig<Rest>>
  | ConfigCase<'IosCISampleNearest', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIMix', IosCIMixConfig<Rest>>
  | ConfigCase<'IosCIDepthToDisparity', IosCommonConfig<Rest>>
  | ConfigCase<'IosCITextImageGenerator', IosCITextImageGeneratorConfig<Rest>>
  | ConfigCase<'IosCIHueSaturationValueGradient', IosCIHueSaturationValueGradientConfig<Rest>>
  | ConfigCase<'IosCIMorphologyMaximum', IosRadiusConfig<Rest>>
  | ConfigCase<'IosCIMorphologyMinimum', IosRadiusConfig<Rest>>
  | ConfigCase<'IosCINinePartStretched', IosCINinePartStretchedConfig<Rest>>
  | ConfigCase<'IosCIWrapMirror', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIMirror', IosCIMirrorConfig<Rest>>
  | ConfigCase<'IosCIAreaMinMaxRed', IosAreaConfig<Rest>>
  | ConfigCase<'IosCIAreaMinMax', IosAreaConfig<Rest>>
  | ConfigCase<'IosCICheatBlur', IosDistanceAmountConfig<Rest>>
  | ConfigCase<'IosCICheapMorphology', IosRadiusConfig<Rest>>
  | ConfigCase<'IosCIMorphology', IosRadiusConfig<Rest>>
  | ConfigCase<'IosCICheapBlur', IosCICheapBlurConfig<Rest>>
  | ConfigCase<'IosCIDither', IosCIDitherConfig<Rest>>
  | ConfigCase<'IosCIVividLightBlendMode', IosCIBackgroundImageCompositionConfig<Rest>>
  | ConfigCase<'IosCISkyAndGrassAdjust', IosCISkyAndGrassAdjustConfig<Rest>>
  | ConfigCase<'IosCIRingBlur', IosCIRingBlurConfig<Rest>>
  | ConfigCase<'IosCIPremultiply', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIPhotoGrain', IosCIPhotoGrainConfig<Rest>>
  | ConfigCase<'IosCIUnpremultiply', IosCommonConfig<Rest>>
  | ConfigCase<'IosCILocalContrast', IosCILocalContrastConfig<Rest>>
  | ConfigCase<'IosCILinearBlur', IosRadiusConfig<Rest>>
  | ConfigCase<'IosCIGaussianBlurXY', IosCIGaussianBlurXYConfig<Rest>>
  | ConfigCase<'IosCIDocumentEnhancer', IosScalarAmountConfig<Rest>>
  | ConfigCase<'IosCIClamp', IosAreaConfig<Rest>>
  | ConfigCase<'IosCIASG50Percent', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIASG60Percent', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIASG66Percent', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIASG75Percent', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIASG80Percent', IosCommonConfig<Rest>>
  | ConfigCase<'IosCIPaperWash', IosCIPaperWashConfig<Rest>>
  | ConfigCase<'AndroidColorMatrixColorFilter', ColorMatrixConfig<Rest>>
  | ConfigCase<'AndroidIterativeBoxBlur', AndroidIterativeBoxBlurConfig<Rest>>
  | ConfigCase<'AndroidLightingColorFilter', AndroidLightingColorFilterConfig<Rest>>
  | ConfigCase<'AndroidRoundAsCircle', CommonConfig<Rest>>
  | ConfigCase<'AndroidColor', ColorConfig<Rest>>
  | ConfigCase<'AndroidLinearGradient', AndroidLinearGradientConfig<Rest>>
  | ConfigCase<'AndroidRadialGradient', AndroidRadialGradientConfig<Rest>>
  | ConfigCase<'AndroidSweepGradient', AndroidSweepGradientConfig<Rest>>
  | ConfigCase<'AndroidPorterDuffColorFilter', AndroidPorterDuffColorFilterConfig<Rest>>
  | ConfigCase<'AndroidPorterDuffXfermode', AndroidPorterDuffXfermodeConfig<Rest>>
  | ConfigCase<'AndroidScriptIntrinsicBlur', AndroidScriptIntrinsicBlurConfig<Rest>>
  | ConfigCase<'AndroidScriptIntrinsicConvolve3x3', AndroidScriptIntrinsicConvolve3x3Config<Rest>>
  | ConfigCase<'AndroidScriptIntrinsicConvolve5x5', AndroidScriptIntrinsicConvolve5x5Config<Rest>>
  | ConfigCase<'AndroidTextImage', AndroidTextImageConfig<Rest>>
  | Rest

export type ImageFilterProps<Rest> = ViewProps &
  Rest & {
    readonly onFilteringStart?: (event: NativeSyntheticEvent<{}>) => void
    readonly onFilteringFinish?: (event: NativeSyntheticEvent<{}>) => void
    readonly onFilteringError?: (event: NativeSyntheticEvent<{ message: string }>) => void
    readonly onExtractImage?: (event: NativeSyntheticEvent<{ uri: string }>) => void
    readonly clearCachesMaxRetries?: number
    readonly extractImageEnabled?: boolean
  }

export declare class GenericImageFilter<Rest> extends React.Component<
  ImageFilterProps<{ readonly config: Config<Rest> }>
> {}

export declare class ImageFilter extends GenericImageFilter<never> {}

export declare class ColorMatrix extends React.Component<ImageFilterProps<ColorMatrixConfig>> {}
export declare class Normal extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class RGBA extends React.Component<ImageFilterProps<RGBAConfig>> {}
export declare class Saturate extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class HueRotate extends React.Component<ImageFilterProps<AmountConfig>> {}
export declare class LuminanceToAlpha extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Invert extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Grayscale extends React.Component<ImageFilterProps<AmountConfig>> {}
export declare class Sepia extends React.Component<ImageFilterProps<AmountConfig>> {}
export declare class Nightvision extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Warm extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Cool extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Brightness extends React.Component<ImageFilterProps<AmountConfig>> {}
export declare class Contrast extends React.Component<ImageFilterProps<AmountConfig>> {}
export declare class Temperature extends React.Component<ImageFilterProps<AmountConfig>> {}
export declare class Tint extends React.Component<ImageFilterProps<AmountConfig>> {}
export declare class Threshold extends React.Component<ImageFilterProps<AmountConfig>> {}
export declare class Technicolor extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Polaroid extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class ToBGR extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Kodachrome extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Browni extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Vintage extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Night extends React.Component<ImageFilterProps<AmountConfig>> {}
export declare class Predator extends React.Component<ImageFilterProps<AmountConfig>> {}
export declare class Lsd extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class ColorTone extends React.Component<ImageFilterProps<ColorToneConfig>> {}
export declare class DuoTone extends React.Component<ImageFilterProps<DuoToneConfig>> {}
export declare class Protanomaly extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Deuteranomaly extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Tritanomaly extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Protanopia extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Deuteranopia extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Tritanopia extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Achromatopsia extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class Achromatomaly extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class ConvolveMatrix3x3 extends React.Component<
  ImageFilterProps<ConvolveMatrix3x3Config>
> {}
export declare class ConvolveMatrix5x5 extends React.Component<
  ImageFilterProps<ConvolveMatrix5x5Config>
> {}
export declare class Sharpen extends React.Component<ImageFilterProps<AmountConfig>> {}
export declare class EdgeDetection extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class Emboss extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class FuzzyGlass extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class BoxBlur extends React.Component<ImageFilterProps<BlurConfig>> {}
export declare class GaussianBlur extends React.Component<ImageFilterProps<BlurConfig>> {}
export declare class PlusBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class DarkenBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class LightenBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class ModulateBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class OverlayBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class ScreenBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class ColorDodgeBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class ExclusionBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class ColorBurnBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class SoftLightBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class HueBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class ColorBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class SaturationBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class LuminosityBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class DifferenceBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class HardLightBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class MultiplyBlend extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class PlusBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> {}
export declare class DarkenBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> {}
export declare class LightenBlendColor extends React.Component<
  ImageFilterProps<BlendColorConfig>
> {}
export declare class ModulateBlendColor extends React.Component<
  ImageFilterProps<BlendColorConfig>
> {}
export declare class OverlayBlendColor extends React.Component<
  ImageFilterProps<BlendColorConfig>
> {}
export declare class ScreenBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> {}
export declare class ColorDodgeBlendColor extends React.Component<
  ImageFilterProps<BlendColorConfig>
> {}
export declare class ExclusionBlendColor extends React.Component<
  ImageFilterProps<BlendColorConfig>
> {}
export declare class ColorBurnBlendColor extends React.Component<
  ImageFilterProps<BlendColorConfig>
> {}
export declare class SoftLightBlendColor extends React.Component<
  ImageFilterProps<BlendColorConfig>
> {}
export declare class HueBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> {}
export declare class ColorBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> {}
export declare class SaturationBlendColor extends React.Component<
  ImageFilterProps<BlendColorConfig>
> {}
export declare class LuminosityBlendColor extends React.Component<
  ImageFilterProps<BlendColorConfig>
> {}
export declare class DifferenceBlendColor extends React.Component<
  ImageFilterProps<BlendColorConfig>
> {}
export declare class HardLightBlendColor extends React.Component<
  ImageFilterProps<BlendColorConfig>
> {}
export declare class MultiplyBlendColor extends React.Component<
  ImageFilterProps<BlendColorConfig>
> {}
export declare class DstATopComposition extends React.Component<
  ImageFilterProps<CompositionConfig>
> {}
export declare class DstInComposition extends React.Component<
  ImageFilterProps<CompositionConfig>
> {}
export declare class DstOutComposition extends React.Component<
  ImageFilterProps<CompositionConfig>
> {}
export declare class DstOverComposition extends React.Component<
  ImageFilterProps<CompositionConfig>
> {}
export declare class SrcATopComposition extends React.Component<
  ImageFilterProps<CompositionConfig>
> {}
export declare class SrcInComposition extends React.Component<
  ImageFilterProps<CompositionConfig>
> {}
export declare class SrcOutComposition extends React.Component<
  ImageFilterProps<CompositionConfig>
> {}
export declare class SrcOverComposition extends React.Component<
  ImageFilterProps<CompositionConfig>
> {}
export declare class XorComposition extends React.Component<ImageFilterProps<CompositionConfig>> {}
export declare class _1977 extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Aden extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Brannan extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Brooklyn extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Clarendon extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Earlybird extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Gingham extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Hudson extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Inkwell extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Kelvin extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Lark extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Lofi extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Maven extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Mayfair extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Moon extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Nashville extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Perpetua extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Reyes extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Rise extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Slumber extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Stinson extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Toaster extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Valencia extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Walden extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Willow extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class Xpro2 extends React.Component<ImageFilterProps<ConfigWithIntermediates>> {}
export declare class _1977Compat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class AdenCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class BrannanCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class BrooklynCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class ClarendonCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class EarlybirdCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class GinghamCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class HudsonCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class InkwellCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class KelvinCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class LarkCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class LofiCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class MavenCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class MayfairCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class MoonCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class NashvilleCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class PerpetuaCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class ReyesCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class RiseCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class SlumberCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class StinsonCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class ToasterCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class ValenciaCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class WaldenCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class WillowCompat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class Xpro2Compat extends React.Component<
  ImageFilterProps<ConfigWithIntermediates>
> {}
export declare class Color extends React.Component<ImageFilterProps<ColorConfig>> {}
export declare class LinearGradient extends React.Component<
  ImageFilterProps<LinearGradientConfig>
> {}
export declare class RadialGradient extends React.Component<
  ImageFilterProps<RadialGradientConfig>
> {}
export declare class EllipticalGradient extends React.Component<
  ImageFilterProps<EllipticalGradientConfig>
> {}
export declare class RectangularGradient extends React.Component<
  ImageFilterProps<RectangularGradientConfig>
> {}
export declare class SweepGradient extends React.Component<ImageFilterProps<SweepGradientConfig>> {}
export declare class TextImage extends React.Component<ImageFilterProps<TextImageConfig>> {}
export declare class CircleShape extends React.Component<ImageFilterProps<CircleShapeConfig>> {}
export declare class OvalShape extends React.Component<ImageFilterProps<OvalShapeConfig>> {}
export declare class PathShape extends React.Component<ImageFilterProps<PathShapeConfig>> {}
export declare class RegularPolygonShape extends React.Component<
  ImageFilterProps<RegularPolygonShapeConfig>
> {}
export declare class QuadGradient extends React.Component<ImageFilterProps<QuadGradientConfig>> {}

export declare class IosCIBoxBlur extends React.Component<ImageFilterProps<IosRadiusConfig>> {}
export declare class IosCIDiscBlur extends React.Component<ImageFilterProps<IosRadiusConfig>> {}
export declare class IosCIGaussianBlur extends React.Component<ImageFilterProps<IosRadiusConfig>> {}
export declare class IosCIMaskedVariableBlur extends React.Component<
  ImageFilterProps<IosCIMaskedVariableBlurConfig>
> {}
export declare class IosCIMedianFilter extends React.Component<ImageFilterProps<IosCommonConfig>> {}
export declare class IosCIMotionBlur extends React.Component<
  ImageFilterProps<IosCIMotionBlurConfig>
> {}
export declare class IosCINoiseReduction extends React.Component<
  ImageFilterProps<IosCINoiseReductionConfig>
> {}
export declare class IosCIZoomBlur extends React.Component<ImageFilterProps<IosCIZoomBlurConfig>> {}
export declare class IosCIColorClamp extends React.Component<
  ImageFilterProps<IosCIColorClampConfig>
> {}
export declare class IosCIColorControls extends React.Component<
  ImageFilterProps<IosCIColorControlsConfig>
> {}
export declare class IosCIColorMatrix extends React.Component<
  ImageFilterProps<IosCIColorMatrixConfig>
> {}
export declare class IosCIColorPolynomial extends React.Component<
  ImageFilterProps<IosCIColorPolynomialConfig>
> {}
export declare class IosCIExposureAdjust extends React.Component<
  ImageFilterProps<IosCIExposureAdjustConfig>
> {}
export declare class IosCIGammaAdjust extends React.Component<
  ImageFilterProps<IosCIGammaAdjustConfig>
> {}
export declare class IosCIHueAdjust extends React.Component<ImageFilterProps<IosAngleConfig>> {}
export declare class IosCILinearToSRGBToneCurve extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCISRGBToneCurveToLinear extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCITemperatureAndTint extends React.Component<
  ImageFilterProps<IosCITemperatureAndTintConfig>
> {}
export declare class IosCIToneCurve extends React.Component<
  ImageFilterProps<IosCIToneCurveConfig>
> {}
export declare class IosCIVibrance extends React.Component<
  ImageFilterProps<IosScalarAmountConfig>
> {}
export declare class IosCIWhitePointAdjust extends React.Component<
  ImageFilterProps<IosColorConfig>
> {}
export declare class IosCIColorCrossPolynomial extends React.Component<
  ImageFilterProps<IosCIColorPolynomialBaseConfig>
> {}
export declare class IosCIColorCube extends React.Component<
  ImageFilterProps<IosCIColorCubeConfig>
> {}
export declare class IosCIColorInvert extends React.Component<ImageFilterProps<IosCommonConfig>> {}
export declare class IosCIColorMap extends React.Component<ImageFilterProps<IosCIColorMapConfig>> {}
export declare class IosCIColorMonochrome extends React.Component<
  ImageFilterProps<IosCIColorMonochromeConfig>
> {}
export declare class IosCIColorPosterize extends React.Component<
  ImageFilterProps<IosCIColorPosterizeConfig>
> {}
export declare class IosCIFalseColor extends React.Component<
  ImageFilterProps<IosCIFalseColorConfig>
> {}
export declare class IosCIMaskToAlpha extends React.Component<ImageFilterProps<IosCommonConfig>> {}
export declare class IosCIMaximumComponent extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCIMinimumComponent extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCIPhotoEffectChrome extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCIPhotoEffectFade extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCIPhotoEffectInstant extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCIPhotoEffectMono extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCIPhotoEffectNoir extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCIPhotoEffectProcess extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCIPhotoEffectTonal extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCIPhotoEffectTransfer extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCISepiaTone extends React.Component<
  ImageFilterProps<IosCISepiaToneConfig>
> {}
export declare class IosCIVignette extends React.Component<ImageFilterProps<IosCIVignetteConfig>> {}
export declare class IosCIVignetteEffect extends React.Component<
  ImageFilterProps<IosCIVignetteEffectConfig>
> {}
export declare class IosCIAdditionCompositing extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIColorBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIColorBurnBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIColorDodgeBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIDarkenBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIDifferenceBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIDivideBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIExclusionBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIHardLightBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIHueBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCILightenBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCILinearBurnBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCILinearDodgeBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCILuminosityBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIMaximumCompositing extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIMinimumCompositing extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIMultiplyBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIMultiplyCompositing extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIOverlayBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIPinLightBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCISaturationBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIScreenBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCISoftLightBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCISourceAtopCompositing extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCISourceInCompositing extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCISourceOutCompositing extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCISourceOverCompositing extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCISubtractBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCIBumpDistortion extends React.Component<
  ImageFilterProps<IosScaleCenterRadiusConfig>
> {}
export declare class IosCIBumpDistortionLinear extends React.Component<
  ImageFilterProps<IosCIBumpDistortionLinearConfig>
> {}
export declare class IosCICircleSplashDistortion extends React.Component<
  ImageFilterProps<IosCenterRadiusConfig>
> {}
export declare class IosCICircularWrap extends React.Component<
  ImageFilterProps<IosAngleCenterRadiusConfig>
> {}
export declare class IosCIDroste extends React.Component<ImageFilterProps<IosCIDrosteConfig>> {}
export declare class IosCIDisplacementDistortion extends React.Component<
  ImageFilterProps<IosCIDisplacementDistortionConfig>
> {}
export declare class IosCIGlassDistortion extends React.Component<
  ImageFilterProps<IosCIGlassDistortionConfig>
> {}
export declare class IosCIGlassLozenge extends React.Component<
  ImageFilterProps<IosCIGlassLozengeConfig>
> {}
export declare class IosCIHoleDistortion extends React.Component<
  ImageFilterProps<IosCenterRadiusConfig>
> {}
export declare class IosCILightTunnel extends React.Component<
  ImageFilterProps<IosCILightTunnelConfig>
> {}
export declare class IosCIPinchDistortion extends React.Component<
  ImageFilterProps<IosScaleCenterRadiusConfig>
> {}
export declare class IosCIStretchCrop extends React.Component<
  ImageFilterProps<IosCIStretchCropConfig>
> {}
export declare class IosCITorusLensDistortion extends React.Component<
  ImageFilterProps<IosCITorusLensDistortionConfig>
> {}
export declare class IosCITwirlDistortion extends React.Component<
  ImageFilterProps<IosAngleCenterRadiusConfig>
> {}
export declare class IosCIVortexDistortion extends React.Component<
  ImageFilterProps<IosAngleCenterRadiusConfig>
> {}
export declare class IosCIAztecCodeGenerator extends React.Component<
  ImageFilterProps<IosCIAztecCodeGeneratorConfig>
> {}
export declare class IosCICheckerboardGenerator extends React.Component<
  ImageFilterProps<IosCICheckerboardGeneratorConfig>
> {}
export declare class IosCIConstantColorGenerator extends React.Component<
  ImageFilterProps<IosColorConfig>
> {}
export declare class IosCILenticularHaloGenerator extends React.Component<
  ImageFilterProps<IosCILenticularHaloGeneratorConfig>
> {}
export declare class IosCIQRCodeGenerator extends React.Component<
  ImageFilterProps<IosCIQRCodeGeneratorConfig>
> {}
export declare class IosCIRandomGenerator extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCIStarShineGenerator extends React.Component<
  ImageFilterProps<IosCIStarShineGeneratorConfig>
> {}
export declare class IosCIStripesGenerator extends React.Component<
  ImageFilterProps<IosCIStripesGeneratorConfig>
> {}
export declare class IosCISunbeamsGenerator extends React.Component<
  ImageFilterProps<IosCISunbeamsGeneratorConfig>
> {}
export declare class IosCICrop extends React.Component<ImageFilterProps<IosCICropConfig>> {}
export declare class IosCILanczosScaleTransform extends React.Component<
  ImageFilterProps<IosCILanczosScaleTransformConfig>
> {}
export declare class IosCIPerspectiveCorrection extends React.Component<
  ImageFilterProps<IosCIPerspectiveCorrectionConfig>
> {}
export declare class IosCIPerspectiveTransform extends React.Component<
  ImageFilterProps<IosPerspectiveConfig>
> {}
export declare class IosCIPerspectiveTransformWithExtent extends React.Component<
  ImageFilterProps<IosCIPerspectiveTransformWithExtentConfig>
> {}
export declare class IosCIStraightenFilter extends React.Component<
  ImageFilterProps<IosCIStraightenFilterConfig>
> {}
export declare class IosCIGaussianGradient extends React.Component<
  ImageFilterProps<IosCIGaussianGradientConfig>
> {}
export declare class IosCILinearGradient extends React.Component<
  ImageFilterProps<IosCILinearGradientConfig>
> {}
export declare class IosCIRadialGradient extends React.Component<
  ImageFilterProps<IosCIRadialGradientConfig>
> {}
export declare class IosCISmoothLinearGradient extends React.Component<
  ImageFilterProps<IosCILinearGradientConfig>
> {}
export declare class IosCICircularScreen extends React.Component<
  ImageFilterProps<IosHalftoneEffectConfig>
> {}
export declare class IosCICMYKHalftone extends React.Component<
  ImageFilterProps<IosCICMYKHalftoneConfig>
> {}
export declare class IosCIDotScreen extends React.Component<
  ImageFilterProps<IosAngleHalftoneEffectConfig>
> {}
export declare class IosCIHatchedScreen extends React.Component<
  ImageFilterProps<IosAngleHalftoneEffectConfig>
> {}
export declare class IosCILineScreen extends React.Component<
  ImageFilterProps<IosAngleHalftoneEffectConfig>
> {}
export declare class IosCIAreaAverage extends React.Component<ImageFilterProps<IosAreaConfig>> {}
export declare class IosCIAreaHistogram extends React.Component<
  ImageFilterProps<IosCIAreaHistogramConfig>
> {}
export declare class IosCIRowAverage extends React.Component<ImageFilterProps<IosAreaConfig>> {}
export declare class IosCIColumnAverage extends React.Component<ImageFilterProps<IosAreaConfig>> {}
export declare class IosCIHistogramDisplayFilter extends React.Component<
  ImageFilterProps<IosCIHistogramDisplayFilterConfig>
> {}
export declare class IosCIAreaMaximum extends React.Component<ImageFilterProps<IosAreaConfig>> {}
export declare class IosCIAreaMinimum extends React.Component<ImageFilterProps<IosAreaConfig>> {}
export declare class IosCIAreaMaximumAlpha extends React.Component<
  ImageFilterProps<IosAreaConfig>
> {}
export declare class IosCIAreaMinimumAlpha extends React.Component<
  ImageFilterProps<IosAreaConfig>
> {}
export declare class IosCISharpenLuminance extends React.Component<
  ImageFilterProps<IosCISharpenLuminanceConfig>
> {}
export declare class IosCIUnsharpMask extends React.Component<
  ImageFilterProps<IosCIUnsharpMaskConfig>
> {}
export declare class IosCIBloom extends React.Component<ImageFilterProps<IosCIBloomConfig>> {}
export declare class IosCIComicEffect extends React.Component<ImageFilterProps<IosCommonConfig>> {}
export declare class IosCIConvolution3X3 extends React.Component<
  ImageFilterProps<IosConvolutionConfig>
> {}
export declare class IosCIConvolution5X5 extends React.Component<
  ImageFilterProps<IosCIConvolution5X5Config>
> {}
export declare class IosCIConvolution7X7 extends React.Component<
  ImageFilterProps<IosCIConvolution7X7Config>
> {}
export declare class IosCIConvolution9Horizontal extends React.Component<
  ImageFilterProps<IosConvolutionConfig>
> {}
export declare class IosCIConvolution9Vertical extends React.Component<
  ImageFilterProps<IosConvolutionConfig>
> {}
export declare class IosCICrystallize extends React.Component<
  ImageFilterProps<IosCenterRadiusConfig>
> {}
export declare class IosCIEdges extends React.Component<ImageFilterProps<IosCIEdgesConfig>> {}
export declare class IosCIEdgeWork extends React.Component<ImageFilterProps<IosRadiusConfig>> {}
export declare class IosCIGloom extends React.Component<ImageFilterProps<IosCIGloomConfig>> {}
export declare class IosCIHeightFieldFromMask extends React.Component<
  ImageFilterProps<IosRadiusConfig>
> {}
export declare class IosCIHexagonalPixellate extends React.Component<
  ImageFilterProps<IosCIHexagonalPixellateConfig>
> {}
export declare class IosCIHighlightShadowAdjust extends React.Component<
  ImageFilterProps<IosCIHighlightShadowAdjustConfig>
> {}
export declare class IosCILineOverlay extends React.Component<
  ImageFilterProps<IosCILineOverlayConfig>
> {}
export declare class IosCIPixellate extends React.Component<
  ImageFilterProps<IosCIPixellateConfig>
> {}
export declare class IosCIPointillize extends React.Component<
  ImageFilterProps<IosCenterRadiusConfig>
> {}
export declare class IosCIShadedMaterial extends React.Component<
  ImageFilterProps<IosCIShadedMaterialConfig>
> {}
export declare class IosCISpotColor extends React.Component<
  ImageFilterProps<IosCISpotColorConfig>
> {}
export declare class IosCISpotLight extends React.Component<
  ImageFilterProps<IosCISpotLightConfig>
> {}
export declare class IosCIEightfoldReflectedTile extends React.Component<
  ImageFilterProps<IosTileConfig>
> {}
export declare class IosCIFourfoldReflectedTile extends React.Component<
  ImageFilterProps<IosTileConfig>
> {}
export declare class IosCIFourfoldRotatedTile extends React.Component<
  ImageFilterProps<IosTileConfig>
> {}
export declare class IosCIFourfoldTranslatedTile extends React.Component<
  ImageFilterProps<IosCIFourfoldTranslatedTileConfig>
> {}
export declare class IosCIGlideReflectedTile extends React.Component<
  ImageFilterProps<IosTileConfig>
> {}
export declare class IosCIKaleidoscope extends React.Component<
  ImageFilterProps<IosCIKaleidoscopeConfig>
> {}
export declare class IosCIOpTile extends React.Component<ImageFilterProps<IosCIOpTileConfig>> {}
export declare class IosCIParallelogramTile extends React.Component<
  ImageFilterProps<IosCIFourfoldTranslatedTileConfig>
> {}
export declare class IosCIPerspectiveTile extends React.Component<
  ImageFilterProps<IosPerspectiveConfig>
> {}
export declare class IosCISixfoldReflectedTile extends React.Component<
  ImageFilterProps<IosTileConfig>
> {}
export declare class IosCISixfoldRotatedTile extends React.Component<
  ImageFilterProps<IosTileConfig>
> {}
export declare class IosCITriangleKaleidoscope extends React.Component<
  ImageFilterProps<IosCITriangleKaleidoscopeConfig>
> {}
export declare class IosCITriangleTile extends React.Component<ImageFilterProps<IosTileConfig>> {}
export declare class IosCITwelvefoldReflectedTile extends React.Component<
  ImageFilterProps<IosTileConfig>
> {}
export declare class IosCIXRay extends React.Component<ImageFilterProps<IosCommonConfig>> {}
export declare class IosCIThermal extends React.Component<ImageFilterProps<IosCommonConfig>> {}
export declare class IosCIMorphologyGradient extends React.Component<
  ImageFilterProps<IosRadiusConfig>
> {}
export declare class IosCIDisparityToDepth extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCIBokehBlur extends React.Component<
  ImageFilterProps<IosCIBokehBlurConfig>
> {}
export declare class IosCISaliencyMapFilter extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCISampleNearest extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCIMix extends React.Component<ImageFilterProps<IosCIMixConfig>> {}
export declare class IosCIDepthToDisparity extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCITextImageGenerator extends React.Component<
  ImageFilterProps<IosCITextImageGeneratorConfig>
> {}
export declare class IosCIHueSaturationValueGradient extends React.Component<
  ImageFilterProps<IosCIHueSaturationValueGradientConfig>
> {}
export declare class IosCIMorphologyMaximum extends React.Component<
  ImageFilterProps<IosRadiusConfig>
> {}
export declare class IosCIMorphologyMinimum extends React.Component<
  ImageFilterProps<IosRadiusConfig>
> {}
export declare class IosCINinePartStretched extends React.Component<
  ImageFilterProps<IosCINinePartStretchedConfig>
> {}
export declare class IosCIWrapMirror extends React.Component<ImageFilterProps<IosCommonConfig>> {}
export declare class IosCIMirror extends React.Component<ImageFilterProps<IosCIMirrorConfig>> {}
export declare class IosCIAreaMinMaxRed extends React.Component<ImageFilterProps<IosAreaConfig>> {}
export declare class IosCIAreaMinMax extends React.Component<ImageFilterProps<IosAreaConfig>> {}
export declare class IosCICheatBlur extends React.Component<
  ImageFilterProps<IosDistanceAmountConfig>
> {}
export declare class IosCICheapMorphology extends React.Component<
  ImageFilterProps<IosRadiusConfig>
> {}
export declare class IosCIMorphology extends React.Component<ImageFilterProps<IosRadiusConfig>> {}
export declare class IosCICheapBlur extends React.Component<
  ImageFilterProps<IosCICheapBlurConfig>
> {}
export declare class IosCIDither extends React.Component<ImageFilterProps<IosCIDitherConfig>> {}
export declare class IosCIVividLightBlendMode extends React.Component<
  ImageFilterProps<IosCIBackgroundImageCompositionConfig>
> {}
export declare class IosCISkyAndGrassAdjust extends React.Component<
  ImageFilterProps<IosCISkyAndGrassAdjustConfig>
> {}
export declare class IosCIRingBlur extends React.Component<ImageFilterProps<IosCIRingBlurConfig>> {}
export declare class IosCIPremultiply extends React.Component<ImageFilterProps<IosCommonConfig>> {}
export declare class IosCIPhotoGrain extends React.Component<
  ImageFilterProps<IosCIPhotoGrainConfig>
> {}
export declare class IosCIUnpremultiply extends React.Component<
  ImageFilterProps<IosCommonConfig>
> {}
export declare class IosCILocalContrast extends React.Component<
  ImageFilterProps<IosCILocalContrastConfig>
> {}
export declare class IosCILinearBlur extends React.Component<ImageFilterProps<IosRadiusConfig>> {}
export declare class IosCIGaussianBlurXY extends React.Component<
  ImageFilterProps<IosCIGaussianBlurXYConfig>
> {}
export declare class IosCIDocumentEnhancer extends React.Component<
  ImageFilterProps<IosScalarAmountConfig>
> {}
export declare class IosCIClamp extends React.Component<ImageFilterProps<IosAreaConfig>> {}
export declare class IosCIASG50Percent extends React.Component<ImageFilterProps<IosCommonConfig>> {}
export declare class IosCIASG60Percent extends React.Component<ImageFilterProps<IosCommonConfig>> {}
export declare class IosCIASG66Percent extends React.Component<ImageFilterProps<IosCommonConfig>> {}
export declare class IosCIASG75Percent extends React.Component<ImageFilterProps<IosCommonConfig>> {}
export declare class IosCIASG80Percent extends React.Component<ImageFilterProps<IosCommonConfig>> {}
export declare class IosCIPaperWash extends React.Component<
  ImageFilterProps<IosCIPaperWashConfig>
> {}

export declare class AndroidColorMatrixColorFilter extends React.Component<
  ImageFilterProps<ColorMatrixConfig>
> {}
export declare class AndroidIterativeBoxBlur extends React.Component<
  ImageFilterProps<AndroidIterativeBoxBlurConfig>
> {}
export declare class AndroidLightingColorFilter extends React.Component<
  ImageFilterProps<AndroidLightingColorFilterConfig>
> {}
export declare class AndroidRoundAsCircle extends React.Component<ImageFilterProps<CommonConfig>> {}
export declare class AndroidColor extends React.Component<ImageFilterProps<ColorConfig>> {}
export declare class AndroidLinearGradient extends React.Component<
  ImageFilterProps<AndroidLinearGradientConfig>
> {}
export declare class AndroidRadialGradient extends React.Component<
  ImageFilterProps<AndroidRadialGradientConfig>
> {}
export declare class AndroidSweepGradient extends React.Component<
  ImageFilterProps<AndroidSweepGradientConfig>
> {}
export declare class AndroidPorterDuffColorFilter extends React.Component<
  ImageFilterProps<AndroidPorterDuffColorFilterConfig>
> {}
export declare class AndroidPorterDuffXfermode extends React.Component<
  ImageFilterProps<AndroidPorterDuffXfermodeConfig>
> {}
export declare class AndroidScriptIntrinsicBlur extends React.Component<
  ImageFilterProps<AndroidScriptIntrinsicBlurConfig>
> {}
export declare class AndroidScriptIntrinsicConvolve3x3 extends React.Component<
  ImageFilterProps<AndroidScriptIntrinsicConvolve3x3Config>
> {}
export declare class AndroidScriptIntrinsicConvolve5x5 extends React.Component<
  ImageFilterProps<AndroidScriptIntrinsicConvolve5x5Config>
> {}
export declare class AndroidTextImage extends React.Component<
  ImageFilterProps<AndroidTextImageConfig>
> {}

export declare class ImagePlaceholder extends React.Component<Omit<ImageProps, 'source'>> {}
export declare class ImageBackgroundPlaceholder extends React.Component<
  Omit<ImageBackgroundProps, 'source'>
> {}

export function rgbaToRgb(RGB_background: string, RGBA_color: string): string
export function concatColorMatrices(matrices: Matrix[]): Matrix

export function normal(): Matrix
export function rgba(red?: number, green?: number, blue?: number, alpha?: number): Matrix
export function saturate(amount?: number): Matrix
export function hueRotate(amount?: number): Matrix
export function luminanceToAlpha(): Matrix
export function invert(): Matrix
export function grayscale(amount?: number): Matrix
export function sepia(amount?: number): Matrix
export function nightvision(): Matrix
export function warm(): Matrix
export function cool(): Matrix
export function brightness(amount?: number): Matrix
export function contrast(amount?: number): Matrix
export function temperature(amount?: number): Matrix
export function tint(amount?: number): Matrix
export function threshold(amount?: number): Matrix
export function technicolor(): Matrix
export function polaroid(): Matrix
export function toBGR(): Matrix
export function kodachrome(): Matrix
export function browni(): Matrix
export function vintage(): Matrix
export function night(amount?: number): Matrix
export function predator(amount?: number): Matrix
export function lsd(): Matrix
export function colorTone(
  desaturation?: number,
  toned?: number,
  lightColor?: string,
  darkColor?: string
): Matrix
export function duoTone(firstColor?: string, secondColor?: string): Matrix
export function protanomaly(): Matrix
export function deuteranomaly(): Matrix
export function tritanomaly(): Matrix
export function protanopia(): Matrix
export function deuteranopia(): Matrix
export function tritanopia(): Matrix
export function achromatopsia(): Matrix
export function achromatomaly(): Matrix

type Input =
  | 'config'
  | 'distance'
  | 'scalar'
  | 'position'
  | 'scalarVector'
  | 'offset'
  | 'color'
  | 'tileMode'
  | 'porterDuffMode'
  | 'colorVector'
  | 'image'
  | 'scale'
  | 'bool'
  | 'distanceVector'
  | 'text'
  | 'area'
  | 'binaryData'
  | 'ISOLatin1EncodedText'
  | 'marker'
  | 'path'
  | 'transform'
  | 'mixStep'

type Shape = { [key: string]: Input }

export function registerFilter<T, U>(
  name: string,
  shape: Shape,
  transform?: (config: T) => Config<U>
): React.FC<ViewProps & T>

export function moveTo(x: Distance, y: Distance): PathStep
export function lineTo(x: Distance, y: Distance): PathStep
export function quadTo(x1: Distance, y1: Distance, x2: Distance, y2: Distance): PathStep
export function cubicTo(
  x1: Distance,
  y1: Distance,
  x2: Distance,
  y2: Distance,
  x3: Distance,
  y3: Distance
): PathStep
export function closePath(): PathStep
export function cleanExtractedImagesCache(): void
