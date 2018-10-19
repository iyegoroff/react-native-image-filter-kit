package iyegoroff.RNImageFilterKit;

import android.graphics.drawable.Animatable;

import com.facebook.drawee.controller.BaseControllerListener;
import com.facebook.drawee.controller.ControllerListener;
import com.facebook.imagepipeline.image.ImageInfo;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNFrescoControllerListener extends BaseControllerListener<ImageInfo> {
  private @Nullable ControllerListener<ImageInfo> mOriginalListener;
  private @Nonnull RNFunctor mImageUpdated;
  private boolean mIsEnabled = true;

  RNFrescoControllerListener(
    @Nullable ControllerListener<ImageInfo> originalListener,
    @Nonnull RNFunctor imageUpdated
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
