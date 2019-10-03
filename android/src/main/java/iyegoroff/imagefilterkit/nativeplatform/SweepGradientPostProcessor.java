package iyegoroff.imagefilterkit.nativeplatform;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.SweepGradient;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.GeneratorPostProcessor;

public class SweepGradientPostProcessor extends GeneratorPostProcessor {

  private final float mCx;
  private final float mCy;
  private @Nonnull final int[] mColors;
  private @Nonnull final float[] mPositions;

  public SweepGradientPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(width, height, config);

    int[] defaultColors = { 0, 255 };
    float[] defaultPositions = { 0, 1 };

    InputConverter converter = new InputConverter(width, height);

    mCx = converter.convertDistance(config, "cx", "50w");
    mCy = converter.convertDistance(config, "cy", "50h");
    mColors = converter.convertColorVector(config, "colors", defaultColors);
    mPositions = converter.convertScalarVector(config, "positions", defaultPositions);
  }

  @Override
  public String getName() {
    return "SweepGradientPostProcessor";
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Canvas canvas) {
    paint.setStyle(Paint.Style.FILL);
    paint.setShader(new SweepGradient(mCx, mCy, mColors, mPositions));

    super.processGenerated(paint, canvas);
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(String.format(
      Locale.ROOT,
      "sweep_gradient_%d_%d_%f_%f_%s_%s",
      mWidth,
      mHeight,
      mCx,
      mCy,
      Arrays.toString(mColors),
      Arrays.toString(mPositions)
    ));
  }
}
