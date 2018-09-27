package iyegoroff.RNImageFilterKit;

import android.content.Context;
import android.graphics.Shader;
import android.util.Log;
import android.view.View;
import android.view.ViewParent;

import com.facebook.imagepipeline.postprocessors.IterativeBoxBlurPostProcessor;
import com.facebook.imagepipeline.postprocessors.RoundAsCirclePostprocessor;
import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.views.image.ReactImageView;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.ArrayList;

import javax.annotation.Nullable;
import javax.annotation.Nonnull;

public class RNImageFilter extends ReactViewGroup {

  private @Nullable Postprocessor mPostProcessor = null;
  private @Nullable String mName = null;
  private float[] mMatrix = {
          1, 0, 0, 0, 0,
          0, 1, 0, 0, 0,
          0, 0, 1, 0, 0,
          0, 0, 0, 1, 0,
  };
  private float mRadius = 0;
  private int mBlurRadius = 1;
  private int mIterations = 3;
  private int mMul = 0;
  private int mAdd = 0;
  private int mColor = 0;
  private int mX0 = 0;
  private int mY0 = 0;
  private int mX1 = 1;
  private int mY1 = 0;
  private int[] mColors = {};
  private float[] mLocations = {};
  private Shader.TileMode mTile = Shader.TileMode.CLAMP;

  public RNImageFilter(Context context) {
    super(context);
  }

  public void setMatrix(float[] matrix) {
    mMatrix = matrix;

    this.runFilterPipeline();
  }

  public void setName(String name) {
    mName = name;

    this.runFilterPipeline();
  }

  public void setRadius(float radius) {
    mRadius = radius;

    this.runFilterPipeline();
  }

  public void setBlurRadius(int blurRadius) {
    mBlurRadius = blurRadius;

    this.runFilterPipeline();
  }

  public void setIterations(int iterations) {
    mIterations = iterations;

    this.runFilterPipeline();
  }

  public void setMul(int mul) {
    mMul = mul;

    this.runFilterPipeline();
  }

  public void setAdd(int add) {
    mAdd = add;

    this.runFilterPipeline();
  }

  public void setColor(int color) {
    mColor = color;

    this.runFilterPipeline();
  }

  public void setX0(int x0) {
    mX0 = x0;

    this.runFilterPipeline();
  }

  public void setY0(int y0) {
    mY0 = y0;

    this.runFilterPipeline();
  }

  public void setX1(int x1) {
    mX1 = x1;

    this.runFilterPipeline();
  }

  public void setY1(int y1) {
    mY1 = y1;

    this.runFilterPipeline();
  }

  public void setColors(int[] colors) {
    mColors = colors;

    this.runFilterPipeline();
  }

  public void setLocations(float[] locations) {
    mLocations = locations;

    this.runFilterPipeline();
  }

  public void setTile(Shader.TileMode tile) {
    mTile = tile;

    this.runFilterPipeline();
  }

  @Override
  protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    super.onLayout(changed, left, top, right, bottom);

    this.runFilterPipeline();
  }

  private void runFilterPipeline() {
    ReactImageView targetImage = RNImageFilter.targetImage(this.bottomFilter());

    if ("ColorMatrixColorFilter".equals(mName)) {
      mPostProcessor = new ColorMatrixColorFilterPostProcessor(mMatrix);

    } else if ("IterativeBoxBlur".equals(mName)) {
      mPostProcessor = new IterativeBoxBlurPostProcessor(mIterations, mBlurRadius);

    } else if ("RoundAsCircle".equals(mName)) {
      mPostProcessor = new RoundAsCirclePostprocessor();

    } else if ("LightingColorFilter".equals(mName)) {
      mPostProcessor = new LightingColorFilterPostProcessor(mMul, mAdd);

    } else if ("Color".equals(mName)) {
      if (targetImage != null) {
        mPostProcessor = new ColorPostProcessor(
                targetImage.getMeasuredWidth(),
                targetImage.getMeasuredHeight(),
                mColor);
      }

    } else if ("LinearGradient".equals(mName)) {
      if (targetImage != null) {
        mPostProcessor = new LinearGradientPostProcessor(
                targetImage.getMeasuredWidth(),
                targetImage.getMeasuredHeight(),
                mX0,
                mY0,
                mX1,
                mY1,
                mColors,
                mLocations,
                mTile);
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
              new RNMultiPostProcessor(bottomFilter.collectPostProcessors()));
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
              "mIterativeBoxBlurPostProcessor");

      if (processor == null ||
              processor.getPostprocessorCacheKey() != postProcessor.getPostprocessorCacheKey()) {

        RNReflectUtils.setFieldValue(
                ReactImageView.class,
                image,
                "mIterativeBoxBlurPostProcessor",
                postProcessor);

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
