package iyegoroff.RNImageFilterKit;

import android.graphics.Bitmap;
import android.graphics.Paint;
import android.graphics.RadialGradient;
import android.graphics.Shader;
import android.util.Log;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.react.common.ReactConstants;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RadialGradientPostProcessor extends GeneratorPostProcessor {

  private CacheKey mCacheKey;
  private int mCenterX;
  private int mCenterY;
  private int mRadius;
  private int[] mColors;
  private float[] mStops;
  private Shader.TileMode mTileMode;

  public RadialGradientPostProcessor(
    int width,
    int height,
    int centerX,
    int centerY,
    int radius,
    int[] colors,
    float[] stops,
    Shader.TileMode tileMode
  ) {
    super(width, height);

    mCenterX = centerX;
    mCenterY = centerY;
    mRadius = radius;
    mColors = colors;
    mStops = stops;
    mTileMode = tileMode;
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Bitmap bitmap) {
    paint.setStyle(Paint.Style.FILL);
    paint.setShader(new RadialGradient(mCenterX, mCenterY, mRadius, mColors, mStops, mTileMode));
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null) {
      final String key = String.format(
        (Locale) null,
        "radial_gradient_%d_%d_%d_%d_%d_%s_%s_%s",
        mWidth,
        mHeight,
        mCenterX,
        mCenterY,
        mRadius,
        Arrays.toString(mColors),
        Arrays.toString(mStops),
        mTileMode.toString()
      );

      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
