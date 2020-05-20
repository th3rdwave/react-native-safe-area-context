#import <React/RCTConvert.h>
#import "RNCSafeAreaViewEdges.h"

@implementation RCTConvert (RNCSafeAreaView)

RCT_ENUM_CONVERTER(RNCSafeAreaViewEdges, (@{
  @"none": @(RNCSafeAreaViewEdgesNone),
  
  @"top": @(RNCSafeAreaViewEdgesTop),
  @"right": @(RNCSafeAreaViewEdgesRight),
  @"bottom": @(RNCSafeAreaViewEdgesBottom),
  @"left": @(RNCSafeAreaViewEdgesLeft),
  
  @"horizontal": @(RNCSafeAreaViewEdgesRight | RNCSafeAreaViewEdgesLeft),
  @"vertical": @(RNCSafeAreaViewEdgesTop | RNCSafeAreaViewEdgesBottom),
  @"top-right": @(RNCSafeAreaViewEdgesTop | RNCSafeAreaViewEdgesRight),
  @"top-left": @(RNCSafeAreaViewEdgesTop | RNCSafeAreaViewEdgesLeft),
  @"bottom-right": @(RNCSafeAreaViewEdgesTop | RNCSafeAreaViewEdgesRight),
  @"bottom-left": @(RNCSafeAreaViewEdgesTop | RNCSafeAreaViewEdgesLeft),
  
  @"not-top": @(RNCSafeAreaViewEdgesRight | RNCSafeAreaViewEdgesBottom | RNCSafeAreaViewEdgesLeft),
  @"not-right": @(RNCSafeAreaViewEdgesTop | RNCSafeAreaViewEdgesBottom | RNCSafeAreaViewEdgesLeft),
  @"not-bottom": @(RNCSafeAreaViewEdgesTop | RNCSafeAreaViewEdgesRight | RNCSafeAreaViewEdgesLeft),
  @"not-left": @(RNCSafeAreaViewEdgesTop | RNCSafeAreaViewEdgesRight | RNCSafeAreaViewEdgesBottom),
  
  @"all": @(RNCSafeAreaViewEdgesAll),
}), RNCSafeAreaViewEdgesNone, integerValue);

@end
