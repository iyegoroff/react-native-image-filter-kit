package iyegoroff.RNImageFilterKit;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.MultiCacheKey;
import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.react.views.image.ReactImageView;

import java.util.ArrayList;
import java.util.LinkedList;

import javax.annotation.Nonnull;

public class RNFilterableImage {

  private final @Nonnull ReactImageView mImage;
  private final @Nonnull ArrayList<Postprocessor> mPostProcessors;
  private final boolean mCacheDisabled;
  private final @Nonnull CacheKey mPreparedAuxCacheKey;

  RNFilterableImage(
    @Nonnull ReactImageView image,
    @Nonnull ArrayList<Postprocessor> postProcessors,
    boolean cacheDisabled
  ) {
    mImage = image;
    mPostProcessors = postProcessors;
    mCacheDisabled = cacheDisabled;

    CacheKey imageKey = image.getController() != null
      ? RNReflectUtils.<CacheKey>invokeMethod(image.getController(), "getCacheKey")
      : null;

    LinkedList<CacheKey> keys = new LinkedList<>();
    for (Postprocessor p: mPostProcessors) {
      keys.push(p.getPostprocessorCacheKey());
    }

    keys.push(imageKey);

    mPreparedAuxCacheKey = new MultiCacheKey(keys);
  }

  public ReactImageView getImage() {
    return mImage;
  }

  public ArrayList<Postprocessor> getPostProcessors() {
    return mPostProcessors;
  }

  public boolean isCacheDisabled() {
    return mCacheDisabled;
  }

  public CacheKey getPreparedAuxCacheKey() {
    return mPreparedAuxCacheKey;
  }
}
