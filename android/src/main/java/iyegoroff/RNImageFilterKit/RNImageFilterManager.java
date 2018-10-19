package iyegoroff.RNImageFilterKit;

import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import javax.annotation.Nullable;

@ReactModule(name = RNImageFilterManager.REACT_CLASS)
public class RNImageFilterManager extends ReactViewManager {

  static final String REACT_CLASS = "RNImageFilter";
  private static final String PROP_CONFIG = "config";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public RNImageFilter createViewInstance(ThemedReactContext reactContext) {
    return new RNImageFilter(reactContext);
  }

  @ReactProp(name = PROP_CONFIG)
  public void setConfig(RNImageFilter view, @Nullable String config) {
    view.setConfig(config);
  }
}
