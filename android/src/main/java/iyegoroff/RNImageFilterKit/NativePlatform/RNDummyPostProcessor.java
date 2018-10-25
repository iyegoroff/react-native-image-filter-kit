package iyegoroff.RNImageFilterKit.NativePlatform;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.imagepipeline.request.BasePostprocessor;

public class RNDummyPostProcessor extends BasePostprocessor {

  private CacheKey mCacheKey = new SimpleCacheKey("dummy");

  public RNDummyPostProcessor() {
  }

  @Override
  public String getName () {
    return "RNDummyPostProcessor";
  }

  @Override
  public CacheKey getPostprocessorCacheKey() {
    return mCacheKey;
  }
}
