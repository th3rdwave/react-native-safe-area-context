package com.th3rdwave.safeareacontext;

import android.app.Activity;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;

import java.util.Map;

@ReactModule(name = SafeAreaContextModule.NAME)
public class SafeAreaContextModule extends NativeSafeAreaContextSpec {

  public static final String NAME = "RNCSafeAreaContext";

  public SafeAreaContextModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public Map<String, Object> getTypedExportedConstants() {
    return MapBuilder.<String, Object>of(
        "initialWindowMetrics",
        getInitialWindowMetrics());
  }

  private @Nullable Map<String, Object> getInitialWindowMetrics() {
    Activity activity = getReactApplicationContext().getCurrentActivity();
    if (activity == null) {
      return null;
    }

    ViewGroup decorView = (ViewGroup) activity.getWindow().getDecorView();
    if (decorView == null) {
      return null;
    }

    View contentView = decorView.findViewById(android.R.id.content);
    if (contentView == null) {
      return null;
    }
    EdgeInsets insets = SafeAreaUtils.getSafeAreaInsets(decorView);
    Rect frame = SafeAreaUtils.getFrame(decorView, contentView);
    if (insets == null || frame == null) {
      return null;
    }
    return MapBuilder.<String, Object>of(
        "insets",
        SerializationUtils.edgeInsetsToJavaMap(insets),
        "frame",
        SerializationUtils.rectToJavaMap(frame));
  }
}
