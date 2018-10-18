package iyegoroff.RNImageFilterKit.PostProcessors;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.ColorMatrix;
import android.graphics.ColorMatrixColorFilter;
import android.graphics.Paint;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.imagepipeline.request.BasePostprocessor;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.RNImageFilterKit.RNInputConverter;

public class RNColorMatrixColorFilterPostProcessor extends BasePostprocessor {

  private CacheKey mCacheKey;
  private @Nonnull final float[] mMatrix;

  private static final float[] mNormalMatrix =
    { 1, 0, 0, 0, 0,
      0, 1, 0, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 0, 1, 0 };

  public RNColorMatrixColorFilterPostProcessor(
    @Nullable JSONObject config,
    @Nonnull RNInputConverter converter
  ) {
    mMatrix = converter.convertScalarVector(
      config != null ? config.optJSONObject("matrix") : null,
      mNormalMatrix
    );
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

  @Nonnull
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null) {
      final String key = String.format(
        (Locale) null,
        "color_matrix_color_filter_%s",
        Arrays.toString(mMatrix)
      );

      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
