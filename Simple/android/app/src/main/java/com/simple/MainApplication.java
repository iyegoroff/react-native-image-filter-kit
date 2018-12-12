package com.simple;

import android.app.Application;
import android.content.ComponentCallbacks2;
import android.util.Log;

import com.facebook.common.memory.MemoryTrimType;
import com.facebook.common.memory.MemoryTrimmable;
import com.facebook.common.memory.MemoryTrimmableRegistry;
import com.facebook.react.ReactApplication;
import iyegoroff.imagefilterkit.ImageFilterKitPackage;
import com.RNFetchBlob.RNFetchBlobPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  public class FrescoMemoryTrimmableRegistry implements MemoryTrimmableRegistry {

    private final List<MemoryTrimmable> trimmables = new LinkedList<>();

    @Override
    public void registerMemoryTrimmable(final MemoryTrimmable trimmable) {
      Log.d(ReactConstants.TAG, "ImageFilterKit: add trimmable " + String.valueOf(trimmable));
      trimmables.add(trimmable);
    }

    @Override
    public void unregisterMemoryTrimmable(final MemoryTrimmable trimmable) {
      Log.d(ReactConstants.TAG, "ImageFilterKit: remove trimmable " + String.valueOf(trimmable));
      trimmables.remove(trimmable);
    }

    public synchronized void trim(final MemoryTrimType trimType) {
      Log.d(ReactConstants.TAG, "ImageFilterKit: will trim " + String.valueOf(trimType));
      for (MemoryTrimmable trimmable : trimmables) {
        Log.d(ReactConstants.TAG, "ImageFilterKit: trimmed " + String.valueOf(trimmable));
        trimmable.trim(trimType);
      }
    }

  }

  private FrescoMemoryTrimmableRegistry mTrimmableRegistry = new FrescoMemoryTrimmableRegistry();

  @Override
  public void onTrimMemory(final int level) {
    super.onTrimMemory(level);
    switch (level) {
      case ComponentCallbacks2.TRIM_MEMORY_UI_HIDDEN:
        mTrimmableRegistry.trim(MemoryTrimType.OnAppBackgrounded);
        Log.d(ReactConstants.TAG, "ImageFilterKit: OnAppBackgrounded - level = " + level);
        break;

      case ComponentCallbacks2.TRIM_MEMORY_RUNNING_MODERATE:
      case ComponentCallbacks2.TRIM_MEMORY_RUNNING_LOW:
      case ComponentCallbacks2.TRIM_MEMORY_RUNNING_CRITICAL:
        mTrimmableRegistry.trim(MemoryTrimType.OnCloseToDalvikHeapLimit);
        Log.d(ReactConstants.TAG, "ImageFilterKit: OnCloseToDalvikHeapLimit - level = " + level);
        break;

      case ComponentCallbacks2.TRIM_MEMORY_BACKGROUND:
      case ComponentCallbacks2.TRIM_MEMORY_MODERATE:
      case ComponentCallbacks2.TRIM_MEMORY_COMPLETE:
        mTrimmableRegistry.trim(MemoryTrimType.OnSystemLowMemoryWhileAppInForeground);
        Log.d(ReactConstants.TAG, "ImageFilterKit: OnSystemLowMemoryWhileAppInForeground - level = " + level);
        break;

      default:
        Log.d(ReactConstants.TAG, "ImageFilterKit: default - level = " + level);
        break;
    }
  }


//  private class MainReactPackage extends MainReactPackageWithFrescoCache {
//    MainReactPackage() {
//      super(
//        null,
//        (int) (Runtime.getRuntime().maxMemory() / 4),
//        null
//      );
//    }
//  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
//      FLog.setMinimumLoggingLevel(FLog.VERBOSE);

      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new ImageFilterKitPackage(),
            new RNFetchBlobPackage(),
        new ImageFilterKitPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
