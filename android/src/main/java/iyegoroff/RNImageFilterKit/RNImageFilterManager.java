package iyegoroff.RNImageFilterKit;

import android.graphics.Color;
import android.graphics.Shader;

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
  protected static final String PROP_COLOR = "color";
  protected static final String PROP_X0 = "x0";
  protected static final String PROP_Y0 = "y0";
  protected static final String PROP_X1 = "x1";
  protected static final String PROP_Y1 = "y1";
  protected static final String PROP_COLORS = "colors";
  protected static final String PROP_LOCATIONS = "locations";
  protected static final String PROP_TILE = "tile";

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
    float[] m = new float[matrix.size()];

    for (int i = 0; i < m.length; i++) {
      m[i] = (float) matrix.getDouble(i);
    }

    view.setMatrix(m);
  }

  @ReactProp(name = PROP_RADIUS)
  public void setRadius(RNImageFilter view, @Nullable String radius) {
    view.setRadius(radius == null ? 0 : Float.valueOf(radius));
  }

  @ReactProp(name = PROP_BLUR_RADIUS)
  public void setBlurRadius(RNImageFilter view, @Nullable String blurRadius) {
    view.setBlurRadius(blurRadius == null ? 1 : (int) Float.parseFloat(blurRadius));
  }

  @ReactProp(name = PROP_ITERATIONS)
  public void setIterations(RNImageFilter view, @Nullable String iterations) {
    view.setIterations(iterations == null ? 3 : (int) Float.parseFloat(iterations));
  }

  @ReactProp(name = PROP_MUL, defaultFloat = Color.TRANSPARENT)
  public void setMul(RNImageFilter view, float mul) {
    view.setMul((int) mul);
  }

  @ReactProp(name = PROP_ADD, defaultFloat = Color.TRANSPARENT)
  public void setAdd(RNImageFilter view, float add) {
    view.setAdd((int) add);
  }

  @ReactProp(name = PROP_COLOR, defaultFloat = Color.TRANSPARENT)
  public void setColor(RNImageFilter view, float color) {
    view.setColor((int) color);
  }

  @ReactProp(name = PROP_X0)
  public void setX0(RNImageFilter view, @Nullable String x0) {
    view.setX0(x0 == null ? 0 : (int) Float.parseFloat(x0));
  }

  @ReactProp(name = PROP_Y0)
  public void setY0(RNImageFilter view, @Nullable String y0) {
    view.setY0(y0 == null ? 0 : (int) Float.parseFloat(y0));
  }

  @ReactProp(name = PROP_X1)
  public void setX1(RNImageFilter view, @Nullable String x1) {
    view.setX1(x1 == null ? 1 : (int) Float.parseFloat(x1));
  }

  @ReactProp(name = PROP_Y1)
  public void setY1(RNImageFilter view, @Nullable String y1) {
    view.setY1(y1 == null ? 0 : (int) Float.parseFloat(y1));
  }

  @ReactProp(name = PROP_COLORS)
  public void setColors(RNImageFilter view, ReadableArray colors) {
    int[] c = new int[colors.size()];

    for (int i = 0; i < c.length; i++) {
      c[i] = colors.getInt(i);
    }

    view.setColors(c);
  }

  @ReactProp(name = PROP_LOCATIONS)
  public void setLocations(RNImageFilter view, ReadableArray locations) {
    float[] l = new float[locations.size()];

    for (int i = 0; i < l.length; i++) {
      l[i] = (float) locations.getDouble(i);
    }

    view.setLocations(l);
  }

  @ReactProp(name = PROP_TILE)
  public void setTile(RNImageFilter view, @Nullable String tile) {
    view.setTile(
            "MIRROR".equals(tile)
                    ? Shader.TileMode.MIRROR
                    : "REPEAT".equals(tile)
                    ? Shader.TileMode.REPEAT
                    : Shader.TileMode.CLAMP);
  }
}
