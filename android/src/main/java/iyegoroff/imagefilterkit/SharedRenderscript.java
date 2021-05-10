package iyegoroff.imagefilterkit;

import android.content.Context;

import android.renderscript.RenderScript;

public class SharedRenderscript {
  private static volatile SharedRenderscript sInstance = null;

  private final RenderScript mRenderscript;

  private SharedRenderscript(final Context context) {
    mRenderscript = RenderScript.create(context);
  }

  public RenderScript script() {
    return mRenderscript;
  }

  public static SharedRenderscript getInstance(final Context context) {
    if (sInstance == null) {
      synchronized (SharedRenderscript.class) {
        if (sInstance == null) {
          sInstance = new SharedRenderscript(context);
        }
      }
    }

    return sInstance;
  }
}
