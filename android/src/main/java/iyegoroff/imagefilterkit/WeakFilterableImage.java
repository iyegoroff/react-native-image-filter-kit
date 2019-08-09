package iyegoroff.imagefilterkit;

import com.facebook.imagepipeline.request.Postprocessor;

import java.lang.ref.WeakReference;
import java.util.ArrayList;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

class WeakFilterableImage {

  private final @Nonnull ArrayList<WeakReference<Postprocessor>> mPostProcessors;
  private final boolean mCacheDisabled;

  WeakFilterableImage(
    final @Nonnull ArrayList<Postprocessor> postProcessors,
    final boolean cacheDisabled
  ) {
    mCacheDisabled = cacheDisabled;
    mPostProcessors = new ArrayList<>();

    for (Postprocessor p : postProcessors) {
      mPostProcessors.add(new WeakReference<>(p));
    }
  }

  @Nullable ArrayList<Postprocessor> getPostProcessors() {
    ArrayList<Postprocessor> ps = new ArrayList<>();

    for (WeakReference<Postprocessor> weak : mPostProcessors) {
      Postprocessor p = weak.get();

      if (p == null) {
        return null;
      }

      ps.add(p);
    }

    return ps;
  }

  boolean isCacheDisabled() {
    return mCacheDisabled;
  }
}
