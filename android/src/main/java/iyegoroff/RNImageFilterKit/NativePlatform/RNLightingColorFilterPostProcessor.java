package iyegoroff.RNImageFilterKit.NativePlatform;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.LightingColorFilter;
import android.graphics.Paint;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.imagepipeline.request.BasePostprocessor;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.RNImageFilterKit.RNInputConverter;
import iyegoroff.RNImageFilterKit.Utility.RNCachedPostProcessor;

public class RNLightingColorFilterPostProcessor extends RNCachedPostProcessor {

  private final int mMul;
  private final int mAdd;

  public RNLightingColorFilterPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(config);

    RNInputConverter converter = new RNInputConverter(width, height);

    mMul = converter.convertColor(config != null ? config.optJSONObject("mul") : null, 0);
    mAdd = converter.convertColor(config != null ? config.optJSONObject("add") : null, 0);
  }

  @Override
  public String getName () {
    return "RNLightingColorFilterPostProcessor";
  }

  @Override
  public void process(Bitmap destBitmap, Bitmap sourceBitmap) {
    super.process(destBitmap, sourceBitmap);

    Canvas canvas = new Canvas(destBitmap);
    Paint paint = new Paint();
    paint.setColorFilter(new LightingColorFilter(mMul, mAdd));
    canvas.drawBitmap(sourceBitmap, 0, 0, paint);
  }

  @Nonnull
  @Override
  protected CacheKey generateCacheKey() {
    return new SimpleCacheKey(String.format((Locale) null, "lighting_color_filter_%d_%d", mMul, mAdd));
  }
}
