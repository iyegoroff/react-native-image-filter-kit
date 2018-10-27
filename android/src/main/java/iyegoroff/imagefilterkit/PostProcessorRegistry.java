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

  private final Map<String, CreateSingular> singulars = new HashMap<>();
  private final Map<String, CreateComposition> compositions = new HashMap<>();

  private static final PostProcessorRegistry ourInstance = new PostProcessorRegistry();

  public static PostProcessorRegistry getInstance() {
    return ourInstance;
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
      "ImageFilterKit: Can't find '" + name + "' filter in registry."
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
      "ImageFilterKit: Can't find '" + name + "' filter in registry."
    );

    return filter != null ? filter.create(width, height, config, imageRef, imageKey) : null;
  }
}
