package com.th3rdwave.safeareaview;

import android.content.Context;
import android.os.Build;
import android.util.DisplayMetrics;
import android.view.Surface;
import android.view.WindowInsets;
import android.view.WindowManager;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.uimanager.DisplayMetricsHolder;
import com.facebook.react.views.view.ReactViewGroup;

import androidx.annotation.Nullable;

public class SafeAreaView extends ReactViewGroup {
  public interface OnInsetsChangeListener {
    void onInsetsChange(SafeAreaView view, EdgeInsets insets);
  }

  private @Nullable OnInsetsChangeListener mInsetsChangeListener;
  WindowManager mWindowManager;

  public SafeAreaView(Context context) {
    super(context);

    mWindowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
  }

  private EdgeInsets getSafeAreaInsets() {
    // Window insets are parts of the window that are covered by system views (status bar,
    // navigation bar, notches). There are no apis the get these values for android < M so we
    // do a best effort polyfill.
    EdgeInsets windowInsets;
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      WindowInsets insets = getRootWindowInsets();
      windowInsets = new EdgeInsets(
          insets.getSystemWindowInsetTop(),
          insets.getSystemWindowInsetRight(),
          insets.getSystemWindowInsetBottom(),
          insets.getSystemWindowInsetLeft());
    } else {
      int rotation = mWindowManager.getDefaultDisplay().getRotation();
      int statusBarHeight = 0;
      int resourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
      if (resourceId > 0) {
        statusBarHeight = getResources().getDimensionPixelSize(resourceId);
      }
      int navbarHeight = 0;
      resourceId = getResources().getIdentifier("navigation_bar_height", "dimen", "android");
      if (resourceId > 0) {
        navbarHeight = getResources().getDimensionPixelSize(resourceId);
      }

      windowInsets = new EdgeInsets(
          statusBarHeight,
          rotation == Surface.ROTATION_90 ? navbarHeight : 0,
          rotation == Surface.ROTATION_0 || rotation == Surface.ROTATION_180 ? navbarHeight : 0,
          rotation == Surface.ROTATION_270 ? navbarHeight : 0);
    }

    // Calculate the part of the root view that overlaps with window insets.
    int[] windowLocation = new int[2];
    getLocationInWindow(windowLocation);
    DisplayMetrics screenMetrics = DisplayMetricsHolder.getScreenDisplayMetrics();
    windowInsets.top = Math.max(windowInsets.top - windowLocation[1], 0);
    windowInsets.left = Math.max(windowInsets.left - windowLocation[0], 0);
    windowInsets.bottom = Math.max(windowLocation[1] + getHeight() + windowInsets.bottom - screenMetrics.heightPixels, 0);
    windowInsets.right = Math.max(windowLocation[0] + getWidth() + windowInsets.right - screenMetrics.widthPixels, 0);
    return windowInsets;
  }

  @Override
  protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    super.onLayout(changed, left, top, right, bottom);

    Assertions.assertNotNull(mInsetsChangeListener).onInsetsChange(this, getSafeAreaInsets());
  }

  public void setOnInsetsChangeListener(OnInsetsChangeListener listener) {
    mInsetsChangeListener = listener;
  }
}
