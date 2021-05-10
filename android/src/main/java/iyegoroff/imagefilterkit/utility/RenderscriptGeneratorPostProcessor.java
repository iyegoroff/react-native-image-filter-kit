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

import iyegoroff.imagefilterkit.MainReactPackageWithFrescoCache;
import iyegoroff.imagefilterkit.SharedRenderscript;

public abstract class RenderscriptGeneratorPostProcessor extends CacheablePostProcessor {

  protected static class RenderscriptContext {
    private final RenderScript mScript;
    private final Allocation mAlloc;

    public RenderscriptContext(final Bitmap bitmap, final Context context) {
      final Allocation.MipmapControl mips = Allocation.MipmapControl.MIPMAP_NONE;
      final int usage = Allocation.USAGE_SCRIPT;
      mScript = SharedRenderscript.getInstance(context).script();
      mAlloc = Allocation.createFromBitmap(mScript, bitmap, mips, usage);
    }

    public void copyTo(Bitmap out) {
      mAlloc.copyTo(out);
    }

    public Allocation getAlloc() {
      return mAlloc;
    }

    public RenderScript getScript() {
      return mScript;
    }

    public void destroy() {
      mAlloc.destroy();
    }
  }

  private final @Nonnull Context mContext;
  protected final int mWidth;
  protected final int mHeight;

  public RenderscriptGeneratorPostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull Context context
  ) {
    super(config);

    mContext = context;
    mWidth = width;
    mHeight = height;
  }

  protected Context getContext() {
    return mContext;
  }

  protected abstract void processGeneratorRenderscript(Bitmap bitmap);

  @Override
  public CloseableReference<Bitmap> process(
    Bitmap src,
    PlatformBitmapFactory bitmapFactory
  ) {
    final CloseableReference<Bitmap> bitmapRef = bitmapFactory
      .createBitmap(mWidth, mHeight, MainReactPackageWithFrescoCache.bitmapsConfig());

    try {
      final Bitmap dst = bitmapRef.get();

      processGeneratorRenderscript(dst);

      return CloseableReference.cloneOrNull(bitmapRef);
    } finally {
      CloseableReference.closeSafely(bitmapRef);
    }
  }
}
