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
  private @Nullable ControllerListener<ImageInfo> mOriginalListener;
  private @Nonnull
  Functor mImageUpdated;
  private boolean mIsEnabled = true;

  FrescoControllerListener(
    @Nullable ControllerListener<ImageInfo> originalListener,
    @Nonnull Functor imageUpdated
  ) {
    super();

    mOriginalListener = originalListener;
    mImageUpdated = imageUpdated;
  }

  public void onSubmit(String id, Object callerContext) {
    if (mOriginalListener != null) {
      mOriginalListener.onSubmit(id, callerContext);
    }
  }

  public void onFinalImageSet(String id, @Nullable ImageInfo imageInfo, @Nullable Animatable animatable) {
    if (mOriginalListener != null) {
      mOriginalListener.onFinalImageSet(id, imageInfo, animatable);
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
    if (mOriginalListener != null) {
      mOriginalListener.onFailure(id, throwable);
    }
  }

  public void setEnabled(boolean isEnabled) {
    this.mIsEnabled = isEnabled;
  }
}
