package iyegoroff.imagefilterkit;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.MultiCacheKey;
import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.react.views.image.ReactImageView;

import java.util.ArrayList;
import java.util.Collections;

import javax.annotation.Nonnull;

import iyegoroff.imagefilterkit.utility.CacheablePostProcessor;

public class FilterableImage {

  private final @Nonnull ReactImageView mImage;
  private final @Nonnull ArrayList<Postprocessor> mPostProcessors;
  private final boolean mCacheDisabled;

  FilterableImage(
    final @Nonnull ReactImageView image,
    final @Nonnull ArrayList<Postprocessor> postProcessors,
    final boolean cacheDisabled
  ) {
    mImage = image;
    mPostProcessors = postProcessors;
    mCacheDisabled = cacheDisabled;
  }

  CacheKey generatedCacheKey() {
    final ArrayList<CacheKey> keys = new ArrayList<>(
      Collections.singletonList(ReactImageViewUtils.getCacheKey(mImage))
    );

    for (Postprocessor p : mPostProcessors) {
      keys.add(
        p instanceof CacheablePostProcessor
          ? ((CacheablePostProcessor) p).generateCacheKey()
          : p.getPostprocessorCacheKey()
      );
    }

    return new MultiCacheKey(keys);
  }

  public ReactImageView getImage() {
    return mImage;
  }

  ArrayList<Postprocessor> getPostProcessors() {
    return mPostProcessors;
  }

  boolean isCacheDisabled() {
    return mCacheDisabled;
  }
}
