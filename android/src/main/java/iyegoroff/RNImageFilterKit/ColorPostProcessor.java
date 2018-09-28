package iyegoroff.RNImageFilterKit;

import android.graphics.Bitmap;
import android.graphics.Paint;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class ColorPostProcessor extends GeneratorPostProcessor {

  private CacheKey mCacheKey;
  private int mColor;

  public ColorPostProcessor(int width, int height, int color) {
    super(width, height);

    mColor = color;
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
