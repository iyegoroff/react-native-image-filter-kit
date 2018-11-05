package iyegoroff.imagefilterkit;

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
import iyegoroff.imagefilterkit.blend.DifferenceBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.ExclusionBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.HardLightBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.HueBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.LuminosityBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.MultiplyBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.SaturationBlendPostProcessor;
import iyegoroff.imagefilterkit.blend.SoftLightBlendPostProcessor;
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
import iyegoroff.imagefilterkit.blend.ColorDodgeBlendPostProcessor;

public class PostProcessorRegistry {

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

  private final Map<String, CreateSingular> mSingulars = new HashMap<>();
  private final Map<String, CreateComposition> mCompositions = new HashMap<>();

  private static final PostProcessorRegistry sInstance = new PostProcessorRegistry();

  public static PostProcessorRegistry getInstance() {
    return sInstance;
  }

  private PostProcessorRegistry() {
    addSingular("ColorMatrixColorFilter", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new ColorMatrixColorFilterPostProcessor(width, height, config);
      }
    });

    addSingular("Color", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new ColorPostProcessor(width, height, config);
      }
    });

    addSingular("IterativeBoxBlur", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new IterativeBoxBlurPostProcessor(width, height, config);
      }
    });

    addSingular("LightingColorFilter", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new LightingColorFilterPostProcessor(width, height, config);
      }
    });

    addSingular("LinearGradient", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new LinearGradientPostProcessor(width, height, config);
      }
    });

    addSingular("PorterDuffColorFilter", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new PorterDuffColorFilterPostProcessor(width, height, config);
      }
    });

    addSingular("RadialGradient", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new RadialGradientPostProcessor(width, height, config);
      }
    });

    addSingular("RoundAsCircle", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new RoundAsCirclePostProcessor(width, height, config);
      }
    });

    addSingular("SweepGradient", new CreateSingular() {
      @Override
      public Postprocessor create(int width, int height, @Nullable JSONObject config) {
        return new SweepGradientPostProcessor(width, height, config);
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
        return new PorterDuffXfermodePostProcessor(width, height, config, imageRef, imageKey);
      }
    });

    addComposition("ColorDodgeBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey
      ) {
        return new ColorDodgeBlendPostProcessor(width, height, config, imageRef, imageKey);
      }
    });

    addComposition("ExclusionBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey
      ) {
        return new ExclusionBlendPostProcessor(width, height, config, imageRef, imageKey);
      }
    });

    addComposition("ColorBurnBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey
      ) {
        return new ColorBurnBlendPostProcessor(width, height, config, imageRef, imageKey);
      }
    });

    addComposition("SoftLightBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey
      ) {
        return new SoftLightBlendPostProcessor(width, height, config, imageRef, imageKey);
      }
    });

    addComposition("HueBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey
      ) {
        return new HueBlendPostProcessor(width, height, config, imageRef, imageKey);
      }
    });

    addComposition("ColorBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey
      ) {
        return new ColorBlendPostProcessor(width, height, config, imageRef, imageKey);
      }
    });

    addComposition("SaturationBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey
      ) {
        return new SaturationBlendPostProcessor(width, height, config, imageRef, imageKey);
      }
    });

    addComposition("LuminosityBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey
      ) {
        return new LuminosityBlendPostProcessor(width, height, config, imageRef, imageKey);
      }
    });

    addComposition("DifferenceBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey
      ) {
        return new DifferenceBlendPostProcessor(width, height, config, imageRef, imageKey);
      }
    });

    addComposition("HardLightBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey
      ) {
        return new HardLightBlendPostProcessor(width, height, config, imageRef, imageKey);
      }
    });

    addComposition("MultiplyBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey
      ) {
        return new MultiplyBlendPostProcessor(width, height, config, imageRef, imageKey);
      }
    });
  }

  private void addSingular(@Nonnull String name, @Nonnull CreateSingular functor) {
    mSingulars.put(name, functor);
  }

  private void addComposition(@Nonnull String name, @Nonnull CreateComposition functor) {
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
    @Nullable JSONObject config
  ) {
    @Nullable CreateSingular filter = mSingulars.get(name);

    Assertions.assertCondition(
      filter != null,
      "ImageFilterKit: Can't find '" + name + "' filter in registry."
    );

    return filter != null ? filter.create(width, height, config) : null;
  }

  @Nullable
  Postprocessor createComposition(
    @Nullable String name,
    int width,
    int height,
    @Nullable JSONObject config,
    @Nonnull CloseableReference<CloseableImage> imageRef,
    @Nonnull CacheKey imageKey
  ) {
    @Nullable CreateComposition filter = mCompositions.get(name);

    Assertions.assertCondition(
      filter != null,
      "ImageFilterKit: Can't find '" + name + "' filter in registry."
    );

    return filter != null ? filter.create(width, height, config, imageRef, imageKey) : null;
  }
}
