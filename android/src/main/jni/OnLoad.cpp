#include <fbjni/fbjni.h>

#include "SafeAreaContextComponentsRegistry.h"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *) {
  return facebook::jni::initialize(vm, [] {
    facebook::react::SafeAreaContextComponentsRegistry::registerNatives();
  });
}
