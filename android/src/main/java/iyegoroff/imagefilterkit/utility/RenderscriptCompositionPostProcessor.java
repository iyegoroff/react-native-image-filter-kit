package iyegoroff.imagefilterkit.utility;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.image.CloseableImage;

import org.json.JSONObject;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public abstract class RenderscriptCompositionPostProcessor extends CompositionPostProcessor {

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
    final int outWidth = outBitmapWidth(dst.getWidth(), src.getWidth());
    final int outHeight = outBitmapHeight(dst.getHeight(), src.getHeight());

    final CloseableReference<Bitmap> tmpDstRef = bitmapFactory.createBitmap(outWidth, outHeight);
    final CloseableReference<Bitmap> tmpSrcRef = bitmapFactory.createBitmap(outWidth, outHeight);
    final CloseableReference<Bitmap> outRef = bitmapFactory.createBitmap(outWidth, outHeight);

    try {
      final Bitmap out = outRef.get();
      final Bitmap tmpDst = tmpDstRef.get();
      final Bitmap tmpSrc = tmpSrcRef.get();

      final Canvas dstCanvas = new Canvas(tmpDst);
      final Canvas srcCanvas = new Canvas(tmpSrc);

      dstCanvas.drawBitmap(
        dst,
        null,
        bitmapFrame(
          outWidth,
          outHeight,
          dst.getWidth(),
          dst.getHeight(),
          mDstResizeMode,
          mDstGravityAxis
        ),
        new Paint()
      );

      srcCanvas.drawBitmap(
        src,
        null,
        bitmapFrame(
          outWidth,
          outHeight,
          src.getWidth(),
          src.getHeight(),
          mSrcResizeMode,
          mSrcGravityAxis
        ),
        new Paint()
      );

      processRenderscriptComposition(tmpDst, tmpSrc, out);

      return CloseableReference.cloneOrNull(outRef);
    } finally {
      CloseableReference.closeSafely(tmpDstRef);
      CloseableReference.closeSafely(tmpSrcRef);
      CloseableReference.closeSafely(outRef);
    }
  }
}
