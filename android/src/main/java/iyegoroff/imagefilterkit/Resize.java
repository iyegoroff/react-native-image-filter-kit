package iyegoroff.imagefilterkit;

import com.facebook.infer.annotation.Assertions;

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
      return String
        .format("Resize.WithSize(%a, %a)", ((WithSize) this).width, ((WithSize) this).height);
    }

    Assertions
      .assertCondition(false, "ImageFilterKit: unknown Resize subclass");

    return "";
  }
}
