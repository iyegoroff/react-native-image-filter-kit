package iyegoroff.imagefilterkit;

import android.os.AsyncTask;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.util.Collections;
import java.util.Map;

@ReactModule(name = ExtractedImagesCacheModule.REACT_CLASS)
public class ExtractedImagesCacheModule extends ReactContextBaseJavaModule {

  static final String REACT_CLASS = "IFKExtractedImagesCache";

  ExtractedImagesCacheModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public @NonNull String getName() {
    return REACT_CLASS;
  }

  @Override
  public Map<String, Object> getConstants() {
    return Collections.emptyMap();
  }

  @Override
  public void onCatalystInstanceDestroy() {
    super.onCatalystInstanceDestroy();

    this.clean();
  }

  @ReactMethod
  public void clean() {
    new TempFileUtils.CleanTask(getReactApplicationContext())
      .executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
  }
}
