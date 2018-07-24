package iyegoroff.RNImageFilterKit;

import android.graphics.Bitmap;

import com.facebook.imagepipeline.request.BasePostprocessor;

public class ColorMatrixPostprocessor extends BasePostprocessor {

  @Override
  public void process(Bitmap bitmap) {

  }

  static int getGreyColor(int color) {
    final int alpha = color & 0xFF000000;
    final int r = (color >> 16) & 0xFF;
    final int g = (color >> 8) & 0xFF;
    final int b = color & 0xFF;

    // see: https://en.wikipedia.org/wiki/Relative_luminance
    final int luminance = (int) (0.2126 * r + 0.7152 * g + 0.0722 * b);

    return alpha | luminance << 16 | luminance << 8 | luminance;
  }
}
