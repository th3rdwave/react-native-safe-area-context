/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RNCSafeAreaViewManager.h"

#import "RNCSafeAreaView.h"

@implementation RNCSafeAreaViewManager

RCT_EXPORT_MODULE(RNCSafeAreaView)

RCT_EXPORT_VIEW_PROPERTY(onInsetsChange, RCTBubblingEventBlock)

- (UIView *)view
{
  return [RNCSafeAreaView new];
}

@end
