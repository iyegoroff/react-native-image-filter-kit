package iyegoroff.RNImageFilterKit;

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

import iyegoroff.RNImageFilterKit.PostProcessors.RNColorMatrixColorFilterPostProcessor;
import iyegoroff.RNImageFilterKit.PostProcessors.RNColorPostProcessor;
import iyegoroff.RNImageFilterKit.PostProcessors.RNIterativeBoxBlurPostProcessor;
import iyegoroff.RNImageFilterKit.PostProcessors.RNLightingColorFilterPostProcessor;
import iyegoroff.RNImageFilterKit.PostProcessors.RNLinearGradientPostProcessor;
import iyegoroff.RNImageFilterKit.PostProcessors.RNPorterDuffColorFilterPostProcessor;
import iyegoroff.RNImageFilterKit.PostProcessors.RNPorterDuffXfermodePostProcessor;
import iyegoroff.RNImageFilterKit.PostProcessors.RNRadialGradientPostProcessor;
import iyegoroff.RNImageFilterKit.PostProcessors.RNRoundAsCirclePostProcessor;
import iyegoroff.RNImageFilterKit.PostProcessors.RNSweepGradientPostProcessor;

public class RNPostProcessorRegistry {

  public class CreateSingular {

    public Postprocessor create(int width, int height, @Nullable JSONObject config) {
      throw new RuntimeException("Stub!");
    }
  }

  public class CreateComposition {

    public Postprocessor create(
      int width,
      int height,
      @Nullable JSONObject config,
      @Nonnull CloseableReference<CloseableImage> imageRef,
      @Nonnull CacheKey imageKey
    ) {
      throw new RuntimeException("Stub!");
    }
  }

  private final Map<String, CreateSingular> singulars = new HashMap<>();
  private final Map<String, CreateComposition> compositions = new HashMap<>();

  private static final RNPostProcessorRegistry ourInstance = new RNPostProcessorRegistry();

  public static RNPostProcessorRegistry getInstance() {
    return ourInstance;
  }

  private RNPostProcessorRegistry() {
    addSingular("ColorMatrixColorFilter", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new RNColorMatrixColorFilterPostProcessor(width, height, config);
      }
    });

    addSingular("Color", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new RNColorPostProcessor(width, height, config);
      }
    });

    addSingular("IterativeBoxBlur", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new RNIterativeBoxBlurPostProcessor(width, height, config);
      }
    });

    addSingular("LightingColorFilter", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new RNLightingColorFilterPostProcessor(width, height, config);
      }
    });

    addSingular("LinearGradient", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new RNLinearGradientPostProcessor(width, height, config);
      }
    });

    addSingular("PorterDuffColorFilter", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new RNPorterDuffColorFilterPostProcessor(width, height, config);
      }
    });

    addSingular("RadialGradient", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new RNRadialGradientPostProcessor(width, height, config);
      }
    });

    addSingular("RoundAsCircle", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new RNRoundAsCirclePostProcessor(width, height, config);
      }
    });

    addSingular("SweepGradient", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new RNSweepGradientPostProcessor(width, height, config);
      }
    });

    addComposition("PorterDuffXfermode", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey
      ) {
        return new RNPorterDuffXfermodePostProcessor(width, height, config, imageRef, imageKey);
      }
    });
  }

  public void addSingular(@Nonnull String name, @Nonnull CreateSingular functor) {
    singulars.put(name, functor);
  }

  public void addComposition(@Nonnull String name, @Nonnull CreateComposition functor) {
    compositions.put(name, functor);
  }

  public @Nullable Postprocessor createSingular(
    @Nullable String name,
    int width,
    int height,
    @Nullable JSONObject config
  ) {
    @Nullable CreateSingular filter = singulars.get(name);

    Assertions.assertCondition(
      filter != null,
      "ImageFilter: Can't find '" + name + "' filter in registry."
    );

    return filter != null ? filter.create(width, height, config) : null;
  }

  public @Nullable Postprocessor createComposition(
    @Nullable String name,
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull CloseableReference<CloseableImage> imageRef,
    @Nonnull CacheKey imageKey
  ) {
    @Nullable CreateComposition filter = compositions.get(name);

    Assertions.assertCondition(
      filter != null,
      "ImageFilter: Can't find '" + name + "' filter in registry."
    );

    return filter != null ? filter.create(width, height, config, imageRef, imageKey) : null;
  }
}
