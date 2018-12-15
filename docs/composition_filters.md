# Composition filters

<img src="../img/porter_duff.png" width="500">


- [DstATopComposition](https://developer.android.com/reference/android/graphics/PorterDuff.Mode#DST_ATOP)
- [DstInComposition](https://developer.android.com/reference/android/graphics/PorterDuff.Mode#DST_IN)
- [DstOutComposition](https://developer.android.com/reference/android/graphics/PorterDuff.Mode#DST_OUT)
- [DstOverComposition](https://developer.android.com/reference/android/graphics/PorterDuff.Mode#DST_OVER)
- [SrcATopComposition](https://developer.android.com/reference/android/graphics/PorterDuff.Mode#SRC_ATOP)
- [SrcInComposition](https://developer.android.com/reference/android/graphics/PorterDuff.Mode#SRC_IN)
- [SrcOutComposition](https://developer.android.com/reference/android/graphics/PorterDuff.Mode#SRC_OUT)
- [SrcOverComposition](https://developer.android.com/reference/android/graphics/PorterDuff.Mode#SRC_OVER)
- [XorComposition](https://developer.android.com/reference/android/graphics/PorterDuff.Mode#XOR)


All composition filters have the same props

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>dstImage</td>
    <td>Image | ImageFilter</td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>dstAnchor</td>
    <td><a href="typed.md#Offset">Offset</a></td>
    <td>{&nbsp;x:&nbsp;0.5,&nbsp;y:&nbsp;0.5&nbsp;}</td>
    <td>dst image anchor, relative to dst image size</td>
  </tr>
  <tr>
    <td>dstPosition</td>
    <td><a href="typed.md#Offset">Offset</a></td>
    <td>{&nbsp;x:&nbsp;0.5,&nbsp;y:&nbsp;0.5&nbsp;}</td>
    <td>dst image position, relative to canvas size</td>
  </tr>
  <tr>
    <td>dstResizeMode</td>
    <td><a href="typed.md#ResizeMode">ResizeMode</a></td>
    <td>'COVER'</td>
    <td></td>
  </tr>
  <tr>
    <td>srcImage</td>
    <td>Image | ImageFilter</td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>srcAnchor</td>
    <td><a href="typed.md#Offset">Offset</a></td>
    <td>{&nbsp;x:&nbsp;0.5,&nbsp;y:&nbsp;0.5&nbsp;}</td>
    <td>src image anchor, relative to src image size</td>
  </tr>
  <tr>
    <td>srcPosition</td>
    <td><a href="typed.md#Offset">Offset</a></td>
    <td>{&nbsp;x:&nbsp;0.5,&nbsp;y:&nbsp;0.5&nbsp;}</td>
    <td>src image position, relative to canvas size</td>
  </tr>
  <tr>
    <td>srcResizeMode</td>
    <td><a href="typed.md#ResizeMode">ResizeMode</a></td>
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