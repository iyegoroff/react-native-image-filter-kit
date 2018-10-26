package iyegoroff.RNImageFilterKit.NativePlatform;

import com.facebook.cache.common.CacheKey;
import com.facebook.imagepipeline.postprocessors.RoundAsCirclePostprocessor;

import org.json.JSONObject;

import javax.annotation.Nullable;

import iyegoroff.RNImageFilterKit.Utility.RNCachedPostProcessor;

public class RNRoundAsCirclePostProcessor extends RoundAsCirclePostprocessor {

  private final boolean mCacheDisabled;

  public RNRoundAsCirclePostProcessor(int width, int height, @Nullable JSONObject config) {
    super();

    mCacheDisabled = RNCachedPostProcessor.cacheDisabled(config);
  }

  @Override
  public String getName () {
    return "RNRoundAsCirclePostProcessor";
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    return mCacheDisabled ? null : super.getPostprocessorCacheKey();
  }
}
