package iyegoroff.RNImageFilterKit;

import android.graphics.Bitmap;
import android.util.Log;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.MultiCacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.postprocessors.IterativeBoxBlurPostProcessor;
import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.react.common.ReactConstants;

import java.util.LinkedList;
import java.util.List;

public class RNMultiPostProcessor extends IterativeBoxBlurPostProcessor {
  private final List<Postprocessor> mPostProcessors;

  public RNMultiPostProcessor(List<Postprocessor> postprocessors) {
    super(1);
    mPostProcessors = new LinkedList<>(postprocessors);
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
    name.insert(0, "RNMultiPostProcessor (");
    name.append(")");
    return name.toString();
  }

  @Override
  public CacheKey getPostprocessorCacheKey () {
    LinkedList<CacheKey> keys = new LinkedList<>();
    for (Postprocessor p: mPostProcessors) {
      keys.push(p.getPostprocessorCacheKey());
    }
    return new MultiCacheKey(keys);
  }

  @Override
  public CloseableReference<Bitmap> process(Bitmap sourceBitmap, PlatformBitmapFactory bitmapFactory) {
    Log.i(ReactConstants.TAG, "filter: multi " + String.valueOf(sourceBitmap));
    CloseableReference<Bitmap> prevBitmap = null, nextBitmap = null;

    try {
      for (Postprocessor p : mPostProcessors) {
        nextBitmap = p.process(prevBitmap != null ? prevBitmap.get() : sourceBitmap, bitmapFactory);
        CloseableReference.closeSafely(prevBitmap);
        prevBitmap = nextBitmap.clone();
      }
      return nextBitmap.clone();
    } finally {
      CloseableReference.closeSafely(nextBitmap);
    }
  }
}
