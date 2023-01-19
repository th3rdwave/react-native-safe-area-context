#pragma once

#include <react/renderer/components/safeareacontext/RNCSafeAreaViewShadowNode.h>
#include <react/renderer/core/ConcreteComponentDescriptor.h>

namespace facebook {
namespace react {

/*
 * Descriptor for <RNCSafeAreaView> component.
 */
class RNCSafeAreaViewComponentDescriptor final
    : public ConcreteComponentDescriptor<RNCSafeAreaViewShadowNode> {
  using ConcreteComponentDescriptor::ConcreteComponentDescriptor;
  void adopt(ShadowNode::Unshared const &shadowNode) const override {
    auto concreteShadowNode =
        std::static_pointer_cast<RNCSafeAreaViewShadowNode>(shadowNode);

    concreteShadowNode->adjustLayoutWithState();

    ConcreteComponentDescriptor::adopt(shadowNode);
  }
};

} // namespace react
} // namespace facebook
