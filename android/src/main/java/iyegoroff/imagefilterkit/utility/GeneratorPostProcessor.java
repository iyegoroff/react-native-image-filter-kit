package iyegoroff.imagefilterkit.utility;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;

import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;

import org.json.JSONObject;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.MainReactPackageWithFrescoCache;

public abstract class GeneratorPostProcessor extends CacheablePostProcessor {

  protected final int mWidth;
  protected final int mHeight;

  public GeneratorPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(config);

    mWidth = width;
    mHeight = height;
  }

  public void processGenerated(@Nonnull Paint paint, @Nonnull Canvas canvas) {
    canvas.drawRect(new Rect(0, 0, mWidth, mHeight), paint);
  }

  @Override
  public CloseableReference<Bitmap> process(
    Bitmap src,
    PlatformBitmapFactory bitmapFactory
  ) {
    final CloseableReference<Bitmap> bitmapRef = bitmapFactory
      .createBitmap(mWidth, mHeight, MainReactPackageWithFrescoCache.bitmapsConfig());

    try {
      final Bitmap dst = bitmapRef.get();
      final Canvas canvas = new Canvas(dst);
      final Paint paint = new Paint();

      processGenerated(paint, canvas);

      return CloseableReference.cloneOrNull(bitmapRef);
    } finally {
      CloseableReference.closeSafely(bitmapRef);
    }
  }

}
