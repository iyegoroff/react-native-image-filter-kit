package iyegoroff.imagefilterkit.utility;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.renderscript.Allocation;
import android.renderscript.RenderScript;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.react.uimanager.PixelUtil;

import org.json.JSONObject;

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
    final int width = canvasExtent(
      dst.getWidth(),
      src.getWidth(),
      Math.round(PixelUtil.toPixelFromDIP(mWidth))
    );
    final int height = canvasExtent(
      dst.getHeight(),
      src.getHeight(),
      Math.round(PixelUtil.toPixelFromDIP(mHeight))
    );

    final CloseableReference<Bitmap> tmpDstRef = bitmapFactory.createBitmap(width, height);
    final CloseableReference<Bitmap> tmpSrcRef = bitmapFactory.createBitmap(width, height);
    final CloseableReference<Bitmap> outRef = bitmapFactory.createBitmap(width, height);

    try {
      final Bitmap out = outRef.get();
      final Bitmap tmpDst = tmpDstRef.get();
      final Bitmap tmpSrc = tmpSrcRef.get();

      final Canvas dstCanvas = new Canvas(tmpDst);
      final Canvas srcCanvas = new Canvas(tmpSrc);
      final int flags = Paint.ANTI_ALIAS_FLAG | Paint.DITHER_FLAG | Paint.FILTER_BITMAP_FLAG;
      final Paint paint = new Paint(flags);

      dstCanvas.drawBitmap(
        dst,
        null,
        bitmapFrame(
          width,
          height,
          dst.getWidth(),
          dst.getHeight(),
          mDstResizeMode,
          mDstAnchor,
          mDstPosition
        ),
        paint
      );

      srcCanvas.drawBitmap(
        src,
        null,
        bitmapFrame(
          width,
          height,
          src.getWidth(),
          src.getHeight(),
          mSrcResizeMode,
          mSrcAnchor,
          mSrcPosition
        ),
        paint
      );

      processRenderscriptComposition(
        mSwapImages ? tmpSrc : tmpDst,
        mSwapImages ? tmpDst : tmpSrc,
        out
      );

      return CloseableReference.cloneOrNull(outRef);
    } finally {
      CloseableReference.closeSafely(tmpDstRef);
      CloseableReference.closeSafely(tmpSrcRef);
      CloseableReference.closeSafely(outRef);
    }
  }
}
