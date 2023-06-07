package com.th3rdwave.safeareacontext

import kotlin.math.max
import com.facebook.react.bridge.Dynamic
import com.facebook.react.bridge.ReadableType
import com.facebook.react.uimanager.*
import com.facebook.react.uimanager.annotations.ReactPropGroup
import com.facebook.yoga.YogaNode

class SafeAreaViewShadowNode : LayoutShadowNode() {
  private var mLocalData: SafeAreaViewLocalData? = null
  private val mPaddings: FloatArray = FloatArray(ViewProps.PADDING_MARGIN_SPACING_TYPES.size)
  private val mMargins: FloatArray = FloatArray(ViewProps.PADDING_MARGIN_SPACING_TYPES.size)
  private var mNeedsUpdate = false

  init {
    for (i in ViewProps.PADDING_MARGIN_SPACING_TYPES.indices) {
      mPaddings[i] = Float.NaN
      mMargins[i] = Float.NaN
    }
  }

  private fun updateInsets() {
    val localData = mLocalData ?: return
    var top = 0f
    var right = 0f
    var bottom = 0f
    var left = 0f
    val meta = if (localData.mode == SafeAreaViewMode.PADDING) mPaddings else mMargins
    val allEdges = meta[Spacing.ALL]
    if (!java.lang.Float.isNaN(allEdges)) {
      top = allEdges
      right = allEdges
      bottom = allEdges
      left = allEdges
    }
    val verticalEdges = meta[Spacing.VERTICAL]
    if (!java.lang.Float.isNaN(verticalEdges)) {
      top = verticalEdges
      bottom = verticalEdges
    }
    val horizontalEdges = meta[Spacing.HORIZONTAL]
    if (!java.lang.Float.isNaN(horizontalEdges)) {
      right = horizontalEdges
      left = horizontalEdges
    }
    val topEdge = meta[Spacing.TOP]
    if (!java.lang.Float.isNaN(topEdge)) {
      top = topEdge
    }
    val rightEdge = meta[Spacing.RIGHT]
    if (!java.lang.Float.isNaN(rightEdge)) {
      right = rightEdge
    }
    val bottomEdge = meta[Spacing.BOTTOM]
    if (!java.lang.Float.isNaN(bottomEdge)) {
      bottom = bottomEdge
    }
    val leftEdge = meta[Spacing.LEFT]
    if (!java.lang.Float.isNaN(leftEdge)) {
      left = leftEdge
    }
    top = PixelUtil.toPixelFromDIP(top)
    right = PixelUtil.toPixelFromDIP(right)
    bottom = PixelUtil.toPixelFromDIP(bottom)
    left = PixelUtil.toPixelFromDIP(left)
    val edges = localData.edges
    val insets = localData.insets
    val insetTop: Float = if (edges.top != SafeAreaViewEdgeModes.OFF ) insets.top else 0.0f
    val insetRight: Float = if (edges.right != SafeAreaViewEdgeModes.OFF) insets.right else 0.0f
    val insetBottom: Float = if (edges.bottom != SafeAreaViewEdgeModes.OFF) insets.bottom else 0.0f
    val insetLeft: Float = if (edges.left != SafeAreaViewEdgeModes.OFF) insets.left else 0.0f
    if (localData.mode == SafeAreaViewMode.PADDING) {
      super.setPadding(Spacing.TOP,  if (edges.top == SafeAreaViewEdgeModes.MAXIMUM ) max(insetTop, top) else insetTop + top)
      super.setPadding(Spacing.RIGHT, if (edges.right == SafeAreaViewEdgeModes.MAXIMUM ) max(insetRight, right) else insetRight + right)
      super.setPadding(Spacing.BOTTOM, if (edges.bottom == SafeAreaViewEdgeModes.MAXIMUM ) max(insetBottom, bottom) else insetBottom + bottom)
      super.setPadding(Spacing.LEFT, if (edges.left == SafeAreaViewEdgeModes.MAXIMUM ) max(insetLeft, left) else insetLeft + left)
    } else {
      super.setMargin(Spacing.TOP, if (edges.top == SafeAreaViewEdgeModes.MAXIMUM ) max(insetTop, top) else insetTop + top)
      super.setMargin(Spacing.RIGHT, if (edges.right == SafeAreaViewEdgeModes.MAXIMUM ) max(insetRight, right) else insetRight + right)
      super.setMargin(Spacing.BOTTOM, if (edges.bottom == SafeAreaViewEdgeModes.MAXIMUM ) max(insetBottom, bottom) else insetBottom + bottom)
      super.setMargin(Spacing.LEFT, if (edges.left == SafeAreaViewEdgeModes.MAXIMUM ) max(insetLeft, left) else insetLeft + left)
    }
  }

  private fun resetInsets(mode: SafeAreaViewMode) {
    if (mode == SafeAreaViewMode.PADDING) {
      super.setPadding(Spacing.TOP, mPaddings[Spacing.TOP])
      super.setPadding(Spacing.RIGHT, mPaddings[Spacing.TOP])
      super.setPadding(Spacing.BOTTOM, mPaddings[Spacing.BOTTOM])
      super.setPadding(Spacing.LEFT, mPaddings[Spacing.LEFT])
    } else {
      super.setMargin(Spacing.TOP, mMargins[Spacing.TOP])
      super.setMargin(Spacing.RIGHT, mMargins[Spacing.TOP])
      super.setMargin(Spacing.BOTTOM, mMargins[Spacing.BOTTOM])
      super.setMargin(Spacing.LEFT, mMargins[Spacing.LEFT])
    }
    markUpdated()
  }

  override fun onBeforeLayout(nativeViewHierarchyOptimizer: NativeViewHierarchyOptimizer) {
    if (mNeedsUpdate) {
      mNeedsUpdate = false
      updateInsets()
    }
  }

  override fun setLocalData(data: Any) {
    if (data !is SafeAreaViewLocalData) {
      return
    }
    val localData = mLocalData
    if (localData != null && localData.mode != data.mode) {
      resetInsets(localData.mode)
    }
    mLocalData = data
    mNeedsUpdate = false
    updateInsets()
  }

  // Names needs to reflect exact order in LayoutShadowNode.java
  @ReactPropGroup(
      names =
          [
              ViewProps.PADDING,
              ViewProps.PADDING_VERTICAL,
              ViewProps.PADDING_HORIZONTAL,
              ViewProps.PADDING_START,
              ViewProps.PADDING_END,
              ViewProps.PADDING_TOP,
              ViewProps.PADDING_BOTTOM,
              ViewProps.PADDING_LEFT,
              ViewProps.PADDING_RIGHT])
  override fun setPaddings(index: Int, padding: Dynamic) {
    val spacingType = ViewProps.PADDING_MARGIN_SPACING_TYPES[index]
    mPaddings[spacingType] =
        if (padding.type == ReadableType.Number) padding.asDouble().toFloat() else Float.NaN
    super.setPaddings(index, padding)
    mNeedsUpdate = true
  }

  @ReactPropGroup(
      names =
          [
              ViewProps.MARGIN,
              ViewProps.MARGIN_VERTICAL,
              ViewProps.MARGIN_HORIZONTAL,
              ViewProps.MARGIN_START,
              ViewProps.MARGIN_END,
              ViewProps.MARGIN_TOP,
              ViewProps.MARGIN_BOTTOM,
              ViewProps.MARGIN_LEFT,
              ViewProps.MARGIN_RIGHT])
  override fun setMargins(index: Int, margin: Dynamic) {
    val spacingType = ViewProps.PADDING_MARGIN_SPACING_TYPES[index]
    mMargins[spacingType] =
        if (margin.type == ReadableType.Number) margin.asDouble().toFloat() else Float.NaN
    super.setMargins(index, margin)
    mNeedsUpdate = true
  }
}
