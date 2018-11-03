package iyegoroff.imagefilterkit;

import android.content.Context;

public class ContextProvider {

  private static Context sContext;

  public static void setContext(Context context) {
    sContext = context;
  }

  public static Context getContext() {
    return sContext;
  }
}
