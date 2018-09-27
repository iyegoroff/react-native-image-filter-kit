package iyegoroff.RNImageFilterKit;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Shader;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.request.BasePostprocessor;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class LinearGradientPostProcessor extends GeneratorPostProcessor {

  private CacheKey mCacheKey;
  private int mX0;
  private int mY0;
  private int mX1;
  private int mY1;
  private int[] mColors;
  private float[] mLocations;
  private Shader.TileMode mTile;

  public LinearGradientPostProcessor(
          int width,
          int height,
          int x0,
          int y0,
          int x1,
          int y1,
          int[] colors,
          float[] locations,
          Shader.TileMode tile
  ) {
    super(width, height);

    mX0 = x0;
    mY0 = y0;
    mX1 = x1;
    mY1 = y1;
    mColors = colors;
    mLocations = locations;
    mTile = tile;
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Bitmap bitmap) {
    paint.setStyle(Paint.Style.FILL);
    paint.setShader(new LinearGradient(
            mX0 * mWidth,
            mY0 * mHeight,
            mX1 * mWidth,
            mY1 * mHeight,
            mColors,
            mLocations,
            mTile
    ));
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
              mTile.toString());
      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
