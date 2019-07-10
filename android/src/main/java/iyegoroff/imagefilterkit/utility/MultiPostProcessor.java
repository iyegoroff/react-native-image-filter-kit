package iyegoroff.imagefilterkit.utility;

import android.graphics.Bitmap;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.MultiCacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.postprocessors.IterativeBoxBlurPostProcessor;
import com.facebook.imagepipeline.request.Postprocessor;

import java.util.LinkedList;
import java.util.List;

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
  public String getName() {
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

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey () {
    if (mCacheKey == null && !mCacheDisabled) {
      LinkedList<CacheKey> keys = new LinkedList<>();
      for (Postprocessor p : mPostProcessors) {
        keys.push(p.getPostprocessorCacheKey());
      }

      mCacheKey = new MultiCacheKey(keys);
    }

    return mCacheKey;
  }

  @Override
  public CloseableReference<Bitmap> process(
    Bitmap src,
    PlatformBitmapFactory bitmapFactory
  ) {
    CloseableReference<Bitmap> prevBitmap = null, nextBitmap = null;

    try {
      for (Postprocessor p : mPostProcessors) {
        nextBitmap = p.process(prevBitmap != null ? prevBitmap.get() : src, bitmapFactory);
        CloseableReference.closeSafely(prevBitmap);
        prevBitmap = nextBitmap.clone();
      }

      return nextBitmap == null ? super.process(src, bitmapFactory) : nextBitmap.clone();
    } finally {
      CloseableReference.closeSafely(nextBitmap);
    }
  }
}
