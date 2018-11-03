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

    mMode = converter.convertPorterDuffMode(config != null ? config.optJSONObject("mode") : null, PorterDuff.Mode.ADD);
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
      outBitmapWidth(dst.getWidth(), src.getWidth()),
      outBitmapHeight(dst.getHeight(), src.getHeight())
    );

    try {
      final Canvas canvas = new Canvas(outRef.get());
      final Paint paint = new Paint();

      final int canvasWidth = canvas.getWidth();
      final int canvasHeight = canvas.getHeight();

      canvas.drawBitmap(
        dst,
        null,
        bitmapFrame(
          canvasWidth,
          canvasHeight,
          dst.getWidth(),
          dst.getHeight(),
          mDstResizeMode,
          mDstGravityAxis
        ),
        paint
      );

      paint.setXfermode(new PorterDuffXfermode(mMode));

      canvas.drawBitmap(
        src,
        null,
        bitmapFrame(
          canvasWidth,
          canvasHeight,
          src.getWidth(),
          src.getHeight(),
          mSrcResizeMode,
          mSrcGravityAxis
        ),
        paint
      );

      return CloseableReference.cloneOrNull(outRef);
    } finally {
      CloseableReference.closeSafely(outRef);
    }
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
