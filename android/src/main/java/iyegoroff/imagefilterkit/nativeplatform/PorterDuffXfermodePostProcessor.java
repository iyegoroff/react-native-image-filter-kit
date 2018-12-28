package iyegoroff.imagefilterkit.nativeplatform;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.util.Log;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.uimanager.PixelUtil;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.CompositionPostProcessor;

public class PorterDuffXfermodePostProcessor extends CompositionPostProcessor {

  private final @Nonnull PorterDuff.Mode mMode;

  public PorterDuffXfermodePostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull CloseableReference<CloseableImage> src,
    @Nonnull CacheKey srcCacheKey
  ) {
    super(width, height, config, src, srcCacheKey);

    InputConverter converter = new InputConverter(width, height);

    mMode = converter.convertPorterDuffMode(
      config != null ? config.optJSONObject("mode") : null, PorterDuff.Mode.ADD
    );
  }

  @Override
  public String getName () {
    return "PorterDuffXfermodePostProcessor";
  }

  @Override
  protected CloseableReference<Bitmap> processComposition(
    Bitmap dst,
    Bitmap src,
    PlatformBitmapFactory bitmapFactory
  ) {
    int width = Math.round(PixelUtil.toPixelFromDIP(mWidth));
    int height = Math.round(PixelUtil.toPixelFromDIP(mHeight));
    width = canvasExtent(dst.getWidth(), src.getWidth(), width);
    height = canvasExtent(dst.getHeight(), src.getHeight(), height);
    final CloseableReference<Bitmap> outRef = bitmapFactory.createBitmap(width, height);
    Log.d(ReactConstants.TAG, String.format((Locale)null, "IFK_ CANVAS(%d %d)", width, height));

    try {
      final Canvas canvas = new Canvas(outRef.get());
      final Paint paint = new Paint();
      paint.setAntiAlias(true);

      if (mSwapImages) {
        drawSrc(canvas, src, paint);

      } else {
        drawDst(canvas, dst, paint);
      }

      paint.setXfermode(new PorterDuffXfermode(mMode));

      if (mSwapImages) {
        drawDst(canvas, dst, paint);

      } else {
        drawSrc(canvas, src, paint);
      }

      Log.d(ReactConstants.TAG, String.format((Locale)null,
        "IFK_ (%d %d) canv(%d %d) out(%d %d <-> %d %d) dst(%d %d) src(%d %d)",
        mWidth,
        mHeight,
        canvas.getWidth(),
        canvas.getHeight(),
        Math.min(dst.getWidth(), src.getWidth()),
        Math.min(dst.getHeight(), src.getWidth()),
        canvasExtent(dst.getWidth(), src.getWidth(), mWidth),
        canvasExtent(dst.getHeight(), src.getWidth(), mHeight),
        dst.getWidth(),
        dst.getHeight(),
        src.getWidth(),
        src.getHeight()
      ));

      return CloseableReference.cloneOrNull(outRef);
    } finally {
      CloseableReference.closeSafely(outRef);
    }
  }

  private void drawDst(@Nonnull Canvas canvas, @Nonnull Bitmap dst, @Nonnull Paint paint) {
    canvas.drawBitmap(
      dst,
      null,
      bitmapFrame(
        canvas.getWidth(),
        canvas.getHeight(),
        dst.getWidth(),
        dst.getHeight(),
        mDstResizeMode,
        mDstAnchor,
        mDstPosition
      ),
      paint
    );
  }

  private void drawSrc(@Nonnull Canvas canvas, @Nonnull Bitmap src, @Nonnull Paint paint) {
    canvas.drawBitmap(
      src,
      null,
      bitmapFrame(
        canvas.getWidth(),
        canvas.getHeight(),
        src.getWidth(),
        src.getHeight(),
        mSrcResizeMode,
        mSrcAnchor,
        mSrcPosition
      ),
      paint
    );
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return compositionCacheKey(String.format(
      (Locale) null,
      "porter_duff_xfermode_%s",
      mMode.toString())
    );
  }
}
