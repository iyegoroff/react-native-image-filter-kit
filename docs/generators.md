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
    <td>generated image style</td>
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
    <td>generated image style</td>
  </tr>
  <tr>
    <td>colors</td>
    <td>string[]</td>
    <td>['red', 'blue']</td>
    <td></td>
  </tr>
  <tr>
    <td>stops</td>
    <td>number[]</td>
    <td>[0, 1]</td>
    <td></td>
  </tr>
  <tr>
    <td>start</td>
    <td><a href="types.md#Position">Position</a></td>
    <td>{ x: 0, y: '0h' }</td>
    <td></td>
  </tr>
  <tr>
    <td>end</td>
    <td><a href="types.md#Position">Position</a></td>
    <td>{ x: 0, y: '0h' }</td>
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
    <td>generated image style</td>
  </tr>
  <tr>
    <td>colors</td>
    <td>string[]</td>
    <td>['red', 'blue']</td>
    <td></td>
  </tr>
  <tr>
    <td>stops</td>
    <td>number[]</td>
    <td>[0, 1]</td>
    <td></td>
  </tr>
  <tr>
    <td>center</td>
    <td><a href="types.md#Position">Position</a></td>
    <td>{ x: '50w', y: '50h' }</td>
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
    <td>generated image style</td>
  </tr>
  <tr>
    <td>colors</td>
    <td>string[]</td>
    <td>['red', 'blue']</td>
    <td></td>
  </tr>
  <tr>
    <td>stops</td>
    <td>number[]</td>
    <td>[0, 1]</td>
    <td></td>
  </tr>
  <tr>
    <td>center</td>
    <td><a href="types.md#Position">Position</a></td>
    <td>{ x: '50w', y: '50h' }</td>
    <td></td>
  </tr>
</table>
