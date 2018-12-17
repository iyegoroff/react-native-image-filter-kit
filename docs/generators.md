# Generators

- [ColorGenerator](#ColorGenerator)
- [LinearGradientGenerator](#LinearGradientGenerator)
- [RadialGradientGenerator](#RadialGradientGenerator)
- [SweepGradientGenerator](#SweepGradientGenerator)

---

#### ColorGenerator

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>imageStyle</td>
    <td>ImageStyle</td>
    <td>-</td>
    <td><strong>required</strong> unless used inside <a href="blend_filters.md">blend</a> or <a href="composition_filters.md">composition</a> filter with <code>resizeCanvasTo</code> prop pointing to another image</td>
  </tr>
  <tr>
    <td>color</td>
    <td>string</td>
    <td>-</td>
    <td></td>
  </tr>
</table>

***

#### LinearGradientGenerator

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>imageStyle</td>
    <td>ImageStyle</td>
    <td>-</td>
    <td><strong>required</strong> unless used inside <a href="blend_filters.md">blend</a> or <a href="composition_filters.md">composition</a> filter with <code>resizeCanvasTo</code> prop pointing to another image</td>
  </tr>
  <tr>
    <td>colors</td>
    <td>string[]</td>
    <td>['red',&nbsp;'blue']</td>
    <td></td>
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

#### RadialGradientGenerator

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>imageStyle</td>
    <td>ImageStyle</td>
    <td>-</td>
    <td><strong>required</strong> unless used inside <a href="blend_filters.md">blend</a> or <a href="composition_filters.md">composition</a> filter with <code>resizeCanvasTo</code> prop pointing to another image</td>
  </tr>
  <tr>
    <td>colors</td>
    <td>string[]</td>
    <td>['red',&nbsp;'blue']</td>
    <td></td>
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

#### SweepGradientGenerator

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>imageStyle</td>
    <td>ImageStyle</td>
    <td>-</td>
    <td><strong>required</strong> unless used inside <a href="blend_filters.md">blend</a> or <a href="composition_filters.md">composition</a> filter with <code>resizeCanvasTo</code> prop pointing to another image</td>
  </tr>
  <tr>
    <td>colors</td>
    <td>string[]</td>
    <td>['red',&nbsp;'blue']</td>
    <td></td>
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
