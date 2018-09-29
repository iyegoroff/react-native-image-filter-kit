package iyegoroff.RNImageFilterKit;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.build.ReactBuildConfig;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNPropConverter {

  public static float convertScalar(@Nullable String prop, float defaultProp) {
    return prop == null ? defaultProp : Float.parseFloat(prop);
  }

  public static int convertColor(float prop) {
    return (int) prop;
  }

  public static float convertDistance(
    @Nullable String prop,
    String defaultProp,
    int boundsWidth,
    int boundsHeight
  ) {
    return RNPropConverter.convertRelative(
      prop == null ? defaultProp : prop,
      boundsWidth,
      boundsHeight
    );
  }

  public static float[] convertScalarVector(@Nullable ReadableArray prop, float[] defaultProp) {
    if (prop == null) {
      return defaultProp;
    }

    float[] vector = new float[prop.size()];

    for (int i = 0; i < vector.length; i++) {
      vector[i] = (float) prop.getDouble(i);
    }

    return vector;
  }

  public static int[] convertColorVector(@Nullable ReadableArray prop, int[] defaultProp) {
    if (prop == null) {
      return defaultProp;
    };

    int[] vector = new int[prop.size()];

    for (int i = 0; i < vector.length; i++) {
      vector[i] = prop.getInt(i);
    }

    return vector;
  }

  public static <T extends Enum<T>> T convertEnumeration(
    @Nullable String prop,
    T defaultProp,
    Class<T> type
  ) {
    return prop == null ? defaultProp : T.valueOf(type, prop);
  }

  private static float convertRelative(@Nonnull String prop, int boundsWidth, int boundsHeight) {
    String matcher = "-?\\d+(\\.\\d+)?";

    if (prop.matches(matcher + "")) {
      return Float.parseFloat(prop);
    }

    if (prop.matches(matcher + "h")) {
      return Float.parseFloat(prop.split("h")[0]) * boundsHeight * 0.01f;
    }

    if (prop.matches(matcher + "w")) {
      return Float.parseFloat(prop.split("w")[0]) * boundsWidth * 0.01f;
    }

    if (prop.matches(matcher + "max")) {
      return Float.parseFloat(prop.split("max")[0])
        * Math.max(boundsHeight, boundsWidth)
        * 0.01f;
    }

    if (prop.matches(matcher + "min")) {
      return Float.parseFloat(prop.split("min")[0])
        * Math.min(boundsHeight, boundsWidth)
        * 0.01f;
    }

    if (ReactBuildConfig.DEBUG) {
      throw new AssertionError("Invalid relative number - " + prop);
    }

    return 0;
  }
}
