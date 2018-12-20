# Blend filters

## Image blends

- ColorBlend
- ​ColorBurnBlend
- ​ColorDodgeBlend
- ​DarkenBlend
- ​DifferenceBlend
- ​ExclusionBlend
- ​HardLightBlend
- ​HueBlend
- ​LightenBlend
- ​LuminosityBlend
- ​ModulateBlend
- ​MultiplyBlend
- ​OverlayBlend
- ​PlusBlend
- ​SaturationBlend
- ​ScreenBlend
- ​SoftLightBlend

All image blends have the same props

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>dstImage</td>
    <td><a href="types.md#Filterable">Filterable</a></td>
    <td>-</td>
    <td><strong>required</strong></td>
  </tr>
  <tr>
    <td>dstAnchor</td>
    <td><a href="types.md#Offset">Offset</a></td>
    <td>{&nbsp;x:&nbsp;0.5,&nbsp;y:&nbsp;0.5&nbsp;}</td>
    <td>dst image anchor, relative to dst image size</td>
  </tr>
  <tr>
    <td>dstPosition</td>
    <td><a href="types.md#Offset">Offset</a></td>
    <td>{&nbsp;x:&nbsp;0.5,&nbsp;y:&nbsp;0.5&nbsp;}</td>
    <td>dst image position, relative to canvas size</td>
  </tr>
  <tr>
    <td>dstResizeMode</td>
    <td><a href="types.md#ResizeMode">ResizeMode</a></td>
    <td>'COVER'</td>
    <td></td>
  </tr>
  <tr>
    <td>srcImage</td>
    <td><a href="types.md#Filterable">Filterable</a></td>
    <td>-</td>
    <td><strong>required</strong></td>
  </tr>
  <tr>
    <td>srcAnchor</td>
    <td><a href="types.md#Offset">Offset</a></td>
    <td>{&nbsp;x:&nbsp;0.5,&nbsp;y:&nbsp;0.5&nbsp;}</td>
    <td>src image anchor, relative to src image size</td>
  </tr>
  <tr>
    <td>srcPosition</td>
    <td><a href="types.md#Offset">Offset</a></td>
    <td>{&nbsp;x:&nbsp;0.5,&nbsp;y:&nbsp;0.5&nbsp;}</td>
    <td>src image position, relative to canvas size</td>
  </tr>
  <tr>
    <td>srcResizeMode</td>
    <td><a href="types.md#ResizeMode">ResizeMode</a></td>
    <td>'COVER'</td>
    <td></td>
  </tr>
  <tr>
    <td>resizeCanvasTo</td>
    <td>'dstImage'&nbsp;|&nbsp;'srcImage'</td>
    <td>-</td>
    <td>
      can be used when one image is created by a <a href="generators.md">Generator</a> to specify that canvas size is equal to another image size
    </td>
  </tr>
</table>

## Color blends

- ColorBlendColor
- ​ColorBurnBlendColor
- ​ColorDodgeBlendColor
- ​DarkenBlendColor
- ​DifferenceBlendColor
- ​ExclusionBlendColor
- ​HardLightBlendColor
- ​HueBlendColor
- ​LightenBlendColor
- ​LuminosityBlendColor
- ​ModulateBlendColor
- ​MultiplyBlendColor
- ​OverlayBlendColor
- ​PlusBlendColor
- ​SaturationBlendColor
- ​ScreenBlendColor
- ​SoftLightBlendColor

All color blends have the same props

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>dstImage</td>
    <td><a href="types.md#Filterable">Filterable</a></td>
    <td>-</td>
    <td><strong>required</strong></td>
  </tr>
  <tr>
    <td>srcColor</td>
    <td>string</td>
    <td>-</td>
    <td><strong>required</a></td>
  </tr>
</table>