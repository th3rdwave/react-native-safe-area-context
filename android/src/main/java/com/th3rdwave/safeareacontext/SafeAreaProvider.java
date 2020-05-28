package com.th3rdwave.safeareacontext;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.views.view.ReactViewGroup;

import androidx.annotation.Nullable;

@SuppressLint("ViewConstructor")
public class SafeAreaProvider extends ReactViewGroup implements View.OnLayoutChangeListener {
  public interface OnInsetsChangeListener {
    void onInsetsChange(SafeAreaProvider view, EdgeInsets insets, Rect frame);
  }

  private @Nullable OnInsetsChangeListener mInsetsChangeListener;
  private @Nullable EdgeInsets mLastInsets;
  private @Nullable Rect mLastFrame;
  private @Nullable View mRootView;

  public SafeAreaProvider(Context context) {
    super(context);
  }

  private void maybeUpdateInsets() {
    if (mRootView == null) {
      return;
    }
    EdgeInsets edgeInsets = SafeAreaUtils.getSafeAreaInsets(mRootView);
    Rect frame = SafeAreaUtils.getFrame((ViewGroup) getRootView(), this);
    if (edgeInsets != null && frame != null &&
        (mLastInsets == null ||
            mLastFrame == null ||
            !mLastInsets.equalsToEdgeInsets(edgeInsets) ||
            !mLastFrame.equalsToRect(frame))) {
      Assertions.assertNotNull(mInsetsChangeListener).onInsetsChange(this, edgeInsets, frame);
      mLastInsets = edgeInsets;
      mLastFrame = frame;
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

  public void setOnInsetsChangeListener(OnInsetsChangeListener listener) {
    mInsetsChangeListener = listener;
  }
}
