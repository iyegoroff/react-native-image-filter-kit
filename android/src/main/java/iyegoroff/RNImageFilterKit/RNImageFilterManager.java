package iyegoroff.RNImageFilterKit;

import android.graphics.Color;

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
  protected static final String PROP_PARAM_NAMES = "paramNames";
  protected static final String PROP_PARAM_TYPES = "paramTypes";
  protected static final String PROP_IMAGE_NAMES = "imageNames";
  protected static final String PROP_MATRIX = "matrix";
  protected static final String PROP_RADIUS = "radius";
  protected static final String PROP_BLUR_RADIUS = "blurRadius";
  protected static final String PROP_ITERATIONS = "iterations";
  protected static final String PROP_MUL = "mul";
  protected static final String PROP_ADD = "add";
  protected static final String PROP_COLOR = "color";
  protected static final String PROP_X0 = "x0";
  protected static final String PROP_Y0 = "y0";
  protected static final String PROP_X1 = "x1";
  protected static final String PROP_Y1 = "y1";
  protected static final String PROP_COLORS = "colors";
  protected static final String PROP_LOCATIONS = "locations";
  protected static final String PROP_TILE = "tile";
  protected static final String PROP_CENTER_X = "centerX";
  protected static final String PROP_CENTER_Y = "centerY";
  protected static final String PROP_STOPS = "stops";
  protected static final String PROP_TILE_MODE = "tileMode";
  protected static final String PROP_CX = "cx";
  protected static final String PROP_CY = "cy";
  protected static final String PROP_POSITIONS = "positions";
  protected static final String PROP_MODE = "mode";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public RNImageFilter createViewInstance(ThemedReactContext reactContext) {
    return new RNImageFilter(reactContext);
  }

  @ReactProp(name = PROP_PARAM_NAMES)
  public void setParamNames(RNImageFilter view, @Nullable ReadableArray paramNames) {
    view.setParamNames(paramNames);
  }

  @ReactProp(name = PROP_PARAM_TYPES)
  public void setParamTypes(RNImageFilter view, @Nullable ReadableArray paramTypes) {
    view.setParamTypes(paramTypes);
  }

  @ReactProp(name = PROP_IMAGE_NAMES)
  public void setImageNames(RNImageFilter view, @Nullable ReadableArray imageNames) {
    view.setImageNames(imageNames);
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
    view.setRadius(radius);
  }

  @ReactProp(name = PROP_BLUR_RADIUS)
  public void setBlurRadius(RNImageFilter view, @Nullable String blurRadius) {
    view.setBlurRadius(blurRadius);
  }

  @ReactProp(name = PROP_ITERATIONS)
  public void setIterations(RNImageFilter view, @Nullable String iterations) {
    view.setIterations(iterations);
  }

  @ReactProp(name = PROP_MUL, defaultFloat = Color.TRANSPARENT)
  public void setMul(RNImageFilter view, float mul) {
    view.setMul(mul);
  }

  @ReactProp(name = PROP_ADD, defaultFloat = Color.TRANSPARENT)
  public void setAdd(RNImageFilter view, float add) {
    view.setAdd(add);
  }

  @ReactProp(name = PROP_COLOR, defaultFloat = Color.TRANSPARENT)
  public void setColor(RNImageFilter view, float color) {
    view.setColor(color);
  }

  @ReactProp(name = PROP_X0)
  public void setX0(RNImageFilter view, @Nullable String x0) {
    view.setX0(x0);
  }

  @ReactProp(name = PROP_Y0)
  public void setY0(RNImageFilter view, @Nullable String y0) {
    view.setY0(y0);
  }

  @ReactProp(name = PROP_X1)
  public void setX1(RNImageFilter view, @Nullable String x1) {
    view.setX1(x1);
  }

  @ReactProp(name = PROP_Y1)
  public void setY1(RNImageFilter view, @Nullable String y1) {
    view.setY1(y1);
  }

  @ReactProp(name = PROP_COLORS)
  public void setColors(RNImageFilter view, ReadableArray colors) {
    view.setColors(colors);
  }

  @ReactProp(name = PROP_LOCATIONS)
  public void setLocations(RNImageFilter view, ReadableArray locations) {
    view.setLocations(locations);
  }

  @ReactProp(name = PROP_TILE)
  public void setTile(RNImageFilter view, @Nullable String tile) {
    view.setTileMode(tile);
  }

  @ReactProp(name = PROP_TILE_MODE)
  public void setTileMode(RNImageFilter view, @Nullable String tileMode) {
    view.setTileMode(tileMode);
  }

  @ReactProp(name = PROP_CENTER_X)
  public void setCenterX(RNImageFilter view, @Nullable String centerX) {
    view.setCenterX(centerX);
  }

  @ReactProp(name = PROP_CENTER_Y)
  public void setCenterY(RNImageFilter view, @Nullable String centerY) {
    view.setCenterY(centerY);
  }

  @ReactProp(name = PROP_STOPS)
  public void setStops(RNImageFilter view, @Nullable ReadableArray stops) {
    view.setStops(stops);
  }

  @ReactProp(name = PROP_POSITIONS)
  public void setPositions(RNImageFilter view, @Nullable ReadableArray positions) {
    view.setLocations(positions);
  }

  @ReactProp(name = PROP_CX)
  public void setCx(RNImageFilter view, @Nullable String cx) {
    view.setCenterX(cx);
  }

  @ReactProp(name = PROP_CY)
  public void setCy(RNImageFilter view, @Nullable String cy) {
    view.setCenterY(cy);
  }

  @ReactProp(name = PROP_MODE)
  public void setMode(RNImageFilter view, @Nullable String mode) {
    view.setMode(mode);
  }
}
