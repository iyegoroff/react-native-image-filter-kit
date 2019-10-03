package iyegoroff.imagefilterkit.nativeplatform;

import android.graphics.Canvas;
import android.graphics.Paint;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.GeneratorPostProcessor;

public class ColorPostProcessor extends GeneratorPostProcessor {

  private final int mColor;

  public ColorPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(width, height, config);

    InputConverter converter = new InputConverter(width, height);

    mColor = converter.convertColor(config, "color", 0);
  }

  @Override
  public String getName() {
    return "ColorPostProcessor";
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Canvas canvas) {
    paint.setColor(mColor);

    super.processGenerated(paint, canvas);
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(
      String.format(Locale.ROOT,"color_%d_%d_%d", mColor, mWidth, mHeight)
    );
  }
}
