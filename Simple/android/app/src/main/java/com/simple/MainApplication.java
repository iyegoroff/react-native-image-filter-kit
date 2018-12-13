package com.simple;

import android.app.Application;

import com.facebook.common.logging.FLog;
import com.facebook.react.ReactApplication;
import iyegoroff.imagefilterkit.ImageFilterKitPackage;
import iyegoroff.imagefilterkit.MainReactPackageWithFrescoCache;

import com.RNFetchBlob.RNFetchBlobPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

//  @Override
//  public void onTrimMemory(final int level) {
//    super.onTrimMemory(level);
//    switch (level) {
//      case ComponentCallbacks2.TRIM_MEMORY_UI_HIDDEN:
//        mTrimmableRegistry.trim(MemoryTrimType.OnAppBackgrounded);
//        Log.d(ReactConstants.TAG, "ImageFilterKit: OnAppBackgrounded - level = " + level);
//        break;
//
//      case ComponentCallbacks2.TRIM_MEMORY_RUNNING_MODERATE:
//      case ComponentCallbacks2.TRIM_MEMORY_RUNNING_LOW:
//      case ComponentCallbacks2.TRIM_MEMORY_RUNNING_CRITICAL:
//        mTrimmableRegistry.trim(MemoryTrimType.OnCloseToDalvikHeapLimit);
//        Log.d(ReactConstants.TAG, "ImageFilterKit: OnCloseToDalvikHeapLimit - level = " + level);
//        break;
//
//      case ComponentCallbacks2.TRIM_MEMORY_BACKGROUND:
//      case ComponentCallbacks2.TRIM_MEMORY_MODERATE:
//      case ComponentCallbacks2.TRIM_MEMORY_COMPLETE:
//        mTrimmableRegistry.trim(MemoryTrimType.OnSystemLowMemoryWhileAppInForeground);
//        Log.d(ReactConstants.TAG, "ImageFilterKit: OnSystemLowMemoryWhileAppInForeground - level = " + level);
//        break;
//
//      default:
//        Log.d(ReactConstants.TAG, "ImageFilterKit: default - level = " + level);
//        break;
//    }
//  }


  private class MainReactPackage extends MainReactPackageWithFrescoCache {

  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      FLog.setMinimumLoggingLevel(FLog.DEBUG);

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
