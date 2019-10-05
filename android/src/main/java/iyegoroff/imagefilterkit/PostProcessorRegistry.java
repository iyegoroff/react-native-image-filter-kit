package iyegoroff.imagefilterkit;

import android.content.Context;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.references.CloseableReference;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.infer.annotation.Assertions;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.blend.ColorBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.ColorBurnBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.ColorDodgeBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.DifferenceBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.ExclusionBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.HardLightBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.HueBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.LuminosityBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.MultiplyBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.SaturationBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.SoftLightBlendPostProcessor;
import iyegoroff.imagefilterkit.compositing.DestinationATopCompositingPostProcessor;
import iyegoroff.imagefilterkit.compositing.DestinationInCompositingPostProcessor;
import iyegoroff.imagefilterkit.compositing.SourceInCompositingPostProcessor;
import iyegoroff.imagefilterkit.compositing.SourceOutCompositingPostProcessor;
import iyegoroff.imagefilterkit.gradients.EllipticalGradientPostProcessor;
import iyegoroff.imagefilterkit.gradients.QuadGradientPostProcessor;
import iyegoroff.imagefilterkit.gradients.RectangularGradientPostProcessor;
import iyegoroff.imagefilterkit.gradients.SmoothLinearGradientPostProcessor;
import iyegoroff.imagefilterkit.gradients.SmoothRadialGradientPostProcessor;
import iyegoroff.imagefilterkit.gradients.SmoothSweepGradientPostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.ColorMatrixColorFilterPostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.ColorPostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.LightingColorFilterPostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.LinearGradientPostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.IterativeBoxBlurPostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.PorterDuffColorFilterPostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.PorterDuffXfermodePostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.RadialGradientPostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.RoundAsCirclePostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.SweepGradientPostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.TextImagePostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.scriptintrinsic.ScriptIntrinsicBlurPostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.scriptintrinsic.ScriptIntrinsicConvolve3x3PostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.scriptintrinsic.ScriptIntrinsicConvolve5x5PostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.shape.CircleShapePostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.shape.OvalShapePostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.shape.PathShapePostProcessor;
import iyegoroff.imagefilterkit.nativeplatform.shape.RegularPolygonShapePostProcessor;

@SuppressWarnings("WeakerAccess")
public class PostProcessorRegistry {

  public interface CreateSingular {

    Postprocessor create(
      int width,
      int height,
      @Nullable JSONObject config,
      @Nonnull Context context
    );
  }

  public interface CreateComposition {

    Postprocessor create(
      int width,
      int height,
      @Nullable JSONObject config,
      @Nonnull CloseableReference<CloseableImage> imageRef,
      @Nonnull CacheKey imageKey,
      @Nonnull Context context
    );
  }

  private final Map<String, CreateSingular> mSingulars = new HashMap<>();
  private final Map<String, CreateComposition> mCompositions = new HashMap<>();

  private static final PostProcessorRegistry sInstance = new PostProcessorRegistry();

  public static PostProcessorRegistry getInstance() {
    return sInstance;
  }

  private PostProcessorRegistry() {
    addSingular(
      "ColorMatrixColorFilter",
      (width, height, config, context) -> new ColorMatrixColorFilterPostProcessor(width, height, config)
    );

    addSingular(
      "Color",
      (width, height, config, context) -> new ColorPostProcessor(width, height, config)
    );

    addSingular(
      "IterativeBoxBlur",
      (width, height, config, context) -> new IterativeBoxBlurPostProcessor(width, height, config)
    );

    addSingular(
      "LightingColorFilter",
      (width, height, config, context) -> new LightingColorFilterPostProcessor(width, height, config)
    );

    addSingular(
      "LinearGradient",
      (width, height, config, context) -> new LinearGradientPostProcessor(width, height, config)
    );

    addSingular(
      "PorterDuffColorFilter",
      (width, height, config, context) -> new PorterDuffColorFilterPostProcessor(width, height, config)
    );

    addSingular(
      "RadialGradient",
      (width, height, config, context) -> new RadialGradientPostProcessor(width, height, config)
    );

    addSingular(
      "RoundAsCircle",
      (width, height, config, context) -> new RoundAsCirclePostProcessor(config)
    );

    addSingular(
      "SweepGradient",
      (width, height, config, context) -> new SweepGradientPostProcessor(width, height, config)
    );

    addSingular("ScriptIntrinsicBlur", ScriptIntrinsicBlurPostProcessor::new);

    addSingular("ScriptIntrinsicConvolve3x3", ScriptIntrinsicConvolve3x3PostProcessor::new);

    addSingular("ScriptIntrinsicConvolve5x5", ScriptIntrinsicConvolve5x5PostProcessor::new);

    addSingular("TextImage", TextImagePostProcessor::new);

    addSingular(
      "CircleShape",
      (width, height, config, context) -> new CircleShapePostProcessor(width, height, config)
    );

    addSingular(
      "OvalShape",
      (width, height, config, context) -> new OvalShapePostProcessor(width, height, config)
    );

    addSingular(
      "PathShape",
      (width, height, config, context) -> new PathShapePostProcessor(width, height, config)
    );

    addSingular(
      "RegularPolygonShape",
      (width, height, config, context) -> new RegularPolygonShapePostProcessor(width, height, config)
    );

    addComposition(
      "PorterDuffXfermode",
      (width, height, config, imageRef, imageKey, context) -> new PorterDuffXfermodePostProcessor(width, height, config, imageRef, imageKey)
    );

    addSingular("QuadGradient", QuadGradientPostProcessor::new);

    addSingular("SmoothRadialGradient", SmoothRadialGradientPostProcessor::new);

    addSingular("SmoothSweepGradient", SmoothSweepGradientPostProcessor::new);

    addSingular("SmoothLinearGradient", SmoothLinearGradientPostProcessor::new);

    addSingular("EllipticalGradient", EllipticalGradientPostProcessor::new);

    addSingular("RectangularGradient", RectangularGradientPostProcessor::new);

    addComposition("ColorDodgeBlend", ColorDodgeBlendPostProcessor::new);

    addComposition("ExclusionBlend", ExclusionBlendPostProcessor::new);

    addComposition("ColorBurnBlend", ColorBurnBlendPostProcessor::new);

    addComposition("SoftLightBlend", SoftLightBlendPostProcessor::new);

    addComposition("HueBlend", HueBlendPostProcessor::new);

    addComposition("ColorBlend", ColorBlendPostProcessor::new);

    addComposition("SaturationBlend", SaturationBlendPostProcessor::new);

    addComposition("LuminosityBlend", LuminosityBlendPostProcessor::new);

    addComposition("DifferenceBlend", DifferenceBlendPostProcessor::new);

    addComposition("HardLightBlend", HardLightBlendPostProcessor::new);

    addComposition("MultiplyBlend", MultiplyBlendPostProcessor::new);

    addComposition("DestinationATopCompositing", DestinationATopCompositingPostProcessor::new);

    addComposition("SourceOutCompositing", SourceOutCompositingPostProcessor::new);

    addComposition("DestinationInCompositing", DestinationInCompositingPostProcessor::new);

    addComposition("SourceInCompositing", SourceInCompositingPostProcessor::new);
  }

  public void addSingular(@Nonnull String name, @Nonnull CreateSingular functor) {
    mSingulars.put(name, functor);
  }

  public void addComposition(@Nonnull String name, @Nonnull CreateComposition functor) {
    mCompositions.put(name, functor);
  }

  boolean isSingular(@Nonnull String name) {
    return mSingulars.containsKey(name);
  }

  boolean isComposition(@Nonnull String name) {
    return mCompositions.containsKey(name);
  }

  @Nullable
  Postprocessor createSingular(
    @Nullable String name,
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull Context context
  ) {
    @Nullable CreateSingular filter = mSingulars.get(name);

    Assertions.assertCondition(
      filter != null,
      "ImageFilterKit: Can't find '" + name + "' filter in registry."
    );

    return filter != null ? filter.create(width, height, config, context) : null;
  }

  @Nullable
  Postprocessor createComposition(
    @Nullable String name,
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull CloseableReference<CloseableImage> imageRef,
    @Nonnull CacheKey imageKey,
    @Nonnull Context context
  ) {
    @Nullable CreateComposition filter = mCompositions.get(name);

    Assertions.assertCondition(
      filter != null,
      "ImageFilterKit: Can't find '" + name + "' filter in registry."
    );

    return filter != null
      ? filter.create(width, height, config, imageRef, imageKey, context)
      : null;
  }
}
