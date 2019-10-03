package iyegoroff.imagefilterkit.nativeplatform;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.LightingColorFilter;
import android.graphics.Paint;
import android.graphics.PorterDuff;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.CacheablePostProcessor;

public class LightingColorFilterPostProcessor extends CacheablePostProcessor {

  private final int mMul;
  private final int mAdd;

  public LightingColorFilterPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(config);

    InputConverter converter = new InputConverter(width, height);

    mMul = converter.convertColor(config, "mul", 0);
    mAdd = converter.convertColor(config, "add", 0);
  }

  @Override
  public String getName() {
    return "LightingColorFilterPostProcessor";
  }

  @Override
  public void process(Bitmap dst, Bitmap src) {
    super.process(dst, src);

    final Canvas canvas = new Canvas(dst);
    final Paint paint = new Paint();

    paint.setColorFilter(new LightingColorFilter(mMul, mAdd));

    canvas.drawColor(Color.TRANSPARENT, PorterDuff.Mode.CLEAR);
    canvas.drawBitmap(src, 0, 0, paint);
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(
      String.format(Locale.ROOT, "lighting_color_filter_%d_%d", mMul, mAdd)
    );
  }
}
