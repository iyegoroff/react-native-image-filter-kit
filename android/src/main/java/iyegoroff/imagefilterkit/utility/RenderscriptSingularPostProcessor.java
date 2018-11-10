package iyegoroff.imagefilterkit.utility;

import android.content.Context;
import android.graphics.Bitmap;
import android.renderscript.Allocation;
import android.renderscript.RenderScript;

import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;

import org.json.JSONObject;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public abstract class RenderscriptSingularPostProcessor extends CacheablePostProcessor {

  protected static class RenderscriptContext {
    private final RenderScript mScript;
    private final Allocation mDstAlloc;
    private final Allocation mOutAlloc;

    public RenderscriptContext(final Bitmap dst, final Bitmap out, final Context context) {
      final Allocation.MipmapControl mips = Allocation.MipmapControl.MIPMAP_NONE;
      final int usage = Allocation.USAGE_SCRIPT;
      mScript = RenderScript.create(context);
      mDstAlloc = Allocation.createFromBitmap(mScript, dst, mips, usage);
      mOutAlloc = Allocation.createFromBitmap(mScript, out, mips, usage);
    }

    public void copyTo(Bitmap out) {
      mOutAlloc.copyTo(out);
    }

    public Allocation getDstAlloc() {
      return mDstAlloc;
    }

    public Allocation getOutAlloc() {
      return mOutAlloc;
    }

    public RenderScript getScript() {
      return mScript;
    }

    public void destroy() {
      mDstAlloc.destroy();
      mOutAlloc.destroy();
      mScript.destroy();
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

  protected abstract void processSingularRenderscript(Bitmap dst, Bitmap out);

  @Override
  public CloseableReference<Bitmap> process(
    Bitmap dst,
    PlatformBitmapFactory bitmapFactory
  ) {
    final CloseableReference<Bitmap> outRef = bitmapFactory.createBitmap(
      dst.getWidth(),
      dst.getHeight()
    );

    try {
      final Bitmap out = outRef.get();

      processSingularRenderscript(dst, out);

      return CloseableReference.cloneOrNull(outRef);
    } finally {
      CloseableReference.closeSafely(outRef);
    }
  }
}
