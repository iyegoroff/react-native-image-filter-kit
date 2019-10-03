package iyegoroff.imagefilterkit;

import android.graphics.Color;

import androidx.renderscript.Float4;

import java.util.List;

public class RenderscriptUtils {

  public static Float4 toRenderscriptColor(final int color) {
    return new Float4(
      Color.red(color) / 255.0f,
      Color.green(color) / 255.0f,
      Color.blue(color) / 255.0f,
      Color.alpha(color) / 255.0f
    );
  }

//  public static List<Float4> renderscriptColors(List<Integer> colors, int max) {
//    colors.
//  }

//  protected fun renderScriptColors() =
//  colors.map { toRenderScriptColor(it) }.toTypedArray().plus(Array(10) { Float4() })

//  protected fun renderScriptPositions() =
//    positions.plus(FloatArray(10))
}
