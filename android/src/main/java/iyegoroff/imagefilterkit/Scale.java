package iyegoroff.imagefilterkit;

import android.graphics.PointF;

import com.facebook.infer.annotation.Assertions;

import java.util.Locale;

import javax.annotation.Nonnull;

public class Scale {

  public enum Mode {
    STRETCH,
    CONTAIN,
    COVER
  }

  private Scale() {

  }

  public static class WithMode extends Scale {
    public final Mode mode;

    public WithMode(Mode mode) {
      this.mode = mode;
    }
  }

  public static class WithSize extends Scale {
    public final @Nonnull PointF scale;

    WithSize(float x, float y) {
      this.scale = new PointF(x, y);
    }
  }

  @Nonnull
  @Override
  public String toString() {
    if (this instanceof WithMode) {
      return String.format(Locale.ROOT, "Scale.WithMode(%s)", ((WithMode) this).mode.toString());
    }

    if (this instanceof WithSize) {
      return String.format(
        Locale.ROOT, "Scale.WithSize(%f, %f)", ((WithSize) this).scale.x, ((WithSize) this).scale.y
      );
    }

    throw Assertions.assertUnreachable("ImageFilterKit: unknown Scale subclass");
  }
}
