package iyegoroff.imagefilterkit.utility;

import android.content.Context;
import android.graphics.Bitmap;

import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory;

import org.json.JSONObject;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public abstract class RenderscriptSingularPostProcessor extends CacheablePostProcessor {

  private final @Nonnull Context mContext;

  public RenderscriptSingularPostProcessor(@Nullable JSONObject config, @Nonnull Context context) {
    super(config);

    mContext = context;
  }

  protected Context getContext() {
    return mContext;
  }

  protected abstract void processSingularRenderscript(Bitmap dst, Bitmap out);

  @Override
  public CloseableReference<Bitmap> process(
    Bitmap dst,
    PlatformBitmapFactory bitmapFactory
  ) {
    final CloseableReference<Bitmap> outRef = bitmapFactory.createBitmap(dst.getWidth(), dst.getHeight());

    try {
      final Bitmap out = outRef.get();

      processSingularRenderscript(dst, out);

      return CloseableReference.cloneOrNull(outRef);
    } finally {
      CloseableReference.closeSafely(outRef);
    }
  }
}
