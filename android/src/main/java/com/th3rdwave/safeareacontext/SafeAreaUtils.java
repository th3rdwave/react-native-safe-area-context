package com.th3rdwave.safeareacontext;

import android.graphics.Rect;
import android.os.Build;
import android.view.Surface;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowInsets;
import android.view.WindowManager;

import androidx.annotation.Nullable;

/* package */ class SafeAreaUtils {
  static @Nullable EdgeInsets getSafeAreaInsets(
      WindowManager windowManager,
      View rootView,
      View view
  ) {
    // Window insets are parts of the window that are covered by system views (status bar,
    // navigation bar, notches). There are no apis the get these values for android < M so we
    // do a best effort polyfill.
    EdgeInsets windowInsets;
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      WindowInsets insets = rootView.getRootWindowInsets();
      if (insets == null) {
        return null;
      }
      windowInsets = new EdgeInsets(
          insets.getSystemWindowInsetTop(),
          insets.getSystemWindowInsetRight(),
          insets.getSystemWindowInsetBottom(),
          insets.getSystemWindowInsetLeft());
    } else {
      int rotation = windowManager.getDefaultDisplay().getRotation();
      int statusBarHeight = 0;
      int resourceId = rootView.getResources().getIdentifier("status_bar_height", "dimen", "android");
      if (resourceId > 0) {
        statusBarHeight = rootView.getResources().getDimensionPixelSize(resourceId);
      }
      int navbarHeight = 0;
      resourceId = rootView.getResources().getIdentifier("navigation_bar_height", "dimen", "android");
      if (resourceId > 0) {
        navbarHeight = rootView.getResources().getDimensionPixelSize(resourceId);
      }

      windowInsets = new EdgeInsets(
          statusBarHeight,
          rotation == Surface.ROTATION_90 ? navbarHeight : 0,
          rotation == Surface.ROTATION_0 || rotation == Surface.ROTATION_180 ? navbarHeight : 0,
          rotation == Surface.ROTATION_270 ? navbarHeight : 0);
    }

    // Calculate the part of the view that overlaps with window insets.
    float windowWidth = rootView.getWidth();
    float windowHeight = rootView.getHeight();
    Rect visibleRect = new Rect();
    view.getGlobalVisibleRect(visibleRect);

    windowInsets.top = Math.max(windowInsets.top - visibleRect.top, 0);
    windowInsets.left = Math.max(windowInsets.left - visibleRect.left, 0);
    windowInsets.bottom = Math.max(visibleRect.top + view.getHeight() + windowInsets.bottom - windowHeight, 0);
    windowInsets.right = Math.max(visibleRect.left + view.getWidth() + windowInsets.right - windowWidth, 0);
    return windowInsets;
  }

  static @Nullable com.th3rdwave.safeareacontext.Rect getFrame(ViewGroup rootView, View view) {
    // This can happen while the view gets unmounted.
    if (view.getParent() == null) {
      return null;
    }
    Rect offset = new Rect();
    view.getDrawingRect(offset);
    try {
      rootView.offsetDescendantRectToMyCoords(view, offset);
    } catch (IllegalArgumentException ex) {
      // This can throw if the view is not a descendant of rootView. This should not
      // happen but avoid potential crashes.
      ex.printStackTrace();
      return null;
    }

    return new com.th3rdwave.safeareacontext.Rect(offset.left, offset.top, view.getWidth(), view.getHeight());
  }
}
