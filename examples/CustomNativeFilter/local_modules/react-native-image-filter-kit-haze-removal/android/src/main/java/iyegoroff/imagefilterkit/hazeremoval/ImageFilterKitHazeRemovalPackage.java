package iyegoroff.imagefilterkit.hazeremoval;

import android.content.Context;

import java.util.Collections;
import java.util.List;

import com.facebook.imagepipeline.request.Postprocessor;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import org.json.JSONObject;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.PostProcessorRegistry;

public class ImageFilterKitHazeRemovalPackage implements ReactPackage {

  static {
    PostProcessorRegistry registry = PostProcessorRegistry.getInstance();

    registry.addSingular("HazeRemoval", new PostProcessorRegistry.CreateSingular() {
      @Override
      public Postprocessor create(
        int width,
        int height,
        @Nullable JSONObject config,
        @Nonnull Context context
      ) {
        return new HazeRemovalPostProcessor(width, height, config, context);
      }
    });
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}