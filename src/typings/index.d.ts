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

type PathStep = never

type Path = ReadonlyArray<PathStep>

export type Filterable<Rest> = React.ReactElement<unknown> | Config<Rest>

interface CacheableConfig {
  /** Should be used only when defining custom filters */
  readonly disableCache?: boolean
}

interface CommonConfig<Rest = never> extends CacheableConfig {
  readonly image: Filterable<Rest>
}

interface ColorMatrixConfig<Rest = never> extends CommonConfig<Rest> {
  readonly matrix: Matrix
}

interface RGBAConfig<Rest = never> extends CommonConfig<Rest> {
  readonly red?: number
  readonly green?: number
  readonly blue?: number
  readonly alpha?: number
}

interface AmountConfig<Rest = never> extends CommonConfig<Rest> {
  readonly amount?: number
}

interface ColorToneConfig<Rest = never> extends CommonConfig<Rest> {
  readonly desaturation?: number
  readonly toned?: number
  readonly lightColor?: string
  readonly darkColor?: string
}

interface DuoToneConfig<Rest = never> extends CommonConfig<Rest> {
  readonly firstColor?: string
  readonly secondColor?: string
}

interface ConvolveMatrix3x3Config<Rest = never> extends CommonConfig<Rest> {
  readonly matrix?: [
    number, number, number,
    number, number, number,
    number, number, number
  ]
}

interface ConvolveMatrix5x5Config<Rest = never> extends CommonConfig<Rest> {
  readonly matrix?: [
    number, number, number, number, number,
    number, number, number, number, number,
    number, number, number, number, number,
    number, number, number, number, number,
    number, number, number, number, number
  ]
}

interface BlurConfig<Rest = never> extends CommonConfig<Rest> {
  readonly radius?: number
}

interface CompositionConfig<Rest = never> extends CacheableConfig {
  readonly dstImage: Filterable<Rest>
  readonly dstAnchor?: Offset
  readonly dstPosition?: Offset
  readonly dstResizeMode?: ResizeMode
  readonly srcImage: Filterable<Rest>
  readonly srcAnchor?: Offset
  readonly srcPosition?: Offset
  readonly srcResizeMode?: ResizeMode
  readonly resizeCanvasTo?: 'dstImage' | 'srcImage'
}

interface BlendColorConfig<Rest = never> extends CacheableConfig {
  readonly dstImage: Filterable<Rest>
  readonly srcColor: string
  /** Should be used only when defining custom filters */
  readonly disableIntermediateCaches?: boolean
}

interface GradientConfig<Rest> extends Partial<CommonConfig<Rest>> {
  readonly colors?: [
    string, string?, string?, string?, string?, string?, string?, string?, string?, string?
  ]
  readonly stops?: [
    number, number?, number?, number?, number?, number?, number?, number?, number?, number?
  ]
}

interface LinearGradientConfig<Rest = never> extends GradientConfig<Rest> {
  readonly start?: Position
  readonly end?: Position
}

interface RadialGradientConfig<Rest = never> extends GradientConfig<Rest> {
  readonly center?: Position
  readonly radius?: Distance
}

interface SweepGradientConfig<Rest = never> extends GradientConfig<Rest> {
  readonly center?: Position
}

interface ColorConfig<Rest = never> extends Partial<CommonConfig<Rest>> {
  readonly color: string
}

interface TextImageConfig<Rest = never> extends CommonConfig<Rest> {
  readonly text: string
  readonly fontName?: string
  readonly fontSize?: number
  readonly color?: string
}

interface ShapeConfig<Rest = never> extends CommonConfig<Rest> {
  readonly color?: string
}

interface CircleShapeConfig<Rest = never> extends ShapeConfig<Rest> {
  readonly radius?: Distance
}

interface OvalShapeConfig<Rest = never> extends ShapeConfig<Rest> {
  readonly radiusX?: Distance
  readonly radiusY?: Distance
  readonly rotation?: number
}

interface PathShapeConfig<Rest = never> extends ShapeConfig<Rest> {
  readonly path: Path
  readonly rotation?: number
}

interface RegularPolygonShapeConfig<Rest = never> extends ShapeConfig<Rest> {
  readonly borderRadiuses?: ReadonlyArray<Distance>
  readonly circumradius?: Distance
  readonly rotation?: number
}

interface ConfigWithIntermediates<Rest = never> extends CommonConfig<Rest> {
  /** Should be used only when defining custom filters */
  readonly disableIntermediateCaches?: boolean
}

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
  | ConfigCase<'SweepGradient', SweepGradientConfig<Rest>>
  | ConfigCase<'TextImage', TextImageConfig<Rest>>
  | ConfigCase<'CircleShape', CircleShapeConfig<Rest>>
  | ConfigCase<'OvalShape', OvalShapeConfig<Rest>>
  | ConfigCase<'PathShape', PathShapeConfig<Rest>>
  | ConfigCase<'RegularPolygonShape', RegularPolygonShapeConfig<Rest>>
  | Rest

export type ImageFilterProps<Rest> = ViewProps & Rest & {
  readonly onFilteringStart?: (event: NativeSyntheticEvent<{}>) => void
  readonly onFilteringFinish?: (event: NativeSyntheticEvent<{}>) => void
  readonly onFilteringError?: (event: NativeSyntheticEvent<{ message: string }>) => void
  readonly clearCachesMaxRetries?: number
}

export declare class GenericImageFilter<Rest>
  extends React.Component<ImageFilterProps<{ readonly config: Config<Rest> }>> { }

export declare class ImageFilter extends GenericImageFilter<never> { }

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
export declare class EdgeDetection extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
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
export declare class _1977 extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Aden extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Brannan extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Brooklyn extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Clarendon extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Earlybird extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Gingham extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Hudson extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Inkwell extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Kelvin extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Lark extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Lofi extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Maven extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Mayfair extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Moon extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Nashville extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Perpetua extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Reyes extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Rise extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Slumber extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Stinson extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Toaster extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Valencia extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Walden extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Willow extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Xpro2 extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class _1977Compat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class AdenCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class BrannanCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class BrooklynCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class ClarendonCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class EarlybirdCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class GinghamCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class HudsonCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class InkwellCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class KelvinCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class LarkCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class LofiCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class MavenCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class MayfairCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class MoonCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class NashvilleCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class PerpetuaCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class ReyesCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class RiseCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class SlumberCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class StinsonCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class ToasterCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class ValenciaCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class WaldenCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class WillowCompat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Xpro2Compat extends React.Component<ImageFilterProps<ConfigWithIntermediates>> { }
export declare class Color extends React.Component<ImageFilterProps<ColorConfig>> { }
export declare class LinearGradient extends React.Component<ImageFilterProps<LinearGradientConfig>> { }
export declare class RadialGradient extends React.Component<ImageFilterProps<RadialGradientConfig>> { }
export declare class SweepGradient extends React.Component<ImageFilterProps<SweepGradientConfig>> { }
export declare class TextImage extends React.Component<ImageFilterProps<TextImageConfig>> { }
export declare class CircleShape extends React.Component<ImageFilterProps<CircleShapeConfig>> { }
export declare class OvalShape extends React.Component<ImageFilterProps<OvalShapeConfig>> { }
export declare class PathShape extends React.Component<ImageFilterProps<PathShapeConfig>> { }
export declare class RegularPolygonShape extends React.Component<ImageFilterProps<RegularPolygonShapeConfig>> { }

export declare class ImagePlaceholder extends React.Component<Omit<ImageProps, 'source'>> { }
export declare class ImageBackgroundPlaceholder extends React.Component<Omit<ImageBackgroundProps, 'source'>> { }

export function degToRad(deg: number): number
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
  | 'path'

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
