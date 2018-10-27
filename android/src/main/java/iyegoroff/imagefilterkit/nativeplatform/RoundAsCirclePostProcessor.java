package iyegoroff.imagefilterkit.nativeplatform;

import com.facebook.cache.common.CacheKey;
import com.facebook.imagepipeline.postprocessors.RoundAsCirclePostprocessor;

import org.json.JSONObject;

import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.utility.CachedPostProcessor;

public class RoundAsCirclePostProcessor extends RoundAsCirclePostprocessor {

  private final boolean mCacheDisabled;

  public RoundAsCirclePostProcessor(int width, int height, @Nullable JSONObject config) {
    super();

    mCacheDisabled = CachedPostProcessor.cacheDisabled(config);
  }

  @Override
  public String getName () {
    return "RoundAsCirclePostProcessor";
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    return mCacheDisabled ? null : super.getPostprocessorCacheKey();
  }
}
