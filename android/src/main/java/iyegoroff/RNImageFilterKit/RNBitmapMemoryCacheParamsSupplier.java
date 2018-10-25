package iyegoroff.RNImageFilterKit;

import android.app.ActivityManager;
import android.content.Context;
import android.os.Build;

import com.facebook.common.internal.Supplier;
import com.facebook.common.util.ByteConstants;
import com.facebook.imagepipeline.cache.MemoryCacheParams;

import javax.annotation.Nullable;

public class RNBitmapMemoryCacheParamsSupplier implements Supplier<MemoryCacheParams> {
  private static final int MAX_CACHE_ENTRIES = 256;
  private static final int MAX_EVICTION_QUEUE_SIZE = Integer.MAX_VALUE;
  private static final int MAX_EVICTION_QUEUE_ENTRIES = Integer.MAX_VALUE;
  private static final int MAX_CACHE_ENTRY_SIZE = Integer.MAX_VALUE;

  private final int mMaxCacheEntries;
  private final int mMaxCacheSizeInBytes;

  private final ActivityManager mActivityManager;

  public RNBitmapMemoryCacheParamsSupplier(
    Context context,
    @Nullable Integer maxCacheEntries,
    @Nullable Integer maxCacheSizeInBytes
  ) {
    mActivityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
    mMaxCacheEntries = maxCacheEntries == null ? MAX_CACHE_ENTRIES : maxCacheEntries;
    mMaxCacheSizeInBytes = maxCacheSizeInBytes == null ? getMaxCacheSize() : maxCacheSizeInBytes;
  }

  @Override
  public MemoryCacheParams get() {
    return new MemoryCacheParams(
      mMaxCacheSizeInBytes,
      mMaxCacheEntries,
      MAX_EVICTION_QUEUE_SIZE,
      MAX_EVICTION_QUEUE_ENTRIES,
      MAX_CACHE_ENTRY_SIZE);
  }

  private int getMaxCacheSize() {
    final int maxMemory =
      Math.min(mActivityManager.getMemoryClass() * ByteConstants.MB, Integer.MAX_VALUE);
    if (maxMemory < 32 * ByteConstants.MB) {
      return 4 * ByteConstants.MB;
    } else if (maxMemory < 64 * ByteConstants.MB) {
      return 6 * ByteConstants.MB;
    } else {
      return maxMemory / 4;
    }
  }
}