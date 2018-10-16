package iyegoroff.RNImageFilterKit;

import android.graphics.Bitmap;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.Shader;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class LinearGradientPostProcessor extends GeneratorPostProcessor {

  private CacheKey mCacheKey;
  private final int mX0;
  private final int mY0;
  private final int mX1;
  private final int mY1;
  private final int[] mColors;
  private final float[] mLocations;
  private final Shader.TileMode mTileMode;

  public LinearGradientPostProcessor(
    int width,
    int height,
    int x0,
    int y0,
    int x1,
    int y1,
    int[] colors,
    float[] locations,
    Shader.TileMode tileMode
  ) {
    super(width, height);

    mX0 = x0;
    mY0 = y0;
    mX1 = x1;
    mY1 = y1;
    mColors = colors;
    mLocations = locations;
    mTileMode = tileMode;
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Bitmap bitmap) {
    paint.setStyle(Paint.Style.FILL);
    paint.setShader(new LinearGradient(mX0, mY0, mX1, mY1, mColors, mLocations, mTileMode));
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null) {
      final String key = String.format(
        (Locale) null,
        "linear_gradient_%d_%d_%d_%d_%d_%d_%s_%s_%s",
        mWidth,
        mHeight,
        mX0,
        mY0,
        mX1,
        mY1,
        Arrays.toString(mColors),
        Arrays.toString(mLocations),
        mTileMode.toString()
      );

      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
