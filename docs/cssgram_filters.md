# [CSSGram](https://github.com/una/cssgram) filters

- _1977 / _1977Compat
- Aden / AdenCompat
- Brannan / BrannanCompat
- Brooklyn / BrooklynCompat
- Clarendon / ClarendonCompat
- Earlybird / EarlybirdCompat
- Gingham / GinghamCompat
- Hudson / HudsonCompat
- Inkwell / InkwellCompat
- Kelvin / KelvinCompat
- Lark / LarkCompat
- Lofi / LofiCompat
- Maven / MavenCompat
- Mayfair / MayfairCompat
- Moon / MoonCompat
- Nashville / NashvilleCompat
- Perpetua / PerpetuaCompat
- Reyes / ReyesCompat
- Rise / RiseCompat
- Slumber / SlumberCompat
- Stinson / StinsonCompat
- Toaster / ToasterCompat
- Valencia / ValenciaCompat
- Walden / WaldenCompat
- Willow / WillowCompat
- Xpro2 / Xpro2Compat

All CSSGram filters have the same props

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>image</td>
    <td>Image&nbsp;|&nbsp;<a href="types.md#ImageFilter">ImageFilter</a></td>
    <td>-</td>
    <td><strong>required</strong></td>
  </tr>
</table>

***

The difference between normal cssgram filters and 'Compat'-ones is that normal filters concatenate color matrices before filtering and 'Compat' filters create intermediate images for each color matrix. As a result, normal filters require less memory on startup, but can produce images that are slightly different from original CSSGram filter results.

Compare the brightness of the clouds in upper left quarter:
<table>
  <tr>
    <th>Maven</th>
    <th>MavenCompat</th>
  </tr>
  <tr>
    <td><img src="../img/maven.jpg" width="300"/></td>
    <td><img src="../img/maven_compat.jpg" width="300"/></td>
  </tr>
</table>