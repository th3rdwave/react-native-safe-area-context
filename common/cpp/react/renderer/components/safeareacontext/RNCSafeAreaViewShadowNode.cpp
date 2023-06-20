#include "RNCSafeAreaViewShadowNode.h"

#include <react/renderer/components/view/conversions.h>
#include <react/renderer/core/LayoutContext.h>
#include <yoga/Yoga.h>
#include <algorithm>

namespace facebook {
namespace react {

extern const char RNCSafeAreaViewComponentName[] = "RNCSafeAreaView";

inline YGValue valueFromEdges(YGStyle::Edges edges, YGEdge edge, YGEdge axis) {
  YGValue edgeValue = edges[edge];
  if (edgeValue.unit != YGUnitUndefined) {
    return edgeValue;
  }
  YGValue axisValue = edges[axis];
  if (axisValue.unit != YGUnitUndefined) {
    return axisValue;
  }
  return edges[YGEdgeAll];
}

inline float
getEdgeValue(std::string edgeMode, float insetValue, float edgeValue) {
  if (edgeMode == "off") {
    return edgeValue;
  } else if (edgeMode == "maximum") {
    return fmax(insetValue, edgeValue);
  } else {
    return insetValue + edgeValue;
  }
}

void RNCSafeAreaViewShadowNode::adjustLayoutWithState() {
  ensureUnsealed();

  auto props = getConcreteProps();
  auto state =
      std::static_pointer_cast<const RNCSafeAreaViewShadowNode::ConcreteState>(
          getState());
  auto stateData = state->getData();
  auto edges = props.edges;

  // Get the current values for padding / margin. The only caveat here is that
  // percent values are not supported. Also might need to add support for start
  // / end.
  YGValue top, left, right, bottom;
  if (props.mode == RNCSafeAreaViewMode::Padding) {
    top = valueFromEdges(props.yogaStyle.padding(), YGEdgeTop, YGEdgeVertical);
    left =
        valueFromEdges(props.yogaStyle.padding(), YGEdgeLeft, YGEdgeHorizontal);
    bottom =
        valueFromEdges(props.yogaStyle.padding(), YGEdgeBottom, YGEdgeVertical);
    right = valueFromEdges(
        props.yogaStyle.padding(), YGEdgeRight, YGEdgeHorizontal);
  } else {
    top = valueFromEdges(props.yogaStyle.margin(), YGEdgeTop, YGEdgeVertical);
    left =
        valueFromEdges(props.yogaStyle.margin(), YGEdgeLeft, YGEdgeHorizontal);
    bottom =
        valueFromEdges(props.yogaStyle.margin(), YGEdgeBottom, YGEdgeVertical);
    right =
        valueFromEdges(props.yogaStyle.margin(), YGEdgeRight, YGEdgeHorizontal);
  }

  top = yogaStyleValueFromFloat(getEdgeValue(
      edges.top,
      stateData.insets.top,
      (top.unit == YGUnitPoint ? top.value : 0)));
  left = yogaStyleValueFromFloat(getEdgeValue(
      edges.left,
      stateData.insets.left,
      (left.unit == YGUnitPoint ? left.value : 0)));
  right = yogaStyleValueFromFloat(getEdgeValue(
      edges.right,
      stateData.insets.right,
      (right.unit == YGUnitPoint ? right.value : 0)));
  bottom = yogaStyleValueFromFloat(getEdgeValue(
      edges.bottom,
      stateData.insets.bottom,
      (bottom.unit == YGUnitPoint ? bottom.value : 0)));

  YGStyle adjustedStyle = getConcreteProps().yogaStyle;
  if (props.mode == RNCSafeAreaViewMode::Padding) {
    adjustedStyle.padding()[YGEdgeTop] = top;
    adjustedStyle.padding()[YGEdgeLeft] = left;
    adjustedStyle.padding()[YGEdgeRight] = right;
    adjustedStyle.padding()[YGEdgeBottom] = bottom;
  } else {
    adjustedStyle.margin()[YGEdgeTop] = top;
    adjustedStyle.margin()[YGEdgeLeft] = left;
    adjustedStyle.margin()[YGEdgeRight] = right;
    adjustedStyle.margin()[YGEdgeBottom] = bottom;
  }

  auto currentStyle = yogaNode_.getStyle();
  if (adjustedStyle.padding()[YGEdgeTop] != currentStyle.padding()[YGEdgeTop] ||
      adjustedStyle.padding()[YGEdgeLeft] !=
          currentStyle.padding()[YGEdgeLeft] ||
      adjustedStyle.padding()[YGEdgeRight] !=
          currentStyle.padding()[YGEdgeRight] ||
      adjustedStyle.padding()[YGEdgeBottom] !=
          currentStyle.padding()[YGEdgeBottom] ||
      adjustedStyle.margin()[YGEdgeTop] != currentStyle.margin()[YGEdgeTop] ||
      adjustedStyle.margin()[YGEdgeLeft] != currentStyle.margin()[YGEdgeLeft] ||
      adjustedStyle.margin()[YGEdgeRight] !=
          currentStyle.margin()[YGEdgeRight] ||
      adjustedStyle.margin()[YGEdgeBottom] !=
          currentStyle.margin()[YGEdgeBottom]) {
    yogaNode_.setStyle(adjustedStyle);
    yogaNode_.setDirty(true);
  }
}

} // namespace react
} // namespace facebook
