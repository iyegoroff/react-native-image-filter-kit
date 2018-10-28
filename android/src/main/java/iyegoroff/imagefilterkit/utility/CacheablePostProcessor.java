package iyegoroff.imagefilterkit.utility;

import com.facebook.cache.common.CacheKey;
import com.facebook.imagepipeline.request.BasePostprocessor;

import org.json.JSONObject;

import javax.annotation.Nullable;

public abstract class CacheablePostProcessor extends BasePostprocessor {

  private CacheKey mCacheKey = null;
  private final boolean mCacheDisabled;

  public static boolean cacheDisabled(@Nullable JSONObject config) {
    return (config != null && config.optJSONObject("disableCache") != null) &&
      config.optJSONObject("disableCache").optBoolean("bool", false);
  }

  public CacheablePostProcessor(@Nullable JSONObject config) {
    mCacheDisabled = cacheDisabled(config);
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    if (mCacheKey == null && !mCacheDisabled) {
      mCacheKey = generateCacheKey();
    }

    return mCacheKey;
  }

  protected abstract CacheKey generateCacheKey();
}
