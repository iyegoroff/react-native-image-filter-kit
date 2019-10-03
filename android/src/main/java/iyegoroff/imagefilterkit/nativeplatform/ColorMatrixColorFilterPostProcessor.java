package iyegoroff.imagefilterkit.nativeplatform;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.ColorMatrix;
import android.graphics.ColorMatrixColorFilter;
import android.graphics.Paint;
import android.graphics.PorterDuff;

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

    mMatrix = converter.convertScalarVector(config, "matrix", mNormalMatrix);
  }

  @Override
  public String getName() {
    return "ColorMatrixColorFilterPostProcessor";
  }

  @Override
  public void process(Bitmap dst, Bitmap src) {
    super.process(dst, src);

    final Canvas canvas = new Canvas(dst);
    final ColorMatrix matrix = new ColorMatrix(mMatrix);
    final Paint paint = new Paint();

    paint.setColorFilter(new ColorMatrixColorFilter(matrix));

    canvas.drawColor(Color.TRANSPARENT, PorterDuff.Mode.CLEAR);
    canvas.drawBitmap(src, 0, 0, paint);
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
