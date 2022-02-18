package com.th3rdwave.safeareacontext;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.RNCSafeAreaProviderManagerDelegate;
import com.facebook.react.viewmanagers.RNCSafeAreaProviderManagerInterface;

import java.util.Map;

public class SafeAreaProviderManager extends ViewGroupManager<SafeAreaProvider> implements RNCSafeAreaProviderManagerInterface<SafeAreaProvider> {
  private final ViewManagerDelegate<SafeAreaProvider> mDelegate;

  public SafeAreaProviderManager() {
    super();

    mDelegate = new RNCSafeAreaProviderManagerDelegate<>(this);
  }

  @Nullable
  @Override
  protected ViewManagerDelegate<SafeAreaProvider> getDelegate() {
    return mDelegate;
  }

  @Override
  @NonNull
  public String getName() {
    return "RNCSafeAreaProvider";
  }

  @Override
  @NonNull
  public SafeAreaProvider createViewInstance(@NonNull ThemedReactContext context) {
    return new SafeAreaProvider(context);
  }

  @Override
  public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
    return MapBuilder.<String, Object>builder()
      .put(InsetsChangeEvent.EVENT_NAME, MapBuilder.of("registrationName", "onInsetsChange"))
      .build();
  }

  private static final SafeAreaProvider.OnInsetsChangeListener ON_INSETS_CHANGE_LISTENER =
    new SafeAreaProvider.OnInsetsChangeListener() {
      @Override
      public void onInsetsChange(SafeAreaProvider view, EdgeInsets insets, Rect frame) {
        ReactContext reactContext = (ReactContext) view.getContext();

        int reactTag = view.getId();
        UIManagerHelper.getEventDispatcherForReactTag(reactContext, reactTag)
          .dispatchEvent(
            new InsetsChangeEvent(
              UIManagerHelper.getSurfaceId(reactContext), reactTag, insets, frame));
      }
    };

  @Override
  protected void addEventEmitters(@NonNull ThemedReactContext reactContext, @NonNull SafeAreaProvider view) {
    super.addEventEmitters(reactContext, view);

    view.setOnInsetsChangeListener(ON_INSETS_CHANGE_LISTENER);
  }
}
