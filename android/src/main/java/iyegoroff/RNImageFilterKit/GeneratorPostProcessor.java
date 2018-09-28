package iyegoroff.RNImageFilterKit;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;

import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.imagepipeline.request.BasePostprocessor;

import javax.annotation.Nonnull;

public abstract class GeneratorPostProcessor extends BasePostprocessor {

  protected int mWidth;
  protected int mHeight;

  public GeneratorPostProcessor(int width, int height) {
    mWidth = width;
    mHeight = height;
  }

  public abstract void processGenerated(@Nonnull Paint paint, @Nonnull Bitmap bitmap);

  @Override
  public CloseableReference<Bitmap> process(
          Bitmap sourceBitmap,
          PlatformBitmapFactory bitmapFactory) {
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
