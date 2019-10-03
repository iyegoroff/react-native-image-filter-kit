package iyegoroff.imagefilterkit.nativeplatform;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.RadialGradient;
import android.graphics.Shader;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.GeneratorPostProcessor;

public class RadialGradientPostProcessor extends GeneratorPostProcessor {

  private final float mCenterX;
  private final float mCenterY;
  private final float mRadius;
  private final @Nonnull int[] mColors;
  private final @Nonnull float[] mStops;
  private final @Nonnull Shader.TileMode mTileMode;

  public RadialGradientPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(width, height, config);

    int[] defaultColors = { 0, 255 };
    float[] defaultStops = { 0, 1 };

    InputConverter converter = new InputConverter(width, height);

    mCenterX = converter.convertDistance(config, "centerX", "50w");
    mCenterY = converter.convertDistance(config, "centerY", "50h");
    mRadius = converter.convertDistance(config, "radius", "50min");
    mColors = converter.convertColorVector(config, "colors", defaultColors);
    mStops = converter.convertScalarVector(config, "stops", defaultStops);
    mTileMode = converter.convertTileMode(config, "tileMode", Shader.TileMode.CLAMP);
  }

  @Override
  public String getName() {
    return "RadialGradientPostProcessor";
  }


  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Canvas canvas) {
    paint.setStyle(Paint.Style.FILL);
    paint.setShader(new RadialGradient(mCenterX, mCenterY, mRadius, mColors, mStops, mTileMode));

    super.processGenerated(paint, canvas);
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(String.format(
      Locale.ROOT,
      "radial_gradient_%d_%d_%f_%f_%f_%s_%s_%s",
      mWidth,
      mHeight,
      mCenterX,
      mCenterY,
      mRadius,
      Arrays.toString(mColors),
      Arrays.toString(mStops),
      mTileMode.toString()
    ));
  }
}
