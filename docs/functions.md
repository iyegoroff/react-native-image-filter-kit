#### cleanExtractedImagesCache
```ts
function cleanExtractedImagesCache(): void
```

Removes temporary files created with `onExtractImage` [ImageFilter](types.md#ImageFilter) prop.

***
#### registerFilter
```ts
function registerFilter<Config>(
  name: string,
  shape: Shape,
  transform: (config: Config) => object
): React.FC<ViewProps & Config>
```

Should be used to create [custom filters](https://github.com/iyegoroff/react-native-image-filter-kit/blob/master/examples/CustomFilter/App.tsx).

#### [rgbaToRgb](https://github.com/iyegoroff/rgba-to-rgb)
```ts
function rgbaToRgb(RGB_background: string, RGBA_color: string): string
```

***
#### [concatColorMatrices](https://github.com/iyegoroff/concat-color-matrices)
```ts
function concatColorMatrices(matrices: Matrix[]): Matrix
```

***

## [PathStep](types.md#PathStep) generation

#### [moveTo](https://developer.android.com/reference/android/graphics/Path.html#moveTo(float,%20float))
```ts
function moveTo(x: Distance, y: Distance): PathStep
```

#### [lineTo](https://developer.android.com/reference/android/graphics/Path.html#lineTo(float,%20float))
```ts
function lineTo(x: Distance, y: Distance): PathStep
```

#### [quadTo](https://developer.android.com/reference/android/graphics/Path#quadTo(float,%20float,%20float,%20float))
```ts
function quadTo(x1: Distance, y1: Distance, x2: Distance, y2: Distance): PathStep
```

#### [cubicTo](https://developer.android.com/reference/android/graphics/Path#cubicTo(float,%20float,%20float,%20float,%20float,%20float))
```ts
function cubicTo(
  x1: Distance,
  y1: Distance,
  x2: Distance,
  y2: Distance,
  x3: Distance,
  y3: Distance
): PathStep
```

#### [closePath](https://developer.android.com/reference/android/graphics/Path.html#close())
```ts
function closePath(): PathStep
```

***

## [Color matrices](https://github.com/iyegoroff/rn-color-matrices)

#### normal
```ts
function normal(): Matrix
```
#### rgba
```ts
function rgba(
  red: number = 1,
  green: number = 1,
  blue: number = 1,
  alpha: number = 1
): Matrix
```
#### saturate
```ts
function saturate(amount: number = 1): Matrix
```
#### hueRotate
```ts
function hueRotate(amount: number = 0): Matrix
```
#### luminanceToAlpha
```ts
function luminanceToAlpha(): Matrix
```
#### invert
```ts
function invert(): Matrix
```
#### grayscale
```ts
function grayscale(amount: number = 1): Matrix
```
#### sepia
```ts
function sepia(amount: number = 1): Matrix
```
#### nightvision
```ts
function nightvision(): Matrix
```
#### warm
```ts
function warm(): Matrix
```
#### cool
```ts
function cool(): Matrix
```
#### brightness
```ts
function brightness(amount: number = 1): Matrix
```
#### contrast
```ts
function contrast(amount: number = 1): Matrix
```
#### temperature
```ts
function temperature(amount: number = 1): Matrix
```
#### tint
```ts
function tint(amount: number = 0): Matrix
```
#### threshold
```ts
function threshold(amount: number = 0): Matrix
```
#### technicolor
```ts
function technicolor(): Matrix
```
#### polaroid
```ts
function polaroid(): Matrix
```
#### toBGR
```ts
function toBGR(): Matrix
```
#### kodachrome
```ts
function kodachrome(): Matrix
```
#### browni
```ts
function browni(): Matrix
```
#### vintage
```ts
function vintage(): Matrix
```
#### night
```ts
function night(amount: number = 0.1): Matrix
```
#### predator
```ts
function predator(amount: number = 1): Matrix
```
#### lsd
```ts
function lsd(): Matrix
```
#### colorTone
```ts
function colorTone(
  desaturation: number = 0.2,
  toned: number = 0.15,
  lightColor: string = "#FFE580",
  darkColor: string = "#338000"
): Matrix
```
#### duoTone
```ts
function duoTone(
  firstColor: string = "#FFE580",
  secondColor: string = "#338000"
): Matrix
```
#### protanomaly
```ts
function protanomaly(): Matrix
```
#### deuteranomaly
```ts
function deuteranomaly(): Matrix
```
#### tritanomaly
```ts
function tritanomaly(): Matrix
```
#### protanopia
```ts
function protanopia(): Matrix
```
#### deuteranopia
```ts
function deuteranopia(): Matrix
```
#### tritanopia
```ts
function tritanopia(): Matrix
```
#### achromatopsia
```ts
function achromatopsia(): Matrix
```
#### achromatomaly
```ts
function achromatomaly(): Matrix
```
