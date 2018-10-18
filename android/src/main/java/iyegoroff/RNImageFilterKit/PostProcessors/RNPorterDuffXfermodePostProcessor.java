package iyegoroff.RNImageFilterKit.PostProcessors;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PointF;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.graphics.RectF;
import android.util.Log;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.image.CloseableBitmap;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.request.BasePostprocessor;
import com.facebook.react.common.ReactConstants;

import org.json.JSONObject;

import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.RNImageFilterKit.RNInputConverter;
import iyegoroff.RNImageFilterKit.RNResize;

public class RNPorterDuffXfermodePostProcessor extends BasePostprocessor {

  private CacheKey mCacheKey;
  private final @Nonnull PorterDuff.Mode mMode;
  private final @Nonnull CloseableReference<CloseableImage> mSource;
  private final @Nonnull CacheKey mSourceCacheKey;
  private final @Nonnull RNResize mResizeMode;
  private final @Nonnull PointF mGravityAxis;

  public RNPorterDuffXfermodePostProcessor(
    @Nullable JSONObject config,
    @Nonnull RNInputConverter converter,
    @Nonnull CloseableReference<CloseableImage> source,
    @Nonnull CacheKey sourceCacheKey
  ) {
    mMode = converter.convertPorterDuffMode(config != null ? config.optJSONObject("mode") : null, PorterDuff.Mode.ADD);
    mSource = source.clone();
    mSourceCacheKey = sourceCacheKey;
    mResizeMode = converter.convertResizeMode(config != null ? config.optJSONObject("srcResizeMode") : null, RNResize.Mode.STRETCH);
    mGravityAxis = converter.convertOffset(config != null ? config.optJSONObject("srcGravityAxis") : null, 0.5f, 0.5f);
  }

  @Override
  protected void finalize() {
    CloseableReference.closeSafely(mSource);
  }

  @Override
  public void process(Bitmap destBitmap, Bitmap sourceBitmap) {
    super.process(destBitmap, sourceBitmap);

    Bitmap source = ((CloseableBitmap) mSource.get()).getUnderlyingBitmap();
//    Log.d(ReactConstants.TAG, "ImageFilter: dest " + String.valueOf(sourceBitmap.getWidth()) + " " + String.valueOf(sourceBitmap.getHeight()));
//    Log.d(ReactConstants.TAG, "ImageFilter: src " + String.valueOf(source.getWidth()) + " " + String.valueOf(source.getHeight()));

    if (source != null) {
      Canvas canvas = new Canvas(destBitmap);
      Paint paint = new Paint();
      
      canvas.drawBitmap(sourceBitmap, 0, 0, paint);

      paint.setXfermode(new PorterDuffXfermode(mMode));

      final int sourceWidth = source.getWidth();
      final int sourceHeight = source.getHeight();
      final int destWidth = destBitmap.getWidth();
      final int destHeight = destBitmap.getHeight();
      float width = 0;
      float height = 0;
      float x = 0;
      float y = 0;

      if (mResizeMode instanceof RNResize.WithMode) {
        RNResize.Mode mode = ((RNResize.WithMode) mResizeMode).mode;

        if (mode == RNResize.Mode.COVER) {
          if (sourceWidth > sourceHeight) {
            height = destHeight;
            width = sourceWidth * height / sourceHeight;
          } else {
            width = destWidth;
            height = sourceHeight * width / sourceWidth;
          }
        } else if (mode == RNResize.Mode.CONTAIN) {
          if (sourceWidth > sourceHeight) {
            width = destWidth;
            height = sourceHeight * width / sourceWidth;
          } else {
            height = destHeight;
            width = sourceWidth * height / sourceHeight;
          }

        } else {
          width = destWidth;
          height = destHeight;
        }

      } else if (mResizeMode instanceof RNResize.WithSize) {
        Float resizeWidth = ((RNResize.WithSize) mResizeMode).width;
        Float resizeHeight = ((RNResize.WithSize) mResizeMode).height;

        if (resizeHeight != null && resizeWidth != null) {
          width = destWidth * resizeWidth;
          height = destHeight * resizeHeight;

        } else if (resizeHeight == null && resizeWidth == null) {
          width = destWidth;
          height = destHeight;

        } else if (resizeHeight == null) {
          width = destWidth * resizeWidth;
          height = sourceHeight * width / sourceWidth;

        } else {
          height = destHeight * resizeHeight;
          width = sourceWidth * height / sourceHeight;
        }
      }
      Log.d(ReactConstants.TAG, "ImageFilter: " + String.valueOf(canvas.getWidth()) + " " + String.valueOf(canvas.getHeight()));
      Log.d(ReactConstants.TAG, "ImageFilter: " + new Rect((int)x, (int)y, (int)width, (int)height).toString());

      canvas.drawBitmap(source, null, new Rect((int)x, (int)y, (int)width, (int)height), paint);
    }
  }


//  @Override
//  public CloseableReference<Bitmap> process(
//    Bitmap sourceBitmap,
//    PlatformBitmapFactory bitmapFactory) {
//    final CloseableReference<Bitmap> bitmapRef =
//      bitmapFactory.createBitmap(sourceBitmap.getWidth(), sourceBitmap.getHeight());
//    Bitmap source = ((CloseableBitmap) mSource.get()).getUnderlyingBitmap();
//
//    try {
//      final Bitmap destBitmap = bitmapRef.get();
//      final Canvas canvas = new Canvas(destBitmap);
//      Paint paint = new Paint();
//
//      canvas.drawBitmap(
//        sourceBitmap,
//        null,
//        new Rect(0, 0, destBitmap.getWidth(), destBitmap.getHeight()),
//        paint
//      );
//
//      paint.setXfermode(new PorterDuffXfermode(mMode));
//
//      canvas.drawBitmap(
//        source,
//        null,
//        new Rect(0, 0, destBitmap.getWidth(), destBitmap.getHeight()),
//        paint
//      );
//
//      return CloseableReference.cloneOrNull(bitmapRef);
//    } finally {
//      CloseableReference.closeSafely(bitmapRef);
//    }
//  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null) {
      final String key = String.format(
        (Locale) null,
        "porter_duff_xfermode_%s_%s_%s_%s",
        mMode.toString(),
        mSourceCacheKey.toString(),
        mResizeMode.toString(),
        mGravityAxis.toString()
      );

      mCacheKey = new SimpleCacheKey(key);
    }
    return mCacheKey;
  }
}
