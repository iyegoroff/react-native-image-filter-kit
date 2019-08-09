package iyegoroff.imagefilterkit.nativeplatform;

import com.facebook.cache.common.CacheKey;
import com.facebook.imagepipeline.postprocessors.RoundAsCirclePostprocessor;

import org.json.JSONObject;

import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.utility.CacheablePostProcessor;

public class RoundAsCirclePostProcessor extends RoundAsCirclePostprocessor {

  private final boolean mCacheDisabled;

  public RoundAsCirclePostProcessor(@Nullable JSONObject config) {
    super();

    mCacheDisabled = CacheablePostProcessor.cacheDisabled(config);
  }

  @Override
  public String getName() {
    return "RoundAsCirclePostProcessor";
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    return mCacheDisabled ? null : super.getPostprocessorCacheKey();
  }
}
