package iyegoroff.imagefilterkit.nativeplatform;

import com.facebook.cache.common.CacheKey;

import org.json.JSONObject;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.CacheablePostProcessor;

public class IterativeBoxBlurPostProcessor extends com.facebook.imagepipeline.postprocessors.IterativeBoxBlurPostProcessor {

  private final boolean mCacheDisabled;

  private static int iterations(
    @Nullable JSONObject config,
    @Nonnull InputConverter converter
  ) {
    return (int) converter.convertScalar(config, "iterations", 3);
  }

  private static int blurRadius(
    @Nullable JSONObject config,
    @Nonnull InputConverter converter
  ) {
    return (int) converter.convertScalar(config, "blurRadius", 3);
  }

  public IterativeBoxBlurPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(
      IterativeBoxBlurPostProcessor.iterations(config, new InputConverter(width, height)),
      IterativeBoxBlurPostProcessor.blurRadius(config, new InputConverter(width, height))
    );

    mCacheDisabled = CacheablePostProcessor.cacheDisabled(config);
  }

  @Override
  public String getName() {
    return "IterativeBoxBlurPostProcessor";
  }

  @Nullable
  @Override
  public CacheKey getPostprocessorCacheKey() {
    return mCacheDisabled ? null : super.getPostprocessorCacheKey();
  }
}
