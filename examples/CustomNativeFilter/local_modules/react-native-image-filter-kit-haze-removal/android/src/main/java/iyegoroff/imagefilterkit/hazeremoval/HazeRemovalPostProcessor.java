package iyegoroff.imagefilterkit.hazeremoval;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.renderscript.Float4;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.RenderscriptSingularPostProcessor;

public class HazeRemovalPostProcessor extends RenderscriptSingularPostProcessor {

  private final float mDistance;
  private final float mSlope;
  private final int mColor;

  HazeRemovalPostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull Context context
  ) {
    super(config, context);

    InputConverter converter = new InputConverter(width, height);

    mDistance = converter.convertScalar(config, "distance", 0.2f);
    mSlope = converter.convertScalar(config, "slope", 0);
    mColor = converter.convertColor(config, "color", 0);
  }

  @Override
  public String getName() {
    return "HazeRemovalPostProcessor";
  }

  @Override
  protected void processSingularRenderscript(Bitmap dst, Bitmap out) {
    RenderscriptContext ctx = new RenderscriptContext(dst, out, getContext());

    Float4 color = new Float4(
      Color.red(mColor) / 255.0f,
      Color.green(mColor) / 255.0f,
      Color.blue(mColor) / 255.0f,
      Color.alpha(mColor) / 255.0f
    );

    final ScriptC_HazeRemoval script = new ScriptC_HazeRemoval(ctx.getScript());

    script.set_dist(mDistance);
    script.set_slope(mSlope);
    script.set_color(color);
    script.forEach_filterImage(ctx.getSrcAlloc(), ctx.getOutAlloc());

    ctx.copyTo(out);

    script.destroy();
    ctx.destroy();
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(
      String.format(Locale.ROOT, "haze_removal_%f_%f_%d", mDistance, mSlope, mColor)
    );
  }
}
