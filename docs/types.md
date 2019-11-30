#### ImageFilter

This is the main filter component, all other filters like `ColorMatrix`, `BoxBlur` etc. are just `ImageFilter` wrappers.

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>config</td>
    <td><a href="https://github.com/iyegoroff/react-native-image-filter-kit/blob/master/src/typings/index.d.ts#L173">Config</a></td>
    <td>-</td>
    <td><strong>required</strong></td>
  </tr>
  <tr>
    <td>onFilteringStart</td>
    <td>(event:&nbsp;NativeSyntheticEvent<{<br/>}>)&nbsp;=>&nbsp;void</td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>onFilteringFinish</td>
    <td>(event:&nbsp;NativeSyntheticEvent<{<br/>}>)&nbsp;=>&nbsp;void</td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>onFilteringError</td>
    <td>(event:&nbsp;NativeSyntheticEvent<{<br/>&nbsp;&nbsp;message:&nbsp;string<br/>}>)&nbsp;=>&nbsp;void</td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>onExtractImage</td>
    <td>(event:&nbsp;NativeSyntheticEvent<{<br/>&nbsp;&nbsp;uri:&nbsp;string<br/>}>)&nbsp;=>&nbsp;void</td>
    <td>-</td>
    <td>
    Returns path to a temporary file inside cache folder that contains filtering result. Triggers when
    <code>extractImageEnabled</code> changes to <code>true</code>. While <code>extractImageEnabled</code>
    remains truthy <code>onExtractImage</code> will trigger every time filtering result changes.
    To delete all temporary files created this way you need to call
    <a href="functions.md#cleanExtractedImagesCache">cleanExtractedImagesCache</a> function. Since
    these files are saved to cache folder they can be removed by user or system at any time. [Usage example](https://github.com/iyegoroff/react-native-image-filter-kit/tree/master/examples/ImageExtraction#description)
    </td>
  </tr>
  <tr>
    <td>extractImageEnabled</td>
    <td>boolean</td>
    <td>-</td>
    <td>Enables <code>onExtractImage</code> event</td>
  </tr>
  <tr>
    <td>clearCachesMaxRetries</td>
    <td>number</td>
    <td>10</td>
    <td>Android only. Doesn't work by default - <a href="../README.md#Caveats">details</a></td>
  </tr>
</table>

Also supports all standard `View` props.

<details>
  <summary>Example from <a href="../README.md#Example">README</a> written with <code>ImageFilter</code> config-approach</summary>
  <pre>
import { Image } from 'react-native';
import { ImageFilter } from 'react-native-image-filter-kit';
&nbsp;
const result = (
  &lt;ImageFilter
    config={{
      name: 'Earlybird',
      image: {
        name: 'SoftLightBlend',
        resizeCanvasTo: 'dstImage',
        dstTransform: {
          scale: 'CONTAIN'
        },
        dstImage: {
          name: 'Emboss',
          image: (
            &lt;Image
              style={{ width: 320, height: 320 }}
              source={require('./parrot.png')}
              resizeMode={'contain'}
            /&gt;
          )
        },
        srcTransform: {
          anchor: { x: 0.5, y: 1 },
          translate: { x: 0.5, y: 1 }
        },
        srcImage: {
          name: 'Invert',
          image: {
            name: 'RadialGradient',
            colors: ['rgba(0, 0, 255, 1)', '#00ff00', 'red'],
            stops: [0.25, 0.75, 1],
            center: { x: '50w', y: '100h' }
          }
        }
      }
    }}
  /&gt;
)
  </pre>
</details>

***

#### Filterable

```ts
React.ReactElement<unknown> | Config
```

Can be any `ReactElement` that has `Image` or `ImageBackground` child. Usually this is just `Image`, `ImageBackground`, `ImagePlaceholder`, `ImageBackgroundPlaceholder`, `ImageFilter` or [Config](https://github.com/iyegoroff/react-native-image-filter-kit/blob/master/src/typings/index.d.ts#L144)

***

#### ImagePlaceholder

`Image` with predefined `source` prop. Intended for use with [Generators](generators.md). Default `style` prop: <code>{&nbsp;width:&nbsp;'100%',&nbsp;height:&nbsp;'100%'&nbsp;}</code>.

***

#### ImageBackgroundPlaceholder

`ImageBackground` with predefined `source` prop. Intended for use with [Generators](generators.md). Default `style` prop: <code>{&nbsp;width:&nbsp;'100%',&nbsp;height:&nbsp;'100%'&nbsp;}</code>.

***

#### Distance

```ts
number | RelativeUnit | Expression
```

`Distance` can be a `number` representing actual pixels, a [RelativeUnit](#RelativeUnit) representing a value that depends on the image size or an [Expression](#Expression).

***
#### Position

```ts
{ x: Distance
  y: Distance }
```

***
#### Offset

```ts
{ x?: number
  y?: number }
```

`Offset` usually represents relative values, not actual pixels.

***
#### Scale

```ts
'COVER' | 'CONTAIN' | 'STRETCH' | Offset
```

`Scale` is used by [blend](blend_filters.md) and [composition](composition_filters.md) filters for resizing images on a canvas. Using an object, for example, <code>{&nbsp;x:&nbsp;0.5;&nbsp;y:&nbsp;2&nbsp;}</code> means that image width will be scaled down and height scaled up two times.

***
#### Angle

```ts
number | string
```

`Angle` can be specified with strings like `'45deg'` or `` `${Math.PI / 4}rad` ``, or with numbers as radians - `Math.PI`.

***
#### Transform

```ts
{ anchor?: Offset
  translate?: Offset
  scale?: Scale
  rotate?: Angle }
```

- `anchor` (an origin for transforms) and `Offset` `scale` are relative to image size;
- `translate` is relative to canvas size.
***
#### RelativeUnit
Relative units are values similar to CSS [viewport units](https://css-tricks.com/fun-viewport-units/#article-header-id-0). There are 4 suffixes: 'h', 'w', 'min' and 'max'. For example `'50w'` means <i>50% of image width</i> and `'100min'` - <i>100% of minimum image dimension</i>.

***
#### Expression
Expression allows to perform one arithmetic operation with numbers and relative units - `+` or `-`. Examples: <code>100w&nbsp;-&nbsp;10min</code>, <code>50max&nbsp;+&nbsp;25.5</code>, <code>10&nbsp;+&nbsp;20.5h</code>.

***
#### Matrix
A [4x5 matrix](https://developer.android.com/reference/android/graphics/ColorMatrix) for color transformations represented by `number[]`.

***
#### MixStep

```ts
'CLAMP' | 'SMOOTH'
```

Specifies a function that will be used to mix colors in gradients - `clamp` or `smoothstep`.

***
#### PathStep
An object created by [moveTo](functions.md#moveTo), [lineTo](functions.md#lineTo), [quadTo](functions.md#quadTo), [cubicTo](functions.md#cubicTo) and [closePath](functions.md#closePath) functions. Coordinate system of a path generated with array of `PathStep`s starts in the center point of image canvas:

<img src="../img/coordinates.png">
