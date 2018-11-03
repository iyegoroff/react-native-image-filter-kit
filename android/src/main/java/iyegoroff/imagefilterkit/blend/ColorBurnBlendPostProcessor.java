package iyegoroff.imagefilterkit.blend;

import android.content.Context;
import android.graphics.Bitmap;
import android.support.v8.renderscript.Allocation;
import android.support.v8.renderscript.RenderScript;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.image.CloseableImage;

import org.json.JSONObject;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.ContextProvider;
import iyegoroff.imagefilterkit.R;
import iyegoroff.imagefilterkit.utility.RenderscriptCompositionPostProcessor;

public class ColorBurnBlendPostProcessor extends RenderscriptCompositionPostProcessor {

  public ColorBurnBlendPostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull CloseableReference<CloseableImage> src,
    @Nonnull CacheKey srcCacheKey
  ) {
    super(width, height, config, src, srcCacheKey);
  }

  @Override
  public String getName () {
    return "ColorBurnBlendPostProcessor";
  }

  @Override
  protected void processRenderscriptComposition(Bitmap dst, Bitmap src, Bitmap out) {
    final Context context = ContextProvider.getContext();
    final RenderScript rs = RenderScript.create(context);
    final Allocation dstAlloc = Allocation.createFromBitmap(rs, dst, Allocation.MipmapControl.MIPMAP_NONE, Allocation.USAGE_SCRIPT);
    final Allocation srcAlloc = Allocation.createFromBitmap(rs, src, Allocation.MipmapControl.MIPMAP_NONE, Allocation.USAGE_SCRIPT);
    final Allocation outAlloc = Allocation.createFromBitmap(rs, out, Allocation.MipmapControl.MIPMAP_NONE, Allocation.USAGE_SCRIPT);
    final ScriptC_ColorBurnBlend script =
      new ScriptC_ColorBurnBlend(rs, context.getResources(), R.raw.colorburnblend);

    script.set_gSrc(srcAlloc);
    script.forEach_root(dstAlloc, outAlloc);

    outAlloc.copyTo(out);
    script.destroy();
    dstAlloc.destroy();
    srcAlloc.destroy();
    outAlloc.destroy();
    rs.destroy();
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return compositionCacheKey("color_burn_blend");
  }
}
