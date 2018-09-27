package iyegoroff.RNImageFilterKit;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.ColorMatrix;
import android.graphics.ColorMatrixColorFilter;
import android.graphics.Paint;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.imagepipeline.request.BasePostprocessor;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nullable;

public class ColorMatrixColorFilterPostProcessor extends BasePostprocessor {

  private CacheKey mCacheKey;
  private float[] mMatrix;

  public ColorMatrixColorFilterPostProcessor(float[] matrix) {
    mMatrix = matrix;
  }

  @Override
  public void process(Bitmap destBitmap, Bitmap sourceBitmap) {
    super.process(destBitmap, sourceBitmap);

    Canvas canvas = new Canvas(destBitmap);
    ColorMatrix matrix = new ColorMatrix(mMatrix);
    Paint paint = new Paint();
    paint.setColorFilter(new ColorMatrixColorFilter(matrix));
    canvas.drawBitmap(sourceBitmap, 0, 0, paint);
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null) {
      final String key = String.format(
              (Locale) null,
              "color_matrix_color_filter_%s",
              Arrays.toString(mMatrix));
      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
