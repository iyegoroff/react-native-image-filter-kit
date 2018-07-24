package iyegoroff.RNImageFilterKit;

import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.image.GlobalImageLoadListener;
import com.facebook.react.views.image.ReactImageManager;
import com.facebook.react.views.image.ReactImageView;

@ReactModule(name = RNFilterableImageManager.REACT_CLASS)
public class RNFilterableImageManager extends ReactImageManager {

  protected static final String REACT_CLASS = "RNFilterableImage";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public ReactImageView createViewInstance(ThemedReactContext context) {
    return new RNFilterableImage(
            context,
            getDraweeControllerBuilder(),
            getGlobalImageLoadListener(),
            getCallerContext());
  }

  private GlobalImageLoadListener getGlobalImageLoadListener() {
    return RNReflectUtils.getFieldValue(
            ReactImageManager.class,
            this,
            "mGlobalImageLoadListener");
  }
}
