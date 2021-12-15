# Copyright (c) Facebook, Inc. and its affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE := safeareacontext_common

LOCAL_C_INCLUDES := $(LOCAL_PATH)

LOCAL_SRC_FILES := $(wildcard $(LOCAL_PATH)/*.cpp) $(wildcard $(LOCAL_PATH)/react/renderer/components/safeareacontext/*.cpp)

LOCAL_EXPORT_C_INCLUDES := $(LOCAL_PATH) $(LOCAL_PATH)/react/renderer/components/safeareacontext

LOCAL_SHARED_LIBRARIES := libjsi libglog libfolly_json libyoga libreact_nativemodule_core librrc_view libreact_render_core libreact_render_graphics libfbjni libturbomodulejsijni libreact_codegen_rncore libreact_debug libreact_render_debug libreact_render_mapbuffer libreact_codegen_safeareacontext

LOCAL_CFLAGS := \
  -DLOG_TAG=\"ReactNative\"

LOCAL_CFLAGS += -fexceptions -frtti -std=c++17 -Wall

include $(BUILD_SHARED_LIBRARY)
