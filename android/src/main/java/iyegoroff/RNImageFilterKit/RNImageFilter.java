package iyegoroff.RNImageFilterKit;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.PorterDuff;
import android.graphics.Shader;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Handler;
import android.util.Log;
import android.util.Pair;
import android.view.View;
import android.view.ViewParent;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.executors.CallerThreadExecutor;
import com.facebook.common.internal.Supplier;
import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.BaseDataSubscriber;
import com.facebook.datasource.DataSource;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.drawee.backends.pipeline.PipelineDraweeController;
import com.facebook.drawee.controller.ControllerListener;
import com.facebook.imagepipeline.core.ImagePipelineFactory;
import com.facebook.imagepipeline.datasource.BaseBitmapDataSubscriber;
import com.facebook.imagepipeline.image.CloseableBitmap;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.image.ImageInfo;
import com.facebook.imagepipeline.postprocessors.IterativeBoxBlurPostProcessor;
import com.facebook.imagepipeline.postprocessors.RoundAsCirclePostprocessor;
import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.views.image.ReactImageView;

import java.util.ArrayList;

import javax.annotation.Nullable;

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
    ReactImageView targetImage = this.targetImage();
    int boundsWidth = targetImage == null ? 0 : targetImage.getMeasuredWidth();
    int boundsHeight = targetImage == null ? 0 : targetImage.getMeasuredHeight();

    if ("ColorMatrixColorFilter".equals(mName)) {
      float[] defaultMatrix = { 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 };

      mPostProcessor = new ColorMatrixColorFilterPostProcessor(
        RNPropConverter.convertScalarVector(mMatrix, defaultMatrix)
      );

    } else if ("IterativeBoxBlur".equals(mName)) {
      mPostProcessor = new IterativeBoxBlurPostProcessor(
        (int) RNPropConverter.convertScalar(mIterations, 3),
        (int) RNPropConverter.convertScalar(mBlurRadius, 1)
      );

    } else if ("RoundAsCircle".equals(mName)) {
      mPostProcessor = new RoundAsCirclePostprocessor();

    } else if ("LightingColorFilter".equals(mName)) {
      mPostProcessor = new LightingColorFilterPostProcessor(
        RNPropConverter.convertColor(mMul),
        RNPropConverter.convertColor(mAdd)
      );

    } else if ("Color".equals(mName)) {
      if (targetImage != null) {
        mPostProcessor = new ColorPostProcessor(
          boundsWidth,
          boundsHeight,
          RNPropConverter.convertColor(mColor)
        );
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

    } else if ("PorterDuffColorFilter".equals(mName)) {
      mPostProcessor = new PorterDuffColorFilterPostProcessor(
        RNPropConverter.convertColor(mColor),
        RNPropConverter.convertEnumeration(mMode, PorterDuff.Mode.ADD, PorterDuff.Mode.class)
      );

    } else if ("PorterDuffXfermode".equals(mName)) {
      ReactImageView destination = this.targetImage(1);
      final CacheKey bitmapKey = destination != null && destination.getController() != null
        ? RNReflectUtils.<CacheKey>getFieldValue(destination.getController(), "mCacheKey")
        : null;


      if (destination != null && destination.getController() != null) {
        Supplier<DataSource<CloseableReference<CloseableImage>>> ds = RNReflectUtils
          .invokeMethod(destination.getController(), "getDataSourceSupplier");
        if (ds != null) {
          final RNImageFilter self = this;

          ds.get().subscribe(new BaseDataSubscriber<CloseableReference<CloseableImage>>() {

            @Override
            protected void onNewResultImpl(
              DataSource<CloseableReference<CloseableImage>> dataSource
            ) {
              if (dataSource.isFinished()) {
                Log.d(ReactConstants.TAG, "PORTER " + String.valueOf(dataSource.getResult() != null) + " " + String.valueOf(bitmapKey != null));
                if (dataSource.getResult() != null && bitmapKey != null) {
                  self.mPostProcessor = new PorterDuffXfermodePostProcessor(
                    RNPropConverter.convertEnumeration(
                      mMode,
                      PorterDuff.Mode.ADD,
                      PorterDuff.Mode.class
                    ),
                    dataSource.getResult(),
                    bitmapKey
                  );

                  self.renderFilteredImage();
                }
              }
            }

            @Override
            protected void onFailureImpl(DataSource<CloseableReference<CloseableImage>> dataSource) {
//              Throwable t = dataSource.getFailureCause();
              // handle failure
            }
          }, CallerThreadExecutor.getInstance());

//          ds.get().subscribe(new BaseBitmapDataSubscriber() {
//
//            @Override
//            public void onNewResultImpl(@Nullable Bitmap bitmap) {
//              Log.d(ReactConstants.TAG, "PORTER " + String.valueOf(bitmap != null) + " " + String.valueOf(bitmapKey != null));

//            }
//
//            @Override
//            public void onFailureImpl(DataSource dataSource) {
//              // No cleanup required here.
//            }
//
//          }, CallerThreadExecutor.getInstance());
        }
      }
    }

    if (mPostProcessor != null) {
      this.renderFilteredImage();
    }
  }

  private RNImageFilter bottomFilter(int start) {
    for (int i = start; i < this.getChildCount(); i++) {
      View child = this.getChildAt(i);

      if (child instanceof RNImageFilter) {
        return ((RNImageFilter) child).bottomFilter();
      }
    }

    return this;
  }

  private RNImageFilter bottomFilter() {
    return this.bottomFilter(0);
  }

  private @Nullable ReactImageView targetImage(int start) {
    RNImageFilter bottomFilter = this.bottomFilter(start);

    Log.d(ReactConstants.TAG, "PORTER " + String.valueOf((bottomFilter == this ? start : 0)));

    for (int i = (bottomFilter == this ? start : 0); i < bottomFilter.getChildCount(); i++) {
      View child = bottomFilter.getChildAt(i);

      if (child instanceof ReactImageView) {
        return (ReactImageView) child;
      }
    }

    Log.d(ReactConstants.TAG, "PORTER SHIT");

    return null;
  }

  private @Nullable ReactImageView targetImage() {
    return this.targetImage(0);
  }

  private void renderFilteredImage() {
    RNImageFilter bottomFilter = this.bottomFilter();
    ReactImageView image = this.targetImage();

    Log.d(ReactConstants.TAG, "PORTER " + String.valueOf(mPostProcessor));

    if (image != null) {
      Pair<ArrayList<Postprocessor>, ViewParent> pair = bottomFilter.collectPostProcessors();

      RNImageFilter.filterImage(
        image,
        pair.second,
        new RNMultiPostProcessor(pair.first)
      );
    }
  }

//  private static Pair<Bitmap, CacheKey> extractBitmap(ReactImageView image) {
//
//  }

  private static void filterImage(
    ReactImageView image,
    final ViewParent topParent,
    IterativeBoxBlurPostProcessor postProcessor
  ) {
    if (postProcessor != null) {
      IterativeBoxBlurPostProcessor processor = RNReflectUtils.getFieldValue(
        image,
        "mIterativeBoxBlurPostProcessor"
      );

      if (processor == null
        || processor.getPostprocessorCacheKey() != postProcessor.getPostprocessorCacheKey()
      ) {

        RNReflectUtils.setFieldValue(image, "mIterativeBoxBlurPostProcessor", postProcessor);

//        final ControllerListener<ImageInfo> listener = RNReflectUtils.getFieldValue(
//          image,
//          "mControllerListener"
//        );
//
//        if (!(listener instanceof RNFrescoControllerListener)) {
//          RNReflectUtils.setFieldValue(
//            image,
//            "mControllerListener",
//            new RNFrescoControllerListener(
//              listener,
//              new RNImageUpdatedFunctor() {
//                public void call() {
//                  Log.d(ReactConstants.TAG, "PORTER upd image");
//                  if (topParent instanceof RNImageFilter) {
//                    Log.d(ReactConstants.TAG, "PORTER udpate image");
//                    ((RNImageFilter) topParent).runFilterPipeline();
//                  }
//                }
//              }
//            )
//          );
//        }

        RNReflectUtils.setFieldValue(image, "mIsDirty", true);

        Log.d(ReactConstants.TAG, "PORTER udpate");

        image.maybeUpdateView();
      }
    }
  }

  private Pair<ArrayList<Postprocessor>, ViewParent> collectPostProcessors(
    ArrayList<Postprocessor> list
  ) {
    if (mPostProcessor != null) {
      list.add(mPostProcessor);
    }

    ViewParent parent = this.getParent();

    return parent instanceof RNImageFilter && ((RNImageFilter) parent).getChildAt(0) == this
      ? ((RNImageFilter) parent).collectPostProcessors(list)
      : new Pair<>(list, parent);
  }

  private Pair<ArrayList<Postprocessor>, ViewParent> collectPostProcessors() {
    return this.collectPostProcessors(new ArrayList<Postprocessor>());
  }
}
