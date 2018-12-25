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

public class PostProcessorRegistry {

  public class CreateSingular {

    public Postprocessor create(
      int width,
      int height,
      @Nullable JSONObject config,
      @Nonnull Context context
    ) {
      throw new RuntimeException("Stub!");
    }
  }

  public class CreateComposition {

    public Postprocessor create(
      int width,
      int height,
      @Nullable JSONObject config,
      @Nonnull CloseableReference<CloseableImage> imageRef,
      @Nonnull CacheKey imageKey,
      @Nonnull Context context
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
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new ColorMatrixColorFilterPostProcessor(width, height, config);
      }
    });

    addSingular("Color", new CreateSingular() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new ColorPostProcessor(width, height, config);
      }
    });

    addSingular("IterativeBoxBlur", new CreateSingular() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new IterativeBoxBlurPostProcessor(width, height, config);
      }
    });

    addSingular("LightingColorFilter", new CreateSingular() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new LightingColorFilterPostProcessor(width, height, config);
      }
    });

    addSingular("LinearGradient", new CreateSingular() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new LinearGradientPostProcessor(width, height, config);
      }
    });

    addSingular("PorterDuffColorFilter", new CreateSingular() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new PorterDuffColorFilterPostProcessor(width, height, config);
      }
    });

    addSingular("RadialGradient", new CreateSingular() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new RadialGradientPostProcessor(width, height, config);
      }
    });

    addSingular("RoundAsCircle", new CreateSingular() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new RoundAsCirclePostProcessor(width, height, config);
      }
    });

    addSingular("SweepGradient", new CreateSingular() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new SweepGradientPostProcessor(width, height, config);
      }
    });

    addSingular("ScriptIntrinsicBlur", new CreateSingular() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new ScriptIntrinsicBlurPostProcessor(width, height, config, context);
      }
    });

    addSingular("ScriptIntrinsicConvolve3x3", new CreateSingular() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new ScriptIntrinsicConvolve3x3PostProcessor(width, height, config, context);
      }
    });

    addSingular("ScriptIntrinsicConvolve5x5", new CreateSingular() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new ScriptIntrinsicConvolve5x5PostProcessor(width, height, config, context);
      }
    });

    addSingular("TextImage", new CreateSingular() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new TextImagePostProcessor(width, height, config, context);
      }
    });

    addComposition("PorterDuffXfermode", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
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
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new ColorDodgeBlendPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("ExclusionBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new ExclusionBlendPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("ColorBurnBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new ColorBurnBlendPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("SoftLightBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new SoftLightBlendPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("HueBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new HueBlendPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("ColorBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new ColorBlendPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("SaturationBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new SaturationBlendPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("LuminosityBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new LuminosityBlendPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("DifferenceBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new DifferenceBlendPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("HardLightBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new HardLightBlendPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("MultiplyBlend", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new MultiplyBlendPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("DestinationATopCompositing", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new DestinationATopCompositingPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("SourceOutCompositing", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new SourceOutCompositingPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("DestinationInCompositing", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new DestinationInCompositingPostProcessor(width, height, config, imageRef, imageKey, context);
      }
    });

    addComposition("SourceInCompositing", new CreateComposition() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull CloseableReference<CloseableImage> imageRef,
        @Nonnull CacheKey imageKey,
        @Nonnull Context context
      ) {
        return new SourceInCompositingPostProcessor(width, height, config, imageRef, imageKey, context);
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
