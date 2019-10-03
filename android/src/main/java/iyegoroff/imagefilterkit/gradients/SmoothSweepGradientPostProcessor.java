package iyegoroff.imagefilterkit.gradients;

import android.content.Context;
import android.graphics.Bitmap;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.RenderscriptUtils;
import iyegoroff.imagefilterkit.utility.RenderscriptGeneratorPostProcessor;

public class SmoothSweepGradientPostProcessor extends RenderscriptGeneratorPostProcessor {

  private final float mCx;
  private final float mCy;
  private final @Nonnull int[] mColors;
  private final @Nonnull float[] mPositions;

  public SmoothSweepGradientPostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull Context context
  ) {
    super(width, height, config, context);

    int[] defaultColors = { 0, 255 };
    float[] defaultStops = { 0, 1 };

    InputConverter converter = new InputConverter(width, height);

    mCx = converter.convertDistance(config, "cx", "50w");
    mCy = converter.convertDistance(config, "cy", "50h");
    mColors = converter.convertColorVector(config, "colors", defaultColors);
    mPositions = converter.convertScalarVector(config, "positions", defaultStops);
  }

  @Override
  public String getName() {
    return "SmoothSweepGradientPostProcessor";
  }

  @Override
  protected void processGeneratorRenderscript(Bitmap bitmap) {
    RenderscriptContext ctx = new RenderscriptContext(bitmap, getContext());

    final ScriptC_SmoothSweepGradient script = new ScriptC_SmoothSweepGradient(ctx.getScript());

    script.set_amount(mColors.length);
    script.set_centerX(mCx);
    script.set_centerY(mCy);
    script.set_positions(RenderscriptUtils.renderscriptPositions(mPositions));
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
      "smooth_sweep_gradient_%d_%d_%f_%f_%s_%s",
      mWidth,
      mHeight,
      mCx,
      mCy,
      Arrays.toString(mColors),
      Arrays.toString(mPositions)
    ));
  }
}
