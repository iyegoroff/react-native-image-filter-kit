package iyegoroff.imagefilterkit.nativeplatform;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.image.CloseableImage;

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
    final CloseableReference<Bitmap> outRef = bitmapFactory.createBitmap(
      canvasExtent(dst.getWidth(), src.getWidth(), mWidth),
      canvasExtent(dst.getHeight(), src.getWidth(), mHeight)
    );

    try {
      final Canvas canvas = new Canvas(outRef.get());
      final Paint paint = new Paint();

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
