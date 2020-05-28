package com.th3rdwave.safeareacontext;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.ContextWrapper;
import android.view.View;
import android.view.ViewTreeObserver;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.EnumSet;

import androidx.annotation.Nullable;

@SuppressLint("ViewConstructor")
public class SafeAreaView extends ReactViewGroup implements View.OnLayoutChangeListener {
  private SafeAreaViewMode mMode = SafeAreaViewMode.PADDING;
  private @Nullable EdgeInsets mInsets;
  private @Nullable EnumSet<SafeAreaViewEdges> mEdges;
  private @Nullable View mRootView;

  public SafeAreaView(Context context) {
    super(context);
  }

  /**
   * UIManagerHelper.getReactContext only exists in RN 0.63+ so vendor it here for a while.
   */
  private static ReactContext getReactContext(View view) {
    Context context = view.getContext();
    if (!(context instanceof ReactContext) && context instanceof ContextWrapper) {
      context = ((ContextWrapper) context).getBaseContext();
    }
    return (ReactContext) context;
  }

  private void updateInsets() {
    if (mInsets != null) {
      EnumSet<SafeAreaViewEdges> edges = mEdges != null
              ? mEdges
              : EnumSet.allOf(SafeAreaViewEdges.class);

      SafeAreaViewLocalData localData = new SafeAreaViewLocalData(mInsets, mMode, edges);

      ReactContext reactContext = getReactContext(this);
      UIManagerModule uiManager = reactContext.getNativeModule(UIManagerModule.class);
      if (uiManager != null) {
        uiManager.setViewLocalData(getId(), localData);
      }
    }
  }

  public void setMode(SafeAreaViewMode mode) {
    mMode = mode;
    updateInsets();
  }

  public void setEdges(EnumSet<SafeAreaViewEdges> edges) {
    mEdges = edges;
    updateInsets();
  }

  private void maybeUpdateInsets() {
    EdgeInsets edgeInsets = SafeAreaUtils.getSafeAreaInsets(SafeAreaUtils.getFragmentRootView(this));
    if (edgeInsets != null && (mInsets == null || !mInsets.equalsToEdgeInsets(edgeInsets))) {
      mInsets = edgeInsets;
      updateInsets();
    }
  }

  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();

    mRootView = SafeAreaUtils.getFragmentRootView(this);

    mRootView.addOnLayoutChangeListener(this);
    maybeUpdateInsets();
  }

  @Override
  protected void onDetachedFromWindow() {
    super.onDetachedFromWindow();

    if (mRootView != null) {
      mRootView.removeOnLayoutChangeListener(this);
    }
    mRootView = null;
  }

  @Override
  public void onLayoutChange(View v, int left, int top, int right, int bottom, int oldLeft, int oldTop, int oldRight, int oldBottom) {
    maybeUpdateInsets();
  }
}
