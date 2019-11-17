package iyegoroff.imagefilterkit;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

@ReactModule(name = ImageFilterManager.REACT_CLASS)
public class ImageFilterManager extends ReactViewManager {

  static final String REACT_CLASS = "IFKImageFilter";

  private static final String PROP_CONFIG = "config";
  private static final String PROP_CLEAR_CACHES_MAX_RETRIES = "clearCachesMaxRetries";
  private static final String PROP_EXTRACT_IMAGE_ENABLED = "extractImageEnabled";

  ImageFilterManager() {
    super();
  }

  @Override
  public @Nonnull String getName() {
    return REACT_CLASS;
  }

  @Override
  public @Nonnull ImageFilter createViewInstance(ThemedReactContext reactContext) {
    return new ImageFilter(reactContext);
  }

  @SuppressWarnings("unused")
  @ReactProp(name = PROP_CONFIG)
  public void setConfig(ImageFilter view, @Nullable String config) {
    view.setConfig(config);
  }

  @SuppressWarnings("unused")
  @ReactProp(name = PROP_CLEAR_CACHES_MAX_RETRIES, defaultInt = 10)
  public void setClearCachesMaxRetries(ImageFilter view, int retries) {
    view.setClearCachesMaxRetries(retries);
  }

  @SuppressWarnings("unused")
  @ReactProp(name = PROP_EXTRACT_IMAGE_ENABLED)
  public void setExtractImageEnabled(ImageFilter view, boolean extractImageEnabled) {
    view.setExtractImageEnabled(extractImageEnabled);
  }

  public Map<String, Object> getExportedCustomBubblingEventTypeConstants() {
    return MapBuilder.<String, Object>builder()
      .put(
        ImageFilterEvent.ON_FILTERING_START,
        MapBuilder.of(
          "phasedRegistrationNames",
          MapBuilder.of("bubbled", ImageFilterEvent.ON_FILTERING_START)
        )
      )
      .put(
        ImageFilterEvent.ON_FILTERING_FINISH,
        MapBuilder.of(
          "phasedRegistrationNames",
          MapBuilder.of("bubbled", ImageFilterEvent.ON_FILTERING_FINISH)
        )
      )
      .put(
        ImageFilterEvent.ON_FILTERING_ERROR,
        MapBuilder.of(
          "phasedRegistrationNames",
          MapBuilder.of("bubbled", ImageFilterEvent.ON_FILTERING_ERROR)
        )
      )
      .put(
        ImageFilterEvent.ON_EXTRACT_IMAGE,
        MapBuilder.of(
          "phasedRegistrationNames",
          MapBuilder.of("bubbled", ImageFilterEvent.ON_EXTRACT_IMAGE)
        )
      )
      .build();
  }
}
