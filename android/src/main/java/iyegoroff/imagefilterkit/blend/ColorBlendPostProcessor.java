package iyegoroff.imagefilterkit.blend;

import android.content.Context;
import android.graphics.Bitmap;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.image.CloseableImage;

import org.json.JSONObject;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.utility.RenderscriptCompositionPostProcessor;

public class ColorBlendPostProcessor extends RenderscriptCompositionPostProcessor {

  public ColorBlendPostProcessor(
    final int width,
    final int height,
    final @Nullable JSONObject config,
    final @Nonnull CloseableReference<CloseableImage> src,
    final @Nonnull CacheKey srcCacheKey,
    final @Nonnull Context context
  ) {
    super(width, height, config, src, srcCacheKey, context);
  }

  @Override
  public String getName() {
    return "ColorBlendPostProcessor";
  }

  @Override
  protected void processRenderscriptComposition(
    final Bitmap dst,
    final Bitmap src,
    final Bitmap out
  ) {
    RenderscriptContext ctx = new RenderscriptContext(dst, src, out, getContext());

    final ScriptC_ColorBlend script = new ScriptC_ColorBlend(ctx.getScript());

    script.set_srcImage(ctx.getSrcAlloc());
    script.forEach_blendImage(ctx.getDstAlloc(), ctx.getOutAlloc());

    ctx.copyTo(out);

    script.destroy();
    ctx.destroy();
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return compositionCacheKey("color_blend");
  }
}
