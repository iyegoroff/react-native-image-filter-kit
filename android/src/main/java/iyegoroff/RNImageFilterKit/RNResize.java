package iyegoroff.RNImageFilterKit;

import com.facebook.infer.annotation.Assertions;

import javax.annotation.Nullable;

public class RNResize {

  public enum Mode {
    STRETCH,
    CONTAIN,
    COVER
  }

  private RNResize() {

  }

  public static class WithMode extends RNResize {
    public final Mode mode;

    WithMode(Mode mode) {
      this.mode = mode;
    }
  }

  public static class WithSize extends RNResize {
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
      return String.format("RNResize.WithMode(%s)", ((WithMode) this).mode.toString());
    }

    if (this instanceof WithSize) {
      return String.format("RNResize.WithSize(%a, %a)", ((WithSize) this).width, ((WithSize) this).height);
    }

    Assertions.assertCondition(false, "ImageFilterKit: unknown RNResize subclass");

    return "";
  }
}
