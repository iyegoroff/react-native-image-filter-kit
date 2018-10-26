package iyegoroff.RNImageFilterKit;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.cache.common.CacheKey;
import com.facebook.common.executors.UiThreadImmediateExecutorService;
import com.facebook.common.internal.Supplier;
import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.BaseDataSubscriber;
import com.facebook.datasource.DataSource;
import com.facebook.drawee.controller.ControllerListener;
import com.facebook.imagepipeline.image.CloseableBitmap;
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
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.RNImageFilterKit.Utility.RNCachedPostProcessor;
import iyegoroff.RNImageFilterKit.Utility.RNDummyPostProcessor;
import iyegoroff.RNImageFilterKit.Utility.RNMultiPostProcessor;

public class RNImageFilter extends ReactViewGroup {

  private @Nullable JSONObject mConfig = null;
  private boolean mIsReady = false;
  private final @Nonnull Map<ReactImageView, RNFrescoControllerListener> mImageListeners =
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

    this.runFilterPipeline();
  }

  public RNImageFilter(Context context) {
    super(context);
  }

  @Override
  protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    super.onLayout(changed, left, top, right, bottom);

    this.setupListeners();

    this.runFilterPipeline();
  }

  private static Promise<RNFilterableImage, ?, ?> createSingularImage(
    final @Nonnull JSONObject config,
    final @Nonnull Promise<RNFilterableImage, ?, ?> prevImage
  ) throws JSONException {
    final long start = System.currentTimeMillis();
    final String name = config.getString("name");

    return prevImage
      .then(new DoneFilter<RNFilterableImage, RNFilterableImage>() {
        @Override
        public RNFilterableImage filterDone(RNFilterableImage result) {
          int width = result.getImage().getMeasuredWidth();
          int height = result.getImage().getMeasuredHeight();

          ArrayList<Postprocessor> postProcessors = new ArrayList<>(result.getPostProcessors());
          postProcessors.add(
            RNPostProcessorRegistry.getInstance().createSingular(name, width, height, config)
          );

          Log.d(ReactConstants.TAG, "ImageFilterKit: sing start->parse " + name + " " + String.valueOf(System.currentTimeMillis() - start));

          return new RNFilterableImage(
            result.getImage(),
            postProcessors,
            RNCachedPostProcessor.cacheDisabled(config)
          );
        }
      });
  }

  private static Promise<RNFilterableImage, ?, ?> createImageComposition(
    final @Nonnull JSONObject config,
    final @Nonnull Promise<
      MultipleResults2<RNFilterableImage, RNFilterableImage>,
      OneReject<Object>,
      MasterProgress
    > prevImage,
    final @Nonnull Map<ReactImageView, RNFrescoControllerListener> imageListeners
  ) throws JSONException {
    final long start = System.currentTimeMillis();
    final String name = config.getString("name");

    return prevImage
      .then(new DonePipe<
        MultipleResults2<RNFilterableImage, RNFilterableImage>,
        RNFilterableImage,
        OneReject<Object>,
        MasterProgress
      >() {
        @Override
        public Promise<RNFilterableImage, OneReject<Object>, MasterProgress> pipeDone(
          final MultipleResults2<RNFilterableImage, RNFilterableImage> result
        ) {
          Log.d(ReactConstants.TAG, "ImageFilterKit: comp start->parse 1 " + name + " " + String.valueOf(System.currentTimeMillis() - start));
          final Deferred<RNFilterableImage, OneReject<Object>, MasterProgress> deferred =
            new DeferredObject<>();
          final RNFilterableImage dst = result.getFirst().getValue();
          final RNFilterableImage src = result.getSecond().getValue();
          final boolean cacheDisabled = RNCachedPostProcessor.cacheDisabled(config);
          Log.d(ReactConstants.TAG, "ImageFilterKit: comp start->parse 2 " + name + " " + String.valueOf(System.currentTimeMillis() - start));

          CacheKey auxKey = src.getPreparedAuxCacheKey();
          CloseableReference<CloseableImage> cachedSrcRef = RNAuxCache.getImage(auxKey);
          CacheKey srcFrescoKey = RNAuxCache.getFrescoKey(auxKey);

          Log.d(ReactConstants.TAG, "ImageFilterKit: comp start->parse 3 " + name + " " + String.valueOf(System.currentTimeMillis() - start));

          if (cachedSrcRef != null && srcFrescoKey != null) {
            ArrayList<Postprocessor> postProcessors =
              new ArrayList<>(dst.getPostProcessors());

            Log.d(ReactConstants.TAG, "ImageFilterKit: comp start->parse 4 " + name + " " + String.valueOf(System.currentTimeMillis() - start));

            try {
              Bitmap bitmap = ((CloseableBitmap) cachedSrcRef.get()).getUnderlyingBitmap();

              Log.d(ReactConstants.TAG, "ImageFilterKit: comp start->parse 5 " + name + " " + String.valueOf(System.currentTimeMillis() - start));

              postProcessors.add(
                RNPostProcessorRegistry.getInstance().createComposition(
                  name,
                  bitmap.getWidth(),
                  bitmap.getHeight(),
                  config,
                  cachedSrcRef,
                  srcFrescoKey
                )
              );

              Log.d(ReactConstants.TAG, "ImageFilterKit: comp start->parse 6 " + name + " " + String.valueOf(System.currentTimeMillis() - start));
            } finally {
              CloseableReference.closeSafely(cachedSrcRef);
            }

            deferred.resolve(new RNFilterableImage(dst.getImage(), postProcessors, cacheDisabled));

            Log.d(ReactConstants.TAG, "ImageFilterKit: comp start->parse 7 " + name + " " + String.valueOf(System.currentTimeMillis() - start));

          } else {
            RNImageFilter.filterImage(src, imageListeners.get(src.getImage()))
              .then(new DoneCallback<ReactImageView>() {
                @Override
                public void onDone(final ReactImageView result) {
                  if (result != null && result.getController() != null) {
                    final int width = result.getMeasuredWidth();
                    final int height = result.getMeasuredHeight();
                    final CacheKey bitmapKey = RNReflectUtils
                      .invokeMethod(result.getController(), "getCacheKey");
                    Supplier<DataSource<CloseableReference<CloseableImage>>> ds = RNReflectUtils
                      .invokeMethod(result.getController(), "getDataSourceSupplier");

                    if (ds != null && bitmapKey != null) {
                      ds.get().subscribe(new BaseDataSubscriber<CloseableReference<CloseableImage>>() {
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
                                if (!cacheDisabled) {
                                  RNAuxCache.put(src.getPreparedAuxCacheKey(), bitmapKey);
                                }

                                postProcessors.add(
                                  RNPostProcessorRegistry.getInstance().createComposition(
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

                              Log.d(ReactConstants.TAG, "ImageFilterKit: comp start->parse " + name + " " + String.valueOf(System.currentTimeMillis() - start));
                              deferred.resolve(
                                new RNFilterableImage(dst.getImage(), postProcessors, cacheDisabled)
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
          }

          return deferred.promise();
        }
      });
  }


  private static Promise<RNFilterableImage, ?, ?> parseConfig(
    final @Nonnull Object config,
    final @Nonnull ArrayList<ReactImageView> images,
    final @Nonnull Map<ReactImageView, RNFrescoControllerListener> imageListeners
  ) throws JSONException {
    if (config instanceof Integer) {
      return new DeferredObject<RNFilterableImage, Object, Object>()
        .resolve(
          new RNFilterableImage(
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
          RNImageFilter.parseConfig(jsonConfig.getJSONObject("dstImage").get("image"), images, imageListeners),
          RNImageFilter.parseConfig(jsonConfig.getJSONObject("srcImage").get("image"), images, imageListeners)
        ),
        imageListeners
      );

    } else {
      return createSingularImage(
        jsonConfig,
        RNImageFilter.parseConfig(jsonConfig.getJSONObject("image").get("image"), images, imageListeners)
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

  private void setupListeners() {
    final RNImageFilter self = this;

    for (ReactImageView image : this.images()) {
      final ControllerListener<ImageInfo> prevListener = RNReflectUtils.getFieldValue(
        image,
        "mControllerListener"
      );

      if (!(prevListener instanceof RNFrescoControllerListener)) {
        RNFrescoControllerListener nextListener = new RNFrescoControllerListener(
          prevListener,
          new RNFunctor() {
            public void call() {
              self.runFilterPipeline();
            }
          }
        );

        mImageListeners.put(image, nextListener);

        RNReflectUtils.setFieldValue(image, "mControllerListener", nextListener);
      }
    }
  }

  private void runFilterPipeline() {
    final long start = System.currentTimeMillis();
    ArrayList<ReactImageView> images = this.images();

    if (!mIsReady && getChildCount() > 0) {
      getChildAt(0).setVisibility(View.INVISIBLE);
    }

    if (mConfig != null && images.size() > 0) {
      try {
        final RNImageFilter self = this;
        final String name = mConfig.getString("name");

        RNImageFilter.parseConfig(mConfig, images, mImageListeners)
          .then(new DoneCallback<RNFilterableImage>() {
            @Override
            public void onDone(RNFilterableImage result) {
              Log.d(ReactConstants.TAG, "ImageFilterKit: start->parse " + name + " " + String.valueOf(System.currentTimeMillis() - start));
              if (!self.mIsReady && self.getChildCount() > 0) {
                self.getChildAt(0).setVisibility(View.VISIBLE);
                self.mIsReady = true;
              }
              RNImageFilter.filterImage(result, mImageListeners.get(result.getImage()))
                .then(new DoneCallback<ReactImageView>() {
                  @Override
                  public void onDone(ReactImageView result) {
                    Log.d(ReactConstants.TAG, "ImageFilterKit: start->filter " + name + " " + String.valueOf(System.currentTimeMillis() - start));
                  }
                });
            }
          });

      } catch (JSONException exc) {
        Assertions.assertCondition(
          false,
          "ImageFilterKit: Unable to parse config - " + exc.getMessage()
        );
      }
    }
  }

  private static Promise<ReactImageView, ?, ?> filterImage(
    final RNFilterableImage filterableImage,
    final @Nullable RNFrescoControllerListener listener
  ) {
    final ReactImageView image = filterableImage.getImage();
    final Deferred<ReactImageView, Object, Object> d = new DeferredObject<>();

    IterativeBoxBlurPostProcessor prev = RNReflectUtils.getFieldValue(
      image,
      "mIterativeBoxBlurPostProcessor"
    );

    ArrayList<Postprocessor> postProcessors = new ArrayList<>(filterableImage.getPostProcessors());

    if (postProcessors.size() == 0) {
      postProcessors.add(new RNDummyPostProcessor());
    }

    IterativeBoxBlurPostProcessor next = new RNMultiPostProcessor(
      postProcessors,
      filterableImage.isCacheDisabled()
    );

    if (prev == null || prev.getPostprocessorCacheKey() != next.getPostprocessorCacheKey()) {
      if (listener != null) {
        listener.setEnabled(false);
      }

      final ControllerListener<ImageInfo> prevListener = RNReflectUtils.getFieldValue(
        image,
        "mControllerListener"
      );

      RNFrescoControllerListener nextListener = new RNFrescoControllerListener(
        prevListener,
        new RNFunctor() {
          public void call() {
            RNReflectUtils.setFieldValue(image, "mControllerListener", prevListener);
            d.resolve(image);
          }
        }
      );

      RNReflectUtils.setFieldValue(image, "mControllerListener", nextListener);

      RNReflectUtils.setFieldValue(image, "mIterativeBoxBlurPostProcessor", next);
      RNReflectUtils.setFieldValue(image, "mIsDirty", true);

      image.maybeUpdateView();
    } else {
      d.resolve(image);
    }

    return d.promise();
  }
}
