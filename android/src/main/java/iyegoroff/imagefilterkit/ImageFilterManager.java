package iyegoroff.imagefilterkit;

import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import javax.annotation.Nullable;

@ReactModule(name = ImageFilterManager.REACT_CLASS)
public class ImageFilterManager extends ReactViewManager {

  static final String REACT_CLASS = "IFKImageFilter";
  private static final String PROP_CONFIG = "config";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public ImageFilter createViewInstance(ThemedReactContext reactContext) {
    return new ImageFilter(reactContext);
  }

  @ReactProp(name = PROP_CONFIG)
  public void setConfig(ImageFilter view, @Nullable String config) {
    view.setConfig(config);
  }
}
