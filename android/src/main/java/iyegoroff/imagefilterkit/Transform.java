package iyegoroff.imagefilterkit;

import android.graphics.PointF;

import java.util.Locale;

import javax.annotation.Nonnull;

public class Transform {
  public final @Nonnull PointF anchor;
  public final @Nonnull PointF translate;
  public final @Nonnull Scale scale;
  public final float rotate;

  public Transform(
    @Nonnull PointF anchor,
    @Nonnull PointF translate,
    @Nonnull Scale scale,
    float rotate
  ) {
    this.anchor = anchor;
    this.translate = translate;
    this.rotate = rotate;
    this.scale = scale;
  }

  @Nonnull
  @Override
  public String toString() {
    return String.format(
      Locale.ROOT,
      "Transform(%f, %f, %f, %f, %s, %f)",
      anchor.x,
      anchor.y,
      translate.x,
      translate.y,
      scale.toString(),
      rotate
    );
  }

}
