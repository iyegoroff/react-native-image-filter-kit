package iyegoroff.RNImageFilterKit;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import javax.annotation.Nullable;

@ReactModule(name = RNImageFilterManager.REACT_CLASS)
public class RNImageFilterManager extends ReactViewManager {

  protected static final String REACT_CLASS = "RNImageFilter";
  protected static final String PROP_NAME = "name";
  protected static final String PROP_MATRIX = "matrix";
  protected static final String PROP_RADIUS = "radius";
  protected static final String PROP_BLUR_RADIUS = "blurRadius";
  protected static final String PROP_ITERATIONS = "iterations";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public RNImageFilter createViewInstance(ThemedReactContext reactContext) {
    return new RNImageFilter(reactContext);
  }

  @ReactProp(name = PROP_NAME)
  public void setName(RNImageFilter view, @Nullable String name) {
    view.setName(name);
  }

  @ReactProp(name = PROP_MATRIX)
  public void setMatrix(RNImageFilter view, ReadableArray matrix) {
    view.setMatrix(matrix);
  }

  @ReactProp(name = PROP_RADIUS)
  public void setRadius(RNImageFilter view, float radius) {
    view.setRadius(radius);
  }

  @ReactProp(name = PROP_BLUR_RADIUS)
  public void setBlurRadius(RNImageFilter view, float blurRadius) {
    view.setBlurRadius((int) blurRadius);
  }
  @ReactProp(name = PROP_ITERATIONS)
  public void setIterations(RNImageFilter view, float iterations) {
    view.setIterations((int) iterations);
  }
}
