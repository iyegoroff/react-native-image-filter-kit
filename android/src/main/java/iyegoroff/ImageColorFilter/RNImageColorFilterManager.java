package iyegoroff.ImageColorFilter;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class RNImageColorFilterManager extends ReactViewManager {

  protected static final String REACT_CLASS = "RNImageColorFilter";
  protected static final String PROP_MATRIX = "matrix";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public RNImageColorFilterView createViewInstance(ThemedReactContext reactContext) {
    return new RNImageColorFilterView(reactContext);
  }

  @ReactProp(name = PROP_MATRIX)
  public void setMatrix(RNImageColorFilterView view, ReadableArray matrix) {
    view.setMatrix(matrix);
  }
}
