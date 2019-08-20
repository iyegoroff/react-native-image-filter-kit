package iyegoroff.imagefilterkit.hazeremoval;

import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import javax.annotation.Nonnull;

import iyegoroff.imagefilterkit.PostProcessorRegistry;

public class ImageFilterKitHazeRemovalPackage implements ReactPackage {

  static {
    PostProcessorRegistry registry = PostProcessorRegistry.getInstance();

    registry.addSingular("HazeRemoval", HazeRemovalPostProcessor::new);
  }

  @Nonnull
  @Override
  public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Nonnull
  @Override
  public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}