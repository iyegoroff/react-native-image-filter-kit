package iyegoroff.imagefilterkit;

class Functor {

  private Functor() {

  }

  public static class Arity0 extends Functor {

    public void call() { throw new RuntimeException("Stub!"); }
  }

  public static class Arity1<T> extends Functor {

    public void call(T arg1) { throw new RuntimeException("Stub!"); }
  }
}
