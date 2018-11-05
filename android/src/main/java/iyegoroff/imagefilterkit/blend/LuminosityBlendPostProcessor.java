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

public class LuminosityBlendPostProcessor extends RenderscriptCompositionPostProcessor {

  public LuminosityBlendPostProcessor(
    final int width,
    final int height,
    final @Nullable JSONObject config,
    final @Nonnull CloseableReference<CloseableImage> src,
    final @Nonnull CacheKey srcCacheKey
  ) {
    super(width, height, config, src, srcCacheKey);
  }

  @Override
  public String getName () {
    return "LuminosityBlendPostProcessor";
  }

  @Override
  protected void processRenderscriptComposition(
    final Bitmap dst,
    final Bitmap src,
    final Bitmap out
  ) {
    final Context context = ContextProvider.getContext();
    final RenderScript rs = RenderScript.create(context);
    final Allocation.MipmapControl mips = Allocation.MipmapControl.MIPMAP_NONE;
    final int usage = Allocation.USAGE_SCRIPT;
    final Allocation dstAlloc = Allocation.createFromBitmap(rs, dst, mips, usage);
    final Allocation srcAlloc = Allocation.createFromBitmap(rs, src, mips, usage);
    final Allocation outAlloc = Allocation.createFromBitmap(rs, out, mips, usage);
    final ScriptC_LuminosityBlend script =
      new ScriptC_LuminosityBlend(rs, context.getResources(), R.raw.luminosityblend);

    script.set_src(srcAlloc);
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
    return compositionCacheKey("luminosity_blend");
  }
}
