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
import iyegoroff.imagefilterkit.MixStep;
import iyegoroff.imagefilterkit.RenderscriptUtils;
import iyegoroff.imagefilterkit.utility.RenderscriptGeneratorPostProcessor;

public class RectangularGradientPostProcessor extends RenderscriptGeneratorPostProcessor {

  private final MixStep mMixStep;
  private final float mHalfWidth;
  private final float mHalfHeight;
  private final float mCenterX;
  private final float mCenterY;
  private final @Nonnull int[] mColors;
  private final @Nonnull float[] mStops;

  public RectangularGradientPostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull Context context
  ) {
    super(width, height, config, context);

    int[] defaultColors = { 0, 255 };
    float[] defaultStops = { 0, 1 };

    InputConverter converter = new InputConverter(width, height);

    mMixStep = converter.convertMixStep(config, "mixStep", MixStep.CLAMP);
    mHalfWidth = converter.convertDistance(config, "halfWidth", "50w");
    mHalfHeight = converter.convertDistance(config, "halfHeight", "50h");
    mCenterX = converter.convertDistance(config, "centerX", "50w");
    mCenterY = converter.convertDistance(config, "centerY", "50h");
    mColors = converter.convertColorVector(config, "colors", defaultColors);
    mStops = converter.convertScalarVector(config, "stops", defaultStops);
  }

  @Override
  public String getName() {
    return "RectangularGradientPostProcessor";
  }

  @Override
  protected void processGeneratorRenderscript(Bitmap bitmap) {
    RenderscriptContext ctx = new RenderscriptContext(bitmap, getContext());

    final ScriptC_RectangularGradient script = new ScriptC_RectangularGradient(ctx.getScript());

    script.set_amount(mColors.length);
    script.set_mixStep(mMixStep.ordinal());
    script.set_centerX(mCenterX);
    script.set_centerY(mCenterY);
    script.set_halfWidth(mHalfWidth);
    script.set_halfHeight(mHalfHeight);
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
      "rectangular_gradient_%d_%d_%s_%f_%f_%f_%f_%s_%s",
      mWidth,
      mHeight,
      mMixStep.toString(),
      mCenterX,
      mCenterY,
      mHalfWidth,
      mHalfHeight,
      Arrays.toString(mColors),
      Arrays.toString(mStops)
    ));
  }
}
