package iyegoroff.RNImageFilterKit.NativePlatform;

import com.facebook.cache.common.CacheKey;
import com.facebook.imagepipeline.postprocessors.IterativeBoxBlurPostProcessor;

import org.json.JSONObject;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.RNImageFilterKit.RNInputConverter;
import iyegoroff.RNImageFilterKit.Utility.RNCachedPostProcessor;

public class RNIterativeBoxBlurPostProcessor extends IterativeBoxBlurPostProcessor {

  private final boolean mCacheDisabled;

  private static int iterations(
    @Nullable JSONObject config,
    @Nonnull RNInputConverter converter
  ) {
    return (int) converter.convertScalar(config != null ? config.optJSONObject("iterations") : null, 1);
  }

  private static int blurRadius(
    @Nullable JSONObject config,
    @Nonnull RNInputConverter converter
  ) {
    return (int) converter.convertScalar(config != null ? config.optJSONObject("blurRadius") : null, 3);
  }

  public RNIterativeBoxBlurPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(
      RNIterativeBoxBlurPostProcessor.iterations(config, new RNInputConverter(width, height)),
      RNIterativeBoxBlurPostProcessor.blurRadius(config, new RNInputConverter(width, height))
    );

    mCacheDisabled = RNCachedPostProcessor.cacheDisabled(config);
  }

  @Override
  public String getName () {
    return "RNIterativeBoxBlurPostProcessor";
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    return mCacheDisabled ? null : super.getPostprocessorCacheKey();
  }
}
