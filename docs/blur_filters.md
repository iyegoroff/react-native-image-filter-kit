# Blur filters

- [BoxBlur](#BoxBlur)
- [GaussianBlur](#GaussianBlur)

-----

#### BoxBlur

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
    <td>-</td>
    <td><strong>required</strong></td>
  </tr>
  <tr>
    <td>radius</td>
    <td>number</td>
    <td>5</td>
    <td></td>
  </tr>
</table>

***

#### GaussianBlur

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
    <td>-</td>
    <td><strong>required</strong></td>
  </tr>
  <tr>
    <td>radius</td>
    <td>number</td>
    <td>5</td>
    <td>between 1..12,5</td>
  </tr>
</table>