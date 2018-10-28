package iyegoroff.imagefilterkit.utility;

import android.graphics.Bitmap;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.image.CloseableBitmap;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.postprocessors.IterativeBoxBlurPostProcessor;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.AuxCache;

public class ReplacingPostProcessor extends IterativeBoxBlurPostProcessor {

  private final @Nonnull CacheKey mAuxCacheKey;

  public ReplacingPostProcessor(@Nonnull CacheKey auxCacheKey) {
    super(1);

    mAuxCacheKey = auxCacheKey;
  }

  @Override
  public String getName () {
    return "ReplacingPostProcessor";
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey () {
    return AuxCache.getFrescoKey(mAuxCacheKey);
  }

  @Override
  public CloseableReference<Bitmap> process(
    Bitmap sourceBitmap,
    PlatformBitmapFactory bitmapFactory
  ) {
    CacheKey frescoKey = AuxCache.getFrescoKey(mAuxCacheKey);

    if (frescoKey != null) {
      CloseableReference<CloseableImage> image = Fresco.getImagePipeline()
        .getBitmapMemoryCache().get(frescoKey);

      try {
        return super.process(
          image != null ? ((CloseableBitmap) image.get()).getUnderlyingBitmap() : sourceBitmap,
          bitmapFactory
        );

      } finally {
        CloseableReference.closeSafely(image);
      }
    }

    return null;
  }
}
