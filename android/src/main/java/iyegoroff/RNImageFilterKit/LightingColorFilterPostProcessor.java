package iyegoroff.RNImageFilterKit;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.LightingColorFilter;
import android.graphics.Paint;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.imagepipeline.request.BasePostprocessor;

import java.util.Locale;

import javax.annotation.Nullable;

public class LightingColorFilterPostProcessor extends BasePostprocessor {

  private CacheKey mCacheKey;
  private final int mMul;
  private final int mAdd;

  public LightingColorFilterPostProcessor(int mul, int add) {
    mMul = mul;
    mAdd = add;
  }

  @Override
  public void process(Bitmap destBitmap, Bitmap sourceBitmap) {
    super.process(destBitmap, sourceBitmap);

    Canvas canvas = new Canvas(destBitmap);
    Paint paint = new Paint();
    paint.setColorFilter(new LightingColorFilter(mMul, mAdd));
    canvas.drawBitmap(sourceBitmap, 0, 0, paint);
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null) {
      final String key = String.format((Locale) null, "lighting_color_filter_%d_%d", mMul, mAdd);
      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
