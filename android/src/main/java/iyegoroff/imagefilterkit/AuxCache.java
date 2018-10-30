package iyegoroff.imagefilterkit;

import android.util.LruCache;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.MultiCacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.react.views.image.ReactImageView;
import com.facebook.react.views.imagehelper.ImageSource;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class AuxCache {

  private static final @Nonnull LruCache<CacheKey, FilterableImage> sImpl = new LruCache<>(256);

  static void put(@Nonnull CacheKey auxKey, @Nonnull FilterableImage image) {
    sImpl.put(auxKey, image);
  }

  @Nullable
  public static FilterableImage get(@Nonnull CacheKey auxKey) {
    return sImpl.get(auxKey);
  }

  @Nonnull
  static CacheKey auxKey(@Nonnull JSONObject config, @Nonnull List<ReactImageView> images) {
    List<Integer> imageIndexes = imageIndexes(config);
    ArrayList<CacheKey> keys = new ArrayList<>();

    keys.add(new SimpleCacheKey(config.toString()));

    for (Integer index : imageIndexes) {
      ImageSource source = ReactImageViewUtils.getImageSource(images.get(index));

      keys.add(new SimpleCacheKey(source != null ? source.getSource() : "null"));
    }

    return new MultiCacheKey(keys);
  }

  @Nonnull
  private static List<Integer> imageIndexes(@Nonnull JSONObject config) {
    ArrayList<Integer> indexes = new ArrayList<>();

    for (Iterator<String> iterator = config.keys(); iterator.hasNext();) {
      JSONObject item = config.optJSONObject(iterator.next());

      if (item != null) {
        Object image = item.opt("image");

        if (image instanceof Integer) {
          indexes.add((Integer) image);

        } else if (image instanceof JSONObject) {
          indexes.addAll(imageIndexes((JSONObject) image));
        }
      }
    }

    return indexes;
  }
}
