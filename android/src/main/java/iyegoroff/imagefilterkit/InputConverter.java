package iyegoroff.imagefilterkit;

import android.graphics.PointF;
import android.graphics.PorterDuff;
import android.graphics.Shader;

import com.facebook.react.common.build.ReactBuildConfig;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class InputConverter {

  private final int mBoundsWidth;
  private final int mBoundsHeight;

  public InputConverter(int boundsWidth, int boundsHeight) {
    mBoundsWidth = boundsWidth;
    mBoundsHeight = boundsHeight;
  }

  public float convertScalar(@Nullable JSONObject scalar, float defaultValue) {
    return scalar != null ? (float) scalar.optDouble("scalar", defaultValue) : defaultValue;
  }

  public int convertColor(@Nullable JSONObject color, int defaultValue) {
    return color != null ? color.optInt("color", defaultValue) : defaultValue;
  }

  public float convertDistance(@Nullable JSONObject distance, @Nonnull String defaultValue) {
    return this.convertRelative(
      distance != null ? distance.optString("distance", defaultValue) : defaultValue
    );
  }

//  public PointF convertPosition(
//    @Nullable JSONObject position,
//    @Nonnull String defaultX,
//    @Nonnull String defaultY
//  ) {
//    JSONObject pos = position != null ? position.optJSONObject("position") : null;
//
//    return new PointF(
//      this.convertRelative(pos != null ? pos.optString("x", defaultX) : defaultX),
//      this.convertRelative(pos != null ? pos.optString("y", defaultY) : defaultY)
//    );
//  }

  public PointF convertOffset(
    @Nullable JSONObject position,
    float defaultX,
    float defaultY
  ) {
    JSONObject pos = position != null ? position.optJSONObject("offset") : null;

    return new PointF(
      pos != null ? (float) pos.optDouble("x", defaultX) : defaultX,
      pos != null ? (float) pos.optDouble("y", defaultY) : defaultY
    );
  }

  public String convertText(@Nullable JSONObject text, @Nullable String defaultValue) {
    return text != null ? text.optString("text", defaultValue) : defaultValue;
  }

  public Resize convertResize(@Nullable JSONObject resizeMode, @Nonnull Resize.Mode defaultMode) {
    JSONObject size = resizeMode != null ? resizeMode.optJSONObject("resizeMode") : null;
    String mode = resizeMode != null ? resizeMode.optString("resizeMode") : null;

    if (size != null) {
      return new Resize.WithSize(
        size.has("width") ? (float) size.optDouble("width") : null,
        size.has("height") ? (float) size.optDouble("height") : null
      );
    }

    return new Resize.WithMode(convertEnumeration(mode, defaultMode, Resize.Mode.class));
  }

  public float[] convertScalarVector(@Nullable JSONObject scalarVector, float[] defaultValue) {
    if (scalarVector != null && scalarVector.has("scalarVector")) {
      JSONArray sv = scalarVector.optJSONArray("scalarVector");
      float[] vector = new float[sv.length()];

      for (int i = 0; i < vector.length; i++) {
        vector[i] = (float) sv.optDouble(i);
      }

      return vector;
    }

    return defaultValue;
  }

  public int[] convertColorVector(@Nullable JSONObject colorVector, int[] defaultValue) {
    if (colorVector != null && colorVector.has("colorVector")) {
      JSONArray cv = colorVector.optJSONArray("colorVector");
      int[] vector = new int[cv.length()];

      for (int i = 0; i < vector.length; i++) {
        vector[i] = cv.optInt(i);
      }

      return vector;
    }

    return defaultValue;
  }

  private <T extends Enum<T>> T convertEnumeration(
    @Nullable String value,
    T defaultValue,
    Class<T> type
  ) {
    return value != null ? T.valueOf(type, value) : defaultValue;
  }

  public PorterDuff.Mode convertPorterDuffMode(
    @Nullable JSONObject porterDuffMode,
    PorterDuff.Mode defaultValue
  ) {
    return convertEnumeration(
      porterDuffMode != null ? porterDuffMode.optString("porterDuffMode") : null,
      defaultValue,
      PorterDuff.Mode.class
    );
  }

  public Shader.TileMode convertTileMode(
    @Nullable JSONObject tileMode,
    Shader.TileMode defaultValue
  ) {
    return convertEnumeration(
      tileMode != null ? tileMode.optString("tileMode") : null,
      defaultValue,
      Shader.TileMode.class
    );
  }

  private float convertRelative(@Nonnull String relative) {
    String matcher = "-?\\d+(\\.\\d+)?";

    if (relative.matches(matcher + "")) {
      return Float.parseFloat(relative);
    }

    if (relative.matches(matcher + "h")) {
      return Float.parseFloat(relative.split("h")[0]) * mBoundsHeight * 0.01f;
    }

    if (relative.matches(matcher + "w")) {
      return Float.parseFloat(relative.split("w")[0]) * mBoundsWidth * 0.01f;
    }

    if (relative.matches(matcher + "max")) {
      return Float.parseFloat(relative.split("max")[0])
        * Math.max(mBoundsHeight, mBoundsWidth)
        * 0.01f;
    }

    if (relative.matches(matcher + "min")) {
      return Float.parseFloat(relative.split("min")[0])
        * Math.min(mBoundsHeight, mBoundsWidth)
        * 0.01f;
    }

    if (ReactBuildConfig.DEBUG) {
      throw new AssertionError("Invalid relative number - " + relative);
    }

    return 0;
  }
}
