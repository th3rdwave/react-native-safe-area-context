#pragma once

#include <react/renderer/components/safeareacontext/EventEmitters.h>
#include <react/renderer/components/safeareacontext/Props.h>
#include <react/renderer/components/safeareacontext/RNCSafeAreaViewState.h>
#include <react/renderer/components/view/ConcreteViewShadowNode.h>

namespace facebook {
namespace react {

extern const char RNCSafeAreaViewComponentName[];

/*
 * `ShadowNode` for <RNCSafeAreaView> component.
 */
class RNCSafeAreaViewShadowNode final : public ConcreteViewShadowNode<
                                         RNCSafeAreaViewComponentName,
                                         RNCSafeAreaViewProps,
                                         ViewEventEmitter,
                                         RNCSafeAreaViewState> {
  using ConcreteViewShadowNode::ConcreteViewShadowNode;

 public:
  static ShadowNodeTraits BaseTraits() {
    auto traits = ConcreteViewShadowNode::BaseTraits();
    traits.set(ShadowNodeTraits::Trait::DirtyYogaNode);
    return traits;
  }

  void adjustLayoutWithState();
};

} // namespace react
} // namespace facebook
