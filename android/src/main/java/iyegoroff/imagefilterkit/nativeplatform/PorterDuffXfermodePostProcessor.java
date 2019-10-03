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

    mMode = converter.convertPorterDuffMode(config, "mode", PorterDuff.Mode.ADD);
  }

  @Override
  public String getName() {
    return "PorterDuffXfermodePostProcessor";
  }

  @Override
  protected CloseableReference<Bitmap> processComposition(
    Bitmap dstImage,
    Bitmap srcImage,
    PlatformBitmapFactory bitmapFactory
  ) {
    final CloseableReference<Bitmap> outRef = bitmapFactory.createBitmap(
      canvasExtent(dstImage.getWidth(), srcImage.getWidth(), mWidth),
      canvasExtent(dstImage.getHeight(), srcImage.getHeight(), mHeight)
    );

    try {
      final Canvas canvas = new Canvas(outRef.get());
      final int flags = Paint.ANTI_ALIAS_FLAG | Paint.DITHER_FLAG | Paint.FILTER_BITMAP_FLAG;
      final Paint paint = new Paint(flags);

      if (mSwapImages) {
        drawSrc(canvas, srcImage, paint);

      } else {
        drawDst(canvas, dstImage, paint);
      }

      paint.setXfermode(new PorterDuffXfermode(mMode));

      if (mSwapImages) {
        drawDst(canvas, dstImage, paint);

      } else {
        drawSrc(canvas, srcImage, paint);
      }

      return CloseableReference.cloneOrNull(outRef);
    } finally {
      CloseableReference.closeSafely(outRef);
    }
  }

  private void drawDst(@Nonnull Canvas canvas, @Nonnull Bitmap dst, @Nonnull Paint paint) {
    canvas.drawBitmap(
      dst,
      bitmapTransform(
        canvas.getWidth(),
        canvas.getHeight(),
        dst.getWidth(),
        dst.getHeight(),
        mDstTransform
      ),
      paint
    );
  }

  private void drawSrc(@Nonnull Canvas canvas, @Nonnull Bitmap src, @Nonnull Paint paint) {
    canvas.drawBitmap(
      src,
      bitmapTransform(
        canvas.getWidth(),
        canvas.getHeight(),
        src.getWidth(),
        src.getHeight(),
        mSrcTransform
      ),
      paint
    );
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return compositionCacheKey(String.format(
      Locale.ROOT,
      "porter_duff_xfermode_%s",
      mMode.toString())
    );
  }
}
