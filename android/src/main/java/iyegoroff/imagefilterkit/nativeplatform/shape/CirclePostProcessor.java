package iyegoroff.imagefilterkit.nativeplatform.shape;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.views.text.ReactFontManager;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.GeneratorPostProcessor;

public class CirclePostProcessor extends GeneratorPostProcessor {

  private final float mRadius;
  private final int mColor;

  public CirclePostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    final Context context
  ) {
    super(width, height, config);

    InputConverter converter = new InputConverter(width, height);

    mRadius = converter.convertDistance(config != null ? config.optJSONObject("radius") : null, "50min");
    mColor = converter.convertColor(config != null ? config.optJSONObject("color") : null, Color.BLACK);
  }

  @Override
  public String getName () {
    return "CirclePostProcessor";
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
      String.format((Locale) null, "circle_%f_%d_%d_%d", mRadius, mColor, mWidth, mHeight)
    );
  }
}
