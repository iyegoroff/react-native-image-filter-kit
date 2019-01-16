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
    <td><a href="types.md#Filterable">Filterable</a></td>
    <td>-</td>
    <td><strong>required</strong></td>
  </tr>
  <tr>
    <td>dstTransform</td>
    <td><a href="types.md#Transform">Transform</a></td>
    <td>
<code>
{&nbsp;anchor:&nbsp;{&nbsp;x:&nbsp;0.5,&nbsp;y:&nbsp;0.5&nbsp;},<br>
&nbsp;&nbsp;translate:&nbsp;{&nbsp;x:&nbsp;0.5,&nbsp;y:&nbsp;0.5&nbsp;},<br>
&nbsp;&nbsp;scale:&nbsp;'COVER',<br>
&nbsp;&nbsp;rotate:&nbsp;0&nbsp;}
</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <td>srcImage</td>
    <td><a href="types.md#Filterable">Filterable</a></td>
    <td>-</td>
    <td><strong>required</strong></td>
  </tr>
  <tr>
    <td>srcTransform</td>
    <td><a href="types.md#Transform">Transform</a></td>
    <td>
<code>
{&nbsp;anchor:&nbsp;{&nbsp;x:&nbsp;0.5,&nbsp;y:&nbsp;0.5&nbsp;},<br>
&nbsp;&nbsp;translate:&nbsp;{&nbsp;x:&nbsp;0.5,&nbsp;y:&nbsp;0.5&nbsp;},<br>
&nbsp;&nbsp;scale:&nbsp;'COVER',<br>
&nbsp;&nbsp;rotate:&nbsp;0&nbsp;}
</code>
    </td>
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