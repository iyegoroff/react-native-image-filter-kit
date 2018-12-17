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
    <td>object</td>
    <td>-</td>
    <td><strong>required</strong></td>
  </tr>
  <tr>
    <td>onFilteringStart</td>
    <td>(event:&nbsp;NativeSyntheticEvent<{}>)&nbsp;=>&nbsp;void</td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>onFilteringFinish</td>
    <td>(event:&nbsp;NativeSyntheticEvent<{}>)&nbsp;=>&nbsp;void</td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>onFilteringError</td>
    <td>(event:&nbsp;NativeSyntheticEvent<{&nbsp;message:&nbsp;string&nbsp;}>)&nbsp;=>&nbsp;void</td>
    <td>-</td>
    <td></td>
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
        dstResizeMode: 'CONTAIN',
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
        srcAnchor: { x: 0.5, y: 1 },
        srcPosition: { x: 0.5, y: 1 },
        srcImage: {
          name: 'Invert',
          image: {
            name: 'RadialGradientGenerator',
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

#### Distance

`number | RelativeUnit`

`Distance` can be a `number` representing actual pixels or a [RelativeUnit](#RelativeUnit) representing a value that depends on the image size

***
#### Position

`{ x: Distance; y: Distance }`

***
#### Offset

`{ x: number; y: number }`

`Offset` usually represents relative values, not actual pixels

***
#### ResizeMode

`'COVER' | 'CONTAIN' | 'STRETCH' | { width?: number; height?: number }`

`ResizeMode` is used by [blend](blend_filters.md) and [composition](composition_filters.md) filters for resizing images on a canvas. Using an object, for example, <code>{&nbsp;width:&nbsp;0.5;&nbsp;height:&nbsp;2&nbsp;}</code> means that image width will be scaled down and height scaled up two times.

***
#### RelativeUnit
Relative units are values similar to CSS [viewport units](https://css-tricks.com/fun-viewport-units/#article-header-id-0). There are 4 suffixes: 'h', 'w', 'min' and 'max'. For example `'50w'` means <i>50% of image width</i> and `'100min'` - <i>100% of minimum image dimension</i>.

***
#### Matrix
A [4x5 matrix](https://developer.android.com/reference/android/graphics/ColorMatrix) for color transformations represented by `number[]`.