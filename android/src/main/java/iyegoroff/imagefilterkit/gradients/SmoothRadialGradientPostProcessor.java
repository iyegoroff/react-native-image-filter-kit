package iyegoroff.imagefilterkit.gradients;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.Log;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.react.common.ReactConstants;

import org.json.JSONObject;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.RenderscriptUtils;
import iyegoroff.imagefilterkit.utility.RenderscriptGeneratorPostProcessor;

public class SmoothRadialGradientPostProcessor extends RenderscriptGeneratorPostProcessor {

  private final float mRadius;
  private final float mCenterX;
  private final float mCenterY;
  private final @Nonnull int[] mColors;
  private final @Nonnull float[] mStops;

  public SmoothRadialGradientPostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull Context context
  ) {
    super(width, height, config, context);

    int[] defaultColors = { 0, 255 };
    float[] defaultStops = { 0, 1 };

    InputConverter converter = new InputConverter(width, height);

    mRadius = converter.convertDistance(config, "radius", "50min");
    mCenterX = converter.convertDistance(config, "centerX", "50w");
    mCenterY = converter.convertDistance(config, "centerY", "50h");
    mColors = converter.convertColorVector(config, "colors", defaultColors);
    mStops = converter.convertScalarVector(config, "stops", defaultStops);
  }

  @Override
  public String getName() {
    return "SmoothRadialGradientPostProcessor";
  }

  @Override
  protected void processGeneratorRenderscript(Bitmap bitmap) {
    RenderscriptContext ctx = new RenderscriptContext(bitmap, getContext());

    final ScriptC_SmoothRadialGradient script = new ScriptC_SmoothRadialGradient(ctx.getScript());

    script.set_amount(mColors.length);
    script.set_centerX(mCenterX);
    script.set_centerY(mCenterY);
    script.set_radius(mRadius);
    script.set_positions(RenderscriptUtils.renderscriptPositions(mStops));
    script.set_colors(RenderscriptUtils.renderscriptColors(mColors));

    script.forEach_generate(ctx.getAlloc(), ctx.getAlloc());

    ctx.copyTo(bitmap);

    script.destroy();
    ctx.destroy();
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(String.format(
      Locale.ROOT,
      "smooth_radial_gradient_%d_%d_%f_%f_%f_%s_%s",
      mWidth,
      mHeight,
      mCenterX,
      mCenterY,
      mRadius,
      Arrays.toString(mColors),
      Arrays.toString(mStops)
    ));
  }
}
