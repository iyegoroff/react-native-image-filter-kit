package iyegoroff.imagefilterkit.utility;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;
import android.util.Log;

import com.facebook.common.references.CloseableReference;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.modules.fresco.FrescoModule;
import com.facebook.react.shell.MainReactPackage;

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

  public abstract void processGenerated(@Nonnull Paint paint, @Nonnull Bitmap bitmap);

  @Override
  public CloseableReference<Bitmap> process(
    Bitmap sourceBitmap,
    PlatformBitmapFactory bitmapFactory
  ) {
    final CloseableReference<Bitmap> bitmapRef = bitmapFactory
      .createBitmap(mWidth, mHeight, MainReactPackageWithFrescoCache.bitmapsConfig());

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
