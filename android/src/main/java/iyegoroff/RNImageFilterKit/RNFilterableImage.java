package iyegoroff.RNImageFilterKit;

import android.content.Context;
import android.graphics.Color;

import com.facebook.drawee.controller.AbstractDraweeControllerBuilder;
import com.facebook.drawee.controller.ForwardingControllerListener;
import com.facebook.drawee.drawable.ScalingUtils;
import com.facebook.drawee.generic.GenericDraweeHierarchy;
import com.facebook.drawee.generic.RoundingParams;
import com.facebook.imagepipeline.common.ResizeOptions;
import com.facebook.imagepipeline.request.ImageRequest;
import com.facebook.imagepipeline.request.ImageRequestBuilder;
import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.react.modules.fresco.ReactNetworkImageRequest;
import com.facebook.react.views.image.GlobalImageLoadListener;
import com.facebook.react.views.image.MultiPostprocessor;
import com.facebook.react.views.image.ReactImageView;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.Nullable;

public class RNFilterableImage extends ReactImageView {

  public RNFilterableImage(
          Context context,
          AbstractDraweeControllerBuilder draweeControllerBuilder,
          @Nullable GlobalImageLoadListener globalImageLoadListener,
          @Nullable Object callerContext) {
    super(context, draweeControllerBuilder, globalImageLoadListener, callerContext);
  }
}
