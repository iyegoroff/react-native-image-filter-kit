package com.simple;

import android.app.Application;
import android.content.ComponentCallbacks2;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import iyegoroff.imagefilterkit.ImageFilterKitPackage;
import iyegoroff.imagefilterkit.MainReactPackageWithFrescoCache;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.common.ReactConstants;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {


//  @Override
//  public void onTrimMemory(final int level) {
//    super.onTrimMemory(level);
//    switch (level) {
//      case ComponentCallbacks2.TRIM_MEMORY_UI_HIDDEN:
//        frescoMemoryTrimmableRegistry.trim(MemoryTrimType.OnAppBackgrounded);
//        Log.d(ReactConstants.TAG, "OnAppBackgrounded - level = " + level);
//        break;
//
//      case ComponentCallbacks2.TRIM_MEMORY_RUNNING_MODERATE:
//      case ComponentCallbacks2.TRIM_MEMORY_RUNNING_LOW:
//      case ComponentCallbacks2.TRIM_MEMORY_RUNNING_CRITICAL:
//        frescoMemoryTrimmableRegistry.trim(MemoryTrimType.OnCloseToDalvikHeapLimit);
//        clearMemoryCaches();
//        L.d("OnCloseToDalvikHeapLimit - level = " + level);
//        break;
//
//      case ComponentCallbacks2.TRIM_MEMORY_BACKGROUND:
//      case ComponentCallbacks2.TRIM_MEMORY_MODERATE:
//      case ComponentCallbacks2.TRIM_MEMORY_COMPLETE:
//        frescoMemoryTrimmableRegistry.trim(MemoryTrimType.OnSystemLowMemoryWhileAppInForeground);
//        L.d("OnSystemLowMemoryWhileAppInForeground - level = " + level);
//        break;
//
//      default:
//        L.d("default - level = " + level);
//        break;
//    }
//  }

  private class MainReactPackage extends MainReactPackageWithFrescoCache {
    MainReactPackage() {
      super(
        null,
        (int) (Runtime.getRuntime().maxMemory() / 4),
        null
      );
    }
  }

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
