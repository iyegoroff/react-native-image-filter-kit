package iyegoroff.imagefilterkit.nativeplatform;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffColorFilter;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.CacheablePostProcessor;

public class PorterDuffColorFilterPostProcessor extends CacheablePostProcessor {

  private final int mColor;
  private @Nonnull final PorterDuff.Mode mMode;

  public PorterDuffColorFilterPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(config);

    InputConverter converter = new InputConverter(width, height);

    mColor = converter.convertColor(config, "color", 0);
    mMode = converter.convertPorterDuffMode(config, "mode", PorterDuff.Mode.ADD);
  }

  @Override
  public String getName() {
    return "PorterDuffColorFilterPostProcessor";
  }

  @Override
  public void process(Bitmap dst, Bitmap src) {
    super.process(dst, src);

    final Canvas canvas = new Canvas(dst);
    final Paint paint = new Paint();

    paint.setColorFilter(new PorterDuffColorFilter(mColor, mMode));

    canvas.drawColor(Color.TRANSPARENT, PorterDuff.Mode.CLEAR);
    canvas.drawBitmap(src, 0, 0, paint);
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(String.format(
      Locale.ROOT,
      "porter_duff_color_filter_%d_%s",
      mColor,
      mMode.toString()
    ));
  }
}
