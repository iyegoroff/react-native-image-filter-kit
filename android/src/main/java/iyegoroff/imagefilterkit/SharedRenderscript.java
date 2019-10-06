package iyegoroff.imagefilterkit;

import android.content.Context;
import android.util.Log;

import androidx.renderscript.RenderScript;

import com.facebook.react.common.ReactConstants;

public class SharedRenderscript {
  private static SharedRenderscript sInstance = null;

  private final RenderScript mRenderscript;

  private SharedRenderscript(final Context context) {
    mRenderscript = RenderScript.create(context);
  }

  public RenderScript script() {
    return mRenderscript;
  }

  public static SharedRenderscript getInstance(final Context context) {
    if (sInstance == null) {
      Log.d(ReactConstants.TAG, "REQUIRE CONTEXT");
      synchronized (SharedRenderscript.class) {
        if (sInstance == null) {
          Log.d(ReactConstants.TAG, "CREATE CONTEXT");
          sInstance = new SharedRenderscript(context);
        }
      }
    }

    return sInstance;
  }
}
