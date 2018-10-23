package iyegoroff.RNImageFilterKit.Native;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.LightingColorFilter;
import android.graphics.Paint;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.imagepipeline.request.BasePostprocessor;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nullable;

import iyegoroff.RNImageFilterKit.RNInputConverter;

public class RNLightingColorFilterPostProcessor extends BasePostprocessor {

  private CacheKey mCacheKey;
  private final int mMul;
  private final int mAdd;

  public RNLightingColorFilterPostProcessor(int width, int height, @Nullable JSONObject config) {
    RNInputConverter converter = new RNInputConverter(width, height);

    mMul = converter.convertColor(config != null ? config.optJSONObject("mul") : null, 0);
    mAdd = converter.convertColor(config != null ? config.optJSONObject("add") : null, 0);
  }

  @Override
  public void process(Bitmap destBitmap, Bitmap sourceBitmap) {
    super.process(destBitmap, sourceBitmap);

    Canvas canvas = new Canvas(destBitmap);
    Paint paint = new Paint();
    paint.setColorFilter(new LightingColorFilter(mMul, mAdd));
    canvas.drawBitmap(sourceBitmap, 0, 0, paint);
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null) {
      final String key = String.format((Locale) null, "lighting_color_filter_%d_%d", mMul, mAdd);
      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
