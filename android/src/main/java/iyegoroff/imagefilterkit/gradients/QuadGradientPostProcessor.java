package iyegoroff.imagefilterkit.gradients;

import android.content.Context;
import android.graphics.Bitmap;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.RenderscriptUtils;
import iyegoroff.imagefilterkit.utility.RenderscriptGeneratorPostProcessor;

public class QuadGradientPostProcessor extends RenderscriptGeneratorPostProcessor {

  private final int mBottomLeftColor;
  private final int mBottomRightColor;
  private final int mTopLeftColor;
  private final int mTopRightColor;

  public QuadGradientPostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull Context context
  ) {
    super(width, height, config, context);

    InputConverter converter = new InputConverter(width, height);

    mBottomLeftColor = converter.convertColor(config, "bottomLeftColor", 0);
    mBottomRightColor = converter.convertColor(config, "bottomRightColor", 0);
    mTopLeftColor = converter.convertColor(config, "topLeftColor", 0);
    mTopRightColor = converter.convertColor(config, "topRightColor", 0);
  }

  @Override
  public String getName() {
    return "QuadGradientPostProcessor";
  }

  @Override
  protected void processGeneratorRenderscript(Bitmap bitmap) {
    RenderscriptContext ctx = new RenderscriptContext(bitmap, getContext());

    final ScriptC_QuadGradient script = new ScriptC_QuadGradient(ctx.getScript());

    script.set_width(mWidth);
    script.set_height(mHeight);
    script.set_bottomLeftColor(RenderscriptUtils.toRenderscriptColor(mBottomLeftColor));
    script.set_bottomRightColor(RenderscriptUtils.toRenderscriptColor(mBottomRightColor));
    script.set_topLeftColor(RenderscriptUtils.toRenderscriptColor(mTopLeftColor));
    script.set_topRightColor(RenderscriptUtils.toRenderscriptColor(mTopRightColor));
    script.forEach_generate(ctx.getAlloc(), ctx.getAlloc());

    ctx.copyTo(bitmap);

    script.destroy();
    ctx.destroy();
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(
      String.format(
        Locale.ROOT,
        "quad_gradient_%d_%d_%d_%d_%d_%d",
        mBottomLeftColor,
        mBottomRightColor,
        mTopLeftColor,
        mTopRightColor,
        mWidth,
        mHeight
      )
    );
  }

}
