package iyegoroff.imagefilterkit.nativeplatform.shape;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.GeneratorPostProcessor;

public class CircleShapePostProcessor extends GeneratorPostProcessor {

  private final float mRadius;
  private final int mColor;

  public CircleShapePostProcessor(int width, int height, @Nullable JSONObject config) {
    super(width, height, config);

    InputConverter converter = new InputConverter(width, height);

    mRadius = converter.convertDistance(config, "radius", "50min");
    mColor = converter.convertColor(config, "color", Color.BLACK);
  }

  @Override
  public String getName() {
    return "CircleShapePostProcessor";
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Canvas canvas) {
    paint.setAntiAlias(true);
    paint.setColor(mColor);

    canvas.drawCircle(mWidth / 2.0f, mHeight / 2.0f, mRadius, paint);
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(
      String.format(Locale.ROOT, "circle_shape_%f_%d_%d_%d", mRadius, mColor, mWidth, mHeight)
    );
  }
}
