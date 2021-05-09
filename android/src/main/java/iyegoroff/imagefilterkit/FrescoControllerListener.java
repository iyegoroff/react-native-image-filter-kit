package iyegoroff.imagefilterkit;

import android.graphics.drawable.Animatable;

import com.facebook.drawee.controller.ControllerListener;
import com.facebook.imagepipeline.image.ImageInfo;
import com.facebook.react.views.image.ReactImageDownloadListener;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class FrescoControllerListener extends ReactImageDownloadListener<ImageInfo> {
  private final @Nullable ControllerListener<ImageInfo> mWrappedListener;
  private final @Nonnull Functor.Arity0 mImageUpdated;
  private final @Nonnull Functor.Arity1<Throwable> mError;
  private boolean mIsEnabled = true;

  FrescoControllerListener(
    final @Nullable ControllerListener<ImageInfo> originalListener,
    final @Nonnull Functor.Arity0 onImageUpdated,
    final @Nonnull Functor.Arity1<Throwable> onError
  ) {
    super();

    mWrappedListener = originalListener;
    mImageUpdated = onImageUpdated;
    mError = onError;
  }

  FrescoControllerListener(
    final @Nullable ControllerListener<ImageInfo> originalListener,
    final @Nonnull Functor.Arity0 onImageUpdated
  ) {
    this(originalListener, onImageUpdated, arg1 -> { });
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
    mError.call(throwable);

    if (mWrappedListener != null) {
      mWrappedListener.onFailure(id, throwable);
    }
  }

  void setDisabled() {
    mIsEnabled = false;
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
