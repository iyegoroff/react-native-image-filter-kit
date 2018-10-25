package iyegoroff.RNImageFilterKit.NativePlatform;

import com.facebook.imagepipeline.postprocessors.RoundAsCirclePostprocessor;

import org.json.JSONObject;

import javax.annotation.Nullable;

public class RNRoundAsCirclePostProcessor extends RoundAsCirclePostprocessor {

  public RNRoundAsCirclePostProcessor(int width, int height, @Nullable JSONObject config) {
    super();
  }

  @Override
  public String getName () {
    return "RNRoundAsCirclePostProcessor";
  }

}
