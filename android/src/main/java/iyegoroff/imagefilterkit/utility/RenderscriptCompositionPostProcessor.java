package iyegoroff.imagefilterkit.utility;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.renderscript.Allocation;
import android.renderscript.RenderScript;
import android.util.Log;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.react.common.ReactConstants;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public abstract class RenderscriptCompositionPostProcessor extends CompositionPostProcessor {

  protected static class RenderscriptContext {
    private final RenderScript mScript;
    private final Allocation mDstAlloc;
    private final Allocation mSrcAlloc;
    private final Allocation mOutAlloc;

    public RenderscriptContext(
      final Bitmap dst,
      final Bitmap src,
      final Bitmap out,
      final Context context
    ) {
      final Allocation.MipmapControl mips = Allocation.MipmapControl.MIPMAP_NONE;
      final int usage = Allocation.USAGE_SCRIPT;
      mScript = RenderScript.create(context);
      mDstAlloc = Allocation.createFromBitmap(mScript, dst, mips, usage);
      mSrcAlloc = Allocation.createFromBitmap(mScript, src, mips, usage);
      mOutAlloc = Allocation.createFromBitmap(mScript, out, mips, usage);
    }

    public void copyTo(Bitmap out) {
      mOutAlloc.copyTo(out);
    }

    public Allocation getDstAlloc() {
      return mDstAlloc;
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
      mDstAlloc.destroy();
      mSrcAlloc.destroy();
      mOutAlloc.destroy();
      mScript.destroy();
    }
  }

  private final @Nonnull Context mContext;

  public RenderscriptCompositionPostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull CloseableReference<CloseableImage> src,
    @Nonnull CacheKey srcCacheKey,
    @Nonnull Context context
  ) {
    super(width, height, config, src, srcCacheKey);

    mContext = context;
  }

  protected Context getContext() {
    return mContext;
  }

  protected abstract void processRenderscriptComposition(Bitmap dst, Bitmap src, Bitmap out);

  @Override
  protected CloseableReference<Bitmap> processComposition(
    Bitmap dst,
    Bitmap src,
    PlatformBitmapFactory bitmapFactory
  ) {
    final int outWidth = outBitmapExtent(dst.getWidth(), src.getWidth());
    final int outHeight = outBitmapExtent(dst.getHeight(), src.getHeight());

    final CloseableReference<Bitmap> tmpDstRef = bitmapFactory.createBitmap(outWidth, outHeight);
    final CloseableReference<Bitmap> tmpSrcRef = bitmapFactory.createBitmap(outWidth, outHeight);
    final CloseableReference<Bitmap> outRef = bitmapFactory.createBitmap(outWidth, outHeight);

    try {
      final Bitmap out = outRef.get();
      final Bitmap tmpDst = tmpDstRef.get();
      final Bitmap tmpSrc = tmpSrcRef.get();

      final Canvas dstCanvas = new Canvas(tmpDst);
      final Canvas srcCanvas = new Canvas(tmpSrc);

      Log.d(ReactConstants.TAG, "IFK: DST " + bitmapFrame(
        outWidth,
        outHeight,
        dst.getWidth(),
        dst.getHeight(),
        mDstResizeMode,
        mDstAnchor,
        mDstPosition
      ).toString());

      dstCanvas.drawBitmap(
        dst,
        null,
        bitmapFrame(
          outWidth,
          outHeight,
          dst.getWidth(),
          dst.getHeight(),
          mDstResizeMode,
          mDstAnchor,
          mDstPosition
        ),
        new Paint()
      );

      Log.d(ReactConstants.TAG, "IFK: SRC " + bitmapFrame(
        outWidth,
        outHeight,
        src.getWidth(),
        src.getHeight(),
        mSrcResizeMode,
        mSrcAnchor,
        mSrcPosition
      ).toString());

      srcCanvas.drawBitmap(
        src,
        null,
        bitmapFrame(
          outWidth,
          outHeight,
          src.getWidth(),
          src.getHeight(),
          mSrcResizeMode,
          mSrcAnchor,
          mSrcPosition
        ),
        new Paint()
      );

      processRenderscriptComposition(tmpDst, tmpSrc, out);

      Log.d(ReactConstants.TAG, String.format(
        (Locale) null,
        "IFK: DST {%d, %d, %s}; SRC {%d, %d, %s}; Canvas {%d, %d};",
        dst.getWidth(), dst.getHeight(), mDstResizeMode.toString(),
        src.getWidth(), src.getHeight(), mSrcResizeMode.toString(),
        outWidth, outHeight
      ));

      return CloseableReference.cloneOrNull(outRef);
    } finally {
      CloseableReference.closeSafely(tmpDstRef);
      CloseableReference.closeSafely(tmpSrcRef);
      CloseableReference.closeSafely(outRef);
    }
  }
}
