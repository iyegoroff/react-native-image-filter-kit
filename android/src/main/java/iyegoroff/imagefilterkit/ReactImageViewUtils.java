package iyegoroff.imagefilterkit;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.DataSource;
import com.facebook.drawee.controller.ControllerListener;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.image.ImageInfo;
import com.facebook.imagepipeline.postprocessors.IterativeBoxBlurPostProcessor;
import com.facebook.react.views.image.ReactImageView;
import com.facebook.react.views.imagehelper.ImageSource;

import javax.annotation.Nullable;

import iyegoroff.reflectutils.ReflectUtils;

class ReactImageViewUtils {

  @Nullable
  static ControllerListener<ImageInfo> getControllerListener(@Nullable ReactImageView target) {
    return target != null
      ? ReflectUtils.getFieldValue(target, "mDownloadListener")
      : null;
  }

  static void setControllerListener(
    @Nullable ReactImageView target,
    @Nullable ControllerListener<ImageInfo> listener
  ) {
    if (target != null) {
      ReflectUtils.setFieldValue(target, "mDownloadListener", listener);
    }
  }

  static void setPostProcessor(
    @Nullable ReactImageView target,
    @Nullable IterativeBoxBlurPostProcessor postProcessor
  ) {
    if (target != null) {
      ReflectUtils.setFieldValue(target, "mIterativeBoxBlurPostProcessor", postProcessor);
    }
  }

  static void setDirty(@Nullable ReactImageView target) {
    if (target != null) {
      ReflectUtils.setFieldValue(target, "mIsDirty", true);
    }
  }

  @Nullable
  static CacheKey getCacheKey(@Nullable ReactImageView target) {
    return target != null && target.getController() != null
      ? ReflectUtils.invokeMethod(target.getController(), "getCacheKey")
      : null;
  }

  @Nullable
  static DataSource<CloseableReference<CloseableImage>> getDataSource(
    @Nullable ReactImageView target
  ) {
    return target != null && target.getController() != null
      ? ReflectUtils.invokeMethod(target.getController(), "getDataSource")
      : null;
  }

  @Nullable
  static ImageSource getImageSource(@Nullable ReactImageView target) {
    return target != null
      ? ReflectUtils.getFieldValue(target, "mImageSource")
      : null;
  }
}
