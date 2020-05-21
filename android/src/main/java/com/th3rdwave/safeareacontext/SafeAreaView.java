package com.th3rdwave.safeareacontext;

import static com.facebook.react.uimanager.UIManagerHelper.getReactContext;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.Log;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.view.WindowInsets;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.views.view.ReactViewGroup;
import com.facebook.react.uimanager.UIManagerModule;

import java.util.EnumSet;

@SuppressLint("ViewConstructor")
public class SafeAreaView extends ReactViewGroup implements ViewTreeObserver.OnGlobalLayoutListener {
  private @Nullable EdgeInsets mInsets;
  private @Nullable EnumSet<SafeAreaViewEdges> mEdges;

  public SafeAreaView(Context context) {
    super(context);
  }

  private void updateInsets() {
    if (mInsets != null) {
      EnumSet<SafeAreaViewEdges> edges = mEdges != null
              ? mEdges
              : EnumSet.allOf(SafeAreaViewEdges.class);

      SafeAreaViewLocalData localData = new SafeAreaViewLocalData(mInsets, edges);

      ReactContext reactContext = getReactContext(this);
      UIManagerModule uiManager = reactContext.getNativeModule(UIManagerModule.class);
      if (uiManager != null) {
        uiManager.setViewLocalData(getId(), localData);
      }
    }
  }

  public void setEdges(EnumSet<SafeAreaViewEdges> edges) {
    mEdges = edges;
    updateInsets();
  }

  private void maybeUpdateInsets() {
    EdgeInsets edgeInsets = SafeAreaUtils.getSafeAreaInsets(getRootView(), this);
    if (edgeInsets != null && (mInsets == null || !mInsets.equalsToEdgeInsets(edgeInsets))) {
      mInsets = edgeInsets;
      updateInsets();
    }
  }

  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();

    getViewTreeObserver().addOnGlobalLayoutListener(this);
    maybeUpdateInsets();
  }

  @Override
  protected void onDetachedFromWindow() {
    super.onDetachedFromWindow();

    getViewTreeObserver().removeOnGlobalLayoutListener(this);
  }

  @Override
  public void onGlobalLayout() {
    maybeUpdateInsets();
  }

  @Override
  protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    maybeUpdateInsets();
    super.onLayout(changed, left, top, right, bottom);
  }
}
