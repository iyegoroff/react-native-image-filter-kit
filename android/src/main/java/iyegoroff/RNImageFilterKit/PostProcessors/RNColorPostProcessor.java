package iyegoroff.RNImageFilterKit.PostProcessors;

import android.graphics.Bitmap;
import android.graphics.Paint;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.RNImageFilterKit.RNInputConverter;

public class RNColorPostProcessor extends RNGeneratorPostProcessor {

  private CacheKey mCacheKey;
  private final int mColor;

  public RNColorPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(width, height);

    RNInputConverter converter = new RNInputConverter(width, height);

    mColor = converter.convertColor(config != null ? config.optJSONObject("color") : null, 0);
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Bitmap bitmap) {
    paint.setColor(mColor);
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null) {
      final String key = String.format((Locale) null, "color_%d_%d_%d", mColor, mWidth, mHeight);
      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
