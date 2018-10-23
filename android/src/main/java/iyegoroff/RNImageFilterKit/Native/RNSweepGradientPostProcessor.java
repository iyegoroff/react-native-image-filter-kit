package iyegoroff.RNImageFilterKit.Native;

import android.graphics.Bitmap;
import android.graphics.Paint;
import android.graphics.SweepGradient;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.RNImageFilterKit.RNInputConverter;

public class RNSweepGradientPostProcessor extends RNGeneratorPostProcessor {

  private CacheKey mCacheKey;
  private final float mCx;
  private final float mCy;
  private @Nonnull final int[] mColors;
  private @Nonnull final float[] mPositions;

  public RNSweepGradientPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(width, height);

    int[] defaultColors = { 0, 255 };
    float[] defaultPositions = { 0, 1 };

    RNInputConverter converter = new RNInputConverter(width, height);

    mCx = converter.convertDistance(config != null ? config.optJSONObject("cx") : null, "50w");
    mCy = converter.convertDistance(config != null ? config.optJSONObject("cy") : null, "50h");
    mColors = converter.convertColorVector(config != null ? config.optJSONObject("colors") : null, defaultColors);
    mPositions = converter.convertScalarVector(config != null ? config.optJSONObject("positions") : null, defaultPositions);
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Bitmap bitmap) {
    paint.setStyle(Paint.Style.FILL);
    paint.setShader(new SweepGradient(mCx, mCy, mColors, mPositions));
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null) {
      final String key = String.format(
        (Locale) null,
        "sweep_gradient_%d_%d_%f_%f_%s_%s",
        mWidth,
        mHeight,
        mCx,
        mCy,
        Arrays.toString(mColors),
        Arrays.toString(mPositions)
      );

      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
