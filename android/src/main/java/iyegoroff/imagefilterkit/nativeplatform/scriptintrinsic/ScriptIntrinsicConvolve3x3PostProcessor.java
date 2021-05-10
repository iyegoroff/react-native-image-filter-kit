package iyegoroff.imagefilterkit.nativeplatform.scriptintrinsic;

import android.content.Context;
import android.graphics.Bitmap;
import android.renderscript.Element;
import android.renderscript.ScriptIntrinsicConvolve3x3;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.RenderscriptSingularPostProcessor;

public class ScriptIntrinsicConvolve3x3PostProcessor extends RenderscriptSingularPostProcessor {

  private @Nonnull final float[] mCoefficients;

  private static final float[] mDefaultCoefficients =
    { 0, 0, 0,
      0, 1, 0,
      0, 0, 0 };

  public ScriptIntrinsicConvolve3x3PostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull Context context
  ) {
    super(config, context);

    InputConverter converter = new InputConverter(width, height);

    mCoefficients = converter.convertScalarVector(config, "coefficients", mDefaultCoefficients);
  }

  @Override
  public String getName() {
    return "ScriptIntrinsicConvolve3x3PostProcessor";
  }

  @Override
  protected void processSingularRenderscript(Bitmap src, Bitmap out) {
    RenderscriptContext ctx = new RenderscriptContext(src, out, getContext());

    final ScriptIntrinsicConvolve3x3 script = ScriptIntrinsicConvolve3x3
      .create(ctx.getScript(), Element.U8_4(ctx.getScript()));

    script.setInput(ctx.getSrcAlloc());
    script.setCoefficients(mCoefficients);
    script.forEach(ctx.getOutAlloc());

    ctx.copyTo(out);

    script.destroy();
    ctx.destroy();
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(String.format(
      Locale.ROOT,
      "script_intrinsic_convolve_3x3_%s",
      Arrays.toString(mCoefficients))
    );
  }
}
