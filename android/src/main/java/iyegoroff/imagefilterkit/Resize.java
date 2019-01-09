package iyegoroff.imagefilterkit;

import com.facebook.infer.annotation.Assertions;

import java.util.Locale;

import javax.annotation.Nullable;

public class Resize {

  public enum Mode {
    STRETCH,
    CONTAIN,
    COVER
  }

  private Resize() {

  }

  public static class WithMode extends Resize {
    public final Mode mode;

    WithMode(Mode mode) {
      this.mode = mode;
    }
  }

  public static class WithSize extends Resize {
    public final @Nullable Float width;
    public final @Nullable Float height;

    WithSize(@Nullable Float width, @Nullable Float height) {
      this.width = width;
      this.height = height;
    }
  }

  @Override
  public String toString() {
    if (this instanceof WithMode) {
      return String.format("Resize.WithMode(%s)", ((WithMode) this).mode.toString());
    }

    if (this instanceof WithSize) {
      return String.format(
        Locale.ROOT,
        "Resize.WithSize(%f, %f)",
        ((WithSize) this).width,
        ((WithSize) this).height
      );
    }

    throw Assertions.assertUnreachable("ImageFilterKit: unknown Resize subclass");
  }
}
