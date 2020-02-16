# Image extraction

Supported since v0.7.0

Resulting images can be extracted into the file system with <code>onExtractImage</code> prop. It returns path to a temporary file inside cache folder that contains filtering result and triggers when
<code>extractImageEnabled</code> changes to <code>true</code>. While <code>extractImageEnabled</code>
remains truthy <code>onExtractImage</code> will trigger every time filtering result changes.
To delete all temporary files created this way you need to call
<a href="functions.md#cleanExtractedImagesCache">cleanExtractedImagesCache</a> function. Since
these files are saved to cache folder they can be removed by user or system at any time. <a href="../examples/ImageExtraction#description">Usage example.</a>

```ts
<Grayscale
  style={styles.image}
  onFilteringError={
    ({ nativeEvent }) => dispatch(['show-error', new Error(nativeEvent.message)])
  }
  onExtractImage={({ nativeEvent }) => dispatch(['save-photo', nativeEvent.uri])}
  extractImageEnabled={true}
  image={
    <Image
      style={styles.image}
      source={{ uri: state[1] }}
    />
  }
/>
```
