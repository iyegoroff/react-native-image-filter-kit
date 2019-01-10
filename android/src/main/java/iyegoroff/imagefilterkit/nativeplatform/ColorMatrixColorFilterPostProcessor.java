package iyegoroff.imagefilterkit.nativeplatform;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.ColorMatrix;
import android.graphics.ColorMatrixColorFilter;
import android.graphics.Paint;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.CacheablePostProcessor;

public class ColorMatrixColorFilterPostProcessor extends CacheablePostProcessor {

  private @Nonnull final float[] mMatrix;

  private static final float[] mNormalMatrix =
    { 1, 0, 0, 0, 0,
      0, 1, 0, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 0, 1, 0 };

  public ColorMatrixColorFilterPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(config);

    InputConverter converter = new InputConverter(width, height);

    mMatrix = converter.convertScalarVector(
      config != null ? config.optJSONObject("matrix") : null,
      mNormalMatrix
    );
  }

  @Override
  public String getName() {
    return "ColorMatrixColorFilterPostProcessor";
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
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(String.format(
      Locale.ROOT,
      "color_matrix_color_filter_%s",
      Arrays.toString(mMatrix)
    ));
  }
}
