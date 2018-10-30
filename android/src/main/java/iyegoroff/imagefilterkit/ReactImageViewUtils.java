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

public class ReactImageViewUtils {

  @Nullable
  static ControllerListener<ImageInfo> getControllerListener(@Nullable ReactImageView target) {
    return target != null
      ? ReflectUtils.<ControllerListener<ImageInfo>>getFieldValue(target, "mControllerListener")
      : null;
  }

  static void setControllerListener(
    @Nullable ReactImageView target,
    @Nullable ControllerListener<ImageInfo> listener
  ) {
    if (target != null) {
      ReflectUtils.setFieldValue(target, "mControllerListener", listener);
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

  static void setDirty(@Nullable ReactImageView target, boolean isDirty) {
    if (target != null) {
      ReflectUtils.setFieldValue(target, "mIsDirty", isDirty);
    }
  }

  @Nullable
  static CacheKey getCacheKey(@Nullable ReactImageView target) {
    return target != null && target.getController() != null
      ? ReflectUtils.<CacheKey>invokeMethod(target.getController(), "getCacheKey")
      : null;
  }

  @Nullable
  static DataSource<CloseableReference<CloseableImage>> getDataSource(
    @Nullable ReactImageView target
  ) {
    return target != null && target.getController() != null
      ? ReflectUtils.<DataSource<CloseableReference<CloseableImage>>>invokeMethod(target.getController(), "getDataSource")
      : null;
  }

  @Nullable
  static ImageSource getImageSource(@Nullable ReactImageView target) {
    return target != null
      ? ReflectUtils.<ImageSource>getFieldValue(target, "mImageSource")
      : null;
  }
}
