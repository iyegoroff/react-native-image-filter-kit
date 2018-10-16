package iyegoroff.RNImageFilterKit;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.util.Log;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.image.CloseableBitmap;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.request.BasePostprocessor;
import com.facebook.react.common.ReactConstants;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class PorterDuffXfermodePostProcessor extends BasePostprocessor {

  private CacheKey mCacheKey;
  private final PorterDuff.Mode mMode;
  private @Nonnull CloseableReference<CloseableImage> mDest;
  private final @Nonnull CacheKey mDestCacheKey;

  public PorterDuffXfermodePostProcessor(
    PorterDuff.Mode mode,
    @Nonnull CloseableReference<CloseableImage> dest,
    @Nonnull CacheKey destCacheKey
  ) {
    mMode = mode;
    mDest = dest.clone();
    mDestCacheKey = destCacheKey;
  }

  @Override
  protected void finalize() {
    CloseableReference.closeSafely(mDest);
  }

  @Override
  public void process(Bitmap destBitmap, Bitmap sourceBitmap) {
    super.process(destBitmap, sourceBitmap);

    Bitmap dest = ((CloseableBitmap) mDest.get()).getUnderlyingBitmap();

    if (dest != null) {
      Canvas canvas = new Canvas(destBitmap);
      Paint paint = new Paint();

      canvas.drawBitmap(sourceBitmap, 0, 0, paint);

      paint.setXfermode(new PorterDuffXfermode(mMode));

      canvas.drawBitmap(dest, 0, 0, paint);
    }
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null) {
      final String key = String.format(
        (Locale) null,
        "porter_duff_xfermode_%s_%s",
        mMode.toString(),
        mDestCacheKey.toString()
      );

      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
