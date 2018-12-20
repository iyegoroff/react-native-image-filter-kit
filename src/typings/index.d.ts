import React from 'react';
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

interface ColorGeneratorConfig extends CommonConfig {
  readonly color: string
}

type Config =
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

export class ImageFilter extends React.Component<ImageFilterProps<{ readonly config: Config }>> { }
export class ColorMatrix extends React.Component<ImageFilterProps<ColorMatrixConfig>> { }
export class Normal extends React.Component<ImageFilterProps<CommonConfig>> { }
export class RGBA extends React.Component<ImageFilterProps<RGBAConfig>> { }
export class Saturate extends React.Component<ImageFilterProps<CommonConfig>> { }
export class HueRotate extends React.Component<ImageFilterProps<AmountConfig>> { }
export class LuminanceToAlpha extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Invert extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Grayscale extends React.Component<ImageFilterProps<AmountConfig>> { }
export class Sepia extends React.Component<ImageFilterProps<AmountConfig>> { }
export class Nightvision extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Warm extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Cool extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Brightness extends React.Component<ImageFilterProps<AmountConfig>> { }
export class Contrast extends React.Component<ImageFilterProps<AmountConfig>> { }
export class Temperature extends React.Component<ImageFilterProps<AmountConfig>> { }
export class Tint extends React.Component<ImageFilterProps<AmountConfig>> { }
export class Threshold extends React.Component<ImageFilterProps<AmountConfig>> { }
export class Technicolor extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Polaroid extends React.Component<ImageFilterProps<CommonConfig>> { }
export class ToBGR extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Kodachrome extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Browni extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Vintage extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Night extends React.Component<ImageFilterProps<AmountConfig>> { }
export class Predator extends React.Component<ImageFilterProps<AmountConfig>> { }
export class Lsd extends React.Component<ImageFilterProps<CommonConfig>> { }
export class ColorTone extends React.Component<ImageFilterProps<ColorToneConfig>> { }
export class DuoTone extends React.Component<ImageFilterProps<DuoToneConfig>> { }
export class Protanomaly extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Deuteranomaly extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Tritanomaly extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Protanopia extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Deuteranopia extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Tritanopia extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Achromatopsia extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Achromatomaly extends React.Component<ImageFilterProps<CommonConfig>> { }
export class ConvolveMatrix3x3 extends React.Component<ImageFilterProps<ConvolveMatrix3x3Config>> { }
export class ConvolveMatrix5x5 extends React.Component<ImageFilterProps<ConvolveMatrix5x5Config>> { }
export class Sharpen extends React.Component<ImageFilterProps<AmountConfig>> { }
export class EdgeDetection extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Emboss extends React.Component<ImageFilterProps<CommonConfig>> { }
export class FuzzyGlass extends React.Component<ImageFilterProps<CommonConfig>> { }
export class BoxBlur extends React.Component<ImageFilterProps<BlurConfig>> { }
export class GaussianBlur extends React.Component<ImageFilterProps<BlurConfig>> { }
export class PlusBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class DarkenBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class LightenBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class ModulateBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class OverlayBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class ScreenBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class ColorDodgeBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class ExclusionBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class ColorBurnBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class SoftLightBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class HueBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class ColorBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class SaturationBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class LuminosityBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class DifferenceBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class HardLightBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class MultiplyBlend extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class PlusBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class DarkenBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class LightenBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class ModulateBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class OverlayBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class ScreenBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class ColorDodgeBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class ExclusionBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class ColorBurnBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class SoftLightBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class HueBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class ColorBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class SaturationBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class LuminosityBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class DifferenceBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class HardLightBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class MultiplyBlendColor extends React.Component<ImageFilterProps<BlendColorConfig>> { }
export class DstATopComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class DstInComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class DstOutComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class DstOverComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class SrcATopComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class SrcInComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class SrcOutComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class SrcOverComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class XorComposition extends React.Component<ImageFilterProps<CompositionConfig>> { }
export class _1977 extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Aden extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Brannan extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Brooklyn extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Clarendon extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Earlybird extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Gingham extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Hudson extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Inkwell extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Kelvin extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Lark extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Lofi extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Maven extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Mayfair extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Moon extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Nashville extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Perpetua extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Reyes extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Rise extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Slumber extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Stinson extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Toaster extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Valencia extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Walden extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Willow extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Xpro2 extends React.Component<ImageFilterProps<CommonConfig>> { }
export class _1977Compat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class AdenCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class BrannanCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class BrooklynCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class ClarendonCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class EarlybirdCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class GinghamCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class HudsonCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class InkwellCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class KelvinCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class LarkCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class LofiCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class MavenCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class MayfairCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class MoonCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class NashvilleCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class PerpetuaCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class ReyesCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class RiseCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class SlumberCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class StinsonCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class ToasterCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class ValenciaCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class WaldenCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class WillowCompat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class Xpro2Compat extends React.Component<ImageFilterProps<CommonConfig>> { }
export class ColorGenerator extends React.Component<ImageFilterProps<ColorGeneratorConfig>> { }
export class LinearGradientGenerator extends React.Component<ImageFilterProps<LinearGradientGeneratorConfig>> { }
export class RadialGradientGenerator extends React.Component<ImageFilterProps<RadialGradientGeneratorConfig>> { }
export class SweepGradientGenerator extends React.Component<ImageFilterProps<SweepGradientGeneratorConfig>> { }

export class ImagePlaceholder extends React.Component<Omit<ImageProps, 'source'>> {}
export class ImageBackgroundPlaceholder extends React.Component<Omit<ImageBackgroundProps, 'source'>> {}

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
