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
import iyegoroff.imagefilterkit.Transform;

public abstract class CompositionPostProcessor extends CacheablePostProcessor {

  private final @Nonnull CloseableReference<CloseableImage> mSrc;
  private final @Nonnull CacheKey mSrcCacheKey;
  private final @Nullable String mResizeCanvasTo;
  protected final boolean mSwapImages;
  protected final @Nonnull Transform mDstTransform;
  protected final @Nonnull Transform mSrcTransform;
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
    final Transform transform = new Transform(center, center, new Scale.WithMode(Scale.Mode.COVER), 0);

    mSrc = src.clone();
    mSrcCacheKey = srcCacheKey;
    mSrcTransform = converter.convertTransform(config, "srcTransform", transform);
    mDstTransform = converter.convertTransform(config, "dstTransform", transform);
    mResizeCanvasTo = converter.convertText(config, "resizeCanvasTo", null);
    mSwapImages = converter.convertBool(config, "swapImages", false);
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
    @Nonnull Transform transform
  ) {
    float width = 0;
    float height = 0;

    if (transform.scale instanceof Scale.WithMode) {
      Scale.Mode mode = ((Scale.WithMode) transform.scale).mode;
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

    } else if (transform.scale instanceof Scale.WithSize) {
      width = canvasWidth * ((Scale.WithSize) transform.scale).scale.x;
      height = canvasHeight * ((Scale.WithSize) transform.scale).scale.y;
    }

    float x = canvasWidth * transform.translate.x - width * transform.anchor.x;
    float y = canvasHeight * (1 - transform.translate.y) - height * (1 - transform.anchor.y);

    width += x;
    height += y;

    final RectF frame = new RectF(x, y, width, height);

    final Matrix t = new Matrix();
    t.setScale(frame.width() / bitmapWidth, frame.height() / bitmapHeight);
    t.postTranslate(-frame.width() * transform.anchor.x, -frame.height() * (1 - transform.anchor.y));
    t.postRotate((float) Math.toDegrees(transform.rotate));
    t.postTranslate(frame.width() * transform.anchor.x, frame.height() * (1 - transform.anchor.y));
    t.postTranslate(frame.left, frame.top);

    return t;
  }

  @Nonnull
  protected CacheKey compositionCacheKey(@Nonnull String prefix) {
    return new MultiCacheKey(Arrays.asList(
      new SimpleCacheKey(String.format(
        Locale.ROOT,
        "%s_%s_%s_%s_%b",
        prefix,
        mSrcTransform.toString(),
        mDstTransform.toString(),
        mResizeCanvasTo,
        mSwapImages
      )),
      mSrcCacheKey
    ));
  }
}
