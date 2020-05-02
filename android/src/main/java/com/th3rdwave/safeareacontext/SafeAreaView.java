package com.th3rdwave.safeareacontext;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.view.WindowManager;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.views.view.ReactViewGroup;

import androidx.annotation.Nullable;

@SuppressLint("ViewConstructor")
public class SafeAreaView extends ReactViewGroup implements ViewTreeObserver.OnGlobalLayoutListener {
  public interface OnInsetsChangeListener {
    void onInsetsChange(SafeAreaView view, EdgeInsets insets, Rect frame);
  }

  private @Nullable OnInsetsChangeListener mInsetsChangeListener;
  private final WindowManager mWindowManager;
  private @Nullable EdgeInsets mLastInsets;
  private @Nullable Rect mLastFrame;

  public SafeAreaView(Context context, WindowManager windowManager) {
    super(context);

    mWindowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
  }

  private void maybeUpdateInsets() {
    EdgeInsets edgeInsets = SafeAreaUtils.getSafeAreaInsets(mWindowManager, getRootView(), this);
    Rect frame = SafeAreaUtils.getFrame((ViewGroup) getRootView(), this);
    if (edgeInsets != null &&
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

  public void setOnInsetsChangeListener(OnInsetsChangeListener listener) {
    mInsetsChangeListener = listener;
  }
}
