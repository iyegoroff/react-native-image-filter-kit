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
    name = name == null ? ReflectUtils.invokeMethod(module, "getClassName") : name;

    return name != null && name.endsWith("FrescoModule");
  }

  private Supplier<MemoryCacheParams> createCacheParamsSupplier(
    final ReactApplicationContext context
  ) {
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

    return cacheParamsSupplier;
  }

  private FrescoModule createFrescoModule(final ReactApplicationContext context) {
    return new FrescoModule(
      context,
      true,
      FrescoModule.getDefaultConfigBuilder(context)
        .setMemoryTrimmableRegistry(MemoryTrimmer.getInstance())
        .setBitmapMemoryCacheParamsSupplier(createCacheParamsSupplier(context))
        .setBitmapsConfig(sBitmapsConfig)
        .build()
    );
  }

  // for RN 0.60
  @SuppressWarnings("UnusedDeclaration")
  public List<ModuleSpec> getNativeModules(final ReactApplicationContext context) {
    List<ModuleSpec> modules = ReflectUtils.invokeMethod(
      MainReactPackage.class,
      this,
      "getNativeModules",
      context
    );

    ArrayList<ModuleSpec> patchedModules = new ArrayList<>();
    int size = modules == null ? 0 : modules.size();

    for (int i = 0; i < size; i++) {

      if (isFresco(modules.get(i))) {
        patchedModules.add(ModuleSpec.nativeModuleSpec(
          FrescoModule.class,
          () -> createFrescoModule(context))
        );

      } else {
        patchedModules.add(modules.get(i));
      }
    }

    return patchedModules;
  }

  // for RN 0.61
  public NativeModule getModule(String name, ReactApplicationContext context) {
    return FrescoModule.NAME.equals(name)
      ? createFrescoModule(context)
      : (
        ReflectUtils.invokeMethod(
          MainReactPackage.class,
          this,
          "getModule",
          new Object[]{name, context}
        )
      );
  }
}
