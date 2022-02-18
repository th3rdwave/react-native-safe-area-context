package com.th3rdwave.safeareacontext;

import androidx.annotation.NonNull;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Fool autolinking for older versions that do not support TurboReactPackage.
// public class SafeAreaContextPackage implements ReactPackage {
public class SafeAreaContextPackage extends TurboReactPackage {
  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
    if (name.equals(SafeAreaContextModule.NAME)) {
      return new SafeAreaContextModule(reactContext);
    }
    return null;
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    Class<? extends NativeModule>[] moduleList =
        new Class[] {
          SafeAreaContextModule.class,
        };

    final Map<String, ReactModuleInfo> reactModuleInfoMap = new HashMap<>();
    for (Class<? extends NativeModule> moduleClass : moduleList) {
      ReactModule reactModule = moduleClass.getAnnotation(ReactModule.class);

      reactModuleInfoMap.put(
          reactModule.name(),
          new ReactModuleInfo(
              reactModule.name(),
              moduleClass.getName(),
              true,
              reactModule.needsEagerInit(),
              reactModule.hasConstants(),
              reactModule.isCxxModule(),
              TurboModule.class.isAssignableFrom(moduleClass)));
    }

    return new ReactModuleInfoProvider() {
      @Override
      public Map<String, ReactModuleInfo> getReactModuleInfos() {
        return reactModuleInfoMap;
      }
    };
  }

  @NonNull
  @Override
  public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // For Fabric, we load c++ native library here, this triggers screen's Fabric
      // component registration which is necessary in order to avoid asking users
      // to manually add init calls in their application code.
      // This should no longer be needed if RN's autolink mechanism has Fabric support
      SoLoader.loadLibrary("safeareacontext_modules");
    }

    return Arrays.<ViewManager>asList(
            new SafeAreaProviderManager(),
            new SafeAreaViewManager()
    );
  }

}
