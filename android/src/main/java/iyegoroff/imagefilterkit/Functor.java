package iyegoroff.imagefilterkit;

interface Functor {
  interface Arity0 {
    void call();
  }

  interface Arity1<T> {
    void call(T arg1);
  }
}
