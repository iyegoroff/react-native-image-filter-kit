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

      final int canvasWidth = canvas.getWidth();
      final int canvasHeight = canvas.getHeight();

      Log.d(ReactConstants.TAG, "IFK: DST " + bitmapFrame(
        canvasWidth,
        canvasHeight,
        dst.getWidth(),
        dst.getHeight(),
        mDstResizeMode,
        mDstAnchor,
        mDstPosition
      ).toString() + " " + String.valueOf(dst.getWidth()) + " " + String.valueOf(dst.getHeight()));

      canvas.drawBitmap(
        dst,
        null,
        bitmapFrame(
          canvasWidth,
          canvasHeight,
          dst.getWidth(),
          dst.getHeight(),
          mDstResizeMode,
          mDstAnchor,
          mDstPosition
        ),
        paint
      );

      Log.d(ReactConstants.TAG, "IFK: SRC " + bitmapFrame(
        canvasWidth,
        canvasHeight,
        src.getWidth(),
        src.getHeight(),
        mSrcResizeMode,
        mSrcAnchor,
        mSrcPosition
      ).toString() + " " + String.valueOf(src.getWidth()) + " " + String.valueOf(src.getHeight()));

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
          mSrcAnchor,
          mSrcPosition
        ),
        paint
      );

      Log.d(ReactConstants.TAG, String.format(
        (Locale) null,
        "IFK: DST {%d, %d, %s}; SRC {%d, %d, %s}; Canvas {%d, %d};",
        dst.getWidth(), dst.getHeight(), mDstResizeMode.toString(),
        src.getWidth(), src.getHeight(), mSrcResizeMode.toString(),
        canvasWidth, canvasHeight
      ));

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
