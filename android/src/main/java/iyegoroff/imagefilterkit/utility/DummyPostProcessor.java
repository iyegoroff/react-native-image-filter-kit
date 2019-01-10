package iyegoroff.imagefilterkit.utility;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;
import com.facebook.imagepipeline.request.BasePostprocessor;

public class DummyPostProcessor extends BasePostprocessor {

  private CacheKey mCacheKey = new SimpleCacheKey("dummy");

  public DummyPostProcessor() {
  }

  @Override
  public String getName() {
    return "DummyPostProcessor";
  }

  @Override
  public CacheKey getPostprocessorCacheKey() {
    return mCacheKey;
  }
}
