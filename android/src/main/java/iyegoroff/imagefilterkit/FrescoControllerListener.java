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
  private @Nullable ControllerListener<ImageInfo> mWrappedListener;
  private @Nonnull Functor mImageUpdated;
  private boolean mIsEnabled = true;

  FrescoControllerListener(
    @Nullable ControllerListener<ImageInfo> originalListener,
    @Nonnull Functor imageUpdated
  ) {
    super();

    mWrappedListener = originalListener;
    mImageUpdated = imageUpdated;
  }

  public void onSubmit(String id, Object callerContext) {
    if (mWrappedListener != null) {
      mWrappedListener.onSubmit(id, callerContext);
    }
  }

  public void onFinalImageSet(
    String id,
    @Nullable ImageInfo imageInfo,
    @Nullable Animatable animatable
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

  public void onFailure(String id, Throwable throwable) {
    Log.w(
      ReactConstants.TAG,
      "ImageFilterKit: FrescoControllerListener onFailure '" + throwable.getMessage() + "'"
    );

    if (mWrappedListener != null) {
      mWrappedListener.onFailure(id, throwable);
    }
  }

  public void setEnabled(boolean isEnabled) {
    this.mIsEnabled = isEnabled;
  }

  public boolean isEnabled() {
    return mIsEnabled;
  }

  @Nullable
  public static ControllerListener<ImageInfo> originalListener(
    ControllerListener<ImageInfo> listener
  ) {
    return listener instanceof FrescoControllerListener
      ? originalListener(((FrescoControllerListener) listener).mWrappedListener)
      : listener;
  }
}
