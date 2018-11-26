package iyegoroff.imagefilterkit;

import com.facebook.infer.annotation.Assertions;

import javax.annotation.Nullable;

public class Scale {

  public enum Mode {
    UP,
    DOWN
  }

  private Scale() {

  }

  public static class WithMode extends Scale {
    public final Mode mode;

    WithMode(Mode mode) {
      this.mode = mode;
    }
  }

  public static class WithMatch extends Scale {
    public final @Nullable String match;

    WithMatch(@Nullable String match) {
      this.match = match;
    }
  }

  @Override
  public String toString() {
    if (this instanceof WithMode) {
      return String.format("Scale.WithMode(%s)", ((WithMode) this).mode.toString());
    }

    if (this instanceof WithMatch) {
      return String.format("Scale.WithMatch(%s)", ((WithMatch) this).match);
    }

    throw Assertions.assertUnreachable("ImageFilterKit: unknown Scale subclass");
  }
}