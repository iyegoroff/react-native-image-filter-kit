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

import iyegoroff.imagefilterkit.R;
import iyegoroff.imagefilterkit.utility.RenderscriptCompositionPostProcessor;

public class ColorBurnBlendPostProcessor extends RenderscriptCompositionPostProcessor {

  public ColorBurnBlendPostProcessor(
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
  public String getName () {
    return "ColorBurnBlendPostProcessor";
  }

  @Override
  protected void processRenderscriptComposition(
    final Bitmap dst,
    final Bitmap src,
    final Bitmap out
  ) {
    final Context context = getContext();
    final RenderScript rs = RenderScript.create(context);
    final Allocation.MipmapControl mips = Allocation.MipmapControl.MIPMAP_NONE;
    final int usage = Allocation.USAGE_SCRIPT;
    final Allocation dstAlloc = Allocation.createFromBitmap(rs, dst, mips, usage);
    final Allocation srcAlloc = Allocation.createFromBitmap(rs, src, mips, usage);
    final Allocation outAlloc = Allocation.createFromBitmap(rs, out, mips, usage);
    final ScriptC_ColorBurnBlend script =
      new ScriptC_ColorBurnBlend(rs, context.getResources(), R.raw.colorburnblend);

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
    return compositionCacheKey("color_burn_blend");
  }
}
