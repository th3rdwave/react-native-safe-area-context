package com.th3rdwave.safeareacontext

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ReactStylesDiffMap
import com.facebook.react.uimanager.StateWrapper
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RNCSafeAreaViewManagerInterface
import com.facebook.react.views.view.ReactViewGroup
import com.facebook.react.views.view.ReactViewManager
import java.util.*


@ReactModule(name = SafeAreaViewManager.REACT_CLASS)
class SafeAreaViewManager : ReactViewManager(), RNCSafeAreaViewManagerInterface<SafeAreaView> {
  override fun getName() = REACT_CLASS

  // Make sure we're not using delegates for now since ReactViewGroupManager doesn't use one. If it
  // does in the future we will need a way to compose delegates together.
  override fun getDelegate(): ViewManagerDelegate<ReactViewGroup>? = null

  override fun createViewInstance(context: ThemedReactContext) = SafeAreaView(context)

  override fun createShadowNodeInstance() = SafeAreaViewShadowNode()

  override fun getShadowNodeClass() = SafeAreaViewShadowNode::class.java

  @ReactProp(name = "mode")
  override fun setMode(view: SafeAreaView, mode: String?) {
    when (mode) {
      "padding" -> {
        view.setMode(SafeAreaViewMode.PADDING)
      }
      "margin" -> {
        view.setMode(SafeAreaViewMode.MARGIN)
      }
    }
  }

  @ReactProp(name = "edges")
  override fun setEdges(view: SafeAreaView, propList: ReadableMap?) {

    if (propList != null) {
      view.setEdges(SafeAreaViewEdges(
        top = propList.getString("top")?.let { SafeAreaViewEdgeModes.valueOf(it.uppercase()) } ?: SafeAreaViewEdgeModes.OFF,
        right = propList.getString("right")?.let { SafeAreaViewEdgeModes.valueOf(it.uppercase()) } ?: SafeAreaViewEdgeModes.OFF,
        bottom = propList.getString("bottom")?.let { SafeAreaViewEdgeModes.valueOf(it.uppercase()) } ?: SafeAreaViewEdgeModes.OFF,
        left = propList.getString("left")?.let { SafeAreaViewEdgeModes.valueOf(it.uppercase()) } ?: SafeAreaViewEdgeModes.OFF
      ))
      //view.setMinPadding(EdgeInsets(top = if (minPadding.hasKey("top")) minPadding.getDouble("top").toFloat() else 0.0f, bottom = if (minPadding.hasKey("bottom")) minPadding.getDouble("bottom").toFloat() else 0.0f, left = if (minPadding.hasKey("left")) minPadding.getDouble("left").toFloat() else 0.0f, right = if (minPadding.hasKey("right")) minPadding.getDouble("right").toFloat() else 0.0f))
    }

//    val edges = EnumSet.noneOf(SafeAreaViewEdges::class.java)
//    if (propList != null) {
//      for (i in 0 until propList.size()) {
//        when (propList.getString(i)) {
//          "top" -> {
//            edges.add(SafeAreaViewEdges.TOP)
//          }
//          "right" -> {
//            edges.add(SafeAreaViewEdges.RIGHT)
//          }
//          "bottom" -> {
//            edges.add(SafeAreaViewEdges.BOTTOM)
//          }
//          "left" -> {
//            edges.add(SafeAreaViewEdges.LEFT)
//          }
//        }
//      }
//      view.setEdges(edges)
//    }
  }

  override fun updateState(
    view: ReactViewGroup,
    props: ReactStylesDiffMap?,
    stateWrapper: StateWrapper?
  ): Any? {
    (view as SafeAreaView).fabricViewStateManager.setStateWrapper(stateWrapper)
    return null
  }

  companion object {
    const val REACT_CLASS = "RNCSafeAreaView"
  }
}
