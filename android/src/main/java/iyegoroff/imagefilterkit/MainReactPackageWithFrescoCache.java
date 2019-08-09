package iyegoroff.imagefilterkit;

import android.app.ActivityManager;
import android.content.Context;
import android.graphics.Bitmap;

import com.facebook.common.internal.Supplier;
import com.facebook.common.logging.FLog;
import com.facebook.imagepipeline.cache.DefaultBitmapMemoryCacheParamsSupplier;
import com.facebook.imagepipeline.cache.MemoryCacheParams;
import com.facebook.react.bridge.ModuleSpec;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.modules.fresco.FrescoModule;
import com.facebook.react.shell.MainReactPackage;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.inject.Provider;

import iyegoroff.reflectutils.ReflectUtils;

public class MainReactPackageWithFrescoCache extends MainReactPackage {

  private @Nullable final Integer mMaxCacheEntries;
  private @Nullable final Integer mMaxCacheSizeInBytes;
  private static @Nonnull Bitmap.Config sBitmapsConfig = Bitmap.Config.ARGB_8888;

  @SuppressWarnings("WeakerAccess")
  public MainReactPackageWithFrescoCache(
    @Nullable Integer maxCacheEntries,
    @Nullable Integer maxCacheSizeInBytes,
    @Nullable Bitmap.Config bitmapsConfig
  ) {
    super();

    mMaxCacheEntries = maxCacheEntries;
    mMaxCacheSizeInBytes = maxCacheSizeInBytes;

    sBitmapsConfig = bitmapsConfig == null ? sBitmapsConfig : bitmapsConfig;
  }

  @SuppressWarnings("UnusedDeclaration")
  public MainReactPackageWithFrescoCache() {
    this(null, null, null);
  }

  public static Bitmap.Config bitmapsConfig() {
    return sBitmapsConfig;
  }

  private static boolean isFresco(ModuleSpec module) {
    @Nullable String name = ReflectUtils.invokeMethod(module, "getName");
    name = name == null ? ReflectUtils.<String>invokeMethod(module, "getClassName") : name;

    return name != null && name.endsWith("FrescoModule");
  }

  @Override
  public List<ModuleSpec> getNativeModules(final ReactApplicationContext context) {
    List<ModuleSpec> modules = super.getNativeModules(context);

    ActivityManager manager = (ActivityManager)context.getSystemService(Context.ACTIVITY_SERVICE);
    final Supplier<MemoryCacheParams> cacheParamsSupplier =
      new DefaultBitmapMemoryCacheParamsSupplier(manager) {
        @Override
        public MemoryCacheParams get() {
          MemoryCacheParams params = super.get();

          return new MemoryCacheParams(
            mMaxCacheSizeInBytes == null ? params.maxCacheSize : mMaxCacheSizeInBytes,
            mMaxCacheEntries == null ? params.maxCacheEntries : mMaxCacheEntries,
            params.maxEvictionQueueSize,
            params.maxEvictionQueueEntries,
            params.maxCacheEntrySize
          );
        }
      };

    String size = String.valueOf(cacheParamsSupplier.get().maxCacheSize / 1024 / 1024);
    String entries = String.valueOf(cacheParamsSupplier.get().maxCacheEntries);
    FLog.d(
      ReactConstants.TAG,
      "ImageFilterKit: Fresco cache size - " + entries + " entries, " + size + " MB overall"
    );

    ArrayList<ModuleSpec> patchedModules = new ArrayList<>();
    for (int i = 0; i < modules.size(); i++) {

      if (isFresco(modules.get(i))) {
        patchedModules.add(ModuleSpec.nativeModuleSpec(
          FrescoModule.class,
          new Provider<NativeModule>() {
            @Override
            public NativeModule get() {
              return new FrescoModule(
                context,
                true,
                FrescoModule.getDefaultConfigBuilder(context)
                  .setMemoryTrimmableRegistry(MemoryTrimmer.getInstance())
                  .setBitmapMemoryCacheParamsSupplier(cacheParamsSupplier)
                  .setBitmapsConfig(sBitmapsConfig)
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
