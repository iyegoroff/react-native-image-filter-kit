# Color matrix filters

## Common

- [Brightness](#Brightness)
- [Browni](#Browni)
- [ColorMatrix](#ColorMatrix)
- [ColorTone](#ColorTone)
- [Contrast](#Contrast)
- [Cool](#Cool)
- [DuoTone](#DuoTone)
- [Grayscale](#Grayscale)
- [HueRotate](#HueRotate)
- [Invert](#Invert)
- [Kodachrome](#Kodachrome)
- [Lsd](#Lsd)
- [LuminanceToAlpha](#LuminanceToAlpha)
- [Night](#Night)
- [Nightvision](#Nightvision)
- [Normal](#Normal)
- [Polaroid](#Polaroid)
- [Predator](#Predator)
- [RGBA](#RGBA)
- [Saturate](#Saturate)
- [Sepia](#Sepia)
- [Technicolor](#Technicolor)
- [Temperature](#Temperature)
- [Threshold](#Threshold)
- [Tint](#Tint)
- [ToBGR](#ToBGR)
- [Vintage](#Vintage)
- [Warm](#Warm)

## Color blindness

 - [Achromatomaly](#Achromatomaly)
 - [Achromatopsia](#Achromatopsia)
 - [Deuteranomaly](#Deuteranomaly)
 - [Deuteranopia](#Deuteranopia)
 - [Protanomaly](#Protanomaly)
 - [Protanopia](#Protanopia)
 - [Tritanomaly](#Tritanomaly)
 - [Tritanopia](#Tritanopia)

-----

#### Brightness

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
    <td>target image</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>scalar</td>
    <td>1</td>
    <td>usually between 0..10</td>
  </tr>
</table>

***

#### Browni

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
    <td>target image</td>
  </tr>
</table>

***

#### ColorMatrix

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
    <td>target image</td>
  </tr>
  <tr>
    <td>matrix</td>
    <td>number[]</td>
    <td>-</td>
    <td><a href="https://developer.android.com/reference/android/graphics/ColorMatrix" >4x5 color matrix</a></td>
  </tr>
</table>

***

#### ColorTone

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
    <td>target image</td>
  </tr>
  <tr>
    <td>desaturation</td>
    <td>number</td>
    <td>0.2</td>
    <td></td>
  </tr>
  <tr>
    <td>toned</td>
    <td>number</td>
    <td>0.25</td>
    <td></td>
  </tr>
  <tr>
    <td>lightColor</td>
    <td>string</td>
    <td>"#FFE580"</td>
    <td>color</td>
  </tr>
  <tr>
    <td>darkColor</td>
    <td>string</td>
    <td>"#338000"</td>
    <td>color</td>
  </tr>
</table>

***

#### Contrast

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
    <td>target image</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>scalar</td>
    <td>1</td>
    <td>usually between -10..10</td>
  </tr>
</table>

***

#### Cool

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
    <td>target image</td>
  </tr>
</table>

***

#### DuoTone

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
    <td>target image</td>
  </tr>
  <tr>
    <td>firstColor</td>
    <td>string</td>
    <td>"#FFE580"</td>
    <td>color</td>
  </tr>
  <tr>
    <td>secondColor</td>
    <td>string</td>
    <td>"#338000"</td>
    <td>color</td>
  </tr>
</table>

***

#### Grayscale

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
    <td>target image</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>scalar</td>
    <td>1</td>
    <td>between 0..1</td>
  </tr>
</table>

***

#### HueRotate

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
    <td>target image</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>scalar</td>
    <td>0</td>
    <td>angle in radians</td>
  </tr>
</table>

***

#### Invert

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
    <td>target image</td>
  </tr>
</table>

***

#### Kodachrome

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
    <td>target image</td>
  </tr>
</table>

***

#### Lsd

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
    <td>target image</td>
  </tr>
</table>

***

#### LuminanceToAlpha

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
    <td>target image</td>
  </tr>
</table>

***

#### Night

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
    <td>target image</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>scalar</td>
    <td>0.1</td>
    <td>usually between 0..1</td>
  </tr>
</table>

***

#### Nightvision

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
    <td>target image</td>
  </tr>
</table>

***

#### Normal

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
    <td>target image</td>
  </tr>
</table>

***

#### Polaroid

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
    <td>target image</td>
  </tr>
</table>

***

#### Predator

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
    <td>target image</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>scalar</td>
    <td>1</td>
    <td>usually between 0..1</td>
  </tr>
</table>

***

#### RGBA

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
    <td>target image</td>
  </tr>
  <tr>
    <td>red</td>
    <td>scalar</td>
    <td>1</td>
    <td>between 0..1</td>
  </tr>
  <tr>
    <td>green</td>
    <td>scalar</td>
    <td>1</td>
    <td>between 0..1</td>
  </tr>
  <tr>
    <td>blue</td>
    <td>scalar</td>
    <td>1</td>
    <td>between 0..1</td>
  </tr>
  <tr>
    <td>alpha</td>
    <td>scalar</td>
    <td>1</td>
    <td>between 0..1</td>
  </tr>
</table>

***

#### Saturate

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
    <td>target image</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>scalar</td>
    <td>1</td>
    <td>usually between -10..10</td>
  </tr>
</table>

***

#### Sepia

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
    <td>target image</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>scalar</td>
    <td>1</td>
    <td>between 0..1</td>
  </tr>
</table>

***

#### Technicolor

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
    <td>target image</td>
  </tr>
</table>

***

#### Temperature

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
    <td>target image</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>scalar</td>
    <td>1</td>
    <td>usually between -10..10</td>
  </tr>
</table>

***

#### Threshold

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
    <td>target image</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>scalar</td>
    <td>0</td>
    <td>usually between 0..20</td>
  </tr>
</table>

***

#### Tint

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
    <td>target image</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>scalar</td>
    <td>0</td>
    <td>usually between -1..1</td>
  </tr>
</table>

***

#### ToBGR

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
    <td>target image</td>
  </tr>
</table>

***

#### Vintage

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
    <td>target image</td>
  </tr>
</table>

***

#### Warm

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
    <td>target image</td>
  </tr>
</table>

-----

***

#### Achromatomaly

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
    <td>target image</td>
  </tr>
</table>

***

#### Achromatopsia

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
    <td>target image</td>
  </tr>
</table>

***

#### Deuteranomaly

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
    <td>target image</td>
  </tr>
</table>

***

#### Deuteranopia

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
    <td>target image</td>
  </tr>
</table>

***

#### Protanomaly

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
    <td>target image</td>
  </tr>
</table>

***

#### Protanopia

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
    <td>target image</td>
  </tr>
</table>

***

#### Tritanomaly

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
    <td>target image</td>
  </tr>
</table>

***

#### Tritanopia

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
    <td>target image</td>
  </tr>
</table>
