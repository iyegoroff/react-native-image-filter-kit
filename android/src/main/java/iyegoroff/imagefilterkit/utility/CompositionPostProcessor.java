package iyegoroff.imagefilterkit.utility;

import android.graphics.Bitmap;
import android.graphics.Matrix;
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
import iyegoroff.imagefilterkit.Scale;

public abstract class CompositionPostProcessor extends CacheablePostProcessor {

  private final @Nonnull CloseableReference<CloseableImage> mSrc;
  private final @Nonnull CacheKey mSrcCacheKey;
  private final @Nullable String mResizeCanvasTo;
  protected final boolean mSwapImages;
  protected final @Nonnull
  Scale mSrcScale;
  protected final @Nonnull PointF mSrcAnchor;
  protected final @Nonnull PointF mSrcPosition;
  protected final float mSrcRotate;
  protected final @Nonnull
  Scale mDstScale;
  protected final @Nonnull PointF mDstAnchor;
  protected final @Nonnull PointF mDstPosition;
  protected final float mDstRotate;
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

    final PointF center = new PointF(0.5f, 0.5f);
    final PointF noScale = new PointF(1.0f, 1.0f);

    mSrc = src.clone();
    mSrcCacheKey = srcCacheKey;
    mSrcScale = converter.convertScale(config != null ? config.optJSONObject("srcScale") : null, Scale.Mode.COVER, noScale);
    mSrcAnchor = converter.convertOffset(config != null ? config.optJSONObject("srcAnchor") : null, center);
    mSrcPosition = converter.convertOffset(config != null ? config.optJSONObject("srcPosition") : null, center);
    mSrcRotate = converter.convertScalar(config != null ? config.optJSONObject("srcRotate") : null, 0);
    mDstScale = converter.convertScale(config != null ? config.optJSONObject("dstScale") : null, Scale.Mode.COVER, noScale);
    mDstAnchor = converter.convertOffset(config != null ? config.optJSONObject("dstAnchor") : null, center);
    mDstPosition = converter.convertOffset(config != null ? config.optJSONObject("dstPosition") : null, center);
    mDstRotate = converter.convertScalar(config != null ? config.optJSONObject("dstRotate") : null, 0);
    mResizeCanvasTo = converter.convertText(config != null ? config.optJSONObject("resizeCanvasTo") : null, null);
    mSwapImages = converter.convertBool(config != null ? config.optJSONObject("swapImages") : null, false);
  }

  @Override
  protected void finalize() {
//    Log.d(ReactConstants.TAG, "ImageFilterKit: free " + mSrcCacheKey.toString());
    CloseableReference.closeSafely(mSrc);
  }

  protected abstract CloseableReference<Bitmap> processComposition(
    Bitmap dstImage,
    Bitmap srcImage,
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

  protected static Matrix bitmapTransform(
    float canvasWidth,
    float canvasHeight,
    float bitmapWidth,
    float bitmapHeight,
    @Nonnull Scale scaleMode,
    @Nonnull PointF anchor,
    @Nonnull PointF position,
    float rotate
  ) {
    float width = 0;
    float height = 0;

    if (scaleMode instanceof Scale.WithMode) {
      Scale.Mode mode = ((Scale.WithMode) scaleMode).mode;
      float bitmapAspect = bitmapWidth / bitmapHeight;
      float canvasAspect = canvasWidth / canvasHeight;

      if (mode == Scale.Mode.CONTAIN) {
        if (bitmapAspect < canvasAspect) {
          height = canvasHeight;
          width = bitmapWidth * height / bitmapHeight;
        } else {
          width = canvasWidth;
          height = bitmapHeight * width / bitmapWidth;
        }

      } else if (mode == Scale.Mode.COVER) {
        if (bitmapAspect < canvasAspect) {
          width = canvasWidth;
          height = bitmapHeight * width / bitmapWidth;
        } else {
          height = canvasHeight;
          width = bitmapWidth * height / bitmapHeight;
        }

      } else if (mode == Scale.Mode.STRETCH) {
        width = canvasWidth;
        height = canvasHeight;
      }

    } else if (scaleMode instanceof Scale.WithSize) {
      width = canvasWidth * ((Scale.WithSize) scaleMode).scale.x;
      height = canvasHeight * ((Scale.WithSize) scaleMode).scale.y;
    }

    float x = canvasWidth * position.x - width * anchor.x;
    float y = canvasHeight * (1 - position.y) - height * (1 - anchor.y);

    width += x;
    height += y;

    final RectF frame = new RectF(x, y, width, height);

    final Matrix transform = new Matrix();
    transform.setScale(frame.width() / bitmapWidth, frame.height() / bitmapHeight);
    transform.postTranslate(-frame.width() / 2.0f, -frame.height() / 2.0f);
    transform.postRotate((float) Math.toDegrees(rotate));
    transform.postTranslate(frame.width() / 2.0f, frame.height() / 2.0f);
    transform.postTranslate(frame.left, frame.top);

    return transform;
  }

  @Nonnull
  protected CacheKey compositionCacheKey(@Nonnull String prefix) {
    return new MultiCacheKey(Arrays.asList(
      new SimpleCacheKey(String.format(
        Locale.ROOT,
        "%s_%s_%s_%s_%f_%s_%s_%s_%f_%s_%b",
        prefix,
        mSrcScale.toString(),
        mSrcAnchor.toString(),
        mSrcPosition.toString(),
        mSrcRotate,
        mDstScale.toString(),
        mDstAnchor.toString(),
        mDstPosition.toString(),
        mDstRotate,
        mResizeCanvasTo,
        mSwapImages
      )),
      mSrcCacheKey
    ));
  }
}
