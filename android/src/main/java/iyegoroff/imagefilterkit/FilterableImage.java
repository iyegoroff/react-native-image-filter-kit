package iyegoroff.imagefilterkit;

import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.react.views.image.ReactImageView;

import java.util.ArrayList;

import javax.annotation.Nonnull;

public class FilterableImage {

  private final @Nonnull ReactImageView mImage;
  private final @Nonnull ArrayList<Postprocessor> mPostProcessors;
  private final boolean mCacheDisabled;

  FilterableImage(
    @Nonnull ReactImageView image,
    @Nonnull ArrayList<Postprocessor> postProcessors,
    boolean cacheDisabled
  ) {
    mImage = image;
    mPostProcessors = postProcessors;
    mCacheDisabled = cacheDisabled;
  }

  public ReactImageView getImage() {
    return mImage;
  }

  public ArrayList<Postprocessor> getPostProcessors() {
    return mPostProcessors;
  }

  public boolean isCacheDisabled() {
    return mCacheDisabled;
  }
}
