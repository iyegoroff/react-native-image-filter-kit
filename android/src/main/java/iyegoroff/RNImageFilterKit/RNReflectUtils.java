package iyegoroff.RNImageFilterKit;

import android.util.Log;

import com.facebook.react.common.ReactConstants;

import java.lang.reflect.Field;

public class RNReflectUtils {
  public static <T> T getFieldValue(Class<?> type, Object target, String name) {
    try {
      Field field = type.getDeclaredField(name);
      field.setAccessible(true);

      return (T) field.get(target);

    } catch (Exception e) {
      Log.d(ReactConstants.TAG, "Can't get " + type.getName() + " field " + name);
      Log.d(ReactConstants.TAG, e.getMessage());
    }

    return null;
  }


  public static <T> void setFieldValue(Class<?> type, Object target, String name, T value) {
    try {
      Field field = type.getDeclaredField(name);
      field.setAccessible(true);
      field.set(target, value);

    } catch (Exception e) {
      Log.d(ReactConstants.TAG, "Can't set " + type.getName() + " field " + name);
      Log.d(ReactConstants.TAG, e.getMessage());
    }
  }
}
