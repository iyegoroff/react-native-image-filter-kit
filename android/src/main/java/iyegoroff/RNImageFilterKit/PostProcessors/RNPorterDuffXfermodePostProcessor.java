package iyegoroff.RNImageFilterKit.PostProcessors;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.RectF;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.image.CloseableBitmap;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.request.BasePostprocessor;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.RNImageFilterKit.RNGravityAxis;
import iyegoroff.RNImageFilterKit.RNInputConverter;
import iyegoroff.RNImageFilterKit.RNResize;
import iyegoroff.RNImageFilterKit.RNScaleMode;

public class RNPorterDuffXfermodePostProcessor extends BasePostprocessor {

  private CacheKey mCacheKey;
  private final @Nonnull PorterDuff.Mode mMode;
  private final @Nonnull RNScaleMode mScaleMode;
  private final @Nonnull CloseableReference<CloseableImage> mSrc;
  private final @Nonnull CacheKey mSrcCacheKey;
  private final @Nonnull RNResize mSrcResizeMode;
  private final @Nonnull RNGravityAxis mSrcGravityAxis;
  private final @Nonnull RNResize mDstResizeMode;
  private final @Nonnull RNGravityAxis mDstGravityAxis;

  public RNPorterDuffXfermodePostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull CloseableReference<CloseableImage> src,
    @Nonnull CacheKey srcCacheKey
  ) {
    RNInputConverter converter = new RNInputConverter(width, height);

    mMode = converter.convertPorterDuffMode(config != null ? config.optJSONObject("mode") : null, PorterDuff.Mode.ADD);
    mScaleMode = converter.convertScaleMode(config != null ? config.optJSONObject("scaleMode") : null, RNScaleMode.UP);
    mSrc = src.clone();
    mSrcCacheKey = srcCacheKey;
    mSrcResizeMode = converter.convertResizeMode(config != null ? config.optJSONObject("srcResizeMode") : null, RNResize.Mode.CONTAIN);
    mSrcGravityAxis = converter.convertGravityAxis(config != null ? config.optJSONObject("srcGravityAxis") : null, RNGravityAxis.CENTER);
    mDstResizeMode = converter.convertResizeMode(config != null ? config.optJSONObject("dstResizeMode") : null, RNResize.Mode.CONTAIN);
    mDstGravityAxis = converter.convertGravityAxis(config != null ? config.optJSONObject("dstGravityAxis") : null, RNGravityAxis.CENTER);
  }

  @Override
  protected void finalize() {
    CloseableReference.closeSafely(mSrc);
  }

  @Override
  public CloseableReference<Bitmap> process(
    Bitmap dst,
    PlatformBitmapFactory bitmapFactory
  ) {
    Bitmap src = ((CloseableBitmap) mSrc.get()).getUnderlyingBitmap();

    final CloseableReference<Bitmap> targetRef = bitmapFactory.createBitmap(
      mScaleMode == RNScaleMode.UP
        ? Math.max(dst.getWidth(), src.getWidth())
        : Math.min(dst.getWidth(), src.getWidth()),
      mScaleMode == RNScaleMode.UP
        ? Math.max(dst.getHeight(), src.getHeight())
        : Math.min(dst.getHeight(), src.getHeight())
    );

    try {
      final Bitmap target = targetRef.get();
      final Canvas canvas = new Canvas(target);
      Paint paint = new Paint();

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

      return CloseableReference.cloneOrNull(targetRef);
    } finally {
      CloseableReference.closeSafely(targetRef);
    }
  }

  private static RectF bitmapFrame(
    int canvasWidth,
    int canvasHeight,
    int bitmapWidth,
    int bitmapHeight,
    @Nonnull RNResize resizeMode,
    @Nonnull RNGravityAxis gravityAxis
  ) {
    float width = 0;
    float height = 0;
    float x = 0;
    float y = 0;

    if (resizeMode instanceof RNResize.WithMode) {
      RNResize.Mode mode = ((RNResize.WithMode) resizeMode).mode;

      if (mode == RNResize.Mode.COVER) {
        if (bitmapWidth > bitmapHeight) {
          height = canvasHeight;
          width = bitmapWidth * height / bitmapHeight;
        } else {
          width = canvasWidth;
          height = bitmapHeight * width / bitmapWidth;
        }
      } else if (mode == RNResize.Mode.CONTAIN) {
        if (bitmapWidth > bitmapHeight) {
          width = canvasWidth;
          height = bitmapHeight * width / bitmapWidth;
        } else {
          height = canvasHeight;
          width = bitmapWidth * height / bitmapHeight;
        }

      } else if (mode == RNResize.Mode.STRETCH) {
        width = canvasWidth;
        height = canvasHeight;
      }

    } else if (resizeMode instanceof RNResize.WithSize) {
      Float resizeWidth = ((RNResize.WithSize) resizeMode).width;
      Float resizeHeight = ((RNResize.WithSize) resizeMode).height;

      if (resizeHeight != null && resizeWidth != null) {
        width = canvasWidth * resizeWidth;
        height = canvasHeight * resizeHeight;

      } else if (resizeHeight == null && resizeWidth == null) {
        width = canvasWidth;
        height = canvasHeight;

      } else if (resizeHeight == null) {
        width = canvasWidth * resizeWidth;
        height = bitmapHeight * width / bitmapWidth;

      } else {
        height = canvasHeight * resizeHeight;
        width = bitmapWidth * height / bitmapHeight;
      }
    }

    if (gravityAxis == RNGravityAxis.CENTER) {
      x = canvasWidth / 2 - width / 2;
      y = canvasHeight / 2 - height / 2;

    } else if (gravityAxis == RNGravityAxis.CENTER_LEFT) {
      x = 0;
      y = canvasHeight / 2 - height / 2;

    } else if (gravityAxis == RNGravityAxis.CENTER_RIGHT) {
      x = canvasWidth - width;
      y = canvasHeight / 2 - height / 2;

    } else if (gravityAxis == RNGravityAxis.CENTER_TOP) {
      x = canvasWidth / 2 - width / 2;
      y = 0;

    } else if (gravityAxis == RNGravityAxis.CENTER_BOTTOM) {
      x = canvasWidth / 2 - width / 2;
      y = canvasHeight - height;

    } else if (gravityAxis == RNGravityAxis.LEFT_TOP) {
      x = 0;
      y = 0;

    } else if (gravityAxis == RNGravityAxis.LEFT_BOTTOM) {
      x = 0;
      y = canvasHeight - height;

    } else if (gravityAxis == RNGravityAxis.RIGHT_TOP) {
      x = canvasWidth - width;
      y = 0;

    } else if (gravityAxis == RNGravityAxis.RIGHT_BOTTOM) {
      x = canvasWidth - width;
      y = canvasHeight - height;
    }

    width += x;
    height += y;
//
//    Log.d(ReactConstants.TAG,
//      "ImageFilter: " +
//        String.valueOf(canvasWidth) + " " +
//        String.valueOf(canvasHeight) + " " +
//        String.valueOf(bitmapWidth) + " " +
//        String.valueOf(bitmapHeight) + " " +
//        new Rect((int)x, (int)y, (int)width, (int)height).toString());

    return new RectF(x, y, width, height);
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null) {
      final String key = String.format(
        (Locale) null,
        "porter_duff_xfermode_%s_%s_%s_%s_%s_%s_%S",
        mMode.toString(),
        mScaleMode.toString(),
        mSrcCacheKey.toString(),
        mSrcResizeMode.toString(),
        mSrcGravityAxis.toString(),
        mDstResizeMode.toString(),
        mDstGravityAxis.toString()
      );

      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
