package iyegoroff.RNImageFilterKit;

import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.react.views.image.ReactImageView;

import java.util.ArrayList;

import javax.annotation.Nonnull;

public class RNFilterableImage {
  private final @Nonnull ReactImageView mImage;
  private final @Nonnull ArrayList<Postprocessor> mPostProcessors;

  RNFilterableImage(
    @Nonnull ReactImageView image,
    @Nonnull ArrayList<Postprocessor> postProcessors
  ) {
    mImage = image;
    mPostProcessors = postProcessors;
  }

  public ReactImageView getImage() {
    return mImage;
  }

  public ArrayList<Postprocessor> getPostProcessors() {
    return mPostProcessors;
  }
}
