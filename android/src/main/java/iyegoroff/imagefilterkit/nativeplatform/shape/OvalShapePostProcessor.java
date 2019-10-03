package iyegoroff.imagefilterkit.nativeplatform.shape;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RectF;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.GeneratorPostProcessor;

public class OvalShapePostProcessor extends GeneratorPostProcessor {

  private final float mRadiusX;
  private final float mRadiusY;
  private final int mColor;

  public OvalShapePostProcessor(int width, int height, @Nullable JSONObject config) {
    super(width, height, config);

    InputConverter converter = new InputConverter(width, height);

    mRadiusX = converter.convertDistance(config, "radiusX", "50w");
    mRadiusY = converter.convertDistance(config, "radiusY", "25h");
    mColor = converter.convertColor(config, "color", Color.BLACK);
  }

  @Override
  public String getName() {
    return "OvalShapePostProcessor";
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Canvas canvas) {
    paint.setAntiAlias(true);
    paint.setColor(mColor);
    final float centerX = mWidth / 2.0f;
    final float centerY = mHeight / 2.0f;

    canvas.drawOval(
      new RectF(centerX - mRadiusX, centerY + mRadiusY, centerX + mRadiusX, centerY - mRadiusY),
      paint
    );
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(
      String.format(
        Locale.ROOT, "oval_shape_%f_%f_%d_%d_%d", mRadiusX, mRadiusY, mColor, mWidth, mHeight
      )
    );
  }
}
