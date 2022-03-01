package com.th3rdwave.safeareacontext

import com.facebook.jni.HybridData
import com.facebook.proguard.annotations.DoNotStrip
import com.facebook.react.fabric.ComponentFactory
import com.facebook.soloader.SoLoader

@DoNotStrip
class SafeAreaContextComponentsRegistry
@DoNotStrip
private constructor(componentFactory: ComponentFactory) {
  companion object {
    @DoNotStrip
    fun register(componentFactory: ComponentFactory): SafeAreaContextComponentsRegistry {
      return SafeAreaContextComponentsRegistry(componentFactory)
    }

    init {
      SoLoader.loadLibrary("safeareacontext_modules")
    }
  }

  @DoNotStrip private val mHybridData: HybridData
  @DoNotStrip private external fun initHybrid(componentFactory: ComponentFactory): HybridData

  init {
    mHybridData = initHybrid(componentFactory)
  }
}
