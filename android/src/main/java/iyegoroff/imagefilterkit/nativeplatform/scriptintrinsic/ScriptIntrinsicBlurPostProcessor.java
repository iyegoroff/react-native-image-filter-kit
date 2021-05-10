package iyegoroff.imagefilterkit.nativeplatform.scriptintrinsic;

import android.content.Context;
import android.graphics.Bitmap;
import android.renderscript.Element;
import android.renderscript.ScriptIntrinsicBlur;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.RenderscriptSingularPostProcessor;

public class ScriptIntrinsicBlurPostProcessor extends RenderscriptSingularPostProcessor {

  private final int mRadius;

  public ScriptIntrinsicBlurPostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull Context context
  ) {
    super(config, context);

    InputConverter converter = new InputConverter(width, height);

    mRadius = (int)converter.convertScalar(config, "radius", 5.0f);
  }

  @Override
  public String getName() {
    return "ScriptIntrinsicBlurPostProcessor";
  }

  @Override
  protected void processSingularRenderscript(Bitmap src, Bitmap out) {
    RenderscriptContext ctx = new RenderscriptContext(src, out, getContext());

    final ScriptIntrinsicBlur script = ScriptIntrinsicBlur
      .create(ctx.getScript(), Element.U8_4(ctx.getScript()));

    script.setInput(ctx.getSrcAlloc());
    script.setRadius(mRadius);
    script.forEach(ctx.getOutAlloc());

    ctx.copyTo(out);

    script.destroy();
    ctx.destroy();
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(String.format(Locale.ROOT, "script_intrinsic_blur_%d", mRadius));
  }
}
