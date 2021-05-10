package iyegoroff.imagefilterkit.utility;

import android.content.Context;
import android.graphics.Bitmap;
import android.renderscript.Allocation;
import android.renderscript.RenderScript;

import org.json.JSONObject;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.SharedRenderscript;

public abstract class RenderscriptSingularPostProcessor extends CacheablePostProcessor {

  protected static class RenderscriptContext {
    private final RenderScript mScript;
    private final Allocation mSrcAlloc;
    private final Allocation mOutAlloc;

    public RenderscriptContext(final Bitmap src, final Bitmap out, final Context context) {
      final Allocation.MipmapControl mips = Allocation.MipmapControl.MIPMAP_NONE;
      final int usage = Allocation.USAGE_SCRIPT;
      mScript = SharedRenderscript.getInstance(context).script();
      mSrcAlloc = Allocation.createFromBitmap(mScript, src, mips, usage);
      mOutAlloc = Allocation.createFromBitmap(mScript, out, mips, usage);
    }

    public void copyTo(Bitmap out) {
      mOutAlloc.copyTo(out);
    }

    public Allocation getSrcAlloc() {
      return mSrcAlloc;
    }

    public Allocation getOutAlloc() {
      return mOutAlloc;
    }

    public RenderScript getScript() {
      return mScript;
    }

    public void destroy() {
      mSrcAlloc.destroy();
      mOutAlloc.destroy();
    }
  }

  private final @Nonnull Context mContext;

  public RenderscriptSingularPostProcessor(@Nullable JSONObject config, @Nonnull Context context) {
    super(config);

    mContext = context;
  }

  protected Context getContext() {
    return mContext;
  }

  protected abstract void processSingularRenderscript(Bitmap src, Bitmap out);

  @Override
  public void process(Bitmap dst, Bitmap src) {
    super.process(dst, src);

    processSingularRenderscript(src, dst);
  }
}
