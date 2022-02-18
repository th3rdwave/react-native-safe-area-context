package com.th3rdwave.safeareacontext;

import com.facebook.jni.HybridData;
import com.facebook.proguard.annotations.DoNotStrip;
import com.facebook.react.fabric.ComponentFactory;
import com.facebook.soloader.SoLoader;

@DoNotStrip
public class SafeAreaContextComponentsRegistry {
  static {
    SoLoader.loadLibrary("safeareacontext_modules");
  }

  @DoNotStrip private final HybridData mHybridData;

  @DoNotStrip
  private native HybridData initHybrid(ComponentFactory componentFactory);

  @DoNotStrip
  private SafeAreaContextComponentsRegistry(ComponentFactory componentFactory) {
    mHybridData = initHybrid(componentFactory);
  }

  @DoNotStrip
  public static SafeAreaContextComponentsRegistry register(ComponentFactory componentFactory) {
    return new SafeAreaContextComponentsRegistry(componentFactory);
  }
}
