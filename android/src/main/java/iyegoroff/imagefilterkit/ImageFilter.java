package iyegoroff.imagefilterkit;

import android.content.Context;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.executors.UiThreadImmediateExecutorService;
import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.BaseDataSubscriber;
import com.facebook.datasource.DataSource;
import com.facebook.drawee.controller.ControllerListener;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.image.ImageInfo;
import com.facebook.imagepipeline.postprocessors.IterativeBoxBlurPostProcessor;
import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.infer.annotation.Assertions;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.views.image.ReactImageView;
import com.facebook.react.views.view.ReactViewGroup;

import org.jdeferred2.Deferred;
import org.jdeferred2.DoneCallback;
import org.jdeferred2.DoneFilter;
import org.jdeferred2.DonePipe;
import org.jdeferred2.FailCallback;
import org.jdeferred2.Promise;
import org.jdeferred2.android.AndroidDeferredManager;
import org.jdeferred2.impl.DeferredObject;
import org.jdeferred2.multiple.MasterProgress;
import org.jdeferred2.multiple.MultipleResults2;
import org.jdeferred2.multiple.OneReject;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import bolts.Continuation;
import bolts.Task;
import bolts.TaskCompletionSource;
import iyegoroff.imagefilterkit.utility.CacheablePostProcessor;
import iyegoroff.imagefilterkit.utility.DummyPostProcessor;
import iyegoroff.imagefilterkit.utility.MultiPostProcessor;

public class ImageFilter extends ReactViewGroup {

  private @Nullable JSONObject mConfig = null;
  private boolean mIsReady = false;
  private int mDefaultWidth = 0;
  private int mDefaultHeight = 0;
  private final @Nonnull Map<ReactImageView, FrescoControllerListener> mImageListeners =
    new HashMap<>();

  public void setConfig(@Nullable String config) {
    try {
      mConfig = new JSONObject(config);
    } catch (JSONException exc) {
      Assertions.assertCondition(
        false,
        "ImageFilterKit: Bad config - " + exc.getMessage()
      );
    }

    this.reset();

    this.runFilterPipeline();
  }

  public ImageFilter(Context context) {
    super(context);
  }

  @Override
  protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    super.onLayout(changed, left, top, right, bottom);

    this.reset();

    this.runFilterPipeline();
  }

  private static Task<FilterableImage> createSingularImage(
    final @Nonnull JSONObject config,
    final @Nonnull Task<FilterableImage> prevImage,
    final int defaultWidth,
    final int defaultHeight
  ) throws JSONException {
//    final long start = System.currentTimeMillis();
    final String name = config.getString("name");

    return prevImage
      .onSuccess(new Continuation<FilterableImage, FilterableImage>() {
        @Override
        public FilterableImage then(Task<FilterableImage> task) throws Exception {
          FilterableImage result = task.getResult();
          int measuredWidth = result.getImage().getMeasuredWidth();
          int measuredHeight = result.getImage().getMeasuredHeight();
          int width = measuredWidth == 0 ? defaultWidth : measuredWidth;
          int height = measuredHeight == 0 ? defaultHeight : measuredHeight;

          ArrayList<Postprocessor> postProcessors = new ArrayList<>(result.getPostProcessors());
          postProcessors.add(
            PostProcessorRegistry.getInstance().createSingular(name, width, height, config)
          );

//          Log.d(ReactConstants.TAG, "ImageFilterKit: sing start->parse " + name + " " + String.valueOf(System.currentTimeMillis() - start));

          boolean cacheDisabled = CacheablePostProcessor.cacheDisabled(config);

          return new FilterableImage(result.getImage(), postProcessors, cacheDisabled);
        }
      });
  }

  private static Task<FilterableImage> createImageComposition(
    final @Nonnull JSONObject config,
    final @Nonnull Task<List<FilterableImage>> prevImage,
    final @Nonnull Map<ReactImageView, FrescoControllerListener> imageListeners,
    final int defaultWidth,
    final int defaultHeight
  ) throws JSONException {
    final String name = config.getString("name");

    return prevImage
      .then(new DonePipe<
        MultipleResults2<FilterableImage, FilterableImage>,
        FilterableImage,
        OneReject<Object>,
        MasterProgress
      >() {
        @Override
        public Promise<FilterableImage, OneReject<Object>, MasterProgress> pipeDone(
          final MultipleResults2<FilterableImage, FilterableImage> result
        ) {
          final Deferred<FilterableImage, OneReject<Object>, MasterProgress> deferred =
            new DeferredObject<>();
          final FilterableImage dst = result.getFirst().getValue();
          final FilterableImage src = result.getSecond().getValue();
          final boolean cacheDisabled = CacheablePostProcessor.cacheDisabled(config);

          ImageFilter.filterImage(src, imageListeners.get(src.getImage()))
            .then(new DoneCallback<ReactImageView>() {
              @Override
              public void onDone(final ReactImageView result) {
                if (result != null && result.getController() != null) {
                  int measuredWidth = result.getMeasuredWidth();
                  int measuredHeight = result.getMeasuredHeight();
                  final int width = measuredWidth == 0 ? defaultWidth : measuredWidth;
                  final int height = measuredHeight == 0 ? defaultHeight : measuredHeight;

                  final CacheKey bitmapKey = ReactImageViewUtils.getCacheKey(result);
                  DataSource<CloseableReference<CloseableImage>> ds = ReactImageViewUtils
                    .getDataSource(result);

                  if (ds != null && bitmapKey != null) {
                    ds.subscribe(new BaseDataSubscriber<CloseableReference<CloseableImage>>() {
                      @Override
                      protected void onNewResultImpl(
                        DataSource<CloseableReference<CloseableImage>> dataSource
                      ) {
                        if (dataSource.isFinished()) {
                          CloseableReference<CloseableImage> ref = dataSource.getResult();
                          if (ref != null) {
                            ArrayList<Postprocessor> postProcessors =
                              new ArrayList<>(dst.getPostProcessors());

                            try {
                              postProcessors.add(
                                PostProcessorRegistry.getInstance().createComposition(
                                  name,
                                  width,
                                  height,
                                  config,
                                  ref,
                                  bitmapKey
                                )
                              );

                            } finally {
                              CloseableReference.closeSafely(ref);
                            }

                            deferred.resolve(
                              new FilterableImage(dst.getImage(), postProcessors, cacheDisabled)
                            );

                          } else {
                            deferred.fail(new FailCallback<OneReject<Object>>() {
                              @Override
                              public void onFail(OneReject<Object> result) {
                                Assertions.assertCondition(
                                  false,
                                  "ImageFilterKit: " + result.toString()
                                );
                              }
                            });
                          }
                        }
                      }

                      @Override
                      protected void onFailureImpl(
                        DataSource<CloseableReference<CloseableImage>> dataSource
                      ) {
                        Throwable t = dataSource.getFailureCause();

                        if (t != null) {
                          Log.w(ReactConstants.TAG, "ImageFilterKit: " + t.getMessage());
                        }
                      }
                    }, UiThreadImmediateExecutorService.getInstance());
                  }
                }
              }
            });

          return deferred.promise();
        }
      });
  }


  private static Task<FilterableImage> parseConfig(
    final @Nonnull Object config,
    final @Nonnull ArrayList<ReactImageView> images,
    final @Nonnull Map<ReactImageView, FrescoControllerListener> imageListeners,
    final int defaultWidth,
    final int defaultHeight
  ) throws JSONException {
    if (config instanceof Integer) {
      return Task.forResult(
        new FilterableImage(
          images.get((int) config),
          new ArrayList<Postprocessor>(),
          false
        )
      );
    }

    final JSONObject jsonConfig = JSONObject.class.cast(config);
    final String name = jsonConfig.getString("name");

    if ("PorterDuffXfermode".equals(name)) {
      return createImageComposition(
        jsonConfig,
        (new AndroidDeferredManager()).when(
          ImageFilter.parseConfig(
            jsonConfig.getJSONObject("dstImage").get("image"),
            images,
            imageListeners,
            defaultWidth,
            defaultHeight
          ),
          ImageFilter.parseConfig(
            jsonConfig.getJSONObject("srcImage").get("image"),
            images,
            imageListeners,
            defaultWidth,
            defaultHeight
          )
        ),
        imageListeners,
        defaultWidth,
        defaultHeight
      );

    } else {
      return createSingularImage(
        jsonConfig,
        ImageFilter.parseConfig(
          jsonConfig.getJSONObject("image").get("image"),
          images,
          imageListeners,
          defaultWidth,
          defaultHeight
        ),
        defaultWidth,
        defaultHeight
      );
    }
  }

  private @Nonnull ArrayList<ReactImageView> images() {
    ArrayList<ReactImageView> images = new ArrayList<>();

    for (int i = 0; i < this.getChildCount(); i++) {
      View child = this.getChildAt(i);

      while (!(child instanceof ReactImageView) && (child instanceof ViewGroup)) {
        child = ((ViewGroup) child).getChildAt(0);
      }

      if (child instanceof ReactImageView) {
        images.add((ReactImageView) child);
      } else {
        return new ArrayList<>();
      }
    }

    return images;
  }

  private void reset() {
    final ImageFilter self = this;
    List<ReactImageView> images = this.images();

    mImageListeners.clear();

    for (final ReactImageView image : images) {
      final ControllerListener<ImageInfo> prevListener = ReactImageViewUtils
        .getControllerListener(image);

      if (mDefaultWidth == 0 && mDefaultHeight == 0) {
        mDefaultWidth = image.getMeasuredWidth();
        mDefaultHeight = image.getMeasuredHeight();
      }

      FrescoControllerListener nextListener = new FrescoControllerListener(
        FrescoControllerListener.originalListener(prevListener),
        new Functor() {
          public void call() {
            self.runFilterPipeline();
          }
        }
      );

      mImageListeners.put(image, nextListener);

      ReactImageViewUtils.setControllerListener(image, nextListener);
    }
  }

  private void runFilterPipeline() {
//    final long start = System.currentTimeMillis();
    final ArrayList<ReactImageView> images = this.images();

    if (!mIsReady && getChildCount() > 0) {
      getChildAt(0).setVisibility(View.INVISIBLE);
    }

    if (mConfig != null && images.size() > 0) {
      try {
        final ImageFilter self = this;
//        final String name = mConfig.getString("name");
        final CacheKey auxKey = AuxCache.auxKey(mConfig, images);

        final FilterableImage target = AuxCache.get(auxKey);

        if (target != null) {
          if (!self.mIsReady && self.getChildCount() > 0) {
            self.getChildAt(0).setVisibility(View.VISIBLE);
            self.mIsReady = true;
          }

          ImageFilter.filterImage(
            new FilterableImage(
              (ReactImageView) self.getChildAt(0),
              target.getPostProcessors(),
              target.isCacheDisabled()
            ),
            mImageListeners.get(ReactImageView.class.cast(self.getChildAt(0)))
          );

        } else {
          ImageFilter.parseConfig(mConfig, images, mImageListeners, mDefaultWidth, mDefaultHeight)
            .then(new DoneCallback<FilterableImage>() {
              @Override
              public void onDone(final FilterableImage result) {
//                Log.d(ReactConstants.TAG, "ImageFilterKit: start->parse " + name + " " + String.valueOf(System.currentTimeMillis() - start));
                if (!self.mIsReady && self.getChildCount() > 0) {
                  self.getChildAt(0).setVisibility(View.VISIBLE);
                  self.mIsReady = true;
                }

                ImageFilter.filterImage(result, mImageListeners.get(result.getImage()))
                  .onSuccess(new Continuation<ReactImageView, Void>() {
                    @Override
                    public Void then(Task<ReactImageView> task) throws Exception {
                      if (!result.isCacheDisabled()) {
                        AuxCache.put(auxKey, result);
                      }
//                      Log.d(ReactConstants.TAG, "ImageFilterKit: start->filter " + name + " " + String.valueOf(System.currentTimeMillis() - start));
                      return null;
                    }
                  });
              }
            });
        }

      } catch (JSONException exc) {
        Assertions.assertCondition(
          false,
          "ImageFilterKit: Unable to parse config - " + exc.getMessage()
        );
      }
    }
  }

  private static Task<ReactImageView> filterImage(
    final FilterableImage filterableImage,
    final @Nullable FrescoControllerListener listener
  ) {
    final ReactImageView image = filterableImage.getImage();
    final TaskCompletionSource<ReactImageView> deferred = new TaskCompletionSource<>();

    ArrayList<Postprocessor> postProcessors = new ArrayList<>(filterableImage.getPostProcessors());

    if (postProcessors.size() == 0) {
      postProcessors.add(new DummyPostProcessor());
    }

    IterativeBoxBlurPostProcessor next = new MultiPostProcessor(
      postProcessors,
      filterableImage.isCacheDisabled()
    );

    if (listener != null) {
      listener.setEnabled(false);
    }

    final ControllerListener<ImageInfo> prevListener = ReactImageViewUtils
      .getControllerListener(image);

    FrescoControllerListener nextListener = new FrescoControllerListener(
      prevListener,
      new Functor() {
        public void call() {
          ReactImageViewUtils.setControllerListener(image, prevListener);
          deferred.setResult(image);
        }
      }
    );

    ReactImageViewUtils.setControllerListener(image, nextListener);

    ReactImageViewUtils.setPostProcessor(image, next);
    ReactImageViewUtils.setDirty(image, true);

    image.maybeUpdateView();

    return deferred.getTask();
  }
}
