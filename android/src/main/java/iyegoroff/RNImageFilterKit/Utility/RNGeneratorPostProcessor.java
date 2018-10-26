package iyegoroff.RNImageFilterKit.Utility;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;

import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;

import org.json.JSONObject;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.RNImageFilterKit.Utility.RNCachedPostProcessor;

public abstract class RNGeneratorPostProcessor extends RNCachedPostProcessor {

  protected final int mWidth;
  protected final int mHeight;

  public RNGeneratorPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(config);

    mWidth = width;
    mHeight = height;
  }

  public abstract void processGenerated(@Nonnull Paint paint, @Nonnull Bitmap bitmap);

  @Override
  public CloseableReference<Bitmap> process(
    Bitmap sourceBitmap,
    PlatformBitmapFactory bitmapFactory
  ) {
    final CloseableReference<Bitmap> bitmapRef = bitmapFactory.createBitmap(mWidth, mHeight);

    try {
      final Bitmap destBitmap = bitmapRef.get();
      final Canvas canvas = new Canvas(destBitmap);
      Paint paint = new Paint();

      processGenerated(paint, destBitmap);

      canvas.drawRect(new Rect(0, 0, mWidth, mHeight), paint);

      return CloseableReference.cloneOrNull(bitmapRef);
    } finally {
      CloseableReference.closeSafely(bitmapRef);
    }
  }

}
