package iyegoroff.imagefilterkit;

import android.graphics.drawable.Animatable;
import android.util.Log;

import com.facebook.drawee.controller.BaseControllerListener;
import com.facebook.drawee.controller.ControllerListener;
import com.facebook.imagepipeline.image.ImageInfo;
import com.facebook.react.common.ReactConstants;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class FrescoControllerListener extends BaseControllerListener<ImageInfo> {
  private final @Nullable ControllerListener<ImageInfo> mWrappedListener;
  private final @Nonnull Functor mImageUpdated;
  private boolean mIsEnabled = true;

  FrescoControllerListener(
    final @Nullable ControllerListener<ImageInfo> originalListener,
    final @Nonnull Functor imageUpdated
  ) {
    super();

    mWrappedListener = originalListener;
    mImageUpdated = imageUpdated;
  }

  public void onSubmit(final String id, final Object callerContext) {
    if (mWrappedListener != null) {
      mWrappedListener.onSubmit(id, callerContext);
    }
  }

  public void onFinalImageSet(
    final String id,
    final @Nullable ImageInfo imageInfo,
    final @Nullable Animatable animatable
  ) {
    if (mWrappedListener != null) {
      mWrappedListener.onFinalImageSet(id, imageInfo, animatable);
    }

    if (imageInfo != null) {
      if (mIsEnabled) {
        mImageUpdated.call();
      } else {
        mIsEnabled = true;
      }
    }
  }

  public void onFailure(final String id, final Throwable throwable) {
    Log.w(
      ReactConstants.TAG,
      "ImageFilterKit: FrescoControllerListener error: " + throwable.getMessage()
    );

    if (mWrappedListener != null) {
      mWrappedListener.onFailure(id, throwable);
    }
  }

  public void setEnabled(final boolean isEnabled) {
    this.mIsEnabled = isEnabled;
  }

  public boolean isEnabled() {
    return mIsEnabled;
  }

  @Nullable
  static ControllerListener<ImageInfo> originalListener(
    final ControllerListener<ImageInfo> listener
  ) {
    return listener instanceof FrescoControllerListener
      ? originalListener(((FrescoControllerListener) listener).mWrappedListener)
      : listener;
  }
}
