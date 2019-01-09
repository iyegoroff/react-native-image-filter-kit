package iyegoroff.imagefilterkit.utility;

import android.graphics.Bitmap;
import android.graphics.PointF;
import android.graphics.RectF;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.MultiCacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.image.CloseableBitmap;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.infer.annotation.Assertions;

import org.json.JSONObject;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.Resize;

public abstract class CompositionPostProcessor extends CacheablePostProcessor {

  private final @Nonnull CloseableReference<CloseableImage> mSrc;
  private final @Nonnull CacheKey mSrcCacheKey;
  private final @Nullable String mResizeCanvasTo;
  protected final boolean mSwapImages;
  protected final @Nonnull Resize mSrcResizeMode;
  protected final @Nonnull PointF mSrcAnchor;
  protected final @Nonnull PointF mSrcPosition;
  protected final @Nonnull Resize mDstResizeMode;
  protected final @Nonnull PointF mDstAnchor;
  protected final @Nonnull PointF mDstPosition;
  protected final int mWidth;
  protected final int mHeight;

  public CompositionPostProcessor(
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull CloseableReference<CloseableImage> src,
    @Nonnull CacheKey srcCacheKey
  ) {
    super(config);

    InputConverter converter = new InputConverter(width, height);

    mWidth = width;
    mHeight = height;

    mSrc = src.clone();
    mSrcCacheKey = srcCacheKey;
    mSrcResizeMode = converter.convertResize(config != null ? config.optJSONObject("srcResizeMode") : null, Resize.Mode.COVER);
    mSrcAnchor = converter.convertOffset(config != null ? config.optJSONObject("srcAnchor") : null, 0.5f, 0.5f);
    mSrcPosition = converter.convertOffset(config != null ? config.optJSONObject("srcPosition") : null, 0.5f, 0.5f);
    mDstResizeMode = converter.convertResize(config != null ? config.optJSONObject("dstResizeMode") : null, Resize.Mode.COVER);
    mDstAnchor = converter.convertOffset(config != null ? config.optJSONObject("dstAnchor") : null, 0.5f, 0.5f);
    mDstPosition = converter.convertOffset(config != null ? config.optJSONObject("dstPosition") : null, 0.5f, 0.5f);
    mResizeCanvasTo = converter.convertText(config != null ? config.optJSONObject("resizeCanvasTo") : null, null);
    mSwapImages = converter.convertBool(config != null ? config.optJSONObject("swapImages") : null, false);
  }

  @Override
  protected void finalize() {
//    Log.d(ReactConstants.TAG, "ImageFilterKit: free " + mSrcCacheKey.toString());
    CloseableReference.closeSafely(mSrc);
  }

  protected abstract CloseableReference<Bitmap> processComposition(
    Bitmap dst,
    Bitmap src,
    PlatformBitmapFactory bitmapFactory
  );

  @Override
  public CloseableReference<Bitmap> process(
    Bitmap dst,
    PlatformBitmapFactory bitmapFactory
  ) {
    Bitmap src = ((CloseableBitmap) mSrc.get()).getUnderlyingBitmap();

    return processComposition(dst, src, bitmapFactory);
  }

  protected int canvasExtent(int dstExtent, int srcExtent, int defaultExtent) {
    if (mResizeCanvasTo == null) {
      return defaultExtent;
    }

    if ("dstImage".equals(mResizeCanvasTo)) {
      return dstExtent;
    }

    if ("srcImage".equals(mResizeCanvasTo)) {
      return srcExtent;
    }

    if ("MIN".equals(mResizeCanvasTo)) {
      return Math.min(dstExtent, srcExtent);
    }

    if ("MAX".equals(mResizeCanvasTo)) {
      return Math.max(dstExtent, srcExtent);
    }

    throw Assertions.assertUnreachable(
      "ImageFilterKit: invalid property 'resizeCanvasTo' - " + mResizeCanvasTo
    );
  }

  protected static RectF bitmapFrame(
    float canvasWidth,
    float canvasHeight,
    float bitmapWidth,
    float bitmapHeight,
    @Nonnull Resize resizeMode,
    @Nonnull PointF anchor,
    @Nonnull PointF position
  ) {
    float width = 0;
    float height = 0;

    if (resizeMode instanceof Resize.WithMode) {
      Resize.Mode mode = ((Resize.WithMode) resizeMode).mode;
      float bitmapAspect = bitmapWidth / bitmapHeight;
      float canvasAspect = canvasWidth / canvasHeight;

      if (mode == Resize.Mode.CONTAIN) {
        if (bitmapAspect < canvasAspect) {
          height = canvasHeight;
          width = bitmapWidth * height / bitmapHeight;
        } else {
          width = canvasWidth;
          height = bitmapHeight * width / bitmapWidth;
        }

      } else if (mode == Resize.Mode.COVER) {
        if (bitmapAspect < canvasAspect) {
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
        Locale.ROOT,
        "%s_%s_%s_%s_%s_%s_%s_%s_%b",
        prefix,
        mSrcResizeMode.toString(),
        mSrcAnchor.toString(),
        mSrcPosition.toString(),
        mDstResizeMode.toString(),
        mDstAnchor.toString(),
        mDstPosition.toString(),
        mResizeCanvasTo,
        mSwapImages
      )),
      mSrcCacheKey
    ));
  }
}
