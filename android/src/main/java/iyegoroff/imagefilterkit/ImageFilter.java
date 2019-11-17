package iyegoroff.imagefilterkit;

import android.content.Context;
import android.os.Build;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.executors.UiThreadImmediateExecutorService;
import com.facebook.common.logging.FLog;
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
import java.util.concurrent.Callable;

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
  private boolean mExtractImageEnabled = false;
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
      mConfig = config != null ? new JSONObject(config) : null;
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

  public void setExtractImageEnabled(boolean extractImageEnabled) {
    boolean shouldExtractImage = !mExtractImageEnabled && extractImageEnabled;

    mExtractImageEnabled = extractImageEnabled;

    if (shouldExtractImage) {
      List<ReactImageView> images = this.images();

      if (images.size() > 0) {
        this.extractImage(images.get(0));
      }
    }
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
      .onSuccess(task -> {
        final FilterableImage result = task.getResult();
        final ArrayList<Postprocessor> postProcessors = new ArrayList<>(result.getPostProcessors());

        postProcessors.add(
          PostProcessorRegistry.getInstance()
            .createSingular(
              name,
              mDefaultWidth,
              mDefaultHeight,
              config,
              getContext()
            )
        );

        final boolean cacheDisabled = CacheablePostProcessor.cacheDisabled(config);

        return new FilterableImage(result.getImage(), postProcessors, cacheDisabled);
      }, mFiltering.getToken());
  }

  private Task<FilterableImage> createImageComposition(
    final @Nonnull JSONObject config,
    final @Nonnull Task<List<FilterableImage>> prevImages
  ) throws JSONException {
    final String name = config.getString("name");

    return prevImages
      .onSuccessTask(task -> {
        final TaskCompletionSource<FilterableImage> deferred = new TaskCompletionSource<>();
        final List<FilterableImage> result = task.getResult();
        final FilterableImage dst = result.get(0);
        final FilterableImage src = result.get(1);
        final boolean cacheDisabled = CacheablePostProcessor.cacheDisabled(config);

        ImageFilter.filterImage(src, mImageListeners.get(src.getImage()), mFiltering)
          .onSuccess((Continuation<ReactImageView, Void>) task1 -> {
            final ReactImageView result1 = task1.getResult();

            if (result1 != null && result1.getController() != null) {
              final DataSource<CloseableReference<CloseableImage>> ds = ReactImageViewUtils
                .getDataSource(result1);

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
                              mDefaultWidth,
                              mDefaultHeight,
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
          }, mFiltering.getToken());

        return deferred.getTask();
      }, mFiltering.getToken());
  }


  private Task<FilterableImage> parseConfig(
    final @Nonnull Object config,
    final @Nonnull ArrayList<ReactImageView> images
  ) throws JSONException {
    if (config instanceof Integer) {
      return Task.forResult(
        new FilterableImage(images.get((int) config), new ArrayList<>(), false)
      );
    }

    final JSONObject jsonConfig = (JSONObject) config;
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

      while (child instanceof ViewGroup) {
        child = ((ViewGroup) child).getChildAt(0);
      }

      if (child instanceof ReactImageView) {
        images.add((ReactImageView) child);
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
        () -> {
          sendJSEvent(ImageFilterEvent.ON_FILTERING_START, null);
          runFilterPipeline();
        },
        error -> handleError(
          error,
          rs -> {
            reset(rs);
            runFilterPipeline();
          },
          retries
        )
      );

      mImageListeners.put(image, nextListener);

      ReactImageViewUtils.setControllerListener(image, nextListener);
    }
  }

  private void extractImage(ReactImageView mainImage) {
    if (!mExtractImageEnabled) {
      return;
    }

    DataSource<CloseableReference<CloseableImage>> ds = ReactImageViewUtils
      .getDataSource(mainImage);

    if (ds != null) {
      ds.subscribe(
        new BaseDataSubscriber<CloseableReference<CloseableImage>>() {
          @Override
          protected void onNewResultImpl(DataSource<CloseableReference<CloseableImage>> dataSource) {
            if (dataSource.isFinished()) {
              CloseableReference<CloseableImage> ref = dataSource.getResult();

              if (ref != null) {
                try {
                  TempFileUtils.writeFile(
                    (ReactContext) getContext(),
                    ref,
                    uri -> sendJSEvent(ImageFilterEvent.ON_EXTRACT_IMAGE, uri),
                    error -> sendJSEvent(ImageFilterEvent.ON_FILTERING_ERROR, error)
                  );

                } finally {
                  CloseableReference.closeSafely(ref);
                }

              } else {
                handleError(new Error("Can't extract image"));
              }
            }
          }

          @Override
          protected void onFailureImpl(DataSource<CloseableReference<CloseableImage>> dataSource) {
            Throwable throwable = dataSource.getFailureCause();

            if (throwable != null) {
              handleError(
                throwable instanceof Exception
                  ? (Exception) throwable
                  : new Exception(throwable)
              );
            }
          }
        },
        UiThreadImmediateExecutorService.getInstance()
      );
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
          if (!self.mIsReady && getChildCount() > 0) {
            getChildAt(0).setVisibility(View.VISIBLE);
            self.mIsReady = true;
          }

          final ReactImageView mainImage = images.get(0);

          ImageFilter.filterImage(
            new FilterableImage(
              mainImage,
              postProcessors,
              target.isCacheDisabled()
            ),
            mImageListeners.get(mainImage),
            mFiltering
          ).onSuccess(task -> {
            sendJSEvent(ImageFilterEvent.ON_FILTERING_FINISH, null);
            self.extractImage(task.getResult());
            return null;
          }, mFiltering.getToken());

        } else {
          parseConfig(mConfig, images)
            .onSuccess((Continuation<FilterableImage, Void>) task -> {
              if (!self.mIsReady && getChildCount() > 0) {
                getChildAt(0).setVisibility(View.VISIBLE);
                self.mIsReady = true;
              }

              final FilterableImage result = task.getResult();

              ImageFilter.filterImage(result, mImageListeners.get(result.getImage()), mFiltering)
                .onSuccess((Continuation<ReactImageView, Void>) task1 -> {
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
                  self.extractImage(task1.getResult());

                  return null;
                }, mFiltering.getToken());

              return null;
            }, mFiltering.getToken())
            .continueWith((Continuation<Void, Void>) task -> {
              if (task.isFaulted()) {
                handleError(task.getError());
              }

              return null;
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

  private void sendJSEvent(final @Nonnull String eventName, final @Nullable String arg) {
    WritableMap event = Arguments.createMap();
    if (arg != null) {
      event.putString(
        eventName.equals(ImageFilterEvent.ON_FILTERING_ERROR) ? "message" : "uri",
        arg
      );
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

    if (
      error instanceof TooManyBitmapsException &&
      trimmer.isUsed() &&
      retries < mClearCachesMaxRetries
    ) {
      FLog.d(ReactConstants.TAG, "ImageFilterKit: clearing caches ...");
      trimmer.trim();
      Fresco.getImagePipeline().clearCaches();

      Task.delay(1, mFiltering.getToken()).continueWith(task -> {
        if (retry != null) {
          retry.call(retries + 1);
        }
        return null;
      }, UiThreadImmediateExecutorService.getInstance(), mFiltering.getToken());

    } else {
      sendJSEvent(ImageFilterEvent.ON_FILTERING_ERROR, error.toString());
    }
  }

  private static Task<ReactImageView> filterImage(
    final @Nonnull FilterableImage filterableImage,
    final @Nullable FrescoControllerListener listener,
    final @Nonnull CancellationTokenSource cancellationTokenSource
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
      listener.setDisabled();
    }

    final ControllerListener<ImageInfo> prevListener = ReactImageViewUtils
      .getControllerListener(image);

    FrescoControllerListener nextListener = new FrescoControllerListener(
      prevListener,
      () -> {
        if (!deferred.getTask().isCompleted()) {
          ReactImageViewUtils.setControllerListener(image, prevListener);
          deferred.setResult(image);
        }
      }
    );

    ReactImageViewUtils.setControllerListener(image, nextListener);

    ReactImageViewUtils.setPostProcessor(image, next);

    ReactImageViewUtils.setDirty(image);

    Task.call((Callable<Void>) () -> {
      image.maybeUpdateView();
      return null;
    }, UiThreadImmediateExecutorService.getInstance(), cancellationTokenSource.getToken());

    return deferred.getTask();
  }

  private static void ashmemInfo(@Nonnull String stateLabel) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
      BitmapCounter counter = BitmapCounterProvider.get();

      FLog.d(
        ReactConstants.TAG,
        String.format(
          Locale.ROOT,
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
