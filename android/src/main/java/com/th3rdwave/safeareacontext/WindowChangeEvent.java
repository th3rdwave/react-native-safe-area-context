package com.th3rdwave.safeareacontext;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/* package */  class WindowChangeEvent extends Event<WindowChangeEvent> {
  private static final String EVENT_NAME = "topWindowChange";

  private Rect mFrame;

  WindowChangeEvent(int viewTag, Rect frame) {
    super(viewTag);

    mFrame = frame;
  }

  @Override
  public String getEventName() {
    return EVENT_NAME;
  }

  @Override
  public void dispatch(RCTEventEmitter rctEventEmitter) {
    WritableMap event = Arguments.createMap();
    event.putMap("frame", SerializationUtils.rectToJsMap(mFrame));
    rctEventEmitter.receiveEvent(getViewTag(), getEventName(), event);
  }
}
