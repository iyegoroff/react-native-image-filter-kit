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
  protected static final String PROP_MUL = "mul";
  protected static final String PROP_ADD = "add";

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
  public void setRadius(RNImageFilter view, @Nullable String radius) {
    view.setRadius(Float.valueOf(radius));
  }

  @ReactProp(name = PROP_BLUR_RADIUS)
  public void setBlurRadius(RNImageFilter view, @Nullable String blurRadius) {
    view.setBlurRadius((int) Float.parseFloat(blurRadius));
  }

  @ReactProp(name = PROP_ITERATIONS)
  public void setIterations(RNImageFilter view, @Nullable String iterations) {
    view.setIterations((int) Float.parseFloat(iterations));
  }

  @ReactProp(name = PROP_MUL)
  public void setMul(RNImageFilter view, float mul) {
    view.setMul((int) mul);
  }

  @ReactProp(name = PROP_ADD)
  public void setAdd(RNImageFilter view, float add) {
    view.setAdd((int) add);
  }
}
