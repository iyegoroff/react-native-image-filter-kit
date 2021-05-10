package iyegoroff.imagefilterkit;

import android.graphics.Color;

import android.renderscript.Float4;

public class RenderscriptUtils {

  private static int sMaxColors = 10;

  public static Float4 toRenderscriptColor(final int color) {
    return new Float4(
      Color.red(color) / 255.0f,
      Color.green(color) / 255.0f,
      Color.blue(color) / 255.0f,
      Color.alpha(color) / 255.0f
    );
  }

  public static Float4[] renderscriptColors(int[] colors) {
    Float4[] converted = new Float4[sMaxColors];

    for (int i = 0; i < sMaxColors; i++) {
      converted[i] = toRenderscriptColor(colors.length > i ? colors[i] : Color.TRANSPARENT);
    }

    return converted;
  }

  public static float[] renderscriptPositions(float[] positions) {
    float[] converted = new float[sMaxColors];

    for (int i = 0; i < sMaxColors; i++) {
      converted[i] = positions.length > i ? positions[i] : 0.0f;
    }

    return converted;
  }
}
