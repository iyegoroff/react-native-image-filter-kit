package iyegoroff.RNImageFilterKit;

import android.graphics.Bitmap;
import android.graphics.BlurMaskFilter;
import android.graphics.Canvas;
import android.graphics.Paint;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.imagepipeline.request.BasePostprocessor;

import java.util.Locale;

import javax.annotation.Nullable;

public class BlurMaskFilterPostProcessor extends BasePostprocessor {
  private CacheKey mCacheKey;
  private float mRadius;
  private BlurMaskFilter.Blur mStyle;

  public BlurMaskFilterPostProcessor(float radius, BlurMaskFilter.Blur style) {
    mRadius = radius;
    mStyle = style;
  }

  @Override
  public void process(Bitmap destBitmap, Bitmap sourceBitmap) {
    super.process(destBitmap, sourceBitmap);

    Canvas canvas = new Canvas(destBitmap);
    Paint paint = new Paint();
    paint.setMaskFilter(new BlurMaskFilter(mRadius, mStyle));
    canvas.drawBitmap(sourceBitmap, 0, 0, paint);
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null) {
      final String key = String.format((Locale) null, "bmf%f%s", mRadius, mStyle);
      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
