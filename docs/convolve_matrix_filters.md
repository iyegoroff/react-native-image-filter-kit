# Convolve matrix filters

- [ConvolveMatrix3x3](#ConvolveMatrix3x3)
- [ConvolveMatrix5x5](#ConvolveMatrix5x5)
- [EdgeDetection](#EdgeDetection)
- [Emboss](#Emboss)
- [FuzzyGlass](#FuzzyGlass)
- [Sharpen](#Sharpen)

-----

#### ConvolveMatrix3x3

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>image</td>
    <td>Image | ImageFilter</td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>matrix</td>
    <td>number[]</td>
    <td>
<pre>
[0, 0, 0,
 0, 1, 0,
 0, 0, 0]
</pre>
    </td>
  <td>
    <a href="https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution3X3">docs</a>
  </td>
  </tr>
</table>

***

#### ConvolveMatrix5x5

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>image</td>
    <td>Image | ImageFilter</td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>matrix</td>
    <td>number[]</td>
    <td>
<pre>
[0, 0, 0, 0, 0,
 0, 0, 0, 0, 0,
 0, 0, 1, 0, 0,
 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0]
</pre>
    </td>
    <td>
      <a href="https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIConvolution5x5">docs</a>
    </td>
  </tr>
</table>

***

#### EdgeDetection

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>image</td>
    <td>Image | ImageFilter</td>
    <td>-</td>
    <td></td>
  </tr>
</table>

***

#### Emboss

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>image</td>
    <td>Image | ImageFilter</td>
    <td>-</td>
    <td></td>
  </tr>
</table>

***

#### FuzzyGlass

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>image</td>
    <td>Image | ImageFilter</td>
    <td>-</td>
    <td></td>
  </tr>
</table>

***

#### Sharpen

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>image</td>
    <td>Image | ImageFilter</td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>amount</td>
    <td>number</td>
    <td>1</td>
    <td>usually between -1..1</td>
  </tr>
</table>
