
package iyegoroff.RNImageFilterKit;
import android.content.Context;
import android.util.Log;
import android.view.View;

import com.facebook.drawee.drawable.ScalingUtils;
import com.facebook.imagepipeline.request.BasePostprocessor;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.views.view.ReactViewGroup;
import com.facebook.react.views.image.ReactImageView;

public class RNImageFilter extends ReactViewGroup {

//  private BasePostprocessor postprocessor = new FastGreyScalePostprocessor();

  public RNImageFilter(Context context) {
    super(context);
  }

//  @Override
//  protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
//    super.onLayout(changed, left, top, right, bottom);
//    Log.i(ReactConstants.TAG, "filter: layout");
//
//    for (int i = 0; i < this.getChildCount(); i++) {
//      View child = this.getChildAt(i);
//
//      if (child instanceof ReactImageView) {
//        Log.i(ReactConstants.TAG, "filter: image");
//        ReactImageView image = (ReactImageView) child;
//
//        BasePostprocessor iter = RNReflectUtils.getFieldValue(
//                ReactImageView.class,
//                image,
//                "mIterativeBoxBlurPostProcessor");
//
//        BasePostprocessor round = RNReflectUtils.getFieldValue(
//                ReactImageView.class,
//                image,
//                "mRoundedCornerPostprocessor");
//
//        ScalingUtils.ScaleType scaleType = RNReflectUtils.getFieldValue(
//                ReactImageView.class,
//                image,
//                "mScaleType");
//
//        boolean usePostprocessorScaling =
//                scaleType != ScalingUtils.ScaleType.CENTER_CROP &&
//                scaleType != ScalingUtils.ScaleType.FOCUS_CROP;
//
//        if (usePostprocessorScaling && !(round instanceof RNCombinePostProcessors)) {
//          Log.i(ReactConstants.TAG, "filter: r1 ");
//          round = new RNCombinePostProcessors.Builder()
//                  .add(round)
//                  .add(this.postprocessor)
//                  .build();
//          Log.i(ReactConstants.TAG, "filter: round " + String.valueOf(round));
//
//        } else if (iter != null && !(iter instanceof RNCombinePostProcessors)) {
//          Log.i(ReactConstants.TAG, "filter: i1 ");
//          iter = new RNCombinePostProcessors.Builder()
//                  .add(iter)
//                  .add(this.postprocessor)
//                  .build();
//
//        } else {
//          Log.i(ReactConstants.TAG, "filter: r2 ");
//          iter = new RNCombinePostProcessors.Builder()
//                  .add(this.postprocessor)
//                  .build();
//        }
//
//        RNReflectUtils.setFieldValue(
//                ReactImageView.class,
//                image,
//                "mIterativeBoxBlurPostProcessor",
//                iter);
//
//
//        RNReflectUtils.setFieldValue(
//                ReactImageView.class,
//                image,
//                "mRoundedCornerPostprocessor",
//                round);
//
//        iter = RNReflectUtils.getFieldValue(
//                ReactImageView.class,
//                image,
//                "mIterativeBoxBlurPostProcessor");
//
//        round = RNReflectUtils.getFieldValue(
//                ReactImageView.class,
//                image,
//                "mRoundedCornerPostprocessor");
//
//        Log.i(ReactConstants.TAG, "filter: iter " + String.valueOf(iter));
//        Log.i(ReactConstants.TAG, "filter: round " + String.valueOf(round));
//
//        image.maybeUpdateView();
//      }
//    }
//  }


//  private float[] mMatrix = {
//    1, 0, 0, 0, 0,
//    0, 1, 0, 0, 0,
//    0, 0, 1, 0, 0,
//    0, 0, 0, 1, 0
//  };
//
//  public RNImageFilter(Context context) {
//    super(context);
//  }
//
//  public void setMatrix(ReadableArray matrix) {
//    mMatrix = new float[matrix.size()];
//
//    for (int i = 0; i < mMatrix.length; i++) {
//      mMatrix[i] = (float) matrix.getDouble(i);
//    }
//
//    invalidate();
//
//    // invalidateAllImageMatrixFilterChildren(this);
//  }
//
//  @Override
//  public void draw(Canvas canvas) {
//    useColorFilterOnAllChildren(
//      this,
//      new ColorMatrixColorFilter(new ColorMatrix(mMatrix))
//      // new ColorMatrixColorFilter(calculateColorMatrix(this, new ColorMatrix(mMatrix)))
//    );
//
//    super.draw(canvas);
//  }
//
//  // private ColorMatrix calculateColorMatrix(ViewGroup target, ColorMatrix currentMatrix) {
//  //   ViewParent parent = target.getParent();
//
//  //   if (parent instanceof ViewGroup) {
//  //     if (parent instanceof RNImageMatrixFilterView) {
//  //       currentMatrix.postConcat(new ColorMatrix(((RNImageMatrixFilterView) parent).mMatrix));
//  //     }
//
//  //     return calculateColorMatrix((ViewGroup) parent, currentMatrix);
//  //   }
//
//  //   // Log.v(ReactConstants.TAG, Arrays.toString(currentMatrix.getArray()));
//
//  //   return currentMatrix;
//  // }
//
//  private void useColorFilterOnAllChildren(ViewGroup parent, ColorMatrixColorFilter filter) {
//    for (int i = 0; i < parent.getChildCount(); i++) {
//      View child = parent.getChildAt(i);
//
//      if (child instanceof ImageView) {
//        ((ImageView) child).setColorFilter(filter);
//
//      } else if (child instanceof RNImageFilter) {
//        return;
//
//      } else if (child instanceof ViewGroup) {
//        useColorFilterOnAllChildren((ViewGroup) child, filter);
//      }
//    }
//  }
//
//  private void invalidateAllImageMatrixFilterChildren(ViewGroup parent) {
//    for (int i = 0; i < parent.getChildCount(); i++) {
//      View child = parent.getChildAt(i);
//
//      if (child instanceof RNImageFilter) {
//        ((RNImageFilter) child).invalidate();
//      }
//
//      if (child instanceof ViewGroup) {
//        invalidateAllImageMatrixFilterChildren((ViewGroup) child);
//      }
//    }
//  }
}
