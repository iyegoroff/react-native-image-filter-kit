package iyegoroff.imagefilterkit.utility;

import android.graphics.Bitmap;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.MultiCacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.postprocessors.IterativeBoxBlurPostProcessor;
import com.facebook.imagepipeline.request.Postprocessor;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class MultiPostProcessor extends IterativeBoxBlurPostProcessor {

  private CacheKey mCacheKey = null;
  private final boolean mCacheDisabled;
  private final List<Postprocessor> mPostProcessors;

  public MultiPostProcessor(List<Postprocessor> postProcessors, boolean cacheDisabled) {
    super(1);

    mPostProcessors = new LinkedList<>(postProcessors);
    mCacheDisabled = cacheDisabled;
  }

  @Override
  public String getName () {
    StringBuilder name = new StringBuilder();
    for (Postprocessor p: mPostProcessors) {
      if (name.length() > 0) {
        name.append(",");
      }
      name.append(p.getName());
    }
    name.insert(0, "MultiPostProcessor (");
    name.append(")");
    return name.toString();
  }

  @Nonnull
  public static CacheKey cacheKey(@Nonnull IterativeBoxBlurPostProcessor target) {
    if (target instanceof MultiPostProcessor) {
      LinkedList<CacheKey> keys = new LinkedList<>();
      for (Postprocessor p : ((MultiPostProcessor) target).mPostProcessors) {
        keys.push(p.getPostprocessorCacheKey());
      }

      return new MultiCacheKey(keys);

    } else {
      CacheKey key = target.getPostprocessorCacheKey();
      return key != null ? key : new SimpleCacheKey("empty");
    }
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey () {
    if (mCacheKey == null && !mCacheDisabled) {
      mCacheKey = cacheKey(this);
    }

    return mCacheKey;
  }

  @Override
  public CloseableReference<Bitmap> process(
    Bitmap sourceBitmap,
    PlatformBitmapFactory bitmapFactory
  ) {
    CloseableReference<Bitmap> prevBitmap = null, nextBitmap = null;

    try {
      for (Postprocessor p : mPostProcessors) {
        nextBitmap = p.process(prevBitmap != null ? prevBitmap.get() : sourceBitmap, bitmapFactory);
        CloseableReference.closeSafely(prevBitmap);
        prevBitmap = nextBitmap.clone();
      }

      return nextBitmap == null ? super.process(sourceBitmap, bitmapFactory) : nextBitmap.clone();
    } finally {
      CloseableReference.closeSafely(nextBitmap);
    }
  }
}
