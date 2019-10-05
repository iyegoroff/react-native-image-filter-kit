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

public class SmoothLinearGradientPostProcessor extends RenderscriptGeneratorPostProcessor {

  private final float mX0;
  private final float mY0;
  private final float mX1;
  private final float mY1;
  private final @Nonnull int[] mColors;
  private final @Nonnull float[] mLocations;

  public SmoothLinearGradientPostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull Context context
  ) {
    super(width, height, config, context);

    int[] defaultColors = { 0, 255 };
    float[] defaultLocations = { 0, 1 };

    InputConverter converter = new InputConverter(width, height);

    mX0 = converter.convertDistance(config, "x0", "0");
    mY0 = converter.convertDistance(config, "y0", "0");
    mX1 = converter.convertDistance(config, "x1", "100w");
    mY1 = converter.convertDistance(config, "y1", "0");
    mColors = converter.convertColorVector(config, "colors", defaultColors);
    mLocations = converter.convertScalarVector(config, "locations", defaultLocations);
  }

  @Override
  public String getName() {
    return "SmoothLinearGradientPostProcessor";
  }

  @Override
  protected void processGeneratorRenderscript(Bitmap bitmap) {
    RenderscriptContext ctx = new RenderscriptContext(bitmap, getContext());

    final ScriptC_SmoothLinearGradient script = new ScriptC_SmoothLinearGradient(ctx.getScript());

    script.set_amount(mColors.length);
    script.set_x0(mX0);
    script.set_y0(mY0);
    script.set_x1(mX1);
    script.set_y1(mY1);
    script.set_positions(RenderscriptUtils.renderscriptPositions(mLocations));
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
      "smooth_linear_gradient_%d_%d_%f_%f_%f_%f_%s_%s",
      mWidth,
      mHeight,
      mX0,
      mY0,
      mX1,
      mY1,
      Arrays.toString(mColors),
      Arrays.toString(mLocations)
    ));
  }
}
