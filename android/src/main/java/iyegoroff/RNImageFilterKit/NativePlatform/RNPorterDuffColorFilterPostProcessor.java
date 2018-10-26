package iyegoroff.RNImageFilterKit.NativePlatform;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffColorFilter;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.imagepipeline.request.BasePostprocessor;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.RNImageFilterKit.RNInputConverter;
import iyegoroff.RNImageFilterKit.Utility.RNCachedPostProcessor;

public class RNPorterDuffColorFilterPostProcessor extends RNCachedPostProcessor {

  private final int mColor;
  private @Nonnull final PorterDuff.Mode mMode;

  public RNPorterDuffColorFilterPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(config);

    RNInputConverter converter = new RNInputConverter(width, height);

    mColor = converter.convertColor(config != null ? config.optJSONObject("color") : null, 0);
    mMode = converter.convertPorterDuffMode(config != null ? config.optJSONObject("mode") : null, PorterDuff.Mode.ADD);
  }

  @Override
  public String getName () {
    return "RNPorterDuffColorFilterPostProcessor";
  }

  @Override
  public void process(Bitmap destBitmap, Bitmap sourceBitmap) {
    super.process(destBitmap, sourceBitmap);

    Canvas canvas = new Canvas(destBitmap);
    Paint paint = new Paint();
    paint.setColorFilter(new PorterDuffColorFilter(mColor, mMode));
    canvas.drawBitmap(sourceBitmap, 0, 0, paint);
  }

  @Nonnull
  @Override
  protected CacheKey generateCacheKey() {
    return new SimpleCacheKey(String.format(
      (Locale) null,
      "porter_duff_color_filter_%d_%s",
      mColor,
      mMode.toString()
    ));
  }
}
