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

type ResizeMode = 'COVER' | 'CONTAIN' | 'STRETCH' | {
  readonly width?: number
  readonly height?: number
}

type Filterable = React.ReactElement<unknown> | Config

interface CommonConfig {
  readonly image: Filterable
}

interface ColorMatrixConfig extends CommonConfig {
  readonly matrix: Matrix
}

interface RGBAConfig extends CommonConfig {
  readonly red?: number
  readonly green?: number
  readonly blue?: number
  readonly alpha?: number
}

interface AmountConfig extends CommonConfig {
  readonly amount?: number
}

interface ColorToneConfig extends CommonConfig {
  readonly desaturation?: number
  readonly toned?: number
  readonly lightColor?: string
  readonly darkColor?: string
}

interface DuoToneConfig extends CommonConfig {
  readonly firstColor?: string
  readonly secondColor?: string
}

interface ConvolveMatrix3x3Config extends CommonConfig {
  readonly matrix?: [
    number, number, number,
    number, number, number,
    number, number, number
  ]
}

interface ConvolveMatrix5x5Config extends CommonConfig {
  readonly matrix?: [
    number, number, number, number, number,
    number, number, number, number, number,
    number, number, number, number, number,
    number, number, number, number, number,
    number, number, number, number, number
  ]
}

interface BlurConfig extends CommonConfig {
  readonly radius?: number
}

interface CompositionConfig {
  readonly dstImage: Filterable
  readonly dstAnchor?: Offset
  readonly dstPosition?: Offset
  readonly dstResizeMode?: ResizeMode
  readonly srcImage: Filterable
  readonly srcAnchor?: Offset
  readonly srcPosition?: Offset
  readonly srcResizeMode?: ResizeMode
  readonly resizeCanvasTo?: 'dstImage' | 'srcImage'
}

interface BlendColorConfig {
  readonly dstImage: Filterable
  readonly srcColor: string
}

interface GradientGeneratorConfig {
  readonly image: Filterable
  readonly colors?: [
    string, string?, string?, string?, string?, string?, string?, string?, string?, string?
  ]
  readonly stops?: [
    number, number?, number?, number?, number?, number?, number?, number?, number?, number?
  ]
}

interface LinearGradientGeneratorConfig extends GradientGeneratorConfig {
  readonly start?: Position
  readonly end?: Position
}

interface RadialGradientGeneratorConfig extends GradientGeneratorConfig {
  readonly center?: Position
  readonly radius?: Distance
}

interface SweepGradientGeneratorConfig extends GradientGeneratorConfig {
  readonly center?: Position
}

interface ColorGeneratorConfig {
  readonly color: string
}

export type Config =
  | { name: 'ColorMatrix' } & ColorMatrixConfig
  | { name: 'Normal' } & CommonConfig
  | { name: 'RGBA' } & RGBAConfig
  | { name: 'Saturate' } & AmountConfig
  | { name: 'HueRotate' } & AmountConfig
  | { name: 'LuminanceToAlpha' } & CommonConfig
  | { name: 'Invert' } & CommonConfig
  | { name: 'Grayscale' } & AmountConfig
  | { name: 'Sepia' } & AmountConfig
  | { name: 'Nightvision' } & CommonConfig
  | { name: 'Warm' } & CommonConfig
  | { name: 'Cool' } & CommonConfig
  | { name: 'Brightness' } & AmountConfig
  | { name: 'Contrast' } & AmountConfig
  | { name: 'Temperature' } & AmountConfig
  | { name: 'Tint' } & AmountConfig
  | { name: 'Threshold' } & AmountConfig
  | { name: 'Technicolor' } & CommonConfig
  | { name: 'Polaroid' } & CommonConfig
  | { name: 'ToBGR' } & CommonConfig
  | { name: 'Kodachrome' } & CommonConfig
  | { name: 'Browni' } & CommonConfig
  | { name: 'Vintage' } & CommonConfig
  | { name: 'Night' } & AmountConfig
  | { name: 'Predator' } & AmountConfig
  | { name: 'Lsd' } & CommonConfig
  | { name: 'ColorTone' } & ColorToneConfig
  | { name: 'DuoTone' } & DuoToneConfig
  | { name: 'Protanomaly' } & CommonConfig
  | { name: 'Deuteranomaly' } & CommonConfig
  | { name: 'Tritanomaly' } & CommonConfig
  | { name: 'Protanopia' } & CommonConfig
  | { name: 'Deuteranopia' } & CommonConfig
  | { name: 'Tritanopia' } & CommonConfig
  | { name: 'Achromatopsia' } & CommonConfig
  | { name: 'Achromatomaly' } & CommonConfig
  | { name: 'ConvolveMatrix3x3' } & ConvolveMatrix3x3Config
  | { name: 'ConvolveMatrix5x5' } & ConvolveMatrix5x5Config
  | { name: 'Sharpen' } & AmountConfig
  | { name: 'EdgeDetection' } & CommonConfig
  | { name: 'Emboss' } & CommonConfig
  | { name: 'FuzzyGlass' } & CommonConfig
  | { name: 'BoxBlur' } & BlurConfig
  | { name: 'GaussianBlur' } & BlurConfig
  | { name: 'PlusBlend' } & CompositionConfig
  | { name: 'DarkenBlend' } & CompositionConfig
  | { name: 'LightenBlend' } & CompositionConfig
  | { name: 'ModulateBlend' } & CompositionConfig
  | { name: 'OverlayBlend' } & CompositionConfig
  | { name: 'ScreenBlend' } & CompositionConfig
  | { name: 'ColorDodgeBlend' } & CompositionConfig
  | { name: 'ExclusionBlend' } & CompositionConfig
  | { name: 'ColorBurnBlend' } & CompositionConfig
  | { name: 'SoftLightBlend' } & CompositionConfig
  | { name: 'HueBlend' } & CompositionConfig
  | { name: 'ColorBlend' } & CompositionConfig
  | { name: 'SaturationBlend' } & CompositionConfig
  | { name: 'LuminosityBlend' } & CompositionConfig
  | { name: 'DifferenceBlend' } & CompositionConfig
  | { name: 'HardLightBlend' } & CompositionConfig
  | { name: 'MultiplyBlend' } & CompositionConfig
  | { name: 'PlusBlendColor' } & BlendColorConfig
  | { name: 'DarkenBlendColor' } & BlendColorConfig
  | { name: 'LightenBlendColor' } & BlendColorConfig
  | { name: 'ModulateBlendColor' } & BlendColorConfig
  | { name: 'OverlayBlendColor' } & BlendColorConfig
  | { name: 'ScreenBlendColor' } & BlendColorConfig
  | { name: 'ColorDodgeBlendColor' } & BlendColorConfig
  | { name: 'ExclusionBlendColor' } & BlendColorConfig
  | { name: 'ColorBurnBlendColor' } & BlendColorConfig
  | { name: 'SoftLightBlendColor' } & BlendColorConfig
  | { name: 'HueBlendColor' } & BlendColorConfig
  | { name: 'ColorBlendColor' } & BlendColorConfig
  | { name: 'SaturationBlendColor' } & BlendColorConfig
  | { name: 'LuminosityBlendColor' } & BlendColorConfig
  | { name: 'DifferenceBlendColor' } & BlendColorConfig
  | { name: 'HardLightBlendColor' } & BlendColorConfig
  | { name: 'MultiplyBlendColor' } & BlendColorConfig
  | { name: 'DstATopComposition' } & CompositionConfig
  | { name: 'DstInComposition' } & CompositionConfig
  | { name: 'DstOutComposition' } & CompositionConfig
  | { name: 'DstOverComposition' } & CompositionConfig
  | { name: 'SrcATopComposition' } & CompositionConfig
  | { name: 'SrcInComposition' } & CompositionConfig
  | { name: 'SrcOutComposition' } & CompositionConfig
  | { name: 'SrcOverComposition' } & CompositionConfig
  | { name: 'XorComposition' } & CompositionConfig
  | { name: '_1977' } & CommonConfig
  | { name: 'Aden' } & CommonConfig
  | { name: 'Brannan' } & CommonConfig
  | { name: 'Brooklyn' } & CommonConfig
  | { name: 'Clarendon' } & CommonConfig
  | { name: 'Earlybird' } & CommonConfig
  | { name: 'Gingham' } & CommonConfig
  | { name: 'Hudson' } & CommonConfig
  | { name: 'Inkwell' } & CommonConfig
  | { name: 'Kelvin' } & CommonConfig
  | { name: 'Lark' } & CommonConfig
  | { name: 'Lofi' } & CommonConfig
  | { name: 'Maven' } & CommonConfig
  | { name: 'Mayfair' } & CommonConfig
  | { name: 'Moon' } & CommonConfig
  | { name: 'Nashville' } & CommonConfig
  | { name: 'Perpetua' } & CommonConfig
  | { name: 'Reyes' } & CommonConfig
  | { name: 'Rise' } & CommonConfig
  | { name: 'Slumber' } & CommonConfig
  | { name: 'Stinson' } & CommonConfig
  | { name: 'Toaster' } & CommonConfig
  | { name: 'Valencia' } & CommonConfig
  | { name: 'Walden' } & CommonConfig
  | { name: 'Willow' } & CommonConfig
  | { name: 'Xpro2' } & CommonConfig
  | { name: '_1977Compat' } & CommonConfig
  | { name: 'AdenCompat' } & CommonConfig
  | { name: 'BrannanCompat' } & CommonConfig
  | { name: 'BrooklynCompat' } & CommonConfig
  | { name: 'ClarendonCompat' } & CommonConfig
  | { name: 'EarlybirdCompat' } & CommonConfig
  | { name: 'GinghamCompat' } & CommonConfig
  | { name: 'HudsonCompat' } & CommonConfig
  | { name: 'InkwellCompat' } & CommonConfig
  | { name: 'KelvinCompat' } & CommonConfig
  | { name: 'LarkCompat' } & CommonConfig
  | { name: 'LofiCompat' } & CommonConfig
  | { name: 'MavenCompat' } & CommonConfig
  | { name: 'MayfairCompat' } & CommonConfig
  | { name: 'MoonCompat' } & CommonConfig
  | { name: 'NashvilleCompat' } & CommonConfig
  | { name: 'PerpetuaCompat' } & CommonConfig
  | { name: 'ReyesCompat' } & CommonConfig
  | { name: 'RiseCompat' } & CommonConfig
  | { name: 'SlumberCompat' } & CommonConfig
  | { name: 'StinsonCompat' } & CommonConfig
  | { name: 'ToasterCompat' } & CommonConfig
  | { name: 'ValenciaCompat' } & CommonConfig
  | { name: 'WaldenCompat' } & CommonConfig
  | { name: 'WillowCompat' } & CommonConfig
  | { name: 'Xpro2Compat' } & CommonConfig
  | { name: 'ColorGenerator' } & ColorGeneratorConfig
  | { name: 'LinearGradientGenerator' } & LinearGradientGeneratorConfig
  | { name: 'RadialGradientGenerator' } & RadialGradientGeneratorConfig
  | { name: 'SweepGradientGenerator' } & SweepGradientGeneratorConfig

type ImageFilterProps<Rest> = ViewProps & Rest & {
  readonly onFilteringStart?: (event: NativeSyntheticEvent<{}>) => void
  readonly onFilteringFinish?: (event: NativeSyntheticEvent<{}>) => void
  readonly onFilteringError?: (event: NativeSyntheticEvent<{ message: string }>) => void
  readonly clearCachesMaxRetries?: number
}

export declare class ImageFilter extends React.Component<ImageFilterProps<{ readonly config: Config }>> { }
export declare class ColorMatrix extends React.Component<ImageFilterProps<ColorMatrixConfig>> { }
export declare class Normal extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class RGBA extends React.Component<ImageFilterProps<RGBAConfig>> { }
export declare class Saturate extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class HueRotate extends React.Component<ImageFilterProps<AmountConfig>> { }
export declare class LuminanceToAlpha extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Invert extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Grayscale extends React.Component<ImageFilterProps<AmountConfig>> { }
export declare class Sepia extends React.Component<ImageFilterProps<AmountConfig>> { }
export declare class Nightvision extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Warm extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Cool extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Brightness extends React.Component<ImageFilterProps<AmountConfig>> { }
export declare class Contrast extends React.Component<ImageFilterProps<AmountConfig>> { }
export declare class Temperature extends React.Component<ImageFilterProps<AmountConfig>> { }
export declare class Tint extends React.Component<ImageFilterProps<AmountConfig>> { }
export declare class Threshold extends React.Component<ImageFilterProps<AmountConfig>> { }
export declare class Technicolor extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Polaroid extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class ToBGR extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Kodachrome extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Browni extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Vintage extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Night extends React.Component<ImageFilterProps<AmountConfig>> { }
export declare class Predator extends React.Component<ImageFilterProps<AmountConfig>> { }
export declare class Lsd extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class ColorTone extends React.Component<ImageFilterProps<ColorToneConfig>> { }
export declare class DuoTone extends React.Component<ImageFilterProps<DuoToneConfig>> { }
export declare class Protanomaly extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Deuteranomaly extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Tritanomaly extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Protanopia extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Deuteranopia extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Tritanopia extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Achromatopsia extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Achromatomaly extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class ConvolveMatrix3x3 extends React.Component<ImageFilterProps<ConvolveMatrix3x3Config>> { }
export declare class ConvolveMatrix5x5 extends React.Component<ImageFilterProps<ConvolveMatrix5x5Config>> { }
export declare class Sharpen extends React.Component<ImageFilterProps<AmountConfig>> { }
export declare class EdgeDetection extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Emboss extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class FuzzyGlass extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class BoxBlur extends React.Component<ImageFilterProps<BlurConfig>> { }
export declare class GaussianBlur extends React.Component<ImageFilterProps<BlurConfig>> { }
export declare class PlusBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class DarkenBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class LightenBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class ModulateBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class OverlayBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class ScreenBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class ColorDodgeBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class ExclusionBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class ColorBurnBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class SoftLightBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class HueBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class ColorBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class SaturationBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class LuminosityBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class DifferenceBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class HardLightBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class MultiplyBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class PlusBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class DarkenBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class LightenBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class ModulateBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class OverlayBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class ScreenBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class ColorDodgeBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class ExclusionBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class ColorBurnBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class SoftLightBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class HueBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class ColorBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class SaturationBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class LuminosityBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class DifferenceBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class HardLightBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class MultiplyBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export declare class DstATopComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class DstInComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class DstOutComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class DstOverComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class SrcATopComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class SrcInComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class SrcOutComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class SrcOverComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class XorComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export declare class _1977 extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Aden extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Brannan extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Brooklyn extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Clarendon extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Earlybird extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Gingham extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Hudson extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Inkwell extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Kelvin extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Lark extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Lofi extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Maven extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Mayfair extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Moon extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Nashville extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Perpetua extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Reyes extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Rise extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Slumber extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Stinson extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Toaster extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Valencia extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Walden extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Willow extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Xpro2 extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class _1977Compat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class AdenCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class BrannanCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class BrooklynCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class ClarendonCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class EarlybirdCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class GinghamCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class HudsonCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class InkwellCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class KelvinCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class LarkCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class LofiCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class MavenCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class MayfairCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class MoonCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class NashvilleCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class PerpetuaCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class ReyesCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class RiseCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class SlumberCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class StinsonCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class ToasterCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class ValenciaCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class WaldenCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class WillowCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class Xpro2Compat extends React.Component<ImageFilterProps<CommonConfig>> { }
export declare class ColorGenerator extends React.Component<ImageFilterProps<ColorGeneratorConfig>> { }
export declare class LinearGradientGenerator extends React.Component<ImageFilterProps<LinearGradientGeneratorConfig>> { }
export declare class RadialGradientGenerator extends React.Component<ImageFilterProps<RadialGradientGeneratorConfig>> { }
export declare class SweepGradientGenerator extends React.Component<ImageFilterProps<SweepGradientGeneratorConfig>> { }

export declare class ImagePlaceholder extends React.Component<Omit<ImageProps, 'source'>> { }
export declare class ImageBackgroundPlaceholder extends React.Component<Omit<ImageBackgroundProps, 'source'>> { }

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
  | 'resizeMode'
  | 'bool'
  | 'distanceVector'
  | 'text'
  | 'area'
  | 'binaryData'
  | 'ISOLatin1EncodedText'
  | 'marker'

type Shape = { [key: string]: Input }

export function registerFilter<Config>(
  name: string,
  shape: Shape,
  transform: (config: Config) => object
): React.FC<ViewProps & Config>
