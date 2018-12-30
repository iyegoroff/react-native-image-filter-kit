# Generators

- [Color](#Color)
- [LinearGradient](#LinearGradient)
- [RadialGradient](#RadialGradient)
- [SweepGradient](#SweepGradient)
- [TextImage](#TextImage)
----
- [Setting the size of generated image](#Setting-the-size-of-generated-image)

---

#### Color

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>image</td>
    <td><a href="types.md#Filterable">Filterable</a></td>
    <td>&lt;ImagePlaceholder&nbsp;/&gt;</td>
    <td>usually <a href="types.md#ImagePlaceholder">ImagePlaceholder</a> or <a href="types.md#ImageBackgroundPlaceholder">ImageBackgroundPlaceholder</a></td>
  </tr>
  <tr>
    <td>color</td>
    <td>string</td>
    <td>-</td>
    <td></td>
  </tr>
</table>

***

#### LinearGradient

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>image</td>
    <td><a href="types.md#Filterable">Filterable</a></td>
    <td>&lt;ImagePlaceholder&nbsp;/&gt;</td>
    <td>usually <a href="types.md#ImagePlaceholder">ImagePlaceholder</a> or <a href="types.md#ImageBackgroundPlaceholder">ImageBackgroundPlaceholder</a></td>
  </tr>
  <tr>
    <td>colors</td>
    <td>string[]</td>
    <td>['red',&nbsp;'blue']</td>
    <td>up to 10 colors</td>
  </tr>
  <tr>
    <td>stops</td>
    <td>number[]</td>
    <td>[0,&nbsp;1]</td>
    <td></td>
  </tr>
  <tr>
    <td>start</td>
    <td><a href="types.md#Position">Position</a></td>
    <td>{&nbsp;x:&nbsp;0,&nbsp;y:&nbsp;'0h'&nbsp;}</td>
    <td></td>
  </tr>
  <tr>
    <td>end</td>
    <td><a href="types.md#Position">Position</a></td>
    <td>{&nbsp;x:&nbsp;'100w',&nbsp;y:&nbsp;'0h'&nbsp;}</td>
    <td></td>
  </tr>
</table>

***

#### RadialGradient

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>image</td>
    <td><a href="types.md#Filterable">Filterable</a></td>
    <td>&lt;ImagePlaceholder&nbsp;/&gt;</td>
    <td>usually <a href="types.md#ImagePlaceholder">ImagePlaceholder</a> or <a href="types.md#ImageBackgroundPlaceholder">ImageBackgroundPlaceholder</a></td>
  </tr>
  <tr>
    <td>colors</td>
    <td>string[]</td>
    <td>['red',&nbsp;'blue']</td>
    <td>up to 10 colors</td>
  </tr>
  <tr>
    <td>stops</td>
    <td>number[]</td>
    <td>[0,&nbsp;1]</td>
    <td></td>
  </tr>
  <tr>
    <td>center</td>
    <td><a href="types.md#Position">Position</a></td>
    <td>{&nbsp;x:&nbsp;'50w',&nbsp;y:&nbsp;'50h'&nbsp;}</td>
    <td></td>
  </tr>
  <tr>
    <td>radius</td>
    <td><a href="types.md#Distance">Distance</a></td>
    <td>'50min'</td>
    <td></td>
  </tr>
</table>

***

#### SweepGradient

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>image</td>
    <td><a href="types.md#Filterable">Filterable</a></td>
    <td>&lt;ImagePlaceholder&nbsp;/&gt;</td>
    <td>usually <a href="types.md#ImagePlaceholder">ImagePlaceholder</a> or <a href="types.md#ImageBackgroundPlaceholder">ImageBackgroundPlaceholder</a></td>
  </tr>
  <tr>
    <td>colors</td>
    <td>string[]</td>
    <td>['red',&nbsp;'blue']</td>
    <td>up to 10 colors</td>
  </tr>
  <tr>
    <td>stops</td>
    <td>number[]</td>
    <td>[0,&nbsp;1]</td>
    <td></td>
  </tr>
  <tr>
    <td>center</td>
    <td><a href="types.md#Position">Position</a></td>
    <td>{&nbsp;x:&nbsp;'50w',&nbsp;y:&nbsp;'50h'&nbsp;}</td>
    <td></td>
  </tr>
</table>

***

#### TextImage

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>image</td>
    <td><a href="types.md#Filterable">Filterable</a></td>
    <td>&lt;ImagePlaceholder&nbsp;/&gt;</td>
    <td>usually <a href="types.md#ImagePlaceholder">ImagePlaceholder</a> or <a href="types.md#ImageBackgroundPlaceholder">ImageBackgroundPlaceholder</a></td>
  </tr>
  <tr>
    <td>text</td>
    <td>string</td>
    <td>-</td>
    <td><strong>required</strong></td>
  </tr>
  <tr>
    <td>fontName</td>
    <td>string</td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>fontSize</td>
    <td>number</td>
    <td>16</td>
    <td></td>
  </tr>
  <tr>
    <td>color</td>
    <td>string</td>
    <td>'black'</td>
    <td></td>
  </tr>
</table>

***

## Setting the size of generated image
Three options available:
- setting the size via `style` prop
  ```ts
  <LinearGradient style={{ width: 320, height: 320 }} />
  ```
- setting the size directly for placeholder image
  ```ts
  <LinearGradient
    image={
      <ImageBackgroundPlaceholder style={{ width: 320, height: 320 }} />
    }
  />
  ```
- when used inside [blend](blend_filters.md) or [composition](composition_filters.md), size can be specified by `resizeCanvasTo` prop
  ```ts
  <PlusBlend
    resizeCanvasTo={'dstImage'}
    dstImage={<Image source={require('./parrot.png')} />}
    srcImage={<LinearGradient />}
  />
  ```