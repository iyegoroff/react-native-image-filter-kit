package iyegoroff.imagefilterkit.utility;

import android.graphics.Bitmap;
import android.graphics.PointF;
import android.graphics.RectF;
import android.util.Log;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.MultiCacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.image.CloseableBitmap;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.infer.annotation.Assertions;
import com.facebook.react.common.ReactConstants;

import org.json.JSONObject;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.Resize;
import iyegoroff.imagefilterkit.Scale;

public abstract class CompositionPostProcessor extends CacheablePostProcessor {

  private final @Nonnull Scale mScaleMode;
  private final @Nonnull CloseableReference<CloseableImage> mSrc;
  private final @Nonnull CacheKey mSrcCacheKey;
  protected final @Nonnull Resize mSrcResizeMode;
  protected final @Nonnull PointF mSrcAnchor;
  protected final @Nonnull PointF mSrcPosition;
  protected final @Nonnull Resize mDstResizeMode;
  protected final @Nonnull PointF mDstAnchor;
  protected final @Nonnull PointF mDstPosition;

  public CompositionPostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull CloseableReference<CloseableImage> src,
    @Nonnull CacheKey srcCacheKey
  ) {
    super(config);

    InputConverter converter = new InputConverter(width, height);

    mScaleMode = converter.convertScale(config != null ? config.optJSONObject("scaleMode") : null, Scale.Mode.UP);
    mSrc = src.clone();
    mSrcCacheKey = srcCacheKey;
    mSrcResizeMode = converter.convertResize(config != null ? config.optJSONObject("srcResizeMode") : null, Resize.Mode.COVER);
    mSrcAnchor = converter.convertOffset(config != null ? config.optJSONObject("srcAnchor") : null, 0.5f, 0.5f);
    mSrcPosition = converter.convertOffset(config != null ? config.optJSONObject("srcPosition") : null, 0.5f, 0.5f);
    mDstResizeMode = converter.convertResize(config != null ? config.optJSONObject("dstResizeMode") : null, Resize.Mode.COVER);
    mDstAnchor = converter.convertOffset(config != null ? config.optJSONObject("dstAnchor") : null, 0.5f, 0.5f);
    mDstPosition = converter.convertOffset(config != null ? config.optJSONObject("dstPosition") : null, 0.5f, 0.5f);
  }

  @Override
  protected void finalize() {
    CloseableReference.closeSafely(mSrc);
  }

  protected abstract CloseableReference<Bitmap> processComposition(
    Bitmap dst,
    Bitmap src,
    PlatformBitmapFactory bitmapFactory
  );

  protected int outBitmapExtent(int dstExtent, int srcExtent) {
    if (mScaleMode instanceof Scale.WithMode) {
      return ((Scale.WithMode) mScaleMode).mode == Scale.Mode.UP
        ? Math.max(dstExtent, srcExtent)
        : Math.min(dstExtent, srcExtent);

    } else if (mScaleMode instanceof Scale.WithMatch) {
      String match = ((Scale.WithMatch) mScaleMode).match;

      if ("dstImage".equals(match)) {
        return dstExtent;

      } else if ("srcImage".equals(match)) {
        return srcExtent;
      }
    }

    throw Assertions.assertUnreachable(
      "ImageFilterKit: invalid scaleMode - " + String.valueOf(mScaleMode)
    );
  }

  @Override
  public CloseableReference<Bitmap> process(
    Bitmap dst,
    PlatformBitmapFactory bitmapFactory
  ) {
    Bitmap src = ((CloseableBitmap) mSrc.get()).getUnderlyingBitmap();

//    try {
      return processComposition(dst, src, bitmapFactory);
//    } finally {
//      CloseableReference.closeSafely(mSrc);
//    }
  }

  protected static RectF bitmapFrame(
    int canvasWidth,
    int canvasHeight,
    int bitmapWidth,
    int bitmapHeight,
    @Nonnull Resize resizeMode,
    @Nonnull PointF anchor,
    @Nonnull PointF position
  ) {
    float width = 0;
    float height = 0;

    if (resizeMode instanceof Resize.WithMode) {
      Resize.Mode mode = ((Resize.WithMode) resizeMode).mode;

      if (mode == Resize.Mode.COVER) {
        if (bitmapWidth > bitmapHeight) {
          height = canvasHeight;
          width = bitmapWidth * height / bitmapHeight;
        } else {
          width = canvasWidth;
          height = bitmapHeight * width / bitmapWidth;
        }
      } else if (mode == Resize.Mode.CONTAIN) {
        if (bitmapWidth > bitmapHeight) {
          width = canvasWidth;
          height = bitmapHeight * width / bitmapWidth;
        } else {
          height = canvasHeight;
          width = bitmapWidth * height / bitmapHeight;
        }

      } else if (mode == Resize.Mode.STRETCH) {
        width = canvasWidth;
        height = canvasHeight;
      }

    } else if (resizeMode instanceof Resize.WithSize) {
      Float resizeWidth = ((Resize.WithSize) resizeMode).width;
      Float resizeHeight = ((Resize.WithSize) resizeMode).height;

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

    float x = canvasWidth * position.x - width * anchor.x;
    float y = canvasHeight * (1 - position.y) - height * (1 - anchor.y);

    width += x;
    height += y;

    return new RectF(x, y, width, height);
  }

  @Nonnull
  protected CacheKey compositionCacheKey(@Nonnull String prefix) {
    return new MultiCacheKey(Arrays.asList(
      new SimpleCacheKey(String.format(
        (Locale) null,
        "%s_%s_%s_%s_%s_%s_%s_%s",
        prefix,
        mScaleMode.toString(),
        mSrcResizeMode.toString(),
        mSrcAnchor.toString(),
        mSrcPosition.toString(),
        mDstResizeMode.toString(),
        mDstAnchor.toString(),
        mDstPosition.toString()
      )),
      mSrcCacheKey
    ));
  }
}
