
package iyegoroff.RNImageFilterKit;
import android.content.Context;
import android.graphics.BlurMaskFilter;
import android.util.Log;
import android.view.View;
import android.view.ViewParent;

import com.facebook.imagepipeline.postprocessors.IterativeBoxBlurPostProcessor;
import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.views.image.ReactImageView;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.ArrayList;

import javax.annotation.Nullable;

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
  private BlurMaskFilter.Blur mBlurStyle = BlurMaskFilter.Blur.NORMAL;

  public RNImageFilter(Context context) {
    super(context);
  }

  public void setMatrix(ReadableArray matrix) {
    mMatrix = new float[matrix.size()];

    for (int i = 0; i < mMatrix.length; i++) {
      mMatrix[i] = (float) matrix.getDouble(i);
    }

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

  public void setBlurStyle(BlurMaskFilter.Blur blurStyle) {
    mBlurStyle = blurStyle;

    this.runFilterPipeline();
  }

  @Override
  protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    super.onLayout(changed, left, top, right, bottom);

    Log.i(ReactConstants.TAG, "filter: layout " + String.valueOf(this));

    this.runFilterPipeline();
  }

  private void runFilterPipeline() {
    if ("ColorMatrixColorFilter".equals(mName)) {
      mPostProcessor = new ColorMatrixColorFilterPostProcessor(mMatrix);

    } else if ("BlurMaskFilter".equals(mName)) {
      mPostProcessor = new BlurMaskFilterPostProcessor(mRadius, mBlurStyle);
    }

    if (mPostProcessor != null) {
      this.bottomFilter().renderFilteredImage();
    }
  }

  private void renderFilteredImage() {
    for (int i = 0; i < this.getChildCount(); i++) {
      View child = this.getChildAt(i);

      if (child instanceof ReactImageView) {
        this.filterImage(
                (ReactImageView) child,
                new RNMultiPostProcessor(this.collectPostProcessors()));
        return;
      }
    }
  }

  private void filterImage(ReactImageView image, IterativeBoxBlurPostProcessor postProcessor) {
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

        image.setLayerType(View.LAYER_TYPE_SOFTWARE, null);

        image.maybeUpdateView();

//          Log.i(ReactConstants.TAG, "filter: renderFilteredImage");
      }
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
