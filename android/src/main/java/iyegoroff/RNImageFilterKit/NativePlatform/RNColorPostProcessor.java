package iyegoroff.RNImageFilterKit.NativePlatform;

import android.graphics.Bitmap;
import android.graphics.Paint;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.RNImageFilterKit.RNInputConverter;
import iyegoroff.RNImageFilterKit.Utility.RNGeneratorPostProcessor;

public class RNColorPostProcessor extends RNGeneratorPostProcessor {

  private final int mColor;

  public RNColorPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(width, height, config);

    RNInputConverter converter = new RNInputConverter(width, height);

    mColor = converter.convertColor(config != null ? config.optJSONObject("color") : null, 0);
  }

  @Override
  public String getName () {
    return "RNColorPostProcessor";
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Bitmap bitmap) {
    paint.setColor(mColor);
  }

  @Nonnull
  @Override
  protected CacheKey generateCacheKey() {
    return new SimpleCacheKey(String.format((Locale) null, "color_%d_%d_%d", mColor, mWidth, mHeight));
  }
}
