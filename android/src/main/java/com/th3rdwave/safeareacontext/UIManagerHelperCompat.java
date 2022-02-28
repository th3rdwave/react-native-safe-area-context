package com.th3rdwave.safeareacontext;

import android.content.Context;
import android.content.ContextWrapper;
import android.view.View;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.UIManagerHelper;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class UIManagerHelperCompat {
  /**
   * UIManagerHelper.getReactContext only exists in RN 0.63+ so vendor it here for a while.
   */
  public static ReactContext getReactContext(View view) {
    Context context = view.getContext();
    if (!(context instanceof ReactContext) && context instanceof ContextWrapper) {
      context = ((ContextWrapper) context).getBaseContext();
    }
    return (ReactContext) context;
  }

  /**
   * UIManagerHelper.getSurfaceId only exists in RN 0.65+ so call it with reflection.
   */
  public static int getSurfaceId(Context context) {
    // Avoid calling the method for old arch as it is not needed.
    if (!BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      return -1;
    }
    try {
      Method method = UIManagerHelper.class.getMethod("getSurfaceId", Context.class);
      Object result = method.invoke(null, context);
      return result != null ? (int) result : -1;
    } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
      e.printStackTrace();
      return -1;
    }
  }
}
