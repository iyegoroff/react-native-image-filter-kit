package iyegoroff.imagefilterkit;

import android.content.Context;
import android.os.Build;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.executors.UiThreadImmediateExecutorService;
import com.facebook.common.logging.FLog;
import com.facebook.common.memory.MemoryTrimType;
import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.BaseDataSubscriber;
import com.facebook.datasource.DataSource;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.drawee.controller.ControllerListener;
import com.facebook.imagepipeline.common.TooManyBitmapsException;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.image.ImageInfo;
import com.facebook.imagepipeline.memory.BitmapCounter;
import com.facebook.imagepipeline.memory.BitmapCounterProvider;
import com.facebook.imagepipeline.postprocessors.IterativeBoxBlurPostProcessor;
import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.image.ReactImageView;
import com.facebook.react.views.view.ReactViewGroup;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import bolts.CancellationTokenSource;
import bolts.Continuation;
import bolts.Task;
import bolts.TaskCompletionSource;
import iyegoroff.imagefilterkit.utility.CacheablePostProcessor;
import iyegoroff.imagefilterkit.utility.DummyPostProcessor;
import iyegoroff.imagefilterkit.utility.MultiPostProcessor;

public class ImageFilter extends ReactViewGroup {

  private @Nullable JSONObject mConfig = null;
  private int mClearCachesMaxRetries = 10;
  private boolean mIsReady = false;
  private int mDefaultWidth = 0;
  private int mDefaultHeight = 0;
  private CancellationTokenSource mFiltering = new CancellationTokenSource();
  private final @Nonnull Map<ReactImageView, FrescoControllerListener> mImageListeners =
    new HashMap<>();

  public ImageFilter(Context context) {
    super(context);
  }

  public void setConfig(@Nullable String config) {
    try {
      mConfig = new JSONObject(config);
    } catch (JSONException exc) {
      Assertions.assertCondition(
        false,
        "ImageFilterKit: Bad config - " + exc.getMessage()
      );
    }

    if (mIsReady) {
      sendJSEvent(ImageFilterEvent.ON_FILTERING_START, null);
      reset();
      runFilterPipeline();
    }
  }

  public void setClearCachesMaxRetries(int retries) {
    mClearCachesMaxRetries = retries;
  }

  @Override
  protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    super.onLayout(changed, left, top, right, bottom);

    sendJSEvent(ImageFilterEvent.ON_FILTERING_START, null);
    reset();
    runFilterPipeline();
  }

  private Task<FilterableImage> createSingularImage(
    final @Nonnull JSONObject config,
    final @Nonnull Task<FilterableImage> prevImage
  ) throws JSONException {
    final String name = config.getString("name");

    return prevImage
      .onSuccess(new Continuation<FilterableImage, FilterableImage>() {
        @Override
        public FilterableImage then(Task<FilterableImage> task) {
          final FilterableImage result = task.getResult();
          final int measuredWidth = result.getImage().getMeasuredWidth();
          final int measuredHeight = result.getImage().getMeasuredHeight();
          final int width = measuredWidth == 0 ? mDefaultWidth : measuredWidth;
          final int height = measuredHeight == 0 ? mDefaultHeight : measuredHeight;

          final ArrayList<Postprocessor> postProcessors =
            new ArrayList<>(result.getPostProcessors());

          postProcessors.add(
            PostProcessorRegistry.getInstance()
              .createSingular(name, width, height, config, getContext())
          );

          final boolean cacheDisabled = CacheablePostProcessor.cacheDisabled(config);

          return new FilterableImage(result.getImage(), postProcessors, cacheDisabled);
        }
      }, mFiltering.getToken());
  }

  private Task<FilterableImage> createImageComposition(
    final @Nonnull JSONObject config,
    final @Nonnull Task<List<FilterableImage>> prevImages
  ) throws JSONException {
    final String name = config.getString("name");

    return prevImages
      .onSuccessTask(new Continuation<List<FilterableImage>, Task<FilterableImage>>() {
        @Override
        public Task<FilterableImage> then(Task<List<FilterableImage>> task) {
          final TaskCompletionSource<FilterableImage> deferred = new TaskCompletionSource<>();
          final List<FilterableImage> result = task.getResult();
          final FilterableImage dst = result.get(0);
          final FilterableImage src = result.get(1);
          final boolean cacheDisabled = CacheablePostProcessor.cacheDisabled(config);

          ImageFilter.filterImage(src, mImageListeners.get(src.getImage()))
            .onSuccess(new Continuation<ReactImageView, Void>() {
              @Override
              public Void then(Task<ReactImageView> task) {
                final ReactImageView result = task.getResult();

                if (result != null && result.getController() != null) {
                  final int measuredWidth = result.getMeasuredWidth();
                  final int measuredHeight = result.getMeasuredHeight();
                  final int width = measuredWidth == 0 ? mDefaultWidth : measuredWidth;
                  final int height = measuredHeight == 0 ? mDefaultHeight : measuredHeight;

                  final DataSource<CloseableReference<CloseableImage>> ds = ReactImageViewUtils
                    .getDataSource(result);

                  if (ds != null) {
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
                                  src.generatedCacheKey(),
                                  getContext()
                                )
                              );

                            } finally {
                              CloseableReference.closeSafely(ref);
                            }

                            deferred.setResult(
                              new FilterableImage(dst.getImage(), postProcessors, cacheDisabled)
                            );

                          } else {
                            deferred.setError(
                              new Exception(
                                "ImageFilterKit: ImageFilter error: image composition - no intermediate image."
                              )
                            );
                          }
                        }
                      }

                      @Override
                      protected void onFailureImpl(
                        DataSource<CloseableReference<CloseableImage>> dataSource
                      ) {
                        Throwable throwable = dataSource.getFailureCause();

                        if (throwable != null) {
                          deferred.setError(
                            throwable instanceof Exception
                              ? (Exception) throwable
                              : new Exception(throwable)
                          );
                        }
                      }
                    }, UiThreadImmediateExecutorService.getInstance());
                  }
                }

                return null;
              }
            }, mFiltering.getToken());

          return deferred.getTask();
        }
      }, mFiltering.getToken());
  }


  private Task<FilterableImage> parseConfig(
    final @Nonnull Object config,
    final @Nonnull ArrayList<ReactImageView> images
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

    if (PostProcessorRegistry.getInstance().isComposition(name)) {
      return createImageComposition(
        jsonConfig,
        Task.whenAllResult(
          Arrays.asList(
            parseConfig(jsonConfig.getJSONObject("dstImage").get("image"), images),
            parseConfig(jsonConfig.getJSONObject("srcImage").get("image"), images)
          )
        )
      );

    } else if (PostProcessorRegistry.getInstance().isSingular(name)) {
      return createSingularImage(
        jsonConfig,
        parseConfig(jsonConfig.getJSONObject("image").get("image"), images)
      );

    } else {
      throw new JSONException(
        "ImageFilterKit: ImageFilter error: Can't find '" + name + "' post processor."
      );
    }
  }

  private @Nonnull ArrayList<ReactImageView> images() {
    ArrayList<ReactImageView> images = new ArrayList<>();

    for (int i = 0; i < getChildCount(); i++) {
      View child = getChildAt(i);

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
    reset(0);
  }

  private void reset(final int retries) {
    mFiltering.cancel();
    mImageListeners.clear();

    List<ReactImageView> images = images();

    mFiltering = new CancellationTokenSource();

    for (final ReactImageView image : images) {
      final ControllerListener<ImageInfo> prevListener = ReactImageViewUtils
        .getControllerListener(image);

      if (mDefaultWidth == 0 && mDefaultHeight == 0) {
        mDefaultWidth = image.getMeasuredWidth();
        mDefaultHeight = image.getMeasuredHeight();
      }

      FrescoControllerListener nextListener = new FrescoControllerListener(
        FrescoControllerListener.originalListener(prevListener),
        new Functor.Arity0() {
          public void call() {
            sendJSEvent(ImageFilterEvent.ON_FILTERING_START, null);
            runFilterPipeline();
          }
        },
        new Functor.Arity1<Throwable>() {
          public void call(Throwable error) {
            handleError(
              error,
              new Functor.Arity1<Integer>() {
                @Override
                public void call(Integer rs) {
                  reset(rs);
                  runFilterPipeline();
                }
              },
              retries
            );
          }
        }
      );

      mImageListeners.put(image, nextListener);

      ReactImageViewUtils.setControllerListener(image, nextListener);
    }
  }

  private void runFilterPipeline() {
    ImageFilter.ashmemInfo("before filtering");
    final ArrayList<ReactImageView> images = images();

    if (!mIsReady && getChildCount() > 0) {
      getChildAt(0).setVisibility(View.INVISIBLE);
    }

    if (mConfig != null && images.size() > 0) {
      try {
        final ImageFilter self = this;
        final CacheKey auxKey = AuxCache.auxKey(mConfig, images);

        final WeakFilterableImage target = AuxCache.get(auxKey);
        final ArrayList<Postprocessor> postProcessors = target != null
          ? target.getPostProcessors()
          : null;

        if (target != null && postProcessors != null) {
          if (!self.mIsReady && self.getChildCount() > 0) {
            self.getChildAt(0).setVisibility(View.VISIBLE);
            self.mIsReady = true;
          }

          ImageFilter.filterImage(
            new FilterableImage(
              (ReactImageView) self.getChildAt(0),
              postProcessors,
              target.isCacheDisabled()
            ),
            mImageListeners.get(ReactImageView.class.cast(self.getChildAt(0)))
          ).onSuccess(new Continuation<ReactImageView, Object>() {
            @Override
            public Object then(Task<ReactImageView> task) {
              sendJSEvent(ImageFilterEvent.ON_FILTERING_FINISH, null);
              return null;
            }
          }, mFiltering.getToken());

        } else {
          parseConfig(mConfig, images)
            .onSuccess(new Continuation<FilterableImage, Void>() {
              @Override
              public Void then(Task<FilterableImage> task) {
                if (!self.mIsReady && self.getChildCount() > 0) {
                  self.getChildAt(0).setVisibility(View.VISIBLE);
                  self.mIsReady = true;
                }

                final FilterableImage result = task.getResult();

                ImageFilter.filterImage(result, mImageListeners.get(result.getImage()))
                  .onSuccess(new Continuation<ReactImageView, Void>() {
                    @Override
                    public Void then(Task<ReactImageView> task) {
                      if (!result.isCacheDisabled()) {
                        AuxCache.put(
                          auxKey,
                          new WeakFilterableImage(
                            result.getPostProcessors(),
                            result.isCacheDisabled()
                          )
                        );
                      }

                      ImageFilter.ashmemInfo("after filtering");

                      sendJSEvent(ImageFilterEvent.ON_FILTERING_FINISH, null);

                      return null;
                    }
                  }, mFiltering.getToken());

                return null;
              }
            }, mFiltering.getToken())
            .continueWith(new Continuation<Void, Void>() {
              @Override
              public Void then(Task<Void> task) {
                if (task.isFaulted()) {
                  handleError(task.getError());
                }

                return null;
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

  private void sendJSEvent(final @Nonnull String eventName, final @Nullable String message) {
    WritableMap event = Arguments.createMap();
    if (message != null) {
      event.putString("message", message);
    }

    ((ReactContext)getContext()).getJSModule(RCTEventEmitter.class).receiveEvent(
      getId(),
      eventName,
      event
    );
  }

  private void handleError(final @Nonnull Throwable error) {
    handleError(error, null, 0);
  }

  private void handleError(
    final @Nonnull Throwable error,
    final @Nullable Functor.Arity1<Integer> retry,
    final int retries
  ) {
    FLog.w(ReactConstants.TAG, "ImageFilterKit: " + error.toString());

    MemoryTrimmer trimmer = MemoryTrimmer.getInstance();

    if (error instanceof TooManyBitmapsException && trimmer.isUsed() && retries < mClearCachesMaxRetries) {
      FLog.d(ReactConstants.TAG, "ImageFilterKit: clearing caches ...");
      trimmer.trim(MemoryTrimType.OnCloseToDalvikHeapLimit);
      Fresco.getImagePipeline().clearCaches();

      Task.delay(1, mFiltering.getToken()).continueWith(new Continuation<Void, Object>() {
        @Override
        public Object then(Task<Void> task) {
          if (retry != null) {
            retry.call(retries + 1);
          }
          return null;
        }
      }, UiThreadImmediateExecutorService.getInstance(), mFiltering.getToken());

    } else {
      sendJSEvent(ImageFilterEvent.ON_FILTERING_ERROR, error.toString());
    }
  }

  private static Task<ReactImageView> filterImage(
    final @Nonnull FilterableImage filterableImage,
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
      new Functor.Arity0() {
        public void call() {
          if (!deferred.getTask().isCompleted()) {
            ReactImageViewUtils.setControllerListener(image, prevListener);
            deferred.setResult(image);
          }
        }
      }
    );

    ReactImageViewUtils.setControllerListener(image, nextListener);

    ReactImageViewUtils.setPostProcessor(image, next);
    ReactImageViewUtils.setDirty(image);

    image.maybeUpdateView();

    return deferred.getTask();
  }

  private static void ashmemInfo(@Nonnull String stateLabel) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
      BitmapCounter counter = BitmapCounterProvider.get();

      FLog.d(
        ReactConstants.TAG,
        String.format(
          (Locale)null,
          "ImageFilterKit: bitmap pool %s - %d/%d images, %d/%d MB",
          stateLabel,
          counter.getCount(),
          counter.getMaxCount(),
          counter.getSize() / 1024 / 1024,
          counter.getMaxSize() / 1024 / 1024
        )
      );
    }
  }
}
