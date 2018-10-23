package iyegoroff.RNImageFilterKit.Native;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.imagepipeline.request.BasePostprocessor;

public class RNDummyPostProcessor extends BasePostprocessor {

  private CacheKey mCacheKey = new SimpleCacheKey("dummy");

  public RNDummyPostProcessor() {
  }

  @Override
  public CacheKey getPostprocessorCacheKey() {
    return mCacheKey;
  }
}
