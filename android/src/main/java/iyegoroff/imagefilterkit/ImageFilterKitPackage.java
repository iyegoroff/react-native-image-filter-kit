package iyegoroff.imagefilterkit;

import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import javax.annotation.Nonnull;

public class ImageFilterKitPackage implements ReactPackage {
  @Override
  public @Nonnull List<ViewManager> createViewManagers(
    @Nonnull ReactApplicationContext reactContext
  ) {
    return Collections.singletonList(new ImageFilterManager());
  }

  @Override
  public @Nonnull List<NativeModule> createNativeModules(
    @Nonnull ReactApplicationContext reactContext
  ) {
    return Collections.singletonList(new ExtractedImagesCacheModule(reactContext));
  }
}
