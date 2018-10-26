package com.simple;

import android.app.Application;

import com.facebook.react.ReactApplication;
import iyegoroff.RNColorMatrixImageFilters.RNColorMatrixImageFiltersPackage;
import iyegoroff.RNImageFilterKit.RNImageFilterKitPackage;
import iyegoroff.RNImageFilterKit.RNMainReactPackageWithFrescoCache;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new RNMainReactPackageWithFrescoCache(
          null,
          (int) (Runtime.getRuntime().maxMemory() / 4)
        ),
        new RNColorMatrixImageFiltersPackage(),
        new RNImageFilterKitPackage()
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
