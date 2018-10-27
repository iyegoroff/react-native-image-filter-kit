package iyegoroff.imagefilterkit;

import android.util.Log;

import com.facebook.react.bridge.ModuleSpec;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.modules.fresco.FrescoModule;
import com.facebook.react.shell.MainReactPackage;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Nullable;
import javax.inject.Provider;

public class MainReactPackageWithFrescoCache extends MainReactPackage {

  private @Nullable final Integer mMaxCacheEntries;
  private @Nullable final Integer mMaxCacheSizeInBytes;

  public MainReactPackageWithFrescoCache(
    @Nullable Integer maxCacheEntries,
    @Nullable Integer maxCacheSizeInBytes
  ) {
    super();

    mMaxCacheEntries = maxCacheEntries;
    mMaxCacheSizeInBytes = maxCacheSizeInBytes;
  }

  @Override
  public List<ModuleSpec> getNativeModules(final ReactApplicationContext context) {
    List<ModuleSpec> modules = super.getNativeModules(context);

    final BitmapMemoryCacheParamsSupplier cacheParamsSupplier =
      new BitmapMemoryCacheParamsSupplier(context, mMaxCacheEntries, mMaxCacheSizeInBytes);

    String size = String.valueOf(cacheParamsSupplier.get().maxCacheSize / 1024 / 1024);
    String entries = String.valueOf(cacheParamsSupplier.get().maxCacheEntries);
    Log.d(
      ReactConstants.TAG,
      "ImageFilterKit: Fresco cache size - " + entries + " entries, " + size + " MB overall"
    );

    ArrayList<ModuleSpec> patchedModules = new ArrayList<>();
    for (int i = 0; i < modules.size(); i++) {
      boolean isFresco = "com.facebook.react.modules.fresco.FrescoModule"
        .equals(modules.get(i).getClassName());

      if (isFresco) {
        patchedModules.add(ModuleSpec.nativeModuleSpec(
          FrescoModule.class,
          new Provider<NativeModule>() {
            @Override
            public NativeModule get() {
              return new FrescoModule(
                context,
                true,
                FrescoModule.getDefaultConfigBuilder(context)
                  .setBitmapMemoryCacheParamsSupplier(cacheParamsSupplier)
                  .build()
              );
            }
          }));

      } else {
        patchedModules.add(modules.get(i));
      }
    }

    return patchedModules;
  }
}
