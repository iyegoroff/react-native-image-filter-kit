package iyegoroff.imagefilterkit;

import android.util.Log;

import com.facebook.react.common.ReactConstants;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

class ReflectUtils {

  @SuppressWarnings("unchecked")
  static <T> T getFieldValue(Object target, String name) {
    Class<?> type = target.getClass();

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


  static <T> void setFieldValue(Object target, String name, T value) {
    Class<?> type = target.getClass();

    try {
      Field field = type.getDeclaredField(name);
      field.setAccessible(true);
      field.set(target, value);

    } catch (Exception e) {
      Log.d(ReactConstants.TAG, "Can't set " + type.getName() + " field " + name);
      Log.d(ReactConstants.TAG, e.getMessage());
    }
  }

  @SuppressWarnings("unchecked")
  static <T> T invokeMethod(Object target, String name) {
    Class<?> type = target.getClass();

    try {
      Method method = type.getDeclaredMethod(name);
      method.setAccessible(true);

      return (T) method.invoke(target);

    } catch (Exception e) {
      Log.d(ReactConstants.TAG, "Can't invoke " + type.getName() + " method " + name);
      Log.d(ReactConstants.TAG, e.getMessage());
    }

    return null;
  }
}
