package iyegoroff.imagefilterkit;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.image.CloseableImage;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class AuxCache {

  private static final @Nonnull Map<CacheKey, CacheKey> impl = new HashMap<>();

  static void put(@Nonnull CacheKey auxKey, @Nonnull CacheKey frescoKey) {
    impl.put(auxKey, frescoKey);
  }

  @Nullable
  static CacheKey getFrescoKey(@Nonnull CacheKey auxKey) {
    return impl.containsKey(auxKey) ? impl.get(auxKey) : null;
  }

  @Nullable
  static CloseableReference<CloseableImage> getImage(@Nonnull CacheKey auxKey) {
    if (impl.containsKey(auxKey)) {
      CloseableReference<CloseableImage> ref = Fresco.getImagePipeline()
        .getBitmapMemoryCache().get(impl.get(auxKey));

      try {
        return CloseableReference.cloneOrNull(ref);

      } finally {
        CloseableReference.closeSafely(ref);
      }
    }

    return null;
  }
}
