package iyegoroff.RNImageFilterKit;

import android.content.Context;
import android.graphics.Shader;
import android.view.View;
import android.view.ViewParent;

import com.facebook.imagepipeline.postprocessors.IterativeBoxBlurPostProcessor;
import com.facebook.imagepipeline.postprocessors.RoundAsCirclePostprocessor;
import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.views.image.ReactImageView;

import java.util.ArrayList;

import javax.annotation.Nullable;
import javax.annotation.Nonnull;

public class RNImageFilter extends RNImageFilterBase {

  private @Nullable Postprocessor mPostProcessor = null;

  public RNImageFilter(Context context) {
    super(context);
  }

  @Override
  protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    super.onLayout(changed, left, top, right, bottom);

    this.runFilterPipeline();
  }

  protected void runFilterPipeline() {
    ReactImageView targetImage = RNImageFilter.targetImage(this.bottomFilter());
    int boundsWidth = targetImage == null ? 0 : targetImage.getMeasuredWidth();
    int boundsHeight = targetImage == null ? 0 : targetImage.getMeasuredHeight();

    if ("ColorMatrixColorFilter".equals(mName)) {
      float[] defaultMatrix = { 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 };
      float[] matrix = RNPropConverter.convertScalarVector(mMatrix, defaultMatrix);

      mPostProcessor = new ColorMatrixColorFilterPostProcessor(matrix);

    } else if ("IterativeBoxBlur".equals(mName)) {
      int iterations = (int) RNPropConverter.convertScalar(mIterations, 3);
      int blurRadius = (int) RNPropConverter.convertScalar(mBlurRadius, 1);

      mPostProcessor = new IterativeBoxBlurPostProcessor(iterations, blurRadius);

    } else if ("RoundAsCircle".equals(mName)) {
      mPostProcessor = new RoundAsCirclePostprocessor();

    } else if ("LightingColorFilter".equals(mName)) {
      int mul = RNPropConverter.convertColor(mMul);
      int add = RNPropConverter.convertColor(mAdd);

      mPostProcessor = new LightingColorFilterPostProcessor(mul, add);

    } else if ("Color".equals(mName)) {
      if (targetImage != null) {
        int color = RNPropConverter.convertColor(mColor);

        mPostProcessor = new ColorPostProcessor(boundsWidth, boundsHeight, color);
      }

    } else if ("LinearGradient".equals(mName)) {
      if (targetImage != null) {
        int[] defaultColors = {};
        float[] defaultLocations = {};

        mPostProcessor = new LinearGradientPostProcessor(
          boundsWidth,
          boundsHeight,
          (int) RNPropConverter.convertDistance(mX0, "0", boundsWidth, boundsHeight),
          (int) RNPropConverter.convertDistance(mY0, "0", boundsWidth, boundsHeight),
          (int) RNPropConverter.convertDistance(mX1, "100w", boundsWidth, boundsHeight),
          (int) RNPropConverter.convertDistance(mY1, "0", boundsWidth, boundsHeight),
          RNPropConverter.convertColorVector(mColors, defaultColors),
          RNPropConverter.convertScalarVector(mLocations, defaultLocations),
          RNPropConverter.convertEnumeration(mTileMode, Shader.TileMode.CLAMP, Shader.TileMode.class)
        );
      }

    } else if ("RadialGradient".equals(mName)) {
      if (targetImage != null) {
        int[] defaultColors = {};
        float[] defaultStops = {};

        mPostProcessor = new RadialGradientPostProcessor(
          boundsWidth,
          boundsHeight,
          (int) RNPropConverter.convertDistance(mCenterX, "50w", boundsWidth, boundsHeight),
          (int) RNPropConverter.convertDistance(mCenterY, "50h", boundsWidth, boundsHeight),
          (int) RNPropConverter.convertDistance(mRadius, "50min", boundsWidth, boundsHeight),
          RNPropConverter.convertColorVector(mColors, defaultColors),
          RNPropConverter.convertScalarVector(mStops, defaultStops),
          RNPropConverter.convertEnumeration(mTileMode, Shader.TileMode.CLAMP, Shader.TileMode.class)
        );
      }

    } else if ("SweepGradient".equals(mName)) {
      if (targetImage != null) {
        int[] defaultColors = {};
        float[] defaultPositions = {};

        mPostProcessor = new SweepGradientPostProcessor(
          boundsWidth,
          boundsHeight,
          (int) RNPropConverter.convertDistance(mCenterX, "50w", boundsWidth, boundsHeight),
          (int) RNPropConverter.convertDistance(mCenterY, "50h", boundsWidth, boundsHeight),
          RNPropConverter.convertColorVector(mColors, defaultColors),
          RNPropConverter.convertScalarVector(mLocations, defaultPositions)
        );
      }
    }

    if (mPostProcessor != null) {
      RNImageFilter.renderFilteredImage(this.bottomFilter());
    }
  }

  private RNImageFilter bottomFilter() {
    for (int i = 0; i < this.getChildCount(); i++) {
      View child = this.getChildAt(i);

      if (child instanceof RNImageFilter) {
        return ((RNImageFilter) child).bottomFilter();
      }
    }

    return this;
  }

  private static @Nullable ReactImageView targetImage(@Nonnull RNImageFilter bottomFilter) {
    for (int i = 0; i < bottomFilter.getChildCount(); i++) {
      View child = bottomFilter.getChildAt(i);

      if (child instanceof ReactImageView) {
        return (ReactImageView) child;
      }
    }

    return null;
  }

  private static void renderFilteredImage(RNImageFilter bottomFilter) {
    ReactImageView image = RNImageFilter.targetImage(bottomFilter);

    if (image != null) {
      RNImageFilter.filterImage(
        image,
        new RNMultiPostProcessor(bottomFilter.collectPostProcessors())
      );
    }
  }

  private static void filterImage(
    ReactImageView image,
    IterativeBoxBlurPostProcessor postProcessor
  ) {
    if (postProcessor != null) {
      IterativeBoxBlurPostProcessor processor = RNReflectUtils.getFieldValue(
        ReactImageView.class,
        image,
        "mIterativeBoxBlurPostProcessor"
      );

      if (processor == null
        || processor.getPostprocessorCacheKey() != postProcessor.getPostprocessorCacheKey()
      ) {

        RNReflectUtils.setFieldValue(
          ReactImageView.class,
          image,
          "mIterativeBoxBlurPostProcessor",
          postProcessor
        );

        RNReflectUtils.setFieldValue(ReactImageView.class, image, "mIsDirty", true);

        image.maybeUpdateView();
      }
    }
  }

  private ArrayList<Postprocessor> collectPostProcessors(ArrayList<Postprocessor> list) {
    if (mPostProcessor != null) {
      list.add(mPostProcessor);
    }

    ViewParent parent = this.getParent();

    return parent instanceof RNImageFilter
      ? ((RNImageFilter) parent).collectPostProcessors(list)
      : list;
  }

  private ArrayList<Postprocessor> collectPostProcessors() {
    return this.collectPostProcessors(new ArrayList<Postprocessor>());
  }
}
