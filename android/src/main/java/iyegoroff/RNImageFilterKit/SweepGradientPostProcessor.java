package iyegoroff.RNImageFilterKit;

import android.graphics.Bitmap;
import android.graphics.Paint;
import android.graphics.RadialGradient;
import android.graphics.Shader;
import android.graphics.SweepGradient;
import android.util.Log;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.react.common.ReactConstants;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class SweepGradientPostProcessor extends GeneratorPostProcessor {

  private CacheKey mCacheKey;
  private final int mCx;
  private final int mCy;
  private final int[] mColors;
  private final float[] mPositions;

  public SweepGradientPostProcessor(
    int width,
    int height,
    int cx,
    int cy,
    int[] colors,
    float[] positions
  ) {
    super(width, height);

    mCx = cx;
    mCy = cy;
    mColors = colors;
    mPositions = positions;
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Bitmap bitmap) {
    paint.setStyle(Paint.Style.FILL);
    paint.setShader(new SweepGradient(mCx, mCy, mColors, mPositions));
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null) {
      final String key = String.format(
        (Locale) null,
        "sweep_gradient_%d_%d_%d_%d_%s_%s",
        mWidth,
        mHeight,
        mCx,
        mCy,
        Arrays.toString(mColors),
        Arrays.toString(mPositions)
      );

      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
