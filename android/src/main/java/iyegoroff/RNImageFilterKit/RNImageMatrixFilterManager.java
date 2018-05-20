package iyegoroff.RNImageFilterKit;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class RNImageMatrixFilterManager extends ReactViewManager {

  protected static final String REACT_CLASS = "RNImageMatrixFilter";
  protected static final String PROP_MATRIX = "matrix";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public RNImageMatrixFilterView createViewInstance(ThemedReactContext reactContext) {
    return new RNImageMatrixFilterView(reactContext);
  }

  @ReactProp(name = PROP_MATRIX)
  public void setMatrix(RNImageMatrixFilterView view, ReadableArray matrix) {
    view.setMatrix(matrix);
  }
}
